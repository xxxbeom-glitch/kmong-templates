# Figma to Code Guide

> Cursor 규칙: `.cursor/rules/30-figma-to-code.mdc`

## 기준

- Figma 프레임 **1920px** (모니터 해상도와 무관, **브라우저 뷰포트** 기준)
- 모바일 breakpoint: **768px 이하**
- Figma 수치와 구현이 다르면 **Figma 우선**

---

## MCP 전달 전 — 디자이너 체크리스트

- [ ] 작업 프레임 너비 1920px 고정
- [ ] 섹션별로 **프레임 분리** (한 덩어리 X)
- [ ] Auto Layout 적용 · gap·padding 명시
- [ ] 텍스트: 고정 width는 OK, **고정 height 금지** (auto height)
- [ ] 이미지: 실제 비율 유지 (임의 stretch 금지)
- [ ] 색상·폰트는 스타일 일관 (템플릿 `:root`에 반영할 값)
- [ ] 전달 시 **Figma URL + node-id** 포함

---

## MCP 수신 후 — 구현 전 분석 (코딩 전 필수)

- [ ] 최상위 레이어 이름 · 하위 레이어 개수
- [ ] Auto Layout 여부 · 방향(가로/세로) · gap
- [ ] 섹션 width / height · padding (T/R/B/L)
- [ ] 주요 font-size · line-height · color
- [ ] 모호한 수치는 **질문 후 승인** — 추측 금지

---

## 레이아웃 매핑

| Figma | CSS |
|-------|-----|
| Auto Layout gap | `gap` 또는 padding/margin 1:1 |
| 섹션 프레임 맞닿음 (gap 0) | 바깥 margin 금지 → **프레임 padding만** |
| padding 이중 | 섹션 padding + 자식 margin-top 중복 금지 |
| 이미지 W×H | `aspect-ratio: W/H` + `width:100%` + `object-fit:cover` |
| 텍스트 고정 width | `clamp(min, figma_px÷19.2 vw, figma_px)` |
| 텍스트 고정 height | **금지** → `min-height` 또는 auto |
| 히어로·KV | `min-height:100vh` **금지** |

---

## px → vw / clamp

```
vw   = figma_px ÷ 19.2
CSS  = clamp(min_px, {vw}vw, figma_px)
```

| 용도 | clamp min (max 대비) |
|------|----------------------|
| Display / Heading | 50% |
| Body / UI / Caption | 62.5% |

**vw 미적용 (고정값):** color · font-weight · 1px border · letter-spacing

**예:** 36px → `clamp(18px, 1.875vw, 36px)`

> 사용자가 **하드코딩 요청**한 경우에만 `@1920` px 고정 허용

---

## 모바일 (≤768px)

- [ ] PC CSS 작성과 **같은 커밋**에 `@media (max-width:768px)` 포함
- [ ] 다열 grid → 1열 전환 검토
- [ ] GNB → 햄버거 메뉴
- [ ] 장식용 `<br>` → `display:none` 검토
- [ ] clamp min 값으로 가독성 확보

---

## 구현 순서

```
HTML 마크업 → CSS(PC) → CSS(@media 768) → JS(필요 시) → QA
```

섹션 네이밍: `id="hero"` + `class="section section--hero"` — `.cursor/rules/40-template-code-style.mdc` 참고
