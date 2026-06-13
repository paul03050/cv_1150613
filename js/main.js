// ========================================
// Modern CV - 許博宇 Paul Hsu
// Interactivity: nav, scroll animations,
// language toggle, bio collapse
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  /* ===== MOBILE NAV TOGGLE ===== */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (navLinks.classList.contains('open')) {
        icon.className = 'fas fa-xmark';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = navToggle.querySelector('i');
        icon.className = 'fas fa-bars';
      });
    });
  }

  /* ===== FADE-IN ON SCROLL ===== */
  const observeElements = (selector, options = {}) => {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;

    const defaults = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
    const config = { ...defaults, ...options };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, config);

    els.forEach(el => observer.observe(el));
  };

  // Apply fade-in to sections, cards, and titles
  document.querySelectorAll('.section, .section-title')
    .forEach(el => el.classList.add('fade-in'));

  // Cards stagger animation
  document.querySelectorAll('.skill-card, .about-card, .edu-card, .lang-card, .cert-card, .timeline-item')
    .forEach((el, i) => {
      el.classList.add('fade-in');
      el.style.transitionDelay = `${i * 0.06}s`;
    });

  observeElements('.fade-in');

  /* ===== BIO LANGUAGE TOGGLE ===== */
  const langBtns = document.querySelectorAll('.bio-lang-btn');
  const zhContent = document.querySelector('.bio-zh');
  const enContent = document.querySelector('.bio-en');

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));

      const lang = btn.dataset.lang;
      btn.classList.add('active');

      if (zhContent && enContent) {
        if (lang === 'zh') {
          zhContent.classList.add('active');
          enContent.classList.remove('active');
        } else {
          enContent.classList.add('active');
          zhContent.classList.remove('active');
        }
      }
    });
  });

  /* ===== BIO COLLAPSE / EXPAND ===== */
  const bioToggle = document.getElementById('bioToggle');

  if (bioToggle) {
    const activeContent = () => {
      const active = document.querySelector('.bio-content.active');
      return active || document.querySelector('.bio-zh');
    };

    bioToggle.addEventListener('click', () => {
      const content = activeContent();
      if (!content) return;

      content.classList.toggle('collapsed');
      const isCollapsed = content.classList.contains('collapsed');
      bioToggle.innerHTML = isCollapsed
        ? '展開自傳 <i class="fas fa-chevron-down"></i>'
        : '收起自傳 <i class="fas fa-chevron-up"></i>';
    });
  }

  /* ===== ACTIVE NAV LINK ON SCROLL ===== */
  const sections = document.querySelectorAll('.section, .hero');
  const navAnchors = document.querySelectorAll('.nav-links a');

  if (sections.length && navAnchors.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navAnchors.forEach(a => {
            a.style.color = '';
            a.style.background = '';
            if (a.getAttribute('href') === '#' + id) {
              a.style.color = 'var(--primary)';
              a.style.background = 'rgba(37,99,235,.08)';
            }
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

    sections.forEach(sec => navObserver.observe(sec));
  }

});
