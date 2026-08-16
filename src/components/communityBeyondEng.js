// Interactive Beyond Engineering, Extracurricular & Community Impact Component
import { EXTRACURRICULAR_ACHIEVEMENTS, COMMUNITY_IMPACT, BEYOND_ENGINEERING_TRIAD } from '../data/portfolioData.js';

export function renderBeyondEngineering(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="beyond-eng-wrapper">
      <!-- 1. Headline & Triad Model -->
      <div class="beyond-triad-banner">
        <div class="triad-header">
          <span class="triad-kicker font-mono">// BALANCED PERSONAL DEVELOPMENT</span>
          <h3 class="triad-headline">"${BEYOND_ENGINEERING_TRIAD.headline}"</h3>
          <p class="triad-sub">Integrating analytical engineering rigor with creative discipline and community responsibility.</p>
        </div>

        <div class="triad-cards-row">
          <!-- Card 1: Technical -->
          <div class="triad-card pillar-technical">
            <div class="triad-card-head">
              <span class="triad-num font-mono">01 // LOGIC</span>
              <span class="triad-pillar-tag">TECHNICAL</span>
            </div>
            <h4 class="triad-card-title">${BEYOND_ENGINEERING_TRIAD.cards[0].title}</h4>
            <div class="triad-tags">
              ${BEYOND_ENGINEERING_TRIAD.cards[0].tags.map(t => `<span class="t-chip">${t}</span>`).join('')}
            </div>
          </div>

          <div class="triad-connection-node">
            <span class="triad-sync-symbol">↔</span>
          </div>

          <!-- Card 2: Creative -->
          <div class="triad-card pillar-creative">
            <div class="triad-card-head">
              <span class="triad-num font-mono">02 // DISCIPLINE</span>
              <span class="triad-pillar-tag amber">CREATIVE</span>
            </div>
            <h4 class="triad-card-title">${BEYOND_ENGINEERING_TRIAD.cards[1].title}</h4>
            <div class="triad-tags">
              ${BEYOND_ENGINEERING_TRIAD.cards[1].tags.map(t => `<span class="t-chip amber">${t}</span>`).join('')}
            </div>
          </div>

          <div class="triad-connection-node">
            <span class="triad-sync-symbol">↔</span>
          </div>

          <!-- Card 3: Community -->
          <div class="triad-card pillar-community">
            <div class="triad-card-head">
              <span class="triad-num font-mono">03 // SERVICE</span>
              <span class="triad-pillar-tag emerald">COMMUNITY</span>
            </div>
            <h4 class="triad-card-title">${BEYOND_ENGINEERING_TRIAD.cards[2].title}</h4>
            <div class="triad-tags">
              ${BEYOND_ENGINEERING_TRIAD.cards[2].tags.map(t => `<span class="t-chip emerald">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Dual Showcase Grid: Western Dance Achievement & Community Volunteer -->
      <div class="beyond-dual-showcase-grid">
        
        <!-- Showcase A: Extracurricular Western Dance -->
        <div class="extracurricular-card">
          <div class="extra-trophy-spotlight">
            <div class="trophy-icon-wrap">
              <svg class="trophy-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="1.8">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55-.45 1-1 1H7"/>
                <path d="M14 14.66V17c0 .55.45 1 1 1h2"/>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
              </svg>
            </div>
            <div class="extra-badge-group">
              <span class="extra-badge-pill font-mono">EXTRACURRICULAR ACHIEVEMENT</span>
              <span class="extra-event-name">Chigauru 2025</span>
            </div>
          </div>

          <div class="extra-content">
            <h4 class="extra-title">Runner-Up — Western Dance</h4>
            <p class="extra-desc">
              "Secured Runner-Up in Western Dance at Chigauru 2025. Competitive group choreography developed strong attributes in team synchronization, precision timing, discipline, and creative expression alongside rigorous engineering studies."
            </p>
            <div class="extra-values-list">
              <span class="val-pill">Teamwork</span>
              <span class="val-pill">Discipline</span>
              <span class="val-pill">Coordination</span>
              <span class="val-pill">Creativity</span>
              <span class="val-pill">Performance</span>
              <span class="val-pill">Time Management</span>
              <span class="val-pill">Collaboration</span>
            </div>
          </div>
        </div>

        <!-- Showcase B: NSS & Community Volunteering -->
        <div class="community-card">
          <div class="community-head">
            <div class="community-icon-wrap">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="1.8">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div class="community-badge-group">
              <span class="community-status-badge font-mono">✓ VOLUNTEER APPROVED</span>
              <span class="community-org">Humanity Calls Trust</span>
            </div>
          </div>

          <div class="community-content">
            <h4 class="community-title">NSS Volunteer — Humanity Calls Trust</h4>
            <p class="community-desc">
              "Approved as a Volunteer at Humanity Calls Trust, contributing to community-focused initiatives and social-impact activities."
            </p>

            <!-- Interactive Community Pulse Flow -->
            <div class="community-flow-box font-mono">
              <span class="flow-node">COMMUNITY</span>
              <span class="flow-arr">➔</span>
              <span class="flow-node">TEAMWORK</span>
              <span class="flow-arr">➔</span>
              <span class="flow-node">SERVICE</span>
              <span class="flow-arr">➔</span>
              <span class="flow-node highlight">IMPACT</span>
            </div>

            <div class="community-values-list">
              <span class="val-pill green">Community Service</span>
              <span class="val-pill green">Social Responsibility</span>
              <span class="val-pill green">Engagement</span>
              <span class="val-pill green">Leadership</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}
