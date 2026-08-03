# 프로젝트 현황 스냅샷 — 구조 · 된 것 · 안 된 것 · 확인 필요

> **⚠️ 실행 규칙·SoT 아님.** 현황 참고용. Cursor alwaysApply 대상 아님.  
> **위치:** `_docs/status/PROJECT_STATUS_SNAPSHOT.md`  
> **작성:** 2026-08-03 (문서 정리 후 갱신)  
> **목적:** 레포·지침·작업 상태를 한곳에서 확인  
> **갱신 기준:** `_docs/active-track.md` · `_logs/decision-log.md` 유효 표 · git  
> **사업 검증 기준본:** `VIBE_BUSINESS_VALIDATION_INSTRUCTION_IMPROVED.md` (축약 FINAL로 교체하지 않음)  
> **크몽 전제:** `KMONG_WP_BUSINESS_VALIDATION_CONTEXT.md`  
> **갭 참고:** `_docs/reviews/DESIGN_DEV_GAPS_FOR_REVIEW.md`

---

## 0. 한 줄 상태

**WP 트랙·토큰·A~F·모션(필요할 때만)·아이콘 복사 규칙은 문서 SoT에 반영됨.**  
**신규 slug 테마 제작은 시작하지 않음.** 소식/공지 CMS 구현 방식은 **미결정**.  
레거시 `wordpress/template-*` 등은 보관·참고용(신규 표준 베이스 미선언).

---

## 1. 현재 구조 (레포)

```
kmong-templates/
├── .cursor/rules/          # Cursor 규칙 (라우터·core·70 WP·30 피그마 등)
├── wordpress/              # 활성 작업 공간 (커스텀 테마)
│   ├── template-a/         # 기존 테마 (레거시·참고 가능)
│   ├── template-a-blocks/  # 블록 테마 실험 (레거시)
│   ├── tenfold-studio/     # 기존 테마 (레거시·참고 가능)
│   └── …                   # 신규 slug는 승인 후 생성
├── templates/              # 동결 — 하드코딩 정적
├── _delivery/              # 동결 — 구 정적 납품
├── _archive/               # 동결 — site/ · Cafe24 등
├── _harness/               # 패키징·검증 스크립트 (구현 공간 아님)
├── _icons/                 # 공용 SVG
├── _logs/                  # decision / change / qa / failure
├── _docs/active-track.md   # 현재 트랙 1장
│
├── PROJECT_CONTEXT.md                    # 사업·디자인 SoT
├── PROJECT_CONTEXT_wordpress_delta.md
├── WORDPRESS_TRANSITION_CHANGES.md       # WP CMS·보안·QA
├── WORDPRESS_SUBPAGE_UIUX_INSTRUCTION.md # 서브페이지
├── design-tokens-master.md               # 토큰 수치 SoT
├── design-do-dont.md                     # UI Do/Don't · ★취향
├── CURSOR_UIUX_DESIGN_DIRECTOR(1).mdc    # 디렉터(루트, rules 미정리)
├── KMONG_WP_BUSINESS_VALIDATION_CONTEXT.md
├── VIBE_BUSINESS_VALIDATION_INSTRUCTION_IMPROVED.md  # (미커밋 가능)
├── DESIGN_DEV_GAPS_FOR_REVIEW.md                   # (미커밋 가능)
└── (본 파일) PROJECT_STATUS_SNAPSHOT.md
```

### 트랙 요약

| 상태 | 내용 | 경로 |
|------|------|------|
| **활성** | WP Classic 커스텀 테마 · ZIP 납품 | `wordpress/{slug}/` → `dist/{slug}.zip` |
| **동결** | 하드코딩 정적 | `templates/` · `_delivery/` |
| **동결** | 개인 site | `_archive/site/` |
| **동결** | Cafe24·복제 등 | `_archive/` · rules `archive/80`~`84` |

### SoT 역할 (무엇을 읽을지)

| 문서 | 역할 |
|------|------|
| `active-track` + `00-project-router` | 지금 어디 작업하는지 |
| `PROJECT_CONTEXT` (+ delta) | 사업·디자인 원칙 |
| `design-tokens-master` | 색·타이포·간격·그림자 수치 |
| `design-do-dont` | Do/Don't · ★개인 취향 |
| `WORDPRESS_TRANSITION` | CMS·플러그인·보안·WP QA |
| `WORDPRESS_SUBPAGE` | 서브 IA·목록/상세·관리자 UX |
| `.cursor/rules/70`~`72` | WP 구현·보안·최종 검수 |
| `VIBE` + `KMONG_WP_…CONTEXT` | 사업 아이디어/가격·업종 검증 (코딩 규칙 아님) |
| `DESIGN_DEV_GAPS` | 디자인·개발 모자람·과함(조언·갭) |

---

