# Cafe24 Instruction Review Briefing

## 1. 검수 목적

본 패키지는 카페24 스마트디자인(EC 스킨) 작업에 영향을 주는 **현재 지침·문서 상태**를 외부에서 검수하기 위한 스냅샷이다.

검수 목적(요청 원문):

- 중복 규칙 확인
- 서로 충돌하는 규칙 확인
- 불필요하게 복잡한 승인·QA 절차 확인
- 규칙 우선순위와 적용 범위 확인
- 존재하지 않는 파일이나 경로를 참조하는 규칙 확인
- 카페24 모듈·변수·폼·팝업 관련 핵심 규칙의 누락 확인

**이번 패키징에서는 규칙을 수정·개선하지 않았다.** 수집·설명만 수행했다.

---

## 2. 카페24 관련 파일 구조

존재 확인 결과:

| 경로 | 결과 |
|------|------|
| `.cursor/rules/` | 존재 · cafe24 관련 mdc 포함 |
| `.cursor/skills/` | **not found** |
| `.cursor/commands/` | **not found** |
| `docs/cafe24/` | 존재 · popup-rules + inventory JSON |
| `_reference-harness/` | 존재 · cafe24-original · workflow 등 |
| `AGENTS.md` | **not found** |
| `CLAUDE.md` | **not found** |
| `llms.txt` (repo root) | **not found** (`templates/cafe24_shop/llms.txt`만 존재 · ZIP 제외) |
| `cafe24/` 제품 폴더 | **미존재** (규칙상 map 승인 전 생성 금지와 일치) |

관련 트리(규칙·문서만 · SoT 원본 제외):

```text
.cursor/rules/
  00-project-tracks.mdc
  00-core.mdc
  60-delivery.mdc
  80-cafe24-smart-design.mdc
  81-cafe24-module-map.mdc
  82-cafe24-qa.mdc
  83-reference-harness.mdc
  83-reference-reconstruction.mdc
docs/cafe24/
  popup-rules.md
  modules.json / variables.json / forms.json / pages.json / directives.json
_reference-harness/
  README.md
  shared/rules/workflow.md, track.md, stage-gates.md, cafe24-original.md,
    original-qa.md, original-immutable.md, working-copy.md, page-inventory.md, …
  shared/templates/manifest.template.json, …
templates/cafe24_shop/   ← 규칙상 read-only SoT (본 ZIP에 소스 미포함)
```

`templates/cafe24_shop/` 메타(소스 미포함):

- HTML 파일 수: **228**
- 주요 폴더: attend, board, config, coupon, css, estimate, ez, intro, js, layout, member, myshop, order, preference, product, shopinfo, SkinImg, smart-banner, supply, svg
- 주요 레이아웃: `layout/basic/layout.html`, `popup.html`, `header.html`, `footer.html`, `main.html`
- 인벤토리 생성 여부: **예** (`docs/cafe24/*.json`)
- 원본 수정 여부(지침): **수정 금지** · 인벤토리는 읽기 전용 분석
- 규칙상 역할: 모듈·변수 **읽기 전용 vocabulary SoT** (`00-project-tracks`, `80`, `81`)

상세: 패키지 내 `CAFE24_SHOP_META.txt`.

---

## 3. 규칙 파일 목록

