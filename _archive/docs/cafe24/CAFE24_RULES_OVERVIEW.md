# Cafe24 Rules Overview

사람용 설명서. **실행 규칙**은 `.cursor/rules/00-project-router.mdc` · `80`~`84`.

## 작업 경로 선택

| 질문 | Track |
|------|-------|
| 이미 카페24 스킨(ZIP/고객)을 고쳐? | **A** 기존 스킨 |
| 정적/Figma를 카페24로 옮기려 해? | **B** 이식 (map 필요) |
| 데모·미구매 테마만 보고 배워? | **C** 분석만 (배포 없음) |

## 파일별 역할

| 파일 | 역할 | 적용 대상 |
|------|------|-----------|
| `00-project-router.mdc` | 트랙 판별·승인 축소·용어 | always |
| `10-static-template.mdc` | 정적 HTML | `templates/{slug}` |
| `80-cafe24-core.mdc` | 카페24 핵심 | A/B (+C 금지) |
| `81-cafe24-platform-map.mdc` | platform-map | **B만** |
| `82-cafe24-qa.mdc` | QA 분기 | A/B/C |
| `83-reference-harness.mdc` | 데모 하네스 · **사이트 통째 복제** (`site-clone-fidelity`) | Track C |
| `84-cafe24-release.mdc` | 패키징·테스트 디자인·운영 전환·롤백 | **A/B만** |
| `_archive/docs/cafe24/release.md` | 배포 요약 | 사람용 |
| `_archive/docs/cafe24/release-templates/` | manifest·체크리스트 골격 | `_release` 보고서 |
| `_archive/docs/cafe24/*` | 인벤토리·팝업·본 개요 | 조회·검수 |
| `templates/cafe24_shop/` | **global syntax reference** | 읽기만 |

## 용어 정의

| 용어 | 정의 |
|------|------|
| global syntax reference | `templates/cafe24_shop/` |
| project original SoT | 프로젝트 정식 원본 스킨 |
| working skin | 수정 사본 (**운영에 직접 업로드 금지**) |
| release candidate | QA·업로드용 배포 후보 |
| upload package | 카페24 업로드에 필요한 파일만 |
| test design | 검증용 디자인 |
| production design | 대표(운영) 디자인 |
| rollback package | 복구 보관본 |
| design reference | 데모·스크린샷 |
| static design source | 문법 없는 HTML/디자인 |

## 카페24 지식 조회 순서

working skin → `_archive/docs/cafe24` → `cafe24_shop` → 공식 문서 → unverified (생성 금지)

## 승인 게이트

1. 작업 범위 (소규모는 요청=승인)  
2. Platform Map (**B만**)  
3. 최종 QA (테스트 디자인)  
4. **대표 디자인 전환** (운영 — 항상 별도)

## QA 분기

- A: 기존 스킨 · 테스트몰 · contract 보존 (`82` A)  
- B: 디자인+map+기능 (`82` C)  
- C: 캡처 비교 (`82` B) — 배포·upload 없음  
- 배포 QA: `84` + `QA_RESULT` · `DEPLOYMENT_CHECKLIST`

## 배포 흐름 (A/B)

```
QA → release candidate → upload package
→ test design deployment → production readiness
→ production switch(승인) → rollback retention
```

상세: `84-cafe24-release.mdc` · `_archive/docs/cafe24/release.md`

## 절대 금지사항

- `cafe24_shop` 수정  
- 데모 자산 납품·upload package 포함  
- unverified module/변수 창작  
- A에 map/normalized 게이트 강제  
- `_delivery/cafe24/`  
- working → production 직업로드  
- 인증 정보 저장 · 인증 없이 자동 업로드

## 작은 수정의 간소화된 흐름 (Track A · small patch)

```
요청 → working 수정 → changed-files package
→ minimal QA → rollback files → test design 확인
```

commerce(옵션·카트·회원·주문) 관련이면 간소화 **금지** (`84` §13).

## 대규모 이식의 전체 흐름 (Track B)

```
디자인 확정 → platform-map → map 승인 → 스킨 구현
→ 이식 QA → release → test design → 운영 전환 · rollback
```

## Track C

분석·패턴 문서만. original/working 승격·**배포 없음**.
