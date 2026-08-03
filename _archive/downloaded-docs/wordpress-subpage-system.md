# 워드프레스 서브페이지 템플릿 시스템
> 중소기업 사이트 기준. 공통 쉘 + 콘텐츠 블록 조립 방식.

---

## 1. 서브페이지 전체 유형 맵

```
회사소개
├── 인사말 / CEO 메시지
├── 회사 연혁
├── 비전 / 미션 / 핵심가치
├── 조직도
└── 오시는길

사업분야 / 서비스
├── 서비스 목록
└── 서비스 상세

제품
├── 제품 목록 (카탈로그)
└── 제품 상세

실적 / 포트폴리오
├── 시공사례 / 납품실적
├── 파트너사 / 협력사
└── 인증 / 수상

고객지원
├── 공지사항
├── FAQ
├── 자료실 (다운로드)
└── 문의하기

인재채용
├── 채용공고
└── 복리후생 / 회사 문화
```

---

## 2. 공통 쉘 (모든 서브페이지 동일)

```php
/* 구조 */
get_header();
  sub_hero();        // 서브 히어로 (타이틀 + 브레드크럼)
  tab_nav();         // 탭 네비 (해당 카테고리에 여러 페이지 있을 때만)
  // 콘텐츠 영역 (유형별 다름)
  cta_section();     // 하단 CTA 고정
get_footer();
```

### 서브 히어로 세부 옵션

```
[타입 A] 배경 단색 + 페이지 타이틀 + 브레드크럼          ← 기본
[타입 B] 배경 이미지 + 오버레이 + 페이지 타이틀          ← 임팩트
[타입 C] 배경 그라디언트 + 타이틀 + 서브텍스트           ← 세련됨
[타입 D] 미니멀 (타이틀만, 배경 없음)                    ← 깔끔함
```

ACF로 페이지마다 타입 선택 가능하게 만든다.

---

## 3. 콘텐츠 블록 전체 목록

### 3-1. 텍스트 계열

```
text-full          제목 + 본문 (1단)
text-2col          텍스트 2컬럼 분할
text-3col          텍스트 3컬럼 분할
text-highlight     강조 인용구 / 풀컬러 배경 텍스트
text-ceo           CEO 사진 + 인사말 (서명 포함)
```

### 3-2. 이미지 계열

```
image-text-left    이미지 좌 + 텍스트 우
image-text-right   이미지 우 + 텍스트 좌
image-full         풀와이드 이미지 (캡션 선택)
image-grid-2       이미지 2컬럼 그리드
image-grid-3       이미지 3컬럼 그리드
image-grid-4       이미지 4컬럼 그리드 + 라이트박스
image-masonry      마소나리 갤러리 + 라이트박스
image-before-after 비포/애프터 슬라이더
image-slider       이미지 슬라이더 (Swiper)
image-cert         인증서 / 수상 이미지 그리드
```

### 3-3. 영상 계열

```
video-embed        유튜브 / 비메오 임베드
video-bg           영상 배경 섹션 (음소거 자동재생)
video-popup        썸네일 클릭 → 팝업 재생
```

### 3-4. 데이터 / 정보 계열

```
stats-count        카운트업 숫자 통계 (4~6개)
timeline-vertical  세로 타임라인 (연혁)
timeline-horizontal 가로 타임라인 (프로세스)
process-steps      단계별 프로세스 (번호 + 아이콘)
compare-table      비교 테이블 (서비스/스펙)
price-table        가격표 (2~3 플랜)
accordion-faq      아코디언 FAQ
tab-content        탭 전환 콘텐츠
```

### 3-5. 카드 계열

```
card-grid-2        카드 2컬럼
card-grid-3        카드 3컬럼 (서비스 목록 기본)
card-grid-4        카드 4컬럼
card-team          팀원 카드 (사진 + 이름 + 직책)
card-partner       파트너사 로고 그리드 (컬러/흑백)
card-logo-slider   파트너사 로고 무한 슬라이더
card-download      다운로드 자료 카드 (파일 아이콘 + 제목)
```

