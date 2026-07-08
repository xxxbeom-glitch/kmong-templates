# Release Manifest

## 프로젝트

- 프로젝트명:
- release ID: `YYYYMMDD-HHMM-{project-slug}`
- 생성 일시:
- source track: A | B
- original source: (project original SoT 경로 — 내용 수정 금지)
- working skin 경로:
- release candidate 경로: `_release/{slug}/release-candidate/skin/`
- upload package 경로: `_release/{slug}/upload-package/skin/`

## 변경 요약

(화면·기능 기준 2~5줄)

## 변경 파일

| 상태 | 파일 경로 | 변경 유형 | 기능 위험도 | 테스트 필요 |
|------|-----------|-----------|-------------|-------------|
| added \| modified \| deleted | 상대경로 | visual \| structure \| commerce | low \| medium \| high \| critical | Y/N |

## 추가 파일

## 삭제 예정 파일

(운영 즉시 삭제 금지 — test design 검증 후)

## module·variable 변경

| 분류 | 항목 | 비고 |
|------|------|------|
| expected-change \| review-required \| blocked | | |

## form·hidden input 변경

## 자산 변경

(이미지·폰트·CSS background 등 · 참조 확인)

## 제외 파일

(개발·분석·비밀 — upload package 미포함)

## SHA-256 확인

- `hashes/FILE_HASHES.sha256` 생성 여부:
- 샘플/전체 검증:

## 배포 방식

- [ ] 전체 스킨 업로드
- [ ] 변경 파일만 업로드 (업로드 순서·롤백 파일 목록 첨부)
