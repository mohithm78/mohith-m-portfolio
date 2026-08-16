// Interactive Project Simulators & Dynamic Visualizers
// Embedded engineering widgets & software digital twin demonstrating real system behaviors

export function initProjectSimulators() {
  initGeofenceSimulator();
  initTelemetrySimulator();
  initWasteDigitalTwinSimulator();
  initBlackBoxSimulator();
  initSolarSimulator();
  initArbiterSimulator();
}

// 1. Smart Livestock GPS Geofence & GSM SMS Simulator (VVCE Hackathon)
function initGeofenceSimulator() {
  const container = document.getElementById('sim-geofence');
  if (!container) return;

  let state = {
    distance: 42,
    threshold: 80,
    lat: 13.0124,
    lng: 77.7042,
    isBreached: false,
    smsCount: 0
  };

  const render = () => {
    const isBreach = state.distance > state.threshold;
    container.innerHTML = `
      <div class="sim-card-inner">
        <div class="sim-header">
          <div class="sim-title-group">
            <span class="sim-chip">VVCE HACKATHON HARDWARE PROTOTYPE</span>
            <h4>GPS Geofence & Cellular Alert Engine</h4>
          </div>
          <span class="sim-status-badge ${isBreach ? 'breach' : 'normal'}">
            ${isBreach ? '⚠️ GEOFENCE BREACH DETECTED' : '🟢 BOUNDARY SECURED'}
          </span>
        </div>

        <div class="sim-geofence-layout">
          <!-- Radar / Geofence Canvas representation -->
          <div class="geofence-radar-wrap">
            <svg class="geofence-radar-svg" viewBox="0 0 200 200">
              <!-- Grid circles -->
              <circle cx="100" cy="100" r="85" class="radar-grid" />
              <circle cx="100" cy="100" r="55" class="radar-grid" />
              <circle cx="100" cy="100" r="25" class="radar-grid" />
              <!-- Safe Boundary Radius -->
              <circle cx="100" cy="100" r="65" class="radar-boundary ${isBreach ? 'breach' : ''}" />
              <!-- Center Base Station -->
              <circle cx="100" cy="100" r="5" class="radar-base" />
              <text x="100" y="118" class="radar-label" text-anchor="middle">BASE STATION</text>
              <!-- Livestock GPS Node -->
              <g class="radar-node-group" style="transform: translate(${100 + (state.distance * 0.9)}px, 100px);">
                <circle cx="0" cy="0" r="6" class="radar-node ${isBreach ? 'breach' : ''}" />
                <circle cx="0" cy="0" r="14" class="radar-node-pulse ${isBreach ? 'breach' : ''}" />
              </g>
            </svg>
            <div class="radar-telemetry-overlay">
              <span>DISTANCE: <strong>${state.distance}m</strong> / Max ${state.threshold}m</span>
              <span>GPS: ${state.lat.toFixed(4)}°N, ${state.lng.toFixed(4)}°E</span>
            </div>
          </div>

          <!-- Simulation Controls & Simulated SMS / Telemetry output -->
          <div class="geofence-controls-wrap">
            <div class="sim-control-actions">
              <button id="btn-toggle-breach" class="sim-btn ${isBreach ? 'btn-reset' : 'btn-trigger'}">
                ${isBreach ? '↺ Reset Inside Boundary (42m)' : '🚨 Simulate Straying Beyond Boundary (96m)'}
              </button>
            </div>

            <!-- Simulated Hardware Terminal & SMS Display -->
            <div class="sim-device-terminal">
              <div class="terminal-bar">
                <span class="terminal-dot red"></span>
                <span class="terminal-dot yellow"></span>
                <span class="terminal-dot green"></span>
                <span class="terminal-title">SIM800L UART CONSOLE & MQTT BUS (VVCE Prototype)</span>
              </div>
              <div class="terminal-content">
                <div class="terminal-line"><span class="t-dim">[UART2-GPS]:</span> $GPGGA,123519,${state.lat.toFixed(4)},N,${state.lng.toFixed(4)},E,1,08,0.9,545.4,M*47</div>
                <div class="terminal-line"><span class="t-dim">[ESP32-CORE]:</span> Haversine Distance Calc = <span class="${isBreach ? 't-red' : 't-cyan'}">${state.distance} meters</span></div>
                ${isBreach ? `
                  <div class="terminal-line t-warn">[INT-TRIGGER]: Geofence threshold exceeded (> ${state.threshold}m)!</div>
                  <div class="terminal-line t-cyan">[UART1-GSM]: AT+CMGS="+919876543210"</div>
                  <div class="terminal-line t-green">> ALERT: Livestock #04 outside perimeter! Pos: 13.0138N, 77.7061E [SMS Dispatched]</div>
                  <div class="terminal-line t-dim">[MQTT-PUB]: topic: "farm/alerts/node04" {"status":"BREACH","dist":96}</div>
                ` : `
                  <div class="terminal-line t-green">[STATUS]: Within permitted grazing zone. Periodic telemetry active.</div>
                `}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const btn = container.querySelector('#btn-toggle-breach');
    if (btn) {
      btn.addEventListener('click', () => {
        if (state.distance > state.threshold) {
          state.distance = 42;
          state.lat = 13.0124;
          state.lng = 77.7042;
        } else {
          state.distance = 96;
          state.lat = 13.0138;
          state.lng = 77.7061;
          state.smsCount++;
        }
        render();
      });
    }
  };

  render();
}

// 2. Edge AI Industrial Safety Robot Telemetry Simulator (Final-Year Project)
function initTelemetrySimulator() {
  const container = document.getElementById('sim-telemetry');
  if (!container) return;

  let state = {
    gasLevel: 142, // PPM
    flameDetected: false,
    obstacleDist: 84, // cm
    aiConfidence: 12,
    alarmSuppressed: true
  };

  const render = () => {
    container.innerHTML = `
      <div class="sim-card-inner">
        <div class="sim-header">
          <div class="sim-title-group">
            <span class="sim-chip">FINAL-YEAR CAPSTONE // DUAL-TIER ARCHITECTURE</span>
            <h4>ESP32 Real-Time Sensor Bus & Raspberry Pi Edge Cross-Validation</h4>
          </div>
          <span class="sim-status-badge ${state.gasLevel > 350 ? 'breach' : 'normal'}">
            ${state.gasLevel > 350 ? '⚠️ HAZARD ALERT (MULTI-SENSOR VERIFIED)' : '🟢 WORKSPACE MONITORED'}
          </span>
        </div>

        <div class="sim-telemetry-grid">
          <!-- Sensor Meters -->
          <div class="telemetry-gauge-card">
            <div class="gauge-label">
              <span>MQ-2 Combustible Gas Sensor</span>
              <strong class="${state.gasLevel > 300 ? 't-red' : 't-cyan'}">${state.gasLevel} PPM</strong>
            </div>
            <div class="gauge-track">
              <div class="gauge-fill ${state.gasLevel > 300 ? 'fill-red' : 'fill-cyan'}" style="width: ${Math.min(100, (state.gasLevel / 500) * 100)}%;"></div>
            </div>
            <span class="gauge-sub">ESP32 12-bit ADC Sampling</span>
          </div>

          <div class="telemetry-gauge-card">
            <div class="gauge-label">
              <span>IR Flame Sensor Array</span>
              <strong class="${state.flameDetected ? 't-red' : 't-green'}">${state.flameDetected ? 'FLAME SENSE' : 'CLEAR'}</strong>
            </div>
            <div class="gauge-track">
              <div class="gauge-fill ${state.flameDetected ? 'fill-red' : 'fill-green'}" style="width: ${state.flameDetected ? '100%' : '5%'};"></div>
            </div>
            <span class="gauge-sub">ESP32 EXTI GPIO Interrupt</span>
          </div>

          <div class="telemetry-gauge-card">
            <div class="gauge-label">
              <span>HC-SR04 Sonar Proximity</span>
              <strong>${state.obstacleDist} cm</strong>
            </div>
            <div class="gauge-track">
              <div class="gauge-fill fill-blue" style="width: ${Math.min(100, (state.obstacleDist / 200) * 100)}%;"></div>
            </div>
            <span class="gauge-sub">Motor Driver Obstacle Avoidance</span>
          </div>

          <div class="telemetry-gauge-card">
            <div class="gauge-label">
              <span>Raspberry Pi Edge Vision Check</span>
              <strong class="${state.aiConfidence > 75 ? 't-red' : 't-cyan'}">${state.aiConfidence}% Corroboration</strong>
            </div>
            <div class="gauge-track">
              <div class="gauge-fill ${state.aiConfidence > 75 ? 'fill-red' : 'fill-cyan'}" style="width: ${state.aiConfidence}%;"></div>
            </div>
            <span class="gauge-sub">OpenCV Vision Script</span>
          </div>
        </div>

        <div class="sim-footer-controls">
          <div class="sim-btn-group">
            <button id="btn-gas-spike" class="sim-btn btn-trigger">🔥 Simulate Gas & Thermal Hazard Event</button>
            <button id="btn-gas-clear" class="sim-btn btn-reset">↺ Reset Normal Ambient Levels</button>
          </div>
          <div class="sim-insight-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <span>Multi-sensor cross-check reduces false alerts by requiring both sensor spike and visual verification.</span>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#btn-gas-spike')?.addEventListener('click', () => {
      state.gasLevel = 420;
      state.flameDetected = true;
      state.aiConfidence = 88;
      state.alarmSuppressed = false;
      render();
    });

    container.querySelector('#btn-gas-clear')?.addEventListener('click', () => {
      state.gasLevel = 142;
      state.flameDetected = false;
      state.aiConfidence = 12;
      state.alarmSuppressed = true;
      render();
    });
  };

  render();
}

