(function ($) {
  'use strict';

  $(document).on('click', '[data-image-select]', function () {
    var $field = $(this).closest('[data-image-field]');
    var frame = wp.media({
      title: '이미지 선택',
      button: { text: '이 이미지 사용' },
      library: { type: 'image' },
      multiple: false
    });

    frame.on('select', function () {
      var image = frame.state().get('selection').first().toJSON();
      var preview = image.sizes && image.sizes.medium ? image.sizes.medium.url : image.url;
      $field.find('[data-image-id]').val(image.id);
      $field.find('[data-image-preview]').html($('<img>', { src: preview, alt: '' }));
    });
    frame.open();
  });

  $(document).on('click', '[data-image-remove]', function () {
    var $field = $(this).closest('[data-image-field]');
    $field.find('[data-image-id]').val('');
    $field.find('[data-image-preview]').empty();
  });

  $(document).on('click', '[data-repeater-add]', function () {
    var $repeater = $(this).closest('[data-repeater]');
    var template = $repeater.children('template[data-repeater-template]').html();
    var marker = $repeater.attr('data-index-marker');
    var index = $repeater.children('[data-repeater-rows]').children('[data-repeater-row]').length;
    var html = template.split(marker).join(String(index));
    $repeater.children('[data-repeater-rows]').append(html);
  });

  $(document).on('click', '[data-repeater-remove]', function () {
    $(this).closest('[data-repeater-row]').remove();
  });
})(jQuery);
