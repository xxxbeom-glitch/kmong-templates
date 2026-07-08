# Stage Gates — Reference Harness (Track C / 실험)

> **제품 Track A·B에 전 게이트를 강제하지 않음.** Cafe24 제품: `80`~`82` · 라우터.  
> analysis·working-copy·page-index·normalized = **선택** (소규모·A 시각 수정 생략 가능).

상태 enum: `not-started` | `working` | `review` | `pass` | `partial` | `fail` | `blocked` | `skipped`

## 00-source

**PASS:** URL·라이선스·수집일·목적·원격 캡처(1920/390)·remote request inventory(가능 시)  
**FAIL:** 메타 없이 수집 · 라이선스 미기록

---

## 01-original (immutable)

**PASS:** `source-collection.md` + `original-immutable.md` · 실파일 · completeness 명시  
**FAIL:** 캡처만 · reconstruction을 original로 위장 · original 내부 수정

---

## 02-original-qa

| 소스 | QA 문서 |
|------|---------|
| skin-zip / owned | `original-integrity-qa.md` |
| browser-captured | `browser-capture-qa.md` |

**PASS / PARTIAL / FAIL:** 해당 QA 문서 기준.  
→ working-copy / Track B map 전 **pass | approved partial** (ZIP 무결성 또는 캡처 QA)

---

## 03-analysis (선택)

대규모·패턴 카탈로그만. `analysis-artifacts.md`. 소규모는 `skipped` 가능.

---

## 04-working-copy (요청 시)

**PASS:** original **복사** · change-request · working만 수정  
**FAIL:** original 직접 수정 · 데모→납품 원본화

---

## 05-working-qa

요청 반영 · 회귀 없음 · viewport 비교(해당 시)

---

## 06-normalized (선택)

Track B 이식이라도 **normalized만으로 스킨 코딩 금지** — `81` map 승인 후.

---

## 07-final (선택)

패키지 · 무권리 자산 · `_dev` 납품 제외

---

## 08-platform-map (**Track B만**)

**PASS:** mapping + **map 승인**  
**FAIL:** 승인 전 `cafe24/{slug}/` 이식  
**Track A:** 이 게이트 **적용 안 함** (`skipped`)

---

## 09-platform-qa

`82-cafe24-qa` 해당 Track 분기.
