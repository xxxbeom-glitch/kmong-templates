# _icons ? 공용 SVG · 모션 아이콘 라이브러리

원본 보관소. 테마에서 쓸 때는 필요한 파일만 `assets/icons/`(또는 `assets/lottie/`)로 복사한다.

## 폴더

| 폴더 | 용도 |
|------|------|
| `ui/` | UI·업종 SVG (라인 / fill) |
| `social/` | SNS·로그인 SVG |
| `motion/` | Lottie 등 **모션 JSON** |
| `brand/` | 브랜드·서비스 전용 |

## SVG 네이밍

- **kebab-case** · 소문자 · `.svg`
- 라인: `home.svg` · fill: `home-fill.svg`
- 같은 의미 다른 스타일: `home-2.svg` · `home-fill-2.svg`

## 모션 네이밍 (`motion/`)

- kebab-case · `.json` (Lottie)
- 예: `download.json` · `chevron-down.json` · `pin-check.json`
- SVG와 의미가 같으면 **같은 키워드** 사용

## 현재 모션

`chevron-down` · `download` · `exit` · `folder-download` · `pin-check`

## 타입 표기

| 접미사 | 의미 |
|--------|------|
| (없음) | 라인(outline) |
| `-fill` | 면 채움 |
| `-2`, `-3`… | 변형 |

## 화살표

- `arrow-right` · `arrow-up-right` · `caret-up` · `chevron-down`
- 방향은 CSS `rotate` 재사용 가능
