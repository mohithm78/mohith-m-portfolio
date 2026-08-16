// Interactive PCB Layer & Electronics Case Study Component
// Highlighting Supekar Electronics Internship: From Schematic to Hardware
import { PCB_CASE_STUDY } from '../data/portfolioData.js';

export function renderPCBViewer(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let activeViewMode = "layout"; // 'schematic' | 'layout' | 'silkscreen' | 'assembled'
  let selectedHotspot = "mcu";

  const hotspots = {
    mcu: {
      name: "ESP32-WROOM-32 Core",
      type: "Dual-Core 240MHz MCU",
      notes: "Decoupled with 100nF ceramic capacitor placed within 3mm of 3V3 pin. Solid copper ground plane underneath."
    },
    relay: {
      name: "5V Optocoupled Relay Driver",
      type: "High-Voltage Isolation",
      notes: "EL357N optocoupler + 1N4148 flyback diode to quench inductive kickback. Milled isolation slot for AC creepage safety."
    },
    sensor: {
      name: "DHT11 Environmental Header",
      type: "Digital Sensor Bus",
      notes: "Dedicated 4.7kΩ pull-up resistor to 3.3V rail. Filter capacitor on VCC rail prevents bus noise."
    },
    ldo: {
      name: "AMS1117-3.3V Regulator",
      type: "Power Conditioning",
      notes: "Converts 5V USB/Terminal power to clean 3.3V with 10µF tantalum input and output bulk storage capacitors."
    }
  };

  const render = () => {
    let html = `
      <div class="pcb-case-study-wrap">
        <!-- Internship Metadata Banner -->
        <div class="pcb-meta-card">
          <div class="meta-left">
            <span class="internship-tag">INTERNSHIP CASE STUDY</span>
            <h3 class="meta-company">${PCB_CASE_STUDY.company}</h3>
            <span class="meta-role">${PCB_CASE_STUDY.role} • ${PCB_CASE_STUDY.period}</span>
          </div>
          <div class="meta-right">
            <span class="meta-title-label">Target Hardware:</span>
            <span class="meta-proj-name">${PCB_CASE_STUDY.project}</span>
            <div class="meta-tools-chips">
              ${PCB_CASE_STUDY.tools.map(t => `<span class="meta-tool-badge">${t}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- 4-Stage Workflow Grid -->
        <div class="pcb-stages-grid">
          ${PCB_CASE_STUDY.stages.map((stage, idx) => `
            <div class="pcb-stage-card">
              <div class="stage-num-badge">0${idx + 1}</div>
              <h4 class="stage-card-title">${stage.title}</h4>
              <p class="stage-card-desc">${stage.desc}</p>
            </div>
          `).join('')}
        </div>

        <!-- Interactive Board & Layer Inspector -->
        <div class="interactive-pcb-inspector">
          <div class="inspector-top-bar">
            <div class="inspector-title-area">
              <span class="font-mono t-cyan">KiCad 8.0 2-Layer Board Model</span>
              <span class="view-indicator">// Mode: ${activeViewMode.toUpperCase()}</span>
            </div>
            <div class="layer-switcher-buttons">
              <button class="layer-btn ${activeViewMode === 'schematic' ? 'active' : ''}" data-mode="schematic">Schematic</button>
              <button class="layer-btn ${activeViewMode === 'layout' ? 'active' : ''}" data-mode="layout">Copper Traces</button>
              <button class="layer-btn ${activeViewMode === 'silkscreen' ? 'active' : ''}" data-mode="silkscreen">Silkscreen</button>
              <button class="layer-btn ${activeViewMode === 'assembled' ? 'active' : ''}" data-mode="assembled">Assembled Board</button>
            </div>
          </div>

          <div class="board-canvas-wrapper">
            <!-- Simulated PCB Board SVG with Interactive Layers -->
            <svg class="pcb-board-svg ${activeViewMode}" viewBox="0 0 600 340">
              <!-- PCB Substrate -->
              <rect x="20" y="20" width="560" height="300" rx="8" class="pcb-substrate" />
              <!-- Mounting Holes -->
              <circle cx="40" cy="40" r="10" class="pcb-mount-hole" />
              <circle cx="560" cy="40" r="10" class="pcb-mount-hole" />
              <circle cx="40" cy="300" r="10" class="pcb-mount-hole" />
              <circle cx="560" cy="300" r="10" class="pcb-mount-hole" />

              <!-- Copper Traces Layer -->
              <g class="layer-copper">
                <!-- Ground grid hatch lines -->
                <path d="M 60 40 L 540 40 M 60 80 L 540 80 M 60 120 L 540 120 M 60 160 L 540 160 M 60 200 L 540 200 M 60 240 L 540 240 M 60 280 L 540 280" class="copper-hatch" />
                
                <!-- Main Power and Signal Traces -->
                <path d="M 90 270 L 150 270 L 170 250 L 170 180 L 220 180 L 250 150" class="copper-trace power" />
                <path d="M 250 140 L 320 140 L 360 180 L 440 180" class="copper-trace signal" />
                <path d="M 250 120 L 300 120 L 330 90 L 420 90" class="copper-trace signal" />
                <path d="M 250 160 L 320 160 L 340 180 L 340 240 L 420 240" class="copper-trace signal" />
                
                <!-- Vias -->
                <circle cx="170" cy="250" r="4" class="pcb-via" />
                <circle cx="360" cy="180" r="4" class="pcb-via" />
                <circle cx="330" cy="90" r="4" class="pcb-via" />
              </g>

              <!-- Components & Footprints Layer -->
              <g class="layer-components">
                <!-- AMS1117 LDO -->
                <rect x="70" y="240" width="50" height="40" rx="3" class="comp-body ${selectedHotspot === 'ldo' ? 'selected' : ''}" data-hotspot="ldo" />
                <text x="95" y="264" class="comp-label">AMS1117</text>

                <!-- ESP32 MCU Node -->
                <rect x="200" y="90" width="100" height="130" rx="4" class="comp-body ${selectedHotspot === 'mcu' ? 'selected' : ''}" data-hotspot="mcu" />
                <text x="250" y="150" class="comp-label">ESP32-WROOM</text>
                <text x="250" y="168" class="comp-sublabel">MCU CORE</text>

                <!-- DHT11 Sensor Header -->
                <rect x="420" y="70" width="80" height="45" rx="3" class="comp-body ${selectedHotspot === 'sensor' ? 'selected' : ''}" data-hotspot="sensor" />
                <text x="460" y="96" class="comp-label">DHT11 HDR</text>

                <!-- Relay Module Driver -->
                <rect x="420" y="160" width="100" height="100" rx="4" class="comp-body ${selectedHotspot === 'relay' ? 'selected' : ''}" data-hotspot="relay" />
                <text x="470" y="208" class="comp-label">5V RELAY</text>
                <text x="470" y="226" class="comp-sublabel">OPTO ISOLATED</text>
              </g>

              <!-- Silkscreen Markings -->
              <g class="layer-silkscreen">
                <text x="60" y="60" class="silk-text font-mono">SUPEKAR ELECTRONICS // REV 1.2</text>
                <text x="60" y="78" class="silk-text font-mono">DESIGNED BY MOHITH M (ECE)</text>
                <rect x="68" y="238" width="54" height="44" class="silk-box" />
                <rect x="196" y="86" width="108" height="138" class="silk-box" />
                <rect x="416" y="66" width="88" height="53" class="silk-box" />
                <rect x="416" y="156" width="108" height="108" class="silk-box" />
              </g>
            </svg>
          </div>

          <!-- Selected Hotspot Detailed Rationale Card -->
          <div class="hotspot-detail-box">
            <div class="hotspot-meta">
              <span class="hotspot-type-tag">${hotspots[selectedHotspot].type}</span>
              <h4 class="hotspot-name">${hotspots[selectedHotspot].name}</h4>
            </div>
            <p class="hotspot-notes">${hotspots[selectedHotspot].notes}</p>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Bind mode toggle buttons
    container.querySelectorAll('.layer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeViewMode = btn.dataset.mode;
        render();
      });
    });

    // Bind hotspot clicks on components
    container.querySelectorAll('.comp-body').forEach(el => {
      el.addEventListener('click', () => {
        selectedHotspot = el.dataset.hotspot;
        render();
      });
    });
  };

  render();
}
