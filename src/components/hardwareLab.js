// Hardware Lab Engineering Workflow Pipeline Component
// Visualizing: Design -> Build -> Debug -> Validate
import { LAB_WORKFLOW_STEPS } from '../data/portfolioData.js';

export function renderHardwareLab(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let activeStepIdx = 0;

  const render = () => {
    const activeStep = LAB_WORKFLOW_STEPS[activeStepIdx];

    let html = `
      <div class="lab-pipeline-container">
        <!-- Step Navigation Bar -->
        <div class="pipeline-stepper-bar">
          ${LAB_WORKFLOW_STEPS.map((step, idx) => `
            <button class="stepper-tab ${idx === activeStepIdx ? 'active' : ''} ${idx < activeStepIdx ? 'completed' : ''}" data-index="${idx}">
              <div class="tab-indicator">
                <span class="tab-num">${step.step}</span>
                <span class="tab-connector"></span>
              </div>
              <div class="tab-meta">
                <span class="tab-phase">${step.phase}</span>
                <span class="tab-tool">${step.tool}</span>
              </div>
            </button>
          `).join('')}
        </div>

        <!-- Active Stage Spotlight Card -->
        <div class="pipeline-detail-card">
          <div class="detail-header">
            <div class="detail-badge-group">
              <span class="detail-step-chip">STAGE 0${activeStepIdx + 1} OF 06</span>
              <span class="detail-badge">${activeStep.badge}</span>
            </div>
            <div class="detail-tool-chip">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
              <span>Toolchain: <strong>${activeStep.tool}</strong></span>
            </div>
          </div>

          <div class="detail-main-content">
            <h3 class="detail-phase-title">${activeStep.phase}</h3>
            <p class="detail-description">${activeStep.detail}</p>
          </div>

          <div class="detail-specs-grid">
            <div class="spec-block">
              <span class="spec-label">Stage Deliverable</span>
              <span class="spec-value t-cyan">${activeStep.output}</span>
            </div>
            <div class="spec-block">
              <span class="spec-label">Quality Metric</span>
              <span class="spec-value t-green">Zero Electrical Violations (ERC / DRC Pass)</span>
            </div>
            <div class="spec-block">
              <span class="spec-label">Verification Mode</span>
              <span class="spec-value">In-Circuit & Benchtop Instrumentation</span>
            </div>
          </div>

          <!-- Interactive Code/Schematic Preview Snippet corresponding to stage -->
          <div class="detail-code-preview">
            <div class="code-preview-bar">
              <span class="preview-filename">
                ${activeStepIdx === 0 ? 'sensor_node_schematic.kicad_sch' : ''}
                ${activeStepIdx === 1 ? 'stm32f4_i2c_driver.c' : ''}
                ${activeStepIdx === 2 ? 'breadboard_rail_verification.log' : ''}
                ${activeStepIdx === 3 ? 'saleae_logic_trace_i2c.csv' : ''}
                ${activeStepIdx === 4 ? 'openocd_gdb_debug_session.gdb' : ''}
                ${activeStepIdx === 5 ? 'system_burnin_stress_report.md' : ''}
              </span>
              <span class="preview-status">SYNTAX OK</span>
            </div>
            <pre class="preview-code-body"><code>${getStageCodeSnippet(activeStepIdx)}</code></pre>
          </div>

          <div class="detail-footer-actions">
            <button id="btn-prev-step" class="pipeline-nav-btn" ${activeStepIdx === 0 ? 'disabled' : ''}>
              ← Previous Phase
            </button>
            <div class="pipeline-progress-text">
              Design → Build → Debug → Validate
            </div>
            <button id="btn-next-step" class="pipeline-nav-btn primary" ${activeStepIdx === LAB_WORKFLOW_STEPS.length - 1 ? 'disabled' : ''}>
              Next Phase →
            </button>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Bind event listeners
    container.querySelectorAll('.stepper-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeStepIdx = parseInt(tab.dataset.index, 10);
        render();
      });
    });

    container.querySelector('#btn-prev-step')?.addEventListener('click', () => {
      if (activeStepIdx > 0) {
        activeStepIdx--;
        render();
      }
    });

    container.querySelector('#btn-next-step')?.addEventListener('click', () => {
      if (activeStepIdx < LAB_WORKFLOW_STEPS.length - 1) {
        activeStepIdx++;
        render();
      }
    });
  };

  render();
}

function getStageCodeSnippet(stepIdx) {
  switch (stepIdx) {
    case 0:
      return `(kicad_sch (version 20231120) (generator eeschema)
  (symbol "MCU_ESP32_WROOM32" (pin "3V3" (type power_in))
    (pin "GND" (type power_in)) (pin "IO21_SDA" (type bidirectional))
    (pin "IO22_SCL" (type bidirectional)))
  (symbol "R_PULLUP_SDA" (value "4.7k") (footprint "Resistor_SMD:R_0805"))
  (symbol "C_DECOUPLING" (value "100nF") (footprint "Capacitor_SMD:C_0805")))`;
    case 1:
      return `/* STM32 HAL I2C Sensor Driver & Interrupt Setup */
static void MX_I2C1_Init(void) {
  hi2c1.Instance = I2C1;
  hi2c1.Init.ClockSpeed = 100000; // 100 kHz Standard Mode
  hi2c1.Init.DutyCycle = I2C_DUTYCYCLE_2;
  hi2c1.Init.OwnAddress1 = 0;
  hi2c1.Init.AddressingMode = I2C_ADDRESSINGMODE_7BIT;
  if (HAL_I2C_Init(&hi2c1) != HAL_OK) {
    Error_Handler();
  }
}`;
    case 2:
      return `[BENCHTOP DMM TEST]
VCC_3V3 Rail: 3.308 V (Tolerance +/- 1.2% OK)
VCC_5V0 Rail: 5.012 V (Tolerance +/- 0.4% OK)
GND Continuity: 0.04 Ohms (Solid ground plane)
Pull-Up Voltage (SDA): 3.30 V (Passive high level verified)`;
    case 3:
      return `// 8-Channel Logic Analyzer Trace Decode (I2C Standard 100kHz)
[0.002341s] START condition asserted (SDA falling while SCL high)
[0.002352s] Packet Addr: 0x68 [MPU6050] WRITE -> ACK received
[0.002364s] Register Pointer: 0x75 (WHO_AM_I) -> ACK received
[0.002375s] REPEATED START -> Addr: 0x68 READ -> ACK received
[0.002386s] Data Byte: 0x68 -> NACK received by master (Valid frame end)`;
    case 4:
      return `(gdb) target remote localhost:3333
(gdb) monitor reset halt
(gdb) break main.c:48
(gdb) continue
Breakpoint 1, main () at main.c:48
(gdb) print/x hi2c1.Instance->SR1
$1 = 0x0002 /* I2C_FLAG_ADDR: Address sent & ACK received */`;
    case 5:
      return `[SYSTEM VALIDATION REPORT]
Continuous Runtime: 72 hours under thermal cyclic chamber
Packet Loss Rate: 0.000% (414,720 / 414,720 packets acknowledged)
Power Draw (Active RF Transmit): 142 mA @ 3.3V
Power Draw (Deep Sleep Mode): 14 uA @ 3.3V
Result: Passed all stress testing parameters.`;
    default:
      return `// Hardware Workflow Stage Initialized`;
  }
}
