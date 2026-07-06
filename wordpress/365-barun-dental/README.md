# 365 바른치과 — WordPress 테마

Figma `00_page-home` (node `453:330`) · Classic WP · HTML / CSS / jQuery

**서브페이지·섹션 추가 시** 이 문서 + `header.php` / `footer.php` / 기존 `section-*.php` 패턴을 기준으로 맞춘다.

인터랙션·scroll-reveal **공통 규칙**은 repo 루트 `.cursor/rules/46-interaction-presets.mdc` · `45-interaction-patterns.mdc`가 우선한다.

---

## 파일 구조

```
365-barun-dental/
├── front-page.php          # 메인 — 섹션 include 순서
├── header.php / footer.php # 공통 프레임
├── functions.php
├── style.css               # :root 토큰 + 전 섹션 CSS
├── inc/assets.php          # 이미지 URI · PHP 헬퍼
├── assets/js/main.js       # GNB · Digital 탭 · scroll-reveal
└── template-parts/
    └── section-{hero|philosophy|treatments|process|digital|space|reservation}.php
```

---

## 페이지 DOM (메인)

```
body
├── header.site-header
├── main.site-main
│   ├── section.section-hero
│   ├── section.section-philosophy
│   ├── section.section-treatments
│   ├── section.section-process
│   ├── section.section-digital
│   ├── section.section-space
│   └── section.section-reservation
└── footer.site-footer
```

| 구분 | 파일 | 루트 클래스 |
|------|------|-------------|
| 헤더 | `header.php` | `site-header` |
| 본문 래퍼 | `header.php` ~ `footer.php` | `site-main` |
| 푸터 | `footer.php` | `site-footer` |
| 섹션 | `template-parts/section-*.php` | `section-{이름}` |

---

## 레이아웃 공통

### Shell (콘텐츠 폭)

| 클래스 | 역할 |
|--------|------|
| `section-shell` | max 1440px + 좌우 패딩 (`--layout-pad-x`) |
| `section-shell--gutter` | 패딩 포함 전체 폭 — **항상 `section-shell`과 함께** |

- **Hero만 예외:** `section-hero__media`는 풀폭, 텍스트는 `section-shell` 안.

### 섹션 헤더 패턴 (Hero 제외 6곳)

| 역할 | 접미사 | 예 |
|------|--------|-----|
| 영문 라벨 | `__label` | `section-treatments__label` |
| 제목 h2 | `__title` | |
| 제목 줄 | `__title-line` | 2줄 타이틀 — span 각각 |
| 헤더 묶음 | `__header` | label + title |
| 내부 래퍼 | `__inner` | shell 안 콘텐츠 |

서브페이지 새 섹션도 동일: `section-{페이지명}` 블록 + 위 접미사 재사용.

### 버튼 (CTA)

| 클래스 | 역할 |
|--------|------|
| `btn-slide-hover` | 글자 슬라이드 호버 preset |
| `btn__label` · `btn__track` · `btn__text` | `barun_dental_button_slide()` 출력 (`inc/assets.php`) |
| `__btn--primary` / `__btn--outline` | 섹션별 버튼 스타일 |

사용처: `site-header__cta`, `section-hero__btn`, `section-reservation__btn`

### PHP 헬퍼 (`inc/assets.php`)

| 함수 | 용도 |
|------|------|
| `barun_dental_asset_uri( $key )` | 이미지 경로 |
| `barun_dental_button_slide( $text )` | 슬라이드 CTA 마크업 |
| `barun_dental_digital_features()` | Digital 탭 데이터 |

### CSS 토큰

색·타이포·간격 → `style.css` `:root` (`--color-*`, `--type-*`, 섹션별 `--hero-*` 등)

---

## 인터랙션 (이 테마 적용)

| Preset | 마크업 / 대상 | 비고 |
|--------|---------------|------|
| scroll-reveal | `.scroll-reveal` → JS `.is-revealed` | 아래 규칙 표 |
| hover-tone | `.site-header__link`, `.site-footer__links a` | CSS만 |
| image-scale-hover | treatments featured·media-card, space card 이미지 | 카드 호버 |
| button-text-slide-hover | `.btn-slide-hover` | |

### scroll-reveal 단위 (기본값)