### 3-6. 게시판 계열

```
board-list         게시글 목록 (제목 + 날짜 + 카테고리)
board-single       게시글 상세
board-search       검색 필터
board-pagination   페이지네이션
board-notice       공지 배지 + 목록
```

### 3-7. 문의 / 연락 계열

```
contact-form       Contact Form 7 래퍼 (스타일 적용)
contact-info       연락처 정보 블록 (전화 + 이메일 + 주소)
contact-map        네이버 지도 임베드
contact-kakao      카카오톡 채널 버튼
contact-combo      폼 + 지도 2단 배치 (문의 페이지 기본)
```

### 3-8. CTA 계열

```
cta-inline         섹션 중간 삽입형 CTA 배너
cta-full           풀와이드 CTA (배경색 전환)
cta-float          우하단 플로팅 버튼 (카카오 + 전화)
cta-sticky-bar     하단 고정 바 (모바일 전용)
```

---

## 4. 페이지별 블록 조합

### 인사말 / CEO 메시지
```
sub-hero (타입 A)
text-ceo
text-highlight
cta-full
```

### 회사 연혁
```
sub-hero (타입 A)
stats-count
timeline-vertical
image-grid-3
cta-full
```

### 서비스 목록
```
sub-hero (타입 B)
card-grid-3
process-steps
cta-full
```

### 서비스 상세
```
sub-hero (타입 B)
image-text-left
text-3col
image-grid-3
compare-table
cta-full
```

### 시공사례 / 포트폴리오
```
sub-hero (타입 A)
[필터 탭]
image-masonry (라이트박스)
board-pagination
cta-full
```

### 공지사항
```
sub-hero (타입 A)
board-notice
board-list
board-pagination
```

### FAQ
```
sub-hero (타입 A)
[카테고리 탭]
accordion-faq
cta-inline
```

### 자료실
```
sub-hero (타입 A)
board-search
card-download
board-pagination
```

### 문의하기
```
sub-hero (타입 A)
contact-combo (폼 + 지도)
contact-info
contact-kakao
```

### 채용공고
```
sub-hero (타입 B)
card-grid-3 (복리후생)
board-notice (채용 중인 공고)
board-list
contact-form (지원서 폼)
```

---

## 5. 워드프레스 파일 구조

```
theme/
  template-parts/
    common/
      sub-hero.php
      tab-nav.php
      breadcrumb.php
      cta-section.php
      cta-float.php
      cta-sticky-bar.php
    blocks/
      text/
        text-full.php
        text-2col.php
        text-3col.php
        text-highlight.php
        text-ceo.php
      image/
        image-text-left.php
        image-text-right.php
        image-full.php
        image-grid-2.php
        image-grid-3.php
        image-grid-4.php
        image-masonry.php
        image-before-after.php
        image-slider.php
        image-cert.php
      video/
        video-embed.php
        video-bg.php
        video-popup.php
      data/
        stats-count.php
        timeline-vertical.php
        timeline-horizontal.php
        process-steps.php
        compare-table.php
        price-table.php
        accordion-faq.php
        tab-content.php
      card/
        card-grid-2.php
        card-grid-3.php
        card-grid-4.php
        card-team.php
        card-partner.php
        card-logo-slider.php
        card-download.php
      board/
        board-list.php
        board-single.php
        board-search.php
        board-pagination.php
        board-notice.php
      contact/
        contact-form.php
        contact-info.php
        contact-map.php
        contact-kakao.php
        contact-combo.php
  page-templates/
    page-about.php
    page-history.php
    page-service-list.php
    page-service-single.php
    page-portfolio.php
    page-notice.php
    page-faq.php
    page-download.php
    page-contact.php
    page-recruit.php
  single/
    single-portfolio.php
    single-service.php
    single-recruit.php
  archive/
    archive-portfolio.php
    archive-service.php
    archive-recruit.php
```

