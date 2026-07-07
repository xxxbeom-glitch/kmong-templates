# 365헤스여성의원 — Style Guide

> **용도:** 메인 완성본 기준 · Figma 없이 서브페이지·내부 화면 **바이브코딩** 시 참조  
> **우선순위:** ① 메인 Figma·구현(`front-page.php` + `style.css`) ② **본 문서** ③ `365hes-womens-clinic-project-spec.md`(IA·카피 방향)  
> **테마 경로:** `wordpress/365-hes-womens-clinic/`

---

## 1. 톤앤매너

| 항목 | 기준 |
|------|------|
| 무드 | 차분한 여성 클리닉 · 따뜻한 베이지·웜그레이 |
| 정보 밀도 | 타이틀 크게 → 짧은 설명 → 카드/리스트. 여백 넉넉 |
| 강조 | 포인트 컬러 **accent 하나** (`#a48d78`) |
| 그림자 | 최소 — 공지 플로팅 카드 정도만 |
| radius | 카드 12px · 대표진료 이미지 16px · CTA pill 999px |
| 금지 | 화려한 그라데이션·네온·과한 애니메이션·의료 과장 표현 |

**핵심 원칙:** 새 레이아웃을 발명하지 않는다. **메인에 있는 블록을 재조합**한다.

---

## 2. 디자인 토큰 (`style.css` `:root`)

토큰은 **항상 `style.css` `:root`가 원본**이다. 본 문서는 요약.

### 2-1. 색

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-text` | `#1c1917` | 본문·제목 |
| `--color-text-muted` | `rgba(28,25,23,0.6)` | 보조 라벨 |
| `--color-accent` | `#a48d78` | eyebrow·라벨·CTA·활성 탭 |
| `--color-bg` | `#faf9f6` | 페이지 기본·헤더·S09 |
| `--color-bg-alt` | `#f8f5f1` | S03 증상 |
| `--color-bg-panel` | `#f5f4f3` | 진료시간 패널·정보 박스 |
| `--color-white` | `#ffffff` | 카드·FAQ 패널 |
| `#f8f8f8` | (섹션 전용) | S02 공지 카드 |
| `#f8f5f0` | (섹션 전용) | S06·S08 배경 |
| `#faf7f6` | (섹션 전용) | S04·S07 배경 |
| `#f4f1ea` | `--location-map-bg` | 지도 placeholder |
| `--color-footer-bg` | `#1c1917` | 푸터 |

### 2-2. 타이포

| 역할 | PC(1920) | CSS 변수·클래스 |
|------|----------|-----------------|
| 폰트 | SUIT | `--font-family` |
| Section eyebrow | 12px / 500 / accent / ls 0.02em | `--symptom-eyebrow-size` · `*__eyebrow` |
| Section title | 40px / 700 | `--symptom-title-size` · `*__title` |
| Hero title | 64px / 700 | `--hero-title-size` |
| Hero desc | 24px / 400 | `--hero-desc-size` |
| Staff title (on image) | 42px / 700 white | `--staff-title-size` |
| Card title (증상) | 26px / 600 | `--symptom-card-text-size` |
| Treatment card | 28px / 700 white | `--treatment-card-title-size` |
| FAQ question | 22px / 700 | `--faq-question-size` |
| FAQ answer | 17px / 400 / lh 1.7 | `--faq-answer-size` |
| Body default | 16px / lh 1.5 | `body` |

**예외 (메인 확정·유지):**

- S05 `TEAMS` eyebrow: 흰색 90% · 12px/500 (다른 eyebrow와 동일 크기)
- FAQ `Q.`만 accent · 본문 `#1c1917`

### 2-3. 레이아웃

| 항목 | 값 |
|------|-----|
| 콘텐츠 최대 폭 | `--layout-max: 1440px` |
| 좌우 gutter (1920) | `--layout-pad-x` → 240px |
| Shell | `.section-shell` + `.section-shell--gutter` |
| 섹션 상하 패딩 | `--section-pad-y` → 100px (대부분 섹션) |
| 헤더 높이 | `--header-h` → 96px |
| 브레이크포인트 | 1024px · 768px (`style.css` 하단 `@media`) |

---

## 3. 섹션 배경 리듬

인접 섹션은 **같은 배경색 연속 금지** (메인 기준).

| 배경 | 사용 섹션 |
|------|-----------|
| `#faf9f6` | 기본 body · S09 |
| `#f8f5f1` | S03 |
| `#faf7f6` | S04 · S07 |
| `#f8f5f0` | S06 · S08 |
| `#ffffff` / 카드 | FAQ item · 증상 카드 |
| IMAGE + overlay | Hero · Medical staff |