| 파일 경로 | 파일 유형 | 적용 범위 | 역할 | 활성화 조건 |
|-----------|-----------|-----------|------|-------------|
| `.cursor/rules/00-project-tracks.mdc` | Cursor Rule | 전 프로젝트 | 트랙 분기 · cafe24 vs WP 용어 · 승격 게이트 · 충돌 우선순위 | **alwaysApply: true** · globs 미지정 |
| `.cursor/rules/00-core.mdc` | Cursor Rule | 공통 | 크몽 정적 핵심 · (간접) 플랫폼 폴더 금지 | alwaysApply 추정 필요→문서 frontmatter 확인: 프로젝트 관례상 core · **alwaysApply 기재는 파일 자체 확인** |
| `.cursor/rules/80-cafe24-smart-design.mdc` | Cursor Rule | cafe24-skin 제품 | 경로·SoT·게이트·파일럿·HTML 제약 | alwaysApply: **false** · globs: `cafe24/**`, harness platform-map 경로, `81`/`82` |
| `.cursor/rules/81-cafe24-module-map.mdc` | Cursor Rule | map 작성 | mapping 산출물·승인·SoT 참조 | alwaysApply: **false** · globs: platform-map 경로, `cafe24/**`, `80` |
| `.cursor/rules/82-cafe24-qa.mdc` | Cursor Rule | 스킨 QA | Visual vs Commerce QA 분리 | alwaysApply: **false** · globs: `cafe24/**`, platform-qa/map 경로, `80` |
| `.cursor/rules/83-reference-harness.mdc` | Cursor Rule | harness | original 수집·QA·working-copy | alwaysApply: **false** · globs: `_reference-harness/**` |
| `.cursor/rules/83-reference-reconstruction.mdc` | Cursor Rule | legacy | DEPRECATED · reconstruction fallback | alwaysApply: **false** · globs: `01-reconstruction/**` |
| `.cursor/rules/60-delivery.mdc` | Cursor Rule | 납품 | 정적 납품 경로(cafe24 하위 금지와 `00` 연계) | frontmatter 별도 · cafe24 전용 납품 경로 **금지**는 tracks/80에도 명시 |
| `docs/cafe24/popup-rules.md` | Markdown 문서 | SoT·working·map·QA 시 참고 | 팝업 분류·유지 규칙 | Cursor glob **미지정** · 규칙 mdc에서 **docs/cafe24 경로 참조 문자열 없음** |
| `_reference-harness/shared/rules/*.md` | Harness SoT | reference-harness | workflow·originalQa·cafe24-original 등 | `83` 및 README가 SoT로 지정 |
| `_reference-harness/README.md` | README | harness | 단계 요약·시작 명령 | 실험 트랙 |

`00-core.mdc` frontmatter: 본 브리핑 시점 패키지에 복사됨 · cafe24 전용 본문은 제한적이나 `_delivery/cafe24` 금지와 정합.

---

## 4. 규칙 우선순위

문서에 **명시된** 우선순위:

| 우선순위 | 파일 경로 | 적용 범위 | 다른 규칙과의 관계 |
|----------|-----------|-----------|-------------------|
| 1 | 사용자 명시 지시 | 전역 | 최상위 (`00-project-tracks.mdc` 「충돌 시 우선순위」) |
| 2 | `00-project-tracks.mdc` | 트랙 분기 | 정적 / WP / cafe24-skin / reference |
| 3 | 트랙별 (`80~82` / `83`+harness shared) | 해당 트랙 | tracks가 cafe24-skin → `80~82`, reference → `83`+shared |
| 4 | `_docs/context-guide.md` | 컨텍스트 | tracks에 명시 · **본 파일에 cafe24/카페24 문자열 없음**(검색) |

그 외 파일 간 「80이 81보다 상위」 등 **숫자 규칙 우선순위는 문서에 명시되지 않음** → **명시되지 않음** (상호 교차 참조만 존재: 80↔81↔82).

---

## 5. 현재 정의된 작업 대상

### templates/cafe24_shop

- `00-project-tracks.mdc`: SoT(읽기 전용) · 모듈·변수 vocabulary · **수정·이동·직접 편집 금지** · 장기 `_baseline` 이사는 **별도 승인**
- `80`: 모듈·변수 **읽기 전용** vocabulary · 수정·이동·직접 고객 작업 금지 · overwrite 금지
- `81`: 열람·인용만 · 수정·이동·overwrite 금지 · 후보 module은 SoT 실재 문자열 우선
- `docs/cafe24/popup-rules.md`: SoT read-only · 원본을 문서만으로 수정하지 않음

### SoT

