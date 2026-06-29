# Interaction Presets Guide (PC)

> Cursor 규칙: `.cursor/rules/46-interaction-presets.mdc`  
> 구현 방식: `.cursor/rules/45-interaction-patterns.mdc`  
> 참고 사이트 목록(허브): `_harness/interaction-samples/` · `samples.manifest.json`

## 한 줄 요약

- **10가지 표준 preset** + **7가지 참고 카탈로그(고급 패턴)** 를 정리해 두었습니다.
- **지금은 가이드만** — 템플릿에 **자동으로 붙지 않습니다.**
- 표준 preset은 **한글명**으로 「story에 **스크롤 등장** 적용해줘」처럼 **연결·승인** 후 구현합니다.
- 참고 카탈로그는 외부 사이트에서 본 **pin·3D·마키 등 고급 패턴** — ID로 승인 후 이식합니다.

## 이렇게 말하면 됩니다

| 예시 명령 |
|-----------|
| 「stats에 **숫자 카운트업** 적용해줘」 |
| 「news 카드에 **이미지 확대 호버** + **가로 드래그** 연결해줘」 |
| 「hero **히어로 슬라이더** 적용해줘」 |
| 「PROJECTS에 **3D 링 캐러셀** 참고해서 넣어줘」 (`3d-carousel-ring`) |
| 「사업소개 위에 **무한 가로 텍스트** 넣어줘」 (`infinite-text-marquee`) |

- **한글명** 또는 **영문 ID** 둘 다 OK.
- 로그·QA에는 **영문 ID**로 기록합니다.

## 적용 순서

1. Figma·섹션 구현 범위 확인  
2. 아래 **표준 preset** 또는 **참고 카탈로그**에서 ID 선택  
3. **승인** (채팅 또는 decision-log)  
4. 구현 → 섹션 QA  

**금지:** 승인 없이 AI가 마음대로 인터랙션 추가.

## 슬라이더 방향 버튼 (공통 · preset 외)

`prev` / `next` 화살표가 있는 슬라이더(성공사례·카드 슬라이드 등):

| 위치 | `prev` | `next` |
|------|--------|--------|
| 첫 슬라이드 | **disabled** | 활성 |
| 중간 | 활성 | 활성 |
| 마지막 | 활성 | **disabled** |

- JS: 인덱스 변경마다 `prop("disabled", …)` 동기화
- HTML: 첫 화면에서 `prev`에 `disabled` 초기값
- CSS: `:disabled` 시각 비활성(opacity 등) 필수

구현 상세: `.cursor/rules/45-interaction-patterns.mdc`

## 섹션당 권장 개수

| 종류 | 한글명 예시 | 섹션당 |
|------|-------------|--------|
| 등장·타이핑 | 스크롤 등장, 타이핑 연출 | **1개** |
| 슬라이드·드래그 | 히어로 슬라이더, 가로 드래그 | **1개** |
| hover | 호버 톤, 이미지 확대 호버 등 | **합쳐서 2개 이하** |
| 숫자 | 숫자 카운트업 | **1개** |
| pin·고급 스크롤 | 인트로 pin+scrub, 카드 확대 등 | **섹션 1개** (과다 금지) |
| 장식·마키 | 무한 가로 텍스트 | **섹션 1개** (본문 가독성 방해 금지) |

---

## 표준 Preset 목록 (10종)

템플릿에 자주 쓰는 **기본 인터랙션**. 구현은 가볍고, 대부분 CSS·jQuery만으로 가능합니다.