---

## 6. Custom Post Type (CPT) 설계

```php
/* functions.php에 등록 */

portfolio   시공사례 / 납품실적
  └── taxonomy: portfolio_cat (업종별 분류)
  └── ACF: 프로젝트명, 고객사, 완료년도, 사용기술, 이미지갤러리

service     서비스
  └── taxonomy: service_cat (서비스 유형)
  └── ACF: 서비스명, 요약, 상세내용, 대표이미지, 특징3개

team        팀원
  └── ACF: 이름, 직책, 소개, 사진, SNS링크

partner     파트너사
  └── taxonomy: partner_cat (파트너 유형)
  └── ACF: 회사명, 로고, 링크

recruit     채용공고
  └── taxonomy: recruit_cat (직군)
  └── ACF: 포지션, 고용형태, 마감일, 상세내용
  └── 상태: 모집중 / 마감
```

---

## 7. ACF 필드 그룹 설계

### 서브 히어로 옵션 (모든 페이지 공통)
```
sub_hero_type        select (A/B/C/D)
sub_hero_bg_color    color picker
sub_hero_bg_image    image
sub_hero_subtitle    text
```

### 페이지 하단 CTA 옵션
```
cta_use             true/false
cta_title           text
cta_subtitle        text
cta_button_text     text
cta_button_url      url
cta_bg_color        color picker
```

---

## 8. 워드프레스 템플릿 계층구조

```
page.php              기본 페이지
page-{slug}.php       특정 슬러그 페이지
single.php            포스트 상세 기본
single-{cpt}.php      CPT 상세 (portfolio, service 등)
archive.php           목록 기본
archive-{cpt}.php     CPT 목록
taxonomy.php          분류 목록
404.php               404 에러
search.php            검색 결과
```

---

## 9. SEO 설계

### 페이지별 필수 메타

```
title:        페이지명 | 회사명
description:  페이지 핵심 내용 2줄 이내
og:image:     대표 이미지 (1200x630)
canonical:    중복 페이지 처리
```

### Schema Markup (Yoast로 자동 + 수동 보완)

```
LocalBusiness    회사소개 페이지
BreadcrumbList   모든 서브페이지
FAQPage          FAQ 페이지
JobPosting       채용공고 페이지
```

---

## 10. 성능 체크리스트

```
□ 이미지 전부 WebP (Smush 자동 변환)
□ Lazy load 적용
□ 게시판 페이지 캐시 설정 (W3 Total Cache)
□ 갤러리 이미지 리사이즈 (썸네일 사이즈 사전 정의)
□ 영상 임베드는 Lite YouTube Embed 방식
□ 지도 임베드는 클릭 후 로드 방식 (초기 로딩 영향 없게)
□ Contact Form 7 JS/CSS 필요한 페이지에만 로드
```

---

## 11. 커서 지침 추가 항목

```
/cursor-rules/wordpress/
  theme-structure.md    ← 파일 구조 전체 (§5 기반)
  cpt.md                ← CPT + ACF 설계 (§6,7 기반)
  template-hierarchy.md ← 템플릿 계층 (§8 기반)
  blocks/
    block-list.md       ← 블록 전체 목록 + 용도 (§3 기반)
    block-combos.md     ← 페이지별 조합 (§4 기반)
  seo.md                ← SEO 설계 (§9 기반)
  performance.md        ← 성능 체크리스트 (§10 기반)
```

---

## 12. 신규 프로젝트 시작 체크리스트 (서브페이지)

```
□ 필요한 서브페이지 목록 확정 (클라이언트와 협의)
□ 각 페이지 블록 조합 결정
□ CPT 필요 여부 확인 (포트폴리오, 채용 등)
□ 게시판 필요 여부 + 종류 확인
□ 문의 폼 수신 이메일 확인
□ 네이버 지도 API 키 발급 (오시는길 있을 때)
□ 서브 히어로 타입 각 페이지별 결정
□ 하단 CTA 문구 확정
```
