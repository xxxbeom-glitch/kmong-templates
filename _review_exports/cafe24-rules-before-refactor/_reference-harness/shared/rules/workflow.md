# Reference Harness — Workflow (SoT)

> **1차 목적:** 레퍼런스를 보고 비슷한 HTML을 **새로 만드는 것**이 아니다.  
> 원본(또는 정식 보유 스킨)을 **전부 수집 → 불변 보관 → source↔original QA → 복사본에서만 요청 수정**.

## 파이프라인

```
00-source
  → 01-original (immutable archive)
  → 02-original-qa          ★ PASS/승인 partial 전 working 금지
  → 03-analysis
  → 04-working-copy         (original 전체 복사)
  → 05-working-qa
  → 06-normalized           (선택 · 승인 후)
  → 07-final
  → 08-platform-map         (필요 시 WP · cafe24)
  → 09-platform-qa
```

## 단계 요약

| 단계 | 폴더 | 역할 |
|------|------|------|
| 00-source | `00-source/` | URL·라이선스·수집일·목적·원격 캡처·remote request inventory |
| 01-original | `01-original/` | 수집 원본 전체 · **절대 수정 금지** (`original-immutable.md`) |
| 02-original-qa | `02-original-qa/` | source URL/ZIP ↔ local original 비교 (`original-qa.md`) |
| 03-analysis | `03-analysis/` | IA·style·component·interaction·asset·의존·위험 |
| 04-working-copy | `04-working-copy/` | original 전체 복사 · 요청분만 수정 (`working-copy.md`) |
| 05-working-qa | `05-working-qa/` | original ↔ working-copy 비교 QA |
| 06-normalized | `06-normalized/` | (선택) 경로·중복·토큰·컴포넌트 정리 · 재설계 금지 |
| 07-final | `07-final/` | 최종 QA · 무권리 자산 교체 · 배포 패키지 |
| 08-platform-map | `08-platform-map/` | WP · 카페24 매핑 문서 |
| 09-platform-qa | `09-platform-qa/` | 플랫폼 기능 QA (`82` 연계) |

Debug / Page Index는 case 루트 `_dev/` — **original 안에 넣지 않음** (`page-index.md`).

## 목적이 아닌 것

- 섹션 IA만 참고한 mock / wireframe
- 원본과 “비슷한” 새 디자인 제안
- 색면 placeholder · 임의 폰트 · CSS 전면 재작성으로 “수집 완료” 처리
- 기존 `01-reconstruction`을 original·PASS로 인정

## 수집 완료로 인정하지 않음

캡처만 · outline만 · analysis만 · structure-only HTML · reconstruction fallback 없이 추정 구현.

**필수:** 실행 파일·자산 실파일 + `02-original-qa` PASS 또는 사용자 승인 partial.

## 게이트

| 전환 | 조건 |
|------|------|
| → 02-original-qa | `01-original` 수집 완료 · `00-source` 메타·라이선스 기록 |
| → 03-analysis | **originalQa = pass** 또는 **사용자 승인 partial** |
| → 04-working-copy | analysis 확인 + **수정 범위(change-request) 승인** |
| → 05-working-qa | working-copy 변경 적용 후 필수 |
| → 06-normalized | workingQa PASS + 사용자 승인 (선택) |
| → 07-final | workingQa(또는 normalized) PASS |
| → 08-platform-map | final PASS + 이식 승인 |
| → 09-platform-qa | map 반영 후 |
| → `templates/` · `wordpress/` · `cafe24/` | 07-final PASS + 트랙 승격 |

### originalQa 미통과 시 금지

working-copy · 사용자 수정 · normalized · WP/cafe24 map · 스킨 이식 · final 완료 선언.

## reconstruction (fallback only)

기본 흐름에 **포함하지 않음**. 원본 다운로드 불가·서버 렌더 전용·라이선스상 원본 사용 불가 시에만.  
사용자 fallback 승인 필수 · structure mock 금지 · 1920/390 비교 필수.  
상세: `reconstruction.md` (fallback).

## 관련 SoT

| 문서 | 내용 |
|------|------|
| `source-collection.md` | 수집 대상·완료 기준 |
| `original-immutable.md` | original 수정 금지·checksum |
| `original-revision.md` | rev 관리 적용안 |
| `original-qa.md` | source↔original QA |
| `analysis-artifacts.md` | 03-analysis 산출물 |
| `working-copy.md` | 04 수정 원칙 |
| `page-index.md` | `_dev/` 비교·index |
| `page-inventory.md` | 공통 page schema |
| `cafe24-original.md` | ZIP vs 데모 구분 |
| `license.md` | 권리 |
| `stage-gates.md` | PASS/FAIL |
| `legacy-migration.md` | 구 폴더·case 대응 |

## 뷰포트

- Desktop **1920px**
- Mobile **390px**
