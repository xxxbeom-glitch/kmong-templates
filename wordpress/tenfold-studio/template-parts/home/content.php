<?php
$featured = array_slice(tenfold_projects(), 0, 3);
$packages = tenfold_packages();
?>
<section id="hero" class="section section--hero">
  <div class="section-shell section-shell--gutter hero">
    <div class="hero__copy">
      <p class="eyebrow">TENFOLD WEB STUDIO</p>
      <h1 class="hero__title">좋은 웹사이트는<br>좋은 화면보다<br>먼저 설계됩니다.</h1>
      <p class="hero__desc lead">사업의 목적과 필요한 정보를 정리하고,<br>그에 맞는 구조와 디자인으로 완성합니다.</p>
      <div class="btn-row">
        <a class="btn btn--primary" href="<?php echo esc_url(tenfold_url('projects')); ?>">프로젝트 보기</a>
        <a class="btn btn--secondary" href="<?php echo esc_url(tenfold_url('services')); ?>">서비스 알아보기</a>
      </div>
    </div>
    <div class="hero__visual" aria-hidden="true">
      <div class="hero-graphic">
        <span class="hero-graphic__item">PLAN</span>
        <span class="hero-graphic__line"></span>
        <span class="hero-graphic__item">DESIGN</span>
        <span class="hero-graphic__line"></span>
        <span class="hero-graphic__item">BUILD</span>
      </div>
    </div>
  </div>
</section>

<section id="why" class="section section--why" aria-labelledby="why-title">
  <div class="section-shell section-shell--gutter">
    <?php
    tenfold_part(
      'components/section-header',
      array(
        'eyebrow' => 'WHY TENFOLD',
        'title' => "텐폴드 스튜디오를\n선택하는 이유",
        'description' => "보기 좋은 화면을 만드는 데서 끝내지 않습니다.\n사업의 목적을 정리하고,\n실제로 운영할 수 있는 웹사이트까지 완성합니다.",
        'title_id' => 'why-title',
      )
    );
    tenfold_part(
      'components/numbered-list',
      array(
        'items' => array(
          array(
            'index' => '01',
            'title' => '목적부터 설계합니다',
            'description' => '디자인을 시작하기 전에 사업의 목표와 필요한 정보를 먼저 정리합니다. 무엇을 보여주고 사용자가 어떤 순서로 이해해야 하는지 설계한 뒤 화면으로 옮깁니다.',
          ),
          array(
            'index' => '02',
            'title' => '기획부터 구축까지 직접 이어갑니다',
            'description' => '기획, UX·UI 디자인과 반응형 구축을 하나의 기준으로 진행합니다. 처음 정한 방향이 실제 웹사이트까지 자연스럽게 이어지도록 만듭니다.',
          ),
          array(
            'index' => '03',
            'title' => '오픈 이후의 운영까지 생각합니다',
            'description' => '필요한 문구와 이미지를 관리할 수 있는 구조와 검색 등록, 기본 검색 구조, CMS 운영 범위까지 고려합니다.',
          ),
        ),
      )
    );
    ?>
  </div>
</section>

<section id="projects" class="section section--projects" aria-labelledby="home-projects-title">
  <div class="section-shell section-shell--gutter">
    <?php
    tenfold_part(
      'components/section-header',
      array(
        'eyebrow' => 'PROJECTS',
        'title' => "각기 다른 목적을\n각기 다른 방식으로 풀어냅니다.",
        'description' => "브랜드의 성격과 사용자의 행동을 고려해\n프로젝트마다 필요한 구조와 경험을 설계합니다.",
        'title_id' => 'home-projects-title',
      )
    );
    ?>
    <div class="project-grid">
      <?php foreach ($featured as $project) : ?>
        <?php tenfold_part('components/project-card', array('project' => $project)); ?>
      <?php endforeach; ?>
    </div>
    <div class="section-actions">
      <a class="btn btn--secondary" href="<?php echo esc_url(tenfold_url('projects')); ?>">프로젝트 전체 보기</a>
    </div>
  </div>
</section>

<section id="services" class="section section--services" aria-labelledby="home-services-title">
  <div class="section-shell section-shell--gutter">
    <?php
    tenfold_part(
      'components/section-header',
      array(
        'eyebrow' => 'SERVICES',
        'title' => "필요한 방식으로\n웹사이트를 시작하세요.",
        'description' => "모든 프로젝트에 같은 제작 방식이 필요한 것은 아닙니다.\n준비된 구조를 활용하거나,\n기획부터 새롭게 설계하는 방식 중 필요한 범위를 선택할 수 있습니다.",
        'title_id' => 'home-services-title',
      )
    );
    ?>
    <div class="package-grid">
      <?php tenfold_part('components/package-card', array('package' => $packages['standard'])); ?>
      <?php tenfold_part('components/package-card', array('package' => $packages['custom'])); ?>
    </div>
  </div>
</section>

<section id="process" class="section section--process" aria-labelledby="home-process-title">
  <div class="section-shell section-shell--gutter">
    <?php
    tenfold_part(
      'components/section-header',
      array(
        'eyebrow' => 'PROCESS',
        'title' => "목적을 정리하는 일부터\n오픈까지 함께합니다.",
        'title_id' => 'home-process-title',
      )
    );
    tenfold_part('components/timeline', array('steps' => tenfold_process_steps()));
    ?>
  </div>
</section>

<section id="faq" class="section section--faq" aria-labelledby="home-faq-title">
  <div class="section-shell section-shell--gutter">
    <?php
    tenfold_part(
      'components/section-header',
      array(
        'eyebrow' => 'FAQ',
        'title' => "시작하기 전에\n궁금한 것부터 확인하세요.",
        'title_id' => 'home-faq-title',
      )
    );
    tenfold_part('components/accordion', array('items' => tenfold_faqs(), 'id_prefix' => 'home-faq'));
    ?>
  </div>
</section>
