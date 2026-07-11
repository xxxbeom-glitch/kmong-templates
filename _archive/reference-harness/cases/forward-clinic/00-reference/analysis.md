# forward-clinic — Reference Analysis

> 수집: 2026-07-08 · URL HTML/텍스트 기반 초안. **캡처(1920/390) 보완 후 사용자 확인.**

## Meta

- URL: https://forwardclinic.co.kr/
- 수집일: 2026-07-08
- Desktop: 1920px · Mobile: 390px
- 업종: 피부과(클리닉) · 톤: 프라이빗·전문·청담 프리미엄

## Page IA (섹션 순서)

| # | sectionId | 역할 | Desktop | Mobile | keep? |
|---|-----------|------|---------|--------|-------|
| 1 | header | GNB · 상담/예약 CTA | sticky 추정 | 햄버거 추정 | true |
| 2 | hero | Be Proud / Move Forward · 메인 카피 · CTA | full-bleed | stack | true |
| 3 | solutions | Flagship Solution · 4카드(특수질환·항노화·흉터·여드름) | cards grid | 1열 | true |
| 4 | doctor | Delicate Doctor · 통계(1.5%·15) · 원장 소개 | split | stack | true |
| 5 | values | Keep your 4 word (Concentrate/Detail/Private/Professional) 탭·패널 | tabbed | accordion? | true |
| 6 | space | Brand Core · Story of Space · Private space | media+copy | stack | true |
| 7 | media | YouTube/Blog 콘텐츠 카드 | cards | stack | true |
| 8 | footer | 병원 정보 · SNS · 약관 | gutter | stack | true |

## Section detail

### header
- **Layout:** gutter · logo + nav + CTA
- **Data slots:** logo, nav[], cta{label,url}
- **Interaction:** 모바일 메뉴 · CTA 링크
- **제거 후보:** no

### hero
- **Layout:** full-bleed · 대형 타이포 + 서브카피 + CTA
- **Data slots:** titleLines[], desc, cta
- **Style notes:** 여백 큰 히어로 · “새벽의 고요” 감성 카피
- **Interaction:** 없음 또는 스크롤 진입
- **제거 후보:** no

### solutions
- **Layout:** section header + 4 feature cards
- **Data slots:** eyebrow, title, desc, items[{title,desc,image?}]
- **Interaction:** 카드 hover / 링크
- **제거 후보:** no

### doctor
- **Layout:** stats + portrait + bio + view more
- **Data slots:** stats[], name, role, bio, link
- **제거 후보:** no

### values
- **Layout:** 4키워드 네비 + 상세 패널 (콘텐츠 반복 노출 → 탭/슬라이드 추정)
- **Data slots:** keywords[], panels[{title,body,tags[]}]
- **Interaction:** **tab / keyword switch** (핵심)
- **제거 후보:** no · 정규화 시 탭 1회만

### space
- **Layout:** brand + space gallery/story
- **Data slots:** title, desc, media[]
- **제거 후보:** optional (포트폴리오에서 축소 가능)

### media
- **Layout:** YouTube/Blog 카드 그리드
- **Data slots:** items[{type,title,date,url,thumb}]
- **제거 후보:** yes 가능 (외부 피드 의존)

### footer
- **Layout:** info + links
- **제거 후보:** no

## Global

- Header / Footer: 클리닉형 CTA 강조
- 반복 패턴: feature cards · keyword tabs · media cards
- 리스크: 영상·외부 SNS 임베드 · values 섹션 DOM 중복(탭 JS)

## Reconstruction scope

- **포함:** header ~ footer 전 섹션(구조)
- **제외/축소 후보:** media(유튜브·블로그) 실연동 → placeholder 카드

## Notes

- 원본 상표·원장 실명·논문 수치는 reconstruction 단계에서 유지 가능, **normalized에서 가상 브랜드로 교체 슬롯화**
