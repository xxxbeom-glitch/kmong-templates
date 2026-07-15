/**
 * Service worker: recording session, storage, webRequest observation, export.
 * DOM APIs are not used here.
 *
 * IMPORTANT: chrome.webRequest requestBody must be copied synchronously in the
 * listener callback. Any await before reading details.requestBody can lose the body.
 */

const EXTENSION_VERSION = "1.1.0";
const INTERACTION_WINDOW_MS = 15000;
const MAX_HTML_CHARS = 50 * 1024;
const MAX_EVENTS = 2000;
const MAX_BODY_CHARS = 32 * 1024;

/** Keys whose values must always be redacted in form/body params */
const FORM_REDACT_KEY_RE =
  /^(password|passwd|pwd|pw|cookie|set-cookie|authorization|token|access_token|refresh_token|session|sessionid|session_id)$/i;

/** Header-like fields never stored */
const OMIT_KEY_RE = /^(headers|requestHeaders|responseHeaders|setCookie)$/i;

const SENSITIVE_VALUE_HINT_RE =
  /^(?:Bearer\s+\S+|password|passwd)$/i;

function nowIso() {
  return new Date().toISOString();
}

function makeSessionId() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
  const rand = Math.random().toString(36).slice(2, 7);
  return `${stamp}_${rand}`;
}

function makeEventId() {
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function isFormRedactKey(key) {
  if (!key || typeof key !== "string") return false;
  return FORM_REDACT_KEY_RE.test(key.trim());
}

function isServiceCodeKey(key) {
  return /^service_code$/i.test(String(key || "").trim());
}

function isServiceCodeMeta(value) {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    ("service_code_present" in value || "service_code_length" in value)
  );
}

function toServiceCodeMeta(value) {
  if (isServiceCodeMeta(value)) {
    return {
      service_code_present: !!value.service_code_present,
      service_code_length: Number(value.service_code_length) || 0
    };
  }
  const raw = value == null ? "" : String(value);
  return {
    service_code_present: raw.length > 0,
    service_code_length: raw.length
  };
}

function truncateHtml(html) {
  if (html == null) return html;
  const s = String(html);
  if (s.length <= MAX_HTML_CHARS) return s;
  return s.slice(0, MAX_HTML_CHARS) + `\n<!-- truncated: originalLength=${s.length} -->`;
}

function truncateText(text, max) {
  if (text == null) return text;
  const s = String(text);
  const m = max || MAX_BODY_CHARS;
  if (s.length <= m) return s;
  return s.slice(0, m) + `…[truncated len=${s.length}]`;
}

/**
 * Sanitize a single form/body field value.
 * Preserves analysis keys (no, gall_id, action, …).
 * service_code → presence/length only.
 */
function sanitizeParamValue(key, value) {
  if (isServiceCodeKey(key)) {
    return toServiceCodeMeta(value);
  }
  if (isFormRedactKey(key)) return "[REDACTED]";
  if (value == null) return value;
  if (typeof value === "string") {
    if (SENSITIVE_VALUE_HINT_RE.test(value)) return "[REDACTED]";
    return truncateText(value, 8000);
  }
  if (typeof value === "number" || typeof value === "boolean") return value;
  return truncateText(String(value), 8000);
}

function sanitizeFormData(formData) {
  if (!formData || typeof formData !== "object") return formData;
  const out = {};
  for (const [key, values] of Object.entries(formData)) {
    if (isServiceCodeKey(key)) {
      if (isServiceCodeMeta(values)) {
        out[key] = toServiceCodeMeta(values);
      } else {
        const arr = Array.isArray(values) ? values : [values];
        const joined = arr
          .map((v) => (isServiceCodeMeta(v) ? "" : v == null ? "" : String(v)))
          .join("");
        // If nested meta already present, prefer first meta
        const metaItem = arr.find(isServiceCodeMeta);
        out[key] = metaItem
          ? toServiceCodeMeta(metaItem)
          : toServiceCodeMeta(joined);
      }
      continue;
    }
    const arr = Array.isArray(values) ? values : [values];
    out[key] = arr.map((v) => sanitizeParamValue(key, v));
  }
  return out;
}

function sanitizeParsedBody(parsed) {
  if (!parsed || typeof parsed !== "object") return parsed;
  const out = {};
  for (const [key, value] of Object.entries(parsed)) {
    if (isServiceCodeKey(key)) {
      out[key] = toServiceCodeMeta(value);
      continue;
    }
    out[key] = sanitizeParamValue(key, value);
  }
  return out;
}

