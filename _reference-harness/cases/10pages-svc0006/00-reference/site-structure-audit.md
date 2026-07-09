# Site Structure Audit Report — 10pages-svc0006 (SAMPLE MARKETING)

**원본:** https://a246476f9.10pages.co.kr/ · **SVC0006** · **35 URLs → 13 HTML**

---

## 1. File Map

| 유형 | 목록 |
|------|------|
| HTML (13) | `index.html`, `page/{company01,business01}.html`, `board/{list,view}.html`, `form/{write,nologin_form_auth}.html`, `member/*` (5) |
| CSS | `public/custom.css` (~6.4k), `global.css`, bootstrap, AOS, Swiper, FA, Material |
| JS | jQuery, Swiper, AOS, `global.js`, inline `TP_FN_*`, CKEditor, Slick/FullCalendar [데드] |
| 이미지 | `public/img/{main,sub,slide}/` |
| 미수집 | upload thumbs, `jquery-ui.extend.js` |

**페이지 역할:** 메인 · 회사/업무 정적 · portfolio01/insight01 보드 · contact01 폼

---

## 2. Page Structure

```
body#site
├── nav.navbar (회사소개·업무·포트폴리오·인사이트·문의하기)
├── [platform widgets] #mainCarouselSwiper, .board_swiper_blog2, .board_box_blog2
├── main#main_wrapper > .mainpage
│   ├── #mainIntro
│   ├── #mainWork
│   ├── #mainInsight
│   └── #mainContact
└── #footer
```

서브: `.subpage[data-page-id]` → `.sub-top` → `.subpage-content` → `section.se01|02|03`

---

## 3. Section Inventory

### 메인

| 섹션 | id | 역할 | 텍스트/콘텐츠 | CTA | 반복 |
|------|-----|------|---------------|-----|------|
| Hero | `#mainCarouselSwiper` | 2슬라이드 | 브랜드 잠재력… | 자세히 보기 | slider |
| Business | `#mainIntro` | 4카드 그리드 | 퍼포먼스/브랜딩/콘텐츠/디지털 | → business01 | card ×4 |
| Work | `#mainWork` | 포트폴리오 마퀴 | Our Work | portfolio list | swiper marquee |
| Insight | `#mainInsight` | 블로그 그리드 | Insights | insight list | board grid |
| Contact | `#mainContact` | 3 CTA 카드 | Contact Us | form/company/portfolio | CTA band |
| Footer | `#footer` | SampleMarketing | 주소·SNS | admin | footer |

### `company01` — 개요 + 비전/핵심가치 3카드 (샘플마케팅 대표 홍길동)  
### `business01` — intro + why 3 + process 4단계 [REVIEW] business02~04 없음  
### `form/write` — contact01 문의 폼 + captcha  
### board — portfolio01 swiper list / insight01 blog2 (저장 파일 충돌)

---

## 4. Component Candidates

- `layout-header` — `nav`, `#gnb_55`~`58`, `.contact-btn`  
- `section-hero` — `#mainCarouselSwiper`  
- `section-service` — `#mainIntro`, `.intro-card-0*`  
- `section-portfolio` — `#mainWork`, `.type_swiper_s1`  
- `section-proof` — [REVIEW] insight as content marketing  
- `section-contact` — `#mainContact`, `#form_contact01`  
- `ui-card` — `.intro-card`, `.contact-card-*`  
- `ui-form-field` — `#item_name`, captcha, agree checkbox

---

## 5. Naming Audit

| KEEP | `#mainIntro`~`Contact`, `.main-con`, `.sub-top`, `.intro-grid` |
| RENAME | 브랜드 4종 불일치 (SAMPLE MARKETING / SampleMarketing / 샘플마케팅 / SVC0006) |
| REMOVE | `TP_FN_*` duplicate per file, dead FullCalendar/Slick |
| REVIEW | `gnb_*`, `bd_id=portfolio01|insight01`, platform widgets pre+post JS move |

---

## 6. Asset Audit

| HIGH | SAMPLE MARKETING, mailplug copyright, 10page@mailplug.co.kr, 샘플마케팅/홍길동 |
| MEDIUM | board thumbs, brand naming inconsistency, Maps [contact 없음 on main] |
| LOW | Pretendard, main-business0N.png naming convention |

---

## 7. CSS Audit

`:root` tokens (`--page-point-color: #f1771f`) → navbar → hero → main 4 sections → subpages → board → form  
**평가:** 섹션별 monolith + platform board skins + AOS + **중복 로드**

---

## 8. JS Audit

| 기능 | 함수 | selector | 원본 | 재작성 |
|------|------|----------|------|--------|
| Widget 이동 | `TP_FN_mainWorkSwiper`, `mainInsightBoard` | `.board_swiper_blog2`, `#mainWork` | 10PAGE | HIGH |
| Hero | inline Swiper | `#mainCarouselSwiper` | — | MEDIUM |
| AOS | `TP_FN_initAOS` | `[data-aos]` | — | LOW |
| Navbar | `TP_FN_navbarState` | `.tp-main-page` toggle | TP | MEDIUM |
| Form | `TP_FN_contactFormLayout` + submit | `#form_contact01` | mailplug | HIGH |
| Board layout | `TP_FN_pageBoardLayout` | `#bbsArea` | 10PAGE | HIGH |

---

## 9. Original Trace Risk

| HIGH | 10PAGE/Mailplug, SAMPLE MARKETING branding, form/board AJAX, board file collision |
| MEDIUM | 4 intro cards → 1 business page only, thumbs missing |
| LOW | Swiper/AOS common patterns |

---

## 10. Refactor Priority

1. **P0** — `TP_FN_*` 13파일 중복 → 단일 JS  
2. **P0** — board list/view `bd_id`별 스냅샷  
3. **P1** — platform widget 이중 DOM 정리  
4. **P1** — 브랜드 문자열 통일  
5. **P2** — `custom.css` split · 데드 deps 제거

---

## 11. Do Not Modify Yet

- `01-original` immutable  
- JS relocation 순서 — 분석만  
- working-copy 미착수