// 3. Smart Waste Management System — Digital Twin Simulator (GITAM Hackathon Best Idea Award)
function initWasteDigitalTwinSimulator() {
  const container = document.getElementById('sim-waste-digital-twin');
  if (!container) return;

  let state = {
    bins: [
      { id: "BIN_01", location: "Central Ward A", fill: 88, status: "CRITICAL" },
      { id: "BIN_02", location: "Market Complex", fill: 42, status: "NORMAL" },
      { id: "BIN_03", location: "Hospital Zone", fill: 94, status: "CRITICAL" },
      { id: "BIN_04", location: "Residential Sector 4", fill: 18, status: "LOW" },
      { id: "BIN_05", location: "Metro Station North", fill: 82, status: "CRITICAL" },
      { id: "BIN_06", location: "Tech Park West", fill: 35, status: "NORMAL" }
    ],
    ghostTruckDispatched: false,
    routeGenerated: false,
    simTimeHour: 14
  };

  const render = () => {
    const criticalBins = state.bins.filter(b => b.fill >= 75);

    container.innerHTML = `
      <div class="sim-card-inner">
        <div class="sim-header">
          <div class="sim-title-group">
            <span class="sim-chip">100% SOFTWARE DIGITAL TWIN // GITAM HACKATHON BEST IDEA</span>
            <h4>Stochastic Waste Generation & Dynamic OSRM Route Optimization</h4>
          </div>
          <span class="sim-status-badge ${criticalBins.length > 0 ? 'breach' : 'normal'}">
            ${criticalBins.length > 0 ? `🚨 ${criticalBins.length} BINS OVERFLOW THRESHOLD (>75%)` : '🟢 ALL BINS WITHIN NORMAL CAPACITY'}
          </span>
        </div>

        <div class="digital-twin-grid-layout">
          <!-- Virtual Map & Bin Status Grid -->
          <div class="digital-twin-bins-col">
            <div class="dt-bins-header">
              <span class="dt-col-title">Simulated City Waste Collection Network (Time: ${state.simTimeHour}:00 hrs)</span>
              <span class="dt-badge">Firebase / Firestore Live State Sync</span>
            </div>
            
            <div class="dt-bins-list">
              ${state.bins.map(bin => {
                const isCrit = bin.fill >= 75;
                return `
                  <div class="dt-bin-item ${isCrit ? 'bin-crit' : ''}">
                    <div class="bin-item-info">
                      <strong class="bin-id font-mono">${bin.id}</strong>
                      <span class="bin-loc">${bin.location}</span>
                    </div>
                    <div class="bin-fill-bar-wrap">
                      <div class="bin-fill-bar ${isCrit ? 'fill-red' : (bin.fill > 40 ? 'fill-blue' : 'fill-green')}" style="width: ${bin.fill}%;"></div>
                    </div>
                    <span class="bin-fill-pct font-mono ${isCrit ? 't-red' : 't-cyan'}">${bin.fill}%</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- OSRM Route Dispatch & Analytics Col -->
          <div class="digital-twin-controls-col">
            <div class="dt-actions-group">
              <button id="btn-stochastic-tick" class="sim-btn btn-trigger">
                ⏳ Step Simulation Time (+2 hrs Stochastic Generation)
              </button>
              <button id="btn-dispatch-ghost-truck" class="sim-btn btn-trigger ${state.routeGenerated ? 'btn-reset' : ''}">
                🚛 ${state.routeGenerated ? '↺ Empty Critical Bins & Reset' : '📍 Compute OSRM Dynamic VRP Route'}
              </button>
            </div>

            <!-- Dynamic Route Visualizer Output -->
            <div class="dt-route-summary-box">
              <div class="route-box-header">
                <span class="font-mono t-cyan">OSRM ALGORITHMIC ROUTE DISPATCH</span>
                <span class="route-mode-pill">${state.routeGenerated ? 'ROUTE CALCULATED (TSP)' : 'STATIC PATROL'}</span>
              </div>
              <div class="route-box-body font-mono">
                ${state.routeGenerated ? `
                  <div class="t-green">✓ Optimized Collection Sequence Generated:</div>
                  <div class="t-cyan">> Depot ➔ BIN_03 (94%) ➔ BIN_01 (88%) ➔ BIN_05 (82%) ➔ Depot</div>
                  <div class="t-dim">> Total Path Distance: 11.4 km | Est. Time: 24 mins</div>
                  <div class="t-dim">> Fuel Reduction vs Fixed Route: ~34.2%</div>
                  <div class="t-green">> Simulated Ghost Truck Dispatched via Leaflet Map!</div>
                ` : `
                  <div class="t-dim">// Click "Compute OSRM Dynamic VRP Route" to calculate shortest path visiting only overflowing nodes.</div>
                  <div class="t-dim">// Architecture: Simulation Engine ➔ Dashboard ➔ Firebase ➔ Maps ➔ Route Optimization.</div>
                  <div class="t-dim">// Future Enhancement: Physical IoT LoRaWAN/MQTT sensor node integration.</div>
                `}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#btn-stochastic-tick')?.addEventListener('click', () => {
      state.simTimeHour = (state.simTimeHour + 2) % 24;
      state.bins.forEach(bin => {
        const delta = Math.floor(Math.random() * 18) + 4;
        bin.fill = Math.min(100, bin.fill + delta);
      });
      render();
    });

    container.querySelector('#btn-dispatch-ghost-truck')?.addEventListener('click', () => {
      if (state.routeGenerated) {
        state.bins.forEach(bin => {
          if (bin.fill >= 75) bin.fill = Math.floor(Math.random() * 15) + 5;
        });
        state.routeGenerated = false;
      } else {
        state.routeGenerated = true;
      }
      render();
    });
  };

  render();
}