서브페이지도 **섹션마다 위 팔레트에서 교차** 선택.

---

## 4. UI 패턴 카탈로그 (메인 = 레퍼런스)

새 섹션은 **패턴 ID**로 지정 후, 기존 HTML/CSS를 복사·변형한다.

| ID | 이름 | 메인 참조 | PHP | 핵심 클래스 |
|----|------|-----------|-----|-------------|
| P01 | Section header | S03·S04 헤더 | `section-symptom.php` 등 | `*__header` · `*__eyebrow` · `*__title` |
| P02 | Hero (full-bleed) | S01 | `section-hero.php` | `.section-hero` · `__overlay` · `__title` |
| P03 | Floating notice bar | S02 | `section-today-status.php` | `.section-today-status__card` |
| P04 | Card grid (3열) | S03 | `section-symptom.php` | `.section-symptom__grid` · `__card` |
| P05 | Image treatment row | S04 | `section-treatments.php` | `.section-treatments__row` · `__card` |
| P06 | Full-bleed + copy CTA | S05 | `section-medical-staff.php` | `.section-medical-staff` · `__cta` |
| P07 | Step flow (원형) | S06 | `section-examination.php` | `.section-examination__steps` |
| P08 | Tab + large card | S07 | `section-space.php` | `.section-space__tabs` · `__card` |
| P09 | FAQ accordion | S08 | `section-faq.php` | `.section-faq__list` · `initFaqAccordion()` |
| P10 | Map + info 2열 | S09 | `section-location.php` | `.section-location__content` |
| P11 | CTA pill (accent) | Header·S05 | `header.php` · `section-medical-staff.php` | `.site-header__cta` · `.section-medical-staff__cta` |
| P12 | Info panel (박스) | S09 진료시간 | `section-location.php` | `.section-location__hours` |

### P01 Section header — 표준 마크업

```html
<header class="section-{name}__header">
  <p class="section-{name}__eyebrow">EYEBROW</p>
  <h2 id="{name}-title" class="section-{name}__title">섹션 제목</h2>
</header>
```

- flex column · center align · gap `--symptom-header-gap` (12px)
- eyebrow/title 스타일은 `.section-symptom__eyebrow` / `__title` 과 동일 토큰 사용

### P11 CTA pill

- `border-radius: 999px`
- `background: var(--color-accent)` · `color: var(--color-white)`
- `font-weight: 700` · padding `--header-cta-py/px` 또는 `--staff-cta-*`

### P09 FAQ

- 패널 간격 `--faq-list-gap` (24px)
- 패널 배경 white · radius 12 · **border 없음**
- `Q.` accent · 본문 `#1c1917` (메인 확정)

---

## 5. 서브페이지 공통 구조 (Figma 없음 · 본 가이드로 확정)

```
글로벌 헤더 (header.php)
→ 서브 히어로 (신규 · P02 축소 또는 전용)
→ 본문 섹션 × N (P01 + 콘텐츠 패턴)
→ 최종 CTA band (신규 · P11 변형)
→ 글로벌 푸터 (footer.php)
```

### 5-1. 서브 히어로 (공통 확정)

| 요소 | 규칙 |
|------|------|
| 타이틀 | 페이지명 · 40~48px / 700 · **중앙 정렬** |
| Eyebrow | **사용 안 함** |
| 설명·CTA | **사용 안 함** |
| Breadcrumb | **사용 안 함** |
| 배경 | `#f8f5f1` (`--color-bg-alt`) |

**구현:** `template-parts/sub-hero.php` + `.section-sub-hero`

### 5-2. 최종 CTA band (구현 ✓ · 디자인 TBD)

- 설계서 `05-4` 카피·버튼 3종(접수 · 카카오 · 전화) 반영
- `template-parts/cta-band.php` + `.section-cta-band`

---

## 6. IA · 서브페이지 청사진

상세 카피·섹션 목록은 `365hes-womens-clinic-project-spec.md` 참고.  
아래는 **패턴 매핑 요약**.

### 파일럿 1순위: 여성질환 `/womens-disease`

**상태:** OK 클리닉식 배열 ✓ · D07~D10 제외

| 순서 | 섹션 | 레이아웃 |
|------|------|----------|
| D01 | 서브 히어로 | 타이틀만 · 중앙 |
| — | 인트로 | 설명 1문단 · 중앙 |
| D02+D04 | 혹시 내 이야기? | 2열 (증상 \| 진료 필요) |
| D03 | 주요 진료 영역 | 안내 + 7카드 그리드 |
| D05 | 검사와 진단 | 카드 그리드 |
| D06 | 진료 과정 | 원형 스텝 |

