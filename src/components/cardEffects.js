// Premium Engineering Micro-Interactions & Animation Physics
// Includes: Mouse Spotlight Glow, 3D Card Tilt, Scroll Progress, Scroll Reveal & Number Counter

export function initPremiumEffects() {
  initScrollProgressBar();
  initMouseSpotlights();
  initCard3DTilt();
  initScrollReveal();
  initStatCounters();
  initBackToTop();
}

// 1. Top Reading Scroll Progress Bar
function initScrollProgressBar() {
  let bar = document.getElementById('scroll-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'scroll-progress-bar';
    bar.className = 'scroll-progress-bar';
    document.body.appendChild(bar);
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    bar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
  }, { passive: true });
}

// 2. Mouse Spotlight Tracking on Cards
function initMouseSpotlights() {
  const cards = document.querySelectorAll('.project-card, .focus-pillar-card, .skill-category-card, .exp-item-card, .ach-card, .cert-card, .edu-card, .beyond-card, .event-exposure-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// 3. Subtle 3D Card Tilt Physics on Mouse Move
function initCard3DTilt() {
  const tiltCards = document.querySelectorAll('.project-card, .focus-pillar-card, .hero-visual-card');

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4; // Max -4 to +4 deg
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

// 4. Staggered Scroll Reveal via IntersectionObserver
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.section-heading-box, .focus-pillar-card, .project-card, .exp-item-card, .event-exposure-card, .ach-card, .cert-card, .edu-card, .beyond-card, .about-paragraphs-card, .about-meta-card');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    el.classList.add('reveal-init');
    observer.observe(el);
  });
}

// 5. Stat Counter Micro-Animation (e.g., 7.0 CGPA, 10+ Hackathons)
function initStatCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetNum = parseFloat(el.dataset.target || 0);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = targetNum / 30;

        const update = () => {
          current += step;
          if (current < targetNum) {
            el.textContent = current.toFixed(1) + suffix;
            requestAnimationFrame(update);
          } else {
            el.textContent = targetNum + suffix;
          }
        };
        update();
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// 6. Back-to-Top Floating Button
function initBackToTop() {
  let btn = document.getElementById('btn-back-to-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'btn-back-to-top';
    btn.className = 'btn-back-to-top font-mono';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg> TOP`;
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
}