/**
 * Deep sanitize for storage/export.
 * Does NOT strip requestBody / formData / parsedBody / rawText — only masks secrets.
 */
function sanitizeObject(obj) {
  if (obj == null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map((item) => sanitizeObject(item));

  // Special-case known body containers so nested keys use form rules
  if (obj.__isRequestBodyRecord) {
    return sanitizeRequestBodyRecord(obj);
  }

  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (OMIT_KEY_RE.test(k) || /^cookie$/i.test(k)) {
      out[k] = "[OMITTED]";
      continue;
    }
    if (isFormRedactKey(k) && typeof v !== "object") {
      out[k] = "[REDACTED]";
      continue;
    }
    if (k === "requestBody" && v && typeof v === "object") {
      out[k] = sanitizeRequestBodyRecord(v);
      continue;
    }
    if (k === "formData" && v && typeof v === "object") {
      out[k] = sanitizeFormData(v);
      continue;
    }
    if (k === "parsedBody" && v && typeof v === "object") {
      out[k] = sanitizeParsedBody(v);
      continue;
    }
    if (typeof v === "string" && /(html|outerHTML|innerHTML)$/i.test(k)) {
      out[k] = truncateHtml(v);
      continue;
    }
    if (v && typeof v === "object") {
      out[k] = sanitizeObject(v);
      continue;
    }
    if (typeof v === "string" && SENSITIVE_VALUE_HINT_RE.test(v)) {
      out[k] = "[REDACTED]";
      continue;
    }
    out[k] = v;
  }
  return out;
}

function sanitizeRequestBodyRecord(body) {
  if (!body || typeof body !== "object") return body;
  const out = {};
  if (body.error) out.error = String(body.error);
  if (body.rawBodyUnavailable) out.rawBodyUnavailable = true;
  if (body.reason) out.reason = body.reason;
  if (body.byteLength != null) out.byteLength = body.byteLength;
  if (body.hasFormData != null) out.hasFormData = !!body.hasFormData;
  if (body.hasRaw != null) out.hasRaw = !!body.hasRaw;
  if (body.formData) out.formData = sanitizeFormData(body.formData);
  if (body.rawText != null) out.rawText = truncateText(body.rawText, MAX_BODY_CHARS);
  if (body.parsedBody) out.parsedBody = sanitizeParsedBody(body.parsedBody);
  if (body.parseError) out.parseError = String(body.parseError);
  return out;
}

/**
 * MUST run synchronously inside onBeforeRequest — copy buffers before any await.
 */
function snapshotRequestBodySync(requestBody) {
  if (!requestBody) return null;
  const snap = {
    hasFormData: false,
    hasRaw: false
  };

  if (requestBody.error) {
    snap.error = String(requestBody.error);
  }

  if (requestBody.formData) {
    snap.hasFormData = true;
    snap.formData = {};
    try {
      for (const [key, values] of Object.entries(requestBody.formData)) {
        const arr = Array.isArray(values) ? values : [values];
        snap.formData[key] = arr.map((v) => (v == null ? "" : String(v)));
      }
    } catch (err) {
      snap.formDataError = String(err && err.message ? err.message : err);
    }
  }

  if (requestBody.raw && requestBody.raw.length) {
    snap.hasRaw = true;
    try {
      let total = 0;
      const chunks = [];
      for (const part of requestBody.raw) {
        if (part && part.file) {
          snap.rawFile = String(part.file);
          continue;
        }
        if (!part || part.bytes == null) {
          snap.rawBodyUnavailable = true;
          snap.reason = "missing_bytes";
          continue;
        }
        const src =
          part.bytes instanceof ArrayBuffer
            ? new Uint8Array(part.bytes)
            : new Uint8Array(part.bytes);
        total += src.byteLength;
        if (total > 64 * 1024) {
          snap.rawBodyUnavailable = true;
          snap.reason = "too_large";
          snap.byteLength = total;
          return snap;
        }
        const copy = new Uint8Array(src.byteLength);
        copy.set(src);
        chunks.push(copy);
      }
      if (chunks.length) {
        const merged = new Uint8Array(total);
        let offset = 0;
        for (const c of chunks) {
          merged.set(c, offset);
          offset += c.byteLength;
        }
        snap._rawBytes = merged; // consumed next by buildRequestBodyRecord
        snap.byteLength = merged.byteLength;
      }
    } catch (err) {
      snap.rawBodyUnavailable = true;
      snap.reason = String(err && err.message ? err.message : err);
    }
  }

  if (!snap.hasFormData && !snap.hasRaw && !snap.error) {
    snap.rawBodyUnavailable = true;
    snap.reason = "empty_requestBody";
  }

  return snap;
}

