# 디자인 토큰 마스터 문서
> 템플릿을 위한 템플릿. 새 프로젝트 시작 시 필요한 토큰만 골라 `tokens.css`로 복사해 쓴다.

---

## 1. 색상 시스템

### 1-1. 전체 팔레트 (빨/주/노/초/파/남/보 + 그레이)

```css
:root {

  /* ─────────────────────────────────────
     RED   빨
  ───────────────────────────────────── */
  --red-100: #FFF5F5;   /* 파스텔 */
  --red-200: #FED7D7;   /* 파스텔 */
  --red-300: #FCA5A5;   /* 라이트 */
  --red-400: #F87171;   /* 클린 */
  --red-500: #EF4444;   /* 비비드 */
  --red-600: #DC2626;   /* 비비드 */
  --red-700: #B91C1C;   /* 딥 */
  --red-800: #991B1B;   /* 딥 */
  --red-900: #7F1D1D;   /* 딥 */

  /* ─────────────────────────────────────
     ORANGE   주
  ───────────────────────────────────── */
  --orange-100: #FFF7ED;
  --orange-200: #FED7AA;
  --orange-300: #FDBA74;
  --orange-400: #FB923C;
  --orange-500: #F97316;
  --orange-600: #EA580C;
  --orange-700: #C2410C;
  --orange-800: #9A3412;
  --orange-900: #7C2D12;

  /* ─────────────────────────────────────
     YELLOW   노
  ───────────────────────────────────── */
  --yellow-100: #FEFCE8;
  --yellow-200: #FEF9C3;
  --yellow-300: #FDE047;
  --yellow-400: #FACC15;
  --yellow-500: #EAB308;
  --yellow-600: #CA8A04;
  --yellow-700: #A16207;
  --yellow-800: #854D0E;
  --yellow-900: #713F12;

  /* ─────────────────────────────────────
     GREEN   초
  ───────────────────────────────────── */
  --green-100: #F0FDF4;
  --green-200: #DCFCE7;
  --green-300: #BBF7D0;
  --green-400: #4ADE80;
  --green-500: #22C55E;
  --green-600: #16A34A;
  --green-700: #15803D;
  --green-800: #166534;
  --green-900: #14532D;

  /* ─────────────────────────────────────
     BLUE   파
  ───────────────────────────────────── */
  --blue-100: #EFF6FF;
  --blue-200: #DBEAFE;
  --blue-300: #93C5FD;
  --blue-400: #60A5FA;
  --blue-500: #3B82F6;
  --blue-600: #2563EB;
  --blue-700: #1D4ED8;
  --blue-800: #1E40AF;
  --blue-900: #1E3A8A;

  /* ─────────────────────────────────────
     INDIGO / NAVY   남
  ───────────────────────────────────── */
  --indigo-100: #EEF2FF;
  --indigo-200: #E0E7FF;
  --indigo-300: #A5B4FC;
  --indigo-400: #818CF8;
  --indigo-500: #6366F1;
  --indigo-600: #4F46E5;
  --indigo-700: #4338CA;
  --indigo-800: #3730A3;
  --indigo-900: #1E1B6E;

  /* ─────────────────────────────────────
     VIOLET / PURPLE   보
  ───────────────────────────────────── */
  --violet-100: #FAF5FF;
  --violet-200: #F3E8FF;
  --violet-300: #D8B4FE;
  --violet-400: #C084FC;
  --violet-500: #A855F7;
  --violet-600: #9333EA;
  --violet-700: #7E22CE;
  --violet-800: #6B21A8;
  --violet-900: #581C87;

  /* ─────────────────────────────────────
     GRAY   그레이스케일
  ───────────────────────────────────── */
  --white:      #FFFFFF;
  --gray-50:    #F9FAFB;
  --gray-100:   #F3F4F6;
  --gray-200:   #E5E7EB;
  --gray-300:   #D1D5DB;
  --gray-400:   #9CA3AF;
  --gray-500:   #6B7280;
  --gray-600:   #4B5563;
  --gray-700:   #374151;
  --gray-800:   #1F2937;
  --gray-900:   #111827;
  --black:      #000000;

}
```

---

### 1-2. 톤 가이드

