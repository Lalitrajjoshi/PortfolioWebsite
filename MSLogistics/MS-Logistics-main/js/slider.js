/**
 * MS Logistics — Slider JavaScript
 * Testimonial slider with auto-play, dots, and navigation
 */

(function () {
  'use strict';

  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  const dotsContainer = document.getElementById('testimonialDots');

  if (!track) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoPlayInterval = null;
  const AUTO_PLAY_DELAY = 5000;

  /* --- Create Dots --- */
  function createDots() {
    if (!dotsContainer) return;

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('testimonials__dot');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      if (i === 0) dot.classList.add('active');

      dot.addEventListener('click', function () {
        goToSlide(i);
        resetAutoPlay();
      });

      dotsContainer.appendChild(dot);
    }
  }

  /* --- Update Slider Position --- */
  function goToSlide(index) {
    currentIndex = index;
    track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

    const dots = dotsContainer.querySelectorAll('.testimonials__dot');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === currentIndex);
      dot.setAttribute('aria-selected', i === currentIndex);
    });
  }

  /* --- Next / Previous --- */
  function nextSlide() {
    goToSlide((currentIndex + 1) % totalSlides);
  }

  function prevSlide() {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  }

  /* --- Auto Play --- */
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, AUTO_PLAY_DELAY);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  /* --- Touch / Swipe Support --- */
  function initTouch() {
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      isDragging = true;
      clearInterval(autoPlayInterval);
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      if (!isDragging) return;
      isDragging = false;

      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }

      resetAutoPlay();
    }, { passive: true });
  }

  /* --- Initialize --- */
  function init() {
    createDots();
    goToSlide(0);
    startAutoPlay();
    initTouch();

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide();
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide();
        resetAutoPlay();
      });
    }

    const slider = document.getElementById('testimonialSlider');
    if (slider) {
      slider.addEventListener('mouseenter', function () {
        clearInterval(autoPlayInterval);
      });
      slider.addEventListener('mouseleave', function () {
        startAutoPlay();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
