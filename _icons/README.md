# _icons ? 공용 SVG 아이콘 라이브러리

원본 보관소. 테마에서 쓸 때는 필요한 파일만 `assets/icons/`로 복사한다.

## 폴더

| 폴더 | 용도 |
|------|------|
| `ui/` | UI 공통 (화살표, 메뉴, 검색, 미디어…) |
| `social/` | SNS |
| `brand/` | 브랜드·서비스 전용 (비어 있음) |

## 네이밍 규칙

- **kebab-case** · 소문자 · `.svg`
- 기본(라인): `home.svg`, `search.svg`
- 같은 키워드 다른 스타일: `home-2.svg`, `home-3.svg` …
- 면 채움(fill): `play-fill.svg`, `facebook-fill.svg`
- 의미 변형은 단어로: `calendar-add.svg`, `eye-off.svg`, `check-circle.svg`

## 타입 표기

| 접미사 | 의미 |
|--------|------|
| (없음) | 라인(outline/stroke) ? 색·굵기 CSS 조절용 |
| `-fill` | 면 채움 |
| `-2`, `-3`… | 같은 의미의 다른 라인 스타일 |

## 화살표

- `arrow-right.svg` · `arrow-up-right.svg` · `caret-up.svg`
- 다른 방향은 CSS `rotate`로 재사용

## 소셜 (현재)

`facebook` / `facebook-fill` / `facebook-fill-2` · `instagram` / `instagram-fill` · `youtube` / `youtube-fill` · `x-fill` / `x-fill-2` · `linkedin-fill` · `messenger`
