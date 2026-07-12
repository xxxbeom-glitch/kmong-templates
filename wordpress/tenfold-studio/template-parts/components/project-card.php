<?php
/**
 * @var array<string, mixed> $project
 */
$project = isset($project) ? $project : null;
if (!$project) {
  return;
}
$href = tenfold_url('projects/' . $project['slug']);
$tone = isset($project['graphic']['tone']) ? $project['graphic']['tone'] : 'ink';
$keyword = isset($project['graphic']['keyword']) ? $project['graphic']['keyword'] : 'WEB';
?>
<article class="project-card">
  <a class="project-card__link" href="<?php echo esc_url($href); ?>">
    <div class="project-card__visual project-graphic project-graphic--<?php echo esc_attr($tone); ?>" aria-hidden="true">
      <span class="project-graphic__keyword"><?php echo esc_html($keyword); ?></span>
      <span class="project-graphic__type"><?php echo esc_html($project['type']); ?></span>
    </div>
    <div class="project-card__body">
      <p class="project-card__meta">
        <span class="tag"><?php echo esc_html($project['label']); ?></span>
        <span class="project-card__type"><?php echo esc_html($project['type']); ?></span>
      </p>
      <h3 class="project-card__title"><?php echo esc_html($project['title']); ?></h3>
      <p class="project-card__summary"><?php echo esc_html($project['summary']); ?></p>
      <span class="text-link">상세 보기 <span aria-hidden="true">→</span></span>
    </div>
  </a>
</article>
