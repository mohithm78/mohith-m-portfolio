// Clean, High-Precision Technical Skills Matrix & Protocol Architecture
import { TECHNICAL_SKILLS_MATRIX, COMMUNICATION_PROTOCOLS, ENGINEERING_TOOLS, LINUX_ENVIRONMENT } from '../data/portfolioData.js';

export function renderTechSkillsMatrix(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const protocolFrames = {
    UART: {
      title: "UART 8-N-1 Serial Packet Frame (115200 Baud)",
      fields: [
        { label: "IDLE", val: "HIGH" },
        { label: "START", val: "0 (LOW)" },
        { label: "D0..D7", val: "0x55 (DATA)" },
        { label: "PARITY", val: "NONE" },
        { label: "STOP", val: "1 (HIGH)" }
      ],
      timing: "Bit Period = 8.68µs @ 115200 bps • Asynchronous Over-sampling 16x"
    },
    SPI: {
      title: "4-Wire Synchronous SPI Bus Transaction (Mode 0: CPOL=0, CPHA=0)",
      fields: [
        { label: "CS#", val: "ACTIVE LOW" },
        { label: "SCLK", val: "8 PULSES" },
        { label: "MOSI", val: "0xA2 (CMD)" },
        { label: "MISO", val: "0x3F (STATUS)" },
        { label: "CS#", val: "RELEASE HIGH" }
      ],
      timing: "Full Duplex Master-Slave • Up to 20MHz SPI Clock on STM32 SPI1"
    },
    I2C: {
      title: "I2C 7-Bit Address & Register Read Sequence (Fast Mode 400kHz)",
      fields: [
        { label: "START", val: "SDA↓ SCL=1" },
        { label: "ADDR", val: "0x68 [W]" },
        { label: "ACK", val: "0 (SLAVE)" },
        { label: "REG", val: "0x3B (ACCEL_X)" },
        { label: "ACK", val: "0" },
        { label: "STOP", val: "SDA↑ SCL=1" }
      ],
      timing: "Open-Drain 4.7kΩ Pull-Ups to 3.3V • Hardware Filter De-glitch"
    },
    CAN: {
      title: "Standard CAN 2.0B 11-Bit Identifier Frame Architecture",
      fields: [
        { label: "SOF", val: "DOMINANT" },
        { label: "ID (11b)", val: "0x7DF (OBD2)" },
        { label: "RTR", val: "0" },
        { label: "DLC", val: "8 BYTES" },
        { label: "CRC15", val: "0x45A2" },
        { label: "ACK", val: "SLAVE PULSE" }
      ],
      timing: "500 kbps Differential CAN_H / CAN_L • 120Ω Terminal Resistors"
    },
    MQTT: {
      title: "Lightweight MQTT v3.1.1 Telemetry Packet Structure (QoS 1)",
      fields: [
        { label: "FIXED HDR", val: "PUBLISH (0x32)" },
        { label: "TOPIC", val: "nodes/telemetry" },
        { label: "PKT ID", val: "0x0001" },
        { label: "PAYLOAD", val: '{"temp":24.5}' },
        { label: "RESP", val: "PUBACK (0x40)" }
      ],
      timing: "TCP Socket Stream • Sub-50ms Ack Latency over GPRS / Wi-Fi"
    }
  };

  let activeProtocol = "UART";

  const render = () => {
    const activeFrame = protocolFrames[activeProtocol];

    container.innerHTML = `
      <div class="skills-editorial-wrapper">
        
        <!-- 1. Technical Skills Matrix Grid -->
        <div class="skills-categories-grid">
          ${TECHNICAL_SKILLS_MATRIX.map((cat, idx) => `
            <div class="skill-category-card">
              <div class="cat-header">
                <span class="cat-num font-mono">0${idx + 1}</span>
                <h3 class="cat-title">${cat.category}</h3>
              </div>
              <div class="skill-tags-group">
                ${cat.skills.map(skill => `
                  <span class="skill-pill font-mono">${skill}</span>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- 2. Communication Protocols & Timing Frame Breakdown -->
        <div class="protocols-guide-box">
          <div class="protocols-header">
            <div class="proto-header-left">
              <span class="proto-kicker font-mono">02 / BUS COMMUNICATION</span>
              <h3 class="proto-title">SERIAL & BUS PROTOCOLS</h3>
            </div>
            <div class="protocol-switcher-tabs font-mono">
              ${COMMUNICATION_PROTOCOLS.map(p => `
                <button class="proto-tab-btn ${p.name === activeProtocol ? 'active' : ''}" data-proto="${p.name}">
                  ${p.name}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Protocol Active Card & Physical Frame Visualizer -->
          <div class="protocol-interactive-stage">
            <div class="stage-desc-row">
              <div class="stage-info-col">
                <div class="proto-title-row">
                  <span class="active-p-name font-mono">${activeProtocol}</span>
                  <span class="active-p-type font-mono">${COMMUNICATION_PROTOCOLS.find(p => p.name === activeProtocol)?.type}</span>
                </div>
                <p class="active-p-usage">${COMMUNICATION_PROTOCOLS.find(p => p.name === activeProtocol)?.usage}</p>
              </div>
            </div>

            <!-- Physical Packet Bit Frame -->
            <div class="frame-diagram-box">
              <div class="frame-diagram-header font-mono">
                <span class="frame-title">${activeFrame.title}</span>
                <span class="frame-timing">${activeFrame.timing}</span>
              </div>
              <div class="frame-blocks-row font-mono">
                ${activeFrame.fields.map(f => `
                  <div class="frame-block">
                    <span class="f-lbl">${f.label}</span>
                    <span class="f-val">${f.val}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="protocols-grid">
            ${COMMUNICATION_PROTOCOLS.map(proto => `
              <div class="protocol-card ${proto.name === activeProtocol ? 'highlight' : ''}" data-proto="${proto.name}">
                <div class="proto-top">
                  <span class="proto-name font-mono">${proto.name}</span>
                  <span class="proto-type font-mono">${proto.type}</span>
                </div>
                <p class="proto-usage">${proto.usage}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Engineering Tools & Linux Environment Grid -->
        <div class="tools-and-linux-grid">
          <!-- Tools Card -->
          <div class="eng-tools-card">
            <div class="tools-card-head">
              <span class="proto-kicker font-mono">03 / SIMULATION & EDA</span>
              <h3 class="tools-title">ENGINEERING TOOLS</h3>
            </div>
            <div class="tools-items-list">
              ${ENGINEERING_TOOLS.map(tool => `
                <div class="tool-item-row">
                  <div class="tool-name-col">
                    <span class="t-name font-mono">${tool.name}</span>
                    <span class="t-tag font-mono">${tool.tag}</span>
                  </div>
                  <div class="tool-points-col">
                    ${tool.points.map(pt => `<span class="t-bullet">• ${pt}</span>`).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Linux Environment Card -->
          <div class="linux-env-card">
            <div class="tools-card-head">
              <span class="proto-kicker font-mono">04 / DEVELOPMENT WORKFLOW</span>
              <h3 class="tools-title">${LINUX_ENVIRONMENT.title}</h3>
            </div>
            <p class="linux-desc">${LINUX_ENVIRONMENT.description}</p>
            <div class="linux-chips-row">
              ${LINUX_ENVIRONMENT.tools.map(tool => `
                <div class="linux-chip">
                  <span class="linux-dot"></span>
                  <span class="linux-name font-mono">${tool}</span>
                </div>
              `).join('')}
            </div>
            <div class="linux-callout font-mono">
              <span>GCC / GDB Embedded Toolchain • Make / CMake • Shell Scripting</span>
            </div>
          </div>
        </div>

      </div>
    `;

    setupEvents();
  };

  const setupEvents = () => {
    const tabBtns = container.querySelectorAll('.proto-tab-btn, .protocol-card');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const proto = btn.dataset.proto;
        if (proto && protocolFrames[proto]) {
          activeProtocol = proto;
          render();
        }
      });
    });
  };

  render();
}
