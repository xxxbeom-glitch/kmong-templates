# MOALUCK Design Tokens (`--ds-*`)

> 출처: `optimizer_user` CSS `:root` · **테마 전용** (카페24 솔루션 공통 아님)
> 토큰 수: **107**

- 기본 폰트 패밀리 토큰(`--ds-ff*`) **없음** → 원본은 Pretendard 직접 지정
- **정렬(align) 토큰 없음** → 컴포넌트별 `text-align` / flex로 하드코딩

## Shell / 레이아웃 규칙 (토큰+관례)

| 규칙 | 값 |
|---|---|
| content max | `--ds-container` **1520px** |
| section gutter | 좌우 `--ds-sp-24` (24px) · section max = container + gutter×2 |
| `.ds-section` | guttered 기본 · `.full`이면 full-bleed, 안쪽 `.ds-section-inner`가 다시 gutter |
| `#contents` padding | 상 `--ds-sp-80` / 하 `--ds-sp-112` 사용처 있음 |
| `.titleArea` 하단 여백 | `--ds-sp-48` |
| 주요 breakpoint | **767 / 768 · 1024 / 1025 · 440 / 441** |

## Typography (29)

| 토큰 | 값 |
|---|---|
| `--ds-fs-2xl` | 24px |
| `--ds-fs-3xl` | 28px |
| `--ds-fs-4xl` | 32px |
| `--ds-fs-5xl` | 64px |
| `--ds-fs-body-lg` | 16px |
| `--ds-fs-body-md` | 14px |
| `--ds-fs-caption-lg` | 14px |
| `--ds-fs-caption-md` | 12px |
| `--ds-fs-caption-sm` | 11px |
| `--ds-fs-display-lg` | 64px |
| `--ds-fs-display-md` | 56px |
| `--ds-fs-h1` | 32px |
| `--ds-fs-h2` | 28px |
| `--ds-fs-h3` | 24px |
| `--ds-fs-h4` | 20px |
| `--ds-fs-h5` | 18px |
| `--ds-fs-lg` | 18px |
| `--ds-fs-md` | 16px |
| `--ds-fs-sm` | 14px |
| `--ds-fs-xl` | 20px |
| `--ds-fs-xs` | 12px |
| `--ds-fw-bold` | 700 |
| `--ds-fw-medium` | 500 |
| `--ds-fw-regular` | 400 |
| `--ds-fw-semibold` | 600 |
| `--ds-lh-base` | 1.4 |
| `--ds-lh-loose` | 1.5 |
| `--ds-lh-tight` | 1.2 |
| `--ds-ls` | -0.02em |

## Color (41)

| 토큰 | 값 |
|---|---|
| `--ds-c-accent` | #FF6618 |
| `--ds-c-bg-base` | #FFFFFF |
| `--ds-c-bg-card` | #FFFFFF |
| `--ds-c-bg-dark` | #161616 |
| `--ds-c-bg-disabled` | #F8F8F8 |
| `--ds-c-bg-disabled-dark` | #E8E8E8 |
| `--ds-c-bg-highlight` | #FFF7F3 |
| `--ds-c-bg-mask` | rgba(0,0,0,0.55) |
| `--ds-c-bg-page` | #FFFFFF |
| `--ds-c-bg-section` | #F8F8F8 |
| `--ds-c-bg-translucent` | rgba(255,255,255,0.6) |
| `--ds-c-brand` | #FF6618 |
| `--ds-c-brand-light` | #FFF7F3 |
| `--ds-c-danger` | #EC2D30 |
| `--ds-c-icon-accent` | #FF6618 |
| `--ds-c-icon-invert` | #FFFFFF |
| `--ds-c-icon-main` | #161616 |
| `--ds-c-icon-sub` | #737373 |
| `--ds-c-line-dark` | #161616 |
| `--ds-c-line-disabled` | #E8E8E8 |
| `--ds-c-line-error` | #EC2D30 |
| `--ds-c-line-focus` | #000000 |
| `--ds-c-line-hover` | #454545 |
| `--ds-c-line-light` | #E8E8E8 |
| `--ds-c-line-main` | #E8E8E8 |
| `--ds-c-line-sub` | #D0D0D0 |
| `--ds-c-overlay-floating` | rgba(255,255,255,0.5) |
| `--ds-c-overlay-main` | rgba(22,22,22,0.4) |
| `--ds-c-overlay-sub` | rgba(22,22,22,0.1) |
| `--ds-c-primary` | #161616 |
| `--ds-c-success` | #2e8b57 |
| `--ds-c-text-disabled` | #D0D0D0 |
| `--ds-c-text-error` | #EC2D30 |
| `--ds-c-text-invert` | #FFFFFF |
| `--ds-c-text-link` | #161616 |
| `--ds-c-text-link-hover` | #161616 |
| `--ds-c-text-main` | #161616 |
| `--ds-c-text-mute` | #D0D0D0 |
| `--ds-c-text-placeholder` | #BABABA |
| `--ds-c-text-sub` | #737373 |
| `--ds-c-warning` | #f5a623 |

