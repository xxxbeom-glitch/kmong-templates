/**
 * Page-context hook (main world).
 * Dynamically resolves c_k_v / ci_t / service_code for delete API.
 * NEVER hardcodes secret values — reads cookie / DOM / runtime capture only.
 *
 * Also observes native delete XHR/fetch/jQuery ajax to learn live param sources
 * without issuing delete requests itself.
 */
(function () {
  "use strict";

  if (window.__DC_DELETE_TOOL_HOOKED__) return;
  window.__DC_DELETE_TOOL_HOOKED__ = true;

  const SOURCE = "dc-delete-tool-page-hook";
  const CAPTURE_KEY = "__dcDeleteToolCapturedAuth";

  function post(payload) {
    try {
      window.postMessage({ source: SOURCE, ...payload }, window.location.origin);
    } catch (_) {
      /* ignore */
    }
  }

  function getCookie(name) {
    try {
      const parts = String(document.cookie || "").split(";");
      for (const part of parts) {
        const idx = part.indexOf("=");
        if (idx === -1) continue;
        const k = part.slice(0, idx).trim();
        const v = part.slice(idx + 1).trim();
        if (k === name) return decodeURIComponent(v);
      }
    } catch (_) {
      /* ignore */
    }
    return null;
  }

  function readHidden(name) {
    try {
      const el =
        document.querySelector(`input[type="hidden"][name="${name}"]`) ||
        document.querySelector(`input[name="${name}"]`);
      const v = el && el.value != null ? String(el.value) : "";
      return v || null;
    } catch (_) {
      return null;
    }
  }

  function readGlobal(name) {
    try {
      if (typeof window[name] === "string" && window[name]) return window[name];
      if (typeof window[name] === "number") return String(window[name]);
    } catch (_) {
      /* ignore */
    }
    return null;
  }

  function readViaJqueryCookie(name) {
    try {
      if (window.jQuery && typeof window.jQuery.cookie === "function") {
        const v = window.jQuery.cookie(name);
        if (v != null && String(v) !== "") return String(v);
      }
    } catch (_) {
      /* ignore */
    }
    return null;
  }

  function readViaGetCookieFn(name) {
    try {
      if (typeof window.get_cookie === "function") {
        const v = window.get_cookie(name);
        if (v != null && String(v) !== "") return String(v);
      }
      if (typeof window.getCookie === "function") {
        const v = window.getCookie(name);
        if (v != null && String(v) !== "") return String(v);
      }
    } catch (_) {
      /* ignore */
    }
    return null;
  }

  function getCaptured() {
    try {
      return window[CAPTURE_KEY] || null;
    } catch (_) {
      return null;
    }
  }

  function setCaptured(partial) {
    try {
      const prev = getCaptured() || {};
      window[CAPTURE_KEY] = {
        ...prev,
        ...partial,
        capturedAt: Date.now()
      };
    } catch (_) {
      /* ignore */
    }
  }

  /**
   * Resolve one auth field from multiple live sources (priority order).
   * Sources reported for debugging — values never hardcoded.
   */
  function resolveField(name) {
    const attempts = [
      { source: "captured_delete_request", value: (getCaptured() || {})[name] },
      { source: "hidden_input", value: readHidden(name) },
      { source: "jquery_cookie", value: readViaJqueryCookie(name) },
      { source: "get_cookie_fn", value: readViaGetCookieFn(name) },
      { source: "document_cookie", value: getCookie(name) },
      { source: "window_global", value: readGlobal(name) }
    ];
    for (const a of attempts) {
      if (a.value != null && String(a.value).length > 0) {
        return { value: String(a.value), source: a.source };
      }
    }
    return { value: null, source: null };
  }

  function resolveAuth() {
    const service = resolveField("service_code");
    // service_code preferred from dedicated hidden input (always refresh)
    const serviceFromDom = readHidden("service_code");
    const ci = resolveField("ci_t");
    const ck = resolveField("c_k_v");

    const auth = {
      service_code: serviceFromDom || service.value,
      service_code_source: serviceFromDom ? "hidden_input" : service.source,
      ci_t: ci.value,
      ci_t_source: ci.source,
      c_k_v: ck.value,
      c_k_v_source: ck.source,
      ok: false,
      missing: []
    };

    if (!auth.service_code) auth.missing.push("service_code");
    if (!auth.ci_t) auth.missing.push("ci_t");
    if (!auth.c_k_v) auth.missing.push("c_k_v");
    auth.ok = auth.missing.length === 0;
    return auth;
  }

  function isDeleteUrl(url) {
    return /\/ajax\/log_list_ajax\/delete/i.test(String(url || ""));
  }

  function absorbParams(params) {
    if (!params || typeof params !== "object") return;
    const next = {};
    ["c_k_v", "ci_t", "service_code"].forEach((k) => {
      if (params[k] != null && String(params[k]) !== "") {
        next[k] = String(params[k]);
      }
    });
    if (Object.keys(next).length) setCaptured(next);
  }

  function parseBodyString(body) {
    const out = {};
    try {
      if (typeof body !== "string") return out;
      const sp = new URLSearchParams(body);
      sp.forEach((v, k) => {
        out[k] = v;
      });
    } catch (_) {
      /* ignore */
    }
    return out;
  }

  function formDataToObject(fd) {
    const out = {};
    try {
      if (!fd || typeof fd.entries !== "function") return out;
      for (const [k, v] of fd.entries()) {
        if (typeof v === "string") out[k] = v;
      }
    } catch (_) {
      /* ignore */
    }
    return out;
  }

  // Observe native network builders so we learn auth field sources if user deletes once.
  try {
    const origFetch = window.fetch;
    if (typeof origFetch === "function") {
      window.fetch = function hookedFetch(input, init) {
        try {
          const url = typeof input === "string" ? input : input && input.url;
          if (isDeleteUrl(url) && init && init.body) {
            if (typeof init.body === "string") absorbParams(parseBodyString(init.body));
            else if (typeof FormData !== "undefined" && init.body instanceof FormData) {
              absorbParams(formDataToObject(init.body));
            } else if (typeof URLSearchParams !== "undefined" && init.body instanceof URLSearchParams) {
              const o = {};
              init.body.forEach((v, k) => {
                o[k] = v;
              });
              absorbParams(o);
            }
          }
        } catch (_) {
          /* never block */
        }
        return origFetch.apply(this, arguments);
      };
    }
  } catch (_) {
    /* ignore */
  }

  try {
    const XO = XMLHttpRequest.prototype.open;
    const XS = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function (method, url) {
      this.__dcDeleteUrl = url;
      return XO.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function (body) {
      try {
        if (isDeleteUrl(this.__dcDeleteUrl) && body) {
          if (typeof body === "string") absorbParams(parseBodyString(body));
          else if (typeof FormData !== "undefined" && body instanceof FormData) {
            absorbParams(formDataToObject(body));
          }
        }
      } catch (_) {
        /* ignore */
      }
      return XS.apply(this, arguments);
    };
  } catch (_) {
    /* ignore */
  }

  try {
    const hookJquery = () => {
      if (!window.jQuery || !window.jQuery.ajax || window.jQuery.ajax.__dcHooked) return;
      const $ = window.jQuery;
      const origAjax = $.ajax;
      function wrappedAjax(url, options) {
        let opts = options;
        let u = url;
        if (typeof url === "object") {
          opts = url;
          u = opts.url;
        }
        try {
          if (isDeleteUrl(u) && opts && opts.data) {
            if (typeof opts.data === "string") absorbParams(parseBodyString(opts.data));
            else if (typeof opts.data === "object") absorbParams(opts.data);
          }
        } catch (_) {
          /* ignore */
        }
        return origAjax.apply(this, arguments);
      }
      wrappedAjax.__dcHooked = true;
      $.ajax = wrappedAjax;
    };
    hookJquery();
    // Retry briefly in case jQuery loads late
    let n = 0;
    const t = setInterval(() => {
      n++;
      hookJquery();
      if (n > 20) clearInterval(t);
    }, 250);
  } catch (_) {
    /* ignore */
  }

  window.addEventListener("message", (event) => {
    try {
      if (event.source !== window) return;
      const data = event.data;
      if (!data || data.source !== "dc-delete-tool-content" || !data.requestId) return;

      if (data.action === "RESOLVE_AUTH") {
        const auth = resolveAuth();
        // Do not echo full secret values back in console; post to content only.
        post({
          action: "RESOLVE_AUTH_RESULT",
          requestId: data.requestId,
          auth: {
            ok: auth.ok,
            missing: auth.missing,
            service_code: auth.service_code,
            ci_t: auth.ci_t,
            c_k_v: auth.c_k_v,
            sources: {
              service_code: auth.service_code_source,
              ci_t: auth.ci_t_source,
              c_k_v: auth.c_k_v_source
            }
          }
        });
      }
    } catch (_) {
      /* ignore */
    }
  });

  post({ action: "HOOK_READY" });
})();