function looksLikeFormUrlEncoded(text) {
  if (!text || typeof text !== "string") return false;
  if (text.indexOf("=") === -1) return false;
  // Avoid treating JSON as form
  const t = text.trim();
  if (t.startsWith("{") || t.startsWith("[")) return false;
  return /[^=&\s]+=/.test(t) || t.indexOf("&") !== -1;
}

function parseUrlEncoded(text) {
  const parsed = {};
  try {
    const params = new URLSearchParams(text);
    for (const key of params.keys()) {
      const all = params.getAll(key);
      parsed[key] = all.length <= 1 ? all[0] : all;
    }
    return parsed;
  } catch (err) {
    return { __parseError: String(err && err.message ? err.message : err) };
  }
}

/**
 * Convert sync snapshot (possibly with _rawBytes) into a JSON-safe requestBody record.
 */
function buildRequestBodyRecord(snap) {
  if (!snap) {
    return { rawBodyUnavailable: true, reason: "no_requestBody" };
  }

  const record = {
    hasFormData: !!snap.hasFormData,
    hasRaw: !!snap.hasRaw
  };

  if (snap.error) record.error = snap.error;
  if (snap.formDataError) record.formDataError = snap.formDataError;
  if (snap.rawFile) record.rawFile = snap.rawFile;
  if (snap.byteLength != null) record.byteLength = snap.byteLength;

  if (snap.formData) {
    record.formData = sanitizeFormData(snap.formData);
  }

  if (snap._rawBytes) {
    try {
      let suspicious = 0;
      const bytes = snap._rawBytes;
      for (let i = 0; i < Math.min(bytes.byteLength, 512); i++) {
        if (bytes[i] === 0) suspicious++;
      }
      if (suspicious > 2) {
        record.rawBodyUnavailable = true;
        record.reason = "binary_null_bytes";
      } else {
        const decoder = new TextDecoder("utf-8");
        const bodyText = decoder.decode(bytes);
        record.rawText = truncateText(bodyText, MAX_BODY_CHARS);

        if (looksLikeFormUrlEncoded(bodyText)) {
          const parsed = parseUrlEncoded(bodyText);
          if (parsed.__parseError) {
            record.parseError = parsed.__parseError;
          } else {
            record.parsedBody = sanitizeParsedBody(parsed);
          }
        }
      }
    } catch (err) {
      record.rawBodyUnavailable = true;
      record.reason = String(err && err.message ? err.message : err);
    }
  } else if (snap.rawBodyUnavailable) {
    record.rawBodyUnavailable = true;
    if (snap.reason) record.reason = snap.reason;
  } else if (snap.hasRaw && !snap.formData) {
    record.rawBodyUnavailable = true;
    record.reason = snap.reason || "raw_not_decodable";
  }

  // If only formData exists, still fine — no raw needed
  if (!record.formData && !record.rawText && !record.parsedBody && !record.rawBodyUnavailable && !record.error) {
    if (!snap.hasFormData && !snap.hasRaw) {
      record.rawBodyUnavailable = true;
      record.reason = snap.reason || "empty_requestBody";
    }
  }

  return record;
}

function isDeleteApiUrl(url) {
  try {
    const u = String(url || "");
    return /\/ajax\/log_list_ajax\/delete/i.test(u);
  } catch {
    return false;
  }
}

function isDeleteRelatedUrl(url) {
  try {
    const u = String(url || "").toLowerCase();
    return isDeleteApiUrl(u) || /delete/i.test(u);
  } catch {
    return false;
  }
}

function defaultState() {
  return {
    recording: false,
    currentSessionId: null,
    sequence: 0,
    activeInteractionId: null,
    interactionUntil: 0,
    lastError: null,
    sessions: []
  };
}

async function getState() {
  const data = await chrome.storage.local.get(["analyzerState"]);
  return data.analyzerState ? { ...defaultState(), ...data.analyzerState } : defaultState();
}

