// Clean Application Entry Point & Orchestrator
import { HeroVisualizer } from './canvas/heroVisualizer.js';
import { renderTechSkillsMatrix } from './components/techSkillsMatrix.js';
import { renderProjects } from './components/projectCards.js';
import { renderCertifications } from './components/certificationsSection.js';
import { initResumeModal } from './components/resumeModal.js';
import { initPremiumEffects } from './components/cardEffects.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Abstract Embedded Dataflow Canvas
  const heroVis = new HeroVisualizer('hero-dataflow-canvas');

  // 2. Render Technical Skills Matrix & Communication Protocols Guide
  renderTechSkillsMatrix('tech-skills-matrix-root');

  // 3. Render Featured Projects with Filter Controls & Progression Timeline
  renderProjects('projects-root');

  // 4. Render Curated Certifications Section
  renderCertifications('certifications-root');

  // 5. Initialize ATS-Compliant Resume Modal & Print Engine
  initResumeModal();

  // 6. Setup Navigation & Mobile Menu
  setupNavigation();

  // 7. Initialize Premium Motion, Spotlight Glow, 3D Tilt & Scroll Reveal
  initPremiumEffects();
});

function setupNavigation() {
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Sticky header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Active Section Link Highlight
    let currentId = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile navigation menu toggle
  mobileToggle?.addEventListener('click', () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', !isExpanded);
    if (siteNav) {
      siteNav.classList.toggle('mobile-open', !isExpanded);
    }
  });

  // Close mobile nav upon clicking any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle?.setAttribute('aria-expanded', 'false');
      siteNav?.classList.remove('mobile-open');
    });
  });
}
