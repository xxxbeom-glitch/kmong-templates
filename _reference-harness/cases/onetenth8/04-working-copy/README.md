# 04-working-copy — onetenth8 (Creative 08)

**원본 `01-original` 수정 금지.** 이 폴더만 편집합니다.

| | |
|--|--|
| 변형 | Creative 08 |
| 범위 | **프론트 디자인 수정만** (리팩터·WP 테마화·섹션 분리 없음) |
| entry | `index.html` |
| 디자인 오버라이드 | `working-overrides.css` · `working-overrides.js` |
| 에셋 | `_mirror` → `01-original/_mirror` junction (공유·삭제 금지) |
| 변경 기록 | `change-request.md` |

## 미리보기

- 허브: http://127.0.0.1:4173/ → **「수정본 열기」**
- 수정본 직접: **http://127.0.0.1:4301/** (`--working`)
- 원본 비교: http://127.0.0.1:4207/

```bash
node scripts/preview-hub.js --force
# 또는
node scripts/preview-original.js onetenth8 4301 --working
```

## 메인 섹션 (수정 시 참고)

1. Header · 2. Hero · 3. Intro+Video · 4. Testimonial · 5. Value×3 · 6. Pricing · 7. FAQ · 8. Footer

## 편집 규칙

- 색·여백·폰트·카피·이미지 → `working-overrides.css` 또는 `index.html` 최소 diff
- 구조 리팩터·클래스 대량 변경·WP/Elementor 분해 **금지**
- 요청마다 `change-request.md` 로그 1줄 추가
