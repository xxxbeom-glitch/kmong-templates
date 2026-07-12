<?php
$projects = tenfold_projects();
$filters = tenfold_project_filters();
?>
<section class="section section--page-intro">
  <div class="section-shell section-shell--gutter">
    <?php
    tenfold_part(
      'components/page-intro',
      array(
        'eyebrow' => 'PROJECTS',
        'title' => "생각하고, 설계하고,\n직접 만들어온 프로젝트",
        'description' => "브랜드와 서비스의 목적을 이해하고\n그에 맞는 구조와 경험으로 풀어낸 작업입니다.",
      )
    );
    ?>
  </div>
</section>

<section class="section section--project-list" aria-labelledby="project-list-title">
  <div class="section-shell section-shell--gutter">
    <h2 id="project-list-title" class="visually-hidden">프로젝트 목록</h2>
    <div class="filter-bar" data-project-filter role="group" aria-label="프로젝트 카테고리 필터">
      <?php foreach ($filters as $index => $filter) : ?>
        <button
          type="button"
          class="filter-bar__btn<?php echo $index === 0 ? ' is-active' : ''; ?>"
          data-filter="<?php echo esc_attr($filter); ?>"
          aria-pressed="<?php echo $index === 0 ? 'true' : 'false'; ?>"
        ><?php echo esc_html($filter); ?></button>
      <?php endforeach; ?>
    </div>
    <div class="project-grid" data-project-grid>
      <?php foreach ($projects as $project) : ?>
        <div class="project-grid__item" data-category="<?php echo esc_attr($project['category']); ?>">
          <?php tenfold_part('components/project-card', array('project' => $project)); ?>
        </div>
      <?php endforeach; ?>
    </div>
    <p class="project-list__note">일부 프로젝트는 포트폴리오 목적의<br>독립 프로젝트 또는 비공식 리디자인 스터디입니다.<br>해당 기업의 공식 의뢰 작업이 아닙니다.</p>
  </div>
</section>
