# ptmd869920 — Source

| 항목 | 값 |
|------|-----|
| caseId | `ptmd869920` |
| displayName | PURE BLANC (퓨어블랑) |
| designCenterUrl | https://d.cafe24.com/sample?productCode=PTMD869920 |
| demoMallUrl | https://ecudemo391069.cafe24.com/ |
| productCode | PTMD869920 |
| collectedAt | 2026-07-08 |
| viewports | Desktop **1920** · Mobile **390** |
| track | **Track C** reference-harness |
| completeness | **browser-captured** (skin-zip 아님) |
| rightsType | demo-analysis |

## 수집 방법

- Playwright headless · 데모몰 직접 접속
- **멀티페이지 BFS 미러** (`mirror-original.js` v4) — 메인·카테고리·상품·게시판·이벤트·장바구니·마이샵 등
- pristine HTML(배너 JS 전) + `_mirror/` 자산 · `url-map.json` · `pages.json`
- 캡처: `00-source/captures/` (Desktop 1920 · Mobile 390)

## 수집 체크

- [x] 디자인센터 URL + 데모몰 URL 확정
- [x] Desktop 1920 fold/full + outline.json
- [x] Mobile 390 fold/full + outline.json
- [x] inventory.json · license.md
- [x] analysis.md (메인 IA + PLP/PDP/cart/보드 · component/interaction map)
- [x] **멀티페이지 pristine 미러** (~60p · assets 800+) + live proxy
- [x] 로컬 페이지 이동 (카테고리·어바웃·장바구니·게시판·이벤트·검색·상품상세)
- [x] 퀵카테고리 8개 · 히어로 Swiper (메인 fidelity)
- [ ] skin-zip (미보유 — Track A 불가)
- [ ] 남은 큐(~190) 추가 수집 · 주문서/결제 게이트 (의도적 제외)

### 로컬에서 보기 (페이지 이동 + 인터랙션)

**항상 이 주소만 사용:** http://127.0.0.1:4173/

```bash
cd _reference-harness
node scripts/preview-original.js ptmd869920
# 이미 켜져 있는데 갱신이 필요하면:
node scripts/preview-original.js ptmd869920 --force
```

`01-original/PREVIEW.url` 파일을 열어도 같은 주소로 갑니다.  
미리보기 서버가 켜져 있어야 `/exec` 등이 살아 있습니다. `index.html`만 파일로 열면 안 됩니다.

## Track C 경계

- working skin / upload package / 대표 디자인 전환 **하지 않음**
- 데모 코드·이미지·폰트 **납품 금지**