- 위와 동일하게 `templates/cafe24_shop/` 를 SoT로 호칭 (`80` §2 표, `81` 선행, tracks)

### baseline

- `00-project-tracks.mdc`: `templates/cafe24_shop/` 덮어쓰기·이동 금지, **장기 `_baseline` 이사는 별도 승인**
- harness 규칙에 「기능 baseline」 별도 폴더 정의는 **문서상 `_baseline` 실제 경로는 미생성**; 용어는 「별도 승인 시 이전」 수준
- Ask/설계 논의에서 나온 `cafe24/_baseline` 은 **제품 폴더로 아직 없음**

### purchased original

- `_reference-harness/shared/rules/cafe24-original.md`: `originalCompleteness: skin-zip` · ZIP ↔ local original 비교 · commercial용
- `license.md` / `rightsType`: purchased 등

### working copy

- harness: `04-working-copy` · original **전체 복사** · 요청만 수정 (`working-copy.md`, `83`, `workflow.md`)
- `80` globs·문장: working-copy에 `module=`/`{$}` **삽입 금지**(map 미승인 시) — harness working과 제품 스킨 코딩을 같은 「working」으로 읽으면 혼동 가능(§12)

### sample 또는 demo

- `cafe24-original.md` **B**: browser-captured-demo · 판매 스킨 전체 보유로 취급 금지 · 납품 금지
- harness sample01~04 · originalCompleteness browser-captured (legacy-migration 보고)

### cafe24/{slug}

- tracks · `80`: map **승인 후** 제품 스킨 경로
- map 승인 전 **생성 금지**(기본)

---

## 6. 현재 작업 흐름

규칙에 **실제로 적힌** 순서(이상적 재설계 아님):

**A. reference-harness → cafe24 승격** (`00-project-tracks` / `80` / `workflow.md`):

```text
00-source → 01-original (immutable) → 02-original-qa (PASS|승인 partial)
→ 03-analysis → 04-working-copy → 05-working-qa
→ 06-normalized? → 07-final → 08-platform-map → 사용자 map 승인
→ cafe24/{slug}/ 이식 → 09-platform-qa (82)
```

**B. 제품 스킨 게이트** (`80` §3):

```text
originalQa·07-final PASS 전 스킨 코딩 금지
→ 08-platform-map (mapping.md|json)
→ 사용자 map 승인
→ cafe24/{slug}/ 이식
→ 09-platform-qa
```

**C. map 시점** (`81` §2): `07-final` PASS 전 초안만 · PASS 후 확정 · 승인 전 스킨 코딩 금지.

**D. QA** (`82`): Visual + Commerce 둘 다 PASS 전 완료 금지 · 선행: map 승인 · 스킨 백업.

---

## 7. 디자인 자유도와 수정 위험도

| 등급 | 정의가 있는 파일 | 원문 요지 |
|------|------------------|-----------|
| `free` | `_reference-harness/shared/rules/page-inventory.md` § designFreedom | 메인·콘텐츠·상품 목록·배너·브랜드 |
| `guarded` | 동일 | 상세·로그인·가입·장바구니·게시판 폼·검색 · module/`{$}`/form **임의 변경 금지** |
| `no-touch` | 동일; `81` changeType; `80`/`82` 문구 | 주문서·결제·인증·서버 연동; 가입~마이페이지 map 제외 |
| `skin-visual` / `keep-commerce` / `no-touch` | `81` mapping `changeType` | 파일럿 매핑 분류 |
| inventory `risk: no-touch` | `docs/cafe24/forms.json` note · popup-rules | 주문·회원 등 form 우선 분류 |
| `style-only` / `structure-soft` | **규칙 mdc/SoT md에 공식 정의 문자열 없음** (Ask 설계 제안만 가능 · **현재 규칙 미등재로 기록**) | 미존재 |

문서마다 `no-touch`가 (1) 페이지 designFreedom (2) map changeType (3) inventory risk 로 **중복 사용**됨 → §11.

