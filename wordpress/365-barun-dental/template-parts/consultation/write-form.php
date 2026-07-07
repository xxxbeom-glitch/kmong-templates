<?php
/**
 * Write form — Figma 511:140
 */
$categories = barun_dental_consultation_form_categories();
$call_times = barun_dental_consultation_call_times();
$list_url = barun_dental_consultation_url('list');
$sample_image = barun_dental_asset_uri('consultation-sample-xray');
?>
<section class="section-consult-form" aria-label="온라인 상담 작성">
  <div class="section-shell section-shell--gutter">
    <form class="section-consult-form__card" action="#" method="post" novalidate>
      <div class="section-consult-form__rows">
        <div class="section-consult-form__row">
          <div class="section-consult-form__label">상담분야</div>
          <div class="section-consult-form__value">
            <div class="section-consult-form__radios" role="radiogroup" aria-label="상담분야">
              <?php foreach ($categories as $index => $category) : ?>
                <label class="section-consult-form__radio">
                  <input
                    type="radio"
                    name="consult_category"
                    value="<?php echo esc_attr($category); ?>"
                    <?php checked($index === 0); ?>
                  >
                  <span class="section-consult-form__control" aria-hidden="true"></span>
                  <span><?php echo esc_html($category); ?></span>
                </label>
              <?php endforeach; ?>
            </div>
          </div>
        </div>

        <div class="section-consult-form__row">
          <div class="section-consult-form__label">이름 <span class="section-consult-form__req" aria-hidden="true">*</span></div>
          <div class="section-consult-form__value">
            <input type="text" class="section-consult-form__input" name="consult_name" placeholder="이름을 입력하세요" required>
          </div>
        </div>

        <div class="section-consult-form__row">
          <div class="section-consult-form__label">연락처 <span class="section-consult-form__req" aria-hidden="true">*</span></div>
          <div class="section-consult-form__value">
            <input type="tel" class="section-consult-form__input" name="consult_phone" placeholder="- 없이 숫자만 입력" required>
          </div>
        </div>

        <div class="section-consult-form__row">
          <div class="section-consult-form__label">연락방식</div>
          <div class="section-consult-form__value">
            <div class="section-consult-form__radios" role="radiogroup" aria-label="연락방식">
              <label class="section-consult-form__radio">
                <input type="radio" name="consult_contact" value="sms" checked>
                <span class="section-consult-form__control" aria-hidden="true"></span>
                <span>문자</span>
              </label>
              <label class="section-consult-form__radio">
                <input type="radio" name="consult_contact" value="call">
                <span class="section-consult-form__control" aria-hidden="true"></span>
                <span>전화</span>
              </label>
            </div>
          </div>
        </div>

        <div class="section-consult-form__row">
          <div class="section-consult-form__label">통화시간</div>
          <div class="section-consult-form__value">
            <div class="section-consult-form__select-wrap">
              <select class="section-consult-form__select" name="consult_call_time">
                <option value="">시간대를 선택하세요</option>
                <?php foreach ($call_times as $time) : ?>
                  <option value="<?php echo esc_attr($time); ?>"><?php echo esc_html($time); ?></option>
                <?php endforeach; ?>
              </select>
              <img class="section-consult-form__select-icon" src="<?php echo esc_url(barun_dental_asset_uri('icon-chevron-down')); ?>" alt="" width="20" height="20" decoding="async">
            </div>
          </div>
        </div>

        <div class="section-consult-form__row">
          <div class="section-consult-form__label">제목 <span class="section-consult-form__req" aria-hidden="true">*</span></div>
          <div class="section-consult-form__value">
            <input type="text" class="section-consult-form__input" name="consult_title" placeholder="상담 제목을 입력해 주세요" required>
          </div>
        </div>

        <div class="section-consult-form__row section-consult-form__row--textarea">
          <div class="section-consult-form__label">상담내용 <span class="section-consult-form__req" aria-hidden="true">*</span></div>
          <div class="section-consult-form__value">
            <textarea
              class="section-consult-form__textarea"
              name="consult_content"
              rows="6"
              placeholder="상담 내용을 자세히 작성해 주시면 보다 정확한 상담이 가능합니다.&#10;(치아 상태, 통증 부위, 치료 경험 등)"
              required
            ></textarea>
          </div>
        </div>

        <div class="section-consult-form__row section-consult-form__row--upload">
          <div class="section-consult-form__label">이미지</div>
          <div class="section-consult-form__value">
            <div class="section-consult-form__uploads">
              <label class="section-consult-form__upload section-consult-form__upload--add">
                <input type="file" class="section-consult-form__file" name="consult_images[]" accept="image/*" hidden>
                <img src="<?php echo esc_url(barun_dental_asset_uri('icon-plus')); ?>" alt="" width="24" height="24" decoding="async">
                <span class="screen-reader-text">이미지 추가</span>
              </label>
              <div class="section-consult-form__upload section-consult-form__upload--preview">
                <img src="<?php echo esc_url($sample_image); ?>" alt="" width="120" height="120" decoding="async">
                <button type="button" class="section-consult-form__upload-remove" aria-label="이미지 삭제">
                  <img src="<?php echo esc_url(barun_dental_asset_uri('icon-x')); ?>" alt="" width="12" height="12" decoding="async">
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="section-consult-form__row section-consult-form__row--password">
          <div class="section-consult-form__label">비밀번호</div>
          <div class="section-consult-form__value">
            <div class="section-consult-form__password-wrap">
              <input
                type="password"
                class="section-consult-form__input section-consult-form__input--password"
                name="consult_password"
                placeholder="비밀번호 4자리 입력"
                maxlength="4"
                inputmode="numeric"
              >
              <button type="button" class="section-consult-form__password-toggle" aria-label="비밀번호 표시" aria-pressed="false">보기</button>
            </div>
            <p class="section-consult-form__help">상담글 확인 및 수정을 위해 비밀번호가 필요합니다.</p>
          </div>
        </div>

        <div class="section-consult-form__row section-consult-form__row--privacy">
          <div class="section-consult-form__value section-consult-form__value--full">
            <div class="section-consult-form__privacy-row">
              <label class="section-consult-form__checkbox">
                <input type="checkbox" name="consult_privacy" checked required>
                <span class="section-consult-form__control" aria-hidden="true"></span>
                <span>개인정보 수집 및 이용에 동의합니다.</span>
              </label>
            </div>
            <div class="section-consult-form__policy" tabindex="0">
              <?php echo esc_html(barun_dental_consultation_privacy_text()); ?>
            </div>
          </div>
        </div>
      </div>

      <div class="section-consult-form__notice">
        <div class="section-consult-form__notice-head">
          <img src="<?php echo esc_url(barun_dental_asset_uri('icon-info')); ?>" alt="" width="16" height="16" decoding="async">
          <strong>안내사항</strong>
        </div>
        <p>온라인 상담은 실제 내원 진료를 대체할 수 없으며, 정확한 진단은 치과 방문 후 의료진의 직접 검진을 통해 가능합니다. 부적절한 게시물(비방, 욕설, 광고 등)은 관리자에 의해 임의 삭제될 수 있습니다.</p>
      </div>

      <div class="section-consult-form__actions">
        <a href="<?php echo esc_url($list_url); ?>" class="section-consult-form__btn section-consult-form__btn--cancel">취소</a>
        <button type="submit" class="section-consult-form__btn section-consult-form__btn--submit">상담 등록하기</button>
      </div>
    </form>
  </div>
</section>
