// Debugging Mindset & Interactive Fault Tree Simulator Component
// Demonstrating: Observe -> Isolate -> Debug -> Test -> Validate
import { DEBUGGING_METHODOLOGY } from '../data/portfolioData.js';

export function renderFaultDebugger(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let activeScenarioIdx = 0;
  let activeStepProgress = 1; // 1 to 5 steps revealed

  const render = () => {
    const scenario = DEBUGGING_METHODOLOGY.simulationScenarios[activeScenarioIdx];

    let html = `
      <div class="debugging-mindset-wrap">
        <!-- 5-Step Core Methodology Row -->
        <div class="methodology-steps-row">
          ${DEBUGGING_METHODOLOGY.framework.map((step) => `
            <div class="method-card">
              <span class="method-step-tag">${step.step}</span>
              <h4 class="method-title">${step.title}</h4>
              <p class="method-desc">${step.desc}</p>
            </div>
          `).join('')}
        </div>

        <!-- Interactive Fault Isolation Case Study Sandbox -->
        <div class="fault-simulator-box">
          <div class="simulator-top-bar">
            <div class="sim-meta-wrap">
              <span class="sim-pill">INTERACTIVE FAULT ISOLATION BENCH</span>
              <h3 class="sim-case-title">${scenario.title}</h3>
              <p class="sim-symptom"><strong>Observed Symptom:</strong> ${scenario.symptom}</p>
            </div>

            <!-- Scenario Switcher -->
            <div class="scenario-toggle-group">
              ${DEBUGGING_METHODOLOGY.simulationScenarios.map((sc, sIdx) => `
                <button class="sc-btn ${sIdx === activeScenarioIdx ? 'active' : ''}" data-sidx="${sIdx}">
                  Case 0${sIdx + 1}: ${sc.id === 'i2c-fault' ? 'I2C Bus NACK' : 'ESP32 Brownout'}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Step Progression Diagnostic Tree -->
          <div class="diagnostic-steps-list">
            ${scenario.steps.map((st, idx) => {
              const isVisible = idx < activeStepProgress;
              return `
                <div class="diag-step-item ${isVisible ? 'visible' : 'locked'} ${st.status}">
                  <div class="step-num-col">
                    <span class="diag-circle ${isVisible ? 'active' : ''}">
                      ${isVisible ? (st.status === 'resolved' ? '✓' : (idx + 1)) : '🔒'}
                    </span>
                    ${idx < scenario.steps.length - 1 ? `<span class="diag-line ${idx < activeStepProgress - 1 ? 'passed' : ''}"></span>` : ''}
                  </div>
                  <div class="step-content-col">
                    <div class="step-head">
                      <span class="step-action-title">${st.action}</span>
                      ${isVisible ? `
                        <span class="step-status-chip ${st.status}">
                          ${st.status === 'fault_found' ? '⚠️ ROOT CAUSE ISOLATED' : (st.status === 'resolved' ? '✅ SYSTEM VALIDATED' : '✔️ CHECK PASSED')}
                        </span>
                      ` : ''}
                    </div>
                    ${isVisible ? `
                      <p class="step-observation">${st.observation}</p>
                    ` : `
                      <p class="step-locked-hint">Step locked — complete preceding hardware inspection to reveal.</p>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Simulator Progress Control -->
          <div class="diagnostic-controls-footer">
            <button id="btn-next-diag-step" class="sim-btn btn-trigger" ${activeStepProgress >= scenario.steps.length ? 'disabled' : ''}>
              ${activeStepProgress >= scenario.steps.length ? '✅ Complete Diagnostic Procedure Verified' : '🔬 Execute Next Diagnostic Step (' + activeStepProgress + '/5)'}
            </button>
            <button id="btn-reset-diag" class="sim-btn btn-reset">
              ↺ Reset Scenario
            </button>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Bind scenario switches
    container.querySelectorAll('.sc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeScenarioIdx = parseInt(btn.dataset.sidx, 10);
        activeStepProgress = 1;
        render();
      });
    });

    // Step progression
    container.querySelector('#btn-next-diag-step')?.addEventListener('click', () => {
      if (activeStepProgress < scenario.steps.length) {
        activeStepProgress++;
        render();
      }
    });

    // Reset
    container.querySelector('#btn-reset-diag')?.addEventListener('click', () => {
      activeStepProgress = 1;
      render();
    });
  };

  render();
}
