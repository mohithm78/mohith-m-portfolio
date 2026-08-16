// Tech Stack, Realistic Logic Analyzer Signals & Protocol Inspector Component
import { TECH_STACK } from '../data/portfolioData.js';

export function renderTechStack(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const categoryKeys = Object.keys(TECH_STACK);

  let html = `
    <div class="tech-stack-container">
      
      <!-- Interactive Signal Waveforms Box (Logic Analyzer / Oscilloscope Style) -->
      <div class="logic-analyzer-waveform-board">
        <div class="la-header">
          <div class="la-status">
            <span class="la-dot pulse"></span>
            <span class="la-title font-mono">8-CHANNEL LOGIC ANALYZER // HARDWARE BUS TRACES (24MHz SAMPLING)</span>
          </div>
          <div class="la-meta font-mono">TIMEBASE: 10µs/div • TRIGGER: CH1_EDGE</div>
        </div>

        <div class="la-channels-grid">
          <!-- Channel 1: UART -->
          <div class="la-channel">
            <div class="la-ch-label font-mono">
              <span class="ch-badge ch1">CH1 [UART]</span>
              <span class="ch-name">TX / RX @ 115200 Baud</span>
            </div>
            <div class="la-wave-display font-mono">
              <div class="wave-track">
                <span class="wave-symbol">TX ──▁▁▁────▔▔────▁────▔▔──→ RX (Packet: 0x55 [SYNC])</span>
              </div>
            </div>
          </div>

          <!-- Channel 2: SPI -->
          <div class="la-channel">
            <div class="la-ch-label font-mono">
              <span class="ch-badge ch2">CH2 [SPI]</span>
              <span class="ch-name">4-Wire Synchronous Bus</span>
            </div>
            <div class="la-wave-display font-mono">
              <div class="wave-track">
                <span class="wave-symbol">SCLK: _|‾|_|‾|_|‾|_|‾|_ | MOSI: ──▁▁──▔▔── | CS: ‾‾|_______|‾‾</span>
              </div>
            </div>
          </div>

          <!-- Channel 3: I2C -->
          <div class="la-channel">
            <div class="la-ch-label font-mono">
              <span class="ch-badge ch3">CH3 [I2C]</span>
              <span class="ch-name">Open-Drain Pull-Up Bus</span>
            </div>
            <div class="la-wave-display font-mono">
              <div class="wave-track">
                <span class="wave-symbol">SCL: _|‾|_|‾|_|‾|_ | SDA: ──[START]──[ADDR:0x68]──[ACK]──[DATA]──[STOP]</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tech Categories Grid (8 Categories, No Percentage Bars) -->
      <div class="tech-categories-grid">
  `;

  categoryKeys.forEach((key, idx) => {
    const cat = TECH_STACK[key];
    html += `
      <div class="tech-category-card" data-category="${key}">
        <div class="category-header">
          <div class="category-title-group">
            <span class="category-index font-mono">0${idx + 1}</span>
            <h3 class="category-title">${cat.title}</h3>
          </div>
          <span class="category-count font-mono">${cat.items.length} Skills</span>
        </div>
        <div class="tech-items-grid">
          ${cat.items.map(item => `
            <button class="tech-pill" data-tech="${item.name}" data-spec="${item.spec}" data-verified="${item.verifiedIn}" title="Click to view verified application">
              <span class="tech-pill-name">${item.name}</span>
              <span class="tech-pill-badge font-mono">${item.spec}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  });

  html += `
      </div>

      <!-- Protocol & Hardware Modal -->
      <div id="tech-inspector-overlay" class="tech-inspector-overlay hidden" aria-hidden="true">
        <div class="tech-inspector-modal" role="dialog" aria-modal="true" aria-labelledby="inspector-title">
          <div class="inspector-header">
            <div class="inspector-title-wrap">
              <span id="inspector-category-badge" class="inspector-badge font-mono">TECHNICAL SPECIFICATION</span>
              <h4 id="inspector-title" class="inspector-title">Skill Title</h4>
            </div>
            <button id="close-tech-inspector" class="inspector-close-btn" aria-label="Close Inspector">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          
          <div class="inspector-body">
            <div class="inspector-section">
              <span class="section-label font-mono">SPECIFICATION & ARCHITECTURE</span>
              <p id="inspector-spec" class="inspector-text">Details...</p>
            </div>
            <div class="inspector-section">
              <span class="section-label font-mono">VERIFIED IN PHYSICAL PROJECT / WORKFLOW</span>
              <div id="inspector-verified" class="inspector-verified-box font-mono">Hardware Implementation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
  setupTechInspectorEvents();
}

function setupTechInspectorEvents() {
  const overlay = document.getElementById('tech-inspector-overlay');
  const closeBtn = document.getElementById('close-tech-inspector');
  const titleEl = document.getElementById('inspector-title');
  const specEl = document.getElementById('inspector-spec');
  const verifiedEl = document.getElementById('inspector-verified');
  const pills = document.querySelectorAll('.tech-pill');

  if (!overlay) return;

  const openInspector = (name, spec, verified) => {
    if (titleEl) titleEl.textContent = name;
    if (specEl) specEl.textContent = spec;
    if (verifiedEl) verifiedEl.textContent = `Applied in: ${verified}`;
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
  };

  const closeInspector = () => {
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
  };

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const name = pill.dataset.tech;
      const spec = pill.dataset.spec;
      const verified = pill.dataset.verified;
      openInspector(name, spec, verified);
    });
  });

  closeBtn?.addEventListener('click', closeInspector);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeInspector();
  });
}
