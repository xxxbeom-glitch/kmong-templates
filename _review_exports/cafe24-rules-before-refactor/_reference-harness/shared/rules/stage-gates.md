# Stage Gates — PASS / FAIL / PARTIAL

상태 enum: `not-started` | `working` | `review` | `pass` | `partial` | `fail` | `blocked` | `skipped`

## 00-source

**PASS:** URL·라이선스·수집일·목적·원격 캡처(1920/390)·remote request inventory(가능 시)  
**FAIL:** 메타 없이 수집 · 라이선스 미기록

---

## 01-original (originalCapture)

**PASS:** `source-collection.md` + `original-immutable.md` 기록 · 실파일 트리 · completeness 명시  
**FAIL:** 캡처만 · reconstruction을 original로 위장 · original 내부 수정

---

## 02-original-qa ★

**PASS:** `original-qa.md` PASS 전부  
**PARTIAL:** 불완전 목록 + **사용자 승인** 후에만 다음  
**FAIL:** PASS 금지 조건 해당 · original 고쳐 맞춤

→ analysis / working-copy / map / final **차단** (pass | approved partial 전)

---

## 03-analysis

**PASS:** `analysis-artifacts.md` 필수 파일  
**FAIL:** original 미열람 · “재구현하면 됨” 수준

---

## 04-working-copy

**PASS:** original **전체 복사** · change-request만 · diff·로그  
**FAIL:** 새 HTML/CSS 재작성 · originalQa 없이 착수

---

## 05-working-qa

**PASS:** original↔working 비교 · 1920/390 · 요청 반영 · 회귀 없음  
**FAIL:** 미요청 파괴 · 비교 캡처 없음

---

## 06-normalized (선택)

**PASS:** 정리만 · 시각·동작 동일 · 사용자 승인  
**FAIL:** 재설계 · 승인 전 착수

---

## 07-final

**PASS:** QA · 무권리 교체 · 패키지 · license 확인  
**FAIL:** 불명 자산 납품 · `_dev`를 납품에 포함

---

## 08-platform-map

**PASS:** mapping.md|json · 사용자 map 승인  
**FAIL:** 승인 전 `cafe24/{slug}/` · `wordpress/{slug}/` 이식

---

## 09-platform-qa

**PASS:** `82` Visual + Commerce (해당 시)  
**FAIL:** 결제·회원 핵심 파괴
