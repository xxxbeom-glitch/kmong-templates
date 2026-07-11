# Site Structure Audit Report — wonkangmetal

**원본:** http://www.wonkangmetal.co.kr/ · **케이스:** `wonkangmetal` · **수집:** 220p browser-captured  
**플랫폼 판정:** GNU Board 5 + 커스텀 테마 `wonkang` (10PAGE/Mailplug 아님)

---

## 1. File Map

| 유형 | 경로·개수 | 비고 |
|------|-----------|------|
| HTML | `01-original/_mirror/www.wonkangmetal.co.kr/` ~290 + `index.html` | KO/EN/JP · `bbs/board.{hash}.html` · `page/*.php` |
| CSS | `css/s_main.css`, `s_sub.css`, `b_board.css` · `theme/wonkang/css/mobile.css` · `mobile/skin/board/*/style.css` | 보드별 스킨 × 다국어 |
| JS | `js/s_script.js` (+ `_en`, `_jp`), `common.js`, `wrest.js`, `jquery.menu.js` | Gnuboard + 커스텀 인터랙션 |
| 이미지 | `img/`, `data/file/{news,product_*}/` | 메인·프로세스·CI·게시판 썸네일 |
| 폰트 | Pretendard, Raleway (CDN mirror) | |
| 영상 | `/video/vision_mv_*.mp4` | **미미러** — 로컬 없음 |
| 외부 | `wks2025.mycafe24.com` 에디터 이미지, 뉴스 링크 도메인 | Cafe24 호스팅 흔적 |

**페이지 역할:** `/` 메인 · `page/page0xxx.php` 정적 서브 · `bbs/board.php?bo_table=*` 게시판 · `bbs/write.php` 문의 · `index_en/jp.php` 다국어

---

## 2. Page Structure

| 페이지 | 역할 | Shell |
|--------|------|-------|
| `index.html` | 메인 랜딩 | `header.s_header` → 섹션들 → `footer#si_footer` |
| `page/page0103.php` 등 | COMPANY/FACTORY/CUSTOMER 정적 | `sub_visual` + `sub_nav` + 본문 |
| `bbs/board.*.html` | 연혁·뉴스·제품·파트너 등 | 동일 sub shell + `#bo_list` / `#bo_v` |
| `bbs/write.*.html` | 견적문의 폼 | `#bo_w` + `#fwrite` |

---

## 3. Section Inventory

### 메인 (`index.html`) — 위→아래

| 섹션 | class/id | 역할 | 주요 텍스트 | 이미지 | CTA | 반복 |
|------|----------|------|-------------|--------|-----|------|
| Header | `.s_header`, `#s_gnb` | 4대 메뉴 KO/EN/JP | COMPANY~CUSTOMER | logo | CONTACT | site-header |
| Hero | `.main_visual`, Swiper | 3슬라이드 풀스크린 | Life to Metal… | CSS bg | PREV/NEXT | hero-swiper |
| Business | `#biz.main_business` | 기술 소개 pin | MAGMASOFT… | process PNG + video | scroll | business-showcase |
| Company | `.main_company` | 수치 3개 | 1988/1000t/40% | — | history 링크 | stats-band |
| Solution | `.main_solution` | 제품 4분할 | Casting solution | parts_01~04 | VIEW MORE | product-grid |
| Vision | `.main_vision` / `_m` | 4가치 카드 | Trust with high quality | quality_bg | page0203 | vision-cards |
| Network | `.main_customer` | 글로벌 맵 | GLOBAL NETWORK | map img | partner board | — |
| News | `.main_gallery` | 뉴스 슬라이더 | wonkang news | thumb PNG | nav | news-slider |
| Contact | `.main_contact` | 문의 CTA | contact us | — | inquiry write | contact-cta |
| Footer | `#si_footer` | 주소·연락처 | 원강금속(주) | logo | privacy | site-footer |

서브·보드: `sub_visual` + `sub_nav` + 콘텐츠 블록 (CI, 공정 탭, 타임라인, 제품 그리드 등)

---

## 4. Component Candidates

| 후보 ID | DOM 근거 |
|---------|----------|
| layout-header | `.s_header`, `#s_gnb`, `.menu_sidebar` |
| layout-footer | `#si_footer` |
| section-hero | `.main_visual` + Swiper |
| section-service | `.main_business`, `.main_solution` |
| section-proof | `.stats_list`, `.vision_item` |
| section-contact | `.main_contact`, `#bo_w` |
| ui-button | `.view_more_02`, `.contact_button` |
| ui-card | `.parts_list .part_*`, `.vision_item` |
| ui-slider | `.board_slider`, `.business_slider` |
| ui-form-field | `#fwrite` inquiry fields |

