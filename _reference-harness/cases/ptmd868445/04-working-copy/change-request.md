# change-request — ptmd868445

| | |
|--|--|
| created | 2026-07-08 |
| source | 01-original copy |
| status | in-progress |

## 요청 범위

1. 기본 폰트: Pretendard → **SUIT** (jsDelivr 웹폰트)  
2. 시맨틱·크기 토큰(`--ds-fs-*` 등) **유지** (요청 1 범위)
3. 상품 썸네일 크기감: 참고 [PTMD807311](https://d.cafe24.com/sample?productCode=PTMD807311&frame=P) · **1줄 4개**  
   - **1차:** `section.md-pick` (MD’S PICK)만  
   - **승인 후:** 같은 `prdList`/listmain 공통 반영

## 변경 로그

| 일시 | 내용 |
|------|------|
| 2026-07-08 | working-copy 초기화 (원본 복사) |
| 2026-07-08 | `working-overrides.css` — body 기본 font-family만 SUIT로 교체 · ds 사이즈/시맨틱 미변경 |
| 2026-07-08 | MD’S PICK만 — swiper 6열→4열 · 썸네일 1:1 cover (참고 ~305px 크기감) · 타 진열 미변경 |
| 2026-07-08 | MD’S PICK 좌우 네비 → 썸네일 이미지 세로 중앙 정렬 |
| 2026-07-08 | MD’S PICK 화살표 아이콘만 50% (20→10px) · 원 48px 유지 |
| 2026-07-08 | MD’S PICK 썸네일 라운드 `r-md` 12 → `--ds-r-lg` 24px |