async function setState(next) {
  await chrome.storage.local.set({ analyzerState: next });
  return next;
}

function findSession(state, sessionId) {
  return state.sessions.find((s) => s.sessionId === sessionId) || null;
}

async function appendEvent(partial) {
  try {
    const state = await getState();
    if (!state.recording || !state.currentSessionId) {
      return { ok: false, reason: "not_recording" };
    }

    const session = findSession(state, state.currentSessionId);
    if (!session) {
      return { ok: false, reason: "no_session" };
    }

    state.sequence += 1;
    const ts = partial.timestamp || nowIso();
    const interactionActive =
      state.activeInteractionId && Date.now() <= (state.interactionUntil || 0);

    const {
      sessionId: _ignoreSid,
      eventId: _ignoreEid,
      sequence: _ignoreSeq,
      ...rest
    } = partial || {};

    const event = sanitizeObject({
      ...rest,
      sessionId: state.currentSessionId,
      eventId: makeEventId(),
      sequence: state.sequence,
      timestamp: ts,
      eventType: rest.eventType || "unknown",
      pageUrl: rest.pageUrl || "",
      pageTitle: rest.pageTitle || "",
      interactionId:
        rest.interactionId ||
        (interactionActive ? state.activeInteractionId : undefined) ||
        undefined
    });

    const isNet =
      /^(network_|delete_network_)/.test(event.eventType || "");
    if (
      interactionActive &&
      isNet &&
      event.relatedDeleteInteraction == null
    ) {
      event.relatedDeleteInteraction = true;
      event.interactionId = state.activeInteractionId;
    }

    session.events.push(event);

    if (session.events.length > MAX_EVENTS) {
      session.events = session.events.slice(-MAX_EVENTS);
      session.eventsTruncated = true;
    }

    state.lastError = null;
    await setState(state);
    return { ok: true, sequence: state.sequence, eventCount: countEvents(state) };
  } catch (err) {
    try {
      const state = await getState();
      state.lastError = String(err && err.message ? err.message : err);
      await setState(state);
    } catch (_) {
      /* ignore */
    }
    return { ok: false, reason: "append_failed", error: String(err) };
  }
}

function countEvents(state) {
  return (state.sessions || []).reduce((n, s) => n + (s.events?.length || 0), 0);
}

async function startRecording() {
  const state = await getState();
  if (state.recording) {
    return { ok: true, already: true, state: publicStatus(state) };
  }
  const sessionId = makeSessionId();
  const startedAt = nowIso();
  state.recording = true;
  state.currentSessionId = sessionId;
  state.sequence = 0;
  state.activeInteractionId = null;
  state.interactionUntil = 0;
  state.lastError = null;
  state.sessions.push({
    sessionId,
    startedAt,
    endedAt: null,
    events: []
  });
  await setState(state);
  return { ok: true, state: publicStatus(await getState()) };
}

async function stopRecording() {
  const state = await getState();
  if (!state.recording) {
    return { ok: true, already: true, state: publicStatus(state) };
  }
  const session = findSession(state, state.currentSessionId);
  if (session) session.endedAt = nowIso();
  state.recording = false;
  state.activeInteractionId = null;
  state.interactionUntil = 0;
  await setState(state);
  return { ok: true, state: publicStatus(await getState()) };
}

async function clearLogs() {
  await setState(defaultState());
  return { ok: true, state: publicStatus(await getState()) };
}

function publicStatus(state) {
  return {
    recording: !!state.recording,
    currentSessionId: state.currentSessionId,
    eventCount: countEvents(state),
    lastError: state.lastError || null,
    sessionCount: (state.sessions || []).length
  };
}

function buildExportPayload(state) {
  const sessions = (state.sessions || []).map((s) =>
    sanitizeObject({
      sessionId: s.sessionId,
      startedAt: s.startedAt,
      endedAt: s.endedAt,
      eventsTruncated: s.eventsTruncated || false,
      events: (s.events || []).map((e) => sanitizeObject(e))
    })
  );

  return sanitizeObject({
    exportedAt: nowIso(),
    extensionVersion: EXTENSION_VERSION,
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "service-worker",
    note: "Sensitive fields (password, cookie, authorization, tokens, etc.) are redacted. requestBody/formData/parsedBody are preserved for delete-API analysis. service_code stores only presence/length.",
    sessions
  });
}