### GNB ↔ 경로

| GNB | 대표 경로 |
|-----|-----------|
| 병원소개 | `/about` |
| 여성질환 | `/womens-disease` |
| 여성검진 | `/checkup` |
| 임신·출산 | `/pregnancy-birth` |
| 난임·가임력 | `/fertility` |
| 여성수술 | `/surgery` |
| 상담·안내 | `/support` |

**진행 순서:** 공통 sub-hero + CTA → **여성질환 1페이지 파일럿 PASS** → 나머지 GNB 복제·변형

---

## 7. 에셋 규칙

```
assets/
├── icons/       arrow-right, chevron-*
├── logos/       header.png, footer.png
├── hero/        kv.png
├── treatments/  대표진료 카드
├── spaces/      진료환경
└── staff/       의료진 섹션 배경
```

- URI는 **`hes_womens_clinic_asset_uri('키')`** 만 사용 (`inc/assets.php`)
- 파일명: **영어 kebab-case** · 서브 전용 이미지는 용도별 하위 폴더 추가 가능 (`assets/sub/…`)
- placeholder 이미지는 `#f4f1ea` 박스 + `data-placeholder` 패턴 검토 (`47-placeholder-images.mdc`)

---

## 8. 데이터·공통 함수

| 함수 | 용도 |
|------|------|
| `hes_womens_clinic_asset_uri()` | 이미지 URL |
| `hes_womens_clinic_gnb_items()` | GNB |
| `hes_womens_clinic_phone()` | 대표전화 단일 소스 |
| `hes_womens_clinic_footer_meta()` | 푸터 메타 |
| `hes_womens_clinic_faq_items()` | FAQ 샘플 (서브도 동일 패턴) |

전화·주소·카피는 **`inc/assets.php` 또는 전용 `inc/content-*.php`** 에 모아 중복 금지.

---

## 9. 코딩 규칙

### 해야 할 것

- `template-parts/` 섹션 단위 PHP 분리
- CSS는 **`style.css` 한 파일** (섹션별 주석 구역 유지)
- JS 인터랙션: `assets/js/main.js` · jQuery · `init*` 함수 패턴
- 반응형: PC 먼저 → `@media (max-width: 1024px)` → `@media (max-width: 768px)`
- WordPress: `esc_url` · `esc_html` · `wp_kses` 출력 이스케이프

### 하지 말 것

- 메인에 없는 색·폰트 크기 **임의 추가**
- Bootstrap·Tailwind·React
- 템플릿 간 CSS/JS 공유 (`../../`)
- 의료 효과 과장 카피 (설계서 금지 항목 참고)
- Figma 없이 **완전 새 레이아웃** invent

---

## 10. 새 페이지 체크리스트

```
[ ] hes-style-guide.md + 본 섹션 패턴 확인
[ ] IA·경로 설계서와 일치
[ ] sub-hero · 섹션 배경 교차
[ ] P01 header + 기존 패턴 조합만 사용
[ ] :root 토큰 재사용 (하드코드 hex 최소화)
[ ] @1024 · @768 확인
[ ] inc/assets.php 카피·이미지 키 등록
[ ] change-log 기록
```

---

## 11. 메인 구현 현황 (2026-07-07)

| 섹션 | 상태 | 파일 |
|------|------|------|
| S00 Header | ✓ | `header.php` |
| S01 Hero | ✓ | `section-hero.php` |
| S02 공지 | ✓ | `section-today-status.php` |
| S03 증상 | ✓ | `section-symptom.php` |
| S04 대표진료 | ✓ | `section-treatments.php` |
| S05 의료진 | ✓ | `section-medical-staff.php` |
| S06 진료시스템 | ✓ | `section-examination.php` |
| S07 공간 | ✓ | `section-space.php` |
| S08 FAQ | ✓ | `section-faq.php` |
| S09 오시는길 | ✓ | `section-location.php` |
| S10 Footer | ✓ | `footer.php` |
| 서브 히어로 | ✓ | `sub-hero.php` |
| CTA band | ✓ | `cta-band.php` |
| 여성질환 `/womens-disease` | 콘텐츠·디자인 1차 ✓ | `page-womens-disease.php` |
| GNB 나머지 서브 | 미구현 | — |

---

*메인 토큰·패턴 변경 시 `style.css` 수정 후 본 문서 §2·§4 요약도 동기화한다.*
