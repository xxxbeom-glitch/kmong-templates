# wonkangmetal — Analysis (draft)

**원본:** http://www.wonkangmetal.co.kr/ · **등급:** browser-captured  
**스택:** 그누보드 기반 커스텀 테마 (`theme/wonkang`) · PHP · jQuery/Swiper

## IA (메인)

| 섹션 | 클래스/ID | 역할 |
|------|-----------|------|
| Header | `.s_header` | 2단 GNB · COMPANY/FACTORY/PRODUCT/CUSTOMER · KO/EN/JP |
| Hero | `.main_visual` | 풀스크린 슬라이더 · PREV/NEXT |
| Business | `#biz.main_business` | MAGMASOFT 등 공정·기술 카드 슬라이더 |
| Company | `.main_company` | 연혁·수치(1988/1000t/40%) |
| Solution | `.main_solution` | 제품 카테고리 4종 |
| Trust | `.parts` | Innovation/Partnership/Reliability/Ambition |
| Network | — | GLOBAL NETWORK 맵/파트너 |
| News | — | `bbs/board.php?bo_table=news` |
| Contact | — | CTA + footer |

## 하위 페이지 패턴

- 정적: `/page/page0xxx.php` (회사·공장·고객)
- 게시판: `/bbs/board.php?bo_table=*` (news, partner, equipment, cert, product_*)
- 다국어: `/index_en.php` · `/index_jp.php` · `page_en/` · `page_jp/` · `*_en` · `*_jp` 보드

## 인터랙션 (관찰)

- 메인 비주얼·비즈니스 섹션 슬라이더
- 헤더 드롭다운·모바일 메뉴
- 스크롤 애니메이션(섹션 진입)

> 모듈명·JS 파일 단위 매핑은 미검증. 상세는 `component-map.md` · `interaction-map.md` 후속.
