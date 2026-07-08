# Working Copy

> 수정은 **working-copy / working skin**만. original immutable.  
> Track A 제품 스킨은 harness 풀 단계 없이 `cafe24/{slug}/` working skin만 쓸 수 있음 (`80`).

## 원칙

- original HTML/CSS/JS/asset 경로 유지 (해당 시)
- 요청 범위만 최소 수정
- 변경·diff·로그 기록
- commerceContract: preserve 영역은 module/form/`{$}` 유지

## 승인

- 소규모 시각: 사용자 요청 = 범위 승인 (`00-project-router`)
- 기능·다지점·대규모만 별도 범위 확인
- **모든** working-copy에 analysis/normalized 승인 **강제 안 함**

## Track B

normalized·working만으로 카페24 코딩 **금지** → `81` map 승인 후.

## 금지

- original / global syntax reference 직접 수정
- 데모 자산을 납품 working으로 승격
- unverified module/변수 창작