| 대상 | 단위 |
|------|------|
| 섹션 헤더 | `__label`, `__title-line` **각각** |
| 카드 밖 본문 | `<p>` **줄마다** |
| 리스트 행 (Philosophy 등) | num · title · text **각각** |
| **카드** | **루트 1개만** — 카드 **내부에 scroll-reveal 금지** |

**카드 루트 (scroll-reveal 1개):**

- `section-treatments__featured`, `__media-card`, `__info-card`, `__matrix`
- `section-process__step`
- `section-space__card`
- `section-digital__media`, `__item`

**Hero:** scroll-reveal 없음 (첫 화면 고정).

### 상태 클래스 (JS)

| 클래스 | 의미 |
|--------|------|
| `is-revealed` | scroll-reveal 완료 |
| `is-active` | Digital 탭 선택 |
| `is-open` | 모바일 GNB (`#site-navigation`) |

---

## `site-header` · `site-footer`

### Header

`site-header__inner` · `__logo` / `__logo-img` · `__right` · `__nav` / `__menu` / `__link` · `__cta` · `__toggle` / `__toggle-bar`

### Footer

`site-footer__inner` · `__content` · `__brand` · `__logo` · `__hours` / `__hours-grid` / `__hours-row` · `__hours-label` / `__hours-value` · `__address` · `__divider` · `__legal` / `__company` · `__links` · `__copy`

서브페이지: `get_header()` / `get_footer()` 그대로 사용.

---

## 섹션별 클래스 요약

### `section-hero`

`__media` · `__bg` · `__overlay` · `__inner` · `__content` · `__heading` · `__eyebrow` · `__copy` · `__title` · `__title-line` · `__desc` · `__cta` · `__btn`

### `section-philosophy`

`__layout` · `__intro` · `__header` · `__label` · `__title` · `__title-line` · `__desc` · `__list` · `__item` · `__divider` · `__num` · `__item-body` · `__item-title` · `__item-text`

### `section-treatments`

헤더 공통 + `__content` · `__featured` (+ `__featured-bg` …) · `__aside` · `__media-card` · `__info-card` · `__matrix` (+ `__matrix-item` · `__matrix-vrule` · `__matrix-hrule` …)

### `section-process`

헤더 공통 + `__steps` · `__step` · `__step-num` · `__step-body` · `__step-title` · `__step-desc`

### `section-digital`

헤더 공통 + `__content` · `__media` · `__img` · `__list` · `__item` · `__trigger` · `__num` · `__copy` · `__item-title` · `__item-desc` · `__divider`

### `section-space`

헤더 공통 + `__gallery` · `__card` · `__card-img` · `__caption` · `__eyebrow` · `__card-title`

### `section-reservation`

헤더 공통 + `__cta` · `__btn`

---

## 메인 섹션 순서 · Figma

| # | 클래스 | PHP | Figma node |
|---|--------|-----|------------|
| 1 | `section-hero` | `section-hero.php` | 453:348 |
| 2 | `section-philosophy` | `section-philosophy.php` | 474:877 |
| 3 | `section-treatments` | `section-treatments.php` | — |
| 4 | `section-process` | `section-process.php` | — |
| 5 | `section-digital` | `section-digital.php` | 453:516 |
| 6 | `section-space` | `section-space.php` | — |
| 7 | `section-reservation` | `section-reservation.php` | — |

---

## 서브페이지 추가 시 체크리스트

1. `page-{slug}.php` 또는 템플릿 — `get_header()` → `main.site-main` 안 섹션 → `get_footer()`
2. 새 섹션 블록명 `section-{이름}` · BEM `__요소` 유지
3. 콘텐츠 폭은 `section-shell section-shell--gutter`
4. 헤더 블록은 `__label` + `__title` + `__title-line` 패턴
5. scroll-reveal은 위 **단위 표** 준수 (카드 = 루트만)
6. CTA는 `btn-slide-hover` + `barun_dental_button_slide()`
7. CSS는 `style.css`에 섹션 블록 단위로 추가 (`@1024` / `@768`는 별도)

---

## 미완 · 보류 (메인)

- Digital 탭 04 이미지 임시
- CTA·GNB 링크 `#` placeholder
- 태블릿 `@1024` · 모바일 `@768` 대부분 미구현

---

## 로컬 미리보기

Laragon: `C:\laragon\www\barun\wp-content\themes\365-barun-dental`  
URL 예: `http://barun.test`
