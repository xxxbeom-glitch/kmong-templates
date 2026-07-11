# Site Structure Audit Report — 10pages-svc0005 (SAMPLE HR)

**원본:** https://a246475ef.10pages.co.kr/ · **SVC0005** · **38 URLs → 11 HTML 템플릿**

---

## 1. File Map

| 유형 | 목록 |
|------|------|
| HTML (11) | `index.html`, `page/{about01,business01,contact01}.html`, `board/{list,view}.html`, `member/*` (5) |
| CSS | `public/custom.css`, `global.css`, `bootstrap`, FA4+6, Material Symbols, Swiper, animate.css [미사용] |
| JS | jQuery, Swiper 11, `global.js`, inline `TP_FN_*`, CKEditor, Slick/FullCalendar [데드] |
| 이미지 | `public/img/{slide,main,sub}/` 19 files |
| 미수집 | `/public/upload/thumbs/*.webp`, `jquery-ui.extend.js` |

**페이지 역할:** 메인 · Introduction/Business/Contact 정적 · Works/Insight 게시판 · 회원(플랫폼)

---

## 2. Page Structure

**메인:** `#mainCarouselSwiper` → `#main01`~`#main05` → `#footer`  
**서브:** `.subpage` → `.sub-visual` + breadcrumb → sections → footer  
**보드:** `.subpage.board-page` → `#bbsArea` → `.board_wrapper`  
**주의:** `board/list.html`, `board/view.html` — **단일 파일 충돌** (마지막 크롤 상태만 저장)

---

## 3. Section Inventory

### 메인

| # | id | class | 역할 | CTA | 반복 |
|---|-----|-------|------|-----|------|
| — | — | `#mainCarouselSwiper` | Hero 2슬라이드 | View More | hero |
| 1 | `#main01` | `.main-con.message` | pin 메시지 + 이미지 | — | — |
| 2 | `#main02` | `.main-con` | 3가치 카드 pin | — | ui-card ×3 |
| 3 | `#main03` | `.main-con` | Business 4카드 | more-btn | ui-card ×4 |
| 4 | `#main04` | `.main-con` | Works 티저 | → works01 | board teaser |
| 5 | `#main05` | `.main-con` | Insight + CTA band | → insight01 | board + CTA |
| — | `#footer` | footer | 연락처·admin | login | footer |

### 서브 `about01` — intro / overview(stats) / values  
### 서브 `business01` — head / hero / 8 services / FAQ accordion / CTA  
### 서브 `contact01` — head / contact-list / Google Maps iframe  
### 보드 — category tabs, blog2 grid or list rows, search, modals

---

## 4. Component Candidates

- `layout-header` / `layout-footer` — global  
- `section-hero` — `#mainCarouselSwiper`  
- `section-proof` — `#main02` value-list  
- `section-service` — `#main03` card-list, `business01-services`  
- `section-contact` — `business01-cta`, `contact01`  
- `ui-card` — `.card-item`, `.value-item`  
- `ui-slider` — hero Swiper  
- `ui-modal` — `#secret_modal`, `#delete_modal`  
- board-list / board-view — platform wrappers

---

## 5. Naming Audit

| KEEP | `#main01`~`05`, `.main-con`, `.sub-visual`, `.business01-cta`, `.more-btn` |
| RENAME | `gnb_55`~`59` CMS ID · [REVIEW] `about01-intro` 패턴 |
| REMOVE | dead `#mainCarousel` script hook, FullCalendar/Slick on index |
| REVIEW | `board_box_*` + designed slot 이중 DOM, `TP_FN_*` |

---

## 6. Asset Audit

| HIGH | SAMPLE HR 텍스트, mailplug copyright, 10page@mailplug.co.kr, Mailplug FAQ 본문 |
| MEDIUM | board thumbs 미미러, Maps API key in iframe, placeholder meta `{사이트명}` |
| LOW | Pretendard/FA mirrors |

---

## 7. CSS Audit

Load: bootstrap → jquery-ui → fonts → animate → global → **custom.css** (SoT) → Swiper  
**평가:** 섹션별 + 플랫폼 board 스킨 + **6k monolith** + unused animate/flag-icon

---

## 8. JS Audit

| 기능 | 함수/파일 | selector | 원본 | 재작성 |
|------|-----------|----------|------|--------|
| Pin scroll | `TP_FN_main01MessageMotion`, `main02PinScroll` | `#main01`, `#main02` | 10PAGE | HIGH |
| Board move | `TP_FN_boardMove` | `[data-board]`, `#bbsArea` | 10PAGE | HIGH |
| Hero | inline Swiper | `#mainCarouselSwiper` | — | MEDIUM |
| Navbar | `TP_FN_navbarScrollState` | `.navbar` | TP | MEDIUM |
| FAQ | inline | `#business01Faq` | — | LOW |
| Login | AJAX | `/member/login_check` | Mailplug | HIGH |

---

## 9. Original Trace Risk

| HIGH | 10PAGE Builder, mailplug, SAMPLE HR, board backend, thumb uploads |
| MEDIUM | single-file board collision, pin motion QA, sample FAQ copy |
| LOW | Bootstrap grid patterns |

---

## 10. Refactor Priority

1. **P0** — board list/view per `bd_id` 스냅샷 분리  
2. **P0** — `TP_FN_*` 단일 theme JS 추출  
3. **P1** — upload thumbs 재수집  
4. **P1** — 브랜드·Mailplug 문구 스크럽  
5. **P2** — `custom.css` 영역별 split

---

## 11. Do Not Modify Yet

- `01-original` immutable  
- board collision 파일 — 분석만, 임의 덮어쓰기 금지  
- pin scroll JS — 동작 검증 전 변경 금지
