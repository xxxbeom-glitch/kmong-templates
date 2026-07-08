# change-request — ptmd868445

| | |
|--|--|
| created | 2026-07-08 |
| source | 01-original copy |
| status | in-progress |

## 요청 범위

1. 기본 폰트: Pretendard → **SUIT** (유지)
2. 타이포 수치: **PTMD871337** → `--ds-fs/fw/lh/ls` 수정본 전체
3. 상품 모듈 (MD’S PICK에서 확정 → **연결된 `.ds-base-product` / `.prdList` 공통**)
   - Desktop **4열** / tablet 3 / mobile 2
   - 썸네일 **1:1** · 라운드 `--ds-r-lg` **24px**
   - 좌우 네비 **상시 노출** · 아이콘 50% · **썸네일 세로 중앙**
4. 헤더 **2열 레이아웃** (ref [PTMD807311](https://d.cafe24.com/sample?productCode=PTMD807311&frame=P))
   - 상단: 로고 · 주문조회 · 로그인 · 회원가입
   - 하단: GNB(가을페스타~커뮤니티) · 검색필드 · 마이 · 장바구니 · 햄버거
   - **레이아웃만** 참고 · 토큰/카피/SUIT는 MOALUCK 유지

## 변경 로그

| 일시 | 내용 |
|------|------|
| 2026-07-08 | working-copy · SUIT · 871337 타이포 |
| 2026-07-08 | MD’S PICK만 4열·1:1·네비/라운드 |
| 2026-07-08 | **승인:** MD PICK 규칙을 상품 공통 모듈(`.ds-base-product` / product swiper)에 확장 |
| 2026-07-08 | BEST prdList grid6 → grid4 (MD PICK과 동일 4열 크기감) |
| 2026-07-08 | 헤더 2열 (PTMD807311 레이아웃 · MOALUCK 토큰) |
| 2026-07-09 | 헤더 검색: 팝업 대신 필드 직접 입력 |
