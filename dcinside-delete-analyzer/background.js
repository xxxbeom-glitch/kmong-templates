/**
 * Service worker: recording session, storage, webRequest observation, export.
 * DOM APIs are not used here.
 */

const EXTENSION_VERSION = "1.0.0";
const INTERACTION_WINDOW_MS = 15000;
const MAX_HTML_CHARS = 50 * 1024;
const MAX_EVENTS = 2000;

const SENSITIVE_KEY_RE =
  /^(password|passwd|pwd|pass|cookie|set-cookie|authorization|session|sessionid|session_id|token|access_token|refresh_token|auth|csrf|csrf_token|_csrf|xsrf|xsrf_token|si_token|ci_t|PHPSESSID|remember|secret|api[_-]?key)$/i;

const SENSITIVE_VALUE_HINT_RE =
  /password|passwd|authorization|bearer\s+[a-z0-9._\-]+|sessionid|access_token|refresh_token/i;

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

function isSensitiveKey(key) {
  if (!key || typeof key !== "string") return false;
  return SENSITIVE_KEY_RE.test(key.trim());
}

function truncateHtml(html) {
  if (html == null) return html;
  const s = String(html);
  if (s.length <= MAX_HTML_CHARS) return s;
  return s.slice(0, MAX_HTML_CHARS) + `\n<!-- truncated: originalLength=${s.length} -->`;
}