// 4. Automobile Black Box & Alcohol Lockout Simulator (3rd Semester Project)
function initBlackBoxSimulator() {
  const container = document.getElementById('sim-blackbox');
  if (!container) return;

  let state = {
    bacLevel: 0.01,
    gForce: 1.0,
    ignitionLocked: false,
    eepromRecords: [
      { id: "0x00A0", timestamp: "10:14:02", gforce: "1.02G", bac: "0.01%", status: "NORMAL_RUN" }
    ]
  };

  const render = () => {
    container.innerHTML = `
      <div class="sim-card-inner">
        <div class="sim-header">
          <div class="sim-title-group">
            <span class="sim-chip">ACADEMIC PROJECT // 3RD SEMESTER</span>
            <h4>Alcohol Interlock & G-Force Crash Logger</h4>
          </div>
          <span class="sim-status-badge ${state.ignitionLocked ? 'breach' : 'normal'}">
            ${state.ignitionLocked ? '🔒 IGNITION RELAY: LOCKED' : '⚡ IGNITION RELAY: ARMED / READY'}
          </span>
        </div>

        <div class="sim-blackbox-layout">
          <div class="blackbox-dials">
            <div class="dial-item">
              <span class="dial-title">MQ-3 Breath Alcohol Sensor</span>
              <div class="dial-value ${state.bacLevel >= 0.08 ? 't-red' : 't-cyan'}">${state.bacLevel.toFixed(2)}% Level</div>
              <span class="dial-sub">Lockout Threshold: > 0.08%</span>
            </div>

            <div class="dial-item">
              <span class="dial-title">MPU-6050 Peak G-Force</span>
              <div class="dial-value ${state.gForce > 3.5 ? 't-red' : 't-cyan'}">${state.gForce.toFixed(1)} G</div>
              <span class="dial-sub">Crash Threshold: > 3.5G</span>
            </div>
          </div>

          <div class="blackbox-actions">
            <button id="btn-test-alcohol" class="sim-btn ${state.bacLevel >= 0.08 ? 'btn-reset' : 'btn-trigger'}">
              ${state.bacLevel >= 0.08 ? '↺ Reset Driver Breath (0.01%)' : '🍺 Test Alcohol Detection (0.12%)'}
            </button>
            <button id="btn-trigger-crash" class="sim-btn btn-trigger">
              💥 Trigger Sudden 4.8G Impact Shockwave
            </button>
          </div>

          <!-- Non-Volatile EEPROM Memory View -->
          <div class="eeprom-viewer">
            <div class="eeprom-header">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/></svg>
              <span>24C32 Non-Volatile EEPROM Circular Event Buffer</span>
            </div>
            <div class="eeprom-table-wrap">
              <table class="eeprom-table">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Time</th>
                    <th>Peak Vector</th>
                    <th>Alcohol Reading</th>
                    <th>Relay Event</th>
                  </tr>
                </thead>
                <tbody>
                  ${state.eepromRecords.map(rec => `
                    <tr>
                      <td class="font-mono t-cyan">${rec.id}</td>
                      <td>${rec.timestamp}</td>
                      <td class="font-mono">${rec.gforce}</td>
                      <td class="font-mono">${rec.bac}</td>
                      <td><span class="log-tag ${rec.status.includes('LOCK') || rec.status.includes('CRASH') ? 'tag-warn' : 'tag-ok'}">${rec.status}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#btn-test-alcohol')?.addEventListener('click', () => {
      if (state.bacLevel >= 0.08) {
        state.bacLevel = 0.01;
        state.ignitionLocked = false;
      } else {
        state.bacLevel = 0.12;
        state.ignitionLocked = true;
        state.eepromRecords.unshift({
          id: `0x00${(state.eepromRecords.length * 16).toString(16).toUpperCase().padStart(2, '0')}`,
          timestamp: new Date().toTimeString().split(' ')[0],
          gforce: "1.04G",
          bac: "0.12%",
          status: "ALCOHOL_LOCKOUT"
        });
      }
      render();
    });

    container.querySelector('#btn-trigger-crash')?.addEventListener('click', () => {
      state.gForce = 4.8;
      state.eepromRecords.unshift({
        id: `0x00${(state.eepromRecords.length * 16).toString(16).toUpperCase().padStart(2, '0')}`,
        timestamp: new Date().toTimeString().split(' ')[0],
        gforce: "4.82G",
        bac: `${state.bacLevel.toFixed(2)}%`,
        status: "CRASH_EVENT_SAVED"
      });
      render();
      setTimeout(() => {
        state.gForce = 1.0;
        render();
      }, 2500);
    });
  };

  render();
}

