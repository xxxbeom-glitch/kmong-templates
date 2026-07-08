# change-request — ptmd868445

| | |
|--|--|
| created | 2026-07-08 |
| source | 01-original copy |
| status | in-progress |

## 요청 범위

1. 기본 폰트: Pretendard → **SUIT** (유지)
2. 타이포 수치(크기·굵기·행간·자간): **PTMD871337** 기준으로 수정본 **전체** (`--ds-fs/fw/lh/ls` 재정의)
3. 상품 썸네일 크기감: 참고 PTMD807311 · 1줄 4개 — **MD’S PICK만** (승인 전 공통 반영 보류)
4. MD’S PICK 부가: 라운드 24 · 네비 상시 · 아이콘 50% · 네비 세로 중앙

## PTMD871337 → MOALUCK `--ds-*` 매핑 (Desktop)

| MOALUCK 토큰 | 이전 | ← 871337 근거 | 새 값 |
|---|---|---|---|
| `--ds-fs-caption-md` | 12 | text-extra-small 0.6rem | **12px** |
| `--ds-fs-body-md` | 14 | body 0.75rem | **15px** |
| `--ds-fs-body-lg` | 16 | text-medium 0.8rem | **16px** |
| `--ds-fs-h2` | 28 | title/util mid | **24px** |
| `--ds-fs-h1` / display-md | 32 / 56 | title 30 / 2rem band | **30 / 30** |
| `--ds-lh-base` | 1.4 | body line-height | **1.3** |
| `--ds-ls` | -0.02em | default normal | **0** |
| `--ds-fw-*` | 400/500/600/700 | 동일 ladder | 유지 |

폰트 패밀리 토큰은 871337의 Montserrat/Pretendard Variable을 쓰지 않고 **SUIT만** 유지.

## 변경 로그

| 일시 | 내용 |
|------|------|
| 2026-07-08 | working-copy 초기화 |
| 2026-07-08 | SUIT 기본 폰트 |
| 2026-07-08 | MD’S PICK 4열·1:1·네비/라운드/아이콘 |
| 2026-07-08 | **전체** 타이포 토큰을 PTMD871337 스케일로 재정의 (SUIT 유지) |