| 톤 | 범위 | 분위기 | 용도 예시 |
|----|------|--------|-----------|
| 파스텔 | 100~200 | 부드럽고 밝음 | 배경, 태그, 뱃지 |
| 라이트 | 300 | 친근하고 가벼움 | 아이콘 배경, hover |
| 클린 | 400 | 균형잡힌 중간 | 보조 버튼, 선 |
| 비비드 | 500~600 | 강하고 선명함 | Primary 버튼, 강조 |
| 딥 | 700~900 | 무겁고 진중함 | 다크 배경, 타이틀 |

---

### 1-3. 시멘틱 색상 (프로젝트 시작 시 여기를 덮어씀)

```css
:root {

  /* 브랜드 */
  --color-primary:        var(--blue-600);
  --color-primary-light:  var(--blue-100);
  --color-primary-dark:   var(--blue-800);

  --color-secondary:      var(--indigo-500);
  --color-accent:         var(--orange-500);

  /* 텍스트 */
  --color-text-primary:   var(--gray-900);
  --color-text-secondary: var(--gray-600);
  --color-text-muted:     var(--gray-400);
  --color-text-inverse:   var(--white);

  /* 배경 */
  --color-bg-base:        var(--white);
  --color-bg-subtle:      var(--gray-50);
  --color-bg-muted:       var(--gray-100);
  --color-bg-inverse:     var(--gray-900);

  /* 선/경계 */
  --color-border-light:   var(--gray-200);
  --color-border-default: var(--gray-300);
  --color-border-strong:  var(--gray-400);

  /* 상태 */
  --color-success:        var(--green-500);
  --color-success-light:  var(--green-100);
  --color-warning:        var(--yellow-500);
  --color-warning-light:  var(--yellow-100);
  --color-error:          var(--red-500);
  --color-error-light:    var(--red-100);
  --color-info:           var(--blue-500);
  --color-info-light:     var(--blue-100);

}
```

---

## 2. 타이포그래피

### 2-0. 최소 크기 (확정 · 이 아래로 금지)

> PC도 “세련”하려고 본문을 너무 작게 쓰지 않는다. 모바일은 iOS 확대 방지·가독성 때문에 본문 하한을 지킨다.

| 역할 | PC 최소 | 모바일 최소 (`max-width: 767px`) | 비고 |
|------|---------|----------------------------------|------|
| **본문 (단락·설명)** | **16px** | **16px** | `body1`~`body3` · 긴 글 |
| **보조 본문 / UI 메타** | **14px** | **14px** | `body4` · 짧은 보조만 · 긴 단락 금지 |
| **캡션 / 라벨** | **12px** | **12px** | `caption*` |
| **CTA / 버튼 글자** | **14px** | **14px** | `cta*` · Primary는 가능하면 16px+ |
| **제목** | **20px** | **20px** | `h*` · H4 모바일도 20px 이상 |
| **입력 필드** | **16px** | **16px** | `input`/`textarea`/`select` |

```css
:root {
  --text-min-body:       16px;  /* PC·모바일 본문 공통 하한 */
  --text-min-body-sm:    14px;  /* 보조·짧은 메타만 */
  --text-min-caption:    12px;
  --text-min-cta:        14px;
  --text-min-heading:    20px;
  --text-min-input:      16px;
}
```

**Do**
- 본문·리드·카드 설명은 `--text-min-body`(16px) 이상
- 스케일 토큰(`--text-body3-size` 등)만 사용 · 임의 `font-size: 13px` 금지

**Don’t**
- PC에서 본문을 14px 이하로 “고급” 연출
- 모바일에서 본문·입력 15px 이하 (확대·가독성 문제)
- `caption3` 등으로 본문 역할 대체

---

### 2-1. 폰트 패밀리

```css
/* SUIT 웹폰트 로드 */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/suit@v1.0.0/packages/suit/fonts.css');

:root {
  /* 프로젝트 기본 폰트: SUIT (확정) */
  --font-primary: 'SUIT', -apple-system, BlinkMacSystemFont, 'Malgun Gothic', sans-serif;
  --font-mono:    'JetBrains Mono', 'D2Coding', monospace; /* 코드 표시용 */
}
```

---

### 2-2. 크기 스케일 (px 기반 · PC)

