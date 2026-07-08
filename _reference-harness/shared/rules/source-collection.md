# Source Collection

> 산출: `01-original/` · 메타: `00-source/` · QA: `02-original-qa/`

## 수집 대상 (가능한 전부)

HTML · CSS · JS · 이미지 · SVG · 아이콘 · 로고 · 배지 · 배너 · 웹폰트 · background-image · 영상·poster · JSON/정적 데이터 · 외부 라이브러리 · 슬라이더·탭·팝업·메뉴·호버·sticky·스크롤 모션 리소스 · Desktop/Mobile 반응형 · 내부 페이지·링크 구조

## 수집으로 인정하지 않음

캡처만 · 색면 placeholder · 임의 폰트 · **새 CSS 재작성** · structure mock · reconstruction을 original로 위장

## `00-source/` 필수

| 파일 | 내용 |
|------|------|
| `source.md` | URL · 수집일 · 방법 · 접속 정보 |
| `license.md` | 권리·목적 (`license.md` 규칙) |
| `inventory.json` / remote request inventory | 원격 요청·누락 |
| `captures/` | Desktop 1920 · Mobile 390 |

## `01-original/`

권장: skin-zip 전체 또는 browser mirror.  
불변: `original-immutable.md`.  
재수집: `original-revision.md` (덮어쓰기 금지).

## PASS (수집 단계)

- 진입 HTML(또는 스킨 index) 존재
- 핵심 CSS/JS/이미지/폰트 로컬 또는 inventory 명시
- completeness: `skin-zip` | `site-archive` | `browser-captured` | `incomplete`
- license 기록 · README 수정금지

수집 PASS ≠ **original QA PASS**.  
다음: skin-zip → `original-integrity-qa.md` · browser-captured → `browser-capture-qa.md`.

## 시작 명령 (참고)

```bash
# URL 데모 / 사이트 (browser-captured)
cd _reference-harness
node scripts/mirror-original.js {slug} {url}
node scripts/preview-original.js {slug}

# 정식 ZIP (skin-zip) — 수신 후
# 1) cases/{slug}/00-source/license.md 기록
# 2) ZIP을 01-original/rev-001/ (또는 승인된 평면 경로)에 풀기 — 내용 수정 금지
# 3) checksum · file inventory 생성
# 4) 02-original-qa (ZIP ↔ local)
```
