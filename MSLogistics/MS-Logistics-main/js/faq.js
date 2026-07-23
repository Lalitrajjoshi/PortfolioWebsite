/**
 * MS Logistics — FAQ Accordion
 * Animated accordion with single-open behavior
 */

(function () {
  'use strict';

  const faqList = document.getElementById('faqList');
  if (!faqList) return;

  const faqItems = faqList.querySelectorAll('.faq__item');

  function closeAllExcept(exceptItem) {
    faqItems.forEach(function (item) {
      if (item !== exceptItem) {
        item.classList.remove('active');
        const btn = item.querySelector('.faq__question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function toggleItem(item) {
    const isActive = item.classList.contains('active');
    const question = item.querySelector('.faq__question');

    closeAllExcept(item);

    if (!isActive) {
      item.classList.add('active');
      if (question) question.setAttribute('aria-expanded', 'true');
    } else {
      item.classList.remove('active');
      if (question) question.setAttribute('aria-expanded', 'false');
    }
  }

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq__question');
    if (!question) return;

    question.addEventListener('click', function () {
      toggleItem(item);
    });

    question.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleItem(item);
      }
    });
  });
})();
