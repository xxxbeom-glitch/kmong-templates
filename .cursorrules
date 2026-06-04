# KMONG-TEMPLATES 프로젝트 규칙

- 이 프로젝트는 카페24, 아임웹용 반응형 웹 템플릿 제작 프로젝트임
- 스타일 변수는 반드시 `_tokens/tokens.css`의 CSS 커스텀 프로퍼티를 사용할 것
- JS는 jQuery 기반으로 작성할 것
- 반응형 breakpoint는 768px 기준 (이하 모바일)
- 템플릿은 template-a, template-b, template-c 구조로 관리
- 납품 시 `_delivery/cafe24` 또는 `_delivery/imweb` 폴더에 정리
- 스타일 수정 시 PC와 모바일(768px 이하) 둘 다 항상 함께 반영할 것
- 이미지는 항상 회색 placeholder 박스로 처리, img 태그 사용 금지
- 텍스트는 더미 텍스트로 채울 것, 실제 브랜드명/내용 임의 삽입 금지
- 새 파일 생성 전 반드시 어떤 파일을 만들 것인지 먼저 설명할 것
- 코드 수정 전 변경할 내용과 범위를 먼저 설명하고 확인 후 진행할 것
- 불필요한 YML, 설정 파일 등 임의 생성 금지
- 여러 파일 동시 수정 시 수정할 파일 목록 먼저 나열할 것
- GNB active 상태는 JS로 동적 처리하지 말고 각 HTML 파일에 직접 클래스로 처리할 것

## Figma · 레이아웃 스케일 (1920 기준 — 항상 적용)

사용자는 피그마를 **1920px 프레임** 기준으로 작업해 전달한다. 모니터 해상도(2560 등)와 무관하게 **브라우저 뷰포트**에 맞춰 비율만 유지한다.

- **기준 프레임**: 1920px. 기본 콘텐츠 폭 **1868px**, 좌우 여백 **26px** `(1920 − 1868) / 2` (디자인이 다르면 피그마 수치 우선)
- **스케일 공식**: `vw = figma_px ÷ 19.2` → `clamp(적절한 최소, Nvw, figma_px)` 로 여백·높이·radius·버튼 크기 등 **레이아웃** 적용
- **최대 너비**: 페이지/컨테이너 `max-width: 1920px`, 가운데 정렬
- **이미지·KV**: 피그마 W×H 비율 → `aspect-ratio` + `width: 100%`. `min-height: 100vh`로 히어로/섹션 높이 잡지 말 것
- **섹션 간격**: 피그마에서 섹션 프레임이 맞닿으면(gap 0) 바깥 margin으로 벌리지 말고 **프레임 내부 padding**만 반영. 상·하 padding 이중 적용 금지
- **좁은 콘텐츠**(Pricing·FAQ·Contact 등): 피그마 1552px 중앙 블록이면 `max-width: 1552px` + `margin: 0 auto` (≈ `80.8333vw` @1920)
- **타이포**: `_tokens/tokens.css` — 데스크톱 `typography-large-*`, 768px 이하 `typography-small-*` (template-b/c 등 기본). **template-a 예외** → 아래 참고
- 피그마 MCP/수치와 구현이 다르면 **피그마 수치**를 우선해 layout 토큰을 맞출 것

## template-a · Figma fluid scale (1920 — `_tokens` 타이포 미사용)

- **토큰 위치**: `templates/template-a/css/style.css` `:root` — Figma node `26:2361` color·typography·layout
- **스케일 공식**: 레이아웃·font-size·line-height 공통 → `clamp(min, figma_px÷19.2 vw, figma_px @1920)`
- **clamp min**: display/heading **50%**, body·UI·caption **62.5%** (모바일 가독성)
- **색·font-weight**: Figma hex·숫자 **고정** (vw 스케일 없음)
- **예외**: Hero KV overlay 텍스트 위치 **% inset** · border **1px** · 768px 이하 **그리드/네비 구조**만 `@media`
- **좌우 gutter**: `--layout-pad-x: clamp(13px, 1.3542vw, 26px)` (1868 콘텐츠 폭과 동일 축)

━━━━━━━━━━━━━━━━━━━━━━
섹션 네이밍 규칙
━━━━━━━━━━━━━━━━━━━━━━

모든 템플릿의 섹션 id와 class는 아래 규칙을 따를 것.

<header id="header" class="header">
<section id="hero" class="section section--hero">
<section id="intro" class="section section--intro">
<section id="features" class="section section--features">
<section id="proof" class="section section--proof">
<section id="cta-band" class="section section--cta-band">
<section id="faq" class="section section--faq">
<section id="contact" class="section section--contact">
<footer id="footer" class="footer">
<section id="hero-sub" class="section section--hero-sub">

추가 섹션이 필요할 경우 동일한 규칙으로 작성:
id="섹션명" class="section section--섹션명"

내부 공통 요소:
- 콘텐츠 wrap: class="container"
- narrow 블록: class="narrow-wrap"
- 카드: class="card"
- 그리드: class="grid"

━━━━━━━━━━━━━━━━━━━━━━
텍스트 영역 규칙
━━━━━━━━━━━━━━━━━━━━━━

피그마에서 텍스트 박스에 고정 가로/세로 값이 있을 경우
아래 규칙으로 변환할 것.

가로(width):
- 고정 px 금지
- figma_px ÷ frame_width × 100 = vw로 변환
- clamp(min, Nvw, figma_px) 적용

세로(height):
- 고정 height 금지
- min-height로 변환
- 줄수가 늘어나도 깨지지 않게 auto 또는 min-height 사용
