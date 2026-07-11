# Failure Log (오답노트)

> **쓰는 법:** 비슷한 작업 들어가기 **전**에 아래 **유형 카드**만 본다.  
> 날짜별 긴 이야기는 맨 아래 「상세」.  
> **새 실패를 적을 때:** 유형 카드에 한 줄 추가 + 상세에 날짜 섹션 추가. (아래 `_logs/README.md`)

## 유형 목차 (빠른 조회)

| ID | 유형 | 이런 작업할 때 |
|----|------|----------------|
| L1 | 레이아웃·쉘·여백 | 섹션 shell, gutter, full-bleed, ultrawide |
| L2 | Wrap 안 자식 정렬 | 사진+텍스트 나란히, figure/grid |
| T1 | 텍스트 정렬 | title/head center·left |
| G1 | gap·간격 | 카드 사이, Auto Layout gap |
| B1 | Section BG·overlay | 배경색, 그라데이션, 카드 오버레이 |
| M1 | 모바일 @768 | gutter, 시작선, grid |
| R1 | (동결) 사이트 복제 | reference-harness — **신규 작업 안 함** |

---

## L1 — 레이아웃·쉘·여백

**증상 한 줄:** 넓게 보면 좌우 여백 과다 / CTA·배경이 안쪽만 칠해짐 / gutter 이중

**하지 말 것**
- shell에 `max-width: 1840` 같은 **임의 cap**
- 모든 섹션에 습관적으로 `padding-inline` (full-bleed 구분 없이)
- gutter pad + inner `max-width` **동시에** (시작선 밀림)

**할 것**
- Figma에서 **guttered vs full-bleed** 먼저 말하기
- ultrawide는 **2560+** 로도 보기 (`30` · `50`)

**규칙:** `30-figma-to-code` · `50-qa-checklist`  
**상세:** 2026-06-08 shell cap · CTA full-bleed · cross-template

---

## L2 — Wrap 안 자식 정렬 (figure 등)

**증상 한 줄:** shell은 맞는데 **사진만** 좌우로 들어가 보임

**하지 말 것**
- `.section-shell` 폭만 보고 PASS
- `<figure>` UA margin 리셋 안 함

**할 것**
- wrap 안 **형제들** DevTools/캡처로 왼쪽·오른쪽 맞추기
- MCP에 **children x/w** 적기

**규칙:** `50` Wrap DOM QA · `30` Wrap children · `40` figure reset  
**상세:** 2026-06-09 smile-clinic intro

---

## T1 — 텍스트 정렬

**증상 한 줄:** Figma는 가운데인데 구현은 왼쪽

**하지 말 것**
- padding/gap/font만 보고 `textAlignHorizontal` 안 봄
- head(중앙)와 card body(좌)를 한 정렬로 취급

**할 것**
- 블록마다 align 보고 (`20` Figma 보고 항목)

**규칙:** `30` Typography · alignment · `50`  
**상세:** 2026-06-08 mainstream story head

---

## G1 — gap·간격

**증상 한 줄:** 카드 사이 틈이 Figma(밀착)와 다름

**하지 말 것**
- `itemSpacing`만 믿고 bbox `gapFromPrev` 안 봄
- 섹션 QA·qa-log 생략한 채 일괄 구현

**규칙:** `30` Gap · `20` 섹션마다 qa-log  
**상세:** 2026-06-08 works gallery

---

## B1 — Section BG·overlay·로고·스크롤

**증상 한 줄:** 배경색/그라데이션이 옆 섹션이랑 섞임 · 로고 작아 보임 · 가로 스크롤 · F5 후 스크롤 위치

**하지 말 것**
- PNG/썸네일만 보고 BG 확정
- fill 없음 → 옆 섹션 색으로 추측
- overlay와 Section BG 혼동

**할 것**
- MCP JSON fills · 인접 Section BG 표 · logo `object-fit`/`height` 주의

**규칙:** `30` Section BG · `40` · `45` scroll · `50`  
**상세:** 2026-06-08 cross-template · 2026-06-09 MCP Section BG

---

## M1 — 모바일 @768

**증상 한 줄:** 모바일에서 본문 gutter 없음·이중 pad · PC 2단 남음

**할 것**
- @768은 **MO만** 수정 (PC 스타일 같이 건드리지 않기 — active-track)
- header/본문 **시작선** 맞추기

**규칙:** `35-responsive` · `50` 모바일 QA  
**상세:** 2026-06-09 모바일 gutter 패치 메모

---

## R1 — (동결) 사이트 복제

**신규 작업에 쓰지 않음.** 복제 트랙·다운로드본 삭제됨.  
과거 상세만 아래 「상세」 2026-07-08 참고.

---

## 상세 (날짜순 · 증거)

### 2026-07-08 — [reference-harness] ptmd869920 미러 fidelity 후속 이슈 → R1

(동결 트랙. 증상·원인·해결은 당시 mirror/preview/MIME/경로 이슈 — 재개 시에만 참고)

### 2026-06-09 — wrap shell PASS · figure UA margin 미검 → L2

- smile-clinic intro: shell PASS인데 figure만 inset
- 해결: figure margin reset

### 2026-06-08 — mainstream layout shell cap → L1

- ultrawide 여백 과다 · shell max-width cap
- 해결: gutter vw only, shell cap 제거

### 2026-06-08 — mainstream CTA full-bleed 미적용 → L1

- CTA bg가 pad 안에만
- 해결: CTA pad-x 0 · bleed

### 2026-06-08 — mainstream story head text-align 누락 → T1

- center인데 left로 구현
- 해결: story__head center

### 2026-06-08 — mainstream works gallery gap 오판 → G1

- gap 10 vs Figma 0
- 해결: gap 0 · 섹션 QA 필수

### 2026-06-08 — cross-template overlay·gutter·bleed·logo·scroll → B1

- 공통 실패 유형 → 규칙 패치 묶음

### 2026-06-09 — 모바일 @768 gutter · MCP Section BG → M1 · B1

- 규칙 `35`/`30`/`50` 동기화
