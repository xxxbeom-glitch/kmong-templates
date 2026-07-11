# Mirror QA + Template Candidate Review

**대상:** onetenth3 · onetenth4 · onetenth6 · onetenth8  
**일자:** 2026-07-09  
**단계:** Mirror QA + Template Candidate Review **만** (섹션 분리·조립·리팩터·WP 테마화 **미진행**)

---

## 공통 전제

| 항목 | 내용 |
|------|------|
| 플랫폼 | WordPress + Elementor + UICore header + Element Pack (Cafe24 `mycafe24.com` 호스팅) |
| 미러 규모 | 케이스별 BFS **80 URL** · 에셋 **247–281** · 잔여 큐 **11–13** (대부분 `wp-json` / oembed / feed) |
| 프리뷰 허브 | `http://127.0.0.1:4173/` |
| 케이스별 포트 | onetenth3 **4204** · onetenth4 **4205** · onetenth6 **4206** · onetenth8 **4207** |
| 원본 미러 경로 | `_reference-harness/cases/onetenth{N}/01-original/` |
| 에셋 미러 | `_reference-harness/cases/onetenth{N}/01-original/_mirror/` |

---

## 1. Mirror QA

### 1.1 요약 표

| 케이스 | 변형 | 로컬 메인 표시 | CSS | JS | 이미지 | 폰트 | PC 1920 | MO 390 | Console |
|--------|------|----------------|-----|-----|--------|------|---------|--------|---------|
| **onetenth3** | Tech 03 | ✅ 200 · h≈4147 | ✅ 미러됨 | ✅ (fullPage·Swiper 인라인) | ⚠️ Logo·favicon 외부 | ⚠️ CORS (아래) | ✅ 캡처 PASS | ✅ 캡처 PASS | ⚠️ 폰트 CORS 8건 |
| **onetenth4** | Business 04 | ✅ 200 · h≈5677 | ✅ 미러됨 | ✅ Swiper·fade | ⚠️ Logo·favicon 외부 | ⚠️ CORS 8건 | ✅ 캡처 PASS | ✅ 캡처 PASS | ⚠️ 폰트 CORS 8건 |
| **onetenth6** | Business 06 | ✅ 200 · h≈8217 | ✅ 미러됨 | ✅ 카운터·Swiper | ⚠️ Logo + 업로드 4건 외부 | ⚠️ CORS 8건 | ✅ 캡처 PASS | ✅ 캡처 PASS | ⚠️ 폰트 CORS 8건 |
| **onetenth8** | Creative 08 | ✅ 200 · h≈6830 | ✅ 미러됨 | ✅ carousel·accordion·video | ⚠️ Logo + service 이미지 1건 | ⚠️ CORS 7건 | ✅ 캡처 PASS | ✅ 캡처 PASS | ⚠️ 폰트 CORS 7건 |

**판정:** 4케이스 모두 **프론트 기준본으로 사용 가능 (조건부 PASS)** — 레이아웃·HTML·대부분 에셋은 로컬 미러에 존재. 다만 **로컬 프리뷰에서 폰트 URL이 라이브 도메인을 가리켜 CORS 차단** → 시스템 폰트 fallback으로 보일 수 있음. 구조·섹션 분해·IA 판단에는 **차단 아님**. 시각 1:1 검수 전 **프리뷰 레이어 URL rewrite** 권장.

### 1.2 케이스별 상세

#### onetenth3 (Tech 03) — `:4204`

| 검사 항목 | 결과 | 비고 |
|-----------|------|------|
| 메인 로컬 preview | ✅ HTTP 200, title 정상 | `bodyHeight` 4147px |
| CSS 누락 | ✅ 없음 (정적 감사 기준) | Elementor·UICore·Element Pack 번들 미러 |
| JS 누락 | ✅ 없음 | **jQuery fullPage** + Swiper 11 인라인·CDN 미러 |
| 이미지 누락 | ⚠️ 소수 외부 | `Logo.svg`, favicon → 라이브 절대 URL 3건 |
| 폰트 누락 | ⚠️ 미러는 있음, 로드 실패 | `Pretendard-*`, `uicore-icons`, `Montserrat` — **파일은 `_mirror`에 존재**하나 CSS가 `https://onetenth3.mycafe24.com/...` 참조 |
| 인터랙션 | ⚠️ 복잡 | **fullPage 섹션 스크롤** · 가치카드 Swiper · GNB sticky·모바일 드로어 · FAQ는 **별도 `/faq/`** |
| PC 1920 | ✅ | `02-original-qa` Desktop 캡처 PASS |
| Mobile 390 | ✅ | Mobile 캡처 PASS (fullPage는 모바일에서 동작 다를 수 있음) |
| Console | ⚠️ | 폰트 CORS 8건 (JS 런타임 에러 없음) |