```css
:root {

  /* ─────────────────────────────────────
     HEADING   제목 (≥ --text-min-heading)
  ───────────────────────────────────── */
  --text-h1-size:    64px;
  --text-h1-line:    1.15;
  --text-h1-weight:  800;
  --text-h1-letter:  -0.02em;

  --text-h2-size:    48px;
  --text-h2-line:    1.2;
  --text-h2-weight:  700;
  --text-h2-letter:  -0.015em;

  --text-h3-size:    36px;
  --text-h3-line:    1.25;
  --text-h3-weight:  700;
  --text-h3-letter:  -0.01em;

  --text-h4-size:    28px;
  --text-h4-line:    1.35;
  --text-h4-weight:  600;
  --text-h4-letter:  -0.005em;

  /* ─────────────────────────────────────
     BODY   본문 (단락 ≥16 · body4는 보조만 ≥14)
  ───────────────────────────────────── */
  --text-body1-size:    20px;
  --text-body1-line:    1.75;
  --text-body1-weight:  400;

  --text-body2-size:    18px;
  --text-body2-line:    1.7;
  --text-body2-weight:  400;

  --text-body3-size:    16px;  /* 본문 기본 · PC 하한 */
  --text-body3-line:    1.65;
  --text-body3-weight:  400;

  --text-body4-size:    14px;  /* 짧은 보조만 · 긴 단락 금지 */
  --text-body4-line:    1.6;
  --text-body4-weight:  400;

  /* ─────────────────────────────────────
     CAPTION   캡션 (≥12)
  ───────────────────────────────────── */
  --text-caption1-size:    13px;
  --text-caption1-line:    1.5;
  --text-caption1-weight:  500;

  --text-caption2-size:    12px;  /* 캡션 하한 */
  --text-caption2-line:    1.5;
  --text-caption2-weight:  400;

  --text-caption3-size:    12px;  /* 구 11px → 하한 12px로 상향 */
  --text-caption3-line:    1.4;
  --text-caption3-weight:  400;

  /* ─────────────────────────────────────
     CTA   버튼 텍스트 (≥14 · Primary 권장 16+)
  ───────────────────────────────────── */
  --text-cta1-size:    20px;
  --text-cta1-line:    1;
  --text-cta1-weight:  700;
  --text-cta1-letter:  -0.01em;

  --text-cta2-size:    18px;
  --text-cta2-line:    1;
  --text-cta2-weight:  600;
  --text-cta2-letter:  -0.005em;

  --text-cta3-size:    16px;
  --text-cta3-line:    1;
  --text-cta3-weight:  600;
  --text-cta3-letter:  0;

  --text-cta4-size:    14px;  /* CTA 하한 */
  --text-cta4-line:    1;
  --text-cta4-weight:  600;
  --text-cta4-letter:  0.01em;

}
```

---

### 2-3. 타이포 클래스 (유틸리티)

```css
/* Heading */
.h1 { font-size: var(--text-h1-size); line-height: var(--text-h1-line); font-weight: var(--text-h1-weight); letter-spacing: var(--text-h1-letter); }
.h2 { font-size: var(--text-h2-size); line-height: var(--text-h2-line); font-weight: var(--text-h2-weight); letter-spacing: var(--text-h2-letter); }
.h3 { font-size: var(--text-h3-size); line-height: var(--text-h3-line); font-weight: var(--text-h3-weight); letter-spacing: var(--text-h3-letter); }
.h4 { font-size: var(--text-h4-size); line-height: var(--text-h4-line); font-weight: var(--text-h4-weight); letter-spacing: var(--text-h4-letter); }

/* Body */
.body1 { font-size: var(--text-body1-size); line-height: var(--text-body1-line); font-weight: var(--text-body1-weight); }
.body2 { font-size: var(--text-body2-size); line-height: var(--text-body2-line); font-weight: var(--text-body2-weight); }
.body3 { font-size: var(--text-body3-size); line-height: var(--text-body3-line); font-weight: var(--text-body3-weight); }
.body4 { font-size: var(--text-body4-size); line-height: var(--text-body4-line); font-weight: var(--text-body4-weight); }

/* Caption */
.caption1 { font-size: var(--text-caption1-size); line-height: var(--text-caption1-line); font-weight: var(--text-caption1-weight); }
.caption2 { font-size: var(--text-caption2-size); line-height: var(--text-caption2-line); font-weight: var(--text-caption2-weight); }
.caption3 { font-size: var(--text-caption3-size); line-height: var(--text-caption3-line); font-weight: var(--text-caption3-weight); }

/* CTA */
.cta1 { font-size: var(--text-cta1-size); line-height: var(--text-cta1-line); font-weight: var(--text-cta1-weight); letter-spacing: var(--text-cta1-letter); }
.cta2 { font-size: var(--text-cta2-size); line-height: var(--text-cta2-line); font-weight: var(--text-cta2-weight); letter-spacing: var(--text-cta2-letter); }
.cta3 { font-size: var(--text-cta3-size); line-height: var(--text-cta3-line); font-weight: var(--text-cta3-weight); letter-spacing: var(--text-cta3-letter); }
.cta4 { font-size: var(--text-cta4-size); line-height: var(--text-cta4-line); font-weight: var(--text-cta4-weight); letter-spacing: var(--text-cta4-letter); }
```

