# QA Log

## 2026-07-10 · [static] template-homepage preset 1~4
**범위:** `index.html` · `news-view.html` · `css/style.css` · `js/main.js`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | `stats-counter` 스크롤 진입 1회 · reduced-motion 즉시 | PASS | `#services` · unit 분리 |
| 2 | `image-scale-hover` scale 1.05 · overflow clip | PASS | service/portfolio/business |
| 3 | `hover-tone` insight·news-item opacity 0.85 | PASS | 리뷰는 기존 BG 호버 |
| 4 | `button-text-slide-hover` CTA·전체글·글목록 | PASS | fine pointer only |
| 5 | image-scale와 hover-tone 동일 요소 미중복 | PASS | |

## 2026-07-10 · [static] template-homepage 빠른상담 플로팅 재반영
**범위:** `index.html` · `css/style.css` — Figma `825:2858`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | 상단 제목「빠른 상담 하기」+ 동의 | PASS | SPACE_BETWEEN |
| 2 | 하단 이름·전화·문의·버튼 gap10 | PASS | |
| 3 | 버튼「프로젝트 문의하기」흰/#525ee3 | PASS | |
| 4 | 체크 흰 stroke · 흰 체크 | PASS | BG #525ee3 |
| 5 | 패널 높이 ~187 · pad26 | PASS | |

## 2026-07-10 · [static] template-homepage privacy (개인정보처리방침)
**범위:** `privacy.html` · `css/style.css` · 전 HTML 푸터 — Figma `817:2623`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | 서브히어로 없음 | PASS | 헤더 아래 바로 본문 |
| 2 | 제목 46/600 · 인트로 24/600 | PASS | |
| 3 | 조항 1~5 제목·본문 | PASS | Figma 원고 |
| 4 | 푸터 링크 privacy.html | PASS | 전 페이지 |

## 2026-07-10 · [static] template-homepage 헤더 컬러·하단 라인
**범위:** `css/style.css` — Figma `770:2656` / `770:2788`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | bar·mega BG #ffffff | PASS | |
| 2 | 접힘 시 하단 라인 없음 | PASS | |
| 3 | 펼침 시 mega 하단 1px #000 | PASS | 상단 라인 제거 |

## 2026-07-10 · [static] template-homepage news-view (글 상세)
**범위:** `news-view.html` · `css/style.css` · `news.html` · `index.html` — Figma `817:2672`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | 히어로 라벨·제목 | PASS | 목록과 동일 |
| 2 | 글 제목 30/500 · 날짜 · 하단 구분선 | PASS | |
| 3 | 본문 5문단 · 첨부파일 | PASS | Figma 원고 |
| 4 | 이전/다음 · 글 목록 보기 pill | PASS | 이전·다음 `#` |
| 5 | 목록·메인 첫 글 → news-view | PASS | |

## 2026-07-10 · [static] template-homepage 헤더 메가메뉴 높이
**범위:** `css/style.css` — Figma `770:2788`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | 패널 높이 = 콘텐츠 | PASS | absolute 컬럼 제거 |
| 2 | pad-block 16 · gap10 서브링크 | PASS | |
| 3 | 서비스 4항 잘림 없음 | PASS | |

## 2026-07-10 · [static] template-homepage S08 전체 글 보기 버튼
**범위:** `css/style.css` — Figma `763:1083`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | stroke `#dbdbdb` · 배경 투명 | PASS | 기존 15% 채움 제거 |
| 2 | 238×78 · r999 · 24/500 | PASS | |