**잔여 큐 (11):** `wp-json`, oembed, feed, `//t1.daumcdn.net` (지도), percent-encoded nav href (미러 폴더명과 불일치 — 프리뷰 rewrite로 해결 가능)

---

#### onetenth4 (Business 04) — `:4205`

| 검사 항목 | 결과 | 비고 |
|-----------|------|------|
| 메인 로컬 preview | ✅ HTTP 200 | `bodyHeight` 5677px |
| CSS / JS | ✅ | Elementor 표준 스택, fullPage **없음** |
| 이미지 | ⚠️ Logo·favicon 외부 3건 | 갤러리·서비스 이미지는 미러 |
| 폰트 | ⚠️ CORS 8건 | onetenth3와 동일 패턴 |
| 인터랙션 | ✅ 중간 | fadeIn 스크롤 애니 · 서비스 4카드 · 갤러리 그리드 · Contact CTA · 햄버거 GNB |
| PC / MO | ✅ | 캡처 PASS |
| Console | ⚠️ | 폰트 CORS만 |

**특이:** 08과 유사한 **템플릿 판매 랜딩** 톤. 기업형 IA보다 마케팅 카피 비중 큼.

---

#### onetenth6 (Business 06) — `:4206`

| 검사 항목 | 결과 | 비고 |
|-----------|------|------|
| 메인 로컬 preview | ✅ HTTP 200 | `bodyHeight` 8217px (가장 긴 메인) |
| CSS / JS | ✅ | Element Pack 카운터·fade·Swiper |
| 이미지 | ⚠️ 외부 7건 | Logo + `gusalrud*.jpg`, `semiconductors*.jpg` 등 **미러 누락 4건** |
| 폰트 | ⚠️ CORS + Paperlogy | `Paperlogy-9Black.woff` 미러·CORS 동일 |
| 인터랙션 | ✅ 양호 | **숫자 카운터 4종** · Innovation 4카드 · Business 그리드 · News 3건 · CTA band |
| PC / MO | ✅ | 캡처 PASS |
| Console | ⚠️ | 폰트 CORS 8건 |

**잔여 큐 (13):** 3·4·8 대비 +2 (대문자 인코딩 nav href 중복)

---

#### onetenth8 (Creative 08) — `:4207`

| 검사 항목 | 결과 | 비고 |
|-----------|------|------|
| 메인 로컬 preview | ✅ HTTP 200 | `bodyHeight` 6830px |
| CSS / JS | ✅ | Element Pack motion FX 다수 |
| 이미지 | ⚠️ 외부 4건 | `service03-1-1024x683.jpg` 1건 미러 누락 가능 |
| 폰트 | ⚠️ CORS 7건 | |
| 인터랙션 | ⚠️ **가장 복잡** | **Testimonial carousel** · **YouTube video** · **Pricing 6카드** · **FAQ accordion (메인 내장)** · parallax |
| PC / MO | ✅ | 캡처 PASS |
| Console | ⚠️ | 폰트 CORS 7건 · `admin-ajax.php`는 라이브 참조 (폼 제출 불가 — 데모 한계) |

---

### 1.3 공통 이슈 (4케이스)

| 이슈 | 심각도 | 영향 | 권장 조치 (다음 단계) |
|------|--------|------|------------------------|
| 폰트 CSS → 라이브 URL | 중 | 로컬 preview 타이포 fallback | **프리뷰 서버 rewrite** (`01-original` 수정 금지) |
| Logo·favicon 절대 URL | 낮 | 헤더 로고·탭 아이콘 | 미러 backfill 또는 rewrite |
| onetenth6·8 일부 업로드 이미지 외부 | 중 | 해당 섹션 이미지 깨짐 가능 | BFS 재수집 또는 수동 4–5파일 |
| `//t1.daumcdn.net` 지도 | 낮 | 오시는 길 지도만 | 외부 의존 허용 또는 정적 지도 대체 |
| `wp-json` / feed 잔여 | 무시 | 콘텐츠 없음 | Track C 분석 불필요 |
| percent-encoded nav href | 낮 | 정적 링크 감사 false positive | 프리뷰가 한글 폴더로 rewrite 중 |
| contact 폼·KBoard POST | 데모 한계 | 문의 제출 불가 | 미러 QA 범위 밖 |

