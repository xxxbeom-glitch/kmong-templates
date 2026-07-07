<?php
/**
 * Detail — Figma 538:148
 */
$post = barun_dental_consultation_detail();
$list_url = barun_dental_consultation_url('list');
?>
<section class="section-consult-detail" aria-label="상담 상세">
  <div class="section-shell section-shell--gutter">
    <article class="section-consult-detail__card">
      <header class="section-consult-detail__header">
        <span class="section-consult-detail__badge section-consult-detail__badge--<?php echo esc_attr($post['status']); ?>">
          <?php echo esc_html($post['status_label']); ?>
        </span>
        <h2 class="section-consult-detail__title"><?php echo esc_html($post['title']); ?></h2>
      </header>

      <dl class="section-consult-detail__meta">
        <div class="section-consult-detail__meta-item">
          <dt>상담분야</dt>
          <dd><?php echo esc_html($post['category']); ?></dd>
        </div>
        <div class="section-consult-detail__meta-item">
          <dt>작성일</dt>
          <dd><?php echo esc_html($post['date']); ?></dd>
        </div>
        <div class="section-consult-detail__meta-item">
          <dt>작성자</dt>
          <dd><?php echo esc_html($post['author']); ?></dd>
        </div>
      </dl>

      <div class="section-consult-detail__body">
        <?php foreach ($post['body'] as $paragraph) : ?>
          <p><?php echo esc_html($paragraph); ?></p>
        <?php endforeach; ?>
      </div>

      <div class="section-consult-detail__attachment">
        <span class="section-consult-detail__attachment-label">파일첨부</span>
        <div class="section-consult-detail__attachment-file">
          <span class="section-consult-detail__file-name"><?php echo esc_html($post['attachment']['name']); ?></span>
          <span class="section-consult-detail__file-size">(<?php echo esc_html($post['attachment']['size']); ?>)</span>
        </div>
      </div>

      <div class="section-consult-detail__actions">
        <a href="<?php echo esc_url($list_url); ?>" class="section-consult-detail__btn section-consult-detail__btn--list">목록</a>
        <div class="section-consult-detail__actions-right">
          <button type="button" class="section-consult-detail__btn section-consult-detail__btn--edit">수정하기</button>
          <button type="button" class="section-consult-detail__btn section-consult-detail__btn--delete">삭제하기</button>
        </div>
      </div>
    </article>
  </div>
</section>