function sanitizeValue(key, value) {
  if (value == null) return value;
  if (isSensitiveKey(key)) return "[REDACTED]";
  if (typeof value === "string") {
    if (SENSITIVE_VALUE_HINT_RE.test(value)) return "[REDACTED]";
    if (value.length > MAX_HTML_CHARS) {
      return value.slice(0, MAX_HTML_CHARS) + `…[truncated len=${value.length}]`;
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((v) => sanitizeValue(key, v));
  }
  if (typeof value === "object") {
    return sanitizeObject(value);
  }
  return value;
}

function sanitizeObject(obj) {
  if (obj == null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map((item) => sanitizeObject(item));
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (isSensitiveKey(k)) {
      out[k] = "[REDACTED]";
      continue;
    }
    // Never keep raw header maps
    if (/^(headers|requestHeaders|responseHeaders|cookie|setCookie)$/i.test(k)) {
      out[k] = "[OMITTED]";
      continue;
    }
    if (typeof v === "string" && /(html|outerHTML|innerHTML)$/i.test(k)) {
      out[k] = truncateHtml(sanitizeValue(k, v));
      continue;
    }
    out[k] = sanitizeValue(k, v);
  }
  return out;
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

    // relatedDeleteInteraction for network within window
    if (
      interactionActive &&
      /^network_/.test(event.eventType) &&
      event.relatedDeleteInteraction == null
    ) {
      event.relatedDeleteInteraction = true;
      event.interactionId = state.activeInteractionId;
    }

    session.events.push(event);

    // Cap events to avoid storage blow-up
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
  // Content scripts watch chrome.storage.onChanged and take page_snapshot.
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
    note: "Sensitive fields (password, cookie, authorization, tokens, etc.) are redacted or omitted.",
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

function isDcinsideUrl(url) {
  try {
    const u = new URL(url);
    return u.hostname === "dcinside.com" || u.hostname.endsWith(".dcinside.com");
  } catch {
    return false;
  }
}

function decodeRawBody(rawChunks) {
  if (!rawChunks || !rawChunks.length) {
    return { rawBodyUnavailable: true, reason: "empty_raw" };
  }
  try {
    let total = 0;
    const parts = [];
    for (const chunk of rawChunks) {
      if (!chunk || !chunk.bytes) {
        return { rawBodyUnavailable: true, reason: "binary_or_missing_bytes" };
      }
      const bytes = chunk.bytes instanceof ArrayBuffer ? new Uint8Array(chunk.bytes) : new Uint8Array(chunk.bytes);
      total += bytes.length;
      if (total > 64 * 1024) {
        return { rawBodyUnavailable: true, reason: "too_large", byteLength: total };
      }
      parts.push(bytes);
    }
    const merged = new Uint8Array(total);
    let offset = 0;
    for (const p of parts) {
      merged.set(p, offset);
      offset += p.length;
    }
    // Reject obvious binary
    let suspicious = 0;
    for (let i = 0; i < Math.min(merged.length, 512); i++) {
      const b = merged[i];
      if (b === 0) suspicious++;
    }
    if (suspicious > 2) {
      return { rawBodyUnavailable: true, reason: "binary_null_bytes", byteLength: merged.length };
    }
    const text = new TextDecoder("utf-8", { fatal: false }).decode(merged);
    return { rawTextPreview: text.slice(0, 8000), byteLength: merged.length };
  } catch (err) {
    return { rawBodyUnavailable: true, reason: String(err && err.message ? err.message : err) };
  }
}

function sanitizeFormData(formData) {
  if (!formData || typeof formData !== "object") return formData;
  const out = {};
  for (const [key, values] of Object.entries(formData)) {
    const arr = Array.isArray(values) ? values : [values];
    out[key] = isSensitiveKey(key)
      ? arr.map(() => "[REDACTED]")
      : arr.map((v) => {
          if (typeof v === "string" && SENSITIVE_VALUE_HINT_RE.test(v)) return "[REDACTED]";
          return typeof v === "string" && v.length > 4000 ? v.slice(0, 4000) + "…[truncated]" : v;
        });
  }
  return out;
}

async function onBeforeRequest(details) {
  try {
    if (!isDcinsideUrl(details.url)) return;
    const state = await getState();
    if (!state.recording) return;

    const bodyInfo = {};
    if (details.requestBody) {
      if (details.requestBody.formData) {
        bodyInfo.formData = sanitizeFormData(details.requestBody.formData);
      } else if (details.requestBody.raw) {
        Object.assign(bodyInfo, decodeRawBody(details.requestBody.raw));
      } else {
        bodyInfo.rawBodyUnavailable = true;
        bodyInfo.reason = "no_formData_or_raw";
      }
    }

    pendingRequests.set(details.requestId, {
      url: details.url,
      method: details.method,
      type: details.type,
      initiator: details.initiator || "",
      startedAt: nowIso(),
      startedMs: Date.now()
    });

    const interactionActive =
      state.activeInteractionId && Date.now() <= (state.interactionUntil || 0);

    await appendEvent({
      eventType: "network_request",
      pageUrl: details.initiator || details.url,
      pageTitle: "",
      requestId: details.requestId,
      url: details.url,
      method: details.method,
      resourceType: details.type,
      initiator: details.initiator || "",
      startedAt: nowIso(),
      requestBody: Object.keys(bodyInfo).length ? bodyInfo : undefined,
      relatedDeleteInteraction: !!interactionActive,
      interactionId: interactionActive ? state.activeInteractionId : undefined
    });
  } catch (err) {
    await appendEvent({
      eventType: "extension_error",
      pageUrl: details?.url || "",
      pageTitle: "",
      source: "background.onBeforeRequest",
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

    await appendEvent({
      eventType: "network_response",
      pageUrl: details.initiator || details.url,
      pageTitle: "",
      requestId: details.requestId,
      url: details.url,
      method: details.method,
      resourceType: details.type,
      statusCode: details.statusCode,
      fromCache: details.fromCache,
      completedAt: nowIso(),
      startedAt: meta.startedAt || undefined,
      durationMs: meta.startedMs ? Date.now() - meta.startedMs : undefined,
      relatedDeleteInteraction: !!interactionActive,
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

    pendingRequests.delete(details.requestId);
    const interactionActive =
      state.activeInteractionId && Date.now() <= (state.interactionUntil || 0);

    await appendEvent({
      eventType: "network_error",
      pageUrl: details.initiator || details.url,
      pageTitle: "",
      requestId: details.requestId,
      url: details.url,
      method: details.method,
      resourceType: details.type,
      error: details.error,
      failedAt: nowIso(),
      relatedDeleteInteraction: !!interactionActive,
      interactionId: interactionActive ? state.activeInteractionId : undefined
    });
  } catch (_) {
    /* ignore */
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    onBeforeRequest(details);
  },
  { urls: ["https://gall.dcinside.com/*", "https://*.dcinside.com/*"] },
  ["requestBody"]
);

chrome.webRequest.onCompleted.addListener(
  (details) => {
    onCompleted(details);
  },
  { urls: ["https://gall.dcinside.com/*", "https://*.dcinside.com/*"] }
);

chrome.webRequest.onErrorOccurred.addListener(
  (details) => {
    onErrorOccurred(details);
  },
  { urls: ["https://gall.dcinside.com/*", "https://*.dcinside.com/*"] }
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  (async () => {
    try {
      switch (message?.type) {
        case "GET_STATUS": {
          const state = await getState();
          sendResponse({ ok: true, state: publicStatus(state), recording: state.recording, sessionId: state.currentSessionId });
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
  return true; // async
});
