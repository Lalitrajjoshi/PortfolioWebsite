const body = document.body;
const header = document.querySelector('.site-header');
const progressBar = document.getElementById('scrollProgress');
const transitionLayer = document.querySelector('.page-transition');

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setScrollProgress = () => {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
};

const setHeaderState = () => {
  if (!header) return;
  if (window.scrollY > 12) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

const handleSmoothLinks = () => {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
      }
    });
  });
};

const handlePageTransitions = () => {
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || link.target === '_blank') return;
    link.addEventListener('click', (event) => {
      if (link.dataset.noTransition) return;
      event.preventDefault();
      body.classList.add('page-exit');
      setTimeout(() => {
        window.location.href = href;
      }, 450);
    });
  });
};

const revealOnScroll = () => {
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    el.classList.remove('reveal');
    el.classList.add('is-visible');
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
};

  if (prefersReduced || !('IntersectionObserver' in window)) {
    elements.forEach(show);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          show(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
  );

  elements.forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      show(el);
      observer.unobserve(el);
    }
  });
};

const animateCounters = () => {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animate = (counter) => {
    const target = parseInt(counter.dataset.count, 10) || 0;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value.toString();
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((counter) => observer.observe(counter));
};

const rotateTestimonials = () => {
  const cards = document.querySelectorAll('.testimonial-card');
  if (cards.length < 2) return;
  let activeIndex = 0;

  setInterval(() => {
    cards.forEach((card, index) => {
      card.style.opacity = index === activeIndex ? '1' : '0.4';
      card.style.transform = index === activeIndex ? 'translateY(-4px)' : 'translateY(0)';
    });
    activeIndex = (activeIndex + 1) % cards.length;
  }, 4000);
};

const setupFilters = () => {
  document.querySelectorAll('[data-filter-group]').forEach((group) => {
    const groupName = group.dataset.filterGroup;
    const buttons = group.querySelectorAll('[data-filter]');
    const items = document.querySelectorAll(`[data-filter-item="${groupName}"]`);

    const applyFilter = (value) => {
      items.forEach((item) => {
        const category = item.dataset.category;
        const match = value === 'all' || category === value;
        if (match) {
          item.classList.remove('is-hidden');
          item.style.display = 'block';
        } else {
          item.classList.add('is-hidden');
          setTimeout(() => {
            if (item.classList.contains('is-hidden')) {
              item.style.display = 'none';
            }
          }, 200);
        }
      });
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const value = button.dataset.filter;
        buttons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        applyFilter(value);
      });
    });

    if (buttons.length) {
      applyFilter(buttons[0].dataset.filter || 'all');
    }
  });
};

const setupLightbox = () => {
  const galleryItems = document.querySelectorAll('.masonry-item img');
  if (!galleryItems.length) return;
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  const img = document.createElement('img');
  lightbox.appendChild(img);
  document.body.appendChild(lightbox);

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      img.src = item.src;
      img.alt = item.alt;
      lightbox.classList.add('active');
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
};

const setupParallax = () => {
  const sections = document.querySelectorAll('[data-parallax]');
  if (!sections.length || prefersReduced) return;

  const update = () => {
    sections.forEach((section) => {
      const speed = parseFloat(section.dataset.parallax) || 0.2;
      const offset = window.scrollY * speed;
      section.style.transform = `translateY(${offset * 0.3}px)`;
    });
  };

  window.addEventListener('scroll', () => requestAnimationFrame(update));
  update();
};

const runGsap = () => {
  return;
};

const init = () => {
  setScrollProgress();
  setHeaderState();
  handleSmoothLinks();
  handlePageTransitions();
  revealOnScroll();
  animateCounters();
  rotateTestimonials();
  setupFilters();
  setupLightbox();
  setupParallax();
  runGsap();
};

window.addEventListener('scroll', () => {
  setScrollProgress();
  setHeaderState();
});

window.addEventListener('load', () => {
  body.classList.add('page-ready');
  init();
});




const scrollButton = document.querySelector('.scroll-top');
if (scrollButton) {
  const toggleScroll = () => {
    if (window.scrollY > 320) {
      scrollButton.classList.add('show');
    } else {
      scrollButton.classList.remove('show');
    }
  };
  toggleScroll();
  window.addEventListener('scroll', toggleScroll);
  scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });
}


