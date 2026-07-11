# _icons ? 공용 SVG 아이콘 라이브러리

원본 보관소. 테마에서 쓸 때는 필요한 파일만 `assets/icons/`로 복사한다.

## 폴더

| 폴더 | 용도 | 대략 수량 |
|------|------|-----------|
| `ui/` | UI·업종 공통 | 260+ |
| `social/` | SNS·로그인 | 18 |
| `brand/` | 브랜드·서비스 전용 | 비움 |

## 네이밍 규칙

- **kebab-case** · 소문자 · `.svg`
- 기본(라인): `home.svg`, `search.svg`
- 같은 키워드 다른 스타일: `home-2.svg`, `home-3.svg` …
- 면 채움(fill): `play-fill.svg`, `facebook-fill.svg`
- 의미 변형은 단어로: `calendar-add.svg`, `eye-off.svg`, `shield-check-fill.svg`

## 타입 표기

| 접미사 | 의미 |
|--------|------|
| (없음) | 라인(outline/stroke) |
| `-fill` | 면 채움 |
| `-2`, `-3`… | 같은 의미의 다른 스타일 |

## 화살표·쉐브론

- `arrow-right` · `arrow-up-right` · `caret-up` · `chevron-down`
- 다른 방향은 CSS `rotate` 재사용 가능

## 소셜 (`social/`)

라인/브랜드: `facebook` · `instagram` · `youtube` · `messenger` · `github` · `github-square` · `google-drive`  
Fill: `facebook-fill` · `instagram-fill` · `youtube-fill` · `x-fill` · `linkedin-fill` · `apple-fill` · `google-fill` · `discord-fill` · `pinterest-fill`

## 업종 예시 (`ui/`)

- 의료: `stethoscope` · `syringe` · `pills` · `hospital` · `heart-pulse` · `wheelchair`
- 법률: `scale`
- 커머스: `shopping-bag` · `store` · `truck` · `ticket` · `wallet`
- IT: `code` · `cpu` · `server` · `ai-brain`
- 편의시설: `wifi` · `parking` · `shower` · `toilet` · `coffee` · `plug` · `sofa` · `dumbbell` · `treadmill` · `locker` 계열은 `lock`/`hanger`
- 비전·성과: `lightbulb` · `gem` · `crown` · `chart-*`
