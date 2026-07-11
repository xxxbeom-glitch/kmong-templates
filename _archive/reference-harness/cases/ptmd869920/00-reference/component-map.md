# ptmd869920 — Component map

> Track C 분석 보조. 모듈 ID는 **후보**. ZIP 전 확정 금지.

## Shell

| component | 위치 | 비고 |
|-----------|------|------|
| `TopPromo` | 전역 상단 | 딥그린 띠 |
| `Header` | sticky | 로고 · GNB · util |
| `AsideSlide` | slidepackage | 모바일·햄버거 |
| `Footer` | layout-footer | 약관·사업자 |
| `MobileTabbar` | mobile only | 5탭 |

## Merchandising

| component | 메인 | PLP | PDP |
|-----------|------|-----|-----|
| `HeroCardSlide` | ○ | — | — |
| `QuickCateRound` | ○ (8) | — | — |
| `ProductSlideRow` | listmain 1–3 | — | relation |
| `BenefitTrio` | sub-banner | — | — |
| `HotdealTimerRow` | listmain-2 | 핫딜 PLP | — |
| `ShortsProductRow` | listmain-4 | — | — |
| `ConcernRecommend` | listnormal | — | — |
| `VideoBand` | main-video | — | — |
| `ReviewCarousel` | main-review | — | review 모듈 |
| `BrandStory` | mid-banner | — | — |
| `ProductGrid` | — | listnormal | — |
| `PlpMenu` | — | menupackage | — |
| `PdpGallery` | — | — | image/addimage |
| `PdpBuyBox` | — | — | detail/option/action |
| `CartTable` | — | — | basketpackage |

## Product card (공통)

- 썸네일 · 상품명 · 한줄 요약 · 할인율 · 할인가 · 정가 · 리뷰 수  
- 클래스 힌트: `listitem` · `spec` · `is-sale`