// 5. Lightning Surge & Solar Harvester Simulator (4th Year Project)
function initSolarSimulator() {
  const container = document.getElementById('sim-solar');
  if (!container) return;

  let state = {
    pvVoltage: 4.18,
    chargingCurrent: 320, // mA
    surgeDetected: false,
    relayClosed: true
  };

  const render = () => {
    container.innerHTML = `
      <div class="sim-card-inner">
        <div class="sim-header">
          <div class="sim-title-group">
            <span class="sim-chip">ACADEMIC PROJECT // 4TH YEAR</span>
            <h4>STM32 Solar Harvester & Electrical Parameter Monitor</h4>
          </div>
          <span class="sim-status-badge ${state.surgeDetected ? 'breach' : 'normal'}">
            ${state.surgeDetected ? '⚡ SURGE DISSIPATED // SAFE ISOLATION' : '☀️ HARVESTING ACTIVE'}
          </span>
        </div>

        <div class="sim-solar-layout">
          <!-- 16x2 Character LCD Emulator -->
          <div class="lcd-screen-wrap">
            <div class="lcd-bezel">
              <div class="lcd-glass">
                <div class="lcd-row">PV:${state.pvVoltage.toFixed(2)}V I:${state.chargingCurrent}mA</div>
                <div class="lcd-row">${state.surgeDetected ? 'SURGE! RELAY:TRIP' : 'BAT:94% HARVEST:OK'}</div>
              </div>
            </div>
            <span class="lcd-spec-label">I2C (0x27) PCF8574 Backpack @ 100kHz</span>
          </div>

          <div class="solar-controls">
            <button id="btn-surge-test" class="sim-btn btn-trigger">
              ⚡ Inject High-Voltage Transient Spike (TVS Test)
            </button>
            <div class="solar-stats">
              <div class="stat-row">
                <span>TP4056 Mode:</span>
                <strong class="t-cyan">CC/CV Charging</strong>
              </div>
              <div class="stat-row">
                <span>ADC1 DMA Rate:</span>
                <strong class="t-cyan">10 kHz Scan Rate</strong>
              </div>
              <div class="stat-row">
                <span>Surge Trip Time:</span>
                <strong class="t-green">&lt; 0.85 ms Fast EXTI</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#btn-surge-test')?.addEventListener('click', () => {
      state.surgeDetected = true;
      state.pvVoltage = 5.85;
      render();
      setTimeout(() => {
        state.surgeDetected = false;
        state.pvVoltage = 4.18;
        render();
      }, 3000);
    });
  };

  render();
}

// 6. Priority-Based Token Passing Arbiter Waveform Simulator (5th Semester Project)
function initArbiterSimulator() {
  const container = document.getElementById('sim-arbiter');
  if (!container) return;

  let state = {
    clockCycle: 1,
    requests: [false, true, false, true], // Agents 0, 1, 2, 3
    tokenHolder: 1,
    priorityOverride: false,
    grants: [false, true, false, false],
    history: [
      { clk: 1, reqs: "0101", token: 1, gnt: "0100" }
    ]
  };

  const stepClock = () => {
    state.clockCycle++;

    // Calculate next grant based on requests & token
    let nextGrant = [false, false, false, false];
    let nextToken = state.tokenHolder;

    if (state.priorityOverride && state.requests[0]) {
      // Priority agent 0 override
      nextGrant[0] = true;
      nextToken = 0;
    } else {
      // Round robin search starting from token holder
      let granted = false;
      for (let offset = 0; offset < 4; offset++) {
        const candidate = (state.tokenHolder + offset) % 4;
        if (state.requests[candidate]) {
          nextGrant[candidate] = true;
          nextToken = (candidate + 1) % 4;
          granted = true;
          break;
        }
      }
      if (!granted) {
        nextToken = (state.tokenHolder + 1) % 4;
      }
    }

    state.grants = nextGrant;
    state.tokenHolder = nextToken;

    state.history.push({
      clk: state.clockCycle,
      reqs: state.requests.map(r => r ? '1' : '0').join(''),
      token: state.tokenHolder,
      gnt: state.grants.map(g => g ? '1' : '0').join('')
    });

    if (state.history.length > 8) {
      state.history.shift();
    }

    render();
  };

  const render = () => {
    container.innerHTML = `
      <div class="sim-card-inner">
        <div class="sim-header">
          <div class="sim-title-group">
            <span class="sim-chip">ACADEMIC PROJECT // 5TH SEMESTER VERILOG RTL</span>
            <h4>Round-Robin + Priority Override Arbiter Waveform</h4>
          </div>
          <span class="sim-status-badge normal">
            ⏱️ CLK CYCLE #${state.clockCycle} // TOKEN @ AGENT #${state.tokenHolder}
          </span>
        </div>

        <div class="sim-arbiter-layout">
          <!-- Request line toggles -->
          <div class="arbiter-inputs-bar">
            <span class="inputs-title">Toggle Bus Master Requests (Req[3:0]):</span>
            <div class="req-toggles">
              ${[0, 1, 2, 3].map(i => `
                <button class="req-toggle-btn ${state.requests[i] ? 'active' : ''}" data-idx="${i}">
                  <span>REQ_${i}</span>
                  <strong>${state.requests[i] ? '1 (ASSERTED)' : '0 (IDLE)'}</strong>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Digital Timing Waveform Canvas / SVG -->
          <div class="waveform-box">
            <div class="waveform-header">
              <span class="font-mono t-cyan">DIGITAL TIMING DIAGRAM (ModelSim Synthesized RTL)</span>
              <button id="btn-step-clock" class="sim-btn btn-trigger">▶ Step Clock Edge (+1 CLK)</button>
            </div>
            <div class="waveform-lanes">
              <div class="wave-lane">
                <span class="lane-label">CLK</span>
                <div class="lane-pulses clk-pulse">
                  ${Array.from({ length: 8 }).map(() => `<span class="pulse-sq"></span>`).join('')}
                </div>
              </div>
              <div class="wave-lane">
                <span class="lane-label">GRANT</span>
                <div class="lane-pulses">
                  ${state.grants.map((g, idx) => `
                    <span class="gnt-pill ${g ? 'gnt-active' : ''}">Agent ${idx}: ${g ? 'GRANTED' : 'WAIT'}</span>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Cycle History Table -->
          <div class="arbiter-table-wrap">
            <table class="eeprom-table">
              <thead>
                <tr>
                  <th>Cycle</th>
                  <th>Req Vector [3:0]</th>
                  <th>Token Pos</th>
                  <th>Grant Vector [3:0]</th>
                  <th>Arbitration Policy</th>
                </tr>
              </thead>
              <tbody>
                ${state.history.map(h => `
                  <tr>
                    <td class="font-mono t-cyan">#${h.clk}</td>
                    <td class="font-mono">${h.reqs}</td>
                    <td class="font-mono">Agent ${h.token}</td>
                    <td class="font-mono t-green">${h.gnt}</td>
                    <td><span class="log-tag tag-ok">STARVATION-FREE</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('.req-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        state.requests[idx] = !state.requests[idx];
        render();
      });
    });

    container.querySelector('#btn-step-clock')?.addEventListener('click', stepClock);
  };

  render();
}
