<?php
$categories = array(
  '여성질환',
  '여성검진',
  '임신·출산',
  '난임·가임력',
  '여성수술',
  '기타',
);
$phone = hes_womens_clinic_phone();
?>

<section class="sub-reservation">
  <div class="section-shell section-shell--gutter">
    <form class="sub-reservation__form" action="#" method="post" novalidate>
      <div class="sub-reservation__row">
        <label class="sub-reservation__label" for="res-name">이름 <span class="sub-reservation__req">*</span></label>
        <input class="sub-reservation__input" id="res-name" type="text" name="name" required placeholder="이름">
      </div>
      <div class="sub-reservation__row">
        <label class="sub-reservation__label" for="res-phone">연락처 <span class="sub-reservation__req">*</span></label>
        <input class="sub-reservation__input" id="res-phone" type="tel" name="phone" required placeholder="- 없이 숫자만 입력">
      </div>
      <div class="sub-reservation__row">
        <span class="sub-reservation__label">희망 진료 <span class="sub-reservation__req">*</span></span>
        <div class="sub-reservation__choices">
          <?php foreach ($categories as $index => $category) : ?>
            <label class="sub-reservation__choice">
              <input type="radio" name="category" value="<?php echo esc_attr($category); ?>" <?php checked($index === 0); ?>>
              <span><?php echo esc_html($category); ?></span>
            </label>
          <?php endforeach; ?>
        </div>
      </div>
      <div class="sub-reservation__row">
        <label class="sub-reservation__label" for="res-date">희망 날짜 <span class="sub-reservation__req">*</span></label>
        <input class="sub-reservation__input" id="res-date" type="date" name="preferred_date" required>
      </div>
      <div class="sub-reservation__row">
        <label class="sub-reservation__label" for="res-time">희망 시간대</label>
        <input class="sub-reservation__input" id="res-time" type="text" name="preferred_time" placeholder="예: 오전, 14시 이후">
      </div>
      <div class="sub-reservation__row">
        <label class="sub-reservation__label" for="res-message">간단한 문의</label>
        <textarea class="sub-reservation__textarea" id="res-message" name="message" rows="4" placeholder="증상이나 문의 내용을 간단히 적어주세요"></textarea>
      </div>
      <div class="sub-reservation__row">
        <label class="sub-reservation__check">
          <input type="checkbox" name="privacy_agree" required>
          <span>(필수) 개인정보 수집·이용에 동의합니다.</span>
        </label>
      </div>
      <div class="sub-reservation__actions">
        <button type="submit" class="sub-reservation__submit">접수 신청</button>
      </div>
      <p class="sub-reservation__help">
        급한 증상이 있거나 당일 진료가 필요하면
        <a href="<?php echo esc_url($phone['href']); ?>"><?php echo esc_html($phone['display']); ?></a>
        로 문의해 주세요.
      </p>
    </form>
  </div>
</section>
