# Figma to Code Guide

> Cursor 규칙: `.cursor/rules/30-figma-to-code.mdc`

## 기준

- Figma 프레임 **1920px** (모니터 해상도와 무관, **브라우저 뷰포트** 기준)
- 모바일 breakpoint: **768px 이하** · 태블릿: **1024px 이하** — 상세 `35-responsive.mdc`
- Figma 수치와 구현이 다르면 **Figma 우선**

---

## MCP 전달 전 — 디자이너 체크리스트

- [ ] **최상위 프레임명** 확정 (이 이름이 템플릿 slug의 기준)
- [ ] 프레임명 규칙: `template_{브랜드명}` 권장 (예: `template_claire_clinic`)
- [ ] 작업 프레임 너비 1920px 고정
- [ ] 섹션별로 **프레임 분리** (한 덩어리 X)
- [ ] Auto Layout 적용 · gap·padding 명시
- [ ] 텍스트: 고정 width는 OK, **고정 height 금지** (auto height)
- [ ] 이미지: 실제 비율 유지 (임의 stretch 금지)
- [ ] 색상·폰트는 스타일 일관 (템플릿 `:root`에 반영할 값)
- [ ] 전달 시 **Figma URL + node-id** 포함

---

## MCP 수신 후 — 구현 전 분석 (코딩 전 필수)

### 템플릿명 확인 (신규 시)

- [ ] 최상위 프레임명 보고 → slug 정규화 **제안** → 사용자 승인
- [ ] 승인 전 `templates/{slug}/` 생성 금지
- [ ] `templates/`에 기존 폴더가 있으면 신규 생성 전 사용자와 충돌 확인

> 리셋 후 `templates/`는 비어 있는 것이 정상이다. legacy 템플릿은 `_docs/legacy/templates/` 참고만.

제안 예:
```
Figma frame: template_ontheblue
Proposed slug: ontheblue
Proposed folder: templates/ontheblue/
```

### 섹션·수치 분석

- [ ] **`add_figma_file` JSON 파싱** — `view_node` 썸네일만으로 Section BG·overlay 확정 **금지** (`30-figma-to-code.mdc` 「MCP JSON 분석」)
- [ ] 최상위 레이어 이름 · 하위 레이어(섹션) 개수
- [ ] Auto Layout 여부 · 방향(가로/세로) · gap
- [ ] 섹션 width / height · padding (T/R/B/L)
- [ ] 주요 font-size · line-height · color
- [ ] **Section shell** — guttered / full-bleed / breakout (`30-figma-to-code.mdc` 「Section shell · full-bleed」) · MCP bbox 근거 1줄
- [ ] **Section BG** — `Section BG: #hex · node-id · (fills SOLID | fill 없음 → 부모 node-id)` 1줄 · **`backgroundColor`만으로 확정 금지**
- [ ] **인접 Section BG 표** — 페이지 신규·배경 수정·2섹션+ 일괄 시 직전·직후 섹션 hex 대조 (`30` 「인접 섹션 BG 대조」)
- [ ] **Overlays** — `Overlays: none | gradient(...) | flat rgba` 1줄 · 대상 node-id · fills[] **IMAGE 외 전수** · **Section BG와 분리**
- [ ] **CSS BG 토큰** — 섹션마다 hex 다르면 `--color-bg-{section}` 등 **분리** (공통 `--color-bg` 단일값 통합 금지)
- [ ] **title/head/body copy `textAlignHorizontal` · head wrapper Auto Layout align**
- [ ] 모호한 수치는 **질문 후 승인** — 추측 금지

---

## 레이아웃 매핑

