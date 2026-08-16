// Minimalist Professional Credential Tiles
import { CERTIFICATIONS } from '../data/portfolioData.js';

export function renderCertifications(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="certs-editorial-wrapper">
      
      <!-- Filter controls -->
      <div class="cert-filter-controls font-mono">
        <button class="cert-filter-btn active" data-filter="all">ALL (6)</button>
        <button class="cert-filter-btn" data-filter="embedded-iot">EMBEDDED / IoT (2)</button>
        <button class="cert-filter-btn" data-filter="simulation">SIMULATION (1)</button>
        <button class="cert-filter-btn" data-filter="software">SOFTWARE (1)</button>
        <button class="cert-filter-btn" data-filter="ai">AI (2)</button>
      </div>

      <!-- 6 Professional Credential Tiles -->
      <div class="cert-tiles-grid">
        ${CERTIFICATIONS.map(cert => `
          <div class="cert-credential-tile" data-category="${cert.category}">
            <div class="tile-top-row font-mono">
              <span class="tile-num">0${cert.num}</span>
              <span class="tile-badge">${cert.badge}</span>
            </div>
            <h4 class="tile-cert-name">${cert.name}</h4>
            <div class="tile-meta-row font-mono">
              <span class="tile-issuer">${cert.org}</span>
              <span class="tile-year">${cert.year}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="additional-participation-note font-mono">
        <span>NOTE: Additional workshop participation certificates in IoT, Embedded Linux, and PCB Layout are available on request.</span>
      </div>

    </div>
  `;

  setupCertFilters();
}

function setupCertFilters() {
  const filterBtns = document.querySelectorAll('.cert-filter-btn');
  const certCards = document.querySelectorAll('.cert-credential-tile');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      certCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}
