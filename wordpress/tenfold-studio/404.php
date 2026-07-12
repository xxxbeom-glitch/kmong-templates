<?php
get_header();
?>
<article class="section section--error">
  <div class="section-shell section-shell--gutter">
    <p class="eyebrow">404 ERROR</p>
    <h1>요청한 페이지를<br>찾을 수 없습니다.</h1>
    <p class="lead">주소가 변경되었거나<br>존재하지 않는 페이지일 수 있습니다.</p>
    <div class="btn-row">
      <a class="btn btn--primary" href="<?php echo esc_url(tenfold_url()); ?>">메인으로 돌아가기</a>
      <a class="btn btn--secondary" href="<?php echo esc_url(tenfold_url('projects')); ?>">프로젝트 보기</a>
    </div>
  </div>
</article>
<?php
get_footer(null, array('compact' => true));
