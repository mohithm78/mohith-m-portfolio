// Application entry point & orchestrator
import './ai.css';
import { HeroVisualizer } from './canvas/heroVisualizer.js';
import { renderTechSkillsMatrix } from './components/techSkillsMatrix.js';
import { renderProjects } from './components/projectCards.js';
import { renderCertifications } from './components/certificationsSection.js';
import { initResumeModal } from './components/resumeModal.js';
import { initPremiumEffects } from './components/cardEffects.js';

document.addEventListener('DOMContentLoaded', () => {
  new HeroVisualizer('hero-dataflow-canvas');
  renderTechSkillsMatrix('tech-skills-matrix-root');
  renderProjects('projects-root');
  renderCertifications('certifications-root');
  initResumeModal();
  setupNavigation();
  initPremiumEffects();
  mountMohithAI();
  initMohithAI();
});

function setupNavigation() {
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 30);
    let currentId = '';
    const scrollPos = window.scrollY + 160;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) currentId = sec.id;
    });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`));
  });

  mobileToggle?.addEventListener('click', () => {
    const open = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!open));
    siteNav?.classList.toggle('mobile-open', !open);
  });
  navLinks.forEach(link => link.addEventListener('click', () => {
    mobileToggle?.setAttribute('aria-expanded', 'false');
    siteNav?.classList.remove('mobile-open');
  }));
}

function mountMohithAI() {
  if (document.getElementById('ai-launcher')) return;
  document.body.insertAdjacentHTML('beforeend', `
    <button class="ai-launcher" id="ai-launcher" aria-label="Open Mohith AI" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="4.5"/><path d="M10.5 12h3M12 10.5v3"/></svg>
    </button>
    <aside class="ai-panel" id="ai-panel" aria-label="Mohith AI assistant">
      <div class="ai-head"><div class="ai-brand"><div class="ai-orb">AI</div><div><div class="ai-title">MOHITH AI</div><div class="ai-status">● PORTFOLIO INTELLIGENCE ONLINE</div></div></div><button class="ai-close" id="ai-close" aria-label="Close">×</button></div>
      <div class="ai-messages" id="ai-messages"><div class="ai-message assistant">Hi — I’m Mohith AI. Ask me about Mohith’s embedded systems, Edge AI, projects, skills, experience or achievements.</div></div>
      <div class="ai-suggestions"><button class="ai-suggestion" data-ai-prompt="What are Mohith's strongest embedded projects?">Best projects</button><button class="ai-suggestion" data-ai-prompt="What embedded technologies does Mohith know?">Tech stack</button><button class="ai-suggestion" data-ai-prompt="Why is Mohith suitable for an embedded internship?">Recruiter view</button></div>
      <div class="ai-note">Answers are grounded in Mohith's verified portfolio profile.</div>
      <form class="ai-form" id="ai-form"><input class="ai-input" id="ai-input" maxlength="1000" autocomplete="off" placeholder="Ask about Mohith…" aria-label="Ask Mohith AI"/><button class="ai-send" type="submit" aria-label="Send">→</button></form>
    </aside>
  `);
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
  const setOpen = open => {
    panel.classList.toggle('is-open', open);
    launcher.setAttribute('aria-expanded', String(open));
    if (open) setTimeout(() => input.focus(), 120);
  };
  launcher.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
  close?.addEventListener('click', () => setOpen(false));
  suggestions.forEach(button => button.addEventListener('click', () => { input.value = button.dataset.aiPrompt || ''; form.requestSubmit(); }));

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    addMessage(question, 'user'); input.value = '';
    const thinking = addMessage('Thinking about Mohith’s profile…', 'assistant thinking');
    try {
      const response = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({question}) });
      let data = {};
      try { data = await response.json(); } catch (_) { data = {}; }
      thinking.remove();
      if (!response.ok) throw new Error(data.error || `AI request failed (HTTP ${response.status})`);
      addMessage(data.answer || 'I could not generate an answer right now.', 'assistant');
    } catch (error) {
      thinking.remove();
      const message = error?.message || 'Unknown AI error';
      addMessage(`AI connection error: ${message}`, 'assistant');
      console.error('MOHITH_AI_CLIENT_ERROR', error);
    }
  });
}