## 2. 된 것 (완료)

### 2-1. 트랙·라우팅

- [x] 기본 트랙 = **WordPress** 커스텀 테마
- [x] 정적 하드코딩·개인 site **동결**
- [x] `active-track` · 라우터 · `10-structure` · `20-harness` · `70` WP 활성 문구
- [x] 납품 경로 = `package-delivery-wp.js` → `wordpress/{slug}/dist/{slug}.zip`

### 2-2. 확정 기술·디자인 전제

- [x] 호스팅: 카페24 WP (고객 명의)
- [x] 폰트 **SUIT** · 컨테이너 **1600** · BP **767 / 1023 / 1024 / wide 1600**
- [x] 타이포 최소: 본문 16 · 보조 14 · 캡션 12 · CTA 14 · 제목 20 · input 16
- [x] 아이콘: `_icons/` 우선 · CDN Lucide/Heroicons 기본 금지
- [x] 모션: **GSAP + ScrollTrigger** · 슬라이더 **Swiper** · `46` jQuery preset = WP 신규 기본 금지
- [x] 피그마: **줄 때만** `30` · 바이브·기획서 우선
- [x] CMS 킥오프 기본: 관리자 수정 = **공지(`notice`) CPT만** (확장 시 승인)
- [x] Elementor 등 빌더 임의 도입 금지
- [x] SEO/AEO/GEO = on-demand (`73`)
- [x] 병원·의원 = 초기 대상 **제외** (사업)

### 2-3. 디자인 충돌 A~F (문서 반영됨 · **git 커밋은 미완료**)

| ID | 확정 |
|----|------|
| A | 카드 내외부 대소 강제 없음 · PC padding/gap **24** |
| B | 브레드 = 깊을 때·상위 이동 필요할 때만 |
| C | 설계 PC·MO 함께 · CSS **모바일 퍼스트** |
| D | 메뉴 하드캡 없음 · **6+** 그룹핑 검토 |
| E | 그림자 기본 = 중립 alpha · 컬러 제한적 |
| F | 섹션 배경색 강제 아님 |

반영 파일(워킹트리 수정): `PROJECT_CONTEXT` · `design-do-dont` · `design-tokens-master` · `WORDPRESS_SUBPAGE` · `active-track` · decision/change-log

### 2-4. 규칙 잔여 정리 (일부 커밋됨)

- [x] `30`/`35`/`40`/`45`/`46`/`50`/`73` 활성 경로 문구 → wordpress (커밋 `3f50c3a`)
- [x] 사업 검증 컨텍스트 분리 `KMONG_WP_BUSINESS_VALIDATION_CONTEXT.md` (커밋됨)

### 2-5. 사업 상품 성격 (잠김)

- [x] 기본 상품 = **사람 작업 포함 서비스 + 디지털 테마 납품** (SaaS 아님)
- [x] 관리자 없는 정적 납품 = 기본 옵션 제외

---

## 3. 안 된 것 (미완료)

### 3-1. Git · 파일 정리

| 항목 | 상태 |
|------|------|
| A~F 반영 7파일 **커밋** | ❌ 미커밋 |
| `DESIGN_DEV_GAPS_FOR_REVIEW.md` 커밋 | ❌ untracked |
| `VIBE_BUSINESS_VALIDATION_INSTRUCTION_IMPROVED.md` 커밋 | ❌ untracked |
| `design-do-dont (1).md` 삭제 (중복·옛 문구) | ❌ 잔존 — **쓰지 말 것** |
| `_icons/*.tmp` 등 임시 파일 | ❌ 정리 필요 가능 |
| `PROJECT_STATUS_SNAPSHOT.md`(본 문서) 커밋 | ❌ 작성 직후 |

### 3-2. 문서 운영 (권장 · 테마 전 필수는 아님)

| 항목 | 상태 |
|------|------|
| Design Director → `.cursor/rules` 편입·역할 축소 | ❌ 루트 only · always 과적용 위험 |
| 디자이너용 **짧은 하루 루프** 카드 (5~7줄) | ❌ |
| SoT 중복 축소 (CONTEXT §3 ↔ do-dont · `wordpress-subpage-system` ↔ SUBPAGE) | ❌ |
| GSAP **허용 모션** 얇은 카탈로그 | ❌ (`46`은 WP 신규 기본 금지) |
| decision-log **과거 히스토리**가 현재로 오인되지 않게 안내 강화 | ⚠️ 유효 표는 있음 · 과거 섹션에 정적 활성 기록 잔존 |
| 레거시 `wordpress/template-*` / `tenfold-studio` **역할 표기**(보관 vs 베이스 후보) | ❌ 미정리 |

### 3-3. 워드프레스 제작

