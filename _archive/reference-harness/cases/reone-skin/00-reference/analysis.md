# reone-skin — Reference Analysis

> 수집: 2026-07-08 · http://www.reoneskin.com/

## Meta

- URL: http://www.reoneskin.com/
- 수집일: 2026-07-08
- Desktop: 1920px · Mobile: 390px
- 업종: 피부과(청담) · 톤: 프리미엄 · Aura / Lift Up

## Page IA (섹션 순서)

| # | sectionId | 역할 | Desktop | Mobile | keep? |
|---|-----------|------|---------|--------|-------|
| 1 | popup | 하루동안 보지 않기 배너/모달 | overlay | overlay | false |
| 2 | header | GNB(시술·소개·공지) · TEL | sticky | 햄버거 | true |
| 3 | hero | Awaken Your Aura · 메인 카피 · 빠른 문의 | full-bleed/slider? | stack | true |
| 4 | doctors | 원장단 소개 · 원장 카드/상세 | cards+detail | stack | true |
| 5 | belief | One is All · 3가지 포인트(공간·상담·장비) | tabs/steps | stack | true |
| 6 | space | REONE Space · 300평 프라이빗 | media+copy | stack | true |
| 7 | lifts | Lift Up Program · Sofwave/Ultherapy/Thermage 보유 대수 | product cards | stack | true |
| 8 | contact | Contact Us · 주소 · 진료시간 | split | stack | true |
| 9 | footer | 사업자 · SNS · Quick 전화 · TOP | footer | stack | true |

## Section detail

### header
- **Data slots:** nav groups (lifting / skin / body / about / notice), tel
- **Interaction:** 메가메뉴 추정

### hero
- **Data slots:** title, enTitle, desc, cta(빠른 문의)
- **Interaction:** 슬라이더 가능(중복 카피)

### doctors
- **Data slots:** intro, doctors[{name,role,creds[],image}]
- **Interaction:** 원장 선택 → 상세 패널 (**tab/slider**)

### belief
- **Data slots:** credo title, points[{num,title,desc}]
- **Interaction:** 캐러셀/탭 반복 콘텐츠

### lifts
- **Data slots:** programTitle, devices[{name,en,count,claim}]
- **제거 후보:** no · 장비 수치는 플레이스홀더화

### contact / footer
- 주소·TIME·전화·SNS·비급여링크

## Global

- 클리닉형 + 강한 브랜드 슬로건(Aura)
- 리스크: 팝업 · 원장 실명/경력 · 장비 보유 “국내 1위” 클레임 카피

## Reconstruction scope

- **포함:** header ~ contact·footer
- **제외:** 상단 팝업 · SNS 채널 딥링크 실연동(아이콘만)

## Notes

- forward-clinic과 유사 업종이나 **리프팅 장비 쇼케이스**가 차별점