---

## 8. 모듈·변수·폼 관련 규칙

| 항목 | 현재 규칙 요약 | 근거 |
|------|----------------|------|
| module 이름 생성·변경 | SoT·map에 없는 module id **창작 금지** · 임의 변경 금지 | `80` §5–8 · `81` §6·8 · `82` §4 |
| `{$변수}` | 임의 변경 금지 · raw 노출 금지(QA) | `80` §5 · `82` §2 |
| modifier | Cursor rule에 「\|display 분리 집계」 규칙 **없음** · 인벤토리 JSON 스키마에만 반영 | `docs/cafe24/variables.json` note |
| form vs module-form-structure | 인벤토리 note로 구분 · Cursor rule에 kind 명칭 **명시 없음**(폼 name/action 유지만) | forms.json · `80`/`81`/`82` |
| hidden input | page-inventory: guarded/no-touch에서 hidden **임의 변경 금지** | page-inventory.md |
| 주문·회원·장바구니·옵션 | 파일럿 non-UI · no-touch · Commerce QA | `80` §4 · `81` §5 · `82` §3 |
| Cafe24 JS | 커머스 이벤트 깨는 바인딩 금지 · popup.js 등 유지(popup-rules) | `80` §5 · popup-rules §2 |
| 공식문서 vs 인벤토리 | SoT(`cafe24_shop`) 실재 문자열 우선 · `docs/cafe24/*.json`을 mdc가 **직접 참조하지는 않음** | `81` §6 · Grep: `.cursor/rules`에 `docs/cafe24` **0건** |

---

## 9. 팝업 관련 규칙

정의 파일: `docs/cafe24/popup-rules.md` (및 SoT 구조에 대한 설명).

| 항목 | 내용 |
|------|------|
| popup 레이아웃 | `@layout(...popup.html)` · `body#popup` · 정적 단독 HTML로 취급 **금지** |
| 기능 팝업 | 상품·주문·회원·쿠폰·주소 → module/변수/input/JS 유지 |
| 관리자 연동 | `/popup/` 폴더 부재로 관리자 팝업 없음 **단정 금지** |
| custom-promo-modal | module·commerce input 없는 홍보만 후보 |
| 오늘 하루 | `{$checkbox_today_open}` 등 **실재할 때만** 분류 |
| 쿠키·체크박스 | 기능 존재 시 제거 금지 |
| `/popup/` | SoT에 폴더 없음 · 부재≠기능 없음 |

Cursor Rule `80`/`81`/`82`에는 팝업 전용 절 **없음** · popup-rules는 **glob 미연동**.

---

## 10. QA와 승인 절차

| 절차명 | 정의 파일 | 목적 | 필수 여부 | 통과 조건 |
|--------|-----------|------|-----------|-----------|
| 분석/디자인 승인 | `00-project-tracks` 킥오프 #5 | 코딩 전 확인 | **항상 필수**(명시) | 「이대로 진행」 등 |
| originalQa | harness `original-qa.md` · `stage-gates` · `83` | source↔original | PASS\|승인 partial 전 working 금지 | PASS 조건 목록 |
| workingQa | `workflow` / `working-copy` / stage-gates | original↔working | working 후 | 비교·회귀 |
| map 승인 | `81` · tracks #6 | 스킨 코딩 게이트 | cafe24-skin map 있을 때 **필수** | 「map 승인, 스킨 이식 진행」 |
| Visual QA | `82` | 파일럿 UI | 완료에 **필수**(Commerce와 함께) | 체크리스트 |
| Commerce QA | `82` | 기능 유지 | 완료에 **필수** | 체크리스트 |
| platform-map | `80`/`81`/`workflow` | 모듈 매핑 문서 | 이식 전 | mapping + 승인 |
| platformQa | `80`/`82`/`workflow` | 이식 후 QA | 완료 판정 | Visual+Commerce |
| packaging | 스킨 ZIP / 디자인 관리자 (`80`) · `_delivery/cafe24/` **금지** | 납품 | 경로 추후 확정 | `_delivery/cafe24` 사용 금지 |
| 스킨 백업 | `80` §7 · `82` 선행 | 이식 전 | 백업 없으면 수정 금지(`80` 게이트) | 경로·일시 로그 |

