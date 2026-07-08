# Site Clone Fidelity (browser-captured)

> 데모·공개 URL을 **오차 없이 그대로 복제**할 때의 SoT.  
> `source-collection.md` · `browser-capture-qa.md` · `83-reference-harness.mdc`와 함께 쓴다.  
> Track C: 납품 working / ZIP 승격 금지. **목표 = 로컬 미리보기에서 원격과 동일하게 보고·이동·인터랙션.**

## 한 번에 하는 일 (중단 금지)

케이스 킥오프 시 **아래를 한 연속 작업으로** 끝낸다.  
중간에 “캡처만 PASS → 나중에 미러”로 **끊지 않는다.**

```
URL·라이선스 기록
→ Desktop 1920 / Mobile 390 캡처
→ 멀티페이지 pristine 미러 (사이트 전체 BFS)
→ url-map · pages.json · inventory
→ preview 서버 기동
→ fidelity QA (화면·이동·인터랙션)
→ source.md / 02-original-qa / change·qa 로그
```

**금지 (과거 실패 패턴):**

| 금지 | 이유 |
|------|------|
| 캡처 PNG만 하고 `01-original` 미완성 보고 | 수집으로 **인정하지 않음** |
| 메인 HTML만 미러 후 “완료” | 페이지 이동 불가 = 복제 실패 |
| JS 실행 후 DOM을 entry로 저장 | 배너/카테고리 **이중 복제** (예: 퀵아이콘 22 ≠ 원격 8) |
| `optimizer.php?…` 여러 묶음을 **같은 파일명**으로 저장 | CSS/JS 서로 덮어씀 → 스타일 붕괴 |
| 해시 저장 후 확장자를 `.php`로 남김 | 브라우저가 CSS로 인식 안 함 (MIME) |
| HTML에 `/ind-script/optimizer.php?…` **절대경로 방치** | 로컬이 원본 서버/잘못된 단일 파일만 요청 |
| `file://`로 HTML만 열어 검수 | 인터랙션·경로 깨짐 |
| `01-original`을 고쳐 샘플가이드·팝업 삭제 | immutable 위반 — **preview inject만** 허용 |
| 예전 preview 프로세스 방치 후 코드 수정 | EADDRINUSE · **구버전 서버**가 새 규칙 무시 |
| QA 없이 “비슷함”으로 PASS | 원격 대비 오차 미검증 |

## 복제 목표 (완전 동일에 가깝게)

| 축 | 필수 |
|----|------|
| **시각** | 원격과 동일 레이아웃·타이포·이미지·색 (1920 / 390) |
| **페이지 이동** | GNB·카테고리·상품·게시판·이벤트·장바구니·about 등 **클릭으로 이동** |
| **인터랙션** | 슬라이더·배너·탭·메뉴·호버·sticky·스크롤 모션 — 원격과 동일 동작 |
| **자산** | CSS/JS/이미지/폰트/배경/라이브러리 로컬 또는 url-map + live proxy |

### Track C 한계 (숨기지 말 것)

- 미구매 데모 = **skin-zip 전체와 100% 동일 오프라인**은 불가할 수 있음  
- **허용 보완:** preview의 **live proxy** (`/exec`, `/api`, 미수집 HTML)로 인터랙션·잔여 페이지 유지  
- 한계는 `source.md` · QA에 **명시**. “ZIP 없이 완전 오프라인 동일”이라고 **거짓말 금지**

주문서·결제·로그아웃 등 게이트/개인화 URL은 **의도적 제외 가능** — 제외 목록을 inventory에 기록.

## `01-original` 필수 산출

| 산출 | 설명 |
|------|------|
| `index.html` | **pristine** (배너 JS·클론 전 document) + rewrite |
| `_mirror/**` | 페이지 HTML + CSS/JS/이미지/폰트 |
| `url-map.json` | 원격 URL ↔ 로컬 경로 (query-hash 포함) |
| `pages.json` | 수집 페이지 목록 · `remaining` 큐 |
| `manifest-original.json` | method · liveOrigin · pageCount · completeness |
| `index.rendered.html` | 검수용 post-render (entry로 쓰지 않음) |

completeness: `browser-captured` (또는 더 넓으면 `site-archive`).  
`incomplete`면 수집 **미완료** — 사용자에게 잔여·다음 maxPages 보고.

## 미러 기술 규칙 (필수)

1. **멀티페이지 BFS** — 같은 origin 내부 링크 전부 큐. 기본 max는 **사이트 커버될 때까지** (한 번에; 임의로 메인만 끊지 않음).  
2. **pristine HTML** — document 응답 본문(또는 동등)을 entry로 사용. `page.content()`는 pristine 실패 시에만 + WARN.  
3. **query-hash + 올바른 확장자** — `optimizer.php` / `i18n.php` / `.php?…` / 동일 path 다른 query → 파일 충돌 금지. 저장명 예: `optimizer.{sha}.css` · `optimizer.{sha}.js` (**`.php`로 남기지 않음**).  
4. **HTML rewrite** — stylesheet/script의 `/ind-script/optimizer.php?…` 절대경로를 **url-map 로컬 경로**로 치환. 문서 네비는 Cafe24 **사이트 경로** 유지 (`/category/…`).  
5. **자산 href/src** — `_mirror/…` 로컬 경로로 rewrite.  
6. **Windows-safe path** — 제어문자·`<>:"|?*` 제거. 깨진 slug 상품은 `product/_p{id}/` + url-map. 쓰기 실패 시 silent skip 금지(WARN·fallback).  
7. **상품 display 변형** — `/category/N/display/M` 중복은 canonical product URL로 dedupe.  
8. **HTML+query 파일명** — `list.html?board_no=` · `search.html?keyword=` 유니코드는 **해시 파일명** (`list.q{sha}.html`) + url-map (ASCII만 남기면 keyword 충돌).  
9. **잡 링크 스킵** — `링크 연결 주소`, write 폼, logout, orderform/payment, login `returnUrl` 전용 중복(정책상).  
10. **재수집** — 덮어쓰기 금지 원칙은 `original-revision.md` (rev 폴더).

