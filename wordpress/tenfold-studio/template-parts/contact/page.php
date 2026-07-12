<section class="section section--page-intro">
  <div class="section-shell section-shell--gutter">
    <?php
    tenfold_part(
      'components/page-intro',
      array(
        'eyebrow' => 'CONTACT',
        'title' => "프로젝트에 대해\n이야기해 주세요.",
        'description' => "구체적인 구성이 정해지지 않아도 괜찮습니다.\n현재 준비된 내용과 필요한 범위를 바탕으로\n적합한 제작 방식을 안내합니다.",
      )
    );
    ?>
  </div>
</section>

<section class="section section--contact-form" aria-labelledby="contact-form-title">
  <div class="section-shell section-shell--gutter">
    <h2 id="contact-form-title" class="visually-hidden">문의 양식</h2>
    <?php tenfold_part('contact/form'); ?>
  </div>
</section>
