<section class="section section--page-intro">
  <div class="section-shell section-shell--gutter">
    <?php
    tenfold_part(
      'components/page-intro',
      array(
        'eyebrow' => 'ABOUT TENFOLD',
        'title' => "기획과 디자인에 강하고,\n운영까지 완성하는\n웹 스튜디오",
        'description' => "텐폴드는 사업과 브랜드에 필요한 정보를 정리하고,\n사용자가 이해하기 쉬운 구조와 화면으로 설계합니다.",
      )
    );
    ?>
  </div>
</section>

<section class="section section--statement" aria-labelledby="statement-title">
  <div class="section-shell section-shell--gutter statement">
    <h2 id="statement-title" class="statement__title">웹사이트는<br>화면을 만드는 일보다<br>기준을 세우는 일에 가깝습니다.</h2>
    <div class="statement__body">
      <p>어떤 정보를 먼저 보여줄지,<br>사용자가 무엇을 확인하고 어떤 행동을 해야 하는지 정리되지 않으면<br>보기 좋은 디자인도 오래 유지되기 어렵습니다.</p>
      <p>텐폴드는 프로젝트마다 목적과 콘텐츠를 먼저 이해하고,<br>그 기준이 디자인과 구축, 이후 운영까지 이어지도록 작업합니다.</p>
    </div>
  </div>
</section>

<section class="section section--standards" aria-labelledby="standards-title">
  <div class="section-shell section-shell--gutter">
    <?php
    tenfold_part(
      'components/section-header',
      array(
        'eyebrow' => 'OUR STANDARDS',
        'title' => "프로젝트의 수보다\n만드는 방식에\n기준을 둡니다.",
        'title_id' => 'standards-title',
      )
    );
    tenfold_part(
      'components/numbered-list',
      array(
        'items' => array(
          array(
            'index' => '01',
            'title' => '목적과 정보부터 정리합니다',
            'description' => '화면을 그리기 전에 사업 목표, 핵심 사용자, 전달해야 할 정보를 먼저 정리합니다. 이 기준이 메뉴와 페이지 순서를 결정합니다.',
          ),
          array(
            'index' => '02',
            'title' => '프로젝트마다 구조를 다시 설계합니다',
            'description' => '업종과 목적이 다르면 필요한 구조도 다릅니다. 템플릿을 그대로 붙이기보다, 그 프로젝트에 맞는 정보 흐름을 다시 잡습니다.',
          ),
          array(
            'index' => '03',
            'title' => '기획과 디자인, 구축을 직접 연결합니다',
            'description' => '기획 단계의 결정이 디자인과 실제 사이트까지 이어지도록 한 기준으로 작업합니다. 중간에 방향이 흐려지지 않게 만듭니다.',
          ),
          array(
            'index' => '04',
            'title' => '오픈 이후의 수정과 운영까지 고려합니다',
            'description' => '자주 바뀌는 콘텐츠와 기본 검색 등록, CMS 범위를 포함해 오픈 후에도 운영 가능한 상태를 목표로 합니다.',
          ),
        ),
      )
    );
    ?>
  </div>
</section>

<section class="section section--workflow" aria-labelledby="workflow-title">
  <div class="section-shell section-shell--gutter">
    <?php
    tenfold_part(
      'components/section-header',
      array(
        'eyebrow' => 'DIRECT WORKFLOW',
        'title' => "여러 단계를 거치지 않고\n하나의 기준으로 이어갑니다.",
        'title_id' => 'workflow-title',
      )
    );
    ?>
    <ol class="workflow">
      <li class="workflow__item">
        <p class="workflow__label">Planning</p>
        <p class="workflow__text">목표, 사용자와 콘텐츠 구조를 정리합니다.</p>
      </li>
      <li class="workflow__item">
        <p class="workflow__label">UX/UI Design</p>
        <p class="workflow__text">정보의 우선순위와 브랜드 인상을 화면으로 설계합니다.</p>
      </li>
      <li class="workflow__item">
        <p class="workflow__label">Build</p>
        <p class="workflow__text">반응형과 CMS를 적용해 실제 웹사이트로 구축합니다.</p>
      </li>
      <li class="workflow__item">
        <p class="workflow__label">Operation</p>
        <p class="workflow__text">검색 등록과 필요한 운영 구조를 설정합니다.</p>
      </li>
    </ol>
  </div>
</section>

<section class="section section--process" aria-labelledby="about-process-title">
  <div class="section-shell section-shell--gutter">
    <?php
    tenfold_part(
      'components/section-header',
      array(
        'eyebrow' => 'PROCESS',
        'title' => "목적을 정리하는 일부터\n오픈까지 함께합니다.",
        'title_id' => 'about-process-title',
      )
    );
    tenfold_part('components/timeline', array('steps' => tenfold_process_steps()));
    ?>
  </div>
</section>

<section class="section section--closing-cta" aria-labelledby="about-cta-title">
  <div class="section-shell section-shell--gutter">
    <h2 id="about-cta-title">만드는 방식이 중요하다면,<br>텐폴드와 이야기해 보세요.</h2>
    <a class="btn btn--primary" href="<?php echo esc_url(tenfold_url('contact')); ?>">프로젝트 문의하기</a>
  </div>
</section>
