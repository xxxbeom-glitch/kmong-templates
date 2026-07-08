# Change Log

## 2026-07-08 · [rules] site-clone-fidelity 후속 이슈 보완

**범위:** `site-clone-fidelity.md` · `browser-capture-qa.md` · `83` · failure-log
**내용:** ptmd869920에서 고친 이슈(optimizer MIME·절대경로·배너 이중·/exec proxy·포트·Windows path·팝업 inject)를 재발 방지 표·QA 체크로 편입

## 2026-07-08 · [rules] reference-harness 사이트 통째 복제 지침

**범위:** `83-reference-harness.mdc` · `_reference-harness/shared/rules/*` · harness README
**내용:**
- 신규 SoT `site-clone-fidelity.md` — 한 연속(캡처+전체 미러+preview+QA)
- 캡처만/메인만/post-JS entry 금지 · 이동·인터랙션 QA 필수
- source-collection · browser-capture-qa · workflow · stage-gates 정렬

## 2026-07-08 · [reference-harness] ptmd869920 멀티페이지 미러

**범위:** `_reference-harness/cases/ptmd869920/` · scripts/mirror·preview
**내용:**
- mirror-original.js v4 — BFS 최대 60페이지 pristine 미러
- pages 60 · assets ~801 · url-map ~808
- 네비 href = Cafe24 경로 유지 · preview url-map/live proxy로 이동
- 미수집 HTML·/exec → 라이브 프록시
**미리보기:** http://127.0.0.1:4180/

## 2026-07-08 ? [reference-harness] ptmd869920 PURE BLANC Track C

**����:** `_reference-harness/cases/ptmd869920/` only  
**Ʈ��:** C (browser-captured) �� ����/working/map **�� ��**  
**�ҽ�:** https://d.cafe24.com/sample?productCode=PTMD869920 �� ecudemo391069  
**����:** 1920/390 ĸó �� analysis �� browser-capture QA PARTIAL

## 2026-07-08 ??[cafe24] release·배포 규칙 `84`

**범위:** `.cursor/rules/84-cafe24-release.mdc` · `docs/cafe24/release*.md` · release-templates · `80`/`82`/`00-router`/`OVERVIEW` ?�결�? 
**미수??** `templates/cafe24_shop/` · `docs/cafe24/*.json` · ?�본/?�영 ?�킨 · ?�제 ?�로??미수??
**?�용:**
- Track A/B: QA ??RC ??upload package ??test design ??production readiness ???�환 ??rollback
- Track C 배포 ?�외 · working ??production 직업로드 금�?
- 보고???�플�?5�?· small patch 간소??· ?�증 ?�으�??�로??????
---

## 2026-07-08 ??[cafe24 rules] Track A/B/C 분리 · 규칙 리팩??
**범위:** `.cursor/rules` · `docs/cafe24/*.md` · `_reference-harness/shared/rules` · 관??`_docs` 참조�? 
**미수??** `templates/cafe24_shop/` · `docs/cafe24/*.json` · ?�매/고객 ?�킨