## 2026-07-10 · [static] template-homepage contact (프로젝트 문의)
**범위:** `contact.html` · `css/style.css` — Figma `806:2208`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | 히어로 라벨·제목 | PASS | 프로젝트 문의 / 새로운 프로젝트를… |
| 2 | 섹션 제목 중앙 · pad100 · BG #fff | PASS | page BG #faf9f6 |
| 3 | 좌 이미지 750×845 r12 · 우 폼 654 · gap36 | PASS | |
| 4 | 필드 이름·업체명 / 이메일·연락처 / 업종 유형 / 문의내용 | PASS | Figma placeholder 그대로 |
| 5 | 개인정보 동의 + 문의 보내기 (#525ee3 · r12 · full) | PASS | |
| 6 | GNB 문의하기 aria-current · 고객지원 active | PASS | |
| 7 | @1024 1열 · @768 필드 1열 | PASS | |

## 2026-07-10 · [static] template-homepage 회사소개 3페이지 원고 재맞춤
**범위:** `about-greeting.html` · `about-directions.html` · `about-ceo.html` — Figma `770:2111` · `796:5` · `796:211`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | greeting 히어로·인트로·기준·성장 과정 | PASS | 연혁→성장 과정 |
| 2 | directions 히어로·주소·교통 | PASS | |
| 3 | ceo 히어로·인용·본문·서명 | PASS | 대표이사→대표 |
| 4 | Figma TEXT 키문구 대조 | PASS | |

## 2026-07-10 · [static] template-homepage S03 services 카드 내부 여백
**범위:** `css/style.css` — Figma `799:641`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | 카드 342×348 · pad 50/55 · r12 | PASS | |
| 2 | 숫자↔라벨 간격 12 | PASS | gap 56→제거 |
| 3 | 숫자 80/500 · +51 · %/년 26 · gap15 | PASS | align center |
| 4 | 라벨 20/400 · #1c1917 60% | PASS | |
| 5 | 상단 정렬 (하단 여백 유지) | PASS | Figma VERTICAL MIN |

## 2026-07-10 · [static] template-homepage news (주요 소식)
**범위:** `news.html` · `css/style.css` · `js/main.js` — Figma `806:2060`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | 히어로 라벨·제목 | PASS | 주요 소식 |
| 2 | 탭 전체/공지사항/보도자료 | PASS | active #525ee3 + 하단 2px |
| 3 | 리스트 5건 · 배지·제목·날짜 | PASS | notice #e6efff / press #fff3e6 |
| 4 | 페이지네이션 UI | PASS | 정적 1페이지 |
| 5 | 탭 필터 show/hide | PASS | data-news-filter |
| 6 | GNB 공지사항 → news.html | PASS | 전 페이지 |

## 2026-07-10 · [static] template-homepage about-ceo 사진 슬롯
**범위:** `about-ceo.html` · `css/style.css` — Figma `796:211`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | 사진 625×946 · r12 | PASS | pill 제거 |
| 2 | 열 비율 625:709 · gap 106 | PASS | |
| 3 | align-items center | PASS | |

## 2026-07-10 · [static] template-homepage 푸터 개인정보 처리방침
**범위:** 전 HTML 푸터 · `css/style.css` — Figma `770:2979`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | copyright 좌 · 개인정보 처리방침 우 | PASS | space-between |
| 2 | 링크 16/600 · #fff | PASS | href `#` placeholder |
| 3 | 8페이지 공통 반영 | PASS | |

## 2026-07-10 · [static] template-homepage S05 reviews 원고 20건
**범위:** `index.html` · `css/style.css`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | 고유 후기 20건 | PASS | 윗줄 10 · 아랫줄 10 |
| 2 | 마퀴 복제 그룹 | PASS | 줄당 ×2 |
| 3 | title · body · author | PASS | category는 카드 UI 미표시 |
| 4 | 루프 50s | PASS | 10장/줄 속도 보정 |

## 2026-07-10 · [static] template-homepage S05 reviews 마퀴 복원
**범위:** `index.html` · `css/style.css` — Figma `763:1742`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | 레이아웃 infinite-card-marquee (2줄 ←/→) | PASS | 2×2 철회 |
| 2 | 카드 min-height 422 · r24 | PASS | |
| 3 | 섹션 padT160 / padB100 | PASS | |
| 4 | 신규 원고 4장 × 복제 그룹 | PASS | |
| 5 | hover pause · reduced-motion | PASS | |

## 2026-07-10 · [static] template-homepage 서비스 4페이지 원고 재맞춤
**범위:** `service-solution.html` · `service-list.html` · `service-process.html` · `service-portfolio.html` — Figma `799:774` · `802:1702` · `802:1826` · `802:1958`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | solution 히어로·인트로·5카드 원고 | PASS | UI·UX 본문 교체 |
| 2 | list 히어로·인트로·4유형 원고 | PASS | 인트로 본문 교체 |
| 3 | process 히어로·인트로·STEP 01–07 | PASS | 변경 없음(일치) |
| 4 | portfolio 히어로·탭·카드 라벨/이름 | PASS | 라벨 순서 맞춤 |
| 5 | Figma TEXT 노드 JSON 전수 대조 | PASS | `_figma-svc-texts.json` |

## 2026-07-10 · [static] template-homepage 메인 원고·S03/05/06/08
**범위:** `index.html` · `css/style.css` — Figma `763:209`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | 전 섹션 원고 교체 | PASS | hero~contact |
| 2 | S03 카드 348 · pad 50/55 · 숫자 80/w500 · +/단위 | PASS | 500+/100+/95%/15년 |
| 3 | S05 2×2 · 708×422 · r24 · 제목30/본문20 | PASS | 마퀴 제거 |
| 4 | S06 FAQ 5문항 · pad 36/28 · Q26/A20 | PASS | |
| 5 | S08 주요 소식 · 날짜 · 태그 텍스트 · 버튼 15% | PASS | |

## 2026-07-10 · [static] template-homepage 빠른상담 플로팅 재맞춤
**범위:** `index.html` · `css/style.css` — Figma `799:708`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | 바 BG #525ee3 | PASS | |
| 2 | 입력 흰80% · border 12% · r12 · 260/260/382 | PASS | |
| 3 | 버튼 흰 BG · #525ee3 글자 | PASS | |
| 4 | 개인정보 흰80% · 체크 흰+파란 | PASS | |
| 5 | 전화 placeholder · shell 1440/240 | PASS | |

## 2026-07-10 · [static] template-homepage portfolio 헤더·탭 재맞춤
**범위:** `service-portfolio.html` · `css/style.css` — Figma `802:2056` · `802:1974`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | 헤더 가로 · space-between | PASS | 제목 좌 · 탭 우 |
| 2 | 활성 탭 #525ee3 · w600 · 하단 2px | PASS | 필 제거 |
| 3 | 비활성 #1c1917 20% · w500 · 20px | PASS | |
| 4 | 문구 `기업/관공서` | PASS | |
| 5 | 탭 gap 32 | PASS | |

## 2026-07-10 · [static] template-homepage service-portfolio
**범위:** `service-portfolio.html` · `css/style.css` · `js/main.js` — Figma `802:1958` · GNB 포트폴리오 제거
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | Shell 1440/240 · CTA 미포함 | PASS | |
| 2 | S02 PORTFOLIO · 제목·본문 | PASS | service-intro 재사용 |
| 3 | S03 BG #f8f8f8 · 제목 46/w600 · 필터 탭 | PASS | active #525ee3 · inactive 20% |
| 4 | 카드 2×2 · 708×541 · r12 · overlay 40% · 중앙 | PASS | |
| 5 | GNB 포트폴리오 제거 · 메가 3열 · 제작 사례 링크 | PASS | 전 페이지 |
| 6 | 푸터 공통 | PASS | |

## 2026-07-10 · [static] template-homepage service-process
**범위:** `service-process.html` · `css/style.css` — Figma `802:1826`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | Shell 1440/240 · CTA 미포함 | PASS | |
| 2 | S02 PROCESS · 제목 50/w700 · 본문 26/w500 | PASS | |
| 3 | S03 BG #f8f8f8 · 제목 46/w600 · gap 24 | PASS | |
| 4 | STEP 카드 708×341 · r12 · pad 50/55 · 07 풀 | PASS | |
| 5 | 라벨 16/40% · 제목 30 · 본문 20/80% · gap 6/26 | PASS | |
| 6 | GNB · 푸터 | PASS | |

## 2026-07-10 · [static] template-homepage service-list
**범위:** `service-list.html` · `css/style.css` — Figma `802:1702`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | Shell 1440/240 · CTA 미포함 | PASS | 사용자 요청 |
| 2 | S01 히어로 공통 | PASS | |
| 3 | S02 OUR BUSINESS · 제목 50/w700 · 본문 26/w500 | PASS | service-intro 재사용 |
| 4 | S03 BG #f8f8f8 · 제목 46/w600 · 리스트 gap 24 | PASS | |
| 5 | 카드 708+708 · r12 · 패널 pad 50/55 | PASS | |
| 6 | 라벨 16/40% · 제목 30/w700 · 본문 20/80% | PASS | space-between |
| 7 | GNB 링크 · 푸터 | PASS | |

## 2026-07-10 · [static] template-homepage service-solution
**범위:** `service-solution.html` · `css/style.css` — Figma `799:774`
**결과:** **PASS (코드 · 재검수)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | Shell 1440/240 | PASS | `site-header__shell` |
| 2 | S01 히어로 라벨「서비스」·제목 46/w600 · 80% | PASS | page-hero 재사용 |
| 3 | S02 BG #fff · 워터마크 140/6% · 제목 50/w700 · 본문 26/w500 | PASS | |
| 4 | S03 BG #f8f8f8 · 제목 46/w600 · 카드 gap 24 · r12 · overlay 40% | PASS | |
| 5 | 카드 비율 874:542 / 542:874 / full · 텍스트 하단 | PASS | scroll-reveal display:flex 수정 |
| 6 | 카드 제목 30/w700 · 본문 20/w500 80% · gap 26 | PASS | |
| 7 | S07 CTA 제거 | PASS (수정) | 사용자 요청 |
| 8 | 공통 푸터 · GNB 링크 | PASS | |

## 2026-07-10 · [static] template-homepage S03 services · 서브페이지 재검수
**범위:** Figma `763:209` S03 · 서브 3페이지 토큰 대조
**결과:** **PASS (코드)** — FAIL 4건 수정 반영
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | S03 카드 설명 제거 · 제목만 | PASS (수정) | Figma `763:901` |
| 2 | S03 카드 38/w700 · overlay 30% · gap 48 | PASS (수정) | |
| 3 | 서브 히어로 라벨 opacity 80% | PASS (수정) | 3페이지 공통 |
| 4 | 서브 히어로 overlay gradient | PASS (수정) | 40→60% |
| 5 | 연혁 본문 opacity 60% | PASS (수정) | |
| 6 | 연혁 연도↔리스트 gap 28 | PASS (수정) | |
| 7 | 오시는길 · CEO 토큰 | PASS | 이전 재검수 유지 |
| 8 | 비전/주소 행 top border only | PASS | 의도적 (box border 아님) |

## 2026-07-10 · [static] template-homepage about-ceo
**범위:** `about-ceo.html` · `css/style.css` — Figma `796:211`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | S02 padding 100 · BG #fff | PASS | |
| 2 | 제목 CEO 메시지 46/w600 | PASS | |
| 3 | 제목↔본문 gap 48 | PASS | |
| 4 | 2열 491/843 · gap 106 | PASS | grid fr |
| 5 | 사진 383×500 · r191.5 pill | PASS | placeholder |
| 6 | 사진 offset top 137 | PASS | margin-top |
| 7 | 인용 50/w700 lh74 | PASS | |
| 8 | 본문 26/w500 lh46 opacity 80% | PASS | |
| 9 | 텍스트 블록 gap 36 | PASS | quote/body/sign |
| 10 | 서명 30/w600 | PASS | |
| 11 | 푸터 · GNB 3페이지 링크 | PASS | |

## 2026-07-10 · [static] template-homepage about-directions (재검수)
**범위:** `about-directions.html` · `css/style.css` — Figma `796:5` 대조
**결과:** **PASS (코드)** — 간격·버튼 스펙 수정 반영
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | S02 padding 100 · BG #fff | PASS | |
| 2 | 제목↔지도↔주소 gap **48px** | PASS (수정) | 기존 64px → 48px |
| 3 | 지도 1440×771 · r24 · stroke 없음 | PASS | placeholder 이미지 |
| 4 | 주소 행 top 1px · 442/26/972 · pad 35 | PASS | |
| 5 | 주소 24/w500 · 교통 20/w400 60% | PASS | |
| 6 | 주소→교통 gap 26 · 교통→버튼 gap 46 | PASS (수정) | detail gap 중복 제거 |
| 7 | 버튼 238×78 · r999 · border #dbdbdb | PASS (수정) | 고정 w/h |
| 8 | 버튼 글자 **24/w500** · 버튼 간격 **16px** | PASS (수정) | 기존 20px·24px |
| 9 | 서브 히어로 · 푸터 · GNB | PASS | |

## 2026-07-10 · [static] template-homepage about-directions
**범위:** `about-directions.html` · `css/style.css` — 서브 히어로 · `#directions` 오시는길
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | 공통 서브 히어로 | PASS | `770:2339` 동일 카피 |
| 2 | 제목 오시는 길 46/w600 | PASS | |
| 3 | 지도 1440×771 radius 24 stroke 없음 | PASS | `feature-bg-03` placeholder |
| 4 | 주소 행 top 1px · 442/972 grid | PASS | vision 패턴 |
| 5 | 주소 24/w500 · 교통 20/w400 60% | PASS | |
| 6 | 지도 버튼 pill 238×78 border #dbdbdb | PASS | 외부 링크 target blank |
| 7 | 공통 푸터 | PASS | |
| 8 | GNB 오시는길 링크 | PASS | index · about-greeting |

## 2026-07-10 · [static] template-homepage about-greeting S04 history
**범위:** `about-greeting.html` · `css/style.css` · `js/main.js` — `#greeting-history` 연혁 · `year-carousel`
**결과:** **PASS (코드)** — 브라우저 수동 확인 필요
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | Section BG `#f8f8f8` · padding 100 | PASS | `--color-surface-subtle` · clamp padding |
| 2 | 제목 연혁 46/w600 | PASS | vision title 토큰 동일 |
| 3 | 컬럼 600 · gap 46 | PASS | `--history-col-w` · `--history-gap` |
| 4 | 활성 opacity 100% · 비활성 20% | PASS | `.is-active` |
| 5 | 연도 클릭 → 1번 슬라이드 | PASS (코드) | `initYearCarousel` · reorderToFront |
| 6 | 2023 연도 30/w700 | PASS | `--sm` modifier |
| 7 | 항목 MM. w500 + 본문 w400 gap 16 | PASS | |
| 8 | 오른쪽 bleed viewport | PASS | features inset 패턴 |
| 9 | scroll-reveal 타이틀·트랙 | PASS | |
| 10 | prefers-reduced-motion | PASS | 즉시 reorder |

## 2026-07-09 · [wordpress] wonkangmetal P2-3 page templates 런타임 QA
**범위:** `wordpress/wonkangmetal/` COMPANY/FACTORY/CUSTOMER/Legal 페이지·GNB·sub-nav·breadcrumb·footer·홈 CTA · product/news 회귀 (CF7·inquiry form·다국어·GSAP·이미지·01-original·_mirror 제외)
**결과:** **PASS (런타임)** — Laragon `wonkangmetal.test` curl+HTML 검증
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | `/company/*` 4 URL | PASS | 200 · sub-nav active 1 · breadcrumb |
| 2 | `/factory/*` 4 URL | PASS | 200 · sub-nav active 1 · breadcrumb |
| 3 | `/contact/` · legal 2 URL | PASS | 200 · breadcrumb · pages.css |
| 4 | `/company/` → overview | PASS | 301 |
| 5 | `/factory/` → process | PASS | 301 |
| 6 | GNB COMPANY/FACTORY/PRODUCT/CUSTOMER | PASS | 실 URL · 회사소식 `/news/` |
| 7 | 헤더 CONTACT · 푸터 legal | PASS | `/contact/` · `/privacy-policy/` · `/email-policy/` |
| 8 | 홈 CTA · stats more | PASS | 견적문의·회사개요 → `/contact/` · `/company/overview/` |
| 9 | `href="#"` | PASS | 렌더 HTML 0건 · 테마 소스 0건 |
| 10 | product/news 회귀 | PASS | 4 URL 200 |
| 11 | `/inquiry/` | PASS (미구현) | 404 정상 |
**런타임 수정:** `inc/pages.php` — WP 기본 `privacy-policy` draft → publish 동기화 (초기 404)
**임시 연결:** GNB·홈 견적문의 → `/contact/` (P2-4 `/inquiry/` 생성 후 교체)
**남음:** placeholder 본문 · contact 지도/폼 · legal 전문(P2-5) · KO/EN/JP disabled

## 2026-07-09 · [wordpress] wonkangmetal P2-2 news 구조 QA
**범위:** `wordpress/wonkangmetal/` news CPT·taxonomy·archive/single·card·메인 section-news·news.css (product·inquiry·다국어·GSAP·이미지·01-original·_mirror 제외)
**결과:** **PASS (정적·런타임)**
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | `inc/news.php` require | PASS | product 다음 · menus 전 |
| 2 | news CPT · news_type taxonomy | PASS | rewrite `news` · `news_type` rewrite false |
| 3 | 샘플 시드 3건 | PASS | notice 1 · news 2 · `wonkangmetal_news_samples_seeded` |
| 4 | `/news/` archive | PASS | type-filter · news-grid · news-card |
| 5 | `?type=news` · `?type=notice` | PASS | 2건 / 1건 필터 |
| 6 | single `/news/{slug}/` | PASS | meta·본문·목록으로 |
| 7 | external_url | PASS | sample-news-02 카드→example.com · 상세 원문 보기 |
| 8 | 메인 section-news | PASS | 최신 3건 WP_Query · 전체 뉴스 보기 링크 |
| 9 | news.css enqueue | PASS | archive·single만 |
| 10 | product URL 회귀 | PASS | `/product/` · `/product/category/pump-general/` 200 |
| 11 | product.php 미수정 | PASS | rewrite 우선순위 필터 유지 |
| 12 | 그누보드 grep | PASS | 0건 |
| 13 | `01-original/**` · `_mirror/**` | PASS | git 변경 없음 |
**런타임:** Laragon `wonkangmetal.test` curl 확인
**남음:** 썸네일 없음(placeholder) · Swiper 미연동 · GNB 회사소식 `#` · 관리자 external_url UI 없음(메타만)

## 2026-07-09 · [wordpress] wonkangmetal P2-1 product 구조 QA
**범위:** `wordpress/wonkangmetal/` product CPT·taxonomy·archive/single/taxonomy 템플릿·GNB·Solution·product.css (news·inquiry·다국어·GSAP·이미지 제외)
**결과:** **PASS (정적·코드)** — WordPress 활성화·permalink·시드·템플릿 로딩은 `[WP 확인 필요]`
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | `functions.php` → `inc/product.php` require | PASS | assets 다음 · menus 전 |
| 2 | product CPT 등록 | PASS | `init` · rewrite `product` · `has_archive` |
| 3 | product_category taxonomy | PASS | `product/category` · hierarchical · `product`에 연결 |
| 4 | 샘플 시드 1회 | PASS | 옵션 `wonkangmetal_product_samples_seeded` 가드 · 기존 slug skip |
| 5 | `/product/` archive | PASS (정적) | `archive-product.php` · sub-hero/sub-nav/card · `[WP 확인 필요]` |
| 6 | 4카테고리 URL | PASS (정적) | slug·헬퍼 일치 · rewrite flush 옵션 1회 · `[WP 확인 필요]` |
| 7 | single `/product/{slug}/` | PASS (정적) | `single-product.php` · breadcrumb·sub-nav·part 라벨 |
| 8 | part 필터 pump만 | PASS | `wonkangmetal_is_pump_category` · taxonomy만 UI · archive는 쿼리만 |
| 9 | GNB·sub-nav 링크 | PASS | PRODUCT 서브 4탭 = 카테고리 URL · sub-nav 4항목 동일 라벨/slug |
| 10 | Solution 4카드 | PASS | `theme-data` category → `wonkangmetal_product_category_url()` |
| 11 | product.css 조건부 enqueue | PASS | archive·single·taxonomy만 · front-page 미로드 |
| 12 | 그누보드 흔적 grep | PASS | `g5_`·`bo_table`·`bbs/`·`write_update.php`·`wrest.js` 0건 |
| 13 | `01-original/**` · `_mirror/**` | PASS | git 변경 없음 |
**수정:** 없음 (정적 QA 기준 이슈 없음)
**런타임 (Laragon wonkangmetal.test):** 2026-07-09 추가 확인 — 테마 활성화·permalink·시드·URL 5종·Solution 4카드 **PASS**
**런타임 수정:** `inc/product.php` — taxonomy rewrite 우선순위 (`product/category/` 404 수정)
**남음:** 로컬 hosts에 `wonkangmetal.test` 추가 필요(관리자) · product UI 골격 수준
**P2-2:** 런타임 PASS — news 착수 가능

## 2026-07-09 · [wordpress] wonkangmetal P1 골격 QA
**범위:** `wordpress/wonkangmetal/` 테마 골격만 (P2 CPT·archive·CF7·다국어·GSAP 제외)
**결과:** **PASS (코드·정적·Playwright @390)** — 실제 WP 설치 런타임·PC GNB 드롭다운은 미확인
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | style.css Theme Header | PASS | Theme Name · Text Domain · Version |
| 2 | functions.php require (assets/menus/theme-data) | PASS | |
| 3 | CSS/JS enqueue 경로 | PASS | 등록 파일 전부 `assets/` 존재 |
| 4 | PHP fatal (header/footer/front-page/page) | 미실행 | 로컬 `php` CLI 없음 · `$args` 가드 추가 |
| 5 | template-parts 경로 | PASS | sections 8 · layout mobile-menu/sub-hero 등 |
| 6 | 메인 8섹션 출력 | PASS | front-page.php 8× `get_template_part` |
| 7 | 모바일 메뉴 JS | PASS | @390px 열림·닫힘 · console error 없음 |
| 8 | console error | PASS | 정적 프리뷰 + hero NEXT 전환 |
| 9 | 그누보드 흔적 grep | PASS | `g5_`·`bo_table`·`bbs/`·`wrest.js` 0건 |
| 10 | `01-original/**` · `_mirror/**` | PASS | git 변경 없음 |
**수정:** `sub-hero.php` · `breadcrumb.php` · `sub-nav.php` — `$args` 미정의 PHP 8 Warning 방지
**남음:** 실제 WordPress 활성화 QA · PC GNB 서브메뉴 · placeholder 이미지·카피 · `home.css` 전역 로드(경미)
**P2:** 골격 기준 착수 가능 (WP 로컬 설치 후 1회 통합 확인 권장)

## 2026-07-09 · [reference-harness] 10PAGE SVC0002/5/6 browser-capture QA
**결과:** **PASS** (queue 0) · preview 4211/4212/4213
## 2026-07-09 · [reference-harness] wonkangmetal browser-capture QA
**범위:** 원강금속 공개 사이트 복제 (Track C)
**결과:** **PARTIAL** — 220 pages · nav smoke PASS · queue 160
**미리보기:** http://127.0.0.1:4210/
## 2026-07-09 · [reference-harness] ptmd868445 KV flash fix
**범위:** working-copy KV hero (style-A)
**결과:** **확인 필요** (코드 수정 완료 · 브라우저 하드 리프레시 후 슬라이드 간격 ~5초인지 확인)
**비고:** 테마 init throw 루프 + destroy 레이스 제거
## 2026-07-08 · [reference-harness] ptmd871337·868445·864942 수집 QA

**결과:** 각 **PARTIAL** (60 pages · browser-captured · Track C)
**공통:** captures PASS · multipage mirror PASS · analysis draft PASS · working/map skipped

## 2026-07-08 · [reference-harness] ptmd869920 analysis PASS (Track C 범위)

**결과:** **PASS (분석 산출)** — 메인+하위화면 IA · commerce slot · interaction map
**한계:** 모듈명 unverified · remaining 미러·주문서 제외 · 납품/working skipped
**문서:** `00-reference/analysis.md`

## 2026-07-08 · [reference-harness] ptmd869920 멀티페이지 네비 QA

**결과:** **PASS (주요 페이지 이동)** · PARTIAL (큐 잔여 ~190 · ZIP 아님)
**확인:** / · about · basket · category×2 · board · event · search · product/33/ → HTTP 200
**미리보기:** http://127.0.0.1:4180/
**증거:** `02-original-qa/report.md` · `pages.json`

## 2026-07-08 ? [reference-harness] ptmd869920 ��Ÿ�� ��˼�

**���:** **PASS (���� ���̾ƿ�)** �� CSS optimizer �����ؽ� ��̷� �� http://127.0.0.1:4176/  
**����:** optimizer.php �浹 + ������ + .php MIME  
**����:** `02-original-qa/compare/local-fixed-1920.png` �� `style-recheck.md`

## 2026-07-08 ? [reference-harness] ptmd869920 browser-capture QA

**case:** `ptmd869920` �� **����:** browser-capture-qa  
**���:** **PARTIAL** ? ���� Desktop/Mobile fold��full PASS �� ��/īƮ/�ܼ� NOT_TESTED  
**���:** browser-captured �� working/release **����**

## 2026-07-08 ??[reference-harness] sample03 01-original ?�집

**case:** `sample03` · **기�?:** `source-collection.md` · `stage-gates.md`  
**결과:** **PASS (?�집)** ???�이?�스 ?�용???�인 ?��?· working-copy 금�?

| 체크 | 결과 | 비고 |
|------|------|------|
| `01-original/index.html` 진입 | PASS | rewrite ?�함 |
| CSS·JS·?��?지 로컬 | PASS | 92 files |
| ?�일 ?�메??backfill | PASS | ?�품·배너 21�?추�? |
| ?��? ?�존 기록 | PASS | 4�?unresolved |
| `01-original` ?�정 ?�음 | PASS | README 고정 |
| 캡처 1920/390 | PASS | `00-source/captures/` |

**?�여:** fonts.gstatic woff · 로컬 ?�프?�인 ?�전 ?�작 검�?· `03-working-copy` ?�정 범위 ?�인  
**?�거??** `legacy/01-reconstruction/` QA?????�크?�로 기�? **무효**

---

## 2026-07-08 ??[reference-harness] sample03 01-high-fidelity-reconstruction v2

**case:** `sample03` · **기�?:** `reconstruction.md` · `reconstruction-qa.md`  
**결과:** **PASS (코드·캡처)** ???�용???��????��????��?· normalized 금�?

| 체크 | 결과 | 비고 |
|------|------|------|
| measured typo/layout (210/1500/66/815) | PASS | metrics.json |
| 로컬 ?��??��?지 (ref-*.png) | PASS | gradient ?�거 |
| hero 3?�널 + horizontal slide | PASS | ref-4/5/6 |
| top-band salmon · intro check · chip | PASS | estimated logged |
| ?�품 369×492 · hover · 390 2??| PASS | |
| after-fold 1920/390 | PASS | captures/ |
| module/tokens ?�음 | PASS | |
| ?�본 ref overlay-free | 보류 | ?�모 캡처 ?�계 |

**?�여:** ref overlay · slide2/3·?�품 SKU 1:1 · review ?�사  
**비교:** `01-reconstruction/captures/*/after-fold.png` vs `00-reference/captures/*/compare-ref-fold.png`

---

## 2026-07-08 ??[reference-harness] sample03 reconstruction (메인 ?�합) ??**기�? 미달·?��???*

**case:** `sample03` · **범위:** `01-reconstruction/index.html` ???�션  
**결과:** ~~PASS (코드)~~ ??**visual fidelity 미달** (wireframe ?��?)

| ??�� | 결과 | 비고 |
|------|------|------|
| ?�션 IA | PASS | 구조�?|
| ?�각 ?�사??| **FAIL** | ?�트·간격·?�더·?�어�?불일�?|
| ??보정 | `reconstruction-log.md` 참고 | after 캡처 ?�출 |

---

## 2026-07-06 ??365-barun-dental ?�터?�션 preset (WP)

**?�플�?** `365-barun-dental` · **범위:** 메인 ?�이지 PC ?�터?�션  
**결과:** **PASS (코드)** ??브라?��? ?�인 ?��?
| preset | ?�용 ?�치 | ?�한 | 결과 |
|--------|-----------|------|------|
| scroll-reveal | philosophy~reservation (hero ?�외) | ?�션??1�?| PASS |
| hover-tone | GNB · footer links | hover 2�??�하 | PASS |
| image-scale-hover | treatments·space ?��?지 | digital�?분리 | PASS |
| button-text-slide-hover | header·hero·reservation CTA | | PASS |
| digital ??| 453:516 주석 | 기존 ?��? | PASS |
| reduced-motion | 즉시 ?�시 | 45 규칙 | PASS |
| verify | static | 23/23 | PASS |

**?�음:** `http://barun.test` ?�크롤·hover·버튼·갤러�??�인

---

## 2026-07-06 ??365-barun-dental 메인 ?�이지 ?�합 ?��???(WP)

**?�플�?** `365-barun-dental` · **범위:** `453:330` ?�체 (Header ??Footer)  
**결과:** **PASS (코드·Figma ?��?** ??브라?��? ?��??�·태블릿/모바??보류 ??�� 별도

| ?�트 | node | 코드 | 결과 | 비고 |
|------|------|------|------|------|
| Header | 453:331 | style/header | PASS | GNB·CTA·SUIT 16px |
| Hero | 453:348 | section-hero | PASS | 17/30 본문 · gradient 30% |
| Philosophy | 474:877 | section-philosophy | PASS | Hero?� ?�일 BG ?�속 |
| Treatments | 453:404 | section-treatments | PASS | green 11% tint |
| Process | 453:478 | section-process | PASS | step num 44/900 @15% |
| Digital | 453:516 | section-digital | PASS | ??opacity 0.3/1 · 04 ?��?지 ?�시 |
| Space | 453:543 | section-space | PASS | H1 48/62 · 4??축소 ?�도 |
| Reservation | 453:582 | section-reservation | PASS | center · CTA hero ?�큰 |
| Footer | 453:603 | footer | PASS | legal white 100% · logo crop |
| ?�접 BG | ??| ??| PASS | f8f8f8 ??tint ??004346 |
| Typography | SUIT 가?�드 | :root tokens | PASS | Pretendard ?�거 ?�료 |
| verify | static | 23/23 | PASS | PHP 문법 ?��? OK |

**?�인 ?�요 (브라?��?):** Digital 04 멸균 ?�진 · KV/카드 crop · ?�터 로고 ?�로고침 · ??링크 `#`  
**보류:** Treatments~Reservation @1024/@768 ?�이?�웃 (Hero·Philosophy�?부�?반응??  
**?�음:** ?�용????PASS ????URL 반영 ???�블�?모바??착수

---

## 2026-07-06 ??365-barun-dental reservation CTA (WP)

**?�플�?** `365-barun-dental` · **범위:** `453:582` 07_Reservation CTA  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ??�� | Figma | 코드 | 결과 |
|------|-------|------|------|
| Shell | guttered 1440 · py 64 | `--reservation-py` · shell | PASS |
| Section BG | green 11% tint | `--color-reservation-bg` | PASS |
| ?�접 | Space `#f8f8f8` ??tint ??Footer `#004346` | ??| PASS |
| ?�벨 | RESERVATION 13/600/#618074 · center · upper | `--type-label` | PASS |
| ?�목 | 48/62 · 2�?· center | `--type-h1` | PASS |
| ?�벨?�제�?| 24 | `--reservation-header-gap` | PASS |
| ?�목?�버??| 64 | `--reservation-inner-gap` | PASS |
| CTA | 174×54 r10 · gap 16 | hero-btn ?�큰 ?�사??| PASS |
| Primary | `#0d422e` · white 15/600 | `--primary` + `--type-ui` | PASS |
| Outline | white · `#0d422e` text | btn--outline | PASS |
| 링크 | `#` placeholder | ?��? URL 추후 | PASS |
| verify | 23/23 | | PASS |

**?�음:** ?�용??PASS ???�이지 ?�합 QA

---

## 2026-07-06 ??365-barun-dental space (WP) · ?��???
**?�플�?** `365-barun-dental` · **범위:** `453:543` 06_Space  
**결과:** **PASS (코드)** ??캡션 비율 ?�정 · 브라?��? ?�인 ?��?
| ??�� | Figma | 코드 | 결과 |
|------|-------|------|------|
| Shell | guttered 1440 · py 64 | ??| PASS |
| Section BG | `#f8f8f8` | `--color-hero-bg` | PASS |
| ?�접 | Digital tint ??Space `#f8f8f8` | ??| PASS |
| ?�더?�갤?�리 | 64 | `--space-inner-gap` 64 | PASS |
| ?�벨?�제�?| 24 | `--space-header-gap` 24 | PASS |
| ?�목 | 46/60 · 2�?| clamp 46/60 | PASS |
| 갤러�?gap | 24 | `--space-gallery-gap` 24 | PASS |
| 카드 비율 | 500×420 · r24 | aspect-ratio + radius | PASS |
| 4??1440 | 342×287 (축소) | repeat(4,1fr) | PASS (?�도) |
| Caption | h 102/420=24.3% · pad 18/24 | % 기반 | PASS (?�정) |
| Caption BG | `#fff` 80% | `rgba(255,255,255,0.8)` | PASS |
| eyebrow | 11/18 · 80% | clamp + muted | PASS |
| card title | 24/32 · 700 | clamp + 700 | PASS |
| eyebrow?�title | 6 | `--space-caption-gap` 6 | PASS |
| 카피 4??| Figma ?�스??| `barun_dental_space_gallery()` | PASS |
| ?��?지 | 4 imageRef | hash 매핑 | PASS |

**비고:** Figma ?�본 카드 500px×4=2072 > 1440 ??4??균등 축소(비율 ?��?). ?�블릿·모바일 보류.

---

## 2026-07-06 ??365-barun-dental space (WP)

**?�플�?** `365-barun-dental` · **범위:** `453:543` 06_Space  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ??�� | 기�? | 결과 |
|------|------|------|
| Shell | guttered 1440 · py 64 · bg #f8f8f8 | PASS |
| ?�더?�갤?�리 | gap 64 · label/title 24 | PASS |
| 갤러�?| 4??· gap 24 · ratio 500:420 · r24 | PASS |
| Caption | h 102 · pad 24/18 · bg #fff 80% | PASS |
| ?�?�포 | title 46/60 · eyebrow 11/80% · card 24/32 | PASS |
| ?��?지 | f9d7099·c5333d7d·dec7e9fe·3e8ab736 | PASS |
| verify | static | PASS |

**?�음:** ?�용??PASS ???�이지 ?�합 QA

---

## 2026-07-06 ??365-barun-dental digital (WP) · ?��???
**?�플�?** `365-barun-dental` · **범위:** `453:516` 05_Digital  
**결과:** **PASS (코드)** ???�진 crop 미세조정 · 브라?��? 최종 ?�인 ?��?
| ??�� | Figma | 코드 | 결과 |
|------|-------|------|------|
| Shell | guttered 1440 · py 64 | `--layout-pad-x` · `--digital-py` | PASS |
| Section BG | `#76a17d` @ 11% | `rgba(118,161,125,0.11)` | PASS |
| ?�접 BG | Process `#f8f8f8` ??Digital tint | ?�일 | PASS |
| ?�더?�본�?| 64 | `--digital-inner-gap` 64 | PASS |
| ?�벨?�제�?| 24 | `--digital-header-gap` 24 | PASS |
| 2??비율 | 908 + 532 · gap 0 | `908fr`/`532fr` gap 0 | PASS |
| ?�진 박스 | 908×723 · r14 | min-h 723 · absolute cover | PASS |
| ?�진 crop | mask offset | `object-position: 50% 56%` | PASS (?�정) |
| 리스??pad | 64 L/T/B | `--digital-list-pad` | PASS |
| stack gap | 54 (??��·구분?? | `--digital-list-stack-gap` 54 | PASS |
| 번호 | w70 · gap34 · top · #0d422e 100% | flex-start · num-w70 | PASS |
| ?�목?�본�?| 12 | `--digital-copy-gap` 12 | PASS |
| 구분??| 1px · #0d422e 10% | `--color-digital-divider` | PASS |
| ?�?�포 | label 13/600 · title 48/700 · item 21/15 | clamp ?�치 | PASS |
| 본문 ??| 60% | `--color-digital-muted` | PASS |
| 카피 4??�� | Figma ?�스??| `barun_dental_digital_features()` | PASS |
| ?��?지 01 | `e32e13d4?? scanner | PASS |
| ?��?지 02~04 | ?�릭 교환 | 04 `treatment-room` ?�시 | ?�인 ?�요 |
| ?�터?�션 | PC ?�레???�음 | ?�릭 ??src 교환 | ?�인 반영 |
| verify | static 21/21 | PASS |

**비고:** 04�??�진·crop ??검?�는 ?�용???�인. ?�블릿·모바일 보류.

---

## 2026-07-06 ??365-barun-dental digital (WP)

**?�플�?** `365-barun-dental` · **범위:** `453:516` 05_Digital  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ??�� | 기�? | 결과 |
|------|------|------|
| Shell | guttered 1440 · py 64 · bg rgba(118,161,125,0.11) | PASS |
| ?�더?�본�?| inner gap 64 · label/title gap 24 | PASS |
| 2??| 908:532 · ??gap 0 · media h 723 · radius 14 | PASS |
| 리스??| pad 64 · stack gap 54 · divider 10% | PASS |
| ??�� | num w70 gap 34 · title/desc gap 12 · top align | PASS |
| ?�?�포 | num #0d422e 100% · desc 60% | PASS |
| ?��?지 | imageRef 매핑 · ?�릭 교환 · 04 ?�시 | PASS |
| verify | static | PASS |

**?�음:** ?�용??PASS ??06_Space

---

## 2026-07-06 ??365-barun-dental process (WP)

**?�플�?** `365-barun-dental` · **범위:** `453:478` 04_Process / Patient Journey  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ??�� | 기�? | 결과 |
|------|------|------|
| Shell | guttered 1440 · py 64 · bg #f8f8f8 | PASS |
| ?�더?�스??| inner gap 64 · label/title gap 24 | PASS |
| ?�텝 그리??| 5??· gap 24 · 카드 min-h 240 · pad 24 | PASS |
| 카드 ?�?�포 | num 44/900/#0d422e · title 18/600 · desc 14/60% | PASS |
| 카드 ?��? | num?�body 12 · title?�desc 8 | PASS |
| ?�접 | Treatments green tint ??Process #f8f8f8 | PASS |
| verify | static | PASS |

**?�음:** ?�용??PASS ??05_Digital

---

## 2026-07-06 ??365-barun-dental treatments (WP)

**?�플�?** `365-barun-dental` · **범위:** `453:404` 03_Treatments  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ??�� | 기�? | 결과 |
|------|------|------|
| Shell | guttered 1440 · py 64 · bg #76a17d | PASS |
| ?�더?�콘?�츠 | inner gap 64 · label/title gap 24 | PASS |
| 2??| gap 24 · featured 620 / aside 796 · ?�이 505 | PASS |
| ?�처??| pad 36 · radius 24 · 01 ?�?�포 · overlay | PASS |
| 카드??| gap 24 · 400+372 · h 276 · radius 20 | PASS |
| 매트�?�� | pad 20/24/42 · radius 18 · 구분??#e8e8e8 · 03~06 | PASS |
| ?�접 | Philosophy #f8f8f8 ??Treatments #76a17d · gap 0 | PASS |
| verify | 19/19 | PASS |

**?�음:** ?�용??PASS ??04_Process

---

## 2026-07-06 ??365-barun-dental philosophy (WP)

**?�플�?** `365-barun-dental` · **범위:** `474:877` 02_Philosophy  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ??�� | 기�? | 결과 |
|------|------|------|
| Shell | guttered 1440 · py 64 · bg #f8f8f8 | PASS |
| 좌열 | label 13 · title 48/62 · desc 17/30 · gap 22/24 | PASS |
| ?�열 | 3?�칙 · num 15 · title 28 · body 16 · divider #e8e8e8 | PASS |
| ??gap | 120 · �?560 / ??760 | PASS |
| ?�접 | KV?� gap 0 (?�일 BG) | PASS |
| @1024 | 1???�택 | PASS |
| verify | 18/18 | PASS |

**?�음:** ?�용??PASS ??03_Treatments

---

## 2026-07-06 ??365-barun-dental hero / KV (WP)

**?�플�?** `365-barun-dental` · **범위:** `453:348` 01_Hero / Main Visual  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ??�� | 기�? | 결과 |
|------|------|------|
| Shell | guttered 1440 · pad-y 54 · pad-x 240 | PASS |
| Section | 1920×820 · bg #f8f8f8 + image + gradient 30% | PASS |
| Eyebrow | pill #ebf4f0 · 12px w600 #28654a · pad 9/30 | PASS |
| Title | 76/90 · 2�?· #11211b | PASS |
| Desc | 18/32 · 60% · 2�?| PASS |
| Gap | heading 28 · copy 32 · content?�cta 58 · cta 16 | PASS |
| CTA | 174×54 r10 · primary #0d422e · outline white | PASS |
| Image | Figma imageRef ??patient-care.png | PASS |
| Preset | ?�적 1??· slider 미적??| PASS |
| @1024/@768 | object-position · overlay · CTA wrap | PASS |
| verify | 16/16 | PASS |

**?�음:** ?�용??PASS ??02_Philosophy

---

## 2026-07-06 ??365-barun-dental header · footer (WP)

**?�플�?** `365-barun-dental` · **범위:** `453:331` Header · `453:603` Footer  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ??�� | 기�? | 결과 |
|------|------|------|
| Header BG | `#ffffff` · 89px(h) · pad 240 | PASS |
| GNB | 5메뉴 16px w500 · gap 12 · CTA `#0d422e` 15px | PASS |
| Footer BG | `#004346` · py 96 · inner 720 · pad 600 | PASS |
| ?�터 카피 | 진료?�간 3??· 주소 · ?�업??· ?��? 3 · ©2026 | PASS |
| Fluid | clamp/vw 1920 기�? | PASS |
| @1024 | GNB ?��? · ?�버�??��? | PASS |
| @768 | ?�터 ?�간 ???�로 ?�렬 | PASS |
| verify | `verify-wordpress-static.js` 15/15 | PASS |
| 로고 | Figma VECTOR 미반??· ?�시 SVG | ?�인 ?�요 |

**?�음:** ?�용??PASS ??01_Hero 착수

---

## 2026-06-08 ??hd-ec vision scroll-pin-scale-card (PC)

**?�플�?** `hd-ec` · **catalog:** `scroll-pin-scale-card` · **범위:** vision (`225:2128`)  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ??�� | 기�? | 결과 |
|------|------|------|
| pin | sticky · scroll 100vh | PASS |
| scale | 0.32?? scrub | PASS |
| overlay | ???�진 강화 | PASS |
| title | ?�반 fade-in · scroll-reveal ?�거 | PASS |
| @768 | pin 비활??· ?�적 | PASS |
| reduced-motion | ?�적 fallback | PASS |
| 충돌 | vision scroll-reveal ?�외 | PASS |

**?�음:** ?�용??PASS

---

## 2026-06-08 ??hd-ec scroll-reveal (PC · 1/5)

**?�플�?** `hd-ec` · **preset:** `scroll-reveal`  
**결과:** **PASS** ???�용???�인 ?�료

| ??�� | 기�? | 결과 |
|------|------|------|
| ?�??| hero/header/footer ?�외 6?�션 | PASS |
| ?�작 | IO 진입 · 180ms stagger · 1??| PASS |
| reduced-motion | 즉시 `is-revealed` | PASS |
| 중복 | hero �??�면 미적??| PASS |
| 기존 | projects `drag-scroll` ?��? | PASS |

---

## 2026-06-08 ??hd-ec hover-tone (PC · 2/5)

**?�플�?** `hd-ec` · **preset:** `hover-tone`  
**결과:** **PASS** ???�용???�인 ?�료

| ??�� | 기�? | 결과 |
|------|------|------|
| GNB | header link · lang btn opacity | PASS |
| CTA | business · newsroom · careers opacity | PASS |
| newsroom row | item link opacity | PASS |
| investor card | brightness only · no transform | PASS |
| fine pointer | `@media (hover: hover)` only | PASS |
| scroll-reveal | ?�일 ?�소 transform 충돌 ?�음 | PASS |

---

## 2026-06-08 ??hd-ec image-scale-hover (PC · 3/5)

**?�플�?** `hd-ec` · **preset:** `image-scale-hover`  
**결과:** **PASS** ???�용???�인 ?�료

| ??�� | 기�? | 결과 |
|------|------|------|
| business | card hover · bg scale 1.05 | PASS |
| projects | card hover · bg scale 1.05 | PASS |
| investor panel | panel hover · bg scale 1.05 | PASS |
| clip | inner/panel `overflow:hidden` | PASS |
| hover-tone | img vs link/button 분리 · 충돌 ?�음 | PASS |
| reduced-motion | scale 비활??| PASS |

---

## 2026-06-08 ??hd-ec stats-counter (PC · 4/5)

**?�플�?** `hd-ec` · **preset:** `stats-counter`  
**결과:** **PASS** ???�용???�인 ?�료

| ??�� | 기�? | 결과 |
|------|------|------|
| ?�??| investor panel price | PASS |
| ?�작 | 0??23,000 · comma grouping | PASS |
| ?�리�?| `#investor` IO · 1??| PASS |
| reduced-motion | 최종�?즉시 | PASS |
| scroll-reveal | price ?�드 transform ?�음 | PASS |

---

## 2026-06-08 ??hd-ec button-text-slide-hover (PC · 5/5)

**?�플�?** `hd-ec` · **preset:** `button-text-slide-hover`  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ??�� | 기�? | 결과 |
|------|------|------|
| business | 4× CTA text slide | PASS |
| newsroom | more btn text slide | PASS |
| careers | CTA text slide | PASS |
| arrow | ?�이�?slide �?· ?��? | PASS |
| hover-tone | CTA 병용 · preset ?�용 | PASS |
| reduced-motion | slide 비활??| PASS |

**?�음:** ?�용??PASS ???�터?�션 ?�체 QA

---

## 2026-06-08 ??hd-ec careers (PC static)

**?�플�?** `hd-ec` · **범위:** careers (`231:2187`)  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ?�역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| Shell | gutter 40 | `careers__shell` | PASS |
| 카드 | 1840×304 · r16 · #d9d9d9 | `.careers__card` | PASS |
| pad | 86/56 | `--careers-card-pad-*` | PASS |
| title?�btn | gap 26 | `--careers-card-gap` | PASS |
| ?�?��? | 30/700 center | Figma 카피 | PASS |
| CTA | border 1px · pad 16/30 · r6 | `채용 공고 바로가�? | PASS |
| @1024 | ??| CTA wrap | PASS |

**?�음:** ?�용??PASS ???�체 QA

---

## 2026-06-08 ??hd-ec footer (PC static)

**?�플�?** `hd-ec` · **범위:** footer (`244:2298`)  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?· `footer-logo.png` export ?��?
| ?�역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| 배경 | `#f3f4f5` | `--footer-bg` | PASS |
| ?�딩 | 96 / 240 | `--footer-pad-y/x` | PASS |
| ?�단 간격 | 180 (careers ?�음 ??investor ?? | `margin-top: section-gap` | PASS |
| 로고 | 192×38 | `footer-logo.png` placeholder | PASS |
| logo?�content | gap 38 | `--footer-logo-gap` | PASS |
| policy | 16/700 · gap 16 | 3링크 | PASS |
| content?�meta | gap 16 | `--footer-content-gap` | PASS |
| address | 16/500 · gap 16 | 3??�� | PASS |
| copyright | 16/500 ?�측 | `footer__copy` | PASS |
| @1024 | ??| meta ?�로 stack | PASS |

**?�음:** `section-careers` (`231:2187`) ?�는 ?�용???�체 QA

---

## 2026-06-08 ??hd-ec investor (PC static)

**?�플�?** `hd-ec` · **범위:** investor (`224:2080`)  
**Figma MCP:** title·cards·panel ?�치 ?��? 
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?· `investor-panel.jpg` ?�제 export ?��?
| ?�역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| Shell | gutter 40 | `investor__shell` | PASS |
| ?�?��? | 42px / 800 / center | `?�자?�보` | PASS |
| head?�layout | gap 68 | `--business-head-gap` | PASS |
| 카드 그리??| 597+753 / 753+597 · gap 24 | `investor__row--top/bottom` | PASS |
| 카드 | r16 · #f3f6fa · pad 56/36 | title 32/800 · desc 26/500 | PASS |
| ?�널 | 442×858 · overlay 20% | `investor-panel` | PASS |
| 주�? | 55/800 · meta 22/500 white | `223,000` · KOSPI | PASS |
| @1024 | ??| ?�널 ?�단 stack | PASS |
| @768 | ??| 카드 1??| PASS |

**?�음:** ?�용??PASS ??`section-careers` (`231:2187`)

---

## 2026-06-08 ??hd-ec business·projects·newsroom Figma ?�정 QA

**?�플�?** `hd-ec` · **범위:** business 카드 비율 · project ?�스??weight · newsroom border  
**Figma MCP:** `207:1313` · `212:1419` · `212:2037` (file `6966c0dd??)  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ?�역 | Figma | ?�정 | 결과 |
|------|-------|------|------|
| business 카드 | 442×588 (`card-infra` ?? | `aspect-ratio: 442/588` · `min-height` ?�거 | PASS |
| project date | 18px / **600** | `--project-date-weight: 600` | PASS |
| project name | 28px / **700** | `--project-name-weight: 700` | PASS |
| newsroom row stroke | `bottom:1` only · `#ededed` | `border-bottom` only · collapse hack ?�거 | PASS |

---

## 2026-06-08 ??hd-ec newsroom (PC static)

**?�플�?** `hd-ec` · **범위:** newsroom (`212:2037`)  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ?�역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| Shell | gutter 40 | `newsroom__shell` | PASS |
| ?�?��? | 42px / 800 / center | 1�?카피 | PASS |
| head?�list | gap 68 | `--business-head-gap` | PASS |
| row | 128px · pad 36/46 · border #ededed | `.newsroom-item__link` | PASS |
| title | 24px / 600 | Figma 카피 ×4 | PASS |
| date | 18px / 400 / 60% | ?�측 ?�렬 | PASS |
| list?�btn | gap 56 | `--newsroom-content-btn-gap` | PASS |
| CTA | border #1a1a1a · r6 · 20px | `??많�? ?�식 보기` | PASS |
| @768 | ??| row ?�로 stack | PASS |

**?�음:** ?�용??PASS ??`?�???�로?�트` (`224:2080`)

---

## 2026-06-08 ??hd-ec projects (PC static)

**?�플�?** `hd-ec` · **범위:** projects (`212:1419`)  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ?�역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| Shell | gutter 40 | `projects__shell` | PASS |
| ?�?��? | 42px / 800 / center | 1�?카피 | PASS |
| head?�track | gap 68 | `--business-head-gap` | PASS |
| 카드 | 1063×561 · gap 24 | 가�??�크�??�랙 | PASS |
| radius | 16 | `--project-card-radius` | PASS |
| date/name | 18/600 · 28/700 white | 4??�� | PASS |
| pad | 36 · bottom 64 | `--project-card-pad-*` | PASS |

**?�음:** Figma 카드 ?��?지 export · ?�용??PASS ??`?�스�? (`212:2037`)

---

## 2026-06-08 ??hd-ec business (PC static)

**?�플�?** `hd-ec` · **범위:** business (`207:1313`)  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ?�역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| Shell | gutter 40 | `business__shell` pad | PASS |
| ?�?��? | 42px / 800 / center | 2�?카피 | PASS |
| head?�grid | gap 68 | `--business-head-gap` | PASS |
| 카드 | 442×588 ×4 · gap 24 | flex 4??| PASS |
| overlay | black 40% | `--business-card-overlay` | PASS |
| radius | 16 | `--business-card-radius` | PASS |
| btn | border 1px white · r6 | `.business-card__link` | PASS |
| @1024 | ??| 2??| PASS |
| @768 | ??| 1??| PASS |

**?�음:** Figma 카드 ?��?지 export · ?�용??PASS ??`?�???�로?�트` (`212:1419`)

---

## 2026-06-08 ??hd-ec header·hero·vision ?��???(PC)

**?�플�?** `hd-ec` · **범위:** header · hero · vision  
**결과:** **PASS (코드)** ??vision 배경 ?��?지 export ?��?
| ?�역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| header logo | 193×39 PNG | `header-logo.png` | PASS |
| header globe | 54×54 `#D9D9D9` | `header-globe.png` | PASS |
| GNB center | cx 961 | absolute 50% | PASS |
| GNB gap | 36 | `--header-nav-gap` | PASS |
| hero bg | image | `hero-bg.jpg` | PASS |
| hero overlay | black **32%** | `--color-hero-overlay` | PASS (?�정) |
| hero title | 70px / lh 102.2 / left 96·348 | clamp + padding | PASS |
| vision card | 1840×900 · overlay **60%** | 구조 ?�치 | PASS |
| vision bg | image `ea3951cf?? | placeholder | **FAIL** ??export ?�요 |
| vision title | 56px / center | 2�?카피 | PASS |

---

## 2026-06-08 ??hd-ec vision (PC static)

**?�플�?** `hd-ec` · **범위:** vision (`225:2128`) · ?�터?�션 ?�음  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ?�역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| ?�션 ?�이 | 900px | `--vision-h` clamp | PASS |
| 카드 ??| 1840 (gutter 40) | `--layout-content` | PASS |
| 배경 | image + black 60% | `.vision__overlay` | PASS |
| ?�?��? | 56px / 700 / center / white | 2�?카피 | PASS |
| line-height | 90.72px | `--vision-title-lh` | PASS |
| max-width | 1245px | `--vision-title-max` | PASS |
| pin/scrub | 보류 | JS ?�음 | PASS |

**?�음:** Figma `vision-card` ?��?지 export · ?�용??PASS ??`?�업?�역` (`207:1313`)

---

## 2026-06-08 ??hd-ec header + hero (PC static)

**?�플�?** `hd-ec` · **범위:** header (`231:2166`) · hero (`220:2078`) · ?�터?�션 ?�음  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ?�역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| header ?�이 | 128px | `--header-h` clamp | PASS |
| header bg | `#ffffff` | `--color-white` | PASS |
| logo | 193×39 | placeholder SVG | PASS (?�셋 교체 ?��? |
| GNB | 24px / 500 / gap 36 | 6??�� Figma 카피 | PASS |
| lang btn | 54×54 `#D9D9D9` | `.header__lang` | PASS |
| hero ?�이 | 900px | `--hero-h` clamp | PASS |
| hero title | 70px / 700 / white | 2�?카피 | PASS |
| hero bg | image cover | placeholder jpg + gradient fallback | PASS (Figma export ?��? |
| JS | ??| `main.js` stub only | PASS |
| @1024 | ??| nav ?��? | PASS |
| @768 | ??| hero padding 조정 | PASS |

**?�음:** Figma 로고·hero ?��?지 export 교체 · ?�용??PASS ??`비전` ?�션

---

## 2026-06-08 ??skhynix-redesign ?�터?�션 Package B (PC)

**?�플�?** `skhynix-redesign` · **범위:** ???�션 preset · news JS  
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| preset | ?�션 | ?�인 |
|--------|------|------|
| `scroll-reveal` | products · heritage · sustainability · news · investor | IntersectionObserver · reduced-motion 즉시 ?�시 |
| `stats-counter` | heritage 4 stats | 1983 · 66.2 · 23.5 · 321 · 1??|
| `hover-tone` | product/news/investor card · filter/tab/link | fine pointer only · opacity 0.85 |
| `drag-scroll` | sustainability | 기존 ?��? |
| news filter | category show/hide · row sync | `data-news-filter` · `data-news-category` |
| news pagination | tab active state | `data-news-page` · static demo |
| smooth scroll | `html` | full-page snap ?�음 |
| scroll top | pageshow | 40-template-code-style |

**?�음:** ?�용??PASS ??PC 메인 ?�체 QA

---

## 2026-06-08 ??skhynix-redesign section-footer (PC)

**?�플�?** `skhynix-redesign` · **범위:** section-footer (`154:940`) · Figma MCP ?�수 ?��? 
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ?�역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| bg | `#f3f4f5` | `--color-footer-bg` | PASS |
| pad | 96/240 | section tokens | PASS |
| logo | 170×89 · gap 38 | `footerlogo.png` | PASS |
| policy | 16/700 op1 · gap 16 | `.footer__policy-link` | PASS |
| address | 16/500 op0.8 · gap 16 | `--color-footer-address` | PASS |
| copyright | 16/500 op0.9 · ?�측 | `--color-footer-copyright` | PASS |
| copy | Figma 문자??| `index.html` | PASS |
| @1024 meta stack · @768 address stack | ??| CSS | PASS |

**?�음:** ?�용??PASS ??PC 메인 ?�체 QA

---

## 2026-06-08 ??skhynix-redesign section-investor (PC)

**?�플�?** `skhynix-redesign` · **범위:** section-investor (`109:152`) · Figma MCP ?�수 ?��? 
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
| ?�역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| section pad | 96/240 | tokens | PASS |
| head gap | 57 | `--investor-head-gap` | PASS |
| title | 38/700 `#151414` · accent ?�음 | `.section-title` | PASS |
| cards row gap | 24 | `--grid-gap` | PASS |
| card | 464×288 · r26 · pad 46/36 · `#fff` | `.investor-card` | PASS |
| card inner gap | 100 (label?�body) | `--investor-card-inner-gap` | PASS |
| label | 14/700 `#ff7a00` op1 | `.investor-card__label` | PASS |
| title | 25/600 lh41 op1 | `.investor-card__title` | PASS |
| desc | 20/500 lh32 · op0.9 | `--color-investor-desc` | PASS |
| copy 3??| Figma 문자??| `index.html` | PASS |
| @1024 2??· @768 1??| ??| CSS | PASS |

**?�음:** ?�용??PASS ??footer

---

## 2026-06-08 ??skhynix-redesign section-news ?�수 검??(PC)

**?�플�?** `skhynix-redesign` · **범위:** section-news (`109:93`) · Figma MCP ?�수 ?��? 
**결과:** **PASS (코드)** ???�용??브라?��? ?�인 ?��?
### ?�이?�웃 · spacing

| ??�� | Figma | 구현 | 결과 |
|------|-------|------|------|
| section pad | 96 / 240 | `--section-pad-y` · `--section-inset-x` | PASS |
| body gap (content?�tabs) | 64 | `--news-body-gap` | PASS |
| content gap (head?�cards) | 56 | `--news-content-gap` | PASS |
| cards grid gap | 24 | `--grid-gap` | PASS |
| row gap | 24 | `--grid-gap` | PASS |
| head row gap · align | 10 · MAX/MAX | gap 10 · `flex-end` | PASS |
| filter group gap | 21 | `--news-filter-gap` | PASS |
| pagination gap | 12 | `--news-tab-gap` | PASS |

### ?�?��? · ?�터

| ??�� | Figma | 구현 | 결과 |
|------|-------|------|------|
| title | 38/700 lh51.68 · accent ?��??��? ?�한 ?�선??| `.section-title` + accent | PASS |
| filter active | 19/700 `#ff7a00` op1 · box 32h · bottom stroke 1 | accent + inset shadow · `min-height 32` | PASS |
| filter inactive | 19/500 `#151414` **op0.2** · stroke ?�음 · padB 6 | `--color-filter-inactive` | PASS |

### 카드

| ??�� | Figma | 구현 | 결과 |
|------|-------|------|------|
| card | 464×258 · r26 · pad 36/26 · `#fff` | flex 1 · tokens | PASS |
| card inner | VERTICAL space-between · gap 76 | `.news-card__body` | PASS |
| title | 26/600 lh42 · `#151414` op1 | tokens | PASS |
| meta | 16/500 lh26 · `#151414` **op0.9** | `--color-news-meta` | PASS |
| dot | 2×2 · `#151414` op1 | `.news-card__dot` | PASS |
| meta row gap | 8 | `--news-meta-gap` | PASS |
| copy 6??| Figma 문자??| `index.html` | PASS |

### ?�이지?�이??
| ??�� | Figma | 구현 | RESULT |
|------|-------|------|--------|
| active 01 | bg `#ffead7` **op0.4** · text 18/600 `#ff7a00` | `--color-tab-bg-active` | PASS |
| inactive 02??5 | bg ?�음 · text 18/400 `#151414` **op0.3** | `--color-tab-inactive` | PASS |
| size | 56×56 r99 | `--news-tab-size` | PASS |

**?�정 (검??�?:** filter btn `min-height: 32px` · `align-items: flex-start` (Figma ?�스??박스 ?�렬)

**?�음:** ?�용??PASS ??investor

---

## 2026-06-08 ??skhynix-redesign section-news (PC) ??superseded

_???�전??검?��???��?�로 ?��?

---

## 2026-06-08 ??skhynix-redesign section-sustainability (PC)

**?�플�?** `skhynix-redesign` · **범위:** section-sustainability (`111:254`) · PC only  
**기�?:** Figma MCP · `50-qa-checklist.mdc`  
**결과:** **구현 ?�료 ???�용??브라?��? ?�인 ?��?*

| # | ??�� | 결과 |
|---|------|------|
| 1 | ?�?��? accent ?��??��??�한 ?�일??`#ff7a00` | PASS (코드) |
| 2 | head row · nav 56×56 gap 12 · title/nav MAX ?�렬 | PASS (코드) |
| 3 | esg card 952×613 · img 504 r26 · inner gap 26 | PASS (코드) |
| 4 | card title 26/600 lh42 · desc 20/500 lh32 · gap 9 | PASS (코드) |
| 5 | track gap 24 · 1440 viewport · 카드 peek | PASS (코드) |
| 6 | drag-scroll + prev/next 버튼 | PASS (코드) |

**?�음:** ?�용??PASS ??news

---

## 2026-06-08 ??skhynix-redesign section-heritage (PC)

**?�플�?** `skhynix-redesign` · **범위:** section-heritage (`142:2`) · PC only  
**기�?:** Figma MCP · `50-qa-checklist.mdc`  
**결과:** **구현 ?�료 ???�용??브라?��? ?�인 ?��?*

| # | ??�� | 결과 |
|---|------|------|
| 1 | bg `section-heritage.jpg` opacity 0.56 ?�블리??| PASS (코드) |
| 2 | container 1440 · pad 96/240 · head gap 57 | PASS (코드) |
| 3 | ?�?��? accent ?�SK hynix???�심??`#ff7a00` | PASS (코드) |
| 4 | stat 4??342×342 · gap 24 · r26 · pad 36/26 | PASS (코드) |
| 5 | label 26/600 lh34 · desc 20/500 lh26 · gap 6 | PASS (코드) |
| 6 | value 80/800 lh96 · unit 26/800 · unit offset 13 | PASS (코드) |
| 7 | @1024 2??· @768 1??| PASS (코드) |

**?�음:** ?�용??PASS ??sustainability

---

## 2026-06-08 ??tesla-redesign section-experience Figma ?�동�?(PC)

**?�플�?** `tesla-redesign` · **범위:** section-experience · PC only  
**기�?:** Figma `79:2266` · MCP JSON · `50-qa-checklist.mdc`  
**결과:** **구현 ?�료 ???�용??브라?��? ?�인 ?��?*

| # | ??�� | 결과 |
|---|------|------|
| 1 | ?�션 1920×800 ?�블리??| PASS (코드) |
| 2 | ?�버?�이 rgba(0,0,0,0.3) | PASS (코드) |
| 3 | ?�?��? 42/700 · ?�명 24/500 · gap 16/64 | PASS (코드) |
| 4 | CTA outline 2px r · 18/500 · hover fill | PASS (코드) |
| 5 | 모바??@768 | 보류 |

**?�음:** ?�용??PASS ??footer ?�는 ?�체 QA

---

## 2026-06-08 ??tesla-redesign models~footer Figma ?�동�?(PC)

**?�플�?** `tesla-redesign` · **범위:** models · fsd-row · charging-slider · experience · footer (header/hero ?�외)  
**기�?:** Figma MCP fresh · `50-qa-checklist.mdc`  
**결과:** **구현 ?�료 ???�용??브라?��? ?�인 ?��?*

| # | ??�� | 결과 |
|---|------|------|
| 1 | models 가�?카드 830×551 · ?��? · ??배경 · CTA 2�?| PASS (코드) |
| 2 | fsd-row 960×430 2??· CTA �?1�?| PASS (코드) |
| 3 | charging-slider 3-slide fade · 6s auto · hover pause | PASS (코드) |
| 4 | experience 1920×800 ?�블리??· CTA 1�?| PASS (코드) |
| 5 | footer ?��? nav/legal | PASS (코드) |
| 6 | `#technology` ?�거 · pin-scroll JS ?�거 | PASS (코드) |
| 7 | 모바??@768 | 보류 |

**?�음:** ?�용??PASS ??PC 메인 ?�체 QA

---

## 2026-06-08 ??tesla-redesign ?�터?�션 3�?(PC)

**?�플�?** `tesla-redesign` · **범위:** scroll-reveal · hero-progress-slider · button-text-slide-hover · PC only  
**기�?:** `46-interaction-presets.mdc` · mainstream/smile-clinic 참조 ?�턴  
**결과:** **구현 ?�료 ???�용??브라?��? ?�인 ?��?*

| # | ??�� | 결과 |
|---|------|------|
| 1 | hero 3?�라?�드 fade · 6s progress · loop · arrow · hover pause | PASS (코드) |
| 2 | splash 종료 ??slider 부??· video play/pause | PASS (코드) |
| 3 | scroll-reveal 5?��?· IO queue · reduced-motion | PASS (코드) |
| 4 | btn-slide-hover CTA · fine pointer only | PASS (코드) |
| 5 | preset ?�한·중복 ?�음 (hover-tone 병용) | PASS (코드) |
| 6 | 모바??@768 | 보류 |

**?�음:** ?�용??PASS ??PC 메인 ?�체 QA

---

## 2026-06-08 ??tesla-redesign footer (PC)

**?�플�?** `tesla-redesign` · **범위:** footer · PC only  
**기�?:** Figma `26:3` · MCP JSON  
**결과:** **구현 ?�료 ???�용??브라?��? ?�인 ?��?*

| # | ??�� | 결과 |
|---|------|------|
| 1 | BG `#0d0d0d` · main pad 64/240 | PASS |
| 2 | 로고 221×44 · desc 13/400 `#6b6b6b` | PASS |
| 3 | nav 4??· title 11/600 · link 14/400 `#aaa` | PASS |
| 4 | divider `#2a2a2a` · copyright/legal 12/400 | PASS |
| 5 | 모바??@768 | 보류 |

**?�음:** ?�용??PASS ??PC 메인 ?�체 QA

---

## 2026-06-08 ??tesla-redesign section-experience (PC)

**?�플�?** `tesla-redesign` · **범위:** section-experience · PC only  
**기�?:** Figma `10:423` · MCP JSON  
**결과:** **구현 ?�료 ???�용??브라?��? ?�인 ?��?*

| # | ??�� | 결과 |
|---|------|------|
| 1 | BG `#1b1d1d` · pad 80/240 | PASS |
| 2 | 카드 1440×460 r16 · `experience-content.jpg` cover | PASS |
| 3 | overlay 60% · 중앙 카피 `#f0f0f0` | PASS |
| 4 | title 68/700 UPPER · desc 22/500 · CTA hero btn ?�턴 | PASS |
| 5 | 모바??@768 | 보류 |

**?�음:** ?�용??PASS ??footer

---

## 2026-06-08 ??tesla-redesign section-technology (PC)

**?�플�?** `tesla-redesign` · **범위:** section-technology · PC only  
**기�?:** Figma `23:732` · MCP JSON  
**결과:** **구현 ?�료 ???�용??브라?��? ?�인 ?��?*

| # | ??�� | 결과 |
|---|------|------|
| 1 | BG `#1b1d1d` · pad 80/240 | PASS |
| 2 | ?�?��? 52/700 · 카드 708×352 r16 | PASS |
| 3 | 3카드 가�??�크�?· gap 24 | PASS |
| 4 | 카피·줄내�?Figma ?�치(?�동 `\n` ?�음) | PASS |
| 5 | 모바??@768 | 보류 |

**?�음:** ?�용??PASS ??section-experience

---

## 2026-06-08 ??tesla-redesign section-charging (PC)

**?�플�?** `tesla-redesign` · **범위:** section-charging · PC only  
**기�?:** Figma `10:375` · MCP JSON  
**결과:** **구현 ?�료 ???�용??브라?��? ?�인 ?��?*

| # | ??�� | 결과 |
|---|------|------|
| 1 | 750px full-bleed · `section-charging.jpg` | PASS |
| 2 | overlay 60% · 중앙 카피 `#f0f0f0` | PASS |
| 3 | desc 3�?Figma `\n` ??`<br>` | PASS |
| 4 | Find Charging / Learn More CTA | PASS |
| 5 | 모바??@768 | 보류 |

**?�음:** ?�용??PASS ??section-technology

---

## 2026-06-08 ??tesla-redesign section-fsd (PC)

**?�플�?** `tesla-redesign` · **범위:** section-fsd · PC only  
**기�?:** Figma `10:363` · MCP JSON  
**결과:** **구현 ?�료 ???�용??브라?��? ?�인 ?��?*

| # | ??�� | 결과 |
|---|------|------|
| 1 | 750px full-bleed · `section-fsd.jpg` cover | PASS |
| 2 | overlay `#1b1d1d` 60% | PASS |
| 3 | ?�?��?·본문 `#f0f0f0` · 중앙 ?�렬 | PASS |
| 4 | CTA Explorer FSD / View Safity · hero btn ?�턴 | PASS |
| 5 | 모바??@768 | 보류 |

**?�음:** ?�용??PASS ??section-charging

---

## 2026-06-08 ??tesla-redesign section-models (PC)

**?�플�?** `tesla-redesign` · **범위:** section-models · PC only  
**기�?:** Figma `10:432` · MCP JSON  
**결과:** **구현 ?�료 ???�용??브라?��? ?�인 ?��?*

| # | ??�� | 결과 |
|---|------|------|
| 1 | ?�션 BG `#1b1d1d` · pad 90/240 | PASS (MCP) |
| 2 | ?�?��? 52/700 · 링크 18/500 `#f0f0f0` | PASS |
| 3 | 2×2 grid gap 24/26 · card 707×652 r16 | PASS |
| 4 | 카드 ?��?지 4�?· ?�단 gradient · CTA | PASS |
| 5 | 모바??@768 | 보류 |

**?�음:** ?�용??PASS ??section-fsd

---

## 2026-06-08 ??tesla-redesign section-nav · section-hero (PC)

**?�플�?** `tesla-redesign` · **범위:** header · hero · PC only  
**기�?:** Figma `portfolio_tesla_main` `23:866` · `1:244` · MCP JSON  
**결과:** **구현 ?�료 ???�용??브라?��? ?�인 ?��?*

| # | ??�� | 결과 |
|---|------|------|
| 1 | nav 93px · #1b1d1d · 로고 221 중앙 · ?�버�?48 ?�측 | PASS (MCP ?��? |
| 2 | hero 800px · video `assets/videos/hero-bg.mp4` cover | PASS |
| 3 | title/subtitle 카피·?�?�포 clamp | PASS |
| 4 | CTA Order Now / Demo Drive · radius 6 · secondary 20% white | PASS |
| 5 | scroll prev/next ?�이�?52px 좌우 | PASS |
| 6 | 모바??@768 | 보류 (decision-log) |

**?�음:** ?�용??PASS ??section-models

---

## 2026-06-09 ??smile-clinic 모바??@768 최종 ?�식

**?�플�?** `smile-clinic` · **범위:** 메인 + ?�브 3?�이지 · `style.css` @768 · `main.js`  
**기�?:** `index-mobile.html` / `about-*-mobile.html` ?�용??PASS ?�정�? 
**결과:** **PASS** (코드·구조 ?��????�브?�우?� 768px ?�인 권장)

| # | ??�� | 결과 |
|---|------|------|
| 1 | mobile.css ??style.css @768 병합 | PASS |
| 2 | mobile.js ??main.js ?�합 | PASS |
| 3 | 모바??nav · ?�라?�더 · team picker HTML | PASS |
| 4 | PC 마크???��? (?�??블록 show/hide) | PASS |

**?�음:** ?�기기·DevTools 768px QA · ?�품 ???�체 QA

---

## 2026-06-09 ??smile-clinic 모바??header · hero · signature

**?�플�?** `smile-clinic` · **?�일:** `index-mobile.html` · `css/mobile.css`  
**검??** ?�용??PASS (?�?�포 가?�드 `37:2249` ?�용�?  
**결과:** **PASS**

| # | ??�� | 결과 |
|---|------|------|
| 1 | header drawer · ?�버�?| PASS |
| 2 | hero 560px · ?�?�포 `--mo-fs-*` | PASS |
| 3 | signature head · slider · more | PASS |
| 4 | ?�?�포 기�?�?decision-log ?�정 | PASS |

**?�음:** strength ?�후 ?�션 ?�일 `--mo-*` 기�??�로 `index-mobile.html` 추�? ??PASS ??`@768` ?�식

---

## 2026-06-08 ??smile-clinic preset `scroll-reveal`

**?�플�?** `smile-clinic` · **?�션:** hero · signature · strength · process · reservation  
**검?�자:** Cursor Agent  
**결과:** **PASS** (코드·규칙 ?��?

| # | ??�� | 결과 |
|---|------|------|
| 1 | preset ID = ?�용???�인 `scroll-reveal` | PASS |
| 2 | ?�션??scroll 계열 1�?(typing/slider 중복 ?�음) | PASS |
| 3 | signature 카드 track transform�?scroll-reveal 미중�?| PASS |
| 4 | `prefers-reduced-motion` ??즉시 `is-revealed` | PASS |
| 5 | header/footer 미적??| PASS |
| 6 | `html.js` + no-JS fallback(콘텐�?가?? | PASS |

**비고:** ?�브?�우?� ?�크�??�인?� ?�이지 QA ???��?.

---

## 2026-06-04 ??구조 리셋 QA

**?�??** Imweb ?�용 ?�네??구조 리셋 (setup)  
**검?�자:** Cursor Agent  
**결과:** **PASS**

### 검????��

| # | ??�� | 결과 | 비고 |
|---|------|------|------|
| 1 | `.cursor/rules` 9�?존재 | PASS | 00~60 + 55-git-workflow |
| 2 | `_modules` ?�거 | PASS | ?�더 ?�음 |
| 3 | `_tokens` ?�거 | PASS | ?�더 ?�음 |
| 4 | `_delivery/cafe24` ?�거 | PASS | ?�더 ?�음 |
| 5 | `_delivery/imweb` ?��? | PASS | `.gitkeep` 존재 |
| 6 | `templates/template-c` ?��? | PASS | *(?�후 legacy ?�동 ???�래 QA 참고)* |
| 7 | legacy ?�동 ?�인 | PASS | `_docs/legacy/` ?�위??AGENTS·cursorrules·template-a/b·_common·_imgs·체크리스??|
| 8 | push 금�? 규칙 | PASS | `00-core.mdc`, `55-git-workflow.mdc`??명시 |
| 9 | `start.bat` / `package.json` 미수??| PASS | 리셋 범위 준??|

### FAIL ??��
?�음

### 비고
- `start.bat`???�직 `template-a` 경로 ??별도 ?�업?�서 ?�정 ?�정

---

## 2026-06-04 ??docs 본문 ?�리 QA

**?�??** `_docs/*.md` 4�?본문 ?�성  
**검?�자:** Cursor Agent  
**결과:** **PASS**

### 검????��

| # | ??�� | 결과 |
|---|------|------|
| 1 | 4�?문서 placeholder ?�거·본문 ?�성 | PASS |
| 2 | Cafe24·`_modules`·`_tokens` ?�급 ?�음 | PASS |
| 3 | ?�립 ?�성???�플�?기�? ?��? | PASS |
| 4 | `.cursor/rules`?� 충돌 ?�음 (docs=?�람?? rules=Cursor?? | PASS |
| 5 | `template-c` / `package.json` / `start.bat` 미수??| PASS |
| 6 | 문서 �?breakpoint(768)·clamp·?�품 경로 ?�치 | PASS |

### FAIL ??��
?�음

---

## 2026-06-04 ??Figma ?�레?�명 slug 규칙 QA

**?�??** rules·docs·logs Figma ?�레?�명 기반 ?�플�??�성 규칙 반영  
**검?�자:** Cursor Agent  
**결과:** **PASS**

### 검????��

| # | ??�� | 결과 |
|---|------|------|
| 1 | `10-project-structure.mdc` slug ?�규?�·승??규칙 | PASS |
| 2 | `30-figma-to-code.mdc` MCP ?�레?�명·?�션 보고 | PASS |
| 3 | `_docs` 2�?문서 반영·rules?� ?�치 | PASS |
| 4 | `decision-log`·`change-log` 기록 | PASS |
| 5 | `template-c`·`start.bat` 미수??| PASS | *(?�후 template-c legacy ?�동)* |
| 6 | ?�시(`ontheblue`, `claire-clinic`) ?�확 | PASS |

### FAIL ??��
?�음

---

## 2026-06-04 ??template-c legacy ?�동 QA

**?�??** `templates/template-c` ??`_docs/legacy/templates/template-c`  
**검?�자:** Cursor Agent  
**결과:** **PASS**

### 검????��

| # | ??�� | 결과 |
|---|------|------|
| 1 | `templates/template-c/` ?�음 | PASS |
| 2 | `_docs/legacy/templates/template-c/` 존재 | PASS |
| 3 | `templates/` 비어 ?�음 (`.gitkeep`�? | PASS |
| 4 | rules/docs/logs ?�재 기�? 반영 | PASS |
| 5 | `template-c` ?��? ?�일 ?�용 미수??| PASS |
| 6 | `start.bat` 미수??| PASS |

### FAIL ??��
?�음

---

## 2026-06-04 ??ontheblue ?�캐?�드 QA

**?�??** `templates/ontheblue/` 기본 구조 ?�성  
**검?�자:** Cursor Agent  
**결과:** **PASS**

### 검????��

| # | ??�� | 결과 |
|---|------|------|
| 1 | `templates/ontheblue/` ?�수 ?�일·?�더 존재 | PASS |
| 2 | Figma ?�션 미구??(골격�? | PASS |
| 3 | `header`/GNB ?�음 | PASS |
| 4 | `:root` 1840px / gutter 40px | PASS |
| 5 | 공통 모듈·`_tokens`·Cafe24 ?�음 | PASS |
| 6 | `start.bat`·`package.json` 미수??| PASS |
| 7 | legacy `template-c` 미�?�?| PASS |

### FAIL ??��
?�음

---

## 2026-06-04 ??ontheblue hero ?�션 QA

**?�??** `templates/ontheblue/` · `hero` (`149:2964`)  
**검?�자:** Cursor Agent  
**결과:** **PASS** (?��?지 ?�일 export???�속)

### ?�션 ?�위 QA

| # | ??�� | 결과 |
|---|------|------|
| 1 | Figma padding/gap/font/color ?��?| PASS |
| 2 | 콘텐�?1840 / gutter 40 / KV ratio 1840:800 | PASS |
| 3 | `section--hero` · BEM · 좌측 ?�렬 | PASS |
| 4 | clamp · ?�스??height 고정 ?�음 | PASS |
| 5 | `@media 768px` 반영 | PASS |
| 6 | CTA·header·?�라?�더 ?�작 ?�음 (?�정) | PASS |
| 7 | ?�라???��????�음 | PASS |
| 8 | `hero-kv.jpg` 미존????fallback 배경·교체 가??구조 | PASS* |

### FAIL ??��
?�음

### 비고
- `hero-kv.jpg` 추�? ???�각 Figma ?��??�확??권장
- **?�용??PASS ??* `story-section` 착수 금�?

---

## 2026-06-08 ??mainstream ?�션 QA (?�급 · header~works)

**?�플�?** `mainstream`  
**검?�자:** Cursor Agent  
**배경:** 3?�션 ?�괄·관�?모드 종료 ??규칙?��?**?�션 QA·qa-log ?�급**  
**?�음 ?�션:** **faq** ??**�?qa-log PASS + ?�용??PASS ??* 착수

---

### header (`168:55`) ??**PASS**

| # | ??�� | 결과 | 비고 |
|---|------|------|------|
| 1 | pad/gap/font · fluid | PASS | nav gap 48 · 20/600 |
| 2 | text-align / align | PASS | GNB ?�측 · logo left |
| 3 | gap bbox | PASS | ??|
| 4 | Fluid 1920·2560+ | PASS | shell cap ?�음 |
| 5 | @1024 · @768 | PASS | ?�버�?· ?�치 44 |
| 6 | logo 117×104 | PASS | ?�정 반영 (2026-06-08) |

---

### hero (`149:2964`) ??**PASS**

| # | ??�� | 결과 | 비고 |
|---|------|------|------|
| 1 | pad/gap/font · fluid | PASS | ?�단 pad **40** (?�용???�인) · KV 1840×800 |
| 2 | text-align | PASS | copy **LEFT** |
| 3 | gap bbox | PASS | ??|
| 4 | Fluid 1920·2560+ | PASS | inner narrow 1440 only |
| 5 | @1024 · @768 | PASS | ??|
| 6 | ?�라?�더 | PASS* | ?�적 01/03 · JS 추후 |

---

### story (`146:1397`) ??**PASS**

| # | ??�� | 결과 | 비고 |
|---|------|------|------|
| 1 | pad/gap/font · fluid | PASS | pad 120/40 · cards 613×720 gap 1 |
| 2 | text-align | PASS | head **CENTER** · card body LEFT (?�정 반영) |
| 3 | gap bbox | PASS | list gap **1px** = bbox |
| 4 | Fluid 1920·2560+ | PASS | ??|
| 5 | @1024 · @768 | PASS | 1??stack |

**?�전 FAIL:** head 좌측 ?�렬 ??`failure-log` story align · 규칙 보강 · **?�정 ??PASS**

---

### stats (`146:1507`) ??**PASS**

| # | ??�� | 결과 | 비고 |
|---|------|------|------|
| 1 | pad/gap/font · fluid | PASS | pad 120/40 |
| 2 | text-align | PASS | head **CENTER** · stat **CENTER** |
| 3 | gap bbox | PASS | stat-list gap 0 |
| 4 | Fluid 1920·2560+ | PASS | visual inner 1530 clamp |
| 5 | bg split | PASS | blue/white @ visual center (?�정 반영) |
| 6 | @1024 · @768 | PASS | stat 2×2 · 1??|

---

### news (`146:1534`) ??**PASS**

| # | ??�� | 결과 | 비고 |
|---|------|------|------|
| 1 | pad/gap/font · fluid | PASS | bg opacity 12% |
| 2 | text-align | PASS | head CENTER · card LEFT |
| 3 | gap bbox | PASS | cards gap **1px** |
| 4 | Fluid 1920·2560+ | PASS | ??|
| 5 | @1024 · @768 | PASS | 1??· nav 44px |
| 6 | ?��?지 | PASS* | img scale 1.1 진단 �?· asset ?�백 ?�인??|

**보류:** news 카드 ?��?지 ?�이???�인 ??scale 1.1 ?�스??· **?�용???�인 ??* ?��?/?�거

---

### works (`147:2327`) ??**PASS**

| # | ??�� | 결과 | 비고 |
|---|------|------|------|
| 1 | pad/gap/font · fluid | PASS | gallery h 1097 · flex 959:294 |
| 2 | text-align | PASS | head CENTER · caption LEFT (active) |
| 3 | gap bbox | PASS | **gap 0** (itemSpacing 10 ??bbox · ?�정 반영) |
| 4 | Fluid 1920·2560+ | PASS | ??|
| 5 | @1024 · @768 | PASS | ?�로 stack |
| 6 | accordion JS | PASS | click ??is-active |

**?�전 FAIL:** gallery gap 10px ??bbox 0 · `failure-log` works gap · **?�정 ??PASS**

---

### mainstream header~works 종합

| 결과 | ?�션 |
|------|------|
| **PASS** | header · hero · story · stats · news · works |
| **보류** | news ?��?지 scale 1.1 (진단) |
| **?�음** | faq ??**?�용??PASS ??* 착수 |

---

## 2026-06-08 ??mainstream faq · cta · footer (?�괄 구현 + ?�션 QA)

**?�플�?** `mainstream` · **검??** Cursor Agent · **모드:** 3?�션 ?�괄 (?�션 QA 개별 기록)

### faq (`150:3002`) ??**PASS**

| # | ??�� | 결과 |
|---|------|------|
| 1 | pad 120/40 · title 48/800 **CENTER** | PASS |
| 2 | 3×2 grid · gap **1px** (bbox) | PASS |
| 3 | card **613×300** · pad 48/36 · mint/yellow | PASS (height **?�정** ??`min-height`??height` 고정) |
| 4 | Q 26/700 · A 20/500 **LEFT** | PASS |
| 5 | @1024 · @768 1??stack | PASS |

### cta (`149:2782`) ??**PASS**

| # | ??�� | 결과 |
|---|------|------|
| 1 | bg **1920 full-bleed** · pad top 90 · inner text pad 40 | PASS (좌우 section margin **?�거**) |
| 2 | title 44/700 white **CENTER** | PASS |
| 3 | btn white pill **218×79** · pad 20/43 · 24/700 black | PASS (radius **999** · height **79** ?�정) |
| 4 | @1024 · @768 | PASS |

### footer (`149:2917`) ??**FAIL ???�정** (2026-06-08 ?��???

| # | ??�� | 결과 |
|---|------|------|
| 1 | pad 90 · **???�서** logo+family **??* / info+SNS **?�래** | FAIL?�수??(기존 **??��**) |
| 2 | ?�스??간격 meta?�links **8** · links?�copy **36** · ??gap **70** | FAIL?�수??(기존 ?��? **36**) |
| 3 | SNS **?�단 ?�렬** · gap 16 · 64 circle · YT 34 / IG **28** | FAIL?�수??(기존 **?�단 ?�렬**) |
| 4 | family **220×52** · pad 12/16 · gap 75 · label **??�?* · **+** | PASS (label `flex-shrink:0` ?�정) |
| 5 | @1024 · @768 stack | PASS |

### mainstream ?�이지 ??**???�션 구현 ?�료**

- header~footer 9?�션 HTML/CSS 반영
- **?�품 ???�체 QA** (?�크롤·섹??간격·GNB) ???�용???�인 ?��?
### mainstream ??preset `scroll-reveal` (2026-06-08)

**범위:** story~cta ?�크�?진입 블록 · hero·header·footer **?�외**

| # | ??�� | 결과 |
|---|------|------|
| 1 | preset ID = ?�용???�인 `scroll-reveal` | PASS |
| 2 | 1???�생 · threshold ~12% · opacity + translateY(?�폭) | PASS |
| 3 | hero·header·footer 미적??| PASS ??**hero 개별 ?�용** (?�용???�청) |
| 4 | stats ?�자 ?�드(`__value`)??transform 미중�?| PASS (`.stats-item`�? |
| 5 | `prefers-reduced-motion` 즉시 ?�시 | PASS |
| 6 | JS ?�을 ??콘텐�??�시 (`.js` gate) | PASS |
| 7 | @768 ?�작 | PASS (코드?? |

**비고:** 브라?��? ?�크롤로 fade-up ?�인 ?�청.

### mainstream ??scroll-reveal 개별 ?�소 (2026-06-08)

| # | ??�� | 결과 |
|---|------|------|
| 1 | 그룹(wrapper) ?�거 · ?�?��?·본문·카드 ?�츠 개별 ?�용 | PASS |
| 2 | ?�션 진입 ??DOM ??stagger 60ms | PASS |
| 3 | header·footer 미적???��? | PASS |

### mainstream ??scroll-reveal hero (2026-06-08)

| # | ??�� | 결과 |
|---|------|------|
| 1 | ?�이브로 · ?�?��? · ?�브 · pager · progress 개별 | PASS |
| 2 | 로드 ??hero ?�차 ?�장 (stagger 60ms) | PASS |

---
