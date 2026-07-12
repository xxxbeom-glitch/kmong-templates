<?php
$packages = tenfold_packages();
$keys = tenfold_comparison_keys();
?>
<section class="section section--page-intro">
  <div class="section-shell section-shell--gutter">
    <?php
    tenfold_part(
      'components/page-intro',
      array(
        'eyebrow' => 'SERVICES',
        'title' => "필요한 범위에 맞는\n제작 방식을 선택하세요.",
        'description' => "빠르게 시작할 수 있는 기본형부터\n기획과 구조를 새롭게 설계하는 맞춤형까지,\n프로젝트의 목적과 예산에 맞게 진행합니다.",
      )
    );
    ?>
  </div>
</section>

<section class="section section--package-cards" aria-labelledby="packages-title">
  <div class="section-shell section-shell--gutter">
    <h2 id="packages-title" class="visually-hidden">패키지 안내</h2>
    <div class="package-grid">
      <?php tenfold_part('components/package-card', array('package' => $packages['standard'])); ?>
      <?php tenfold_part('components/package-card', array('package' => $packages['custom'])); ?>
    </div>
  </div>
</section>

<section class="section section--comparison" aria-labelledby="comparison-title">
  <div class="section-shell section-shell--gutter">
    <h2 id="comparison-title">패키지 비교</h2>
    <div class="compare-list">
      <?php foreach ($keys as $key) : ?>
        <div class="compare-item">
          <h3 class="compare-item__label"><?php echo esc_html($key); ?></h3>
          <div class="compare-item__cols">
            <div>
              <p class="compare-item__pkg">STANDARD</p>
              <p><?php echo esc_html($packages['standard']['comparison'][$key]); ?></p>
            </div>
            <div>
              <p class="compare-item__pkg">CUSTOM</p>
              <p><?php echo esc_html($packages['custom']['comparison'][$key]); ?></p>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="foundation-title">
  <div class="section-shell section-shell--gutter">
    <?php
    tenfold_part(
      'components/section-header',
      array(
        'eyebrow' => 'BUILT IN',
        'title' => "두 패키지 모두\n운영을 위한 기본을 포함합니다.",
        'title_id' => 'foundation-title',
      )
    );
    ?>
    <ul class="bullet-list bullet-list--grid">
      <?php foreach (tenfold_common_foundation() as $item) : ?>
        <li><?php echo esc_html($item); ?></li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="addons-title">
  <div class="section-shell section-shell--gutter">
    <h2 id="addons-title">선택 추가 항목</h2>
    <ul class="tag-list">
      <?php foreach (tenfold_service_addons() as $addon) : ?>
        <li><span class="tag tag--outline"><?php echo esc_html($addon); ?></span></li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>

<section class="section section--process" aria-labelledby="services-process-title">
  <div class="section-shell section-shell--gutter">
    <?php
    tenfold_part(
      'components/section-header',
      array(
        'eyebrow' => 'PROCESS',
        'title' => "목적을 정리하는 일부터\n오픈까지 함께합니다.",
        'title_id' => 'services-process-title',
      )
    );
    tenfold_part('components/timeline', array('steps' => tenfold_process_steps()));
    ?>
  </div>
</section>

<section class="section section--faq" aria-labelledby="services-faq-title">
  <div class="section-shell section-shell--gutter">
    <?php
    tenfold_part(
      'components/section-header',
      array(
        'eyebrow' => 'FAQ',
        'title' => "시작하기 전에\n궁금한 것부터 확인하세요.",
        'title_id' => 'services-faq-title',
      )
    );
    tenfold_part('components/accordion', array('items' => tenfold_faqs(), 'id_prefix' => 'services-faq'));
    ?>
  </div>
</section>

<section class="section section--closing-cta" aria-labelledby="services-cta-title">
  <div class="section-shell section-shell--gutter">
    <h2 id="services-cta-title">어느 방식이 맞는지<br>아직 정해지지 않아도 괜찮습니다.</h2>
    <a class="btn btn--primary" href="<?php echo esc_url(tenfold_url('contact')); ?>">프로젝트 문의하기</a>
  </div>
</section>
