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
      <span class="ai-launcher-dot"></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="4.5"/><path d="M10.5 12h3M12 10.5v3"/></svg>
    </button>
    <aside class="ai-panel" id="ai-panel" aria-label="Mohith AI assistant">
      <div class="ai-head">
        <div class="ai-brand"><div class="ai-orb"><span>AI</span></div><div><div class="ai-title">MOHITH AI</div><div class="ai-status"><span class="ai-live-dot"></span> PORTFOLIO INTELLIGENCE ONLINE</div></div></div>
        <button class="ai-close" id="ai-close" aria-label="Close">×</button>
      </div>
      <div class="ai-context"><span>Recruiter-ready assistant</span><span>•</span><span>Verified profile</span></div>
      <div class="ai-messages" id="ai-messages">
        <div class="ai-message assistant welcome"><div class="ai-welcome-title">Hi — I’m Mohith AI.</div><div>I can help you explore Mohith’s embedded systems, Edge AI, projects, skills, experience and achievements.</div></div>
      </div>
      <div class="ai-suggestions-label">Explore Mohith</div>
      <div class="ai-suggestions">
        <button class="ai-suggestion" data-ai-prompt="What are Mohith's 3 strongest embedded projects? Include the hardware, software and what each project demonstrates.">Top projects</button>
        <button class="ai-suggestion" data-ai-prompt="Give me Mohith's embedded systems and IoT tech stack, grouped by languages, MCUs, protocols, RTOS and tools.">Tech stack</button>
        <button class="ai-suggestion" data-ai-prompt="Why would Mohith be a strong candidate for an embedded systems or firmware internship? Give 4 evidence-based points.">Recruiter view</button>
        <button class="ai-suggestion" data-ai-prompt="Summarize Mohith's strongest achievements and hackathon results in a recruiter-friendly way.">Achievements</button>
      </div>
      <div class="ai-note">AI answers are grounded in Mohith's verified portfolio profile. No unsupported claims.</div>
      <form class="ai-form" id="ai-form"><input class="ai-input" id="ai-input" maxlength="1000" autocomplete="off" placeholder="Ask about Mohith…" aria-label="Ask Mohith AI"/><button class="ai-send" type="submit" aria-label="Send"><span>↑</span></button></form>
    </aside>
  `);
}

function formatAIText(text) {
  const escapeHTML = value => value.replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' }[char]));
  let html = escapeHTML(String(text || '').trim());
  html = html.replace(/^###\s+(.+)$/gm, '<strong>$1</strong>');
  html = html.replace(/^##\s+(.+)$/gm, '<strong>$1</strong>');
  html = html.replace(/^#\s+(.+)$/gm, '<strong>$1</strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/^\s*[-•]\s+(.+)$/gm, '<span class="ai-bullet">•</span> $1');
  html = html.replace(/(^|\n)(\d+)\.\s+/g, '$1<span class="ai-number">$2.</span> ');
  html = html.replace(/\n/g, '<br>');
  return html;
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

  const addMessage = (text, role, options = {}) => {
    const bubble = document.createElement('div');
    bubble.className = `ai-message ${role}`;
    if (options.html) bubble.innerHTML = text;
    else bubble.textContent = text;
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
    addMessage(question, 'user');
    input.value = '';
    input.disabled = true;
    const send = form.querySelector('.ai-send');
    send?.classList.add('is-loading');
    const thinking = addMessage('<span class="ai-thinking-dots"><i></i><i></i><i></i></span><span>Analyzing Mohith’s profile…</span>', 'assistant thinking', { html: true });
    try {
      const response = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({question}) });
      let data = {};
      try { data = await response.json(); } catch (_) { data = {}; }
      thinking.remove();
      if (!response.ok) throw new Error(data.error || `AI request failed (HTTP ${response.status})`);
      addMessage(formatAIText(data.answer || 'I could not generate an answer right now.'), 'assistant', { html: true });
    } catch (error) {
      thinking.remove();
      const message = error?.message || 'Unknown AI error';
      addMessage(`AI connection error: ${message}`, 'assistant');
      console.error('MOHITH_AI_CLIENT_ERROR', error);
    } finally {
      input.disabled = false;
      send?.classList.remove('is-loading');
      input.focus();
    }
  });
}