## Spacing (15)

| 토큰 | 값 |
|---|---|
| `--ds-sp-0` | 0px |
| `--ds-sp-112` | 112px |
| `--ds-sp-12` | 12px |
| `--ds-sp-16` | 16px |
| `--ds-sp-2` | 2px |
| `--ds-sp-20` | 20px |
| `--ds-sp-24` | 24px |
| `--ds-sp-32` | 32px |
| `--ds-sp-4` | 4px |
| `--ds-sp-40` | 40px |
| `--ds-sp-48` | 48px |
| `--ds-sp-56` | 56px |
| `--ds-sp-64` | 64px |
| `--ds-sp-8` | 8px |
| `--ds-sp-80` | 80px |

## Radius (5)

| 토큰 | 값 |
|---|---|
| `--ds-r-lg` | 24px |
| `--ds-r-md` | 12px |
| `--ds-r-round` | 999px |
| `--ds-r-sm` | 8px |
| `--ds-r-xs` | 4px |

## Border width (3)

| 토큰 | 값 |
|---|---|
| `--ds-bw-medium` | 2px |
| `--ds-bw-thick` | 4px |
| `--ds-bw-thin` | 1px |

## Shadow (2)

| 토큰 | 값 |
|---|---|
| `--ds-sh-md` | 0 20px 40px rgba(22,22,22,0.1) |
| `--ds-sh-sm` | 0 -5px 20px rgba(22,22,22,0.1) |

## Icon size (4)

| 토큰 | 값 |
|---|---|
| `--ds-icon-lg` | 72px |
| `--ds-icon-md` | 24px |
| `--ds-icon-sm` | 16px |
| `--ds-icon-xs` | 12px |

## Layout (1)

| 토큰 | 값 |
|---|---|
| `--ds-container` | 1520px |

## Z-index (5)

| 토큰 | 값 |
|---|---|
| `--ds-z-dropdown` | 200 |
| `--ds-z-header` | 100 |
| `--ds-z-modal` | 400 |
| `--ds-z-overlay` | 300 |
| `--ds-z-toast` | 500 |

## Motion (2)

| 토큰 | 값 |
|---|---|
| `--ds-tr-base-all` | all 0.25s ease |
| `--ds-tr-fast-all` | all 0.15s ease |

## Mobile overrides (`max-width: 767px`)

| 토큰 | Desktop | → Mobile |
|---|---|---|
| `--ds-fs-display-lg` | 64px | 48px |
| `--ds-fs-display-md` | 56px | 44px |
| `--ds-fs-h1` | 32px | 24px |
| `--ds-fs-h2` | 28px | 20px |
| `--ds-fs-h3` | 24px | 18px |
| `--ds-fs-h4` | 20px | 18px |
| `--ds-fs-h5` | 18px | 16px |
| `--ds-fs-body-lg` | 16px | 14px |
| `--ds-fs-body-md` | 14px | 14px |
| `--ds-fs-caption-lg` | 14px | 12px |
| `--ds-fs-caption-md` | 12px | 12px |
| `--ds-fs-caption-sm` | 11px | 11px |
| `--ds-sp-16` | 16px | 12px |
| `--ds-sp-24` | 24px | 16px |
| `--ds-sp-32` | 32px | 24px |
| `--ds-sp-40` | 40px | 32px |
| `--ds-sp-48` | 48px | 32px |
| `--ds-sp-56` | 56px | 32px |
| `--ds-sp-80` | 80px | 40px |
| `--ds-sp-112` | 112px | 64px |
| `--ds-icon-md` | 24px | 20px |

## 정렬 (토큰 없음 · 사용 빈도)

| 방식 | CSS 빈도(대략) |
|---|---|
| `align-items: center` | 많음 |
| `text-align: center` | 많음 |
| `text-align: left` | 중간 |
| `justify-content: center` | 중간 |
| `justify-content: space-between` | 있음 |
| `margin: 0 auto` (가운데 블록) | 있음 |