async function exportJson() {
  const state = await getState();
  const payload = buildExportPayload(state);
  const text = JSON.stringify(payload, null, 2);
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const filename = `dcinside-delete-analysis-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}.json`;
  return { ok: true, filename, json: text, eventCount: countEvents(state) };
}

// --- webRequest observation ---

const pendingRequests = new Map(); // requestId -> meta
const WEBREQUEST_URL_FILTER = [
  "https://gall.dcinside.com/*",
  "https://gallog.dcinside.com/*",
  "https://*.dcinside.com/*",
  "http://gall.dcinside.com/*",
  "http://gallog.dcinside.com/*",
  "http://*.dcinside.com/*"
];

function isDcinsideUrl(url) {
  try {
    const u = new URL(url);
    return u.hostname === "dcinside.com" || u.hostname.endsWith(".dcinside.com");
  } catch {
    return false;
  }
}

/**
 * Sync entry: copy requestBody immediately, then async persist.
 */
function onBeforeRequestSync(details) {
  try {
    if (!isDcinsideUrl(details.url)) return;

    // CRITICAL: clone body before any async work
    const bodySnap = snapshotRequestBodySync(details.requestBody);
    const capture = {
      requestId: details.requestId,
      url: details.url,
      method: details.method,
      type: details.type,
      initiator: details.initiator || "",
      tabId: details.tabId,
      timeStamp: details.timeStamp,
      capturedAt: nowIso(),
      bodySnap
    };

    pendingRequests.set(details.requestId, {
      url: details.url,
      method: details.method,
      type: details.type,
      initiator: details.initiator || "",
      tabId: details.tabId,
      isDeleteApi: isDeleteApiUrl(details.url),
      isDeleteRelated: isDeleteRelatedUrl(details.url),
      startedAt: capture.capturedAt,
      startedMs: Date.now()
    });

    persistBeforeRequest(capture);
  } catch (err) {
    appendEvent({
      eventType: "extension_error",
      pageUrl: details?.url || "",
      pageTitle: "",
      source: "background.onBeforeRequestSync",
      message: String(err && err.message ? err.message : err)
    }).catch(() => {});
  }
}

async function persistBeforeRequest(capture) {
  try {
    const state = await getState();
    if (!state.recording) return;

    const requestBody = buildRequestBodyRecord(capture.bodySnap);
    const interactionActive =
      state.activeInteractionId && Date.now() <= (state.interactionUntil || 0);
    const deleteApi = isDeleteApiUrl(capture.url);
    const eventType = deleteApi ? "delete_network_request" : "network_request";

    await appendEvent({
      eventType,
      pageUrl: capture.initiator || capture.url,
      pageTitle: "",
      requestId: capture.requestId,
      url: capture.url,
      method: capture.method,
      type: capture.type,
      resourceType: capture.type,
      initiator: capture.initiator,
      tabId: capture.tabId,
      webRequestTimeStamp: capture.timeStamp,
      timestamp: capture.capturedAt,
      requestBody,
      isDeleteApi: deleteApi,
      isDeleteRelated: isDeleteRelatedUrl(capture.url),
      relatedDeleteInteraction: !!(interactionActive || deleteApi),
      interactionId: interactionActive ? state.activeInteractionId : undefined
    });
  } catch (err) {
    await appendEvent({
      eventType: "extension_error",
      pageUrl: capture?.url || "",
      pageTitle: "",
      source: "background.persistBeforeRequest",
      message: String(err && err.message ? err.message : err)
    }).catch(() => {});
  }
}

async function onCompleted(details) {
  try {
    if (!isDcinsideUrl(details.url)) return;
    const state = await getState();
    if (!state.recording) return;

    const meta = pendingRequests.get(details.requestId) || {};
    pendingRequests.delete(details.requestId);

    const interactionActive =
      state.activeInteractionId && Date.now() <= (state.interactionUntil || 0);
    const deleteApi = meta.isDeleteApi || isDeleteApiUrl(details.url);
    const eventType = deleteApi ? "delete_network_response" : "network_response";

    await appendEvent({
      eventType,
      pageUrl: details.initiator || details.url,
      pageTitle: "",
      requestId: details.requestId,
      url: details.url,
      method: details.method,
      type: details.type,
      resourceType: details.type,
      tabId: details.tabId,
      statusCode: details.statusCode,
      fromCache: details.fromCache,
      timestamp: nowIso(),
      completedAt: nowIso(),
      startedAt: meta.startedAt || undefined,
      durationMs: meta.startedMs ? Date.now() - meta.startedMs : undefined,
      isDeleteApi: deleteApi,
      relatedDeleteInteraction: !!(interactionActive || deleteApi),
      interactionId: interactionActive ? state.activeInteractionId : undefined
    });
  } catch (err) {
    await appendEvent({
      eventType: "extension_error",
      pageUrl: details?.url || "",
      pageTitle: "",
      source: "background.onCompleted",
      message: String(err && err.message ? err.message : err)
    }).catch(() => {});
  }
}