| Figma | CSS |
|-------|-----|
| Auto Layout gap | `gap` 또는 padding/margin — **bbox 실측 우선** (`30-figma-to-code.mdc` 「Gap · spacing」) |
| 섹션 프레임 맞닿음 (gap 0) | 바깥 margin 금지 → **프레임 padding만** |
| padding 이중 | 섹션 padding + 자식 margin-top 중복 금지 |
| 이미지 W×H (카드·KV) | 틀 `aspect-ratio` + img **`object-fit: cover`** (Figma Fill) — 원본 크기·비율 달라도 틀에 맞게 축소 후 채움 |
| 텍스트 고정 width | `clamp(min, figma_px÷19.2 vw, figma_px)` |
| TEXT `textAlignHorizontal` | `text-align: left \| center \| right` (MCP 1:1) |
| Auto Layout align | flex `align-items` / `justify-content` (MCP 1:1) |
| Section shell (bbox) | guttered / full-bleed / breakout → `30-figma-to-code.mdc` 「Section shell · full-bleed」 |
| Gutter + inner | section `padding-inline` · inner `.section-shell` (`max-width` only) — **pad 이중 금지** |
| GRADIENT / fill opacity | CSS overlay (`::after` 등) — PNG flatten만 **금지** |
| Logo PNG | content bbox crop · img `width` + `height:auto` |
| 텍스트 고정 height | **금지** → `min-height` 또는 auto |
| 히어로·KV | `min-height:100vh` **금지** |

---

## Fluid scale (필수)

> **canonical:** `.cursor/rules/30-figma-to-code.mdc` 「Fluid scale」

- **1920** = Figma 설계 기준. 템플릿마다 gutter·inner 폭은 **MCP 수치** (1840 등 고정 가정 없음)
- **모든 Figma px** (padding, gap, font-size, gutter, shell 폭) → vw/clamp
- **gutter:** `max(min_px, {gutter÷19.2}vw)` — shell용 max cap 없음
- **shell 콘텐츠** (MCP 풀폭): pad 안 `width: 100%` — shell `max-width` cap 금지
- **inner narrow:** 해당 블록만 max-width + clamp/vw

**금지:** shell `clamp(..., {content_px})` cap → ultrawide 좌우 여백 과다 · font/gap @1920 px 고정

**QA:** `50-qa-checklist.mdc` 「Fluid scale QA」 — 1920 · **2560+** 필수

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

> 사용자 **하드코딩 요청** 시에만 `@1920` px 고정 허용

---

## 태블릿 (≤1024px)

- [ ] PC CSS와 **같은 섹션 작업**에 `@media (max-width:1024px)` 포함
- [ ] 다열 grid·가로 flex → 1~2열 축소·간격 조정

---

## 모바일 (≤768px)

> 상세: `35-responsive.mdc` 「모바일 @768 — gutter · 칼럼 · shell」 · `30-figma-to-code.mdc` 「Shell — @768」

- [ ] PC·1024 CSS와 **같은 섹션 작업**에 `@media (max-width:768px)` 포함
- [ ] `@768` `:root` — `--side-padding`(gutter) **PC 값 override** · 확정 px → **decision-log**
- [ ] **gutter 한 군데만** — section `padding-inline: 0` + `.section-shell` pad **또는** 역할 분리 · **이중 pad 금지**
- [ ] 가로 배치 → **세로 스택(1열)** · PC `grid-template-columns: 2+` → `@768` **`1fr` 명시**
- [ ] **full-bleed @768** — `section > panel(bleed) > inner.section-shell(gutter)`
- [ ] header · hero · 본문 — **동일 gutter 시작선** · 로고 bbox crop 또는 interim margin
- [ ] 가로 슬라이더 — `calc((100vw - var(--side-padding)) * peek)` · `100vw` 단독 width **금지**
- [ ] GNB → 햄버거 메뉴
- [ ] hover-only UI → 비활성화 또는 터치 대체 UI
- [ ] 장식용 `<br>` → `display:none` 검토
- [ ] clamp min 값으로 가독성 확보 · body **floor 16px**
- [ ] 버튼·링크 터치 영역 **≥44×44px**
- [ ] **390px** — 시작선·1열·overflow 확인 (`50-qa-checklist.mdc` 「모바일 @768 gutter · 시작선 QA」)

---

## QA 뷰포트 (필수)

1920 · 1440 · 1024 · 768 · 390px — 레이아웃 깨짐 · overflow · 줄바꿈 · aspect-ratio · 터치 영역

**Wrap 내 정렬:** shell·gutter PASS만으로 끝내지 않음 — `_docs/qa-checklist.md` **§2-2** · `figure` UA margin reset · @1920 형제 edge 캡처

---

## 구현 순서

```
HTML 마크업 → CSS(PC) → CSS(@1024) → CSS(@768) → JS(필요 시) → QA
```

섹션 네이밍: `id="hero"` + `class="section section--hero"` — `.cursor/rules/40-template-code-style.mdc` 참고