---

### 2-4. 모바일 타이포 스케일 (`max-width: 767px` · 하한 반영)

| 토큰 | 데스크탑 | 모바일 | 하한 체크 |
|------|----------|--------|-----------|
| H1 | 64px | 36px | OK (≥20) |
| H2 | 48px | 28px | OK |
| H3 | 36px | 22px | OK |
| H4 | 28px | **20px** | 모바일 제목 하한 |
| Body1 | 20px | 17px | OK (≥16) |
| Body2 | 18px | **16px** | 본문 하한 |
| Body3 | 16px | **16px** | 본문 하한 (구 15→16) |
| Body4 | 14px | **14px** | 보조만 (구 13→14) |
| Caption1~3 | 13/12/12 | **12px** | 캡션 하한 |
| CTA1 | 20px | 17px | OK |
| CTA2 | 18px | 16px | OK |
| CTA3 | 16px | **16px** | (구 15→16 권장) |
| CTA4 | 14px | **14px** | CTA 하한 |
| input | 16px | **16px** | 필수 |

```css
@media (max-width: 767px) {
  :root {
    --text-h1-size: 36px;
    --text-h2-size: 28px;
    --text-h3-size: 22px;
    --text-h4-size: 20px;
    --text-body1-size: 17px;
    --text-body2-size: 16px;
    --text-body3-size: 16px;
    --text-body4-size: 14px;
    --text-caption1-size: 12px;
    --text-caption2-size: 12px;
    --text-caption3-size: 12px;
    --text-cta1-size: 17px;
    --text-cta2-size: 16px;
    --text-cta3-size: 16px;
    --text-cta4-size: 14px;
  }

  input, select, textarea {
    font-size: var(--text-min-input); /* ≥16px · iOS 확대 방지 */
  }
}
```

---

## 3. 스페이싱

```css
:root {

  --space-0:    0px;
  --space-1:    4px;
  --space-2:    8px;
  --space-3:    12px;
  --space-4:    16px;
  --space-5:    20px;
  --space-6:    24px;
  --space-7:    28px;
  --space-8:    32px;
  --space-9:    36px;
  --space-10:   40px;
  --space-12:   48px;
  --space-14:   56px;
  --space-16:   64px;
  --space-18:   72px;
  --space-20:   80px;
  --space-24:   96px;
  --space-28:   112px;
  --space-32:   128px;
  --space-40:   160px;
  --space-48:   192px;
  --space-56:   224px;
  --space-64:   256px;

  /* 섹션 패딩 단축키 */
  --section-py-sm:   80px;   /* 작은 섹션 */
  --section-py-md:   120px;  /* 기본 섹션 */
  --section-py-lg:   160px;  /* 큰 섹션 */
  --section-py-xl:   200px;  /* 히어로급 */

}
```

---

## 4. 보더 레디우스

```css
:root {

  --radius-none:  0px;
  --radius-xs:    2px;
  --radius-sm:    4px;
  --radius-md:    8px;
  --radius-lg:    12px;
  --radius-xl:    16px;
  --radius-2xl:   20px;
  --radius-3xl:   24px;
  --radius-4xl:   32px;
  --radius-full:  9999px;

  /* 용도별 단축키 */
  --radius-button:  var(--radius-md);   /* 기본 버튼 */
  --radius-card:    var(--radius-xl);   /* 카드 */

  /* 카드 기본 간격 — 내부 vs 외부 대소 관계 강제 없음 (decision 2026-08-03) */
  --card-padding:   var(--space-6);   /* PC 기본 24px */
  --card-gap:       var(--space-6);   /* PC 기본 카드 간 24px */
  --radius-input:   var(--radius-md);   /* 인풋 */
  --radius-badge:   var(--radius-full); /* 뱃지/태그 */
  --radius-modal:   var(--radius-2xl);  /* 모달 */

}
```

---

## 5. 그림자

