# Browser Capture QA

> Track C · `browser-captured` 데모. Track A ZIP 스킨에 **강제하지 않음.**  
> 복제·미러 기준: **`site-clone-fidelity.md`**.

## 검사 (전부 필수 — “캡처만” 생략 금지)

### A. 수집 완전성

- [ ] `01-original/index.html` = **pristine** entry (rendered-only 금지)
- [ ] `_mirror/` · `url-map.json` · `pages.json` · `manifest-original.json`
- [ ] pageCount ≥ 메인 링크 IA 커버 (카테고리·상품·보드·이벤트·바스켓·about 등)
- [ ] completeness = `browser-captured` (또는 `site-archive`) · `incomplete`면 FAIL/PARTIAL 명시
- [ ] 의도적 제외 URL(주문서·결제 등) inventory 기록

### B. 시각

- [ ] 원격 vs 로컬 fold **1920** / **390**
- [ ] full-page 캡처 또는 동등 증거
- [ ] CSS · JS · 이미지 · 폰트 (깨짐·누락 없음)
- [ ] 주요 CSS 응답 **`Content-Type: text/css`** (optimizer 해시 파일 포함)
- [ ] HTML에 `/ind-script/optimizer.php?…` **미치환 절대경로 잔존 없음** (또는 preview url-map으로 200)
- [ ] 배너/퀵카테고리 **개수 = 원격** (예: 8=8). 과다(이중 init)면 FAIL → pristine 재미러
- [ ] `styleSheets` readable (검수용)

### C. 페이지 이동

- [ ] `preview-original.js` **재기동된** 서버에서 검수 (`file://` 금지 · EADDRINUSE 시 PID kill)
- [ ] HTTP 200: `/` · 대표 category · product · board/event · about · basket
- [ ] 실제 **클릭**으로 이동 (mpopup/sample-sg는 preview inject로만 제거)
- [ ] 미수집 링크 → live proxy로 열리거나 remaining에 기록

### D. 인터랙션

- [ ] 히어로/슬라이더 **init** + 다음 장 동작 (`/exec` live proxy)
- [ ] 메뉴·탭·주요 호버/sticky (해당 스킨)
- [ ] console/network 치명 오류 없음 (트래커·YouTube 외부는 기록만 가능)

### E. 메타

- [ ] missing assets · external CDN inventory
- [ ] Track C 한계(프록시·ZIP 아님) `source.md` / report에 명시

## PASS / PARTIAL / FAIL

| 결과 | 조건 |
|------|------|
| **PASS** | A~D 충족 · 시각·이동·인터랙션이 원격과 실사용 동일 |
| **PARTIAL** | 잔여 큐·일부 CDN·프록시 의존 — **목록 공개** + 사용자 승인 후 분석만 |
| **FAIL** | 캡처만 · 메인만 · 스타일/이동/슬라이더 깨짐 · pristine 위반 · 배너 개수 불일치 · CSS MIME/optimizer 충돌 |

완전 재현 불가면 **partial** + 사용자 승인 후 분석만 진행.  
working skin·납품 승격 **금지** (`cafe24-original.md` B · `83`).
