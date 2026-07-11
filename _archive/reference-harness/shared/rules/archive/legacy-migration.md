# Legacy Migration & Case Reclassification

> **2026-07-08 (rev2)** — 단계번호 확장(original-qa · working-qa · platform-qa).  
> 기존 case **즉시 rename·삭제·덮어쓰기 금지**.

## 구 → 신 폴더

| 구 | 신 | 비고 |
|----|-----|------|
| `00-reference/` | `00-source/` (+captures) · 분석은 `03-analysis/` | |
| `01-original/` (평면) | 유지 · rev는 `original-revision.md` 승인 후 | sample03 |
| `02-analysis/` | `03-analysis/` | sample03만 존재 |
| _(없음)_ | `02-original-qa/` · `05-working-qa/` · `_dev/` | **신규 필수** |
| `03-working-copy/` | `04-working-copy/` | |
| `04-normalized/` / `02-normalized/` | `06-normalized/` | |
| `05-final/` | `07-final/` | |
| `06-platform-map/` / `03-cafe24-map/` | `08-platform-map/` | |
| `01-reconstruction/` | `legacy/` 또는 fallback | **original/PASS 아님** |

## reconstruction 처리

- 기본 흐름에서 **제외**
- fallback만 (`reconstruction.md`) · 사용자 승인 필수
- structure-only HTML → `legacy-structure-mock` / `draft` · original·working·final·PASS로 **인정 금지**

## 마이그레이션 영향 (즉시 적용 안 함)

| 영향 | 설명 |
|------|------|
| sample03 paths | `02-analysis` → `03-analysis` rename 시 README·manifest 링크 |
| preview script | original 평면 구조 가정 |
| cafe24 rules | `06-platform-map` glob → `08-platform-map` (병행 유지) |
| case manifests | stages 키 확대 · 구 `reference`/`reconstruction` → `legacy` |

**정책:** 규칙·템플릿만 신 스키마. case 폴더 rename은 case별 승인 후.

## 기존 case 재분류 (결과물 미수정 · 보고용)

| caseId | source | capture | local original | completeness | HTML/CSS/JS/img/font | 내부페이지 | 로컬실행 | originalQa | PASS가능 | 다음단계 | structure-mock/recon | 재분류 |
|--------|--------|---------|----------------|--------------|----------------------|------------|----------|------------|----------|----------|----------------------|--------|
| sample01 | cafe24 demo | 00-reference | 없음 | n/a | 캡처·분석만 | 없음 | n/a | 없음 | **불가** | 00-source→01 수집 | 없음 | **source-capture-only** |
| sample02 | cafe24 demo | 00-reference | 없음 | n/a | 동일 | 없음 | n/a | 없음 | 불가 | 수집 필요 | 없음 | source-capture-only |
| sample03 | cafe24 demo | 00-source+ref | 있음 (browser) | **browser-captured** | HTML/CSS/JS/img 일부 · font 일부 | 메인 중심 | preview 서버 | **미실시** | QA 전 **불가** | 02-original-qa | legacy recon → mock/draft | **original-capture-pending-qa** |
| sample04 | cafe24 demo | 00-reference | 없음 | n/a | 캡처만 | 없음 | n/a | 없음 | 불가 | 수집 | 없음 | source-capture-only |
| forward-clinic | 병원 URL | 00-reference | 없음 | n/a | 캡처·분석 | 없음 | n/a | 없음 | 불가 | 수집 | 없음 | source-capture-only |
| celltrion | URL | 00-reference | 없음 | n/a | 동일 | 없음 | n/a | 없음 | 불가 | 수집 | 없음 | source-capture-only |
| reone-skin | URL | 00-reference | 없음 | n/a | 동일 | 없음 | n/a | 없음 | 불가 | 수집 | 없음 | source-capture-only |
| bv-clinic | URL | 00-reference | 없음 | n/a | 동일 | 없음 | n/a | 없음 | 불가 | 수집 | 없음 | source-capture-only |
| lu-dental | 미수집 | 틀만 | 없음 | n/a | 없음 | 없음 | n/a | 없음 | 불가 | source 수집 | 없음 | pending-source |

### sample03 상세

- legacy `01-reconstruction` / `legacy/01-reconstruction` = **legacy-structure-mock / high-fidelity 시도** — original·PASS 아님
- `01-original` = browser-captured · skin-zip 등급 아님 · 상업 납품 전 정식 ZIP 필요
- 다음 허용: `02-original-qa`만 · working-copy **금지** (QA pass/partial 승인 전)

## manifest stages (신)

`source` · `originalCapture` · `originalQa` · `analysis` · `workingCopy` · `workingQa` · `normalized` · `final` · `platformMap` · `platformQa`
