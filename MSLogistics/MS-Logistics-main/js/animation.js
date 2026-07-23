/**
 * MS Logistics — Animation JavaScript
 * Scroll reveals, parallax, typing effect, timeline animation
 */

(function () {
  'use strict';

  const heroTyping = document.getElementById('heroTyping');
  const heroParallax = document.getElementById('heroParallax');
  const timelineFill = document.getElementById('timelineFill');

  const TYPING_PHRASES = [
    'Packing.',
    'Warehousing.',
    'Worldwide Freight.',
    'Zero-Damage.'
  ];

  /* --- Intersection Observer for Reveal Animations --- */
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-zoom');

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Typing Effect --- */
  function initTypingEffect() {
    if (!heroTyping) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    heroTyping.classList.add('typing-active');

    function type() {
      const currentPhrase = TYPING_PHRASES[phraseIndex];

      if (isDeleting) {
        heroTyping.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        heroTyping.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % TYPING_PHRASES.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
  }

  /* --- Hero Parallax & Mouse Tracking --- */
  function initHeroParallax() {
    if (!heroParallax) return;

    const heroSection = document.querySelector('.hero');
    const floatCards = document.querySelectorAll('.hero__float-card');
    const heroImage = document.querySelector('.hero__image-wrapper');

    heroSection.addEventListener('mousemove', function (e) {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (heroImage) {
        heroImage.style.transform = 'perspective(1000px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 4) + 'deg)';
      }

      floatCards.forEach(function (card, i) {
        const speed = (i + 1) * 8;
        card.style.transform = 'translate(' + (x * speed) + 'px, ' + (y * speed) + 'px)';
      });
    });

    window.addEventListener('scroll', function () {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight && heroParallax) {
        heroParallax.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
      }
    }, { passive: true });
  }

  /* --- Timeline Fill Animation --- */
  function initTimelineAnimation() {
    if (!timelineFill) return;

    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          timelineFill.style.width = '100%';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(timeline);
  }

  /* --- Section Parallax Backgrounds --- */
  function initSectionParallax() {
    const parallaxSections = document.querySelectorAll('.video-section__bg');

    window.addEventListener('scroll', function () {
      parallaxSections.forEach(function (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const offset = (rect.top / window.innerHeight) * 50;
          section.style.transform = 'translateY(' + offset + 'px)';
        }
      });
    }, { passive: true });
  }

  /* --- Stagger Animation for Service Cards --- */
  function initStaggerAnimation() {
    const grids = document.querySelectorAll('.services__grid, .team__grid');

    grids.forEach(function (grid) {
      const cards = grid.children;
      if (!('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            Array.from(cards).forEach(function (card, i) {
              card.style.animationDelay = (i * 0.1) + 's';
              card.classList.add('visible');
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      observer.observe(grid);
    });
  }

  /* --- Initialize --- */
  document.addEventListener('DOMContentLoaded', function () {
    initRevealAnimations();
    initTypingEffect();
    initHeroParallax();
    initTimelineAnimation();
    initSectionParallax();
    initStaggerAnimation();
  });
})();