## 미리보기 (검수·인터랙션 SoT)

**고정 로컬 URL (포트 바꾸지 않음):**

```text
http://127.0.0.1:4173/
```

```bash
cd _reference-harness
node scripts/mirror-original.js {slug} {demoUrl} [maxPages]
node scripts/preview-original.js {slug}            # → 항상 :4173
node scripts/preview-original.js {slug} --force    # 이미 켜져 있으면 재기동
```

케이스 폴더에 `01-original/PREVIEW.url` / `PREVIEW.url.txt`가 생김 — 브라우저에서 그 주소만 북마크.

### preview 필수 동작

| 규칙 | 내용 |
|------|------|
| **고정 포트 4173** | 4176·4180 등으로 **올리지 않음**. EADDRINUSE면 안내 URL 유지 또는 `--force` |
| **url-map 우선** | query·해시 CSS/JS·페이지를 로컬에서 해석 |
| **MIME** | `.css` → `text/css` · `.js` → JS. 경로에 `optimizer`+`.css`면 PHP여도 CSS로 서비스 |
| **live proxy** | `/exec` · `/api` · 미수집 HTML · `/ind-script` 잔여 · `/web` 등 |
| **숨김 inject** | `.sample-sg` · `.mpopup` — **응답에만** 주입. original 파일 수정 금지 |
| **프로세스** | 스크립트 수정 후 `--force` 재기동 |
| **검수 조건** | preview **상시 기동** 상태에서만 인터랙션 QA (`file://` 금지) |

## 후속 이슈 → 재발 방지 (ptmd869920에서 보완한 것)

| 증상 | 원인 | 지침 대응 |
|------|------|-----------|
| 레이아웃·폰트 붕괴 | optimizer query 충돌 + 절대경로 + `.php` MIME | query-hash·확장자·rewrite·preview MIME |
| 퀵카테고리/배너 과다 | post-JS DOM 재저장 → 배너 manager 재클론 | pristine only · QA에서 개수=원격 |
| 슬라이더만 죽음 | `/exec` 로컬 없음 · preview 미기동 | live proxy · preview 필수 |
| 샘플가이드·팝업이 가림 | 데모 오버레이 | preview inject (원본 삭제 금지) |
| 클릭 이동 실패 | `_mirror` href·url-map 미연결 · 구 preview | 사이트 경로 + url-map · 재기동 |
| Windows mkdir ENOENT | URL 제어문자·예약 문자 | safeSeg · `_p{id}` fallback |
| 검색/보드 HTML 서로 덮임 | query를 ASCII만 파일명에 넣음 | HTML query → sha 파일명 |
| 포트 혼선 · URL이 매번 바뀜 | 4176/4180 등으로 피해 감 | **고정 4173** · `--force` · 북마크 `PREVIEW.url` |

## fidelity QA 최소 수치 (메인)

미러 직후 preview에서 원격과 **나란히** 확인:

- [ ] `styleSheets` readable · 주요 CSS HTTP **200 + text/css**
- [ ] 퀵카테고리/cate-banner **개수 = 원격** (이중이면 FAIL → pristine 재미러)
- [ ] 히어로 Swiper(또는 동등) **init true** · 다음 슬라이드 동작(`/exec` 포함)
- [ ] 대표 경로 클릭 이동 HTTP 200 (category · product · basket · about · board)
- [ ] 샘플가이드·mpopup이 클릭을 가로막지 않음 (preview)

상세 체크리스트: `browser-capture-qa.md`.

## 에이전트 행동

| 상황 | 행동 |
|------|------|
| “사이트 복제 / 그대로 가져와 / 로컬에서 이동” | 위 **한 번에** 파이프라인 전부 |
| 캡처만 끝난 상태 | **미완료** — 즉시 멀티페이지 미러 계속 |
| 스타일·아이콘 이중·깨짐 | pristine 재미러 + query-hash (original 땜질 금지) |
| 이동 안 됨 | pages/url-map/preview 라우팅 점검 후 잔여 BFS · **서버 재기동** |
| 슬라이드만 안 됨 | preview 기동·live proxy `/exec` 확인 |
| 포트 충돌 | PID 종료 후 동일 포트 또는 새 포트 · 안내 URL 갱신 |

사용자에게: **개발 장문 금지**. URL·뭐가 같아졌는지·남은 URL 수·한계(프록시)만 짧게.