---

## 11. 중복 가능성이 있는 규칙

| 규칙 A | 규칙 B | 반복되는 내용 | 중복 수준 |
|--------|--------|----------------|-----------|
| `00-project-tracks.mdc` Cafe24-skin 요약 · Reference 승격 | `80` §2–3 · `workflow.md` 파이프라인 | 단계열 · map 전 cafe24 금지 · SoT 읽기전용 | **부분 중복** |
| `80` §5 모듈/변수/name/action 변경 금지 | `81` §5·8 · `82` §3–4 | no-touch·폼·module 유지 | **부분 중복** |
| `80` cafe24_shop 수정 금지 | `81` §6·8 · tracks 금지 | SoT 불변 | **완전 중복**에 가까움 |
| `83` originalQa 게이트 | `workflow`/`stage-gates`/`original-qa.md` | PASS 전 working 금지 | **부분 중복** |
| `page-inventory` no-touch | `81` changeType no-touch · forms risk no-touch | 동일 용어 다층 | **표현만 유사**~**부분 중복** |
| `83-reference-reconstruction` DEPRECATED | `reconstruction.md` fallback | legacy reconstruction | **부분 중복**(의도적 deprecation) |

---

## 12. 충돌 가능성이 있는 규칙

| 규칙 A | 규칙 B | 충돌 내용 | 우선 규칙 명시 여부 |
|--------|--------|-----------|---------------------|
| `80` 게이트 표: **normalized PASS → 스킨 코딩 시작 금지** | `80`/`workflow`: 스킨 코딩 게이트를 **map 승인·07-final·originalQa**에 둠 | 「normalized PASS」만으로 스킨 시작이 막는 조건인지, final/map이 기준인지 **표 vs 본문 서술 불일치 가능** | **명시되지 않음** (표와 §3 본문 병행) |
| harness `04-working-copy`에서 HTML/CSS 수정 허용(요청 범위) | `80` map 미승인 시 working-copy에 `module=`/`{$}` **금지** | harness 디자인 수정 vs 제품 모듈 삽입 금지가 **같은 「working-copy」 단어**로 걸쳐 있음 | tracks: reference vs cafe24-skin 분리 · 단어 공유는 **명시 해소 약함** |
| `81`: `07-final` PASS 전 map **초안만** | 실험 중 map 없이 분석만 | 초안 허용 범위는 있으나 스킨 금지와 병기 | 부분 정합 · 초안≠코딩 |
| demo `browser-captured` 분석 허용 | demo를 working base로 쓰는 행위 | **금지**는 cafe24-original B에 명시 · 승격 경로와 혼동 위험 | cafe24-original에 금지 명시 |
| `60-delivery` 정적 packaging vs cafe24 스킨 ZIP | tracks: cafe24는 `_delivery/cafe24/` 금지 | 경로만 다르면 충돌 아님 · 납품 명령 공유 시 혼동 | tracks·80에 `_delivery/cafe24` 금지 명시 |

---

## 13. 과도하거나 실행하기 어려운 절차

