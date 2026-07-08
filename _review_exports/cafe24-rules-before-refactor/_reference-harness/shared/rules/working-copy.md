# Working Copy (`04-working-copy`)

> `01-original` **전체 복사본**. 사용자 지정 변경만.  
> **선행:** originalQa pass | approved partial · change-request 승인.

## 원칙

- 원본 HTML / CSS / JS / asset 경로 **유지**
- 요청한 부분만 **최소** 수정
- 변경 파일 · 이유 · original 대비 diff 기록
- 요청하지 않은 영역 **유지**

## 사용자 수정 흐름

1. 자연어 수정 요청  
2. `change-request` 기록 (`_dev/` 또는 `04-working-copy/changes/`)  
3. selector · 파일 · 영향 범위 연결  
4. 영향 범위 **보고 후 승인**  
5. working-copy에서만 수정  
6. 수정 전후 캡처 (1920 / 390)  
7. `05-working-qa`  
8. 변경 로그  
9. 사용자 승인  
10. 승인 전 normalized · platform 이식 **금지**

## 금지

- 분석만 보고 새 HTML 재작성 · CSS 전면 재작성
- 임의 디자인 시스템·shared tokens 선적용
- placeholder 자산 대체 · 인터랙션 단순화
- 요청 없는 섹션 삭제 · 클래스명 전면 교체
- 원본 분위기 임의 변경 · “개선” 추가
- original 직접 수정

## 05-working-qa

| 검사 | 내용 |
|------|------|
| 비교 | original ↔ working-copy |
| viewport | Desktop 1920 · Mobile 390 |
| 변경 | 요청 반영 여부 |
| 회귀 | 미요청 영역·인터랙션·커머스 깨짐 없음 |

산출: `05-working-qa/report.md` · `_dev/compare-index` · visual-diff