| 항목 | 상태 |
|------|------|
| 신규 납품용 **slug 승인** | ❌ |
| 현재 SoT 기준 **베이스 테마** 신설·정리 | ❌ (레거시 테마는 존재하나 “신규 표준 베이스” 미선언) |
| 토큰 → 테마 CSS 변수 보일러플레이트(표준) | ❌ 문서만 |
| 공지 CPT + 메인 3건 + 문의 + 편집자 안내(표준 킥오프) | ❌ 신규 slug 기준 |
| 카페24 업로드·인수 가이드 재사용 템플릿 | ❌ |

### 3-4. 사업 (검증 문서로 진행 가능 · 제작 전 확정 권장)

| 항목 | 상태 | 비고 |
|------|------|------|
| 시작 **업종** | ❌ 미정 | CONTEXT §8 |
| **가격**·패키지 | ❌ 미정 | |
| 고객 **편집 범위** (공지만 vs 확장) | ⚠️ 킥오프 기본=공지만 · 상품 확정은 미정 | |
| **유지보수** 월정액·범위 | ❌ 미정 | |
| 크몽 **첫 주문** 방식(상품·견적·선금·수정 횟수) | ❌ 미정 | |
| 포트폴리오 수량·레퍼런스 방향 | ❌ 미정 | |

---

## 4. 확인이 필요한 것 (결정·선택)

작업 들어가기 전에 **누가/무엇으로 확정할지**만 고르면 되는 항목.

### 4-1. 즉시 (문서·repo)

1. A~F + 본 스냅샷 + GAPS/VIBE **커밋할지** 여부  
2. `design-do-dont (1).md` **삭제 승인**  
3. Design Director를 **rules에 넣을지 / 참고만 / 축소 후 넣을지**

### 4-2. 첫 테마 전에

4. **첫 slug** 이름  
5. 베이스를 **완전 신규**로 갈지 · `template-a` 등을 **정리해 승계**할지  
6. 플러그인 **최소 세트**(후보 표 중 뭐가 필수인지) — TRANSITION §6  
7. 편집 범위: 상품 문구상 **공지 CPT만**으로 팔지 · 더 열지  

### 4-3. 사업 검증 (VIBE + KMONG context)

8. 업종 1순위  
9. 가격대·유지보수  
10. 크몽 상품 상세에 넣을 수정 횟수·페이지 수·납기 기준  

### 4-4. 의도적으로 나중

- SEO/AEO/GEO 실행 — 요청 시만  
- 정적 `templates/` 재개 — 명시 재개 전 금지  
- Cafe24 스킨 트랙 — 동결  

---

## 5. Git 스냅샷 (작성 시점)

**최근 관련 커밋**
- `6175d3b` / `e7459b8` — 사업 검증 컨텍스트 분리  
- `3f50c3a` — 규칙 경로 WP · GSAP 확정  
- `23f723e` — WP 트랙 복구 · CONTEXT·토큰 SoT  

**워킹트리 (미커밋 수정)**  
`PROJECT_CONTEXT.md` · `design-do-dont.md` · `design-tokens-master.md` · `WORDPRESS_SUBPAGE_UIUX_INSTRUCTION.md` · `_docs/active-track.md` · `_logs/decision-log.md` · `_logs/change-log.md`

**Untracked**  
`DESIGN_DEV_GAPS_FOR_REVIEW.md` · `VIBE_BUSINESS_VALIDATION_INSTRUCTION_IMPROVED.md` · `design-do-dont (1).md` · (임시) `_icons/*.tmp` · 본 스냅샷 파일

---

## 6. 추천 다음 순서 (강제 아님)

```
1) 미커밋 정리 + (1) 삭제 + 본 스냅샷 커밋
2) (선택) Director / 하루 루프 / 레거시 wordpress 폴더 역할 표기
3) 사업: 업종·가격·편집 범위·크몽 첫 주문 (VIBE+KMONG context)
4) slug 승인 → wordpress/{slug}/ 베이스 테마 착수
```

---

## 7. 빠른 체크리스트 (인쇄용)

**문서·규칙**
- [x] WP 기본 트랙
- [x] 토큰·모션·아이콘 확정
- [x] A~F 문구 반영
- [ ] A~F 등 **커밋**
- [ ] 중복 do-dont `(1)` 삭제
- [ ] Director 연결 여부 결정

**사업**
- [ ] 업종
- [ ] 가격·유지보수
- [ ] 편집 범위(상품)
- [ ] 크몽 첫 주문 방식

**제작**
- [ ] slug
- [ ] 베이스 테마(신규 or 승계)
- [ ] 공지 CPT 킥오프 구현
- [ ] QA · ZIP · 카페24

---

*이 파일은 현황 스냅샷이다. 확정이 바뀌면 `decision-log` 유효 표와 `active-track`를 먼저 고치고, 본 문서 §0·§2·§3을 같게 맞춘다.*
