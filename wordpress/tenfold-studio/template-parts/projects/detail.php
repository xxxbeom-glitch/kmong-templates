<?php
/**
 * @var array<string, mixed> $project
 */
$project = isset($project) ? $project : null;
if (!$project) {
  return;
}
$next = tenfold_next_project($project['slug']);
$tone = isset($project['graphic']['tone']) ? $project['graphic']['tone'] : 'ink';
$keyword = isset($project['graphic']['keyword']) ? $project['graphic']['keyword'] : 'WEB';
?>
<article class="project-detail">
  <section class="section section--project-hero">
    <div class="section-shell section-shell--gutter">
      <p class="tag"><?php echo esc_html($project['label']); ?></p>
      <h1 class="project-detail__title"><?php echo esc_html($project['title']); ?></h1>
      <p class="project-detail__type"><?php echo esc_html($project['type']); ?></p>
      <p class="lead"><?php echo esc_html($project['hero_line']); ?></p>
      <div class="project-detail__hero-visual project-graphic project-graphic--<?php echo esc_attr($tone); ?> project-graphic--hero" aria-hidden="true">
        <span class="project-graphic__keyword"><?php echo esc_html($keyword); ?></span>
        <span class="project-graphic__title"><?php echo esc_html($project['title']); ?></span>
      </div>
    </div>
  </section>

  <section class="section section--compact" aria-labelledby="overview-title">
    <div class="section-shell section-shell--gutter">
      <h2 id="overview-title">프로젝트 개요</h2>
      <p class="prose"><?php echo esc_html($project['overview']); ?></p>
    </div>
  </section>

  <section class="section section--compact" aria-labelledby="challenge-title">
    <div class="section-shell section-shell--gutter">
      <h2 id="challenge-title">해결해야 했던 과제</h2>
      <ul class="bullet-list">
        <?php foreach ($project['challenges'] as $challenge) : ?>
          <li><?php echo esc_html($challenge); ?></li>
        <?php endforeach; ?>
      </ul>
    </div>
  </section>

  <section class="section section--compact" aria-labelledby="direction-title">
    <div class="section-shell section-shell--gutter">
      <h2 id="direction-title">기획과 디자인 방향</h2>
      <dl class="info-rows">
        <?php foreach ($project['direction'] as $label => $text) : ?>
          <div class="info-row">
            <dt><?php echo esc_html($label); ?></dt>
            <dd><?php echo esc_html($text); ?></dd>
          </div>
        <?php endforeach; ?>
      </dl>
    </div>
  </section>

  <section class="section section--compact" aria-labelledby="scope-title">
    <div class="section-shell section-shell--gutter">
      <h2 id="scope-title">프로젝트 범위</h2>
      <ul class="tag-list">
        <?php foreach ($project['scope'] as $scope_item) : ?>
          <li><span class="tag tag--outline"><?php echo esc_html($scope_item); ?></span></li>
        <?php endforeach; ?>
      </ul>
    </div>
  </section>

  <section class="section section--compact" aria-labelledby="screens-title">
    <div class="section-shell section-shell--gutter">
      <h2 id="screens-title">주요 화면</h2>
      <div class="screen-grid">
        <?php foreach ($project['screens'] as $screen) : ?>
          <div class="screen-card project-graphic project-graphic--<?php echo esc_attr($tone); ?>">
            <span class="screen-card__label"><?php echo esc_html($screen); ?></span>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <section class="section section--compact" aria-labelledby="responsive-title">
    <div class="section-shell section-shell--gutter">
      <h2 id="responsive-title">반응형 구성</h2>
      <p class="prose">모바일에서 핵심 정보와 CTA가 먼저 읽히도록 구성하고, 태블릿·PC에서는 여백과 타이포 스케일을 확장해 같은 구조를 유지합니다.</p>
      <div class="responsive-preview" aria-hidden="true">
        <div class="responsive-preview__device responsive-preview__device--mo">MO</div>
        <div class="responsive-preview__device responsive-preview__device--tb">TB</div>
        <div class="responsive-preview__device responsive-preview__device--pc">PC</div>
      </div>
    </div>
  </section>

  <section class="section section--compact" aria-labelledby="info-title">
    <div class="section-shell section-shell--gutter">
      <h2 id="info-title">프로젝트 정보</h2>
      <dl class="info-rows">
        <div class="info-row"><dt>Project Type</dt><dd><?php echo esc_html($project['type']); ?></dd></div>
        <div class="info-row"><dt>Industry</dt><dd><?php echo esc_html($project['industry']); ?></dd></div>
        <div class="info-row"><dt>Scope</dt><dd><?php echo esc_html(implode(', ', $project['scope'])); ?></dd></div>
        <div class="info-row"><dt>Platform</dt><dd><?php echo esc_html($project['platform']); ?></dd></div>
        <div class="info-row"><dt>Status</dt><dd><?php echo esc_html($project['status']); ?></dd></div>
      </dl>
    </div>
  </section>

  <?php if ($next) : ?>
    <section class="section section--next-project">
      <div class="section-shell section-shell--gutter">
        <a class="next-project" href="<?php echo esc_url(tenfold_url('projects/' . $next['slug'])); ?>">
          <span class="eyebrow">NEXT PROJECT</span>
          <span class="next-project__title"><?php echo esc_html($next['title']); ?></span>
          <span class="text-link">다음 프로젝트 보기 <span aria-hidden="true">→</span></span>
        </a>
      </div>
    </section>
  <?php endif; ?>
</article>
