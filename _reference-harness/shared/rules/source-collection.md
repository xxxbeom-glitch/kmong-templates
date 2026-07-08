# Source Collection

> 산출: `01-original/` · 메타: `00-source/` · QA: `02-original-qa/`  
> **브라우저 복제(데모 URL) SoT:** `site-clone-fidelity.md` (한 번에 · 전체 페이지 · 인터랙션)

## 수집 대상 (가능한 전부)

HTML · CSS · JS · 이미지 · SVG · 아이콘 · 로고 · 배지 · 배너 · 웹폰트 · background-image · 영상·poster · JSON/정적 데이터 · 외부 라이브러리 · 슬라이더·탭·팝업·메뉴·호버·sticky·스크롤 모션 리소스 · Desktop/Mobile 반응형 · **내부 페이지·링크 구조 전체** · 장바구니·회원·게시판·이벤트 등 실제 이동 가능 화면

## 수집으로 인정하지 않음

캡처만 · 색면 placeholder · 임의 폰트 · **새 CSS 재작성** · structure mock · reconstruction을 original로 위장 · **메인 HTML만 미러하고 하위 페이지 생략** · JS 실행 후 DOM을 original entry로 위장

## 브라우저 복제 — 한 연속 작업 (필수)

공개 데모 / URL 수집 시 **단계별로 끊어서 “캡처만 완료”로 보고하지 않는다.**

```
license · source 메타
→ 1920 / 390 캡처
→ 멀티페이지 pristine 미러 (BFS, 사이트 커버)
→ preview 기동
→ fidelity QA (화면·이동·인터랙션)
→ 로그
```

상세·금지 패턴·기술 규칙: **`site-clone-fidelity.md`**.

| 목표 | 기준 |
|------|------|
| 시각 | 원격과 동일 (오차 최소화 · QA로 증명) |
| 이동 | 로컬 preview에서 내부 링크 클릭 이동 |
| 인터랙션 | 슬라이더 등 — preview + live proxy 포함 동일 동작 |
| Track C | ZIP≠브라우저 등급 명시 · 납품 승격 금지 |

## `00-source/` 필수

| 파일 | 내용 |
|------|------|
| `source.md` | URL · 수집일 · 방법 · 접속 정보 · pageCount · preview 명령 · 한계(프록시) |
| `license.md` | 권리·목적 (`license.md` 규칙) |
| `inventory.json` / remote request inventory | 원격 요청·누락·의도적 제외 URL |
| `captures/` | Desktop 1920 · Mobile 390 |

## `01-original/`

| 유형 | 내용 |
|------|------|
| skin-zip | ZIP 전체 풀기 · 수정 금지 |
| browser-captured | `site-clone-fidelity.md` 산출물 (`index.html` pristine · `_mirror` · `url-map.json` · `pages.json` · manifest) |

불변: `original-immutable.md`.  
재수집: `original-revision.md` (덮어쓰기 금지).

## PASS (수집 단계)

- 진입 HTML(또는 스킨 index) 존재
- **browser-captured:** 멀티페이지 미러 + preview로 주요 경로 이동 확인 (캡처만 = FAIL)
- 핵심 CSS/JS/이미지/폰트 로컬 또는 inventory·url-map 명시
- completeness: `skin-zip` | `site-archive` | `browser-captured` | `incomplete`
- license 기록 · README 수정금지

수집 PASS ≠ **original QA PASS**.  
다음: skin-zip → `original-integrity-qa.md` · browser-captured → `browser-capture-qa.md` (+ `site-clone-fidelity.md`).

## 시작 명령 (참고)

```bash
# URL 데모 / 사이트 (browser-captured) — 한 번에 전체
cd _reference-harness
node scripts/mirror-original.js {slug} {url} [maxPages]
node scripts/preview-original.js {slug}
# → http://127.0.0.1:4173/  (고정 · --force 로 재기동)

# 정식 ZIP (skin-zip) — 수신 후
# 1) cases/{slug}/00-source/license.md 기록
# 2) ZIP을 01-original/rev-001/ (또는 승인된 평면 경로)에 풀기 — 내용 수정 금지
# 3) checksum · file inventory 생성
# 4) 02-original-qa (ZIP ↔ local)
```
