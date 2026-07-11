(() => {
  if (window.__iconlySelectAllLoaded) return;
  window.__iconlySelectAllLoaded = true;

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function setStatus(text) {
    const el = document.getElementById('iconly-sa-status');
    if (el) el.textContent = text || '';
  }

  function isVisible(el) {
    if (!el || !(el instanceof Element)) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 40 || r.height < 40) return false;
    const st = getComputedStyle(el);
    if (st.display === 'none' || st.visibility === 'hidden' || st.opacity === '0') return false;
    return r.bottom > 0 && r.top < window.innerHeight + 200;
  }

  function looksLikeIconLabel(text) {
    const t = (text || '').trim();
    if (!t || t.length < 2 || t.length > 48) return false;
    // Iconly labels: "ARROW - UP CIRCLE", "BAG", "CALL SILENT"
    if (!/^[A-Z0-9][A-Z0-9 +\-/&.']*$/.test(t)) return false;
    if (/^(STROKE|COLOR|EXPORT|COPY SVG|ICONS?)$/i.test(t)) return false;
    return true;
  }

  function findLabelNodes() {
    const out = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    let node;
    while ((node = walk.nextNode())) {
      if (node.children.length > 3) continue;
      const text = (node.textContent || '').trim();
      if (!looksLikeIconLabel(text)) continue;
      // prefer leaf-ish nodes
      if ([...node.children].some((c) => looksLikeIconLabel((c.textContent || '').trim()))) continue;
      out.push(node);
    }
    return out;
  }

  function cardFromLabel(labelEl) {
    let el = labelEl;
    for (let i = 0; i < 6 && el; i++) {
      const r = el.getBoundingClientRect();
      const hasSvg = !!el.querySelector('svg, img, canvas');
      // card-ish: roughly square / tile, contains graphic + label
      if (hasSvg && r.width >= 64 && r.width <= 280 && r.height >= 64 && r.height <= 320) {
        return el;
      }
      el = el.parentElement;
    }
    return labelEl.parentElement;
  }

  function findCards() {
    const labels = findLabelNodes();
    const cards = [];
    const seen = new Set();
    for (const label of labels) {
      const card = cardFromLabel(label);
      if (!card || seen.has(card)) continue;
      seen.add(card);
      if (!isVisible(card)) continue;
      cards.push(card);
    }
    return cards;
  }

  function isSelected(card) {
    // Selected tiles show a check circle (screenshot). Heuristics:
    if (card.getAttribute('aria-selected') === 'true') return true;
    if (card.dataset.selected === 'true') return true;
    if (/\b(selected|active|checked)\b/i.test(card.className || '')) return true;
    // black circular check often near top-right
    const marks = card.querySelectorAll('svg, [class*="check"], [class*="Check"]');
    for (const m of marks) {
      const r = m.getBoundingClientRect();
      const cr = card.getBoundingClientRect();
      if (r.width >= 10 && r.width <= 28 && r.top <= cr.top + 28 && r.right >= cr.right - 36) {
        return true;
      }
    }
    return false;
  }

  function clickEl(el) {
    const opts = { bubbles: true, cancelable: true, view: window };
    el.dispatchEvent(new PointerEvent('pointerdown', opts));
    el.dispatchEvent(new MouseEvent('mousedown', opts));
    el.dispatchEvent(new PointerEvent('pointerup', opts));
    el.dispatchEvent(new MouseEvent('mouseup', opts));
    el.dispatchEvent(new MouseEvent('click', opts));
  }

  async function selectAllVisible({ onlyUnselected = true } = {}) {
    const cards = findCards();
    if (!cards.length) {
      setStatus('아이콘 카드를 못 찾았어요. 라이브러리 그리드가 보이는지 확인해주세요.');
      return 0;
    }
    let n = 0;
    for (const card of cards) {
      if (onlyUnselected && isSelected(card)) continue;
      clickEl(card);
      n += 1;
      await sleep(40);
    }
    setStatus(`선택 시도: ${n}개 (화면에 보인 카드 ${cards.length}개)`);
    return n;
  }

  async function deselectAllVisible() {
    // Prefer Iconly panel reset if present
    const resetBtn = [...document.querySelectorAll('button, [role="button"], div, span')].find((el) => {
      const t = (el.getAttribute('aria-label') || el.title || '').toLowerCase();
      return /reset|clear|deselect|unselect/.test(t);
    });
    if (resetBtn) {
      clickEl(resetBtn);
      setStatus('선택 초기화 버튼 클릭 시도');
      await sleep(200);
    }

    const cards = findCards().filter(isSelected);
    let n = 0;
    for (const card of cards) {
      clickEl(card);
      n += 1;
      await sleep(40);
    }
    setStatus(`선택 해제 시도: ${n}개`);
    return n;
  }

  async function selectAllWithScroll() {
    setStatus('스크롤하며 전체 선택 중…');
    let guard = 0;
    let totalClicks = 0;
    let stagnant = 0;
    let lastCount = -1;

    while (guard < 80) {
      guard += 1;
      const before = findCards().length;
      totalClicks += await selectAllVisible({ onlyUnselected: true });

      // scroll main area
      const scroller =
        document.scrollingElement ||
        document.querySelector('[style*="overflow"]') ||
        document.body;
      const prevTop = scroller.scrollTop || window.scrollY;
      if (scroller === document.body || scroller === document.documentElement) {
        window.scrollBy(0, Math.floor(window.innerHeight * 0.85));
      } else {
        scroller.scrollBy(0, Math.floor(scroller.clientHeight * 0.85));
      }
      await sleep(350);

      const after = findCards().length;
      const top = scroller.scrollTop || window.scrollY;
      if (after === lastCount && top === prevTop) stagnant += 1;
      else stagnant = 0;
      lastCount = after;
      if (stagnant >= 3) break;
      if (before === 0 && after === 0) break;
    }

    setStatus(`스크롤 선택 완료 · 클릭 약 ${totalClicks}회. 아래 Export를 누르세요.`);
  }

  function mountUi() {
    if (document.getElementById('iconly-sa-root')) return;

    const root = document.createElement('div');
    root.id = 'iconly-sa-root';
    root.innerHTML = `
      <button type="button" id="iconly-sa-toggle">Iconly 선택</button>
      <div id="iconly-sa-panel">
        <h1>전체 선택 도우미</h1>
        <p class="sub">선택만 자동화합니다. Export / Copy SVG는 Iconly 버튼을 쓰세요.</p>
        <div class="row">
          <button type="button" id="iconly-sa-select-visible">화면에 보이는 것 전체 선택</button>
          <button type="button" id="iconly-sa-select-scroll">스크롤하며 가능한 만큼 선택</button>
          <button type="button" class="secondary" id="iconly-sa-clear">선택 해제</button>
        </div>
        <div id="iconly-sa-status"></div>
      </div>
    `;
    document.documentElement.appendChild(root);

    const panel = root;
    const busy = async (fn) => {
      const buttons = [...root.querySelectorAll('button')];
      buttons.forEach((b) => (b.disabled = true));
      try {
        await fn();
      } catch (err) {
        setStatus('오류: ' + (err && err.message ? err.message : String(err)));
      } finally {
        buttons.forEach((b) => (b.disabled = false));
      }
    };

    root.querySelector('#iconly-sa-toggle').addEventListener('click', () => {
      panel.classList.toggle('is-collapsed');
    });
    root.querySelector('#iconly-sa-select-visible').addEventListener('click', () =>
      busy(() => selectAllVisible({ onlyUnselected: true }))
    );
    root.querySelector('#iconly-sa-select-scroll').addEventListener('click', () =>
      busy(() => selectAllWithScroll())
    );
    root.querySelector('#iconly-sa-clear').addEventListener('click', () =>
      busy(() => deselectAllVisible())
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountUi);
  } else {
    mountUi();
  }
})();
