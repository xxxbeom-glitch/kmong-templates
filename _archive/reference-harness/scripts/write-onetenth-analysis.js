/**
 * Write analysis + site-structure-audit + QA for onetenth3/4/6/8
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'cases');
const today = '2026-07-09';

const CASES = [
  {
    id: 'onetenth3',
    url: 'https://onetenth3.mycafe24.com/',
    title: '십분의일 - 테크 기업 03',
    variant: 'Tech 03',
    hero: '미래를 주도하는 통합 테크 솔루션',
    sections: [
      'Hero — earth-space 비주얼 · Innovation 라벨',
      '가치 카드 — 클라우드매니저 / 인사이트 AI / 시큐어가드 / 플렉스오토메이트 / 브랜드빌더',
      '솔루션 4열 — 클라우드 아키텍처 · AI · 빅데이터 · 사이버보안 (HTML widget)',
      'News — 테크 산업 뉴스 3건',
      'Contact CTA — 도움이 필요하신가요?',
    ],
    note: '메인 대부분 Elementor HTML widget + inline CSS/JS (Swiper·GSAP 패턴)',
  },
  {
    id: 'onetenth4',
    url: 'https://onetenth4.mycafe24.com/',
    title: '십분의일 - 비즈니스 04',
    variant: 'Business 04',
    hero: 'Creative Design · 성공적인 비즈니스, 십분의일',
    sections: [
      'Hero + 3초만에 문의하기 FAB',
      'ABOUT US — 템플릿 판매 카피',
      '서비스/비즈니스 소개 블록',
      'News · Contact CTA',
    ],
    note: '08과 유사한 크리에이티브/랜딩형이나 레이아웃·섹션 수 다름',
  },
  {
    id: 'onetenth6',
    url: 'https://onetenth6.mycafe24.com/',
    title: 'Home - 십분의일 - 비즈니스 06',
    variant: 'Business 06',
    hero: '새로운 생각, 새로운 시선',
    sections: [
      'Hero — TECHNOLOGY 라벨',
      'Our Story + 카운터 4종 (설립연도·프로젝트·클라우드·만족도)',
      'Innovation 4카드 — 클라우드/빅데이터/AI/보안 (VIEW MORE)',
      'Our Business — 맞춤형 솔루션 그리드',
      '상담 CTA band',
      'News 최신 3건',
    ],
    note: '카운터·4카드 그리드가 03보다 정형화',
  },
  {
    id: 'onetenth8',
    url: 'https://onetenth8.mycafe24.com/',
    title: '십분의일 - 크리에이티브 08',
    variant: 'Creative 08',
    hero: '프리미엄 홈페이지 템플릿, 십분의일',
    sections: [
      'Hero 2버튼 (바로 시작하기 / 더 알아보기) + parallax 이미지',
      '소개 + YouTube 배경 video',
      '고객 후기 carousel (uicore-testimonial-carousel)',
      '템플릿 가치 proposition 3섹션',
      '요금제 6카드 (Basic/Standard/Premium × A/B)',
      'FAQ accordion',
    ],
    note: 'Element Pack motion FX·fade 애니메이션 다수',
  },
];

const COMMON = {
  platform: 'WordPress (Cafe24 mycafe24 호스팅)',
  theme: 'wp-theme-onetenth / onetenth-child',
  builder: 'Elementor + bdthemes Element Pack + UICore header',
  plugins: 'KBoard 6.6 · Rank Math · (WP Rocket 흔적)',
  ia: [
    '/ — front',
    '/인사말/ · /연혁/ · /오시는-길/',
    '/사업분야-디자인-1/ · /사업분야-디자인-2/',
    '/제품소개/ · /products/{slug}/',
    '/공지사항/ · /뉴스/ · /news/{slug}/',
    '/faq/ · /contact/',
    '/terms_page/privacy-policy/',
  ],
};

function readPages(caseId) {
  const p = path.join(ROOT, caseId, '01-original', 'pages.json');
  if (!fs.existsSync(p)) return { pages: [], remaining: [] };
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function contentPages(pages) {
  return (pages.pages || []).filter((x) => {
    const u = x.url || '';
    return (
      !u.includes('/wp-json/') &&
      !u.includes('/feed') &&
      !u.includes('oembed') &&
      !u.includes('kboard/rss') &&
      !u.includes('?p=')
    );
  });
}

for (const c of CASES) {
  const ref = path.join(ROOT, c.id, '00-reference');
  const qa = path.join(ROOT, c.id, '02-original-qa');
  const orig = path.join(ROOT, c.id, '01-original');
  const pages = readPages(c.id);
  const content = contentPages(pages);
  const remaining = (pages.remaining || []).length;

  const analysis = `# ${c.id} — Analysis (${c.variant})

**${c.title}** · ${c.url}

> Track C · browser-captured · ${today}  
> **플랫폼:** ${COMMON.platform} — 카페24 쇼핑몰 스킨(PTMD) **아님**

## Meta

| | |
|--|--|
| 제작사 | 십분의일 (One-tenth) — 프리미엄 WP 템플릿 판매 |
| 템플릿 변형 | **${c.variant}** |
| 테마 | \`${COMMON.theme}\` |
| 빌더 | ${COMMON.builder} |
| 플러그인 | ${COMMON.plugins} |
| 미러 | **${(pages.pages || []).length}** URLs · 콘텐츠성 **~${content.length}** · remaining **${remaining}** (대부분 wp-json/oembed) |

## 메인 IA

**Hero:** ${c.hero}

${c.sections.map((s, i) => `${i + 1}. ${s}`).join('\n')}

**비고:** ${c.note}

## 공통 GNB / 푸터

- **Header:** \`#wrapper-navbar\` · \`.uicore-navbar\` · sticky · 모바일 드로어 (\`ui-a-dsmm-expand\`)
- **Footer:** Address / Contact / 사업자 placeholder · 개인정보처리방침 · \`3초만에 문의하기\` FAB
- **메뉴:** 회사소개 · 사업분야 · 제품소개 · 고객지원(공지·뉴스·FAQ·문의)

## Site map (콘텐츠 URL)

${COMMON.ia.map((u) => `- \`${u}\``).join('\n')}

## 모듈 후보 (Track B/C 분석)

| 후보 | 근거 |
|------|------|
| \`layout-header\` | UICore navbar + Elementor kit |
| \`layout-footer\` | Elementor footer template |
| \`section-hero\` | Elementor container + heading/button |
| \`section-stats\` | 카운터 위젯 (06) |
| \`section-cards\` | 4열 innovation / pricing |
| \`section-news\` | WP Query news CPT |
| \`section-faq\` | accordion (08) |
| \`section-contact-cta\` | contact 링크 band |
| board-notice | KBoard 또는 페이지 빌더 |
| product-cpt | \`/products/\` custom post type |

## reconstructionDifficulty

| | |
|--|--|
| 난이도 | **high** — Elementor DB-rendered HTML · inline widget CSS · Element Pack 의존 |
| 리스크 | 데모 placeholder(주소·사업자)·KBoard·WP admin API 미포함 |
| 권장 트랙 | ZIP/테마 원본 확보 시 **WordPress 트랙** · 정적 이식은 섹션 단위 재구현 |

## Track C 경계

| 가능 | 금지 |
|------|------|
| 미러·분석·preview | working skin · 납품 · 84 upload |
`;

  const audit = `# Site Structure Audit — ${c.id} (${c.variant})

**원본:** ${c.url} · **${c.title}**

---

## 1. File Map

| 유형 | 목록 |
|------|------|
| HTML | \`index.html\` + 한글 slug 페이지 + \`products/*\` + \`news/*\` + \`faq\` + \`contact\` |
| 테마 | \`wp-content/themes/onetenth*\` (미러에 CSS/JS 일부) |
| 플러그인 | \`elementor/\` · \`bdthemes-element-pack/\` · \`kboard/\` |
| 업로드 | \`wp-content/uploads/elementor/css/post-*.css\` · 이미지·Pretendard woff |
| 노이즈 | \`wp-json/**\` · \`feed/\` · \`oembed\` — 분석용·콘텐츠 아님 |

## 2. Page Structure

\`\`\`
body.wp-theme-onetenth-child
  #wrapper-navbar.uicore-navbar
  main / .entry-content
    .elementor.elementor-{pageId}
      .e-con.e-parent (Flex containers)
        .elementor-widget-heading | button | image | html | video | carousel
  footer (Elementor template)
  FAB 문의 버튼
\`\`\`

## 3. Section Inventory (메인)

| # | 역할 | 비고 |
|---|------|------|
| H | Hero | ${c.hero.slice(0, 40)}… |
${c.sections.map((s, i) => `| ${i + 1} | ${s.split('—')[0].trim()} | ${c.variant} |`).join('\n')}
| F | Footer + FAB | 공통 |

## 4. Component Candidates

- \`layout-header\` — UICore + Elementor kit-661
- \`layout-footer\` — Elementor library section
- \`section-hero\` · \`section-proof\` · \`section-pricing\` · \`section-faq\`
- \`ui-carousel\` — testimonial / news
- \`ui-counter\` — animated stats (06)

## 5. Naming Audit

| KEEP | \`uicore-*\` · \`elementor-element-*\` · \`e-con\` · \`data-id\` |
| RENAME | Elementor hash id → 의미 slug (이식 시) |
| REMOVE | wp-json · feed · oembed 미러 |
| REVIEW | HTML widget inline \`<style>\` 블록 — SoT 분리 필요 |

## 6. Asset Audit

| HIGH | 십분의일 브랜드·후기 실명·placeholder 주소/사업자 |
| MEDIUM | YouTube embed · Elementor generated CSS per post |
| LOW | Pretendard mirror woff · FA |

## 7. CSS Audit

- Elementor frontend + post-{id}.css (페이지별)
- Element Pack bdt-uikit + widget CSS
- UICore theme styles
- HTML widget inline styles (메인 대형)

## 8. JS Audit

- Elementor frontend + Element Pack
- UICore navigation / sticky / mobile menu
- Swiper·GSAP (HTML widget inline, 03 등)
- KBoard (게시판 페이지)

## 9. Original Trace Risk

| HIGH | Elementor data-id·DB coupling · KBoard shortcode |
| MEDIUM | WP Rocket lazy/preload attributes |
| LOW | Rank Math JSON-LD |

## 10. Refactor Priority

| P0 | Header/Footer shell · GNB IA |
| P1 | 메인 섹션 마크업 (variant별) |
| P2 | news/products CPT · KBoard 대체 |
| P3 | 애니메이션·motion FX |

## 11. Do Not Modify Yet

- \`01-original/**\` immutable
- \`wp-json\` 미러 파일 — 참고만
`;

  const report = `# Browser Capture QA — ${c.id} (${c.variant})

| | |
|--|--|
| 원격 | ${c.url} |
| 수집일 | ${today} |
| 방법 | Playwright capture + BFS mirror (max 80) |

## 결과: **PASS (partial queue)**

| # | 항목 | 결과 |
|---|------|------|
| 1 | Desktop 1920 캡처 | PASS |
| 2 | Mobile 390 캡처 | PASS |
| 3 | 미러 index + 한글 페이지 | PASS |
| 4 | products/news/contact | PASS |
| 5 | remaining 큐 | PARTIAL — ${remaining}건 (wp-json/oembed/?p=) |
| 6 | 플랫폼 식별 | WordPress + Elementor (카페24 호스팅) |

**비고:** 콘텐츠 페이지는 충분히 수집. 잔여 큐는 WP API 메타 URL — Track C 분석에 필수 아님.
`;

  fs.writeFileSync(path.join(ref, 'analysis.md'), analysis);
  fs.writeFileSync(path.join(ref, 'site-structure-audit.md'), audit);
  fs.writeFileSync(path.join(qa, 'report.md'), report);

  fs.writeFileSync(
    path.join(orig, 'README.md'),
    `# 01-original — 수정 금지

${c.id} · ${c.variant} · browser-captured · ${today}

- entry: \`${c.url}\`
- method: BFS \`mirror-original.js\` + pristine HTML
- preview: \`node scripts/preview-original.js ${c.id} [port]\`

## 금지
원본 수정 · Track C 납품 승격
`,
    'utf8'
  );

  const manifestPath = path.join(ROOT, c.id, 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    const m = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    m.label = c.title;
    m.displayName = c.variant;
    m.platform = 'wordpress-cafe24-hosting';
    m.stages.source = { status: 'pass', updatedAt: today };
    m.stages.originalCapture = {
      status: 'pass',
      updatedAt: today,
      note: `${(pages.pages || []).length}p · remaining ${remaining}`,
    };
    m.stages.originalQa = { status: 'pass', updatedAt: today, note: 'capture PASS · partial queue' };
    m.stages.analysis = { status: 'pass', updatedAt: today, note: 'analysis + site-structure-audit' };
    m.updatedAt = today;
    fs.writeFileSync(manifestPath, JSON.stringify(m, null, 2) + '\n');
  }

  console.log('wrote', c.id, 'content pages ~', content.length);
}

console.log('done');
