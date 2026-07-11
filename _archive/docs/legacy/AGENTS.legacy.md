# AGENTS.md — kmong-templates

> Figma(1920) → Cursor(HTML/CSS/jQuery) 웹 템플릿 제작 가이드  
> 대상 플랫폼: **Cafe24 · Imweb** · 스택: **순수 HTML + CSS (+ jQuery)**

---

## 목차

1. [프로젝트 컨텍스트](#1-프로젝트-컨텍스트)
2. [에이전트 역할과 워크플로우](#2-에이전트-역할과-워크플로우)
3. [수치 변환 규칙 (px → vw · clamp)](#3-수치-변환-규칙-px--vw--clamp)
4. [네이밍 컨벤션](#4-네이밍-컨벤션)
5. [절대 하지 말 것](#5-절대-하지-말-것)
6. [PC + 모바일 동시 구현 원칙](#6-pc--모바일-동시-구현-원칙)
7. [섹션 완료 체크리스트](#7-섹션-완료-체크리스트)
8. [템플릿별 예외](#8-템플릿별-예외)
9. [참고: 디렉터리와 납품](#9-참고-디렉터리와-납품)

---

## 1. 프로젝트 컨텍스트

| 항목 | 값 |
|------|-----|
| 기준 Figma 프레임 | **1920px** (모니터 해상도와 무관, **뷰포트** 기준 스케일) |
| 반응형 기준 | **768px** 이하 = 모바일 |
| JS | **jQuery 3.x** (CDN) |
| CSS | 템플릿별 `css/style.css` (와이어프레임은 `_tokens/tokens.css` 참조) |
| 템플릿 | `template-a` · `template-b` · `template-c` |
| 납품 | `_delivery/cafe24` · `_delivery/imweb` |

**디자이너 워크플로우**

1. Figma 1920px 기준 디자인
2. Dev Mode / MCP 수치 → `px ÷ 19.2` vw 변환
3. **섹션 단위**로 에이전트에 구현 요청 (HTML 구조 → CSS → 필요 시 JS)

**에이전트가 할 일**

- Figma 수치를 **우선**한다. 추측으로 간격·폰트를 바꾸지 않는다.
- 요청 범위 **밖** 파일은 수정하지 않는다.
- 수정 전 **변경 파일 목록**과 **범위**를 짧게 제시한다 (대규모 작업 시).

---

## 2. 에이전트 역할과 워크플로우

### 2.1 섹션 구현 순서

```
Figma node 확인 → HTML 마크업 → CSS (PC) → CSS (@media 768) → JS(필요 시) → 체크리스트
```

### 2.2 요청 시 포함하면 좋은 정보

- Figma URL + **node-id**
- 대상 템플릿 (`template-c` 등)
- 와이어프레임 vs **픽셀 퍼펙트** 여부
- 서브페이지 / GNB active 페이지

### 2.3 Figma 프레임 이해도 확인 (REQUIRED)

MCP로 Figma 수치를 받은 후 코딩 전 반드시 아래 형식으로 먼저 보고한다:

**1. 섹션 구조**
- 최상위 레이어 이름
- 하위 레이어 몇 개로 구성됐는지

**2. 레이아웃 방식**
- Auto Layout 여부
- 방향 (가로 / 세로)
- gap 값

**3. 주요 수치**
- 섹션 전체 width / height
- padding (top / right / bottom / left)
- 주요 font-size

**4. 모호한 부분**
- 확인이 필요한 수치나 구조가 있으면 이 단계에서 질문
- 추측으로 처리하지 않는다

→ 위 보고 후 사용자가 "확인했어, 진행해" 라고 할 때까지 코딩 시작 금지.
→ 모호한 수치는 절대 추측하지 말고 반드시 먼저 질문할 것.

### 2.4 산출물 단위

| 단위 | 파일 |
|------|------|
| 페이지 | `index.html`, `about.html`, … |
| 스타일 | `css/style.css` |
| 인터랙션 | `js/main.js` |
| 에셋 | `assets/images/`, `assets/icons/` |

### 2.4 작업 시작 전 확인 (BEFORE CODING)

코딩 시작 전 반드시 아래 형식으로 한 줄 확인한다:

"작업 범위: [파일명] / [섹션명] / [변경 내용 요약]"

→ 이 확인 없이 코드 작성 시작 금지
→ 범위 밖 작업이 필요하면 코딩 전에 먼저 보고

---

## 3. 수치 변환 규칙 (px → vw · clamp)

### 3.1 기본 공식

```
vw = figma_px ÷ 19.2
CSS  = clamp(min_px, {vw}vw, figma_px)
```

**예:** Figma 36px → `clamp(18px, 1.875vw, 36px)`

| Figma px | vw |
|----------|-----|
| 16 | 0.8333vw |
| 24 | 1.25vw |
| 40 | 2.0833vw |
| 80 | 4.1667vw |
| 1840 | 95.8333vw |

### 3.2 clamp 최소값 (min) 가이드

| 용도 | min 비율 (@1920 max) |
|------|----------------------|
| Display / Heading | max의 **50%** |
| Body / UI / Caption | max의 **62.5%** |

### 3.3 vw를 쓰지 않는 것 (고정 px)

- **색상** (`#2563EB` 등 Figma hex 그대로)
- **font-weight** (400, 500, 700 …)
- **1px border**
- **letter-spacing** (Figma px 값 그대로, 필요 시 `-0.03em` 등은 Dev Mode 기준)

### 3.4 레이아웃 기본값 (@1920, 디자인과 다를 때 Figma 우선)

| 토큰 | 일반값 | template-c 예 |
|------|--------|----------------|
| 페이지 max-width | 1920px | 1920px |
| 콘텐츠 폭 | 1868px (gutter 26px) | **1840px** (gutter 40px) |
| 좁은 블록 | 1552px (`80.8333vw`) | 1218px 등 Figma 기준 |
| `--layout-pad-x` | `clamp(13px, 1.3542vw, 26px)` | `clamp(20px, 2.0833vw, 40px)` |

### 3.5 간격 · 섹션

- 섹션 프레임이 **맞닿으면(gap 0)** 바깥 `margin`으로 벌리지 말고 **프레임 내부 padding**만 반영.
- **padding 이중 적용 금지** (섹션 padding + 자식 margin-top으로 같은 간격 두 번 X).
- Figma **Auto Layout gap** → 그대로 `gap` / `margin` / `padding`으로 매핑.

### 3.6 이미지 · KV

- Figma **W × H** → `aspect-ratio: W / H` + `width: 100%` + `object-fit: cover`.
- **`min-height: 100vh`** 로 히어로/섹션 높이 잡지 말 것.
- Figma에서 **하드코딩 요청** 시 `@1920` px 그대로 사용 가능 (예: CEO KV `height: 483px`).

### 3.7 텍스트 박스 (고정 width / height)

| Figma | CSS |
|-------|-----|
| 고정 width | `clamp(min, Nvw, figma_px)` — **고정 px width 금지** |
| 고정 height | **`height` 고정 금지** → `min-height` 또는 line-height + auto |
| 줄바꿈 | `<br>`은 Figma와 동일할 때만; 모바일에서 숨길 경우 `@media`에서 `br { display: none }` |

### 3.8 타이포 (토큰 사용 템플릿)

- `_tokens/tokens.css`: 데스크톱 `typography-large-*`, 모바일 `typography-small-*`
- **template-a / template-c** 등은 `:root`에 Figma 값 직접 기록 — 해당 템플릿 규칙 따름

---

## 4. 네이밍 컨벤션

### 4.1 섹션 (필수)

```html
<section id="hero" class="section section--hero">
<section id="intro" class="section section--intro">
<header id="header" class="header">
<footer id="footer" class="footer">
```

- **id** = kebab-case 섹션명
- **class** = `section section--{섹션명}` (BEM modifier)
- 추가 섹션: `id="pricing"` → `class="section section--pricing"`

### 4.2 공통 레이아웃 블록

| class | 용도 |
|-------|------|
| `.container` | 1920 / 콘텐츠 폭 래퍼, 가운데 정렬 |
| `.narrow-wrap` | FAQ·Pricing 등 좁은 중앙 블록 |
| `.grid` | 그리드 간격 래퍼 |
| `.card` | 카드 단위 |
| `.section-title` | label + heading (+ desc) 묶음 |

### 4.3 BEM (블록__요소--수식어)

```
{block}__{element}--{modifier}
```

**예 (template-c GNB)**

- `.header` / `.header__nav` / `.header__nav-link` / `.header__nav-link.is-active`
- `.header__submenu` / `.header__submenu-link`
- `.btn` / `.btn--primary` / `.btn__label` / `.btn__track`

**규칙**

- 블록명은 **섹션 또는 컴포넌트** 1개를 가리킨다.
- `__`는 DOM 계층, `--`는 변형(variant).
- **상태**는 `.is-open`, `.is-active` (JS 토글용, GNB current는 HTML에 직접).

### 4.4 GNB active

- **JS로 current 처리 금지** — 페이지 HTML에 `is-active` / `aria-current="page"` 직접 부여.

### 4.5 JS 훅

- `data-faq`, `data-aos-stagger`, `data-gallery-carousel` 등 **data-* ** 로만 연결.

---

## 5. 절대 하지 말 것

### 5.1 마크업 · 스타일

| 금지 | 대안 |
|------|------|
| **인라인 `style=""`** | `style.css` 클래스 |
| **`!important` 남용** | specificity / 구조 수정 (FAQ·AOS 충돌 등 불가피한 경우만) |
| **고정 `width: Npx`** (텍스트·레이아웃) | `clamp` + vw |
| **고정 `height`** (텍스트 영역) | `min-height`, line-height, auto |
| **섹션 간 margin 이중** | Figma padding/gap만 반영 |
| **`100vh` 히어로** | aspect-ratio + Figma 높이 |

### 5.2 이미지 (템플릿 유형별)

| 유형 | 규칙 |
|------|------|
| **와이어프레임** (template-a/b 초기) | `<img>` 금지 → `.ph` 회색 placeholder |
| **Figma 납품 템플릿** (template-c 등) | `assets/` `<img>` 사용, `alt`·`width`·`height`·`decoding="async"` |

### 5.3 콘텐츠 · 파일

- 더미 외 **임의 브랜드명·실제 카피** 삽입 금지 (요청 없을 때).
- **`.env`·비밀키·불필요 YML/설정** 임의 생성 금지.
- **git commit / push** — 사용자가 명시할 때만.
- **scope 밖 대규모 리팩터** — 요청 없이 하지 않음.

### 5.4 JS

- GNB **active** 동적 처리 금지.
- jQuery 없이 DOM 조작 추가 금지 (프로젝트 기본은 jQuery).
- AOS / `slideToggle` 등 **CSS transition과 타이밍 충돌** 만들지 않기.

## 5.5 범위 이탈 금지 (STRICT SCOPE CONTROL)

### 원칙
에이전트는 요청된 범위만 처리한다.
요청 1개 = 변경 파일 최소화. 연관돼 보여도 건드리지 않는다.

### 절대 금지 행동

| 금지 | 예시 |
|------|------|
| 요청 안 한 섹션 추가 | "hero 만들어줘" → about 섹션도 같이 추가 |
| 요청 안 한 섹션 삭제 | 기존 section 태그 임의 제거 |
| 기존 클래스명 임의 변경 | `.section--hero` → `.hero-section` 으로 바꾸기 |
| 기존 텍스트·카피 임의 수정 | "더 자연스럽게" 이유로 바꾸기 |
| 기존 수치 임의 조정 | "더 좋아보여서" gap·font-size 바꾸기 |
| 불필요한 파일 생성 | 요청 없이 새 CSS·JS 파일 생성 |
| HTML 구조 외부 개편 | 요청 범위 밖 태그 계층 변경 |

### 예외 허용 조건 (반드시 먼저 알리고 승인받을 것)
- 요청 구현이 기존 코드 충돌로 불가능한 경우
- 수정 없이는 브라우저 에러가 발생하는 경우

→ 위 경우에도 먼저 보고 후 대기. 임의 처리 금지.

---

## 6. PC + 모바일 동시 구현 원칙

### 6.1 필수

- 스타일 수정 시 **PC + `@media (max-width: 768px)` 둘 다** 같은 PR/커밋에 포함.
- 모바일은 **구조 변경**(햄버거 GNB, 1열 그리드) + **타이포 축소**를 함께 검토.

### 6.2 모바일에서 자주 하는 일

| PC | Mobile (≤768px) |
|----|-------------------|
| GNB 가로 | `.menu-toggle` + `.header__nav.is-open` |
| 다열 grid | `grid-template-columns: 1fr` |
| 장식 `<br>` | `display: none` |
| hover 드롭다운 | 서브메뉴 인라인 노출 |
| vw clamp | min 값으로 가독성 확보 |

### 6.3 접근성

- `prefers-reduced-motion: reduce` → AOS·과한 transition 비활성화.
- 포커스 가능 요소 `:focus-visible` outline 유지.

---

## 7. 섹션 완료 체크리스트

섹션 1개 구현 후 **에이전트·디자이너 공통** 확인.

### 7.1 Figma 대조

- [ ] node-id 기준 **padding / gap / font-size / line-height / color** 일치
- [ ] 콘텐츠 폭·좌우 gutter Figma와 동일 축
- [ ] 이미지 **aspect-ratio** Figma W/H 일치
- [ ] Auto Layout gap → CSS gap/margin 1:1

### 7.2 HTML

- [ ] `section` id + `section--*` class 규칙 준수
- [ ] `.container` / `.narrow-wrap` 올바른 사용
- [ ] 시맨틱 태그 (`section`, `nav`, `h1`~`h3` 계층)
- [ ] GNB active는 해당 페이지 HTML에만 `is-active`

### 7.3 CSS

- [ ] 레이아웃 수치 = `clamp(min, figma_px÷19.2 vw, figma_px)` (또는 Figma 하드코딩 명시)
- [ ] **768px `@media`** 블록 반영
- [ ] 인라인 스타일 없음
- [ ] 텍스트 박스 `height` 고정 없음

### 7.4 인터랙션 (해당 시)

- [ ] FAQ: `slideToggle` duration 단일, `is-open` ↔ 애니메이션 동기
- [ ] AOS: `data-aos-anchor` 등 뷰포트 트리거 정상
- [ ] CTA hover: CSS only, 텍스트 수직 중앙 유지

### 7.5 크로스 페이지

- [ ] 헤더·푸터·퀵컨택트 **공통** 유지
- [ ] 링크 경로 (`about.html`, `#anchor`) 깨짐 없음

### 7.6 납품 전 (페이지 전체 완료 시)

- [ ] Cafe24 / Imweb 붙여넣기 깨짐 없음 (고정폭·overflow)
- [ ] `_delivery/{cafe24|imweb}` 정리 (사용자 요청 시)

---

## 8. 템플릿별 예외

| 템플릿 | 스타일 | 이미지 | 비고 |
|--------|--------|--------|------|
| **template-a** | `:root` Figma fluid, `_tokens` 타이포 **미사용** | 와이어: placeholder | clamp min 50% / 62.5% |
| **template-b** | `_tokens/tokens.css` import | 와이어: placeholder | |
| **template-c** | `:root` Figma 하드코딩, **tokens 미사용** | **실제 `<img>`** | 콘텐츠 1840px, SUIT CDN |

에이전트는 **작업 중인 템플릿 행**만 따른다. 다른 템플릿 규칙을 섞지 않는다.

---

## 9. 참고: 디렉터리와 납품

```
kmong-templates/
├── _tokens/tokens.css      # template-b 등
├── _common/                  # styleguide 등
├── _delivery/cafe24|imweb/   # 납품물
├── templates/
│   ├── template-a/
│   ├── template-b/
│   └── template-c/           # index, about, ceo-message, …
│       ├── index.html
│       ├── css/style.css
│       ├── js/main.js
│       └── assets/
```

---

## 부록: `.cursorrules`와의 관계

- **`.cursorrules`**: Cursor 전역 짧은 규칙 (레거시).
- **`AGENTS.md`**: 에이전트용 **목차형 하네스** — 섹션 작업·체크리스트·예외를 상세히 기술.
- **충돌 시**: 해당 **템플릿 예외**(§8) → **Figma Dev Mode 수치** → `.cursorrules` 순.

---

*초안 v1 — `.cursorrules` + template-c 실무 기준으로 작성. 수정 시 목차 번호만 유지하면 에이전트 컨텍스트가 안정적입니다.*