| 한글명 | ID | 한 줄 | 묘사 (눈에 보이는 것) |
|--------|-----|-------|------------------------|
| **스크롤 등장** | `scroll-reveal` | 스크롤 시 블록이 살짝 올라오며 나타남 | 섹션 제목·카드 그룹이 화면 아래에서 **살짝 위로 올라오면서** 투명→불투명으로 보입니다. **한 번만** 재생. hero 첫 화면·이미 보이는 요소에는 쓰지 않음. |
| **호버 톤** | `hover-tone` | hover 시 밝기/투명도만 변경 | 버튼·링크에 마우스를 올리면 **색이 조금 밝아지거나 투명해집니다**. 크기·위치는 안 바뀜. “눌 수 있다”는 힌트용. |
| **이미지 확대 호버** | `image-scale-hover` | hover 시 이미지 살짝 확대 | 카드 썸네일에 마우스를 올리면 **안의 이미지만 3~8% 커집니다**. 프레임 밖은 잘려서 카드 크기는 그대로. |
| **흑백→컬러 호버** | `grayscale-hover-color` | 흑백 → hover 시 컬러 | 평소 **흑백(또는 흐린)** 이미지가, hover 시 **원래 색**으로 돌아옵니다. 갤러리·로고 줄에 사용. |
| **가로 드래그** | `drag-scroll` | 마우스 드래그로 가로 스크롤 | 가로로 긴 카드 줄을 **마우스로 잡아 끌면** 좌우로 스크롤됩니다. 손 모양 커서(grab). 뉴스·작품 리스트용. |
| **버튼 글자 슬라이드** | `button-text-slide-hover` | 버튼 hover 시 글자 슬라이드 | pill 버튼에 마우스를 올리면 **글자가 위로 밀리며** 같은 문구(또는 hover 카피)가 다시 들어옵니다. CTA에 자주 씀. |
| **타이핑 연출** | `typing-text` | 짧은 문구 타이핑 | hero 등 **짧은 문장**이 한 글자씩 타이핑되며, 깜빡이는 커서가 붙을 수 있음. 페이지 로드 **1회**. 긴 본문에는 부적합. |
| **카드 넓히기 호버** | `expand-card-hover` | hover 시 카드·패널 넓어짐 | 가로로 나란한 카드 중 **hover한 카드만 넓어지고** 나머지는 좁아집니다. works 갤러리형. click 고정 vs hover만 — 승인 시 명시. |
| **숫자 카운트업** | `stats-counter` | 숫자 0→목표값 | stats 섹션 숫자가 스크롤로 보이면 **0에서 목표값까지 올라갑니다** (98%, 3배 등). **1회** 재생. |
| **히어로 슬라이더** | `hero-progress-slider` | hero 슬라이드 + progress | hero에서 **배경 이미지가 자동·수동으로 넘어가고**, 하단 progress bar·페이지 번호가 채워집니다. 슬라이드가 1장뿐이면 미적용. |

상세(목적·위치·금지·옵션)는 **`46-interaction-presets.mdc`** 카탈로그 본문.

---

## 참고 카탈로그 (고급 패턴 · 7종)

외부 사이트에서 뽑은 **특수 패턴**. GSAP ScrollTrigger·CSS 3D·CSS animation 등이 필요할 수 있습니다.  
허브에서 PASS 후 이식 · 정본 URL은 `samples.manifest.json`.