---

## 5. Naming Audit

| 분류 | 예시 |
|------|------|
| **KEEP** | `main_visual`, `main_section`, `sub_visual`, `sub_nav`, `si_inner`, `parts_list`, `stats_list` |
| **RENAME** | `busness_*`→`business_*`, `sub_seciton`→`sub_section`, `conmtact_title`→`contact_title` |
| **REMOVE** | `g5_*` globals, `#hd_pop`(empty), `gnb_1dli`/`jquery.menu.js`(미사용), `sound_only` |
| **REVIEW** | `bo_*`, `#bo_list`, `page0103` 번호형 slug, `s_`/`si_`/`k_` prefix 혼용 |

---

## 6. Asset Audit

| 항목 | 내용 | 위험 |
|------|------|------|
| 원본 회사명 | 원강금속(주), WONKANGMETAL | HIGH (브랜드) |
| 연락처 | 홍성 본사·인천 영업소, jmlee@wonkangmetal.com | HIGH |
| 이미지 | `img/`, NNEditor 업로드, Cafe24 `wks2025.mycafe24.com` | MEDIUM |
| 폰트 | Pretendard, Raleway CDN mirror | LOW |
| favicon/meta | 원본 title·description | MEDIUM |
| 영상 | `/video/*.mp4` 미수집 | HIGH (오프라인 깨짐) |

---

## 7. CSS Audit

**구조:** (1) Gnuboard `theme/wonkang/mobile.css` → (2) 사이트 `s_main`/`s_sub` → (3) `b_board` + 보드 스킨 CSS  
**평가:** 섹션별 스타일 중심 + 원본 템플릿 잔재(Gnuboard) + 다국어 스킨 중복 + **중복·3벌 분기**

---

## 8. JS Audit

| 기능 | 파일 | 함수/셀렉터 | 원본 흔적 | 재작성 |
|------|------|-------------|-----------|--------|
| 메뉴 | `s_script.js` | `initMobileGnb`, `initHamburger`, `#s_gnb` | wonkang 커스텀 | MEDIUM |
| 히어로 슬라이더 | `s_script.js` | `initMainVisual`, `.main_visual` | Swiper+Splitting | MEDIUM |
| 스크롤 pin | `s_script.js` | `initBusiness`, Lenis+GSAP | — | HIGH 복잡도 |
| 뉴스 슬라이더 | `s_script.js` | `initBoard`, `.board_slider` | — | MEDIUM |
| 공정 탭 | `s_script.js` | `initProc`, `.proc_tabs` | page0201 | MEDIUM |
| 폼 | `wrest.js`, `common.js` | `#fwrite`, `fwrite_submit` | **Gnuboard** | HIGH |
| Dead | `jquery.menu.js` | `gnb_1dli` | Gnuboard 기본 | REMOVE |

---

## 9. Original Trace Risk

| 등급 | 항목 |
|------|------|
| **HIGH** | `g5_*`, `bo_table`, `bbs/write_update.php`, 로그인 게이트 제품 상세, Cafe24 에디터 URL, 미수집 video |
| **MEDIUM** | KO/EN/JP 3벌 duplication, `theme/wonkang`, 해시형 `board.*.html`, 애니메이션 스택 |
| **LOW** | Swiper/AOS CDN mirror, 정적 `page/*.php` 구조 |

---

## 10. Refactor Priority

1. **P0** — Shell(header/footer/sub_visual) 분리 · 메인 `s_script.js` 인터랙션 문서화  
2. **P1** — `g5_*`/`bo_*` 제거 또는 정적 데이터 치환 계획  
3. **P1** — video·Cafe24 이미지 proxy/재수집  
4. **P2** — 다국어 스킨 CSS 통합 · 네이밍 오타 수정  
5. **P3** — 잔여 큐 160 URL 재미러 (선택)

---

## 11. Do Not Modify Yet

- `01-original/**` · `_mirror/**` — immutable  
- Gnuboard 폼 POST·로그인 흐름 — 분석만, 동작 변경 금지  
- `s_main.css` / `s_script.js` — 리팩터 전 사용자 승인  
- working-copy(`04-working-copy`) 미생성 — 본 감사는 원본 미러 기준
