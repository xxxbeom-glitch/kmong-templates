(function ($) {
  'use strict';

  function applyHtml($el, html) {
    if (!$el.length || html === undefined || html === null || html === '') {
      return;
    }

    $el.html(html);
  }

  function applyText($el, text) {
    if (!$el.length || text === undefined || text === null || text === '') {
      return;
    }

    $el.text(text);
  }

  function applyHeroImage(imagePath) {
    if (!imagePath) {
      return;
    }

    $('.hero__slide-img').attr('src', imagePath);
  }

  function applyStoryCards(cards) {
    if (!Array.isArray(cards) || !cards.length) {
      return;
    }

    var $cards = $('.story__list .story-card');

    cards.forEach(function (card, index) {
      var $card = $cards.eq(index);

      if (!$card.length) {
        return;
      }

      applyText($card.find('.story-card__title'), card.title);
      applyText($card.find('.story-card__desc'), card.description);

      if (card.image_path) {
        $card.find('.story-card__media img').attr('src', card.image_path);
      }
    });

    $cards.slice(cards.length).remove();
  }

  function initCmsContent() {
    $.getJSON('api/cms.php')
      .done(function (response) {
        if (!response || !response.ok || !response.data) {
          return;
        }

        var data = response.data;

        if (data.hero) {
          applyText($('.hero__label'), data.hero.label);
          applyHtml($('.hero__title'), data.hero.title);
          applyHtml($('.hero__desc'), data.hero.desc);
          applyHeroImage(data.hero.image);
        }

        if (data.story) {
          applyText($('#story-title, .story__title'), data.story.title);
          applyText($('.story__desc'), data.story.desc);
        }

        applyStoryCards(data.storyCards);
      })
      .fail(function () {
        /* DB 미연결 시 index.html 기본값 유지 */
      });
  }

  $(initCmsContent);
})(jQuery);
