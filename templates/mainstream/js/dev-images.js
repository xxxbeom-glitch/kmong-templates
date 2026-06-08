/**
 * mainstream · 개발용 로컬 이미지 (hero · 카드 `<img>` 만)
 *
 * ★ _dev-images/landscape · portrait — raw 파일명
 * ★ sync: node _dev-images/sync-manifest.js
 * ★ 섹션 장식 배경(news-bg, cta-bg 등 ::before) → assets/images/ 만
 *
 * ★ 납품 전: enabled → false · 최종본 assets/images/
 */
var DEV_IMAGES = {
  enabled: true,
  root: "../../_dev-images",
  shuffle: false,

  /* hero · 카드 · stats visual 등 <img> 슬롯만 */
  slots: [
    { key: "hero-bg-01", orient: "landscape" },
    { key: "hero-bg-02", orient: "landscape" },
    { key: "hero-bg-03", orient: "landscape" },
    { key: "story-card-01", orient: "portrait" },
    { key: "story-card-02", orient: "portrait" },
    { key: "story-card-03", orient: "portrait" },
    { key: "stats-visual", orient: "landscape" },
    { key: "news-card-01", orient: "landscape" },
    { key: "news-card-02", orient: "landscape" },
    { key: "news-card-03", orient: "landscape" },
    { key: "works-gallery-01", orient: "portrait" },
    { key: "works-gallery-02", orient: "portrait" },
    { key: "works-gallery-03", orient: "portrait" },
    { key: "works-gallery-04", orient: "portrait" },
  ],
};
