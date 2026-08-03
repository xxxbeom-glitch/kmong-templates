# 라톤테크 리디자인 — Gate 2 보고

> **상태:** 승인 대기 · **Gate 3·전체 페이지 코딩 미진행**  
> **slug:** `rathontech-redesign-01` (확정)  
> **테마:** `wordpress/rathontech-redesign-01/`  
> **미리보기:** `wordpress/rathontech-redesign-01/preview/`  
> **작성:** 2026-08-03

---

## 0. 한 줄 결론

Gate 1 계약을 받아 **메인 히어로**와 **Rathon-IAM 첫 구간**만 PC·모바일 화면으로 구현했다.  
Signature Move는 히어로 연결 그래프 1회 드로잉만 사용했고, 네온·입자·영상·가짜 수치는 넣지 않았다.  
**승인 전 Gate 3·나머지 섹션 코딩 안 함.**

---

## 1. 반영한 확정 사항

| 항목 | 반영 |
|------|------|
| slug | `rathontech-redesign-01` |
| CMS | A안(동반 플러그인 CPT) **설계 전제만** · 코드/플러그인 **미구현** (Gate 4) |
| Signature | 메인 히어로 연결 그래프만 · CSS 1회 드로잉 · GSAP 미사용 |
| §17 18화면 | 범위 유지 · **이번은 2화면 패밀리 시작만** |

---

## 2. 구현 범위 (한 것 / 안 한 것)

### 한 것

1. 테마 스캐폴드 (`style.css` · `functions.php` · header/footer · enqueue)
2. **메인 히어로** — 카피 · CTA · Identity 연결 그래프 · Trust strip
3. **Rathon-IAM** — 브레드 · Product Hero · 생애주기 표현 · Overview 3블록
4. 정적 미리보기 HTML (WP 없이도 PC·MO 확인)
5. Playwright로 PC(1440)·MO(390) 화면 확인

### 안 한 것

- 메인 Section 2~5, 푸터 본문
- 솔루션/제품/사례 목록·상세 나머지
- CPT·taxonomy·문의 전송
- SecuAI/ChatAI/JPQC · 영상 · 고객 로고 그리드

---

## 3. 디자인 계약 적용 체크

| 계약 | 적용 |
|------|------|
| 논제: 흩어진 계정·접근 → 하나의 신뢰 체계 | 히어로 H1·리드 · 그래프 4노드 |
| Signature: 히어로만 | `flow-graph` · 자동 루프 없음 · reduced-motion 정적 |
| Quiet Zone | 이번 구간에 사례/인증 장식 없음 · Trust는 확인 사실 텍스트만 |
| 토큰 | SUIT · blue-600 CTA · container 1600 · 카드 pad/gap 24 |
| 서브 ≠ 메인 축소판 | IAM은 생애주기 4단 · 메인 그래프와 다른 표현 |
| 금지 이미지 | 자물쇠·방패·해커·네온 서버 **없음** |

---

## 4. 화면 요약

### 4-1. 메인 히어로

- Eyebrow / H1 / Lead = 기획 §5 초안
- CTA: 상담 · 도입사례
- PC: 가로 SVG 연결 그래프 · MO: 4노드 세로 리스트
- Trust: 2002 · GS · CC · KCMVP (문구만)

**미리보기:** `preview/home-hero.html`

### 4-2. Rathon-IAM 첫 구간

- 브레드: 홈 / 제품 / Rathon-IAM
- 가치 한 줄 + 문의 / 사례 링크 (영상 버튼 없음)
- 생애주기: 생성 → 권한 부여 → 변경·검토 → 회수 (**정적**, Signature 아님)
- Overview: 해결 문제 · 적용 환경 · 제품 설명

**WP:** 페이지 템플릿 `Product — Rathon-IAM (Gate 2)`  
**미리보기:** `preview/product-iam.html`

---

## 5. 로컬 확인 방법

```text
# 미리보기 서버 예
python -m http.server 8765 --directory wordpress/rathontech-redesign-01
→ http://127.0.0.1:8765/preview/home-hero.html
→ http://127.0.0.1:8765/preview/product-iam.html
```

WordPress: 테마 활성화 → 전면 페이지 = 홈 · IAM 페이지에 위 템플릿 지정.

---

## 6. 미잠금 (그대로)

- CMS A 최종 구현 = Gate 4
- 문의 전송 방식
- 자산 권리(로고·인증서 이미지)
- 인증 문구 세부 확정(원본 재확인 후)

---

## 7. 승인 부탁

볼 곳:

1. 메인 히어로 PC/MO — 논제·그래프 강도·Trust
2. IAM 첫 구간 PC/MO — 메인과 구분되는지 · Overview 밀도

수정 예: 히어로 다크 포인트 비율 · 그래프 더 절제 · IAM 생애주기 문구.

**승인하면 Gate 3** (§17 대표 패밀리 단계 진행).  
**승인 전 Gate 3·전체 코딩 안 함.**
