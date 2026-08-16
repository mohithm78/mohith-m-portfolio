// Interactive Visualizers for Technical Events & Project Exposure
// Realistic student-built engineering visualizers (Line-Following Robot & Smart Agriculture)

export function initEventVisualizers() {
  initLineFollowerVisualizer();
  initSmartAgricultureVisualizer();
}

// 1. PRAVRUTTI Line-Following Robot Interactive Visualizer
function initLineFollowerVisualizer() {
  const container = document.getElementById('vis-line-follower');
  if (!container) return;

  let state = {
    scenario: 'straight', // 'straight', 'left', 'right', 'off'
    leftSensor: false,    // true = on black line
    rightSensor: false,
    leftPwm: 80,
    rightPwm: 80,
    headingAngle: 0,
    trackOffset: 0
  };

  const updateState = (scenario) => {
    state.scenario = scenario;
    if (scenario === 'straight') {
      state.leftSensor = false;
      state.rightSensor = false;
      state.leftPwm = 80;
      state.rightPwm = 80;
      state.headingAngle = 0;
      state.trackOffset = 0;
    } else if (scenario === 'left') {
      state.leftSensor = true;
      state.rightSensor = false;
      state.leftPwm = 30;
      state.rightPwm = 95;
      state.headingAngle = -18;
      state.trackOffset = -22;
    } else if (scenario === 'right') {
      state.leftSensor = false;
      state.rightSensor = true;
      state.leftPwm = 95;
      state.rightPwm = 30;
      state.headingAngle = 18;
      state.trackOffset = 22;
    } else if (scenario === 'off') {
      state.leftSensor = true;
      state.rightSensor = true;
      state.leftPwm = 0;
      state.rightPwm = 0;
      state.headingAngle = 0;
      state.trackOffset = 0;
    }
    render();
  };

  const render = () => {
    container.innerHTML = `
      <div class="event-vis-card">
        <div class="vis-header">
          <div class="vis-title-group">
            <span class="vis-badge font-mono">PRAVRUTTI // HARDWARE SIGNAL & MOTOR DRIVE VISUALIZER</span>
            <h4>Line Tracking Control Loop: Sensors ➔ MCU ➔ Driver ➔ DC Motors</h4>
          </div>
          <div class="vis-status-tag ${state.scenario === 'off' ? 'tag-warn' : 'tag-ok'}">
            ${state.scenario === 'off' ? '⚠️ ALL SENSORS ACTIVE (T-JUNCTION / STOP)' : '🟢 DIFFERENTIAL DRIVE ACTIVE'}
          </div>
        </div>

        <div class="line-follower-grid">
          <!-- Left: Realistic Prototype SVG Schematic & Track -->
          <div class="vis-track-canvas-box">
            <svg class="line-track-svg" viewBox="0 0 280 200">
              <!-- Background Surface (White Test Arena) -->
              <rect x="0" y="0" width="280" height="200" fill="#070D18" stroke="#16243D" stroke-width="1.5" rx="6" />
              
              <!-- Black Tape Track Surface -->
              <path d="M 140 0 L 140 200" stroke="#00E5FF" stroke-width="18" stroke-opacity="0.25" />
              <path d="M 140 0 L 140 200" stroke="#030712" stroke-width="14" />
              
              <!-- Robot Chassis Group with dynamic offset & rotation -->
              <g transform="translate(${140 + state.trackOffset}, 100) rotate(${state.headingAngle})">
                <!-- Acrylic / PCB Chassis Base -->
                <rect x="-35" y="-45" width="70" height="90" rx="6" fill="#0B132B" stroke="#00E5FF" stroke-width="1.5" />
                
                <!-- Left DC Motor & Wheel -->
                <rect x="-44" y="-30" width="9" height="30" rx="2" fill="#334155" stroke="#38BDF8" stroke-width="1" />
                <!-- Right DC Motor & Wheel -->
                <rect x="35" y="-30" width="9" height="30" rx="2" fill="#334155" stroke="#38BDF8" stroke-width="1" />
                
                <!-- Caster Ball Wheel Rear -->
                <circle cx="0" cy="30" r="6" fill="#64748B" stroke="#94A3B8" stroke-width="1" />
                
                <!-- Microcontroller Board (Center) -->
                <rect x="-20" y="-15" width="40" height="30" rx="2" fill="#1E293B" stroke="#64748B" stroke-width="1" />
                <text x="0" y="4" fill="#38BDF8" font-size="6" font-family="monospace" text-anchor="middle">MCU CORE</text>
                
                <!-- L298N Motor Driver Module -->
                <rect x="-18" y="18" width="36" height="10" rx="1" fill="#1E293B" stroke="#F59E0B" stroke-width="1" />
                <text x="0" y="25" fill="#FBBF24" font-size="5" font-family="monospace" text-anchor="middle">L298N DRIVER</text>
                
                <!-- Front Sensor Bar -->
                <line x1="-28" y1="-45" x2="28" y2="-45" stroke="#64748B" stroke-width="2" />
                
                <!-- Left IR Sensor -->
                <circle cx="-16" cy="-45" r="4.5" fill="${state.leftSensor ? '#EF4444' : '#10B981'}" stroke="#F8FAFC" stroke-width="1" />
                <!-- Right IR Sensor -->
                <circle cx="16" cy="-45" r="4.5" fill="${state.rightSensor ? '#EF4444' : '#10B981'}" stroke="#F8FAFC" stroke-width="1" />
                
                <text x="-16" y="-53" fill="${state.leftSensor ? '#F87171' : '#34D399'}" font-size="6" font-family="monospace" text-anchor="middle">IR_L</text>
                <text x="16" y="-53" fill="${state.rightSensor ? '#F87171' : '#34D399'}" font-size="6" font-family="monospace" text-anchor="middle">IR_R</text>
              </g>
            </svg>
            <span class="track-caption font-mono">Differential Steering Prototype on Contrast Surface</span>
          </div>

          <!-- Right: Control Loop & Real-Time PWM Telemetry -->
          <div class="vis-telemetry-col">
            <div class="vis-scenario-buttons">
              <button class="sc-btn ${state.scenario === 'straight' ? 'active' : ''}" data-sc="straight">
                ▲ On Track (Centered)
              </button>
              <button class="sc-btn ${state.scenario === 'left' ? 'active' : ''}" data-sc="left">
                ◀ Drift Right ➔ Steer Left
              </button>
              <button class="sc-btn ${state.scenario === 'right' ? 'active' : ''}" data-sc="right">
                ▶ Drift Left ➔ Steer Right
              </button>
              <button class="sc-btn ${state.scenario === 'off' ? 'active' : ''}" data-sc="off">
                ◼ Cross Line / Stop
              </button>
            </div>

            <!-- Signal Flow Progression -->
            <div class="signal-flow-box">
              <div class="flow-step">
                <span class="flow-lbl font-mono">01. SENSORS</span>
                <span class="flow-val">IR_L: <strong class="${state.leftSensor ? 't-red' : 't-green'}">${state.leftSensor ? '1 (DARK)' : '0 (LIGHT)'}</strong> | IR_R: <strong class="${state.rightSensor ? 't-red' : 't-green'}">${state.rightSensor ? '1 (DARK)' : '0 (LIGHT)'}</strong></span>
              </div>
              <div class="flow-arrow">➔</div>
              <div class="flow-step">
                <span class="flow-lbl font-mono">02. MCU LOGIC</span>
                <span class="flow-val t-cyan">${state.scenario === 'straight' ? 'FORWARD RUN' : (state.scenario === 'left' ? 'CORRECT LEFT' : (state.scenario === 'right' ? 'CORRECT RIGHT' : 'BRAKE'))}</span>
              </div>
              <div class="flow-arrow">➔</div>
              <div class="flow-step">
                <span class="flow-lbl font-mono">03. MOTOR PWM</span>
                <span class="flow-val font-mono">L: ${state.leftPwm}% | R: ${state.rightPwm}%</span>
              </div>
            </div>

            <!-- Motor PWM Power Bars -->
            <div class="motor-pwm-bars">
              <div class="pwm-bar-item">
                <div class="pwm-info">
                  <span>Left DC Motor (L298N OUT1/2)</span>
                  <strong class="font-mono t-cyan">${state.leftPwm}% PWM</strong>
                </div>
                <div class="pwm-track">
                  <div class="pwm-fill" style="width: ${state.leftPwm}%;"></div>
                </div>
              </div>

              <div class="pwm-bar-item">
                <div class="pwm-info">
                  <span>Right DC Motor (L298N OUT3/4)</span>
                  <strong class="font-mono t-cyan">${state.rightPwm}% PWM</strong>
                </div>
                <div class="pwm-track">
                  <div class="pwm-fill" style="width: ${state.rightPwm}%;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('.sc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        updateState(btn.dataset.sc);
      });
    });
  };

  render();
}

// 2. Smart Agriculture State-Level Expo Interactive Visualizer
function initSmartAgricultureVisualizer() {
  const container = document.getElementById('vis-smart-agriculture');
  if (!container) return;

  let state = {
    soilMoisturePct: 24, // percentage
    threshold: 35,       // trigger below this
    pumpRelayOn: true,
    ambientTemp: 29.4,
    humidity: 58
  };

  const toggleSoilMoisture = (isDry) => {
    if (isDry) {
      state.soilMoisturePct = 22;
      state.pumpRelayOn = true;
    } else {
      state.soilMoisturePct = 68;
      state.pumpRelayOn = false;
    }
    render();
  };

  const render = () => {
    const isUnderThreshold = state.soilMoisturePct < state.threshold;

    container.innerHTML = `
      <div class="event-vis-card">
        <div class="vis-header">
          <div class="vis-title-group">
            <span class="vis-badge font-mono">STATE-LEVEL PROJECT EXPO // STALL 34 DEMONSTRATION</span>
            <h4>Agricultural Automation: Field Sensors ➔ Controller ➔ Relay ➔ Irrigation</h4>
          </div>
          <div class="vis-status-tag ${isUnderThreshold ? 'tag-warn' : 'tag-ok'}">
            ${isUnderThreshold ? '💧 IRRIGATION ACTIVE (MOISTURE LOW)' : '🟢 OPTIMAL SOIL MOISTURE'}
          </div>
        </div>

        <div class="smart-agri-grid">
          <!-- Left: Physical Prototype vs Project Concept Distinction -->
          <div class="agri-implementation-box">
            <div class="impl-header font-mono">
              <span class="t-cyan">PROTOTYPE IMPLEMENTATION MATRIX</span>
              <span class="impl-stall font-mono">STALL 34 • CIT BENGALURU</span>
            </div>

            <div class="impl-columns">
              <div class="impl-card actual">
                <span class="impl-tag font-mono">✓ IMPLEMENTED HARDWARE PROTOTYPE</span>
                <ul class="impl-list">
                  <li>Soil moisture sensor probe & resistive voltage divider interface</li>
                  <li>Microcontroller ADC sampling with calibration baseline</li>
                  <li>Optocoupled 5V relay driver circuit with flyback diode</li>
                  <li>Submersible mini-pump switching & benchtop crop zone testing</li>
                  <li>Local LED alert indicators for moisture threshold trigger</li>
                </ul>
              </div>

              <div class="impl-card concept">
                <span class="impl-tag font-mono">✦ PROJECT CONCEPT & ROADMAP</span>
                <ul class="impl-list">
                  <li>Multi-node mesh telemetry across distributed crop acreage</li>
                  <li>Solar-powered harvester gateway with LiFePO4 battery</li>
                  <li>Cellular IoT cloud synchronization for farmer dashboard</li>
                  <li>Predictive weather integration to minimize unnecessary pumping</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Right: Interactive Sensor & Relay State Engine -->
          <div class="agri-controls-box">
            <div class="agri-state-meters">
              <div class="agri-meter">
                <span class="meter-label">Soil Moisture Content</span>
                <div class="meter-value font-mono ${isUnderThreshold ? 't-red' : 't-green'}">${state.soilMoisturePct}%</div>
                <span class="meter-sub">Trip Point: &lt; ${state.threshold}% Moisture</span>
              </div>

              <div class="agri-meter">
                <span class="meter-label">Submersible Pump Relay</span>
                <div class="meter-value font-mono ${isUnderThreshold ? 't-cyan' : 't-dim'}">${isUnderThreshold ? 'RELAY CLOSED (PUMP ON)' : 'RELAY OPEN (IDLE)'}</div>
                <span class="meter-sub">5V Optocoupled Trigger</span>
              </div>
            </div>

            <div class="agri-buttons-group">
              <button id="btn-agri-dry" class="sim-btn ${isUnderThreshold ? 'btn-trigger' : 'btn-reset'}">
                ☀️ Simulate Arid/Dry Soil (22%) ➔ Trigger Pump
              </button>
              <button id="btn-agri-wet" class="sim-btn ${!isUnderThreshold ? 'btn-trigger' : 'btn-reset'}">
                🌧️ Simulate Post-Rain Moist Soil (68%) ➔ Shut Off
              </button>
            </div>

            <div class="agri-collaborators-bar font-mono">
              <span><strong>Team:</strong> Dhanya, Bindu, Mohith M</span>
              <span><strong>Mentor:</strong> Prof. Chandrakala</span>
              <span><strong>Recognition:</strong> Certificate of Participation</span>
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#btn-agri-dry')?.addEventListener('click', () => toggleSoilMoisture(true));
    container.querySelector('#btn-agri-wet')?.addEventListener('click', () => toggleSoilMoisture(false));
  };

  render();
}
