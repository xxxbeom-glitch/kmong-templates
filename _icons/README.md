# _icons ? 공용 SVG · 모션 아이콘 라이브러리

원본 보관소. 테마에서 쓸 때는 필요한 파일만 `assets/icons/`(또는 `assets/lottie/`)로 복사한다.

## 로컬 미리보기

**추천:** `_icons/open-gallery.bat` 더블클릭  
→ 브라우저가 열리고, 아이콘 추가 후 **새로고침(F5)** 만 하면 최신 목록이 반영된다. (매번 빌드 명령 불필요)

또는:

```bash
node _icons/serve-gallery.js
```

- 카테고리: UI / Social / Motion / Line / Fill
- 한글명 + 영문 파일명 표시 · 한글/영문 검색
- 클릭 시 경로 복사
- 한글 라벨 수정: `_icons/labels.ko.json`

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
- 예: `download.json` · `chevron-down.json`
- SVG와 의미가 같으면 **같은 키워드** 사용

## 타입 표기

| 접미사 | 의미 |
|--------|------|
| (없음) | 라인(outline) |
| `-fill` | 면 채움 |
| `-2`, `-3`… | 변형 |
