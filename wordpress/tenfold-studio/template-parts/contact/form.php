<?php
/**
 * Contact form — client-side validation only.
 *
 * TODO: 운영 배포 전 실제 폼 전송 API 또는 WordPress 문의 처리 기능 연결
 * (현재는 보안 1단계 정책상 서버 저장·메일 전송 없음)
 */
$project_types = array(
  '신규 홈페이지 제작',
  '기존 홈페이지 리뉴얼',
  '브랜드 웹사이트',
  '기업·서비스 웹사이트',
  '병원·전문 서비스 웹사이트',
  '기타',
);
$packages = array(
  'unknown' => '아직 모르겠습니다',
  'standard' => 'STANDARD PACKAGE',
  'custom' => 'CUSTOM PACKAGE',
);
$budgets = array(
  '50만원 이하',
  '50만~100만원',
  '100만~200만원',
  '200만원 이상',
  '아직 정해지지 않음',
);
$timelines = array(
  '가능한 빠르게',
  '1개월 이내',
  '2~3개월 이내',
  '일정 협의',
  '아직 정해지지 않음',
);
$features = array(
  '문의 폼',
  '게시판·공지사항',
  '지도',
  'CMS 관리',
  '다국어',
  '검색 등록',
  '유지관리',
  '아직 모르겠습니다',
);
?>
<form class="contact-form" data-contact-form novalidate>
  <div class="form-field">
    <label for="company">회사 또는 브랜드명 <span class="req">필수</span></label>
    <input id="company" name="company" type="text" required autocomplete="organization">
    <p class="form-field__error" data-error-for="company" hidden></p>
  </div>

  <div class="form-field">
    <label for="name">담당자명 <span class="req">필수</span></label>
    <input id="name" name="name" type="text" required autocomplete="name">
    <p class="form-field__error" data-error-for="name" hidden></p>
  </div>

  <div class="form-field">
    <label for="email">이메일 <span class="req">필수</span></label>
    <input id="email" name="email" type="email" required autocomplete="email">
    <p class="form-field__error" data-error-for="email" hidden></p>
  </div>

  <div class="form-field">
    <label for="phone">연락처 <span class="req">필수</span></label>
    <input id="phone" name="phone" type="tel" required autocomplete="tel">
    <p class="form-field__error" data-error-for="phone" hidden></p>
  </div>

  <fieldset class="form-field">
    <legend>프로젝트 유형</legend>
    <div class="radio-list">
      <?php foreach ($project_types as $i => $type) : ?>
        <label class="choice">
          <input type="radio" name="project_type" value="<?php echo esc_attr($type); ?>" <?php echo $i === 0 ? 'checked' : ''; ?>>
          <span><?php echo esc_html($type); ?></span>
        </label>
      <?php endforeach; ?>
    </div>
  </fieldset>

  <fieldset class="form-field">
    <legend>관심 패키지</legend>
    <div class="radio-list" data-package-options>
      <?php foreach ($packages as $value => $label) : ?>
        <label class="choice">
          <input type="radio" name="package" value="<?php echo esc_attr($value); ?>" <?php echo $value === 'unknown' ? 'checked' : ''; ?>>
          <span><?php echo esc_html($label); ?></span>
        </label>
      <?php endforeach; ?>
    </div>
  </fieldset>

  <fieldset class="form-field">
    <legend>예상 예산</legend>
    <div class="radio-list">
      <?php foreach ($budgets as $i => $budget) : ?>
        <label class="choice">
          <input type="radio" name="budget" value="<?php echo esc_attr($budget); ?>" <?php echo $i === 4 ? 'checked' : ''; ?>>
          <span><?php echo esc_html($budget); ?></span>
        </label>
      <?php endforeach; ?>
    </div>
  </fieldset>

  <fieldset class="form-field">
    <legend>희망 일정</legend>
    <div class="radio-list">
      <?php foreach ($timelines as $i => $timeline) : ?>
        <label class="choice">
          <input type="radio" name="timeline" value="<?php echo esc_attr($timeline); ?>" <?php echo $i === 4 ? 'checked' : ''; ?>>
          <span><?php echo esc_html($timeline); ?></span>
        </label>
      <?php endforeach; ?>
    </div>
  </fieldset>

  <fieldset class="form-field">
    <legend>필요한 기능</legend>
    <div class="check-list">
      <?php foreach ($features as $i => $feature) : ?>
        <label class="choice">
          <input type="checkbox" name="features[]" value="<?php echo esc_attr($feature); ?>">
          <span><?php echo esc_html($feature); ?></span>
        </label>
      <?php endforeach; ?>
    </div>
  </fieldset>

  <div class="form-field">
    <label for="message">프로젝트 설명</label>
    <textarea id="message" name="message" rows="6" placeholder="현재 상황, 필요한 페이지와 참고 사이트 등이 있다면 작성해 주세요."></textarea>
  </div>

  <div class="form-field">
    <label class="choice choice--consent">
      <input id="privacy" name="privacy" type="checkbox" required>
      <span>개인정보 수집에 동의합니다. <a href="<?php echo esc_url(tenfold_url('privacy')); ?>">개인정보처리방침</a> <span class="req">필수</span></span>
    </label>
    <p class="form-field__error" data-error-for="privacy" hidden></p>
  </div>

  <button type="submit" class="btn btn--primary btn--block" data-submit-btn>프로젝트 문의하기</button>
  <p class="form-note">현재는 1차 프로토타입입니다. 유효성 검사 통과 시 완료 화면으로 이동합니다. 실제 메일 전송은 운영 전 연결이 필요합니다.</p>
</form>
