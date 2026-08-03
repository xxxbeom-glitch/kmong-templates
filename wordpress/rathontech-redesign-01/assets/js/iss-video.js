/**
 * ISS — background video @ 0.5x. Wheel steps live in home-wheel.js.
 */
(function () {
  var section = document.querySelector('[data-iss-pin]');
  if (!section) return;

  var video = section.querySelector('[data-iss-video]');
  if (!video) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  function play() {
    video.playbackRate = 0.5;
    var p = video.play();
    if (p && typeof p.catch === 'function') p.catch(function () {});
  }

  play();
  video.addEventListener('loadedmetadata', play);
})();