**?�용:**
- `00-project-router` (A 기존 ?�킨 / B ?�적?�이??/ C ?�모) · `10-static-template`
- `80-cafe24-core` · `81-cafe24-platform-map`(B�? · `82-cafe24-qa` 분기 · `83` ?�림
- �?`00-project-tracks` · �?80/81/82/83 · reconstruction ??`.cursor/rules/archive/*.md` (frontmatter ?�거)
- harness: `original-integrity-qa` / `browser-capture-qa` · workflow·stage-gates ?�화 · �?original-qa·track·legacy ??archive
- `docs/cafe24/README.md` · `CAFE24_RULES_OVERVIEW.md` · `UNRESOLVED_REFERENCES.md`
- 백업: `_review_exports/cafe24-rules-before-refactor/`

---

## 2026-07-08 ??[docs/cafe24] ?�벤?�리 보정

**범위:** `docs/cafe24/*` only · `templates/cafe24_shop/` **미수??*  
**?�용:**
- `directives.json` 분리 (`@layout|css|js|import|contents`)
- modules ?�계: unique / totalOccurrences / instance(`_N`)
- module `rawName`·`baseName`·`instanceSuffix`
- variables `baseName` 집계 + `raw`/`modifiers` + `contextModule`(null ?�용)
- forms kind ?��? ?��? · `popup-rules.md` 추�?

---

## 2026-07-08 ??[reference-harness] 규칙 rev2 (original-qa · working-qa · _dev)

**범위:** 규칙·README·manifest template·tracks·cafe24 ?�계�?· **case 결과�?미수??*  
**배경:** ?�집 ??analysis?�working?�로 바로 가???�름??**source?�original QA**·Page Index·immutable/revision·cafe24 ZIP vs demo ?�급??빠짐

### 조사 ?�약 (문제)

1. ?�재 ?�름: `00??1??2-analysis??3-working` ??**02-original-qa / 05-working-qa / _dev ?�음**
2. reconstruction ?�존: deprecated 문서·?��? cafe24 문구·sample03 legacy
3. source-to-original QA 빠진 ?�치: `workflow`·`stage-gates`·`83`·cafe24 게이?�·manifest stages
4. revision·page inventory·designFreedom 미정??
### ?�규 SoT

| ?�일 | |
|------|--|
| `original-immutable.md` | ?�정 금�?·checksum |
| `original-revision.md` | rev ?�용??(즉시 rename ???? |
| `original-qa.md` | source?�original QA |
| `analysis-artifacts.md` | 03-analysis ?�수 ?�출�?|
| `working-copy.md` | 04 ?�정 ?�칙 |
| `page-index.md` · `page-inventory.md` | `_dev/` · ?�키�?|
| `cafe24-original.md` | skin-zip vs browser-captured |

### 갱신

- `workflow.md` · `track.md` · `stage-gates.md` · `source-collection.md` · `license.md` · `legacy-migration.md`
- `reconstruction.md` ??fallback only
- README · manifest.template · case/original/`_dev` templates
- `.cursor/rules/83-reference-harness.mdc` · `00-project-tracks` · `80`·`81`·`82`
- tokens/components/interactions README ??`06-normalized`

### ?�더 번호 (?? ??case rename 보류

`00-source` ??`01-original` ??`02-original-qa` ??`03-analysis` ??`04-working-copy` ??`05-working-qa` ??`06-normalized` ??`07-final` ??`08-platform-map` ??`09-platform-qa` + `_dev/`

### 미수??
- sample03 ??case ?�더 rename·?�수집·working-copy·original ?�정

---

## 2026-07-08 ??[reference-harness] sample03 ???�크?�로 ?�용

**범위:** `cases/sample03/`  
**?�용:** ?�본 ?�집·???�계 구조 ?�용 · �?reconstruction ?�거???�동

### ?�규

| 경로 | ?�용 |
|------|------|
| `00-source/` | source.md · license.md · inventory · captures |
| `01-original/` | ?�모�?mirror 92 files · index.html · manifest-original.json |
| `02-analysis/` | analysis.md · inventory · dependencies |
| `scripts/mirror-original.js` | Playwright ?�본 ?�집 |
| `scripts/backfill-original.js` | ?�일 ?�메???�락 ?�산 backfill |
| `README.md` | case ?�계 ?�내 |

### ?�동·?�거??
- `01-reconstruction/` ??`legacy/01-reconstruction/` (DEPRECATED)
- `00-reference/` ??LEGACY.md · ??경로 참조

### manifest

- stages: source/original/analysis **pass** · working-copy pending
- legacy.reference · legacy.reconstruction 기록

### 미수??
- `03-working-copy` ???�정 범위 ?�인 ?��?- `00-reference/` ?�더 ??�� (참고???��?)

---

## 2026-07-08 ??[reference-harness] ?�크?�로 ?�정??(?�본 ?�집·복사�??�정)

**범위:** 규칙·문서�?· **case 결과물·폴??rename 미수??*  
**배경:** 1�?목적???�유???�구?�」→?�원�??�집·불�? 보�?·?�체 복사�??�정?�으�?변�?
### ?�규 ?�계

`00-source` ??`01-original` ??`02-analysis` ??`03-working-copy` ??`04-normalized` ??`05-final` ??`06-platform-map`

### ?�규 SoT

| ?�일 | ?�용 |
|------|------|
| `shared/rules/workflow.md` | ?�이?�라?�·게?�트 |
| `shared/rules/source-collection.md` | ?�집 ?�?�·완�?기�? |
| `shared/rules/license.md` | 권리 ?�칙 |
| `shared/rules/stage-gates.md` | ?�계�?PASS/FAIL |
| `shared/rules/legacy-migration.md` | �?`00-reference`/`01-reconstruction` ?�??|
| `.cursor/rules/83-reference-harness.mdc` | ?�이?�트 규칙 |
| `shared/templates/manifest.template.json` | ??manifest stages |
| `shared/templates/case-readme.template.md` | case README |
| `shared/templates/01-original-README.template.md` | original ?�정금�? |

### 갱신

- `_reference-harness/README.md` · `shared/rules/track.md`
- `.cursor/rules/00-project-tracks.mdc` · `80` · `81` · `82`
- `shared/tokens|components|interactions/README.md` ??`04-normalized` 기�?

### Deprecated

- `reconstruction.md` · `reconstruction-qa.md` · `83-reference-reconstruction.mdc`
- `01-reconstruction/` 방식 ??sample03 ??**?�거??보존** · ??case 미사??- �?`03-cafe24-map` ??`06-platform-map` (?�거??경로 병행 ?�정)

### 미수??(?�용???�인 ??

- 기존 case `00-reference` ??`00-source`/`02-analysis` rename
- `01-original` ?�파???�집 (sample01~04 ??

---

## 2026-07-08 ??[rules] 01-high-fidelity-reconstruction ?�의 ?�정

**범위:** reference-harness 규칙 ?�반 · `.cursor/rules/83-reference-reconstruction.mdc` ?�규  
**배경:** `01-reconstruction`??구조 mock?�로 ?�석?�어 sample03 wireframe ?��? PASS 발생

### ?�규

| ?�일 | ?�용 |
|------|------|
| `shared/rules/reconstruction.md` | 목적·PASS/FAIL·?�출물·manifest label·?�이?�스 SoT |
| `shared/rules/reconstruction-qa.md` | Desktop/Mobile 비교 QA 체크리스??|
| `shared/templates/01-reconstruction-README.template.md` | case README ?�플�?|
| `shared/templates/00-reference-for-reconstruction.md` | reference ??reconstruction ?�력 체크리스??|
| `.cursor/rules/83-reference-reconstruction.mdc` | ?�이?�트 규칙 (globs: 01-reconstruction·00-reference) |

### 갱신

| ?�일 | ?�용 |
|------|------|
| `shared/rules/track.md` | ?�계 ?�기 `01-high-fidelity-reconstruction` · SoT 링크 |
| `_reference-harness/README.md` | ?�정??복원?�→ high-fidelity visual reconstruction |
| `.cursor/rules/00-project-tracks.mdc` | ?�계명�?83` 참조 |
| `.cursor/rules/80-cafe24-smart-design.mdc` | reconstruction ?�각 ?�현 명시 |
| `shared/tokens|components|interactions/README.md` | reconstruction 미적?�·FAIL 조건 |
| `package.json` | description 갱신 |

### ?�더�?
- **?��?:** `01-reconstruction/` (9 case·캡처·?�크립트 경로)
- **문서·manifest `label`�?** `01-high-fidelity-reconstruction`

### ?�속 (별도 ?�업)

- sample03 **01-high-fidelity-reconstruction v2** ??로컬 ref ?��?지·horizontal hero·PASS 체크리스??· after 캡처 ?�제�?
---

## 2026-07-08 ??[reference-harness] sample03 01-high-fidelity-reconstruction v2

**범위:** `cases/sample03/01-reconstruction/`  
**?�용:** ?�정 규칙 기�? ?�작????gradient??assets/ref-*.png` · hero horizontal track · top-band #e69c95 · USP check · SVG nav · reconstruction-log/qa-log · after 캡처 1920/390

---

**범위:** `cases/sample03/01-reconstruction/` · `shared/rules/track.md` · harness README  
**?�용:** ?�모�?computed style 기반 ?�각 보정 ??Pretendard/Outfit · 210/1500 · header overlap · 3-panel hero · 369×492 카드 · chip/intro/best typo · before/after 캡처 · `reconstruction-log.md` · 01-reconstruction ?�의 보강 (wireframe?�완�?

---

## 2026-07-08 ??[reference-harness] sample03 reconstruction 착수

**범위:** `cases/sample03/01-reconstruction/`  
**?�용:** reference ?�용???�인 · Knotted. ?�적 복원(?�더·?�어로·진?�·푸?? · Tenfold ?�큰·module ?�그 ?�음 · ?�레?�스?�???�면 ??**?�속 visual 보정?�로 ?��?*

---

## 2026-07-08 ??[reference-harness] cafe24-skin sample01~04 00-reference

**범위:** `cases/sample{01..04}/00-reference/` · manifest  
**?�용:** 카페24 ?�자?�센??4?�킨 IA·commerce slot·모듈 ?�보·캡처(1920/390) · reconstruction 미착??· ?�세?�단 캡처 ?�속

---

## 2026-07-08 ??[rules] cafe24-skin ?�랙 규칙 초안

**범위:** `.cursor/rules/00-project-tracks.mdc` · `80`~`82` · `_reference-harness/README.md`  
**?�용:** cafe24-skin ?�랙·?�어 분리(WP vs ?�마?�디?�인) · map ?�인 게이??· ?�각/커머??QA 분리 · `03-cafe24-map` ?�계 1�?· `templates/cafe24_shop` read-only · `cafe24/`·`_delivery/cafe24/` 미생??
---

## 2026-07-08 ??[reference-harness] 4?�이??00-reference 초안

**범위:** `cases/{forward-clinic,celltrion,reone-skin,bv-clinic}/`  
**?�용:** URL·analysis.md·inventory.json·manifest ?�션 IA 초안 · captures/assets �??�더 · reconstruction 미착??· 캡처???�용???�속 보완

---

## 2026-07-08 ??[reference-harness] ?�랙 골격 · lu-dental 00-reference ?�

**범위:** `_reference-harness/` · `shared/` · `cases/lu-dental/00-reference/`  
**?�용:** ?�험 ?�랙 ?�립 ?�성 · Tenfold 최소 SoT · ?�일??`lu-dental` manifest·분석 문서 ?� · reconstruction/normalized·templates/wordpress 미착??
---

## 2026-07-08 ??[wordpress] 365-hes-womens-clinic checkup ?�션?�더 ?�큰 ?�렬

**범위:** `style.css` (checkup�?  
**기�?:** 병원?�개 `about-clinic` / `about-doctors` eyebrow·title ?�큰  
**?�용:** checkup overview·programs·process ?�더�?`--symptom-eyebrow-*` / `--symptom-title-*` / `--symptom-header-gap`??맞춤 · about ?�복 · 공통 ?�래???�험 롤백

---

## 2026-07-08 ??[wordpress] 365-hes-womens-clinic 맞춤 검�??�로그램 ??UX

**범위:** `checkup-body.php` · `content-checkup.php` · `assets.php` · `style.css` · `main.js`  
**?�용:** ?�측 ??�� ?�릭 ??좌측 ?��?지 ?�환 · 비선??opacity 0.35 · `>` chevron ?�거(링크가 ?�닌 ?�택 ?? · ??���??�시 ?��?지 5??
---

## 2026-07-08 ??[wordpress] 365-hes-womens-clinic CHECKUP ?�?��? 간격 ?�정

**범위:** `content-checkup.php` · `checkup-body.php` · `style.css`  
**?�인:** `white-space:pre-line`??h2 ?�그 ?�이 ?�여?�기 줄바꿈을 �?�?~50px)�??�더 ??CHECKUP?��??��? 간격??Figma 12px가 ?�니??~70px+  
**조치:** ?�?��???`<br>`+`wp_kses`�?변�?· `pre-line` ?�거 · eyebrow `letter-spacing:1.5px`

---

## 2026-07-08 ??[wordpress] 365-hes-womens-clinic CHECKUP ?�션 ?�렬 ?�정

**범위:** `checkup-body.php` · `style.css`  
**?�용:** ?�?��? `nl2br`+`pre-line` ?�중줄바�??�거 · 체크 ?�이�????�체??복구 · ??590/1fr·gap80 · 구분??`#e8e4df` · ?�열 stretch 균등??
---

## 2026-07-08 ??[wordpress] 365-hes-womens-clinic ?�성검�?Figma ?�이???�확??반영

**범위:** `style.css`  
**?�용:** PROGRAMS·PROCESS ?�더 가?�데 ?�렬 · overview 체크리스???�각 박스 ??가�?구분?�만 (Figma overview-right Line 구조)

---

## 2026-07-08 ??[wordpress] 365-hes-womens-clinic ?�성검�??�내 Figma ?�이?�웃 ?�반??
**범위:** `checkup-body.php` · `style.css`  
**?�용:** overview ?�?��? 좌열 ?�동 · 체크리스?�·프로그??구분????· 좌정???�션 ?�더 · ?�로그램 num+?�로카피 · ?��?지 비율 1440/732

---

## 2026-07-08 ??[wordpress] 365-hes-womens-clinic ?�성검�??�내 Figma 반영

**범위:** `content-checkup.php` · `checkup-body.php` · `content-registry.php` · `pages.php` · `assets.php` · `style.css`  
**?�용:** Figma `728:171` ?�성검�??�내 3?�션(CHECKUP·PROGRAMS·PROCESS) · ?�브?�어�?카피 · GNB ?�성검진↔?�성질환 ?�서 교체

---

## 2026-07-08 ??[wordpress] 365-hes-womens-clinic ?�브?�이지 ?�단 CTA band ?�거

**범위:** `page.php` · `assets.php`  
**?�용:** Figma 미포???�단 CTA band `page.php` ?�동 ?�제

---

## 2026-07-08 ??[wordpress] 365-hes-womens-clinic ?�브?�어�?미출??버그 ?�정

**범위:** `inc/pages.php` · `content-registry.php` · `style.css`  
**?�인:** `hero => array()`????`!empty()`가 false ???�브?�어로·Figma 배경 미렌?? 
**조치:** `array_key_exists('hero')`�?변�?· about/support ?�브 기본 ?�어�??�용 · �?about 경로 ??`/about/info/` 리다?�렉??
---

## 2026-07-08 ??[wordpress] 365-hes-womens-clinic 병원?�개 IA·?�브?�어�?Figma 반영

**범위:** GNB · `page-registry` · `content-registry` · `sub-hero.php` · about 3?�이지 ?�플�?· `style.css` · 구페?��? ?�거  
**?�용:** 병원?�개 ?�위 3�?병원?�개·?�료진소개·진료안?? · `/about/info/` ?�규 · schedule/space/location ?�거 · ?�브?�어�??��?지+breadcrumb 공통 ?�용

---

## 2026-07-08 ??[wordpress] 365-hes-womens-clinic TEAMS ?�?��? ?�트 ?�일

**범위:** `style.css` `.section-medical-staff__title`  
**?�용:** size·lh�?공통 ?�션 ?�?��?(`--symptom-title-size` / `--symptom-title-lh`)??맞춤 · 컬러·?�렬 ?��? · ?�용 ?�큰 ?�거

---

## 2026-07-08 ??[wordpress] 365-hes-womens-clinic TEAMS 배경 ?�라??맞춤

**범위:** `style.css` `.section-medical-staff__bg`  
**?�용:** `object-position` ?�로�?`center` ??`top` (PC·1024·768)

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic ?�계??IA ?�체 ?�이지 ?�결

**범위:** `inc/page-registry.php` · `inc/content-registry.php` · `inc/pages.php` · `template-parts/pages/*` · `functions.php` · `page.php` · `assets.php` · `header.php` · `style.css`  
**?�용:** §04-2 IA 40�??�이지 ?�동 ?�록·?�우??· ?�브/?�세/?�개/?�수·FAQ·공�? 콘텐�?반영 · 메인 GNB·?�?�진�?링크 ?�결

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic ?�성질환 OK???�이?�웃

**범위:** `inc/content-womens-disease.php` · `womens-disease-content.php` · `style.css`  
**?�용:** ?�트�???공감 2??증상|진료?�요) ??질환 7카드 그리????검????진료과정 (OK ?�리???�보 배열 차용)

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic ?�브 ?�어�?공통 규칙

**범위:** `sub-hero.php` · `style.css` · `inc/content-womens-disease.php` · `hes-style-guide.md`  
**?�용:** eyebrow·?�명·CTA·breadcrumb ?�거 · ?�?��?�?중앙 ?�렬

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic ?�성질환 D07~D10 ?�외

**범위:** `template-parts/pages/womens-disease-content.php` · `inc/content-womens-disease.php` · `inc/pages.php`  
**?�용:** 치료·?�료진·FAQ·?�단 CTA band ?�거 · D01~D06�??��? (?�어�?CTA??D01???��?)

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic ?�성질환 ?�브 ?�자??발전

**범위:** `inc/content-womens-disease.php` · `template-parts/pages/womens-disease-content.php` · `template-parts/sub-hero.php` · `style.css`  
**?�용:** ?��??��??�드 ?�큰·메인 ?�턴(P04·P05·P07·P09·P12) ?�조??+ ?�브 ?�용 발전 ??카드 그리?�·이미�? featured·?�형 ?�텝·FAQ ?�널·?�료�?카드·?�션 배경 리듬 · §07 콘텐�??��?

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic ?�성질환 §07 콘텐�??�렬

**범위:** `inc/content-womens-disease.php` · `template-parts/pages/womens-disease-content.php` · `template-parts/sub-hero.php` · `style.css`  
**?�용:** project-spec §07 카피·?�션 ?�서(D02?�D04?�D03?�D05~D09) 반영 · FAQ 질문 6개만 · ?�료�??�드 구조�?· ?�자?��? 최소 scaffold CSS(?�래?�·마?�업 ?��?, ?��???TBD)

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic ?�브?�이지 1: ?�성질환

**범위:** `sub-hero.php` · `cta-band.php` · `page-womens-disease.php` · `inc/pages.php` · `inc/content-womens-disease.php` · `template-parts/pages/womens-disease-content.php` · `style.css`  
**?�용:** 공통 sub-hero·CTA band · `/womens-disease` ?�동 ?�이지 ?�록 · spec §07 ?�션 D01~D10 · 메인 ?�턴 ?�조??
---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic GNB hover dropdown (gnb-item-panel)

**범위:** `header.php` · `inc/assets.php` · `style.css` · `assets/js/main.js`  
**?�용:** GNB 7�?2depth · PC hover ?�널(`initHeaderDropdown`) · dim · 모바???�로?????�위메뉴 ?�출 · IA 경로(project-spec §04-2)

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic hes-style-guide + cursor rule

**범위:** `docs/hes-style-guide.md` · `.cursor/rules/75-hes-womens-clinic.mdc` · `README.md`  
**?�용:** 메인 기반 ?�큰·?�턴(P01~P12)·?�브?�이지 �?���?· GNB IA 매핑 · ?�브 ?�업 ???�수 ?�기 규칙

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic assets ?�어 ?�이밍·폴???�리

**범위:** `assets/**` · `inc/assets.php` · `README.md`  
**?�용:** icons/logos/hero/treatments/spaces/staff ?�위�?분류 · ?��? ?�일�??�어 kebab-case · `hes_womens_clinic_asset_uri` 경로 ?�기??· treatment-surgery ??`treatments/surgery.png` (operating-room 복사�?

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic Figma 검??반영 (2·5�?

**범위:** `inc/assets.php` · `template-parts/section-examination.php` · `style.css` · `footer.php` · `assets/chevron-right.png`  
**?�용:** ?�?�전??`070-0000-0000` ?�일 ?�스(`hes_womens_clinic_phone`) · S06 chevron-right · S02 shadow y8/10% · ?�더 border ?�거 · Copyright 2024 고정

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic S09 location (Figma 614:368)

**범위:** `template-parts/section-location.php` · `front-page.php` · `style.css` · `inc/assets.php`  
**?�용:** LOCATION · ?�시??�?· 지??placeholder #f4f1ea · 주소·?�화 · 진료?�간 ?�널 #f5f4f3 r16 · 830+562 2??· #faf9f6

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic S08 FAQ (Figma 614:344)

**범위:** `template-parts/section-faq.php` · `front-page.php` · `style.css` · `inc/assets.php` · `assets/js/main.js`  
**?�용:** FAQ · ?�주 ?�는 질문 · ?�코?�언 6??��(1�?기본 ?�림) · Q 22px · A 17px · chevron up/down · `initFaqAccordion()` · #f8f5f0

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic S07 our space (Figma 614:313)

**범위:** `template-parts/section-space.php` · `front-page.php` · `style.css` · `inc/assets.php` · `assets/js/main.js`  
**?�용:** OUR SPACE · 진료 ?�경�??�라?�버??· 7??pill(?�성 accent) · 카드 682px r12 · 공간 ?��?지 7�?· `initSpaceTabs()` · #faf7f6

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic S06 examination (Figma 614:284)

**범위:** `template-parts/section-examination.php` · `front-page.php` · `style.css` · `inc/assets.php`  
**?�용:** SYSTEM · 체계?�인 진료 ?�스??· 6?�계 ?�형(180px) · 배경?�자 86px accent 12% · chevron ?�결 · #f8f5f0 · @1024 가�??�크�?
---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic S05 medical staff (Figma 614:191)

**범위:** `template-parts/section-medical-staff.php` · `front-page.php` · `style.css` · `inc/assets.php`  
**?�용:** TEAMS · 2�??�?��? 42px white · CTA pill ?�의료진 ?�개??· full-bleed 560px · `?�료진소�?png` · #1c1917 40% ?�버?�이

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic S04 treatments (Figma 614:88)

**범위:** `template-parts/section-treatments.php` · `front-page.php` · `style.css` · `inc/assets.php`  
**?�용:** SIGNATURE · ?�??진료 · 2??비�?�?그리??754+327+327) · 카드 400px r16 · ?�단 그라?�이??· ?�벨 28px white · 6진료 ?��?지 ?�결(?�성?�술=?�술???�시)

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic S02 floating · S03 symptom (Figma 614:46 · 614:61)

**범위:** `template-parts/section-today-status.php` · `template-parts/section-symptom.php` · `front-page.php` · `style.css` · `inc/assets.php`  
**?�용:** S02 ??hero ?�단 50px 겹침 ?�로??카드(1440×100 · #f8f8f8 · r12 · pad 70 · 공�? CPT) · `hero-float-wrap` · S03 ??SYMPTOM FINDER · 3×2 카드 6??�� · #f8f5f1 · pad 160/100 · dev-preview ?�거

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic Hero (Figma 614:22)

**범위:** `template-parts/section-hero.php` · `front-page.php` · `style.css`  
**?�용:** S01 hero ??`kv.png` full-bleed 800px · ?��?그라?�이???�버?�이(40??0% black ×0.9) · ?�?��? 64/76.8 w700 · 본문 24/36 w400 80% white · gutter 240 · CTA ?�음(Figma 기�?) · @1024/@768 object-position·min-height

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic Header · Footer (Figma 652:69 · 652:84)

**범위:** `header.php` · `footer.php` · `style.css` · `inc/assets.php` · `assets/js/main.js`  
**?�용:** Figma S00/S10 ??로고·GNB gap 40·진료 ?�담 pill CTA · ?�터 SNS·?�업???�보·?��? 링크 · @1024 ?�버�?· placeholder `#`

---

## 2026-07-07 ??[wordpress] 365-hes-womens-clinic 로컬 ?�스???�전?�업

**범위:** `wordpress/365-hes-womens-clinic/` ??`style.css` · `functions.php` · `header.php` · `footer.php` · `front-page.php` · `index.php` · `archive-notice.php` · `single-notice.php` · `inc/*` · `assets/js/main.js` · `template-parts/*` · `README.md`  
**?�용:** Theme Header·SUIT enqueue·`notice` CPT·공�? �?S02)·?�더/?�터 ?�레?�스?�?�·dev-preview ?�시 메인. Figma 614:4 기�? ?�큰. `verify-wordpress-static.js` PASS.

---

## 2026-07-07 ??[wordpress] 365-barun-dental ?�라???�담 3?�이지 (PC)

**범위:** `page-consultation*.php` · `template-parts/consultation/*` · `inc/consultation.php` · `style.css` · `main.js` · `header.php` · `inc/assets.php`  
**?�용:** Figma `504:136` 목록 · `538:148` ?�세 · `511:140` ?�성. ?�더 ?�담·?�약 ??`/consultation/` 링크. assets ?�이콘·서브히?�로 ?�결. **미리보기:** `inc/consultation-pages.php`�?WP ?�이지 3�??�동 ?�성 · URL?� `get_permalink()` ?�용.

---

**범위:** `header.php` · `style.css` · `assets/js/main.js` · `decision-log`  
**?�용:** `gnb-full-expand` ?�거 · ??���?`.site-header__dropdown` ?�널 + `initHeaderDropdown()` 복원. gap+15·??0%·?�기220ms·overlap 12px·left ??6px ?��?.

---

## 2026-07-07 ??[project] `gnb-full-expand` 규칙·로그 ?�정 (barun 구현 반영)

**범위:** `46-interaction-presets.mdc` · `45-interaction-patterns.mdc` · `interaction-presets-guide.md` · `samples.manifest.json` · `decision-log.md`  
**?�용:** ?� ?�널 구현?�서 ?�정???�작??규칙????기본 ?�힘(`hidden`+`display:none`) · ?�림 ??rAF ?�렬 · ?�벨 기�? ?�롯 · ??배경 박스 금�? · sublink padding 0 · barun gap+15·??0%·?�기220ms�?decision-log???�합

---

## 2026-07-07 ??[wordpress] 365-barun-dental GNB ??gnb-full-expand (구현)

**범위:** `header.php` · `style.css` · `assets/js/main.js`  
**?�용:** 공용 메�??�널 · ?�렬·간격·박스 ?�거 ??UI ?�정. ?�턴 ID·?�치??`decision-log` GNB ??��.

---

## 2026-07-07 ??[project] GNB 2depth ?�턴 카탈로그 추�?

**범위:** `46-interaction-presets.mdc` · `45-interaction-patterns.mdc` · `_docs/interaction-presets-guide.md` · `_harness/interaction-samples/samples.manifest.json` · `interaction-samples/README.md`  
**?�용:** `gnb-full-expand`(?�안과형 ?�체 ?�침) · `gnb-item-panel`(??���??�널) ?�의·구현 ?�약·?�브 manifest 2�? ?�렬·?�·�??�밍?� Figma/decision-log. ?�플�?header??1?�턴�?

---

## 2026-07-07 ??[wordpress] 365-barun-dental GNB 2depth (PC)

**범위:** `header.php` · `inc/assets.php` · `style.css` · `main.js` · `decision-log`  
**?�용:** Figma `583:54` + 주석 기�? GNB 6??�� · 2depth ?�널 4�?· ?�랑?�·턱관??직링??· ??80% · close delay 220ms · URL `#` · 모바???�식 보류

---

## 2026-07-07 ??[wordpress] 365-barun-dental README ?�래??�?
**범위:** `wordpress/365-barun-dental/README.md`  
**?�용:** 메인 DOM·공통 shell/?�더 ?�턴·?�터?�션·?�션�??�래?�·서브페?��? 체크리스??참조 문서 추�?

---

## 2026-07-07 ??[project] scroll-reveal ?�장 ?�위 ?�로?�트 기본�??�정

**범위:** `46-interaction-presets.mdc` · `45-interaction-patterns.mdc` · `interaction-presets-guide.md` · `50-qa-checklist.mdc` · `_docs/qa-checklist.md` · `decision-log` · `70-wordpress.mdc`  
**?�용:** 카드=루트 ?�째 ?�장 · ?�드·비카??본문=?��? ?�장 · 카드 ?�식 scroll-reveal 금�? · QA 체크리스??반영

---

## 2026-07-06 ??[wordpress] 365-barun-dental scroll-reveal 카드 ?�위 ?�합

**변�?** 카드 ?��?�??�장?�던 문제 ?�정 ???�처?�·�??�어·info·matrix·process·space·digital ?�진/??? **카드 ?�체** `scroll-reveal` · ?�드·philosophy 본문?� �??�위 ?��?

---

## 2026-07-06 ??[wordpress] 365-barun-dental scroll-reveal ?��? ?�위 ?�정

**범위:** section template-parts · `main.js` · `style.css`  
**변�?** band/블록 묶음 ?�거 · ?�벨·?�목 줄·본문·번?�·사진·캡?�·매?�릭????�� **?�소마다** `scroll-reveal` · JS ???�소 개별 ???�차 ?�장

---

## 2026-07-06 ??[wordpress] 365-barun-dental 추천 ?�터?�션 preset ?�용

**범위:** `main.js` · `style.css` · `inc/assets.php` · header · section template-parts  
**preset:** `scroll-reveal` · `hover-tone` · `image-scale-hover` · `button-text-slide-hover`  
**?��?:** digital ???�릭·opacity (Figma 주석)

---

## 2026-07-06 ??[wordpress] 365-barun-dental reservation CTA ?�션

**범위:** `template-parts/section-reservation.php` · `front-page.php` · `style.css`  
**Figma:** `453:582` 07_Reservation CTA / Conversion  
**변�?** 가?�데 ?�렬 eyebrow·?�목 2�?· CTA 2버튼(카카?�톡·게시?? · green 11% BG · Space?�Footer ?�이 배치

---

## 2026-07-06 ??[wordpress] 365-barun-dental space ?�션

**범위:** `template-parts/section-space.php` · `front-page.php` · `style.css` · `inc/assets.php`  
**Figma:** `453:543` 06_Space / Clinic Gallery  
**변�?** ?�더 + 4??갤러�?카드(500:420) · caption overlay 80% · gap 24 · imageRef 매핑 · fluid clamp · ?�블릿·모바일 보류

---

## 2026-07-06 ??[wordpress] 365-barun-dental digital 2???�이?�웃 ?�정

**범위:** `style.css`  
**?�인:** `var(--digital-media-fr)fr` ??CSS?�서 `fr` ?�위?� 변??조합 불�? ??그리??무효·?�하 ?�택  
**변�?** `grid-template-columns: 908fr / 532fr` (Figma 908+532=1440)

---

## 2026-07-06 ??[wordpress] 365-barun-dental digital ?�션

**범위:** `template-parts/section-digital.php` · `front-page.php` · `style.css` · `assets/js/main.js` · `inc/assets.php` · `functions.php`  
**Figma:** `453:516` 05_Digital / Clinical Environment  
**변�?** ?�더 + 2??908 ?��?지 + 532 리스?? · 4??��·구분??gap 54 · ??�� ?�릭 ???��?지 교환 · fluid clamp · ?�블릿·모바일 보류  
**?��?지:** 01 scanner · 02 imaging · 03 examination · 04 treatment-room(?�시)

---

## 2026-07-06 ??[wordpress] 365-barun-dental process 번호 ?�파

**범위:** `style.css`  
**Figma:** `462:54` step-number · `#0d422e` opacity **0.15**  
**변�?** 번호 ??`rgba(13,66,46,0.15)` (기존 `#0d422e` 100% ?�류)

---

## 2026-07-06 ??[wordpress] 365-barun-dental process ?�션

**범위:** `template-parts/section-process.php` · `front-page.php` · `style.css`  
**Figma:** `453:478` 04_Process / Patient Journey  
**변�?** ?�더 + 5?�계 카드 그리??· bg `#f8f8f8` · 카드 pad 24 · gap 24/12/8 · fluid clamp · ?�블릿·모바일 보류  
**부가:** treatments 매트�?�� 번호 고정??44px 롤백 (gap 12�??��?)

---

## 2026-07-06 ??[wordpress] 365-barun-dental treatments 2×2 ?�자 간격

**범위:** `style.css`  
**Figma:** `453:649` Treatment Item ??Index w 44 · index?�copy gap 12 · counterAlign CENTER  
**변�?** 매트�?�� 번호 고정??44px + gap 12px (?�자 ?�스?�폭�??�던 ?�류)

---

## 2026-07-06 ??[wordpress] 365-barun-dental treatments ?�처???��?지·?�스??간격

**범위:** `inc/assets.php` · `style.css` · `assets/images/03-treatments/featured-card.png`  
**Figma:** `453:409` featured-card · imageRef `35da1d25??  
**?��?지:** `treatments-featured` ??`03-treatments/featured-card.png` (기존 consultation-room ?�류)  
**간격:** ?�처??head?�본�?16px · 본문 �??�이 gap ?�거(Figma Body ?�택)

---

## 2026-07-06 ??[wordpress] 365-barun-dental treatments ?�·오버레???�합

**범위:** `style.css` · `inc/assets.php`  
**Figma:** `453:404` ???�션 fill `rgba(118,161,125,0.11)` (기존 `#76a17d` ?�류) · ?�처??overlay 45% · ?�플?�??overlay `rgba(255,255,255,0.6)` · 본문 60% · 매트�?�� 번호 ?�로 center  
**?��?지:** `treatments-featured` ??`01-hero/hero-main.png`

---

## 2026-07-06 ??[wordpress] 365-barun-dental treatments ?�션

**범위:** `template-parts/section-treatments.php` · `front-page.php` · `style.css` · `inc/assets.php`  
**Figma:** `453:404` 03_Treatments / Service Overview  
**변�?** ?�더+2???�처??620 + ?�측 796) · 카드???�플?�??400+?�방 372) · 2×2 매트�?�� 구분??24/29/28) · fluid clamp · ?�블릿·모바일 보류  
**?��?지:** `treatments-featured` ??patient-care · `treatments-implant` ??implant-illustration

---

## 2026-07-06 ??[wordpress] 365-barun-dental philosophy ?�션

**범위:** `template-parts/section-philosophy.php` · `front-page.php` · `style.css`  
**Figma:** `474:877` 02_Philosophy / Care Principles  
**변�?** 2???�개+3?�칙 리스?? · fluid clamp · @1024 1???�택

---

# Change Log

## 2026-07-08 ? [reference-harness] ptmd869920 PURE BLANC Track C

**����:** `_reference-harness/cases/ptmd869920/` only  
**Ʈ��:** C (browser-captured) �� ����/working/map **�� ��**  
**�ҽ�:** https://d.cafe24.com/sample?productCode=PTMD869920 �� ecudemo391069  
**����:** 1920/390 ĸó �� analysis �� browser-capture QA PARTIAL

## 2026-07-06 ??[wordpress] 365-barun-dental typography · SUIT 가?�드

**범위:** `style.css` · `functions.php` · 메인 ?�이지 ???�션  
**변�?** Pretendard ??**SUIT** CDN · `:root` type scale ?�큰 · eyebrow/본문/?�터 ?�·크�?가?�드 ?�합 · Space H1 48/62 · Digital H4 18/28 · Treatments 카드 H3 24/32 · Hero 본문 17/30

---

## 2026-07-06 ??[wordpress] 365-barun-dental digital ??opacity 주석 반영

**범위:** `style.css` · Digital `453:516`  
**Figma 주석:** ???�릭 ???�성 `opacity:1` · 비활??`0.3` · 좌측 ?��?지 ?�환 · 기본 01 ?�성  
**변�?** `.section-digital__item` 비활??0.3 · `.is-active` 1 (?��?지 ?�환·기본 01?� 기존 구현)

---

## 2026-07-06 ??[wordpress] 365-barun-dental footer logo ?�로고침 ?�라�??�정

**범위:** `footer.php` · `style.css` · `assets/images/logos/footer-logo.png`  
**?�인:** 로고 PNG 1774×887(검???�백 과다) + `height:auto`/`object-fit` 충돌�??�로고침 ???�더 불안?? 
**변�?** PNG ?�롭·검?�→?�명(1573×309) · 로고 wrapper + Figma 258×58 고정 · `loading=eager`

---

## 2026-07-06 ??[wordpress] 365-barun-dental hero / KV

**범위:** `template-parts/section-hero.php` · `front-page.php` · `style.css` · `inc/assets.php` · `header.php`  
**Figma:** `453:348` · imageRef `41f54d2c?? ??`04-process/patient-care.png`  
**변�?** KV ?�적 구현 · eyebrow/headline/desc/CTA 2�?· gradient overlay · fluid clamp · @768 ?�택

---

## 2026-07-06 ??[wordpress] 365-barun-dental assets ?�리 · 매핑

**범위:** `wordpress/365-barun-dental/assets/images/` · `inc/assets.php` · `functions.php` · `header.php` · `footer.php`  
**변�?** ?�시·?�시 ?�일�????�션�??�더·kebab-case 리네?�밍 · `barun_dental_asset_uri()` 매핑 · ?�더·?�터 로고 PNG ?�결 · JS `barunDentalAssets` ?�달  
**?�더:** `logos/` · `01-hero/` · `02-philosophy/` · `03-treatments/` · `04-process/` · `05-digital/` · `06-space/gallery/`  
**?�인 ?�요:** `smile-01.jpg`~`04.jpg` ???�리 �??�락 가??· `assets/images/06-space/gallery/`???�투??
---

## 2026-07-06 ??[wordpress] 365-barun-dental header GNB 간격 ?�정

**범위:** `style.css` · Header `453:331`  
**Figma:** 메뉴 ?� 110px · center · gap 12 · 메뉴?�CTA 16 · nav-container space-between  
**변�?** 메뉴 ??�� 고정??110 + 가?�데 ?�렬 · ?�못??logo-gap 126 ?�거 · right 그룹 flex-end/stretch ?�거

---

## 2026-07-06 ??[wordpress] 365-barun-dental footer 간격·구조 ?�면 ?�합

**범위:** `footer.php` · `style.css` · Footer `453:603`  
**Figma:** pad 96/600 · inner 720 · stack gap 24 · hours divider?�grid 24 · grid gap 16 · row gap 12 · legal pad-top 24 · meta gap 12 · copy gap 20  
**변�?** HTML 블록 구조 Figma 계층??맞춤 · ??opacity MCP ?�정�?· 카피(?�·목 ?�간·?�동�??�신빌딩) · copyright ??구분???�거

---

## 2026-07-06 ??[wordpress] 365-barun-dental header · footer

**범위:** `wordpress/365-barun-dental/` ??`style.css` · `functions.php` · `header.php` · `footer.php` · `index.php` · `front-page.php` · `assets/js/main.js` · `assets/images/*.svg`  
**Figma:** `453:331` Header · `453:603` Footer  
**변�?** ?�마 ?�캐?�드 + GNB(5메뉴·?�담·?�약 CTA) + ?�터(진료?�간·주소·?�업?�·약관 링크) · Fluid clamp · @1024 ?�버�?· verify PASS 15/15  
**미완:** Figma 로고 VECTOR ??PNG/SVG 교체 · 메뉴·CTA ??URL · 본문 ?�션 01??7

---

## 2026-06-08 ??[template] hd-ec vision box-2 type = section title

**범위:** `css/style.css`  
**변�?** ?�퀀??2 headline/desc ??`--business-title-size/lh` · weight 800 (?�업/?�로?�트/?�스�??�션 ?�?��?�??�일)

---

## 2026-06-08 ??[template] hd-ec vision box-2 type = newsroom article title

**범위:** `css/style.css`  
**변�?** ?�퀀??2 headline/desc ??`--newsroom-item-title-size/lh` · weight 600

---

## 2026-06-08 ??[template] hd-ec vision 2-step text sequence (M&S box-1/box-2)

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**?�턴:** M&S `main-company` ??box-1 ?�장·?�장 ??box-2 ?�장  
**box-2 카피:** 기술�??�시�??�결?�고??/ ?��?건설?� ?�람�?공간??· pin 2800px

---

## 2026-06-08 ??[template] hd-ec business card white arrow icon

**범위:** `index.html` · `assets/icons/icon-arrow-right-white.png`  
**변�?** ?�업?�역 CTA 4�????�색 `>` ?�이�?· 루트 loose PNG ?�리

---

## 2026-06-08 ??[template] hd-ec business card text alignment fix

**범위:** `css/style.css` · business card body/copy  
**Figma:** `205:1236` ??VERTICAL · pad 36/46 · gap 76 · primary MAX · copy 370×117 고정  
**변�?** copy min-h 117 · name min-h 82(2�?박스) · align-items flex-start · text-align left

---

## 2026-06-08 ??[template] hd-ec vision pin M&S 구조 ?�합 (2�?

**범위:** `css/style.css` · `js/main.js`  
**?�인:** scale ??구간 + 3500px + scrub 2s ??M&S ?��?과도?�게 ?�림  
**변�?** width/height 박스 ?��?(560×340?��?) · ?��?지 100vw 고정 · ?�침 구간 14% · pin 1800px · scrub 0.85s · ?�?��? y 100% ?�라?�드

---

## 2026-06-08 ??[template] hd-ec vision pin scrub HD M&S ?�합

**범위:** `css/style.css` · `js/main.js`  
**참고:** HD?��?M&S `main-company` ??`scrub:2` · `end:+=3500`  
**변�?** pin 거리 3500px · scrub 2s lerp · scale/??linear · easeOutCubic ?�거

---

## 2026-06-08 ??[template] hd-ec header scroll auto-hide

**범위:** `css/style.css` · `js/main.js`  
**?�작:** ?�크�?down ??`is-header-hidden` · up ???�시 · top(??px) ??�� ?�시 · transform slide

---

## 2026-06-08 ??[template] hd-ec vision 카드 ?�하 gutter ?�일

**범위:** `css/style.css`  
**변�?** `vision__shell` `padding: var(--layout-pad-x)` (좌우·?�하 ?�일 40px) · card `min-height` viewport 고정 ?�거

---

## 2026-06-08 ??[template] hd-ec vision 카드 ?�이 100dvh

**범위:** `css/style.css`  
**변�?** `--vision-h: 100dvh` · pin padding ?�거 · card/shell flex stretch · pin-wrap `calc(vision-h + pin-scroll)`

---

## 2026-06-08 ??[template] hd-ec hero viewport 100% (HD M&S 참고)

**범위:** `css/style.css`  
**변�?** `--hero-h: 100dvh` · header `position: fixed` overlay · ?�?��? pad `header-h + offset`

---

## 2026-06-08 ??[template] hd-ec vision catalog ??scroll-pin-scale-card

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**catalog:** `scroll-pin-scale-card` ??vision (`225:2128`)  
**?�작:** sticky pin · 카드 scale 0.32?? · overlay 0.28?? · ?�?��? 45% ?�후 fade-in · `scroll-reveal` vision ?�외 · @768/reduced-motion ?�적

---

## 2026-06-08 ??[template] hd-ec ?�터?�션 5/5 ??button-text-slide-hover

**범위:** `index.html` · `css/style.css`  
**preset:** `button-text-slide-hover` ??business CTA(4) · newsroom more · careers CTA  
**?�작:** `btn-slide-hover` · ?�스??2�?stack · hover ??translateY slide · arrow ?�이�??��?

---

## 2026-06-08 ??[template] hd-ec ?�터?�션 4/5 ??stats-counter

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**preset:** `stats-counter` ??investor panel 주�? `223,000`  
**?�작:** `#investor` IO 진입 · 0??23000 · grouping · 1600ms ease-out · 1??· reduced-motion 즉시 최종�?
---

## 2026-06-08 ??[template] hd-ec ?�터?�션 3/5 ??image-scale-hover

**범위:** `css/style.css`  
**preset:** `image-scale-hover` ??business card bg · project card bg · investor panel bg  
**?�작:** card/panel hover · img `scale(1.05)` · overflow hidden ?�레???��? · fine pointer only

---

## 2026-06-08 ??[template] hd-ec ?�터?�션 2/5 ??hover-tone

**범위:** `css/style.css`  
**preset:** `hover-tone` ??GNB · business CTA · newsroom row/btn · investor card · careers CTA · footer policy  
**?�작:** fine pointer · opacity 0.85 (링크/버튼) · investor card `brightness(0.96)` · transform ?�음

---

## 2026-06-08 ??[template] hd-ec ?�터?�션 1/5 ??scroll-reveal

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**preset:** `scroll-reveal` ??vision · business · projects · newsroom · investor · careers (hero/header/footer ?�외)  
**?�작:** ?�션 진입 ???�목?�카???�차 ?�장 · 180ms stagger · IO threshold 0.1 · reduced-motion 즉시 ?�시

---

## 2026-06-08 ??[template] hd-ec assets ?�리 · ?�이콘·investor panel ?�결

**범위:** `index.html` · `css/style.css` · `assets/`  
**icons:** `Arrow - Down 2 - Iconly Pro.png` ??`assets/icons/icon-arrow-right.png` · business/newsroom/careers ?�라??SVG ??`<img>`  
**investor:** `9d4aeb5b?? ??`assets/images/investor-panel.png` · HTML 경로 갱신  
**?�리:** `assets/` 루트 ?�시 PNG·중복 jpg/mp4·�?header/hero ?�일 ??�� · `images/` 중복 jpg(business·vision·investor) ?�거

---

## 2026-06-08 ??[template] hd-ec careers section static (Figma 231:2187)

**범위:** `index.html` · `css/style.css`  
**Figma:** gutter 40 · card **1840×304** · `#d9d9d9` · r16 · title **30/700** center · CTA border `#1a1a1a` r6 **20/500**

---

## 2026-06-08 ??[template] hd-ec footer ?�딩 본문 gutter ?�일

**범위:** `css/style.css`  
**변�?** footer `padding-inline: var(--layout-pad-x)` (40px @1920) ??`business__shell` ?�과 ?�일 · 240px ?�용 규칙 ?�거

---

## 2026-06-08 ??[template] hd-ec footer 좌우 마진 ?�수??(pad-x 240)

**범위:** `css/style.css`  
**Figma:** frame `padding 96/240` · inner **1920** cap · content **1440**  
**변�?** `--footer-pad-x: clamp(20px, 12.5vw, 240px)` + `footer__inner` padding-inline

---

## 2026-06-08 ??[template] hd-ec ?�용???�셋 ?�결 (hero video · business · vision)

**범위:** `index.html` · `css/style.css` · `assets/videos/` · `assets/images/`  
**hero:** `assets/videos/hero-bg.mp4` (autoplay · muted · loop) · poster `hero-bg.jpg`  
**business:** Figma ref ??`business-card-01~04.png` (?�프?�·건축·주?�·에?��?)  
**vision:** `ea3951cf?? ??`vision-card.png`  
**investor panel:** Figma ref `9d4aeb5b?? ?�일 미확????`investor-panel.jpg` placeholder ?��?

---

## 2026-06-08 ??[template] hd-ec footer 좌우 마진 ?�정

**범위:** `css/style.css`  
**Figma:** 콘텐�?**1440px** @1920 ??좌우 **240px** (`(1920-1440)/2`)  
**변�?** `padding-inline: 240` ?�거 ??`max-width: 1440` + `margin: auto` (ultrawide ?�함 ?�일 비율)

---

## 2026-06-08 ??[template] hd-ec footer section static (Figma 244:2298)

**범위:** `index.html` · `css/style.css` · `assets/images/footer-logo.png` (placeholder)  
**Figma:** bg `#f3f4f5` · pad **96/240** · logo **192×38** · policy **16/700** · meta **16/500** `#151414`

---

## 2026-06-08 ??[template] hd-ec investor ?�이?�웃 flex 비율 ?�구??
**범위:** `css/style.css`  
**Figma Auto Layout:** `1374:442` · ?�별 `597:753` / `753:597` · ?�이 **417** · ?�널 **858**  
**변�?** CSS Grid/`fr` ?�거 ??Figma grow 비율 flex (`1374/442`, `597/753`)

---

## 2026-06-08 ??[template] hd-ec investor 카드 ?�기 Figma ?�정

**범위:** `css/style.css`  
**Figma:** layout **1374:442** · 카드 ??**417px** · ??**597:753** / **753:597** · ?�널 **858px** (=417×2+24)  
**변�?** `aspect-ratio` ?�거 ????고정 ?�이 + fr 비율 그리??
---

## 2026-06-08 ??[template] hd-ec projects 가�??�크�?복원 · scrollbar ?��? · drag-scroll

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**변�?** 1063×561 가�??�랙 복원 · `scrollbar-width: none` · `drag-scroll` preset (`data-projects-scroll`) · jQuery CDN

---

## 2026-06-08 ??[template] hd-ec investor section static (Figma 224:2080)

**범위:** `index.html` · `css/style.css` · `assets/images/investor-panel.jpg` (placeholder)  
**Figma:** `?�자?�보` · gutter 40 · title 42/800 · 4 cards #f3f6fa (597/753 비율) · panel 442×858 · overlay 20% · stock 55/800

---

## 2026-06-08 ??[template] hd-ec projects 가�??�크�??�거

**범위:** `index.html` · `css/style.css`  
**변�?** `projects__scroll` ?�거 ??`projects__grid` 4??flex · 카드 `aspect-ratio: 1063/561` · @1024 2??· @768 1??
---

## 2026-06-08 ??[template] hd-ec business·projects·newsroom Figma ?�정

**범위:** `css/style.css`  
**business:** 카드 `aspect-ratio: 442/588` (min-height ?�거 ??ultrawide 비율 짧음 ?�정)  
**projects:** date **600** · name **700** ?�큰 명시  
**newsroom:** ??stroke **bottom�?* (`individualStrokeWeights` Figma ?�치) · ?�방 border ?�거

---

## 2026-06-08 ??[template] hd-ec newsroom section static (Figma 212:2037)

**범위:** `index.html` · `css/style.css`  
**Figma:** `?�스�? · gutter 40 · title 42/800 · row 128px border #ededed · date 60% · CTA 중앙

---

## 2026-06-08 ??[template] hd-ec projects section static (Figma 212:1419)

**범위:** `index.html` · `css/style.css` · `assets/images/project-card-01~04.jpg`  
**Figma:** `?�???�로?�트` · gutter 40 · title 42/800 · 가�?카드 1063×561 gap 24 · overflow-x scroll  
**?�정:** vision `.vision__title` 중복 CSS 블록 ?�거

---

## 2026-06-08 ??[template] hd-ec business section static (Figma 207:1313)

**범위:** `index.html` · `css/style.css` · `assets/images/business-card-01~04.jpg`  
**Figma:** `?�업?�역` · gutter 40 · title 42/800 · 4 cards 442×588 gap 24 · overlay 40% · btn border white  
**Shell:** guttered (vision�??�일 pad ?�턴)

---

## 2026-06-08 ??[template] hd-ec shell ?�???�리 (Figma MCP)

**범위:** `index.html` · `css/style.css`  
**Shell:** hero full-bleed · vision full shell + `section-shell--gutter` · header guttered  
**공통:** `.section-shell` · `.section-shell--gutter` · `.is-bleed-x` · `--layout-pad-x` 40

---

## 2026-06-08 ??[template] hd-ec header·hero·vision ?��???+ ?�셋 ?�결

**범위:** `index.html` · `css/style.css` · `assets/images/`  
**?�셋:** `header-logo.png` · `header-globe.png` · `hero-bg.jpg` (?�용???�공)  
**?�정:** hero overlay **32%** · GNB letter-spacing 0 · lang PNG · vision card radius 16px · vision **좌우 40px + 카드 채�?** · ?�션 간격 180px · placeholder 경로 ?�리  
**미제�?** vision 카드 배경 (`225:2129` imageRef) ??`vision-card.jpg` placeholder ?��?

---

## 2026-06-08 ??[template] hd-ec vision section static (Figma 225:2128)

**범위:** `templates/hd-ec/` · `index.html` · `css/style.css` · `assets/images/vision-card.jpg`  
**Figma:** `비전` (`225:2128`) · card `225:2129` 1840×900 · overlay 60% · title 56px center  
**?�용:** pin/scrub ?�이 최종(100%) ?�적 ?�이?�웃 · placeholder 배경

---

## 2026-06-08 ??[template] hd-ec header + hero static (Figma 199:951)

**범위:** `templates/hd-ec/` · `index.html` · `css/style.css` · `js/main.js` · assets  
**Figma:** `portfolio_HD_E&C_main` (`199:951`) · header `231:2166` · hero `220:2078`  
**?�용:** ?�터?�션 ?�이 ?�더(128px·GNB 6·?�어 버튼) + hero(900px·70px ?�?��?) PC ?�적 구현 · hero placeholder(picsum) · 로고 placeholder SVG · **GNB ?�더 ?�체 ?�비 중앙 ?�렬** (`Frame 69` cx 961)

---

## 2026-06-08 ??[docs] infinite-text-marquee 참고 카탈로그 추�?

**범위:** `_docs/interaction-presets-guide.md` · `samples.manifest.json`  
**추�?:** `infinite-text-marquee` ??HD?��?M&S ?�업?�개 `.bg-txt` CSS 마키

---

## 2026-06-08 ??[docs] interaction-presets-guide 묘사·참고 카탈로그 6�?반영

**범위:** `_docs/interaction-presets-guide.md`  
**?�용:** ?��? preset 10�?«묘사» ??추�? · 참고 카탈로그(?�손·HD 6�? ?�션 추�?

---

## 2026-06-08 ??[harness] interaction catalog ?�손 4�?추�? + description ?�드

**범위:** `_harness/interaction-samples/` manifest · hub.js · hub.css · README  
**추�?:** `intro-pin-scrub-hero` · `scroll-pin-multi-step` · `scroll-enter-act-reveal` · `css-3d-flip-card`  
**?�용:** ????�� `description`(?�세 묘사) ?�드 · ?�브 카드??summary/description/howToTest 3???�시

---

## 2026-06-08 ??[harness] interaction catalog ?�리 (로컬 ?�리�???��)

**범위:** `_harness/interaction-samples/`  
**??��:** `3d-carousel-ring/` · `scroll-pin-scale-card/` · `embed-mode.js`  
**?�용:** 로컬 ?�플 HTML ?�거 · manifest 참고 URL 목록 + ?�브 검??UI�??��?

---

## 2026-06-08 ??[harness] interaction hub iframe ?�거 ??리스???�창

**범위:** `_harness/interaction-samples/` index · hub.css · hub.js · README  
**?�용:** iframe/?�체?�면 미리보기 ?�거 · ?�플 카드 ?�릭 ??`window.open` ??�?
---

## 2026-06-08 ??[harness] interaction hub 미리보기 개선 (embed · ?�체?�면)

**범위:** `_harness/interaction-samples/` hub · 3d-carousel · scroll-pin  
**?�용:** iframe `embed=1` 축소 모드 · ?�체?�면 미리보기 · 3D �?overflow·?��???조정

---

## 2026-06-08 ??[harness] interaction-samples ?�브 (manifest · 미리보기 · 검??

**범위:** `_harness/interaction-samples/` · `_harness/index.html` · `_harness/README.md`  
**?�용:** `samples.manifest.json` ?�본 · ?�브 UI(목록+iframe) · PASS/HOLD/REJECT localStorage · ?�터

---

## 2026-06-08 ??[harness] interaction-samples 목록·?�브

**범위:** `_harness/interaction-samples/README.md` · `index.html` · `_harness/README.md`  
**?�용:** 3d-carousel-ring · scroll-pin-scale-card 카탈로그 ?�록 · ?�플 ?�브 ?�이지

---

## 2026-06-08 ??[harness] interaction sample scroll-pin-scale-card

**범위:** `_harness/interaction-samples/scroll-pin-scale-card/`  
**?�용:** HD?��?M&S `main-company` ?�턴 ?�로?��?????pin + scrub · 배경 카드 30%?��? · ?�스???�차 ?�장

---

## 2026-06-08 ??[harness] interaction sample 3d-carousel-ring

**범위:** `_harness/interaction-samples/3d-carousel-ring/`  
**?�용:** ?�손 PROJECTS ?�턴 CSS 3D ring carousel ?�플 (10 cards · rotateY/translateZ · drag/snap)

---

## 2026-06-08 ??[template] skhynix-redesign hero title 90px (Figma ?�정 반영)

**범위:** `css/style.css` ??hero title font-size · line-height only  
**Figma:** hero copy · **90px** @1920 (기존 60px ?�독 ?�정)  
**?�용:** `clamp(45px, 4.6875vw, 90px)` · lh `clamp(58.5px, 6.09375vw, 117px)` (1.3 비율)

---

## 2026-06-08 ??[template] skhynix-redesign products ?�?��? 공통 컬러 ?�턴

**범위:** `index.html` · `css/style.css`  
**Figma:** `149:336` · news/heritage?� ?�일 ??38/700 `#151414` + accent `#ff7a00`  
**?�용:** ?�못 ?�용??`--color-text-subtle-30` muted ?�거 · accent ??`--color-text` ?�속

---

## 2026-06-08 ??[template] skhynix-redesign products ?�?��? muted 공통 ?�용

**범위:** `index.html` · `css/style.css`  
**Figma:** `149:336` · non-accent = `--color-text-subtle-30`  
**?�용:** `??` muted span ?�락 ?�정 · `.section-title__muted` 공통??products ?�용 ?�택???�거)

---

## 2026-06-08 ??[template] skhynix-redesign hero intro ??products auto-scroll

**범위:** `js/main.js`  
**?�용:** hero intro 1???�료 ??`#products` ?�동 ?�크�?· magnetic snapTo ?�동 · reduced-motion ?�일

---

## 2026-06-08 ??[template] skhynix-redesign hero title size (Figma 149:465)

**범위:** `css/style.css` ??hero title font-size only  
**Figma:** `149:465` · 1920 ??60px (`3.125vw`)  
**?�용:** Kakao 6.25vw/브레?�크?�인??override ?�거 ??`clamp(32px, 3.125vw, 60px)`

---

## 2026-06-08 ??[template] skhynix-redesign products ?�션 ?�?��? Figma ?�정

**범위:** `index.html` · `css/style.css`  
**Figma:** `149:336` · copy·accent·2�?muted  
**?�용:** `보이지 ?�는 기술??` / `AI???�도�?만듭?�다.` · 2�?`--color-text-subtle-30` · `font-weight: 400`

---

## 2026-06-08 ??[template] skhynix-redesign hero mask coords + scroll-down remove

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**?�용:** maskRect 좌표 카카?�뱅??viewport 비율(0.48x · 50vh-Yoffset) + SVG transform attr 방식 복원 · hero scroll-down 버튼 ?�거

---

## 2026-06-08 ??[template] skhynix-redesign hero Kakao clipPath restore

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**?�용:** div mask-window ?�거 ??카카?�뱅??구조 복원(default-wrap + mask-wrap 고정 ?�스??· SVG clipPath scale) · mirror JS ?�치 보정 ?�거

---

## 2026-06-08 ??[template] skhynix-redesign hero expand no-scale

**범위:** `css/style.css` · `js/main.js`  
**?�용:** scale ?��? ?�거 ??pill?�fullscreen layout clip ?�장(?�상 ?�?�이�?고정) · expand �?mirror fade-out

---

## 2026-06-08 ??[template] skhynix-redesign hero expand perf

**범위:** `css/style.css` · `js/main.js`  
**?�용:** ?��? 구간 layout ?�계??onUpdate ?�거 · rest 고정 ??GSAP scale(GPU) · coverScale · 종료 ??fullscreen ?�냅

---

## 2026-06-08 ??[template] skhynix-redesign hero div mask window

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**?�용:** SVG clipPath ?�거 ??div mask-window · ?�상/ mirror ?�도???�프???�기??· pill ?��? 좌표 live rest 측정

---

## 2026-06-08 ??[template] skhynix-redesign hero mask pixel-sync

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**?�용:** hero__stage ?�이??분리 · mirror absolute+getBoundingClientRect ?��? ?�기??· clip SVG mask ?�이???��? · 줄별 cover height sync · onUpdate 추적

---

## 2026-06-08 ??[template] skhynix-redesign hero mask align fix (root)

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**?�용:** clipPath 좌표 ??mask-wrap 기�? ?�계??· dual layer flex center ?�일 · mirror width sync · CSS/GSAP transform 충돌 ?�거

---

## 2026-06-08 ??[template] skhynix-redesign hero copy·mask align

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**?�용:** hero 카피 변�?· 마스??rect DOM 측정(?�?��? 중심·?�이) · default/mask ?�스???�이???�렬 ?�일

---

## 2026-06-08 ??[template] skhynix-redesign hero auto-play intro

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**?�용:** scroll scrub ?�거 ??�?진입 GSAP auto-play · hero 100svh · ScrollTrigger CDN ?�거 · intro ?�생 �?magnetic snap 차단 · scroll-down ??products

---

## 2026-06-08 ??[template] skhynix-redesign hero Kakao Bank mask reveal

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**?�용:** 카카?�뱅??main-visual ?�턴 ??중앙 ?�렬 6.25vw ?�?��? · SVG clipPath pill mask · scroll scrub(GSAP+ScrollTrigger) · 200svh sticky · magnetic snap hero reveal 구간 추�? · scroll-down 버튼

---

## 2026-06-08 ??[template] skhynix-redesign scroll-reveal ?�션 ?�냅 ?�동

**범위:** `js/main.js`  
**?�용:** 로드 ?�괄 ?�장 ?�거 · magnetic snap ?�료 ???�당 ?�션 reveal · ?�탈 ??reset · news 카드 `is-revealed` ?�거 · heritage digit roll snap ?�동

---

## 2026-06-08 ??[template] skhynix-redesign ???�션 magnetic scroll

**범위:** `js/main.js`  
**?�용:** hero~footer 7?�냅 ????down/up ?�션 ?�위 ?�동 · PC only · 민감???��?

---

## 2026-06-08 ??[template] skhynix-redesign hero magnetic scroll

**범위:** `js/main.js`  
**?�용:** PC · hero ??`#products` ??1???�냅 · products 진입????up ??top 복�?

---

## 2026-06-08 ??[template] skhynix-redesign hero scale-out ?�거

**범위:** `css/style.css` · `js/main.js`  
**?�용:** 카피 scale-out(`.is-hero-exiting`) ?�거 · 줄별 slide-up�??��?

---

## 2026-06-08 ??[template] skhynix-redesign hero ?�딩·카피 ?�렬 (Figma 149:465)

**범위:** `css/style.css` ??hero only  
**?�용:** pad 114/240/114/240 · copy ?�단·좌측 · 1440px · 2�?LEFT · `#f8f9fb`

---

## 2026-06-08 ??[template] skhynix-redesign hero mp4 구간·?�롭

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**?�용:** YouTube ??`assets/hero.mp4` · 00:00??0:10 ??01:16??1:19 루프 · scale 1.32 + object-position (?�단 ?�막 ?�롭)

---

## 2026-06-08 ??[template] skhynix-redesign hero YouTube 배경

**범위:** `index.html` · `css/style.css`  
**?�용:** hero ??YouTube `rpmUKAh1Z0w` iframe cover · autoplay/mute/loop · 밝�? overlay 20%

---

## 2026-06-08 ??[template] skhynix-redesign hero 카피 scale-out

**범위:** `css/style.css` · `js/main.js`  
**?�용:** slide-up ?�료 ??1s ?��? ??`.hero__copy` scale(1.12) + opacity 0 (1s)

---

## 2026-06-08 ??[template] skhynix-redesign hero 줄별 slide-up

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**?�용:** hero ?�?��? 2�???mask + `translateY(100%??)` · load ??`.is-hero-ready` · 줄별 delay (brainall.kr ?�턴)

---

## 2026-06-08 ??[template] skhynix-redesign heritage ?�?�식 digit roll

**범위:** `index.html` · `js/main.js` · `css/style.css`  
**?�용:** heritage stats ??`stats-counter` ???�릿?�별 ?�·아??교차 롤링 (`data-digit-roll`)

---

## 2026-06-08 ??[template] skhynix-redesign products·heritage 카드 hover lift

**범위:** `css/style.css` ??`#products` · `#heritage` 카드 PC hover `translateY` lift

---

## 2026-06-08 ??[template] skhynix-redesign news ?�이지?�이??콘텐�?30�?
**범위:** `index.html` · `js/main.js`  
**?�용:** 5?�이지 × 6카드(3×2) JS ?�성 · ??�필???�환 ??그리???�더

---

## 2026-06-08 ??[template] skhynix-redesign ?�터?�션 Package B ?�용

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**preset:** `scroll-reveal`(products·heritage·sustainability·news·investor) · `stats-counter`(heritage) · `hover-tone`(product/news/investor card · filter/tab/link) · `drag-scroll`(sustainability ?��?) · news filter/pagination JS · `scroll-behavior: smooth`

---

## 2026-06-08 ??[template] skhynix-redesign CSS 공통 ?�큰·?�틸 ?�리

**범위:** `css/style.css`  
**?�용:** opacity `--color-text-subtle-*` · typography `--fs-card-title` / `--fs-body-md` / `--fs-body-sm` · `.section` pad · `.section-head-row` · `.flex-grid-row` · `.card-surface` 그룹??· ?�션�?중복 ?�큰 ?�거

---

## 2026-06-08 ??[template] skhynix-redesign footer ?�스??opacity 명시

**범위:** `css/style.css` ??footer policy · address · copyright  
**Figma:** policy 16/700 `#151414` op1 · address 16/500 op0.8 · copyright 16/500 op0.9

---

## 2026-06-08 ??[template] skhynix-redesign section-footer

**범위:** `index.html` · `css/style.css` ??section-footer (`154:940`)  
**Figma:** bg `#f3f4f5` · pad 96/240 · logo 170×89 · logo?�content gap 38 · policy 16/700 gap16 · address 16/500 op0.8 gap16 · copyright 16/500 op0.9

---

## 2026-06-08 ??[template] skhynix-redesign section-investor

**범위:** `index.html` · `css/style.css` ??section-investor (`109:152`)  
**Figma:** title 38/700 (accent ?�음) · head gap 57 · card 464×288 r26 pad 46/36 · inner gap 100 · label 14/700 accent · title 25/600 lh41 · desc 20/500 op0.9

---

## 2026-06-08 ??[template] skhynix-redesign section-news ?�수 Figma 검??
**범위:** `css/style.css` · `index.html` · qa-log  
**결과:** MCP ?�수 ?��?PASS · filter `min-height: 32px` 보완

---

## 2026-06-08 ??[template] skhynix-redesign section-news card meta opacity

**범위:** `css/style.css` ??`.news-card__category` · `.news-card__date`  
**Figma:** 16/500 `#151414` fill opacity **0.9** · dot separator opacity **1** (?��?)

---

## 2026-06-08 ??[template] skhynix-redesign section-news filter ???�렬

**범위:** `css/style.css` ??filter active 밑줄  
**?�슈:** active�?`border-bottom` ???�스??1px ?�로 밀�? 
**?�정:** 공통 `padding-bottom: 6` · 밑줄 `box-shadow: inset` (?�이?�웃 ?�향 ?�음)

---

## 2026-06-08 ??[template] skhynix-redesign section-news tab opacity

**범위:** `css/style.css` ??inactive opacity Figma 반영  
**Figma:** filter inactive text `#151414` **0.2** · pagination inactive text **0.3** · pagination active bg `#ffead7` **0.4**

---

## 2026-06-08 ??[template] skhynix-redesign section-news 비선?????�성 명시

**범위:** `css/style.css` ??`.news__filter-btn:not(.is-active)` · `.news__tab:not(.is-active)`  
**Figma inactive:** filter 19/500 `#151414` pad-bottom 6 · stroke ?�음 · pagination bg null 18/400 `#151414`

---

## 2026-06-08 ??[template] skhynix-redesign section-news filter 밑줄·inactive ?�적??
**범위:** `css/style.css` ??`.news__filter-btn` · `.news__tab`  
**Figma (`154:723`):** active pad-bottom 6 · bottom stroke 1px `#ff7a00` · inactive stroke ?�음 fw500 `#151414` · pagination inactive bg null

---

## 2026-06-08 ??[template] skhynix-redesign section-news 카드 간격 ?�정

**범위:** `css/style.css` ??news card grid gap  
**Figma:** `news-cards` · `news-row-*` gap **24** (가로·세�??�일)  
**?�정:** ??간격 `--news-rows-gap` 32 ??`--grid-gap` 24 ?�일

---

## 2026-06-08 ??[template] skhynix-redesign section-news filter·pagination ?��????�정

**범위:** `css/style.css` ??news filter · news-tabs  
**Figma:** filter active `#ff7a00` fw700 · inactive `#151414` fw500 · tab active�?bg `#ffead7` + text accent fw600 · inactive bg ?�음 fw400

---

**?�정:** ????`#ffe9d6` 배경 ??Figma inactive??fill null

---

## 2026-06-08 ??[template] skhynix-redesign section-news

**범위:** `index.html` · `css/style.css` ??section-news (`109:93`)  
**Figma:** accent ?��??��? ?�한 ?�선??· filter 19px · card 464×258 r26 · title 26/600 lh42 · meta 16/500 gap8 · tabs 56 r99 `#ffe9d6`  
**?�용:** 3×2 카드 그리??· 카테고리 ?�터 · ?�단 01??5 ??(?�적)

---

## 2026-06-08 ??[template] skhynix-redesign sustainability track 좌측 shell ?�렬 ?��?

**범위:** `css/style.css` ??`--shell-content-inset` · sustainability viewport  
**?�용:** 좌측 ?�작 = section-shell 콘텐�?edge · ?�측�?viewport ?�까지 ?�장

---

## 2026-06-08 ??[template] skhynix-redesign sustainability track ?�측 full-bleed

**범위:** `css/style.css` ??sustainability viewport/track  
**?�용:** viewport `max-width`·`margin`·track `padding-right` ?�거 ??�?inset 240 ?��? · ?�측 ?�면 ?�까지 ?�크�?
---

## 2026-06-08 ??[template] skhynix-redesign sustainability nav PNG · disabled

**범위:** `index.html` · `css/style.css` · `js/main.js` · `assets/icons/icon-arrow-right.png`  
**규칙:** `45-interaction-patterns` · `interaction-presets-guide` ??�?scroll prev disabled · 마�?�?next disabled · `:disabled` opacity 0.35  
**?�용:** SVG ??PNG · scroll/resize마다 `prop("disabled")` ?�기??
---

## 2026-06-08 ??[template] skhynix-redesign section-sustainability

**범위:** `index.html` · `css/style.css` · `js/main.js` ??section-sustainability (`111:254`)  
**Figma:** head gap 57 · accent ?��??��??�한 ?�일??· esg card 952×613 · img 504 r26 · text gap 9 · track gap 24 · nav 56  
**?�용:** 5 ESG 카드 가�??�래�??�크�?· prev/next nav · img-card-1~5 매핑

---

## 2026-06-08 ??[template] skhynix-redesign HBM 카드 ?�스??side 카드?� ?�일

**범위:** `css/style.css` ??product card typography  
**?�용:** HBM ?�용 26/18 ?�?�포 ?�거 · ??카드 name 25/600 lh41 · desc 20/500 lh26

---

## 2026-06-08 ??[template] skhynix-redesign heritage stat 카드 ?�스?�·위�??�정??
**범위:** `css/style.css` ??heritage-stat card inner layout  
**Figma:** Frame 73 `SPACE_BETWEEN` · Frame 69 top-left pad 26/36 · label/desc gap 6 · value row full-width · number RIGHT + unit padB 13  
**?�용:** body `align-items:stretch` · text top-left · value bottom · body gap ?�거 · number flex:1

---

## 2026-06-08 ??[template] skhynix-redesign section-heritage

**범위:** `index.html` · `css/style.css` ??section-heritage (`142:2`)  
**Figma:** bg image opacity 0.56 · container 1440 · head gap 57 · stats 342×342 gap 24 · accent ?�SK hynix???�심?? 
**?�용:** ?�블리??bg · 4 stat 카드 · label/desc gap 6 · value 80/800 + unit offset 13px

---

## 2026-06-08 ??[template] skhynix-redesign products 카드 ?��?지 ?�하???�렬

**범위:** `css/style.css` ??product card image position  
**Figma:** Frame 73 `counterAxisAlignItems: MAX` · image inset card pad 26R/36B · HBM/DDR5 `SPACE_BETWEEN` gap 10  
**?�용:** media `justify-content/align-self: flex-end` · side gap 16 · DDR5 body `space-between`

---

## 2026-06-08 ??[template] skhynix-redesign products 카드 ?�?�포·간격 Figma ?�정??
**범위:** `css/style.css` · `index.html` ??product card title/desc gap · line-height · body gap  
**Figma:** Frame 69/74 `gap: 6` · HBM lh 34/29 · side lh 41/26 · inner gap 16 (DDR5 10)  
**?�용:** ?�?��??�서�?6px 고정 · lh px ?�큰??· side 카드 space-between ??gap 16 · `p` margin 0

---

## 2026-06-08 ??[template] skhynix-redesign page-bg · section-products

**범위:** `css/style.css` · `index.html` ??page bg `#f8f9fb` · section-products (`149:334`)  
**Figma:** container 1440 · head gap 57 · cards 586+830 bento · card `#fff` r26 · pad 36/26

---

## 2026-06-08 ??[template] skhynix-redesign header · hero ?�구??(?�션 ?�차)

**범위:** `index.html` · `css/style.css` · `js/main.js` ??header · hero only  
**Figma:** `149:307` · `149:465`  
**?�용:** ?�체 HTML 초기????header+hero�?구현 · hero `#d9d9d9` placeholder ?��?

---

## 2026-06-08 ??[template] skhynix-redesign PC 메인 ?�이지 구현 (롤백)

**범위:** ~~?�체 8?�션~~ ??header·hero부???�차 ?�진?�으�?롤백

---

## 2026-06-08 ??[template] skhynix-redesign ?�더·?�캐?�드 ?�성

**범위:** `templates/skhynix-redesign/` ??`index.html` · `css/style.css` · `js/main.js` · `assets/` · `_source/`  
**Figma:** `portfolio_skhynix_main` (`98:2344`) · ?�셋 ?�용???�입 ?��?
---

## 2026-06-08 ??[template] tesla-redesign models carousel 1920 cap (ultrawide)

**범위:** `css/style.css` ??models 카드 viewport  
**?�용:** `@769px+` viewport `max 1920px` 중앙 ?�렬 ??2560 ??ultrawide?�서 peek 과다 ?�출 방�?

---

## 2026-06-08 ??[template] tesla-redesign models peek padding ?�거 · 830px 고정

**범위:** `css/style.css` · `js/main.js` ??models 카드 ?�라?�더  
**?�용:** vw 카드·peek padding ?�거 ??**830px 고정** · viewport 100vw clip · JS `offsetLeft` 중앙 ?�렬

---

## 2026-06-08 ??[template] tesla-redesign models 카드 PC 830px 고정 · peek clip

**범위:** `css/style.css` ??models 카드 ?�라?�더  
**?�용:** PC `@769px+` 카드 **830px 고정** (vw 축소 ?�거) · viewport `overflow-x: hidden` · 중앙 1??좌우 ?�림

---

## 2026-06-08 ??[template] tesla-redesign footer ?�측 inset · nav 균등분배

**범위:** `css/style.css` ??footer  
**?�용:** `footer__main-inner` max-width ?�거 ??좌우 `--section-inset-x` 맞춤 · brand/nav space-between · nav col `flex: 1`

---

## 2026-06-08 ??[template] tesla-redesign models 카드 peek inset 100vw

**범위:** `css/style.css` ??models 카드 ?�라?�더  
**?�용:** peek inset `100%` ??`100vw` · gap 24 · `min-width` 고정 · 중앙 1??좌우 peek

---

## 2026-06-08 ??[template] tesla-redesign FSD·charging ?�복 · experience·footer inset ?�일

**범위:** `css/style.css` · `index.html`  
**?�용:** 3·4�?`--section-inset-x` ?�복 · 5번·footer `section-shell--gutter` ?�거 ???�일 `--section-inset-x` (clamp 240) ?�용

---

## 2026-06-08 ??[template] tesla-redesign FSD·charging 좌측 inset Experience ?�렬

**범위:** `css/style.css` ??section-fsd-row · section-charging-slider  
**?�용:** 좌측 `--content-inset-left` (Experience `section-shell--gutter`?� ?�일) · FSD ?�측 ?�널 `--side-padding` · charging ??pad 0

---

## 2026-06-08 ??[template] tesla-redesign models ?�?��? ?�비 카드 공통

**범위:** `css/style.css` ??`.models__header`  
**?�용:** ?�당?�을 ?�한 ?�슬?��?`max-width` ??`--models-card-width` (830px fluid) · 카드?� ?�일 ?�비

---

## 2026-06-08 ??[template] tesla-redesign experience ?�이 aspect-ratio ?�정

**범위:** `css/style.css` ??`section-experience`  
**?�용:** 고정 height clamp(800 cap) ?�거 ??`aspect-ratio: 1920/800` · Figma imageTransform 기�? `object-position: 50% 57%` · @768 min-height

---

## 2026-06-08 ??[template] tesla-redesign experience Figma ?�동�?(79:2266)

**범위:** `css/style.css` ??`section-experience`  
**Figma MCP:** `79:2266`  
**?�용:** ?�버?�이 30% · content gap 64 · CTA outline (`--fsd-panel-btn-*`) · hover fill #F0F0F0

---

## 2026-06-08 ??[template] tesla-redesign charging-slider pin ?�수??(JS ?�이·transform px)

**범위:** `css/style.css` · `js/main.js` ??charging pin  
**?�용:** pin ?�이 JS `vh*3` 고정 · track `translateY` px ?�동 · ?�라?�드 `100dvh` · `@769px` PC ?�용 · calc 변???�존 ?�거

---

## 2026-06-08 ??[template] tesla-redesign scroll-reveal ???�션 ?�장

**범위:** `index.html` · `js/main.js` ??preset `scroll-reveal`  
**?�용:** hero · models 카드 · fsd · charging(slide ?�환) · experience · footer ?��?추�? · hero 즉시 ?�장 · charging pin ?�라?�드�?reveal

---

## 2026-06-08 ??[template] tesla-redesign charging-slider JS pin 고정 복구

**범위:** `css/style.css` · `js/main.js` ??charging pin  
**?�용:** `sticky`+`overflow-x:clip` ?�슈 ??JS `fixed/absolute` pin · pin ?�이 `100dvh * 3` · reduced-motion?�서??PC pin ?��?

---

## 2026-06-08 ??[template] tesla-redesign charging-slider ?�라?�드???�크�??�동

**범위:** `index.html` · `css/style.css` · `js/main.js` ??charging pin slider  
**?�용:** fade ?�환 ?�거 ??track `translateY` ?�크�??�동 · ?�라?�드 ?�로 ?�택 · ?�래?�위 ?�라?�드??
---

## 2026-06-08 ??[template] tesla-redesign charging-slider pin scroll · 5:5 · 100dvh

**범위:** `index.html` · `css/style.css` · `js/main.js` ??`section-charging-slider` (`77:2133`)  
**Figma MCP:** slide 1?? · 960+960 · text pad 80/120/80/240 · gap 236/16 · btn outline #212121 r2  
**?�용:** pin wrapper 300dvh · sticky 100dvh · ?�크�?구간�?3?�라?�드 · 50/50 고정 · auto-timer ?�거 · `@768`/reduced-motion ?�로 ?�택

---

## 2026-06-08 ??[template] tesla-redesign fsd-row 버튼 ?�스?�·hover

**범위:** `css/style.css` ??`.fsd-panel__btn`  
**?�용:** 기본 ?�스??`--color-hero-text` · hover fill `--color-hero-text` + ?�스??`--color-text`

---

## 2026-06-08 ??[template] tesla-redesign fsd-row Figma ?�동�?
**범위:** `index.html` · `css/style.css` ??`section-fsd-row` (`75:2030`)  
**Figma MCP:** ?�널 960×430 · aspect-ratio · pad 80/120/80/240 · title gap 62 · overlay 30% · btn outline #f0f0f0 r2 18/500 pad 17/31  
**?�용:** `max-height 430` 고정 ?�거 ???�널 ?�비 비�? ?�이 · hero-btn ?��????�거 ??Figma ?�웃?�인 CTA · title lh 55 · btn-slide-hover 마크???�거

---

## 2026-06-08 ??[template] tesla-redesign models 카드 좌측 peek 복구

**범위:** `js/main.js` ??models card slider  
**?�용:** 무한 ?�크�??�환 ???�거?�던 leading clone 복구 · �??�카??index 1) 중앙 ?�작 · `getBoundingClientRect` ?�크�??�치 계산

---

## 2026-06-08 ??[template] tesla-redesign models 카드 ?�?��?·?�브 중앙 ?�렬

**범위:** `css/style.css` ??`.models-card__details` · name · desc  
**Figma MCP (`75:1970`):** model-y-title · model-y-description `textAlignHorizontal: CENTER`  
**?�용:** ?�락??`text-align: center` · details `align-items: center` 반영

---

## 2026-06-08 ??[template] tesla-redesign models 카드 ?�라?�더 무한 ?�크�?· 500ms ?�환

**범위:** `js/main.js` · `css/style.css` ??models card slider  
**?�용:** 카드 1???�환 500ms(rAF) · ?�에??처음?�로 ?�프 ?�거 · 카드 ?�트 append�??�으로만 무한 ?�크�?· scroll-snap ?�니 �??�제

---

## 2026-06-08 ??[template] tesla-redesign models 카드 CTA Figma ?�동�?
**범위:** `css/style.css` ??models-card CTA  
**Figma MCP (`75:1959`):** cta-group 311×56 중앙 · gap 16 · btn 165/130×56 · pad 17/31 · r2 · section gap 46 · text 636 · image 726×236  
**?�용:** flex 균등배치 ?�거 ??Figma 고정 간격·중앙 ?�렬 · 버튼 고정 width·stroke 반영

---

## 2026-06-08 ??[template] tesla-redesign splash ?�거 · models ?�?��? 중앙 · 카드 ?�동 ?�라?�드

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**?�용:** splash HTML/CSS/JS ?�거 · `?�신???�한 ?�슬?? text-align center · `initModelsCardSlider` 6s auto · hover pause

---

## 2026-06-08 ??[template] tesla-redesign models ?�션 ?�정 (?�석 ?�제·카드 중앙·배경)

**범위:** `index.html` · `css/style.css` · `js/main.js` ??`section-models` · hero magnetic  
**?�용:** hero magnetic scroll ?�거 · models 카드 Model Y(index 2) 중앙 ?�렬 + scroll-snap · `--color-page-bg: #f5f5f5` · body/models 배경 Figma ?�기

---

## 2026-06-08 ??[template] tesla-redesign models~footer Figma ?�면 ?�동�?
**범위:** `index.html` · `css/style.css` · `js/main.js` ??hero/header ?�외 main ?�체  
**Figma MCP:** `75:1910` models · `75:2030` fsd-row · `77:2133` charging-slider · `79:2266` experience · `26:3` footer  
**?�용:** models 가�?카드(830×551) · fsd 2??· charging 3-slide · experience ?�블리??· footer ?��? · `#technology` ?�거 · pin-scroll/technology JS ?�거 · `initChargingSlider` 추�?

---

## 2026-06-08 ??[template] tesla-redesign header Figma ?�동�?(23:866)

**범위:** `index.html` · `css/style.css` ??`section-nav` only  
**Figma MCP:** h 73 · bg `#1b1d1d` solid · pad 12/64 · logo 128×25 · menu 32×32 · nav-left 중앙 로고  
**?�용:** scrim ?�거 · gutter 240?�header 64 · absolute 로고 ??brand flex 중앙

---

## 2026-06-08 ??[template] tesla-redesign FSD ?�션 배경 ?��?지 복원

**범위:** `index.html` · `css/style.css` · `js/main.js` ??`section-fsd`  
**?�용:** `fsd.mp4` ??`assets/images/section-fsd.jpg` · `initFsdVideo` ?�거

---

## 2026-06-08 ??[template] tesla-redesign models 카드 ?�이·버튼 weight Figma ?�동�?
**범위:** `index.html` · `css/style.css` ??`section-models` · CTA  
**Figma MCP (fresh):** card **830×525** (기존 418) · btn weight **500** (hero�?700)  
**?�용:** aspect-ratio 830/525 · `--btn-font-weight` / `--hero-btn-font-weight` 분리

---

## 2026-06-08 ??[template] tesla-redesign ?�션 2번째 CTA Figma ?�합

**범위:** `css/style.css` ??secondary CTA  
**Figma MCP:** btn-demo-drive · btn-view-safety · btn-learn-more ??bg 20% · text 80%  
**?�용:** `--btn-secondary-*` ?�큰 · hero/fsd/charging/experience secondary ?�스??opacity 반영 · models Demo Drive??Figma ?�스??링크 ?��?

---

## 2026-06-08 ??[template] tesla-redesign technology active 카드 ?�장 60%

**범위:** `css/style.css` ??`section-technology`  
**?�용:** active 카드 flex 비율 1.3 ??**1.6** (+60%)

---

## 2026-06-08 ??[template] tesla-redesign models ?�더 ?�하 ?�딩 Figma 반영

**범위:** `css/style.css` ??`.models__header`  
**Figma MCP:** `8:49` models-header · `paddingTop/Bottom: 26` · title?�desc gap 24  
**?�용:** `--models-header-pad-y` 추�? · ?�션 pad-y 62??pin-sticky ?��?

---

## 2026-06-08 ??[template] tesla-redesign technology 카드 expand ?�터?�션

**범위:** `index.html` · `css/style.css` · `js/main.js` ??`section-technology`  
**?�용:** 기본 1�?카드 active(+30% flex) · hover ???�당 카드 ?�장·?�머지 축소 · active�?desc ?�출 · ?��?지 scale active ?�동

---

## 2026-06-08 ??[template] tesla-redesign models pin ???�무??보간

**범위:** `js/main.js` · `css/style.css` ??`section-models`  
**?�용:** `scrollBy` 직접 ?�출 ?�거 ??가??offset + rAF lerp · wheel delta ?�규??· transform ?�브?��? ?�동

---

## 2026-06-08 ??[template] tesla-redesign hero magnetic scroll 복구

**범위:** `js/main.js` ??`initHeroMagneticScroll` · `initModelsPinScroll`  
**?�용:** models pin `onWheel`??hero 구간까�? 가로채??버그 ?�정 · hero magnetic `stopImmediatePropagation` 복구

---

## 2026-06-08 ??[template] tesla-redesign technology wrap 중앙 ?�렬

**범위:** `css/style.css` ??`section-technology` · `section-shell--gutter`  
**?�용:** gutter shell `margin-inline: auto` · header/cards `max-width: container-max` 중앙 ?�렬 (experience ?�턴)

---

## 2026-06-08 ??[template] tesla-redesign models ?�더 겹침·pin ???�역 ?�동

**범위:** `css/style.css` · `js/main.js` ??`section-models`  
**?�용:** sticky `top: header-height` · pin ?�이 `100dvh - header` · pin 구간 ???�디?�든 `scrollBy`�?카드 진행 · `overscroll-behavior: contain` ?�거

---

## 2026-06-08 ??[template] tesla-redesign technology 카드 wrap ?��? ?�적 배치

**범위:** `index.html` · `css/style.css` · `js/main.js` ??`section-technology`  
**Figma MCP:** `23:732` ??`technology-cards` 1440×352 · 카드 464×352 ×3 · gap 24  
**?�용:** `is-bleed-x`·가�??�크롤·드?�그 ?�거 ??`section-shell--gutter` ??3??flex · 카드 비율 464/352

---

## 2026-06-08 ??[template] tesla-redesign models ?�션 고정??카드 ?�크�?
**범위:** `index.html` · `css/style.css` · `js/main.js` ??`section-models`  
**?�용:** 진입 ???�션 sticky 고정 · 좌측 카피 고정 · ?�측 카드 track `translateY` ?�동 · ?�크�??�료 ??FSD 진행 · PC only · `@768`/`reduced-motion` fallback

---

## 2026-06-08 ??[template] tesla-redesign Figma ?�면 ?�합 (카피·?�?�포·?�이?�웃)

**범위:** `index.html` · `css/style.css`  
**Figma MCP:** `portfolio_tesla_main` `1:25`

**models (`10:432`):** 2×2 grid ??�??�?��?+desc / ???�로 카드 4??· `Find your Tesla` · FSD desc · 카드 830×418 · Model Y/Cybertruck/Model Y/Model X  
**?�?�포:** ?�션 title 48/700 · band desc 16/500 · technology card 29 UPPER · experience title 48  
**?�딩:** technology·experience pad-y 62  
**hero controls:** wrap ?�렬 (`section-shell-gutter-max`)

---

**범위:** `index.html` · `css/style.css` · `js/main.js` ??`section-fsd`  
**?�용:** `section-fsd.jpg` ??`assets/videos/fsd.mp4` · muted loop autoplay

---

## 2026-06-08 ??[template] tesla-redesign header 메뉴 ?�이�?wrap ?�렬

**범위:** `css/style.css` ??`.header__inner`  
**?�용:** `padding-inline` · `max-width`�?`section-shell--gutter`?� ?�일(`--side-padding` · `--section-shell-gutter-max`) ??메뉴 ?�이�?wrap ?�측 ???�렬

---

## 2026-06-08 ??[template] tesla-redesign hero 3?�라?�드 ?�상 고정

**범위:** `index.html`  
**?�용:** hero **3??고정** ??Model Y `hero-bg.mp4` · Model 3 `hero-bg2.mp4` · Cybertruck `hero-bg3.mp4` (4번째 ?�라?�드·추�? 컨텐�??�음)

---

## 2026-06-08 ??[template] tesla-redesign ?�?�문??Figma ?�합

**범위:** `css/style.css`  
**?�용:** Figma `textCase: UPPER` ?�션 ?�?��?·footer col title??`text-transform: uppercase` (HTML 카피??Figma ?�문 ?��?)

| ?�소 | Figma ?�문 | ?�시 |
|------|-----------|------|
| models / fsd / charging / technology / experience title | sentence·title case | ALL CAPS |
| footer col title | Vehicles ??| ALL CAPS |
| hero·카드명·버?�·본�?| Figma 그�?�?| 변�??�음 |

---

## 2026-06-08 ??[template] tesla-redesign hero ?�살???�릭 ?�정

**범위:** `css/style.css` ??`.hero__controls`  
**?�용:** `z-index` 2?? (`.hero__inner`가 ?�일 z-index·?�체 ?�이�??�살???�릭 차단)

---

## 2026-06-08 ??[template] tesla-redesign footer 로고 PNG ?�정

**범위:** `index.html` ??footer  
**?�용:** `img-tesla-logo-footer.jpg` ??`img-tesla-logo.png` (header?� ?�일 PNG)

---

## 2026-06-08 ??[template] tesla-redesign FSD·charging 배경 가?�성 조정

**범위:** `css/style.css` ??`--fsd-overlay`  
**?�용:** overlay `0.6` ??`0.38` (section-fsd · section-charging 배경 ?��?지 ??보이�?

---

## 2026-06-08 ??[template] tesla-redesign hero ?�석 ?�크�?
**범위:** `index.html` · `js/main.js` ??hero ??models  
**?�용:** PC · hero 최상????down 1????models ?�냅 · models 진입????up ??hero top 복�? · splash 중·스??�?lock · reduced-motion ?�??
---

## 2026-06-08 ??[template] tesla-redesign hero Model 3 비디???�결

**범위:** `index.html` ??hero slide 2  
**?�용:** Model 3 ?�라?�드 `hero-bg2.mp4` ?�상?�로 교체 (기존 `card-model-3.jpg` ?��? ?��?지)

---

## 2026-06-08 ??[template] tesla-redesign header·footer 로고 ?�복

**범위:** `index.html` · `css/style.css`  
**?�용:** header `img-tesla-logo.png` · footer `img-tesla-logo-footer.jpg` (221×44) · splash�?SVG ?��? · invert filter ?�거

---

## 2026-06-08 ??[template] tesla-redesign technology drag-scroll ?�정

**범위:** `index.html` · `css/style.css` ??`section-technology`  
**?�용:** ?�크�?컨테?�너�?`technology__track` ??`technology__viewport`�??�동 (`width:max-content` ?�랙?� overflow 불�?)

---

## 2026-06-08 ??[template] tesla-redesign models 카드 ?�이 Figma 반영

**범위:** `css/style.css` · `index.html` ??`section-models` (`10:432`)  
**Figma:** card `707×482` (기존 652) · section pad-y `62` (기존 90) · grid gap 24/26 ?��?

---

## 2026-06-08 ??[template] tesla-redesign ?�터?�션 3�??�결

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**preset:** `scroll-reveal` · `hero-progress-slider` · `button-text-slide-hover`  
**?�용:**
- hero 3?�라?�드(Model Y ?�상 · Model 3 · Cybertruck) · 6s autoplay · progress bar · prev/next · hover pause · splash ??부??- ?�션�?scroll-reveal 1?��?models header · fsd · charging · technology · experience)
- CTA `btn-slide-hover` 마크??hero · models · fsd · charging · experience)

---

## 2026-06-08 ??[template] tesla-redesign Figma ?�?�포·간격 ?�합 ?�정

**범위:** `css/style.css` ?????�션  
**?�용:** Figma MCP ?�치 ?��?�?· line-height/padding/gap ?�큰 보정 · hero `space-between`+gap40 · FSD/charging flex 중앙 ?�렬  
**Figma:** `1:244` · `10:432` · `10:363` · `10:375` · `23:732` · `10:423` · `26:3`

---

## 2026-06-08 ??[template] tesla-redesign footer PC 구현

**범위:** `index.html` · `css/style.css` ??`footer` (`26:3`)  
**?�용:** 로고·?�명 · 4??nav · divider · copyright / legal · `img-tesla-logo-footer.jpg`  
**Figma:** BG `#0d0d0d` · main pad 64/240 · nav col gap 26 · bottom pad 24/240

---

## 2026-06-08 ??[template] tesla-redesign section-experience PC 구현

**범위:** `index.html` · `css/style.css` ??`section-experience` (`10:423`)  
**?�용:** `experience-content.jpg` 카드 1440×460 r16 · `#000` 60% overlay · 중앙 카피 · Order Now / Demo Drive  
**Figma:** pad 80/240 · text?�CTA gap 74 · title 68/700 UPPER · desc 22/500

---

## 2026-06-08 ??[template] tesla-redesign section-technology PC 구현

**범위:** `index.html` · `css/style.css` ??`section-technology` (`23:732`)  
**?�용:** Technology That Moves · 가�?카드 3�?· �?gutter ?�렬·?�측 peek(2172 ?�랙) · ?�스??`#f0f0f0`  
**Figma:** pad 80/240 · head?�cards gap 62 · card r16

---

## 2026-06-08 ??[template] tesla-redesign section-charging PC 구현

**범위:** `index.html` · `css/style.css` ??`section-charging` (`10:375`)  
**?�용:** `section-charging.jpg` · FSD?� ?�일 feature-band ?�턴 · desc Figma `\n` 2�???`<br>` · Find Charging / Learn More  
**Figma:** 750px · overlay 60% · title 52/700 · desc 22/500

---

## 2026-06-08 ??[template] tesla-redesign section-fsd PC 구현

**범위:** `index.html` · `css/style.css` ??`section-fsd` (`10:363`)  
**?�용:** `section-fsd.jpg` full-bleed 750px · `#1b1d1d` 60% overlay · 카피 중앙 · FSD desc Figma `\n` ??`<br>`  
**Figma:** pad 80/240 · title 52/700 · desc 22/500 · btn 56h r6 gap 16

---

## 2026-06-08 ??[template] tesla-redesign section-models PC 구현

**범위:** `index.html` · `css/style.css` ??`section-models` (`10:432`)  
**?�용:** FIND YOUR TESLA ?�더 · 2×2 카드 · 버튼 Figma ?�합 · card desc Figma `U+2028` ??`<br>` · radius ?�리??보정  
**Figma:** BG `#1b1d1d` · pad 90/240 · grid gap 24/26 · card 707×652 r16

---

## 2026-06-08 ??[template] tesla-redesign section-nav · section-hero PC 구현

**범위:** `index.html` · `css/style.css` · `js/main.js` ??header(`23:866`) · hero(`1:244`)  
**?�용:** nav 93px · hero **뷰포??가로·세�?�?�?* (`100dvh - header`, video `object-fit: cover`) · Model Y 카피 · CTA · ?�살?? 
**Figma:** gutter nav 64px · hero content 1440 · 카피 `#f0f0f0` · overlay `#000` 30% · ?�살???�로 중앙

---

## 2026-06-08 ??[template] tesla-redesign ?�더·?�캐?�드 ?�성

**범위:** `templates/tesla-redesign/` ??`index.html` · `css/style.css` · `js/main.js` · `assets/` · `_source/`  
**?�용:** PC 메인 구현 ???�더 ?�성 · 모바??보류 · ?�셋 ?�용???�입 ?��?
---

## 2026-06-08 ??[template] tesla-redesign ?�셋 ?�리·매핑

**범위:** `templates/tesla-redesign/assets/` · `_source/`  
**?�용:** ?�용???�입 ?�본 ??Figma ?�롯명으�?`assets/images`·`icons`·`videos` ?�리 · ?�본 PNG 3�?`_source/images/` 보�?

| ?�품 경로 | ?�도 |
|-----------|------|
| `assets/videos/hero-bg.mp4` | section-hero ??Model Y |
| `assets/videos/hero-bg2.mp4` | section-hero ??Model 3 |
| `assets/videos/hero-bg3.mp4` | section-hero ??Cybertruck |
| `assets/images/card-model-y.jpg` | models ??Model Y |
| `assets/images/card-model-3.jpg` | models ??Model 3 |
| `assets/images/card-cybertruck.jpg` | models ??Cybertruck |
| `assets/images/card-model-s.jpg` | models ??Model S |
| `assets/images/section-fsd.jpg` | section-fsd 배경 |
| `assets/images/section-charging.jpg` | section-charging 배경 |
| `assets/images/card-autonomy.jpg` | technology ??Autonomy |
| `assets/images/card-robotics.jpg` | technology ??Robotics |
| `assets/images/card-vehicle-software.jpg` | technology ??Vehicle Software |
| `assets/images/experience-content.jpg` | section-experience |
| `assets/images/img-tesla-logo.png` | nav 로고 |
| `assets/images/img-tesla-logo-footer.jpg` | footer 로고 |
| `assets/icons/icon-hamburger-menu.png` | nav ?�버�?|
| `assets/icons/icon-scroll-prev.png` · `icon-scroll-next.png` | models 캐러?� ?�살??|

**`_source/images/`:** `source-supercharger-night.png` · `source-cybertruck-wasteland.png` · `source-model3-coastal-clean.png`

---

## 2026-06-09 ??[rules] 모바??@768 gutter · 칼럼 · shell ?�턴

**?�일:** `35-responsive.mdc` · `30-figma-to-code.mdc` · `40-template-code-style.mdc` · `50-qa-checklist.mdc` · `20-harness-workflow.mdc` · `_docs/figma-to-code-guide.md` · `_docs/qa-checklist.md`  
**?�용:** @768 gutter ?�큰 override · 1??기본 · shell ?�중 pad 금�? · full-bleed 구조 · 로고 bbox interim · ?�라?�더 peek · mobile preview?�이???�크?�로 · 390px ?�작??QA  
**근거:** smile-clinic 모바???�식·gutter ?�일·header 로고 ?�렬 ?�발 방�?

---

## 2026-06-09 ??[template] smile-clinic header 로고 좌측 ?�렬

**범위:** `css/style.css` · `css/mobile.css` ??`.header__logo img`  
**?�정:** PNG bbox 좌측 ?�명 ?�백(128/1448) 보정 `margin-left` ??본문 `--side-padding` ?�작?�과 artwork ?�렬

---

## 2026-06-09 ??[template] smile-clinic 모바??@768 최종 ?�식

**범위:** `css/style.css` @768 · `js/main.js` · `index.html` · `about-*.html`  
**CSS:** `mobile.css` 기�?�???`@media (max-width: 768px)` 병합 · `--mo-*` 변?? 
**HTML:** 모바??nav · strength/place ?�라?�더 · team picker(?�??마크??  
**JS:** `mobile.js` ??`main.js` (`isMobileViewport` · magnetic slider · nav · team · place)  
**?�리�?** `*-mobile.html` + `mobile.css` ?��? (검?�용)

---

## 2026-06-09 ??[template] smile-clinic 모바??footer · reservation ?� bleed

**footer:** `index-mobile.html` · stacked cols · `--mo-*` · logo 154px  
**reservation:** card ??full-bleed panel

---

**?�일:** `index-mobile.html` · `css/mobile.css` · panel min-h 420 · full-width CTA ×2 · `--mo-*` ?�?�포

---

**?�일:** `index-mobile.html` · `css/mobile.css` · intro stack · step cards · `--mo-fs-caption` 13px

---

**?�일:** `index-mobile.html` · `css/mobile.css` · `--mo-*` 기�? · panel 400px · card radius · nav hidden

---

**?�?�포:** Figma `37:2249` ??`mobile.css` `--mo-fs-*` · **?�이?�웃:** header/hero/signature 1�?PASS  
**기록:** `decision-log.md` · `qa-log.md` · ?�후 ?�션·`@768` ?�일 변???�용

---

## 2026-06-09 ??[template] smile-clinic mobile.css ?�?�포 가?�드 ?�용 (header · hero · signature)

**Figma `37:2249`:** display ×0.75 · heading ×0.825 · body min 16px ??`--mo-fs-*` 변??· header nav/hero/signature/card/more ?�괄 반영

---

**방식:** `index-mobile.html` + `css/mobile.css` + `js/mobile.js` ??PC `style.css` `@768` 미수??
**Figma:** PC `13:436` ?��????�?�포 가?�드 `37:2249`: title ×0.75??2px · body 16px) · 캔버??`37:2251`(390px)?� ?�퍼?�스 ?�레???�용 비어 ?�음) ??PC 카피·?�셋 기�? 1�?구현

| ??�� | 1�?�?|
|------|--------|
| ?�더 | h 64 · logo 154px · ?�버�?· drawer nav |
| ?�어�?| min-h 640 · pad-bottom 64 · title 32 · desc 16 · btn 16/16×28 |

**?�인:** `index-mobile.html` @390px · 말�? 주시???��??�정 ?�정

---

## 2026-06-09 ??[template] smile-clinic about-place Figma ?�동기화

**Figma:** `84:202` · 갤러�??��?지 r=0(기존 `--radius-card` ?�거) · 캡션 lh 29.2px · card figure `margin:0`

**검�?PASS:** hero?�본�?86px · head?�갤?�리 120px · grid gap 36/10 · img?�캡??16 · col 473.33 · 본문?�footer 120px

---

## 2026-06-09 ??[template] smile-clinic about-team Figma ?�동기화

**Figma:** `81:106` · card gap 50 · body 778px · pad-top 101 · headline Gowun · lh/간격 bbox · creds `#1f1b18` gap 3

---

## 2026-06-09 ??cross-template: Wrap ??DOM · box-model QA 규칙

**배경:** smile-clinic intro ??shell 1440 PASS?�데 `<figure>` UA margin?�로 ?��?지�?좁음 · ?�러 차�? QA ?�락

| ?�일 | 조치 |
|------|------|
| `50-qa-checklist.mdc` · `_docs/qa-checklist.md` §2-2 | Wrap children · figure reset · edge ?�렬 · 콘텐�?묶음 QA 5??|
| `30-figma-to-code.mdc` | MCP 보고 `Wrap children` x/w ?�수 |
| `20-harness-workflow.mdc` | ?�션 QA??box-model ?�계 · Figma 보고 Wrap children |
| `40-template-code-style.mdc` | `.section-shell` / `.sub-section figure` reset ?�턴 |
| `_logs/failure-log.md` | figure UA margin ?�발 방�? |
| `templates/smile-clinic/css/style.css` | `.sub-section figure { margin-inline:0; width:100% }` |

---

## 2026-06-09 ??[template] smile-clinic ?�브 QA · Figma ?�치 보정

**?�정:** ??pill gap 46 · pad 102 · 비활??????`#1f1b18` · intro ?�진?�리??78px · 2??gap 49px · place ?�드?�갤?�리 120px · team `<br>` 줄바�?
---

## 2026-06-09 ??[template] smile-clinic ?�브 3?�이지 구현 · ?�셋 매칭

**?�플�?** `smile-clinic` · Figma `1:223` · `81:106` · `84:202`

| ?�이지 | ?�일 | ?�셋 매칭 |
|--------|------|-----------|
| 병원?�개 | `about-intro.html` | hero `sub_header_bg.png` · 본문 `sub_philosophy_card.jpg` |
| ?�료�?| `about-team.html` | hero `sub_header_bg.png` · ?�정??`sub_doctor_2.png` · ?�서??`sub_doctor_1.png` |
| ?�러보기 | `about-place.html` | hero `sub_header_bg.png` · `83-5` ?�운지 · `83-4` 진료?�A · `83-3` 진료?�B · `83-2` ?�담??· `83-1` ?�술??· `83` ?�복??|

| CSS | `.sub-hero` · `.sub-about` · `.sub-team` · `.sub-place` · `@768` stack |

**비고:** Figma 카피(?�료�?본문 ?�름 불일�???MCP 문자??그�?�?· `image 52.jpg`·`assets/source/`??미사??
---


**배경:** smile-clinic SIGNATURE·STRENGTH BG ?�락 ??MCP dump??`#fffefd` ?�었?�나 fill ?�음???�접 ?�션�??�일�??�해

| ?�일 | 조치 |
|------|------|
| `30-figma-to-code.mdc` | ?�MCP JSON 분석????JSON ?�선 · fills vs backgroundColor · Section BG 6?�계 · ?�접 ??· overlay 분리 |
| `20-harness-workflow.mdc` | Figma 보고??JSON ?�싱·Section BG node-id·?�접 ???�수 |
| `40-template-code-style.mdc` | `--color-bg-{section}` 분리 · ?�일 `--color-bg` ?�합 금�? |
| `50-qa-checklist.mdc` · `_docs/qa-checklist.md` | ?�접 Section BG 경계 QA |
| `_docs/figma-to-code-guide.md` | MCP ?�신 ??체크리스???�장 |
| `_logs/failure-log.md` | ?�발 방�? ??�� 추�? |

---


**?�플�?** `smile-clinic` · **Figma:** `1TG429c3chdZ8SpFrmHwUN` · `13:464` · `13:507`

| ??�� | Figma MCP | 기존 | 조치 |
|------|-----------|------|------|
| SIGNATURE (`section-treatment`) | ?�레??fill ?�음 ??메인 `#f9f9f9` ?�속 | `#fffefe` (strength?� ?�일) | `--color-bg-signature: #f9f9f9` · `.signature` |
| OUR STRENGTH (`section-strength`) | SOLID `#fffefd` | `#fffefe` | `--color-bg-strength: #fffefd` · `.strength` |
| RESERVATION (`13:560`) | SOLID `#fffefd` (strength?� ?�일) | `#fffefe` | `.reservation` ??`--color-bg-strength` |
| Strength ?�널 overlay | IMAGE + `#3f3a35` **opacity 40%** · r=277 | `rgba(63,58,53,0.4)` | 변�??�음 (?�치) |
| Signature 카드 overlay | IMAGE + GRAD black 24.4%??0% | gradient + opacity 20% | 변�??�음 (?�치) |
| Signature ?�드 ?�?�포 | `#1f1b18` (밝�? BG ?? | ?�일 | 변�??�음 |

**비고:** 카드 ?�라?�더 ?�역 ?�네?��? 카드·그radient�??�둡�?보이?? ?�션·?�라?�더 ?�레??`13:481`·`13:482`)?�는 별도 black fill ?�음.

---

## 2026-06-08 ??[template] smile-clinic image-scale-hover · reservation ?�딩

| ??�� | 조치 |
|------|------|
| SIGNATURE | `image-scale-hover` ??카드 `::before` bg scale 1.05 |
| STRENGTH | `image-scale-hover` ??panel `::before` bg scale 1.05 |
| Reservation | Figma `13:561` ??pad **100/80** · copy?�actions **gap 46** · **fix:** `.scroll-reveal`가 `display:block`�?flex ??��?� ??panel `display:flex` ?��? |

---

**규칙:** ?�션 head = label/title/desc 개별 · **카드·?�널 = 컨테?�너 1�?* (?��? ?�스??중복 금�?)

| ?�션 | scroll-reveal ?�??|
|------|-------------------|
| Hero | title · desc · btn (개별) |
| Signature | head ?�스??· nav · 카드×6(밴드 진입 ???�차) · more |
| Strength | head ?�스??· **panel** |
| Process | intro ?�스??· **step 카드×4** |
| Reservation | **panel** (CTA 박스 ?�체) |

---

## 2026-06-08 ??[template] smile-clinic scroll-reveal ?�용

**?�플�?** `smile-clinic` · preset: **`scroll-reveal`**

| ??�� | 조치 |
|------|------|
| HTML | `#hero` · `#signature` · `#strength` · `#process` · `#reservation` + `.scroll-reveal` |
| CSS | mainstream ?�일 preset 블록 · `prefers-reduced-motion` 즉시 ?�시 |
| JS | `initScrollReveal` ??hero 로드 ?�차 · ?�션 IntersectionObserver · 150/180ms stagger |
| ?�외 | header/footer · signature **카드**(track `transform` 충돌) |

---

## 2026-06-08 ??[rules] cross-template 7?�턴 규칙 ?�치

**범위:** smile-clinic ?�업?�서 ?�출??**?�플�?공통** ?�발 방�?

| ?�턴 | 반영 ?�일 |
|------|-----------|
| Figma overlay/gradient fills | `30-figma-to-code.mdc` · MCP `Overlays:` · QA |
| Logo PNG bbox | `30-figma-to-code.mdc` · `40-template-code-style.mdc` · QA |
| Shell · gutter · inner | `30-figma-to-code.mdc` · `40-template-code-style.mdc` |
| Full-bleed horizontal scroll | `30-figma-to-code.mdc` · `40` · `50-qa-checklist.mdc` (#9) |
| F5 scroll top | `40-template-code-style.mdc` · `45-interaction-patterns.mdc` · QA |
| Section head tokens | `30` · `40` · QA |
| Section BG MCP 1�?| `30` · `20-harness-workflow.mdc` · `_docs/figma-to-code-guide.md` |

**로그:** `_logs/failure-log.md` cross-template ??�� 추�?

---

## 2026-06-08 ??[template] smile-clinic Signature 배경·카드 gradient

**?�플�?** `smile-clinic`

| ??�� | Figma MCP | 조치 |
|------|-----------|------|
| Signature ?�션 BG | `section-strength`?� ?�일 `#fffefe` · `section-treatment` ?�레???�체 fill ?�음 | `.signature { background: var(--color-bg) }` · `--color-bg: #fffefe` |
| Signature 카드 overlay | `GRADIENT_LINEAR` 0??00% black · **opacity 20%** · y 24.4%??0% | `.signature-card::after` |

---

## 2026-06-08 ??[template] smile-clinic 공통 ?�이?�웃·간격 ?�합

**?�플�?** `smile-clinic`

| ??�� | 조치 |
|------|------|
| `:root` | `--section-head-gap` · `--section-label-gap` · `--section-title-gap` · `--gap-md` · `--radius-card` · `--surface-card-pad-*` · `--nav-circle-size` |
| 공통 ?�래??| `.section-shell` · `.section-shell--gutter` · `.section-head` · `.section-head--spaced` · `.section-head--center` · `.circle-nav-btn` · `.surface-card` · `.is-bleed-x` |
| 간격 ?�일 | SIGNATURE·STRENGTH head?�본�?**64px** (slider `padding-top` ?�거) · label?�title **16px** |
| HTML | `index.html` 공통 ?�래???�용 |

---

## 2026-06-08 ??[template] smile-clinic PC 메인 Figma ?�합 ?�정

**?�플�?** `smile-clinic`

| ??�� | ?�정 |
|------|------|
| Hero | ?�단 ?�렬 · 그라?�이??26% ?��? · CTA ?�명+???�두�?|
| Signature | 1920 ?�라?�더 ?�블리??· 카드 desc `#e9e9e9` · ?�체보기 ?�이�???|
| Strength | ?�???��? 좌우 nav + 중앙 카피 |
| Process | STEP 배�?(10% brown bg) · SUIT step title |
| Footer | �??�시?�길+?�?�전?? / ??진료?�간) · 구분??· phone SUIT |
| Header | logo + nav/CTA 그룹 gap 31 |

---

## 2026-06-08 ??[template] smile-clinic PC 메인 구현

**?�플�?** `smile-clinic`

| ??�� | 조치 |
|------|------|
| `index.html` | Hero · Signature · Strength · Process · Reservation · Footer |
| `css/style.css` | Figma ?�치 기반 PC ?��???· 768px 기본 ?�??|
| `js/main.js` | Signature ?�라?�더 4??· loop ?�음 |
| assets | ?�공 ?��?지·?�이�?매칭 반영 |

**미구??** ?�개 3?�이지 · 모바???�자???�정�?· GNB 1depth ?�위 ?�이지

---

## 2026-06-08 ??[template] smile-clinic ?�더·?�캐?�드 ?�성

**?�플�?** `smile-clinic`

| ??�� | 조치 |
|------|------|
| ?�이지 | `index.html` · `about-intro.html` · `about-team.html` · `about-place.html` |
| ?��??�·스?�립??| `css/style.css`(:root ?�큰) · `js/main.js` |
| ?�품 ?�셋 | `assets/images/` · `assets/icons/` |
| ?�스 ?�령 | `_source/images/` · `_source/icons/` (?�용???�셋 ?�입?? |

**미구??** ?�더·?�터·?�션 HTML/CSS/JS · 모바??
---

## 2026-06-09 ??[project] start.bat · stop.bat ?�거

- 루트 `start.bat` · `stop.bat` ??��
- `47-placeholder-images.mdc` · dev-images.js 주석 갱신

---

| ?�일 | ?�용 |
|------|------|
| `templates/index.html` | ?�스??링크 목록 (mainstream) |
| `_harness/package-delivery.js` | ?�키�???`_delivery/index.html` ?�기??|
| rules · delivery-guide | ?�브·?�규 ?�플�?`<li>` 추�? ?�차 |

---

**범위:** rules · docs · `_delivery/` · `_harness/package-delivery.js`

| ??�� | 조치 |
|------|------|
| 명칭 | `imweb`/`cafe24` ?�랫???�더·규칙�??�거 ??`_delivery/{slug}/` |
| 규칙 | `60-imweb-delivery.mdc` ??`60-delivery.mdc` |
| 가?�드 | `imweb-delivery-guide.md` ??`delivery-guide.md` |
| ?�키�?| `node _harness/package-delivery.js mainstream` |
| ?�출 | `_delivery/mainstream/` ??preview·dev ?�일 ?�외 |

**개발�?** `templates/mainstream/` ?��? (preview·dev 검??가??

---

## 2026-06-09 ??[template] mainstream dev-images ??assets ?�품 ?��?지 ?�환

**?�플�?** `mainstream`

| ??�� | 조치 |
|------|------|
| ?��?지 | `_dev-images` ?�재 매핑 14?�롯 ??`assets/images/{key}.jpg` 복사 |
| HTML | `data-placeholder` ?�거 · src `.jpg` ?�일 |
| dev ?�동 | `index.html` manifest/dev-images/placeholders ?�크립트 ?�거 · `enabled: false` |
| ?�크립트 | `js/sync-dev-to-assets.js` (?�실?�용) |

**?��? assets:** header/footer 로고 · news-bg · cta-bg · icons (Figma export)

---

## 2026-06-09 ??[template] mainstream index 최종본·GNB ?�기 ?�이�?
**?�플�?** `mainstream`

| ??�� | 조치 |
|------|------|
| GNB ?�기 | ?�버?�이 ??z-index · ?�더 배경 transparent · ?��? ?�일 ?�치 |
| index | `start.bat` ??`index.html` · 모바??`overflow-x: clip` (100vw bleed) |
| preview | ?�션 검?�용 ?��? · ?�단 `index` 링크 |

| ?�일 | `css/style.css` · `start.bat` · `preview.html` |

---

## 2026-06-09 ??[template] mainstream 모바??works · faq · cta · footer

**?�플�?** `mainstream` · Figma `198:231` · `198:245` · `198:300` · `198:306` · `@768`

| ?�션 | Figma | 조치 |
|------|-------|------|
| stats blue | 390 ?�??| `100vw` bleed 보정 |
| works | 4�??�로 450px · caption ??�� ?�출 | @768 · accordion off |
| faq | 6문항 ?�로 · 330px · 19/18 | @768 (1920 카피) |
| cta | 390 ?�??· 27/20 · btn 67px | @768 |
| footer | 로고?�정보→SNS?�패밀�???| @768 reorder |

| ?�일 | `css/style.css` · `js/main.js` · `preview.html` default ?�체 |

---

## 2026-06-09 ??[template] mainstream 모바??stats · news (Figma mainstream_390)

**?�플�?** `mainstream` · Figma `200:354` · `198:194` · `@768`

| ?�션 | Figma | 조치 |
|------|-------|------|
| stats | 2×2 · 30/18 · value 32 · visual 594px | @768 CSS · overlap ?�거 |
| news | pad 60/16 · card ?�로 3??gap 26 · 20/16 | @768 CSS · nav ?��? · ?�라?�더 off |

| ?�일 | ?�용 |
|------|------|
| `css/style.css` | stats · news @768 |
| `js/main.js` | 모바??news ?�라?�더 skip · `preview=stats-news` |
| `preview.html` | Stats+News ??· default |

**카피·?�진:** 1920 · `_dev-images` ?��?

---

## 2026-06-09 ??[template] mainstream 모바??hero · story (Figma mainstream_390)

**?�플�?** `mainstream` · Figma `198:141` · `198:154` · `@768`

| ?�션 | Figma | 조치 |
|------|-------|------|
| hero | KV 560px · copy CENTER · 15/32/16 · pager ?�음 | @768 CSS · pager ?��? |
| story | pad 60/16 · head 30/18 · card 340×480 가�??�크�?gap 2 | @768 CSS |

| ?�일 | ?�용 |
|------|------|
| `css/style.css` | hero · story @768 |
| `js/main.js` | `?preview=hero-story` 검??모드 |
| `preview.html` | **고정 검??URL** ?????90/?�체 ?�환 (북마?�용) |
| `start.bat` | 기본 ?�픈 `preview.html` |

**검??** `http://127.0.0.1:8080/preview.html` (주소 고정 · ?�단 ??���?범위 변�?

---

## 2026-06-09 ??[template] mainstream 모바??GNB (Figma mainstream_390_menu)

**?�플�?** `mainstream` · **?�션:** header / GNB · Figma `198:128` · `201:480`

| ?�일 | ?�용 |
|------|------|
| `index.html` | mo 로고·menu/close PNG · nav close 버튼 |
| `css/style.css` | @768 ?�체?�면 ?�버?�이 · 26/600 · gap 26 · header 80px |
| `js/main.js` | open/close ?�합 · close 버튼 |
| `assets/images/` | header-logo-mo/menu/close.png |

**기�?:** 카피 1920 ?��? · PC GNB 변�??�음

---

## 2026-06-08 ??[template] mainstream hero progress bar = 5�??�?�머

- progress bar: ?�라?�드마다 **0??00% 5�?* 채�? ???�료 ???�음 ?�라?�드 · loop
- hover: ?�?�머·채�? **?�시?��?** · ?�탈 ???��? ?�간부???�개
- bar ?�릭: 즉시 ?�음 ?�라?�드 + ?�?�머 리셋
- (?�전) ?�라?�드 번호�?fill 고정�?60??09px) 방식 ?�거

---

## 2026-06-08 ??[template] mainstream hero `hero-progress-slider` ?�결

**?�플�?** `mainstream` · **?�션:** hero (`149:2964`)

| ??�� | ?�용 |
|------|------|
| preset | `hero-progress-slider` |
| ?�라?�드 | 3??· fade 0.5s · loop |
| autoplay | **progress bar 5�??�?�머** (0??00% 채�? ???�음 ?�라?�드) · hover ?�시?��? |
| pager | `01 / 03` + progress bar (track 109px · fill = ?�?�머) |
| ?�동 | progress bar ?�릭 ???�음 ?�라?�드 |
| ?��?지 | `hero-bg-01~03.jpg` (02·03?� 01 복사 placeholder ??Figma export ??교체) |

| ?�일 | ?�용 |
|------|------|
| `index.html` | `.hero__slides` ×3 · pager 구조 |
| `css/style.css` | slide fade · overlay z-index · track button |
| `js/main.js` | `initHeroProgressSlider()` |

---

## 2026-06-08 ??[template] mainstream scroll-reveal ?�도 B ?�용

- CSS duration `0.52s` ??**`0.72s`**
- JS ?�차 간격 hero **`150ms`** · ?�션 **`180ms`** (기존 75 / 85)

---

## 2026-06-08 ??[template] mainstream ?��?지 ?�버?�이 Figma ?�조·수??
**?�플�?** `mainstream` · **범위:** hero · story · works · cta · stats · news · faq · footer

| ?�션 | Figma | 조치 |
|------|-------|------|
| hero | 검??30% | 기존 맞음 (변?�화) |
| story | 카드 ?�체 검??**46%** (fill 2�? | gradient ??**flat 46%** ?�정 |
| works | ?�림�?검??**26%** | ?�전 ?�정 반영 |
| cta | 검??**30%** | **?�락 ??::after 추�?** |
| stats · news · faq · footer | ?�버?�이 ?�음 | 변�??�음 |

| ?�일 | ?�용 |
|------|------|
| `css/style.css` | `--story-overlay` · `--media-overlay-30` · story/cta overlay |

---

## 2026-06-08 ??[template] mainstream scroll-reveal ?�차 ?�생

- CSS delay ?�괄 ?�용 ??**JS�?개체 ?�나??85ms 간격** `is-revealed` (hero 75ms)
- easing `cubic-bezier(0.22, 1, 0.36, 1)` · 0.52s

---

## 2026-06-08 ??[rules] workbench 미사??· templates 직접 구현 ?�정

**범위:** 규칙·가?�드�?
| ?�일 | ?�용 |
|------|------|
| `10-project-structure.mdc` | ?�일 개발 공간 `templates/` · workbench 금�? |
| `20-harness-workflow.mdc` | 구현 경로·금�? ??�� |
| `60-imweb-delivery.mdc` | delivery = ?�품 복사�?|
| `_harness/README.md` · `project-overview.md` | ?�더 ??�� ?�리 |

**?�기:** `_harness/workbench/` · `review/` · `reports/` ?�크?�로.

---

## 2026-06-04 ??[setup] ?�임???�용 ?�네??구조 리셋

### ?�동 (`_docs/legacy/`)

| From | To |
|------|-----|
| `AGENTS.md` | `_docs/legacy/AGENTS.legacy.md` |
| `.cursorrules` | `_docs/legacy/cursorrules.legacy.md` |
| `_common/` | `_docs/legacy/_common/` |
| `_imgs/` | `_docs/legacy/_imgs/` |
| `templates/template-a/` | `_docs/legacy/templates/template-a/` |
| `templates/template-b/` | `_docs/legacy/templates/template-b/` |
| `_delivery/?�품??체크리스??txt` | `_docs/legacy/?�품??체크리스??txt` |

### ??��

| 경로 | 비고 |
|------|------|
| `_modules/` | 공통 모듈 ?�더 ?�기 |
| `_tokens/` | ?�역 ?�큰 (`tokens.css` ?�함) |
| `_delivery/cafe24/` | Cafe24 ?�품 경로 ?�거 |

### ?�규 ?�성

**`.cursor/rules/`** (9�?
- `00-core.mdc`, `10-project-structure.mdc`, `20-harness-workflow.mdc`
- `30-figma-to-code.mdc`, `40-template-code-style.mdc`, `45-interaction-patterns.mdc`
- `50-qa-checklist.mdc`, `55-git-workflow.mdc`, `60-imweb-delivery.mdc`

**`_harness/`**
- `README.md`, `snapshots/` (PNG 비교??
- ~~`workbench/`, `review/`, `reports/`~~ ??초기 ?�계�? **2026-06-08 미사???�정**

**`_logs/`**
- `decision-log.md`, `change-log.md`, `failure-log.md`, `qa-log.md`

**`_docs/`**
- `project-overview.md`, `figma-to-code-guide.md`, `imweb-delivery-guide.md`, `qa-checklist.md`
- `legacy/` (?�동 ?�???�용)

### ?��? (미수??

| 경로 | 비고 |
|------|------|
| `templates/template-c/` | ?�체 ?��?, ?��? ?�일 ?�용 변�??�음 |
| `_delivery/imweb/` | ?�임???�품 경로 ?��? |
| `package.json`, `package-lock.json` | 미수??|
| `start.bat`, `stop.bat` | 미수??|
| `.gitignore` | 미수??|

---

## 2026-06-04 ??[docs] ?�로?�트 기�? 문서 ?�리

### ?�성·갱신

| ?�일 | ?�용 |
|------|------|
| `_docs/project-overview.md` | 목적, ?�립 ?�플�??�칙, ?�더 ??��, ?�규 ?�플�?추�? 기�? |
| `_docs/figma-to-code-guide.md` | Figma 1920, MCP ?�·후 체크, clamp, 768px ?�??|
| `_docs/imweb-delivery-guide.md` | `_delivery/imweb/{slug}/`, 경로·jQuery·?�품 ??QA |
| `_docs/qa-checklist.md` | 구조·Figma·반응?�·인?�랙?�·Imweb·commit ??QA |

### 미수??
- `templates/template-c/` · `package.json` · `start.bat` · `.cursor/rules/*.mdc`

---

## 2026-06-04 ??[rules] Figma ?�레?�명 기반 ?�플�??�성 규칙 추�?

### 갱신

| ?�일 | ?�용 |
|------|------|
| `.cursor/rules/10-project-structure.mdc` | Figma frame ??slug ?�규?�·승???�수 |
| `.cursor/rules/30-figma-to-code.mdc` | MCP ?�작 ???�레?�명·?�션 구조 보고 |
| `_docs/project-overview.md` | ?�규 ?�플�?slug 결정 ?�차·?�시 |
| `_docs/figma-to-code-guide.md` | ?�레?�명 ?�인·?�안 ?�차 |
| `_logs/decision-log.md` | Figma ?�레?�명 = slug 기�? 결정 |

### 미수??
- `templates/template-c/` · `start.bat` · `package.json`

---

## 2026-06-04 ??[setup] 기존 template-c�?legacy�??�동

### ?�동

| From | To |
|------|-----|
| `templates/template-c/` | `_docs/legacy/templates/template-c/` |

### 기�?

- `templates/.gitkeep` ?�성 ???�성 ?�플�??�음 ?�시
- `templates/` ?�위 ?�플�??�더 ?�음 (?�상 ?�태)

### 갱신

- `_docs/project-overview.md` ???�재 ?�플�??�음·legacy 참고 명시
- `_docs/figma-to-code-guide.md` ??�?`templates/` ?�내
- `_logs/decision-log.md` ??template-c legacy 결정
- `.cursor/rules/10-project-structure.mdc` ??active workspace ?�칙

### 미수??
- `start.bat` · `package.json` · `templates/template-c` ?��? ?�일 ?�용

---

## 2026-06-04 ??[template] ontheblue ?�플�?기본 구조 ?�성

### ?�규 (`templates/ontheblue/`)

| 경로 | 비고 |
|------|------|
| `index.html` | 최소 골격, GNB/header ?�음, title LUMO |
| `css/style.css` | `:root` ?�이?�웃 1840px / gutter 40px, `.container` |
| `js/main.js` | jQuery 진입?�만 |
| `assets/images/`, `assets/icons/` | `.gitkeep` |

### ?�정 기�? (?�라?�런 ?�인)

- Figma frame: `template_ontheblue` ??slug `ontheblue`
- 콘텐�?1840px · gutter 40px · 모바??768px ?�반 규칙
- 브랜??카피 LUMO · header??1�?미포??
### 미구??
- Figma ?�션 HTML/CSS/JS (hero~footer)
- `header` / GNB

### 미수??
- `start.bat` · `package.json` · `_docs/legacy/templates/template-c/`

---

## 2026-06-04 ??[template] ontheblue hero ?�션 구현

**?�플�?** `ontheblue` · **?�션:** `hero` (`hero-section` · Figma `149:2964`)

### ?�정 ?�일

| ?�일 | ?�용 |
|------|------|
| `templates/ontheblue/index.html` | `section--hero` 마크??(LUMO 카피, ?�적 ?�이?� 01/03) |
| `templates/ontheblue/css/style.css` | hero ?�이?�웃·?�?�포·KV·768px |

### MCP 기�? ?�치 ?�약

- ?�션: 1920×980 · padding `90/40/90/40` · gap 10
- KV: 1840×800 · inner padding L/R `72` · overlay `#000` 30%
- 콘텐�?max `1440` · gap `46` / `22` / `14`
- ?�?�포: label 18/700 · title 56/700 · body 24/500 · pager 16/500 · `#fff`

### 구현 ?�약

- `id="hero"` + `class="section section--hero"`
- KV: `aspect-ratio 1840/800` · `assets/images/hero-kv.jpg` 구조 (?�일 미추가 ??`#0c1a2e` fallback)
- CTA ?�음 · ?�라?�더 ?�적 ?�시 · header ?�음 · JS 변�??�음

### 미해�?/ ?�음 주의

- `assets/images/hero-kv.jpg` Figma export ??교체 ?�요
- ?�음 ?�션: `story-section` (?�용??PASS ??

---

## 2026-06-08 ??[template] mainstream header · hero · story (1�?3?�션)

**?�플�?** `mainstream` · **?�션:** `header` (`168:55`) · `hero` (`149:2964`) · `story` (`146:1397`)

### ?�정 ?�일

| ?�일 | ?�용 |
|------|------|
| `templates/mainstream/index.html` | header GNB, hero, story 마크??|
| `templates/mainstream/css/style.css` | 3?�션 PC + @1024 + @768 |
| `templates/mainstream/js/main.js` | GNB ?�버�??��? |

### MCP 기�? ?�치

- header: 1920×104 · inner 1840 · nav gap 48 · 20/600 · `#222`
- hero: pad 90/40 · KV 1840×800 · overlay 30% · 콘텐�?max 1440 · pager 60/109
- story: pad 120/40 · head gap 18 · cards 613×720 gap 1 · card pad 36/26

### 미해�?
- `assets/images/hero-kv.jpg`, `story-card-01~03.jpg` export ?�요 (?�재 fallback 배경)
- hero ?�라?�더 JS 미구??(?�적 01/03)
- ?�용??관�?�???formal QA·qa-log 보류

---

## 2026-06-08 ??[template] mainstream layout shell ?�정

**?�플�?** `mainstream` · header / hero / story

### 변�?
| ?�일 | ?�용 |
|------|------|
| `css/style.css` | Figma ?�션 pad 40 + inner `max-width: 1840` ?�턴?�로 ?�적??|
| `css/style.css` | `.container` pad ?�거 · `.main` max-width ?�거 |
| `index.html` | hero 중복 `</div>` ?�거 · header/story container ?�퍼 ?�리 |

### 기�?

- ?�션 `padding-inline: var(--layout-pad-x)` = gutter 40 (fluid)
- ?�식 `max-width: var(--layout-content)` = 1840 (fluid)
- @1920: `40 + 1840 + 40 = 1920` · **2560+:** gutter vw�? shell `width:100%` (1840 cap 금�?)

---

## 2026-06-08 ??[template] mainstream faq · cta · footer (?�괄)

**?�플�?** `mainstream` · faq `150:3002` · cta `149:2782` · footer `149:2917`

| ?�일 | ?�용 |
|------|------|
| `index.html` | FAQ 6카드 · CTA · footer |
| `css/style.css` | PC + @1024 + @768 |

### MCP 기�?

- faq: 3×2 · gap 1 · mint/yellow · Q/A LEFT
- cta: bg image · title center · btn white
- footer: 2??· meta/links · social · family site

---

## 2026-06-08 ??[rules] PC interaction preset 카탈로그 (10�?

**범위:** 규칙·가?�드�?· ?�플�?JS/CSS **미구??*

| ?�일 | ?�용 |
|------|------|
| `.cursor/rules/46-interaction-presets.mdc` | 10 preset 카탈로그 · ?�인 ?�차 · ?�션???�한 |
| `_docs/interaction-presets-guide.md` | ?�자?�너??카탈로그 (?�플릿별 ?�결 ?�황 **미포??*) |
| `20` · `45` · `50` · `context-guide` · `qa-checklist` | 참조 ?�결 |

**?�결:** ?�용?��? ?�션�?preset ID ?�택·?�인 ??구현.

**?��?�?(명령??:** `_docs/interaction-presets-guide.md` ??참고 ???�stats???�자 카운?�업 ?�용?�줘???�식.

---

**?�플�?** `mainstream` · footer `149:2917`

| ?�일 | ?�용 |
|------|------|
| `index.html` | ???�서 · text-group · family dropdown 구조 |
| `css/style.css` | 간격 8/36/70 · SNS ?�단 ?�렬 · family 220×52 |
| `js/main.js` | ?��?�??�이??slideToggle |

### MCP bbox 기�?

- Frame 32(logo+family) **??* · Frame 31(info+SNS) **?�래** · ??gap **70**
- meta?�links **8** · links?�copy **36**
- SNS cross **MAX**(?�단 ?�렬) · family pad 12/16 gap 75

---

### 갱신
- `20-harness-workflow.mdc` ???�션 QA ?�차 · qa-log ?�수 · ?�외 종료 ???�급 QA
- `30-figma-to-code.mdc` ???�Gap · spacing?�bbox 교차 검�?- `50-qa-checklist.mdc` · `_docs/qa-checklist.md` ??gap bbox · ?�션 QA 루프
- `_logs/qa-log.md` ??mainstream header~works ?�급 PASS
- `_logs/decision-log.md` ??QA 루프 복�? ?�정
- `_logs/failure-log.md` ??works gap

---

**?�플�?** `mainstream` · **?�션:** `works` (`147:2327`)

| ?�일 | ?�용 |
|------|------|
| `index.html` | head · accordion gallery 4 panels |
| `css/style.css` | flex 959/294 · caption active only · @1024 ?�로 stack |
| `js/main.js` | gallery panel click ??`is-active` toggle |

### MCP 기�?

- pad 120/40 · head?�gallery gap 64 · head gap 18 · **align CENTER**
- gallery h 1097 · gap 10 · expanded 959 · collapsed 294
- panel pad 54/42 · caption 32/700 + 22/500 gap 16 · **LEFT** (active only)
- images `works-gallery-01~04.png`

---

**?�플�?** `mainstream` · **?�션:** `news` (`146:1534`)

| ?�일 | ?�용 |
|------|------|
| `index.html` | news head · nav 02/04 · card 3 |
| `css/style.css` | PC + @1024(1?? + @768 · bg `news-bg.png` opacity 12% |
| `js/main.js` | `scrollRestoration=manual` · refresh ??scroll top |

### MCP 기�?

- pad 120/40 · bg image 12% · intro?�list gap 64 · head?�nav gap 38
- title 48/800 · desc 22/500 · **align CENTER**
- nav gap 10 · arrow 36 · pager 02/04 gap 14
- cards 3??gap 1 · image 613×538 · card gap 28 · body pad 26 · title 26/600 LEFT · date 20/500

---

**?�플�?** `mainstream` · **?�션:** `stats` (`146:1507`)

| ?�일 | ?�용 |
|------|------|
| `index.html` | stats head · 4 stat items · visual 마크??|
| `css/style.css` | PC + @1024(2×2) + @768(1?? |

### MCP 기�?

- pad 120/40 · bg `#0f408f`
- head gap 18 · title 48/800 · desc 22/500 · **align CENTER**
- stat-list 1530 (1840 ??중앙) · 4??gap 0 · item pad 26/46 · value 56/800 · label 26/500 · **align CENTER**
- head?�list gap 64 · list?�visual gap 62
- visual 1530×594 · `stats-visual.png`
- **bg split:** `#0f408f` ~ visual ?�로 중앙 · ?�단 `#fff` · visual overlap

---

**?�플�?** `mainstream` · header / hero / story

| ?�일 | ?�용 |
|------|------|
| `css/style.css` | hero ?�단 pad 90??0 (`clamp(20px, 2.0833vw, 40px)`) |
| `css/style.css` | header logo Figma 117×104 명시 (square PNG max-height 축소 ?�소) |
| `css/style.css` | story head `text-align: center` · `align-items: center` |

**?�유:** ?�용????hero ?�단 ?�백 축소, 로고 축소 보임, story ?�?��? Figma 중앙 ?�렬

---

### 갱신
- `30-figma-to-code.mdc` ??shell vs inner narrow, ultrawide QA
- `40-template-code-style.mdc` ??`.container` shell
- `50-qa-checklist.mdc` · `_docs/figma-to-code-guide.md` · `_docs/qa-checklist.md`
- `_logs/failure-log.md` ??layout shell cap ?�발 방�?

---

## 2026-06-08 ??[rules] 반응??breakpoint·QA 뷰포??기�? 추�?

### ?�규·갱신

| ?�일 | ?�용 |
|------|------|
| `.cursor/rules/35-responsive.mdc` | 1024/768 breakpoint · ?�택·hover/?�치 · QA 뷰포??5�?|
| `.cursor/rules/00-core.mdc` | breakpoint 참조 |
| `.cursor/rules/20-harness-workflow.mdc` | 구현 ?�서 @1024/@768 |
| `.cursor/rules/30-figma-to-code.mdc` | ?�료 기�? |
| `.cursor/rules/40-template-code-style.mdc` | CSS breakpoint |
| `.cursor/rules/45-interaction-patterns.mdc` | hover/?�치 |
| `.cursor/rules/50-qa-checklist.mdc` | QA 뷰포??|
| `_docs/figma-to-code-guide.md` | ?�블릿·모바일·QA |
| `_docs/qa-checklist.md` | §3 반응??QA |
| `_harness/README.md` | 반응???�약 |
| `_logs/decision-log.md` | mainstream·반응??결정 |

---

## 2026-06-08 ??[template] mainstream ?�캐?�드·Figma ?�인

### ?�정

- Figma: `mainstream` (`146:943`) · `templates/mainstream/`
- ?�크린샷: `_harness/snapshots/mainstream/mainstream.png`
- hero ?�라?�더: 1�??�적 ?�자??· JS ?�터?�션 추후
- header: Figma Auto Layout ?�환 (구현 ??MCP ?�분??