---

## 2. 대표 화면 분류

로컬 프리뷰 기준 (`http://127.0.0.1:{port}/...`). 4케이스 **IA 동일**, 경로만 도메인·포트가 다름.

| 유형 | onetenth3 `:4204` | onetenth4 `:4205` | onetenth6 `:4206` | onetenth8 `:4207` |
|------|-------------------|-------------------|-------------------|-------------------|
| **Main** | `/` | `/` | `/` | `/` |
| **일반 서브** | `/인사말/` | `/인사말/` | `/인사말/` | `/인사말/` |
| | `/연혁/` | `/사업분야-디자인-1/` | `/오시는-길/` | `/사업분야-디자인-2/` |
| **목록 — 제품** | `/제품소개/` | `/제품소개/` | `/제품소개/` | `/제품소개/` |
| **목록 — 뉴스** | `/뉴스/` | `/뉴스/` | `/뉴스/` | `/뉴스/` |
| **목록 — 공지** | `/공지사항/` | `/공지사항/` | `/공지사항/` | `/공지사항/` |
| **상세 — 제품** | `/products/제품1/` | `/products/제품1/` | `/products/제품1/` | `/products/제품1/` |
| **상세 — 뉴스** | `/news/테슬라-자율주행-기술-업데이트-발표/` | 동일 슬러그 | 동일 슬러그 | 동일 슬러그 |
| **문의** | `/contact/` | `/contact/` | `/contact/` | `/contact/` |
| **FAQ** | `/faq/` | `/faq/` | `/faq/` | `/faq/` |
| **개인정보** | `/terms_page/privacy-policy/` | 동일 | 동일 | 동일 |

**원격 URL 예:** `https://onetenth6.mycafe24.com/제품소개/`

---

## 3. 사이트맵 요약

4케이스 **GNB·푸터·게시판 구조 동일** (십분의일 데모 템플릿 공통 IA).

### 3.1 GNB (1depth)

```
회사소개 │ 사업분야 │ 제품소개 │ 고객지원
```

### 3.2 하위 메뉴

| 1depth | 2depth |
|--------|--------|
| 회사소개 | 인사말 · 연혁 · 오시는 길 |
| 사업분야 | 사업분야 디자인 1 · 사업분야 디자인 2 |
| 제품소개 | (단일) 제품소개 → CPT 목록 |
| 고객지원 | 공지사항 · 뉴스 · 자주묻는질문 · 문의하기 |

**FAB:** `3초만에 문의하기` → `/contact/` (모바일·데스크톱 반복)

### 3.3 Footer 링크·정보

- Address / Contact placeholder (서울 00구, T·F 010-1234)
- 사업자 정보 placeholder
- **개인정보처리방침** → `/terms_page/privacy-policy/`
- Copyright `One-tenth. All rights reserved.`
- **이용약관 페이지:** 미러에 **없음** (개인정보만 존재)

### 3.4 게시판·CPT 구조

| 기능 | URL 패턴 | 비고 |
|------|----------|------|
| 공지 | `/공지사항/` | 페이지 빌더 또는 KBoard |
| 뉴스 목록 | `/뉴스/` | |
| 뉴스 상세 | `/news/{slug}/` | CPT |
| FAQ | `/faq/` | 아코디언 (08은 메인에도 FAQ 블록) |
| 문의 | `/contact/` | Elementor form → `admin-ajax` (로컬 미동작) |
| 제품 목록 | `/제품소개/` | |
| 제품 상세 | `/products/{slug}/` | CPT, 샘플 3건 |

---

## 4. 메인 페이지 섹션 목록

### onetenth3 — Tech 03

