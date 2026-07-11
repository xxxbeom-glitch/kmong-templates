# Site Structure Audit Report — 10pages-svc0002 (SAMPLE TAX)

**원본:** https://a2462129b.10pages.co.kr/ · **SVC0002** · **4 pages** · queue 0

---

## 1. File Map

| 유형 | 목록 |
|------|------|
| HTML (4) | `index.html`, `member/privacy.html`, `login.html`, `find.html` |
| CSS | `public/custom.css` (~6k lines), `bootstrap`, `jquery-ui`, `swiper`, `pretendard`, FA4+6, Material Symbols |
| JS | jQuery 3.4.1, `fullpage.min.js`, Swiper 11, `bootstrap`, `global.js`, inline `TP_FN_*`, CKEditor/Slick/FullCalendar(**데드 로드**) |
| 이미지 | `public/img/slide/slide0001-2.png`, `main/m-intro01.png`, `m-contact-bg.png`, `logo/logo_10page.svg` |
| 폰트 | Pretendard Variable, Material Symbols woff2 |
| 미수집 | `jquery-ui.extend.js`, OG/favicon, arrow SVG (`custom.css` vars) |

**페이지 역할:** `/` 원페이지 랜딩 · member = 플랫폼 관리/약관

---

## 2. Page Structure

```
body#site
├── nav.navbar (GNB: #about #service #contact)
├── main#main_wrapper
│   └── #fullpage (fullPage.js)
│       ├── .main-visual ← #mainCarouselSwiper (JS 이동)
│       ├── #about.main-intro
│       ├── #service.main-innovation
│       ├── #contact.main-contact ← #frm_wrapper_contact01 (JS 이동)
│       └── .main-footer ← footer#footer (JS 이동)
└── #scrollTop
```

---

## 3. Section Inventory

| 순서 | 섹션 | class/id | 역할 | 텍스트 | 이미지/아이콘 | CTA | 반복 |
|------|------|----------|------|--------|---------------|-----|------|
| 0 | Hero | `#mainCarouselSwiper` | 2슬라이드 | 세무 솔루션… | slide PNG | — | ui-slider |
| 1 | About | `#about.main-intro` | 소개 | 기업의 내일을… | m-intro01 | Contact us | — |
| 2 | Service | `#service.main-innovation` | 4서비스 | 기장/절세/법인/조사 | Material icons | Contact us | ui-card ×4 |
| 3 | Contact | `#contact.main-contact` | 문의 | Address/Tel/Email | bg img | form submit | ui-form-field |
| 4 | Footer | `#footer` | 저작권 | SAMPLE TAX, 10PAGE | logo_10page | admin login | layout-footer |

---

## 4. Component Candidates

- `layout-header` — `nav.navbar`, `#gnb_56/55/1`
- `section-hero` — `#mainCarouselSwiper`
- `section-service` — `.tax-service-grid > li`
- `section-contact` — `.m-contact-wrap` + `#form_contact01`
- `ui-button` — `.btn.btn-primary`, `#write_btn`
- `ui-form-field` — `.wr_form_item`, captcha `#captcha`

---

## 5. Naming Audit

| 분류 | 예시 |
|------|------|
| **KEEP** | `#fullpage`, `.main-visual`, `.tax-service-grid`, `.m-about-wrap`, `#mainCarouselSwiper` |
| **RENAME** | `main-innovation`+`#service` 불일치 · `.board_wrapper`→contact-form 의미 |
| **REMOVE** | `TP`, `TP_FN_*`, `gnb_56` 등 CMS ID, `data-aos`(AOS 미로드), Slick/FullCalendar/CKEditor on main |
| **REVIEW** | `main-intro` vs `#about` anchor 쌍 |

---

## 6. Asset Audit

| 항목 | 값 | 위험 |
|------|-----|------|
| 브랜드 | SAMPLE TAX, 10PAGE, SVC0002 | HIGH |
| 연락처 | 10page@mailplug.co.kr, 테헤란로78길, 1544-9140 vs 1522-1040 불일치 | HIGH |
| OG/favicon | `/public/img/og/`, favicon — 미미러 | MEDIUM |
| fullPage license | HTML 내 licenseKey | LOW |
| captcha | `captcha/get_captcha.jpg` 스냅샷 | MEDIUM |

---

## 7. CSS Audit

**단일 monolith** `public/custom.css`: `:root` 토큰 → navbar → fullPage → hero → about → service → contact → forms  
**평가:** 섹션별 + **플랫폼 폼 스킨 잔재** + 데드 arrow URL + FA4/6 중복

---

## 8. JS Audit

| 기능 | 파일 | selector/함수 | 원본 흔적 | 재작성 |
|------|------|---------------|-----------|--------|
| fullPage | inline `TP_FN_mainpageScript` | `#fullpage`, anchors | 10PAGE + licenseKey | HIGH |
| DOM 이동 | inline | carousel→visual, form→contact, footer | TP | HIGH |
| Hero Swiper | inline | `#mainCarouselSwiper .swiper` | — | MEDIUM |
| Nav scroll | `TP_FN_navScrollFadeLogoTypes` | `.navbar` | TP | MEDIUM |
| Form submit | inline | `#write_btn`, `/form/submit` | mailplug_token | HIGH |
| GNB mobile | `global.js` | `.navbar-collapse` | 10PAGE | MEDIUM |
| passport | `global.js` | `GET /passport` | Mailplug | HIGH |

---

## 9. Original Trace Risk

| HIGH | 10PAGE generator, mailplug_token, SAMPLE TAX, 10page@mailplug.co.kr, logo_10page, JSON-LD 10page.co.kr |
| MEDIUM | 연락처 불일치, admin login routes, CSRF snapshot |
| LOW | Bootstrap/Swiper 일반 패턴 |

---

## 10. Refactor Priority

1. **P0** — fullPage + DOM relocation 순서 보존  
2. **P0** — `custom.css` 섹션 4블록 추출  
3. **P1** — 데드 스크립트 제거 (Slick, FullCalendar, CKEditor on main)  
4. **P2** — 브랜드·연락처 스크럽 · form static mock  
5. **P3** — member 페이지 스코프 제외

---

## 11. Do Not Modify Yet

- `01-original` immutable  
- `TP_FN_*` / fullPage init — working-copy 승인 전 변경 금지  
- live `/form/submit`, `/passport` — proxy 의존 유지
