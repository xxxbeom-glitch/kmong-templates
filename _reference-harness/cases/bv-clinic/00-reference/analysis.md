# bv-clinic — Reference Analysis

> 수집: 2026-07-08 · http://bvclinic.co.kr/landing/ (랜딩 전용 URL)

## Meta

- URL: http://bvclinic.co.kr/landing/
- 수집일: 2026-07-08
- Desktop: 1920px · Mobile: 390px
- 업종: 클리닉(리프팅 특화 랜딩) · 톤: 시술 설득형 · 롱스크롤

## Page IA (섹션 순서)

| # | sectionId | 역할 | Desktop | Mobile | keep? |
|---|-----------|------|---------|--------|-------|
| 1 | header | 로고 · 앵커 내비(실/레이저/볼륨/의료진/오시는길) · KR | sticky/anchor | 햄버거 | true |
| 2 | hero | Facelift & Skin tightening · 카피 · 차별점 | full-bleed | stack | true |
| 3 | thread-intro | 실 리프팅 intro · Q&A(무조건 많이 당기면?) | prose+accent | stack | true |
| 4 | thread-knowhow | 섬세함·know-how 01–04 | numbered list | stack | true |
| 5 | thread-3d | 3D 실 · 시술 메뉴 카드(풀페이스·팔자·이마 등) | cards/accordion | stack | true |
| 6 | laser | 레이저 리프팅 · 기기 카드(슈링크·포텐자·토르·더블타이트) | cards | stack | true |
| 7 | laser-why | 레이저가 특별한 이유 01–03 | 3-col | stack | true |
| 8 | volume | 볼륨 리프팅 · 사후 프로그램 | prose+list | stack | true |
| 9 | doctor | 대표원장 메시지 · 경력 | split | stack | true |
| 10 | location | 진료안내 · 오시는 길 · 카톡/네이버 예약 | contact band | stack | true |
| 11 | footer | Contact · © · 약관 | footer | stack | true |

## Section detail

### header
- **Interaction:** 앵커 스크롤 스파이 / 인페이지 내비
- **Data slots:** logo, anchors[], lang?

### hero
- **Data slots:** title, bullets[], highlight(키닥터)

### thread-* / laser / volume
- **Layout:** 롱폼 랜딩 · 설득 카피 + 번호 포인트 + 시술 카드
- **Interaction:** accordion / in-page tabs 가능
- **제거 후보:** thread-3d 하위 시술 메뉴 중 일부 축소 가능

### doctor
- **Data slots:** quote, name, career[], activities[]
- **normalized:** 가상 원장 슬롯

### location
- **Data slots:** hours, phone, kakao, naverReserve, address, map?

## Global

- **랜딩형 단일 스크롤** (클리닉 허브형과 다름)
- 리스크: 컨텐츠 길이 · 실명·학회 이력 · 외부 예약 위젯

## Reconstruction scope

- **포함:** header ~ footer 구조 전 구간(텍스트 요약 가능)
- **축소:** thread-3d 세부 시술 6종 → 대표 3종만 복원해도 충분

## Notes

- URL path `/landing/` — 메인 허브가 아닌 **캠페인/시술 랜딩**으로 취급
