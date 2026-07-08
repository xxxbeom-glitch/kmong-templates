# celltrion — Reference Analysis

> 수집: 2026-07-08 · https://www.celltrion.com/ HTML/텍스트 초안. 캡처 보완 후 확인.

## Meta

- URL: https://www.celltrion.com/
- 수집일: 2026-07-08
- Desktop: 1920px · Mobile: 390px
- 업종: 바이오·글로벌 기업 · 톤: 코퍼레이트 · EN/KR

## Page IA (섹션 순서)

| # | sectionId | 역할 | Desktop | Mobile | keep? |
|---|-----------|------|---------|--------|-------|
| 1 | header | 로고 · 언어(KOR/ENG) · GNB | global nav | 햄버거 | true |
| 2 | popup-shareholder | Letter to Shareholders 모달(“24h 안 보기”) | modal | modal | false |
| 3 | hero | Daring to Go Beyond · 메시지/비주얼 | full-bleed | stack | true |
| 4 | one-stop | One-Stop Solution · R&D / Production / Distribution | 3-col or tabs | stack | true |
| 5 | products | Products & Pipeline 토글 · 제품 카드 그리드 | tabs+grid | stack | true |
| 6 | global | Advanced and affordable… 글로벌 네트워크 | band | stack | true |
| 7 | magazine | Magazine 티저 | card/band | stack | true |
| 8 | news | News · Press/Notice 리스트 | list | stack | true |
| 9 | footer | Family site · 주소 · SNS · © | multi-col | stack | true |

## Section detail

### popup-shareholder
- **Interaction:** 모달 · “Do not display for 24 hours”
- **제거 후보:** **yes** (파일럿 정규화에서 제외 권장)

### hero
- **Layout:** full-bleed key visual + headline
- **Data slots:** title, cta?
- **제거 후보:** no

### one-stop
- **Layout:** intro + 3 pillars (R&D / Production / Distribution) 상세 포인트
- **Data slots:** title, desc, pillars[{num,title,body,points[],link}]
- **Interaction:** accordion/expand or scroll-detail
- **제거 후보:** no

### products
- **Layout:** Products | Pipeline 탭 + 제품 카드(Remsima, Truxima…)
- **Data slots:** modes[], items[{name,ingredient,image?}]
- **Interaction:** **탭 전환 (Products/Pipeline)** 핵심
- **제거 후보:** no · 카드 수 축소 가능

### global / magazine / news
- **Layout:** CTA band · magazine · 뉴스 피드
- **제거 후보:** magazine/news는 피드 의존 → placeholder 또는 keep 축소

### footer
- Family Site 링크 · 글로벌 주소 · SNS

## Global

- 다국어 전환
- 리스크: 주주서한 팝업 · 뉴스 장문 · 제품명 다수(정규화 시 슬롯화)
- 기업형 IA — 클리닉형(포워드/리원/비브이)과 **패턴이 다름** (저닐/코퍼레이트)

## Reconstruction scope

- **포함:** hero · one-stop · products · global · news(요약) · footer
- **제외:** shareholder popup · 장문 press 전문(리스트 3건만)

## Notes

- 파일럿 4건 중 **유일한 비클리닉 코퍼레이트** — starter 업종 분류 시 `corporate-biopharma` 계열
