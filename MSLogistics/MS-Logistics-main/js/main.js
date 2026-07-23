/**
 * MS Logistics — Main JavaScript
 * Core functionality: loader, header, navigation, forms, modals, cursor
 */

(function () {
  'use strict';

  /* --- DOM Elements --- */
  const loader = document.getElementById('loader');
  const loaderProgress = document.getElementById('loaderProgress');
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mainNav = document.getElementById('mainNav');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const contactForm = document.getElementById('contactForm');
  const newsletterForm = document.getElementById('newsletterForm');
  const videoPlayBtn = document.getElementById('videoPlayBtn');
  const videoModal = document.getElementById('videoModal');
  const videoModalClose = document.getElementById('videoModalClose');
  const videoModalBackdrop = document.getElementById('videoModalBackdrop');
  const videoIframe = document.getElementById('videoIframe');
  const projectModal = document.getElementById('projectModal');
  const projectModalClose = document.getElementById('projectModalClose');
  const projectModalBackdrop = document.getElementById('projectModalBackdrop');
  const projectModalBody = document.getElementById('projectModalBody');
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  const VIDEO_URL = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';

  const PROJECTS = [
    {
      title: 'Household Move',
      location: 'Kathmandu, Nepal',
      duration: 'Residential',
      budget: 'Door-to-Door',
      image: 'images/relocation-packing-v2.jpg',
      desc: 'Export-quality packing for a complete household relocation with zero-damage handling. Professional movers carefully packed, transported, and delivered every item across all 77 districts.'
    },
    {
      title: 'Corporate Cargo',
      location: 'Lalitpur, Nepal',
      duration: 'Commercial',
      budget: 'Asset Tracking',
      image: 'images/freight-containers.jpg',
      desc: 'Office relocation with project management and full business-continuity planning. Completed ahead of schedule with GPS-equipped fleet tracking and minimal business disruption.'
    },
    {
      title: 'Diplomatic Move',
      location: 'Embassy District, Kathmandu',
      duration: 'Diplomatic',
      budget: 'Confidential',
      image: 'images/relocation-packing-v2.jpg',
      desc: 'Protocol-aware embassy relocation with direct customs links and discreet handling. Every item arrived without a single scratch, trusted by diplomatic missions for confidential moves.'
    },
    {
      title: 'Air Freight Shipment',
      location: 'Tribhuvan International Airport',
      duration: 'Freight',
      budget: 'Global Air',
      image: 'images/air-freight-v2.jpg',
      desc: 'Global air freight routing via TIA with real-time coordination and customs clearance. Multi-modal freight network connecting Nepal to international destinations with zero-damage commitment.'
    },
    {
      title: 'Secure Storage',
      location: 'Balkumari, Lalitpur',
      duration: 'Warehousing',
      budget: '24/7 Security',
      image: 'images/secure-warehouse.jpg',
      desc: 'Climate-controlled, GPS-monitored warehousing with full inventory tracking. Secure storage hub providing complete peace of mind for household and commercial goods.'
    },
    {
      title: 'Ocean Freight',
      location: 'Kolkata & Haldia Ports',
      duration: 'International',
      budget: 'Sea Freight',
      image: 'images/freight-containers.jpg',
      desc: 'Multi-modal ocean freight via Kolkata and Haldia ports with cross-border customs integration. Seamless international shipping with direct customs links and zero-damage standard.'
    }
  ];

  /* --- Loading Screen --- */
  function initLoader() {
    let progress = 0;
    const interval = setInterval(function () {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(function () {
          loader.classList.add('hidden');
          document.body.classList.add('loaded');
        }, 400);
      }
      loaderProgress.style.width = progress + '%';
    }, 150);
  }

  /* --- Sticky Header --- */
  function initHeader() {
    header.classList.add('header--transparent');

    function updateHeader() {
      if (window.scrollY > 80) {
        header.classList.remove('header--transparent');
        header.classList.add('header--scrolled');
      } else {
        header.classList.add('header--transparent');
        header.classList.remove('header--scrolled');
      }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  /* --- Mobile Navigation --- */
  function initMobileNav() {
    hamburgerBtn.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('active');
      hamburgerBtn.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mainNav.querySelectorAll('.header__link').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Smooth Scroll & Active Nav --- */
  function initSmoothScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__link');

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = header.offsetHeight;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });

    function highlightNav() {
      const scrollPos = window.scrollY + header.offsetHeight + 100;

      sections.forEach(function (section) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
  }

  /* --- Scroll Progress Bar --- */
  function initScrollProgress() {
    window.addEventListener('scroll', function () {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = progress + '%';
      scrollProgress.setAttribute('aria-valuenow', Math.round(progress));
    }, { passive: true });
  }

  /* --- Back To Top --- */
  function initBackToTop() {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Button Ripple Effect --- */
  function initRipple() {
    document.querySelectorAll('.btn--ripple').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        btn.appendChild(ripple);
        setTimeout(function () { ripple.remove(); }, 600);
      });
    });
  }

  /* --- Contact Form Validation --- */
  function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const fields = {
        name: { el: document.getElementById('name'), error: document.getElementById('nameError'), validate: function (v) { return v.trim().length >= 2; }, msg: 'Please enter your full name' },
        email: { el: document.getElementById('email'), error: document.getElementById('emailError'), validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }, msg: 'Please enter a valid email' },
        phone: { el: document.getElementById('phone'), error: document.getElementById('phoneError'), validate: function (v) { return !v || /^[\d\s\-()+ ]{7,}$/.test(v); }, msg: 'Please enter a valid phone number' },
        service: { el: document.getElementById('service'), error: document.getElementById('serviceError'), validate: function (v) { return v !== ''; }, msg: 'Please select a service' },
        message: { el: document.getElementById('message'), error: document.getElementById('messageError'), validate: function (v) { return v.trim().length >= 10; }, msg: 'Message must be at least 10 characters' }
      };

      Object.keys(fields).forEach(function (key) {
        const field = fields[key];
        const value = field.el.value;
        field.error.textContent = '';
        field.el.classList.remove('error');

        if (!field.validate(value)) {
          field.error.textContent = field.msg;
          field.el.classList.add('error');
          valid = false;
        }
      });

      if (valid) {
        document.getElementById('formSuccess').hidden = false;
        contactForm.reset();
        setTimeout(function () {
          document.getElementById('formSuccess').hidden = true;
        }, 5000);
      }
    });
  }

  /* --- Newsletter Form --- */
  function initNewsletter() {
    if (!newsletterForm) return;
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      newsletterForm.reset();
      alert('Thank you for subscribing!');
    });
  }

  /* --- Video Modal --- */
  function initVideoModal() {
    function openModal() {
      videoModal.hidden = false;
      requestAnimationFrame(function () {
        videoModal.classList.add('active');
      });
      videoIframe.src = VIDEO_URL;
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      videoModal.classList.remove('active');
      videoIframe.src = '';
      document.body.style.overflow = '';
      setTimeout(function () { videoModal.hidden = true; }, 300);
    }

    videoPlayBtn.addEventListener('click', openModal);
    videoModalClose.addEventListener('click', closeModal);
    videoModalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !videoModal.hidden) closeModal();
    });
  }

  /* --- Project Modal --- */
  function initProjectModal() {
    function openProject(index) {
      const project = PROJECTS[index];
      if (!project) return;

      projectModalBody.innerHTML =
        '<img src="' + project.image + '" alt="' + project.title + '">' +
        '<h3>' + project.title + '</h3>' +
        '<div class="project-meta">' +
          '<span>' + project.location + '</span>' +
          '<span>' + project.duration + '</span>' +
          '<span>' + project.budget + '</span>' +
        '</div>' +
        '<p>' + project.desc + '</p>';

      projectModal.hidden = false;
      requestAnimationFrame(function () {
        projectModal.classList.add('active');
      });
      document.body.style.overflow = 'hidden';
    }

    function closeProject() {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(function () { projectModal.hidden = true; }, 300);
    }

    document.querySelectorAll('.project-card__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openProject(parseInt(this.dataset.project, 10));
      });
    });

    projectModalClose.addEventListener('click', closeProject);
    projectModalBackdrop.addEventListener('click', closeProject);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !projectModal.hidden) closeProject();
    });
  }

  /* --- Project Filters --- */
  function initProjectFilters() {
    const filters = document.querySelectorAll('.projects__filter');
    const cards = document.querySelectorAll('.project-card');

    filters.forEach(function (filter) {
      filter.addEventListener('click', function () {
        const category = this.dataset.filter;

        filters.forEach(function (f) {
          f.classList.remove('active');
          f.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        cards.forEach(function (card) {
          const categories = card.dataset.category.split(' ');
          if (category === 'all' || categories.includes(category)) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeUp 0.5s ease forwards';
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* --- Custom Cursor --- */
  function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .service-card, .project-card, .team-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursorRing.classList.add('hover'); });
      el.addEventListener('mouseleave', function () { cursorRing.classList.remove('hover'); });
    });
  }

  /* --- Initialize --- */
  document.addEventListener('DOMContentLoaded', function () {
    initLoader();
    initHeader();
    initMobileNav();
    initSmoothScroll();
    initScrollProgress();
    initBackToTop();
    initRipple();
    initContactForm();
    initNewsletter();
    initVideoModal();
    initProjectModal();
    initProjectFilters();
    initCursor();
  });
})();
