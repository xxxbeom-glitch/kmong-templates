<?php
/**
 * Inquiry page — mock 견적문의 폼 UI (P2-4)
 *
 * CF7 연동 시: 아래 .page-inquiry__form-slot 내부 mock 폼을
 * <?php echo do_shortcode('[contact-form-7 id="…"]'); ?> 등으로 교체.
 */
$product_categories = wonkangmetal_product_category_definitions();
$inquiry_types      = array(
  'quote'    => __('견적문의', 'wonkangmetal'),
  'technical'=> __('기술 문의', 'wonkangmetal'),
  'as'       => __('A/S 문의', 'wonkangmetal'),
  'other'    => __('기타', 'wonkangmetal'),
);
?>
<article <?php post_class('sub-page page-inquiry'); ?>>
  <div class="si-inner sub-page__inner">
    <div class="page-inquiry__form-slot" data-inquiry-form-slot>
      <form
        class="page-inquiry__form inquiry-form"
        action="#"
        method="post"
        enctype="multipart/form-data"
        novalidate
        aria-describedby="inquiry-form-notice"
      >
        <div class="inquiry-form__grid">
          <div class="inquiry-form__field">
            <label class="inquiry-form__label" for="inquiry-company">
              <?php esc_html_e('회사명', 'wonkangmetal'); ?>
              <span class="inquiry-form__required" aria-hidden="true">*</span>
            </label>
            <input
              class="inquiry-form__input"
              type="text"
              id="inquiry-company"
              name="company"
              autocomplete="organization"
              disabled
            />
          </div>

          <div class="inquiry-form__field">
            <label class="inquiry-form__label" for="inquiry-name">
              <?php esc_html_e('담당자명', 'wonkangmetal'); ?>
              <span class="inquiry-form__required" aria-hidden="true">*</span>
            </label>
            <input
              class="inquiry-form__input"
              type="text"
              id="inquiry-name"
              name="contact_name"
              autocomplete="name"
              disabled
            />
          </div>

          <div class="inquiry-form__field">
            <label class="inquiry-form__label" for="inquiry-email">
              <?php esc_html_e('이메일', 'wonkangmetal'); ?>
              <span class="inquiry-form__required" aria-hidden="true">*</span>
            </label>
            <input
              class="inquiry-form__input"
              type="email"
              id="inquiry-email"
              name="email"
              autocomplete="email"
              disabled
            />
          </div>

          <div class="inquiry-form__field">
            <label class="inquiry-form__label" for="inquiry-phone">
              <?php esc_html_e('연락처', 'wonkangmetal'); ?>
              <span class="inquiry-form__required" aria-hidden="true">*</span>
            </label>
            <input
              class="inquiry-form__input"
              type="tel"
              id="inquiry-phone"
              name="phone"
              autocomplete="tel"
              disabled
            />
          </div>

          <div class="inquiry-form__field">
            <label class="inquiry-form__label" for="inquiry-product">
              <?php esc_html_e('문의 제품군', 'wonkangmetal'); ?>
            </label>
            <select class="inquiry-form__select" id="inquiry-product" name="product_category" disabled>
              <option value=""><?php esc_html_e('선택', 'wonkangmetal'); ?></option>
              <?php foreach ($product_categories as $slug => $label) : ?>
                <option value="<?php echo esc_attr($slug); ?>"><?php echo esc_html($label); ?></option>
              <?php endforeach; ?>
            </select>
          </div>

          <div class="inquiry-form__field">
            <label class="inquiry-form__label" for="inquiry-type">
              <?php esc_html_e('문의 유형', 'wonkangmetal'); ?>
            </label>
            <select class="inquiry-form__select" id="inquiry-type" name="inquiry_type" disabled>
              <option value=""><?php esc_html_e('선택', 'wonkangmetal'); ?></option>
              <?php foreach ($inquiry_types as $value => $label) : ?>
                <option value="<?php echo esc_attr($value); ?>"><?php echo esc_html($label); ?></option>
              <?php endforeach; ?>
            </select>
          </div>

          <div class="inquiry-form__field inquiry-form__field--full">
            <label class="inquiry-form__label" for="inquiry-subject">
              <?php esc_html_e('제목', 'wonkangmetal'); ?>
              <span class="inquiry-form__required" aria-hidden="true">*</span>
            </label>
            <input
              class="inquiry-form__input"
              type="text"
              id="inquiry-subject"
              name="subject"
              disabled
            />
          </div>

          <div class="inquiry-form__field inquiry-form__field--full">
            <label class="inquiry-form__label" for="inquiry-message">
              <?php esc_html_e('문의 내용', 'wonkangmetal'); ?>
              <span class="inquiry-form__required" aria-hidden="true">*</span>
            </label>
            <textarea
              class="inquiry-form__textarea"
              id="inquiry-message"
              name="message"
              rows="6"
              disabled
            ></textarea>
          </div>

          <div class="inquiry-form__field inquiry-form__field--full">
            <span class="inquiry-form__label" id="inquiry-file-label">
              <?php esc_html_e('파일 첨부', 'wonkangmetal'); ?>
            </span>
            <div
              class="inquiry-form__file-placeholder"
              role="group"
              aria-labelledby="inquiry-file-label"
            >
              <p><?php esc_html_e('파일 첨부 영역 (플러그인 연동 시 활성화)', 'wonkangmetal'); ?></p>
            </div>
          </div>

          <div class="inquiry-form__field inquiry-form__field--full inquiry-form__field--consent">
            <label class="inquiry-form__checkbox">
              <input type="checkbox" name="privacy_consent" value="1" disabled />
              <span>
                <?php esc_html_e('개인정보 수집·이용에 동의합니다.', 'wonkangmetal'); ?>
                (
                <a href="<?php echo esc_url(wonkangmetal_page_url('privacy-policy')); ?>">
                  <?php esc_html_e('개인정보 취급방침', 'wonkangmetal'); ?>
                </a>
                )
              </span>
            </label>
          </div>
        </div>

        <p class="inquiry-form__notice" id="inquiry-form-notice" role="status">
          <?php esc_html_e('문의 폼 전송 기능은 준비 중입니다. Contact Form 7 연동 후 활성화됩니다.', 'wonkangmetal'); ?>
        </p>

        <div class="inquiry-form__actions">
          <button type="submit" class="btn-cta inquiry-form__submit" disabled>
            <?php esc_html_e('문의 접수', 'wonkangmetal'); ?>
          </button>
        </div>
      </form>
    </div>
  </div>
</article>