```css
:root {

  /* 기본 = 중립색(검정/그레이) alpha. 컬러 그림자는 제한적 사용 */
  /* 실제 프로젝트에서 primary에 맞춘 --shadow-color-* 는 포인트용 */

  --shadow-xs:  0 1px 2px rgba(0,0,0,0.04);
  --shadow-sm:  0 2px 8px rgba(0,0,0,0.06);
  --shadow-md:  0 4px 16px rgba(0,0,0,0.08);
  --shadow-lg:  0 8px 32px rgba(0,0,0,0.10);
  --shadow-xl:  0 16px 48px rgba(0,0,0,0.12);
  --shadow-2xl: 0 24px 64px rgba(0,0,0,0.16);

  /* 컬러 그림자 — CTA·브랜드 포인트 등 제한적 (전역 기본 아님) */
  --shadow-color-sm:  0 2px 8px rgba(37,99,235,0.12);
  --shadow-color-md:  0 4px 16px rgba(37,99,235,0.16);
  --shadow-color-lg:  0 8px 32px rgba(37,99,235,0.20);

  /* 용도별 단축키 (기본은 중립 스케일) */
  --shadow-card:    var(--shadow-sm);
  --shadow-hover:   var(--shadow-md);
  --shadow-dropdown: var(--shadow-md);
  --shadow-modal:   var(--shadow-xl);
  --shadow-float:   var(--shadow-lg);

}
```

---

## 6. 컨테이너 & 그리드

### 6-1. 컨테이너 너비 옵션

```css
:root {

  /* 선택지: 프로젝트 시작 시 하나 고정 */
  --container-sm:   1280px;  /* 컴팩트 */
  --container-md:   1440px;  /* 표준 */
  --container-lg:   1600px;  /* 여유로운 · 프로젝트 기본 (확정) */
  --container-xl:   1800px;  /* 와이드스크린 */

  /* 현재 프로젝트 적용값 */
  --container-max:  var(--container-lg);

  /* 콘텐츠 좌우 패딩 */
  --container-px-mobile:  16px;
  --container-px-tablet:  24px;
  --container-px-desktop: 40px;

}

/* 컨테이너 클래스 */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--container-px-desktop);
  padding-right: var(--container-px-desktop);
}
```

---

### 6-2. 그리드

```css
:root {

  /* 그리드 컬럼 */
  --grid-cols-mobile:  4;
  --grid-cols-tablet:  8;
  --grid-cols-desktop: 12;

  /* 거터 (컬럼 간격) */
  --grid-gap-mobile:   16px;
  --grid-gap-tablet:   20px;
  --grid-gap-desktop:  24px;

}

/* 그리드 유틸리티 */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gap-desktop);
}
```

---

## 7. 브레이크포인트

```css
/*
  프로젝트 브레이크포인트 (확정 · 업계 공통: 768 / 1024 계열)
  사용법 예시:
  @media (max-width: 767px)  { ... }  모바일
  @media (max-width: 1023px) { ... }  태블릿 이하
  @media (min-width: 1024px) { ... }  데스크탑 이상
  @media (min-width: 1600px) { ... }  와이드 (컨테이너 max 근처)
*/

:root {
  --bp-mobile:  767px;
  --bp-tablet:  1023px;
  --bp-desktop: 1024px;
  --bp-wide:    1600px;  /* 컨테이너 1600과 맞춤 */
}
```

---

## 8. z-index

```css
:root {

  --z-base:       0;
  --z-raised:     10;
  --z-dropdown:   100;
  --z-sticky:     150;
  --z-header:     200;
  --z-overlay:    300;   /* 모달 배경 dimmed */
  --z-modal:      400;
  --z-toast:      500;
  --z-tooltip:    600;

}
```

---

## 9. 보더

```css
:root {

  /* 굵기 */
  --border-width-thin:    1px;
  --border-width-default: 1px;
  --border-width-thick:   2px;

  /* 색상 단축키 */
  --border-color-light:   var(--gray-200);
  --border-color-default: var(--gray-300);
  --border-color-strong:  var(--gray-400);
  --border-color-focus:   var(--color-primary);

  /* 조합 단축키 */
  --border-light:   var(--border-width-thin) solid var(--border-color-light);
  --border-default: var(--border-width-default) solid var(--border-color-default);
  --border-strong:  var(--border-width-thick) solid var(--border-color-strong);

}
```

---

## 10. 애니메이션

