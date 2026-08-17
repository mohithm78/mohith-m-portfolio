// Application entry point & orchestrator
import { HeroVisualizer } from './canvas/heroVisualizer.js';
import { renderTechSkillsMatrix } from './components/techSkillsMatrix.js';
import { renderProjects } from './components/projectCards.js';
import { renderCertifications } from './components/certificationsSection.js';
import { initResumeModal } from './components/resumeModal.js';
import { initPremiumEffects } from './components/cardEffects.js';

document.addEventListener('DOMContentLoaded', () => {
  const heroVis = new HeroVisualizer('hero-dataflow-canvas');
  renderTechSkillsMatrix('tech-skills-matrix-root');
  renderProjects('projects-root');
  renderCertifications('certifications-root');
  initResumeModal();
  setupNavigation();
  initPremiumEffects();
  initMohithAI();
});

function setupNavigation() {
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) header?.classList.add('scrolled');
    else header?.classList.remove('scrolled');

    let currentId = '';
    const scrollPos = window.scrollY + 160;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        currentId = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  });

  mobileToggle?.addEventListener('click', () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
    siteNav?.classList.toggle('mobile-open', !isExpanded);
  });

  navLinks.forEach(link => link.addEventListener('click', () => {
    mobileToggle?.setAttribute('aria-expanded', 'false');
    siteNav?.classList.remove('mobile-open');
  }));
}

function initMohithAI() {
  const launcher = document.getElementById('ai-launcher');
  const panel = document.getElementById('ai-panel');
  const close = document.getElementById('ai-close');
  const form = document.getElementById('ai-form');
  const input = document.getElementById('ai-input');
  const messages = document.getElementById('ai-messages');
  const suggestions = document.querySelectorAll('[data-ai-prompt]');

  if (!launcher || !panel || !form || !input || !messages) return;

  const addMessage = (text, role) => {
    const bubble = document.createElement('div');
    bubble.className = `ai-message ${role}`;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
    return bubble;
  };

  const setOpen = (open) => {
    panel.classList.toggle('is-open', open);
    launcher.setAttribute('aria-expanded', String(open));
    if (open) setTimeout(() => input.focus(), 120);
  };

  launcher.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
  close?.addEventListener('click', () => setOpen(false));

  suggestions.forEach(button => {
    button.addEventListener('click', () => {
      input.value = button.dataset.aiPrompt || '';
      form.requestSubmit();
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;

    addMessage(question, 'user');
    input.value = '';
    const thinking = addMessage('Thinking about Mohith’s profile…', 'assistant thinking');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      const data = await response.json();
      thinking.remove();
      if (!response.ok) throw new Error(data.error || 'AI request failed');
      addMessage(data.answer, 'assistant');
    } catch (error) {
      thinking.remove();
      addMessage('The portfolio AI is temporarily unavailable. Please use the contact section or LinkedIn to reach Mohith directly.', 'assistant');
      console.error(error);
    }
  });
}