| 한글명 | ID | 참고 사이트 | 한 줄 | 묘사 (눈에 보이는 것) | 확인 위치 |
|--------|-----|-------------|-------|------------------------|-----------|
| **인트로 pin + scrub 히어로** | `intro-pin-scrub-hero` | [예손 메인](https://yesoni.kr/main) | 스크롤에 맞춰 인트로→비디오 전환 | 맨 위에서 스크롤하면 **화면이 잠깐 고정**되고, (1) 회색 원 마스크 축소 (2) 로고 확대·소멸 (3) PC에서 비디오가 **작은 둥근 프레임**으로 줄어듦 (4) 하단 CTA 등장. 역스크롤 시 되감기. | 최상단 히어로 |
| **스크롤 고정 다단 전환** | `scroll-pin-multi-step` | [예손 메인](https://yesoni.kr/main) | pin 상태로 01→02→03 순차 전환 | 서비스 소개에서 **섹션 고정** 채 스크롤만큼 **3단 카드/문구**가 바뀜. 배경색·SVG 장식도 같이 변함. 모바일 ≤767px pin 없음. | 히어로 직후 섹션01 |
| **스크롤 진입 시퀀스 reveal** | `scroll-enter-act-reveal` | [예손 메인](https://yesoni.kr/main) | 진입 시 배경·요소 순차 등장 | pin 없이 섹션에 들어오면 연출 시작. OUR TEAM: **원형 배경 확장** + 카드 슬라이드인. Notice: **말풍선 3개 순차 등장** + 이모지·타이핑. | OUR TEAM · Notice |
| **3D 링 캐러셀** | `3d-carousel-ring` | [예손 메인](https://yesoni.kr/main) | 카드 10장이 3D 원둘레 회전 | 포트폴리오가 **3D 회전목마**처럼 배치. 화살표·드래그로 돌리면 **정면 카드**가 바뀌고 제목·미디어 교체. 36° 스냅. 진입 시 카드 펼침. | PROJECTS |
| **CSS 3D 플립 카드** | `css-3d-flip-card` | [예손 메인](https://yesoni.kr/main) | hover 시 카드 앞뒤 뒤집힘 | 팀 카드 **앞면=요약**, 마우스 올리면 **뒷면=인사말**로 Y축 180° 뒤집힘. JS 없이 CSS만. | OUR TEAM 카드 |
| **스크롤 고정 카드 확대** | `scroll-pin-scale-card` | [HD현대M&S](https://hd-hmns.co.kr/kr/main) | 작은 카드가 풀화면으로 커짐 | 회사소개에서 **작은 이미지 카드**가 스크롤에 맞춰 **화면 전체**로 커짐. 딤 + **문구 1→2단** 전환 + 하단 라인 reveal. | 히어로 다음 회사소개 |
| **무한 가로 텍스트** | `infinite-text-marquee` | [HD현대M&S](https://hd-hmns.co.kr/kr/main) | 긴 문구가 가로로 끊김 없이 흐름 | 사업소개 섹션 상단에 **"The Future Made with Technology and Quality"** 같은 긴 영문이 **왼쪽으로 계속 흘러갑니다**. JS 없음 — 같은 문장 2벌 + CSS `translateX(-50%)` 루프. 섹션 배경 장식용. | 회사소개 **다음** 사업소개 상단 |

### `infinite-text-marquee` 구현 요약

| 항목 | 내용 |
|------|------|
| **HTML** | 래퍼 안에 **동일 `<span>` 2개** (또는 2세트 블록) |
| **CSS** | 부모 `overflow:hidden` · 트랙 `display:inline-flex` · `animation: marquee 30s linear infinite` |
| **keyframes** | `0% translateX(0)` → `100% translateX(-50%)` (한 세트 너비만 이동 후 루프) |
| **JS** | 없음 |
| **HD 참고 클래스** | `.main-business .bg-txt` (`main.css`) · `@keyframes marquee` (`style.css`) |

**명령 예:** 「사업소개 섹션에 **무한 가로 텍스트** (`infinite-text-marquee`) 적용해줘」

---

## 템플릿별 연결은 이 파일에 쓰지 않음

- 이 문서 = **공통 카탈로그·한글명·묘사**만. **템플릿마다 수정하지 않음.**
- 「skhynix products에 drag-scroll 연결됨」 같은 **연결 현황** → `_logs/decision-log.md` · `_logs/qa-log.md`
- 기록 형식: `[template {slug}] {section-id}: preset — scroll-reveal`  
  참고 카탈로그: `[template {slug}] {section-id}: catalog — infinite-text-marquee`

## 전역 규칙

- 승인 없는 인터랙션 추가 금지  
- 한 섹션에 너무 많은 motion 금지  
- 콘텐츠 읽기 방해 금지  
- 같은 요소에 애니메이션 겹치기 금지  
- preset·카탈로그 **이름(ID) 통일** — 표에 없는 이름 쓰지 않기  

## Figma에 없는 motion

Figma에 없어도, **카탈로그 한글명·ID를 승인**하면 적용 가능 (`decision-log` 기록).