| # | 섹션 | 핵심 카피·구성 |
|---|------|----------------|
| 1 | **Header** | UICore sticky navbar · 로고 · GNB · 햄버거 |
| 2 | **Hero** | earth-space 비주얼 · "미래를 주도하는 / 통합 테크 솔루션" · Innovation 라벨 |
| 3 | **Value Cards** | fullPage 내부 · Swiper 5슬라이드 (클라우드매니저·인사이트 AI·시큐어가드·플렉스오토메이트·브랜드빌더) |
| 4 | **Solution** | "테크 비즈니스 솔루션" · 4열 HTML widget (클라우드·AI·빅데이터·사이버보안) |
| 5 | **News** | "테크 산업의 흐름을 읽다" · 뉴스 카드 3건 |
| 6 | **Contact CTA** | "도움이 필요하신가요?" |
| 7 | **Footer** | 주소·연락처·개인정보·FAB |

**비고:** `#fullpage` + jQuery fullPage.js — 섹션 스냅 스크롤. 분리 난이도 **최상**.

---

### onetenth4 — Business 04

| # | 섹션 | 핵심 카피·구성 |
|---|------|----------------|
| 1 | **Header** | 공통 UICore |
| 2 | **Hero** | Creative Design · "성공적인 비즈니스, 십분의일" |
| 3 | **About** | ABOUT US · 템플릿 판매 소개 |
| 4 | **Service** | OUR SERVICE · 4카드 (High Quality·Customize·Design Theme·Marketing Tool) |
| 5 | **Experience** | "풍부한 경험과 데이터에 기반한 서비스" |
| 6 | **Gallery** | OUR GALLERY · 템플릿 썸네일 그리드 |
| 7 | **Vision** | OUR VISION · 십분의일 비전 |
| 8 | **Contact CTA** | "더 이상 고민하지 마세요" |
| 9 | **Footer** | 공통 |

---

### onetenth6 — Business 06

| # | 섹션 | 핵심 카피·구성 |
|---|------|----------------|
| 1 | **Header** | 공통 UICore |
| 2 | **Hero** | "새로운 생각, 새로운 시선" · TECHNOLOGY 라벨 · parallax 텍스트 |
| 3 | **Our Story** | 스토리 이미지 + **Stats 카운터 4** (설립연도·프로젝트·클라우드·만족도) |
| 4 | **Innovation Intro** | INNOVATION 헤드 · 맞춤형 솔루션 카피 |
| 5 | **Innovation Cards** | 4카드 그리드 (클라우드·빅데이터·AI·보안) + VIEW MORE |
| 6 | **Our Business** | 비즈니스 혁신 · 이미지+텍스트 그리드 |
| 7 | **CTA Band** | "혁신적인 기술 도입을 통해…" 상담 유도 |
| 8 | **News** | 최신 뉴스 3건 |
| 9 | **Footer** | 공통 |

**비고:** 기업형 랜딩 **가장 정형화**. fullPage 없음.

---

### onetenth8 — Creative 08

| # | 섹션 | 핵심 카피·구성 |
|---|------|----------------|
| 1 | **Header** | 공통 UICore |
| 2 | **Hero** | "프리미엄 홈페이지 템플릿, 십분의일" · 2버튼 · parallax |
| 3 | **Intro + Video** | 소개 카피 · **YouTube 배경 영상** |
| 4 | **Testimonial** | 고객 후기 **carousel** (Swiper·fade_blur) |
| 5 | **Value Prop ×3** | 트렌디 템플릿 · 다양한 템플릿 · 프리미엄 포지셔닝 |
| 6 | **Pricing** | **요금제 6카드** (Basic/Standard/Premium 변형) |
| 7 | **FAQ** | **아코디언** "자주 여쭤보시는 질문" (메인 내장) |
| 8 | **Footer** | 공통 |

---

## 5. 후보 판정

**점수:** 1(낮음/불리) – 5(높음/유리)

| 기준 | onetenth3 | onetenth4 | onetenth6 | onetenth8 |
|------|-----------|-----------|-----------|-----------|
| 프론트 완성도 | 4 | 4 | **5** | **5** |
| 구조 단순성 | 2 | 3 | **5** | 2 |
| 섹션 조립 적합성 | 3 | 3 | **5** | 3 |
| 반응형 안정성 | 3 | 4 | **5** | 3 |
| 인터랙션 복잡도 (낮을수록 유리) | 2 | 3 | **4** | 1 |
| CSS/JS 의존성 (단순할수록 유리) | 2 | 3 | **4** | 2 |
| 이미지 의존도 (적을수록 유리) | 4 | 4 | 3 | 3 |
| 포트폴리오 전환 적합성 | 4 | 2 | **5** | 3 |
| **합계** | **24** | **26** | **36** | **24** |