```css
:root {

  /* Duration */
  --duration-fast:    150ms;
  --duration-normal:  250ms;
  --duration-slow:    400ms;
  --duration-slower:  600ms;
  --duration-scroll:  800ms;

  /* Easing */
  --ease-default:   cubic-bezier(0.4, 0, 0.2, 1);  /* 범용 */
  --ease-in:        cubic-bezier(0.4, 0, 1, 1);     /* 들어올 때 */
  --ease-out:       cubic-bezier(0, 0, 0.2, 1);     /* 나갈 때 */
  --ease-bounce:    cubic-bezier(0.34, 1.56, 0.64, 1); /* 탄성 */
  --ease-smooth:    cubic-bezier(0.25, 0.1, 0.25, 1);  /* 부드럽게 */

  /* 조합 단축키 */
  --transition-fast:   all var(--duration-fast) var(--ease-default);
  --transition-normal: all var(--duration-normal) var(--ease-default);
  --transition-slow:   all var(--duration-slow) var(--ease-default);

}
```

---

## 11. 아이콘 (플레이스홀더)

```css
:root {

  /* 크기 */
  --icon-xs:  14px;
  --icon-sm:  16px;
  --icon-md:  20px;
  --icon-lg:  24px;
  --icon-xl:  32px;
  --icon-2xl: 40px;

}

/*
  아이콘 라이브러리 선택지:
  A. 자체 SVG 라이브러리 → /assets/icons/ 폴더에서 불러옴
  B. Lucide Icons (CDN)
     <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
  C. Heroicons (CDN)
     직접 SVG 복사 방식 사용

  → **우선:** 레포 루트 `_icons/` 공용 SVG (확정)
  → 없을 때만 템플릿 `assets/icons/`에 추가 · CDN(Lucide/Heroicons) **기본 금지**
  현재 선택: **자체 SVG · `_icons/` 우선**
*/
```

---

## 12. 오파시티

```css
:root {

  --opacity-disabled:  0.4;
  --opacity-muted:     0.6;
  --opacity-overlay:   0.65;   /* 모달 배경 dimmed */
  --opacity-hover:     0.85;
  --opacity-full:      1;

}
```

---

## 13. 프로젝트 시작 체크리스트

```
새 프로젝트를 시작할 때 아래 항목만 확정하면 된다.

□ 브랜드 컬러 선택
  --color-primary:    [팔레트에서 선택]
  --color-secondary:  [팔레트에서 선택]
  --color-accent:     [팔레트에서 선택]

□ 배경 톤 선택
  라이트 모드 (--color-bg-base: #FFFFFF)
  크림 모드   (--color-bg-base: #FAFAF8)
  다크 모드   (--color-bg-base: var(--gray-900))

□ 컨테이너 너비 선택
  1280 / 1440 / ✅ 1600 (기본 확정) / 1800

□ 폰트
  ✅ SUIT

□ 브레이크포인트
  ✅ 767 / 1023 / 1024 / wide 1600

□ 아이콘
  ✅ 크기: 마스터 --icon-xs~2xl
  ✅ 소스: 레포 `_icons/` 우선 (자체 SVG)
  CDN Lucide/Heroicons: 기본 사용 안 함

□ 버튼 라운드 느낌 선택
  각진 (--radius-button: var(--radius-sm))
  중간 (--radius-button: var(--radius-md))
  둥근 (--radius-button: var(--radius-full))

□ 섹션 기본 간격 선택
  여유 (--section-py-lg: 160px)
  표준 (--section-py-md: 120px)
  타이트 (--section-py-sm: 80px)
```

---

## 14. 파일 구조 (실제 사용 시)

```
tokens/
  _colors.css        ← 팔레트 전체 + 시멘틱 (이 문서 §1)
  _typography.css    ← SUIT 폰트 + 크기 스케일 (§2)
  _spacing.css       ← 스페이싱 (§3)
  _radius.css        ← 보더 레디우스 (§4)
  _shadow.css        ← 그림자 (§5)
  _layout.css        ← 컨테이너 + 그리드 + 브레이크포인트 (§6,7)
  _system.css        ← z-index, 보더, 애니메이션, 오파시티 (§8~12)
  tokens.css         ← 위 전체 @import 하는 진입점

사용법:
  프로젝트 시작 시 tokens.css 1개만 HTML에 연결
  브랜드 커스터마이징은 시멘틱 색상(_colors.css)만 수정
```