async function onErrorOccurred(details) {
  try {
    if (!isDcinsideUrl(details.url)) return;
    const state = await getState();
    if (!state.recording) return;

    const meta = pendingRequests.get(details.requestId) || {};
    pendingRequests.delete(details.requestId);
    const interactionActive =
      state.activeInteractionId && Date.now() <= (state.interactionUntil || 0);
    const deleteApi = meta.isDeleteApi || isDeleteApiUrl(details.url);

    await appendEvent({
      eventType: deleteApi ? "delete_network_error" : "network_error",
      pageUrl: details.initiator || details.url,
      pageTitle: "",
      requestId: details.requestId,
      url: details.url,
      method: details.method,
      type: details.type,
      resourceType: details.type,
      tabId: details.tabId,
      error: details.error,
      timestamp: nowIso(),
      failedAt: nowIso(),
      isDeleteApi: deleteApi,
      relatedDeleteInteraction: !!(interactionActive || deleteApi),
      interactionId: interactionActive ? state.activeInteractionId : undefined
    });
  } catch (_) {
    /* ignore */
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  onBeforeRequestSync,
  { urls: WEBREQUEST_URL_FILTER },
  ["requestBody"]
);

chrome.webRequest.onCompleted.addListener(
  (details) => {
    onCompleted(details);
  },
  { urls: WEBREQUEST_URL_FILTER }
);

chrome.webRequest.onErrorOccurred.addListener(
  (details) => {
    onErrorOccurred(details);
  },
  { urls: WEBREQUEST_URL_FILTER }
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  (async () => {
    try {
      switch (message?.type) {
        case "GET_STATUS": {
          const state = await getState();
          sendResponse({
            ok: true,
            state: publicStatus(state),
            recording: state.recording,
            sessionId: state.currentSessionId
          });
          break;
        }
        case "START_RECORDING": {
          sendResponse(await startRecording());
          break;
        }
        case "STOP_RECORDING": {
          sendResponse(await stopRecording());
          break;
        }
        case "CLEAR_LOGS": {
          sendResponse(await clearLogs());
          break;
        }
        case "EXPORT_JSON": {
          sendResponse(await exportJson());
          break;
        }
        case "LOG_EVENT": {
          const result = await appendEvent({
            ...(message.event || {}),
            pageUrl: message.event?.pageUrl || sender.tab?.url || "",
            pageTitle: message.event?.pageTitle || sender.tab?.title || ""
          });
          sendResponse(result);
          break;
        }
        case "SET_INTERACTION": {
          const state = await getState();
          if (!state.recording) {
            sendResponse({ ok: false, reason: "not_recording" });
            break;
          }
          state.activeInteractionId = message.interactionId || `delete_${Date.now()}`;
          state.interactionUntil = Date.now() + (message.windowMs || INTERACTION_WINDOW_MS);
          await setState(state);
          sendResponse({
            ok: true,
            interactionId: state.activeInteractionId,
            until: state.interactionUntil
          });
          break;
        }
        case "EXTEND_INTERACTION": {
          const state = await getState();
          if (!state.recording || !state.activeInteractionId) {
            sendResponse({ ok: false });
            break;
          }
          state.interactionUntil = Math.max(
            state.interactionUntil || 0,
            Date.now() + (message.windowMs || INTERACTION_WINDOW_MS)
          );
          await setState(state);
          sendResponse({ ok: true, interactionId: state.activeInteractionId });
          break;
        }
        default:
          sendResponse({ ok: false, reason: "unknown_type" });
      }
    } catch (err) {
      sendResponse({ ok: false, error: String(err && err.message ? err.message : err) });
    }
  })();
  return true;
});