### 케이스별 한줄 평

- **onetenth3:** 테크 톤·솔루션 4열·fullPage — **시각 임팩트는 최고**, 분해·재조립 비용 최대.
- **onetenth4:** 08과 겹치는 마케팅 랜딩 — **베이스 가치 낮음**, 갤러리·비전 블록만 참고.
- **onetenth6:** 카운터·4카드·비즈니스·뉴스·CTA — **기업 사이트 베이스로 최적**.
- **onetenth8:** 후기·영상·요금·FAQ — **섹션 라이브러리 원천**, 베이스로는 과함.

---

## 6. 최종 추천

| 역할 | 추천 |
|------|------|
| **Base Template 후보** | **onetenth6** (Business 06) |
| **Section Library** | **onetenth8** (testimonial·pricing·FAQ·video) + **onetenth3** (tech solution 4열·fullPage hero 패턴) |
| **참고만 / 베이스 제외** | **onetenth4** (08·06과 중복, 차별 섹션 적음) |
| **첫 분리 섹션 3개** | ① **Header** (UICore·공통) → ② **Hero** (06 기준) → ③ **Footer** (공통 Elementor footer) |
| **절대 수정 금지 원본** | `_reference-harness/cases/onetenth{3,4,6,8}/01-original/**` 전체 |

### 추천 이유 (onetenth6)

1. **IA가 기업 사이트 표준**에 가장 가깝다 (Hero → Story/Stats → Service Cards → Business → News → CTA).
2. **fullPage·메인 내장 FAQ·Pricing 없음** — 섹션 단위 추출·정적 이식 난이도 최저.
3. **인터랙션은 카운터·fade·Swiper 수준** — Element Pack 의존은 있으나 03·08 대비 통제 가능.
4. 4케이스 **공통 GNB·푸터·서브 IA**와 100% 호환 → 08·03에서 뽑은 섹션을 끼우기 좋다.

### Section Library 활용 가이드

| 원천 | 가져올 섹션 | 용도 |
|------|-------------|------|
| onetenth8 | Testimonial carousel | 신뢰·후기 블록 |
| onetenth8 | Pricing 6-card | 요금·플랜 비교 |
| onetenth8 | FAQ accordion | 랜딩 내 FAQ (별도 `/faq/`와 별개) |
| onetenth3 | Solution 4-column HTML | 테크·B2B 솔루션 소개 |
| onetenth3 | Value Swiper cards | 제품·기능 하이라이트 |
| onetenth4 | Gallery grid | 포트폴리오·쇼케이스 (선택) |

---

## 부록 — 프리뷰·감사 산출물

| 산출물 | 경로 |
|--------|------|
| 정적 링크·GNB 감사 | `_reference-harness/cases/_onetenth-qa-audit.json` |
| 케이스 분석 | `_reference-harness/cases/onetenth{N}/00-reference/analysis.md` |
| 캡처 QA | `_reference-harness/cases/onetenth{N}/02-original-qa/report.md` |
| Console 감사 스크립트 | `_reference-harness/scripts/audit-onetenth-preview.js` |

---

## 결정 (Next Gate)

| 질문 | 결정 |
|------|------|
| **지금 바로 섹션 분리를 시작해도 되는가?** | **조건부 YES** — HTML·구조·IA는 충분. **Header → Hero → Footer** 3개부터 시작 가능. 다만 **시각 1:1 QA**를 할 거면 프리뷰 폰트 rewrite를 먼저 하는 편이 낫다. |
| **먼저 미러 누락을 보완해야 하는가?** | **선택적 보완** — (1) 폰트·Logo URL → 로컬 rewrite **권장** (2) onetenth6 외부 이미지 4건·onetenth8 1건 **backfill 권장** (3) wp-json·feed·지도는 **필수 아님**. 구조 분리만 할 때는 backfill 없이 진행 가능. |
| **베이스로 추천하는 케이스** | **onetenth6** |
| **추천 이유** | 기업형 섹션 흐름·낮은 인터랙션 복잡도·공통 IA 완비·포트폴리오 전환 용이. 08·03은 라이브러리로 보조. |

---

*본 문서는 Mirror QA + Template Candidate Review 단계 산출물이다. 섹션 분리·working-copy·WP 테마화는 별도 승인 후 진행.*