| 파일 경로 | 절차 | 문제 가능성 | 근거 |
|-----------|------|-------------|------|
| `workflow.md` / `original-qa.md` | rendered DOM·request inventory·checksum·1920/390 전수 | 데모 browser-capture에서 **완전 PASS가 어렵고** partial 승인에 의존 | original-qa 필수 검사 목록 길이 |
| `82` Commerce QA | 주문·결제·마이페이지 진입 | 「실결제 불가 시 진입·폼까지」 단서는 있으나 **스테이징 필수** | `82` §3 |
| `80`+`81`+`83`+harness 다단 | originalQa → … → final → map → 승인 → 이식 → platformQa | 단계·승인 횟수 많음 · 파일럿에도 전 구간 강제처럼 읽힘 | tracks 승격 블록 · `80` §3 |
| `81` mapping 필드 다수 | blockId·staticRef·variables·cssJs·risk·fallback | 작은 파일럿에도 **전 필드 표** 요구 | `81` §3–4 |
| `page-index.md` `_dev/` 다수 HTML | compare·inventory·visual-diff | harness에 **필수 산출물 목록이 큼** · 현재 sample에 `_dev` 미구현 가능 | page-index 구조 |

---

## 14. 누락 가능성이 있는 핵심 규칙

| 항목 | 존재 여부 | 관련 파일 |
|------|-----------|-----------|
| 모듈명 임의 생성 금지 | **있음** | `80` `81` `82` |
| 변수명 임의 생성 금지 | **부분** (임의 **변경** 금지 위주 · 「신규 변수명 창작」 단독 조항은 약함) | `80` §5 |
| module/form/hidden 유지 | **있음** | `80` `81` `82` page-inventory |
| 원본과 작업 사본 분리 | **있음** (harness original vs working) | `83` workflow working-copy |
| 판매 테마 vs 기본 스킨 역할 분리 | **있음** | cafe24-original A/B |
| 팝업 유형 구분 | **있음**(문서) · Cursor Rule 연동 **약함** | popup-rules.md |
| 관리자 설정 의존성 확인 | **부분** (`81` risk에 진열·스마트배너·EZ) | `81` §7 |
| 실제 쇼핑몰 테스트 필요 | **있음** (Commerce QA · 스테이징) | `82` §3 |
| 보안 정보 제외 | **WP 쪽 강함** (`71`) · cafe24-skin 전용 보안 절은 **제한적** | `71-wordpress-security.mdc` (본 ZIP cafe24 핵심 세트 외) |
| 납품 ZIP 제외 (`_dev` 등) | harness: `_dev` 납품 제외 명시 · cafe24 제품 ZIP exclude 목록은 **약함** | page-index · `80`은 `_delivery/cafe24` 경로 금지만 |

**새 규칙은 작성하지 않음.**

---

## 15. 존재하지 않는 참조

| 참조 경로 | 참조한 파일 | 실제 존재 여부 |
|-----------|-------------|----------------|
| `cafe24/{slug}/` (제품) | `80` `81` `82` tracks | 폴더 **현재 없음**(의도적 미생성 가능) |
| `_delivery/cafe24/` | `80` tracks (금지 대상으로 언급) | **없음** · 금지 경로 |
| `_docs/context-guide.md` cafe24 | tracks 우선순위 4 | 파일 **존재** · 내용에 cafe24 **미포함** |
| harness `06-platform-map` / `03-cafe24-map` | `80`/`81`/`82` globs (레거시) | **레거시·병행** · 신규는 `08` |
| `docs/cafe24/*.json` | — | 규칙 mdc **미참조** · 문서만 존재 |
| `module-occurrences.json` | (요청 목록에 등장) | **없음** |
| AGENTS.md / CLAUDE.md | 수집 대상 | **없음** |
| `.cursor/skills` / `commands` | 수집 대상 | **없음** |

스크립트 (`mirror-original.js`, `preview-original.js`)는 **존재** · harness README가 참조.

---

## 16. 인벤토리 현황

| 파일 | 크기 | 전체 항목 수 | 주요 필드 | 규칙에서 사용 여부 |
|------|------|--------------|-----------|-------------------|
| `docs/cafe24/modules.json` | ~389 KB | modules **608** (occ 1167) | rawName, baseName, instanceSuffix, risk, files, variables | **Cursor Rule 직접 참조 없음** |
| `docs/cafe24/variables.json` | ~3.3 MB | baseName **2892** | baseName, rawExpressions, contexts, formRelated | **직접 참조 없음** |
| `docs/cafe24/forms.json` | ~87 KB | **149** | kind, module, risk, cafe24FormFields | **직접 참조 없음** · popup-rules가 inventory risk 언급 |
| `docs/cafe24/pages.json` | ~160 KB | **228** | path, modules, usesPopupLayout, risk | **직접 참조 없음** · popup-rules가 pages 언급 |
| `docs/cafe24/directives.json` | ~74 KB | **280** | type, target, files | **직접 참조 없음** |
| `module-occurrences.json` | — | — | — | **파일 없음** |

생성 목적(관측): `templates/cafe24_shop` HTML 읽기 전용 분석 지식 베이스.  
ZIP: 500KB 이하인 directives·forms·modules·pages는 `project-files/docs/cafe24/`에 **전체** 포함. variables는 **샘플만** (`inventory-samples/variables.sample.json`).

---

## 17. 포함 파일 목록

패키지 루트:

- `CAFE24_INSTRUCTION_BRIEFING.md`
- `MANIFEST.md`
- `BEFORE_STATUS.txt`
- `AFTER_STATUS.txt`
- `FILE_HASHES.sha256`
- `CAFE24_SHOP_META.txt`
- `NOT_FOUND.txt`
- `_copied_list.txt`

`project-files/` (복사본 · 상대 경로 유지):

- `.cursor/rules/00-project-tracks.mdc`
- `.cursor/rules/00-core.mdc`
- `.cursor/rules/60-delivery.mdc`
- `.cursor/rules/80-cafe24-smart-design.mdc`
- `.cursor/rules/81-cafe24-module-map.mdc`
- `.cursor/rules/82-cafe24-qa.mdc`
- `.cursor/rules/83-reference-harness.mdc`
- `.cursor/rules/83-reference-reconstruction.mdc`
- `docs/cafe24/popup-rules.md`
- `docs/cafe24/directives.json`
- `docs/cafe24/forms.json`
- `docs/cafe24/modules.json`
- `docs/cafe24/pages.json`
- `_reference-harness/README.md`
- `_reference-harness/shared/rules/` (workflow, track, stage-gates, cafe24-original, original-*, working-copy, page-*, license, source-collection, legacy-migration, analysis-artifacts, reconstruction, _investigation-…)
- `_reference-harness/shared/templates/` (manifest.template.json, case-readme, 01-original-README, dev-readme)

`inventory-samples/`:

- `modules.sample.json`
- `variables.sample.json`
- `forms.sample.json`
- `pages.sample.json`
- `directives.sample.json`

---

## 18. 제외 파일과 이유

| 항목 | 이유 |
|------|------|
| `templates/cafe24_shop/**` 전체 | 요청 §6 · SoT 소스 대량 |
| `docs/cafe24/variables.json` 전체 | ~3.3MB · 샘플만 |
| `.env` · secrets | 보안 |
| `_reference-harness/cases/**` 캡처·미러 | 테마/캡처·대용량 · 규칙 텍스트 아님 |
| sample 데모 자산 | 판매 테마/원본 |
| `node_modules` · `.git` | 제외 목록 |
| WP `71` 등 (선택) | cafe24-skin 핵심 세트 밖 · 필요 시 후속 |

---

## 19. 작업 중 생성된 파일

생성: `_review_exports/cafe24-instructions-review/**` 및 `_review_exports/cafe24-instructions-review.zip` 만.

기존 프로젝트 규칙·SoT·인벤토리 원본 **수정하지 않음**(복사·읽기만).  
`AFTER_STATUS.txt`에 검수 폴더 제외 잔여 변경 여부를 기록.

---

## 검수자용 요약 카운트 (후보)

| 유형 | 수(본 브리핑 표 행 기준) |
|------|-------------------------|
| 중복 후보 | **6** (§11) |
| 충돌 후보 | **5** (§12) |
| 존재하지 않는/미생성 참조 | **8** (§15 표 · 의도적 금지·미생성 포함) |
