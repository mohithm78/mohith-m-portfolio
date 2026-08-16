// Editorial Engineering Case Studies & Progression Timeline
import { FEATURED_PROJECTS, PROJECT_TIMELINE } from '../data/portfolioData.js';

export function renderProjects(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Realistic SVG Engineering Schematics for each Case Study
  const projectSchematics = {
    "proj-livestock": `
      <svg class="schematic-svg" viewBox="0 0 460 210" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Smart Livestock Hardware Architecture Diagram">
        <rect width="460" height="210" rx="8" fill="#0E0E10"/>
        <!-- Grid lines -->
        <path d="M0 35H460 M0 70H460 M0 105H460 M0 140H460 M0 175H460" stroke="#1D1D20" stroke-width="1"/>
        <path d="M46 0V210 M92 0V210 M138 0V210 M184 0V210 M230 0V210 M276 0V210 M322 0V210 M368 0V210 M414 0V210" stroke="#1D1D20" stroke-width="1"/>
        
        <!-- Central ESP32 MCU Node -->
        <rect x="175" y="60" width="110" height="75" rx="4" fill="#18181B" stroke="#3F3F46" stroke-width="1.5"/>
        <text x="230" y="88" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="11" text-anchor="middle">ESP32 SoC</text>
        <text x="230" y="103" fill="#A1A1A1" font-family="'JetBrains Mono', monospace" font-size="8.5" text-anchor="middle">240MHz Dual-Core</text>
        <text x="230" y="117" fill="#C8B69B" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">FreeRTOS Kernel</text>

        <!-- Sensors Left Block -->
        <rect x="25" y="45" width="105" height="42" rx="4" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="77" y="64" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="9.5" text-anchor="middle">NEO-6M GPS</text>
        <text x="77" y="77" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">NMEA Lat/Long • 1Hz</text>

        <rect x="25" y="105" width="105" height="42" rx="4" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="77" y="124" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="9.5" text-anchor="middle">MAX30102 / Temp</text>
        <text x="77" y="137" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">I2C PPG Vital Signs</text>

        <!-- Telemetry Right Block -->
        <rect x="330" y="45" width="105" height="42" rx="4" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="382" y="64" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="9.5" text-anchor="middle">SIM800L GSM</text>
        <text x="382" y="77" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">SMS Emergency / 2G</text>

        <rect x="330" y="105" width="105" height="42" rx="4" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="382" y="124" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="9.5" text-anchor="middle">MQTT Cloud Broker</text>
        <text x="382" y="137" fill="#C8B69B" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">TLS Socket Telemetry</text>

        <!-- Traces & Bus Lines -->
        <path d="M130 66H175" stroke="#71717A" stroke-width="1.5" stroke-dasharray="3 3"/>
        <text x="152" y="60" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="7" text-anchor="middle">UART2</text>

        <path d="M130 126H175" stroke="#71717A" stroke-width="1.5"/>
        <text x="152" y="120" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="7" text-anchor="middle">I2C Bus</text>

        <path d="M285 66H330" stroke="#71717A" stroke-width="1.5" stroke-dasharray="3 3"/>
        <text x="307" y="60" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="7" text-anchor="middle">UART1</text>

        <path d="M285 126H330" stroke="#C8B69B" stroke-width="1.5"/>
        <text x="307" y="120" fill="#C8B69B" font-family="'JetBrains Mono', monospace" font-size="7" text-anchor="middle">TCP/IP</text>

        <!-- Status Bottom Strip -->
        <rect x="25" y="172" width="410" height="24" rx="3" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="35" y="188" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="8">PROTOCOL: MQTT QoS 1</text>
        <text x="230" y="188" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">LATENCY: &lt;1.2s</text>
        <text x="425" y="188" fill="#C8B69B" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="end">GEOFENCE ACCURACY: ±2.5m</text>
      </svg>
    `,
    "proj-edge-robot": `
      <svg class="schematic-svg" viewBox="0 0 460 210" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Edge AI Industrial Robot Architecture Diagram">
        <rect width="460" height="210" rx="8" fill="#0E0E10"/>
        <path d="M0 35H460 M0 70H460 M0 105H460 M0 140H460 M0 175H460" stroke="#1D1D20" stroke-width="1"/>
        <path d="M46 0V210 M92 0V210 M138 0V210 M184 0V210 M230 0V210 M276 0V210 M322 0V210 M368 0V210 M414 0V210" stroke="#1D1D20" stroke-width="1"/>

        <!-- Upper Tier: Edge Compute (Raspberry Pi 4) -->
        <rect x="35" y="30" width="170" height="85" rx="4" fill="#18181B" stroke="#3F3F46" stroke-width="1.5"/>
        <text x="120" y="55" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="11" text-anchor="middle">RASPBERRY PI 4</text>
        <text x="120" y="72" fill="#A1A1A1" font-family="'JetBrains Mono', monospace" font-size="8.5" text-anchor="middle">Edge Vision Tier • Linux OS</text>
        <text x="120" y="88" fill="#C8B69B" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">OpenCV MobileNet • 28 FPS</text>
        <text x="120" y="102" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="7.5" text-anchor="middle">Helmet & Hazard Detection</text>

        <!-- Lower Tier: Real-Time MCU (ESP32) -->
        <rect x="255" y="30" width="170" height="85" rx="4" fill="#18181B" stroke="#3F3F46" stroke-width="1.5"/>
        <text x="340" y="55" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="11" text-anchor="middle">ESP32 CONTROLLER</text>
        <text x="340" y="72" fill="#A1A1A1" font-family="'JetBrains Mono', monospace" font-size="8.5" text-anchor="middle">Deterministic Motion Tier</text>
        <text x="340" y="88" fill="#C8B69B" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">PID Motor Sync • L298N</text>
        <text x="340" y="102" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="7.5" text-anchor="middle">Ultrasonic & Gas Interrupts</text>

        <!-- Inter-Tier Communication Bridge -->
        <path d="M205 72H255" stroke="#C8B69B" stroke-width="2"/>
        <text x="230" y="66" fill="#C8B69B" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">MQTT</text>

        <!-- Lower Peripherals Row -->
        <rect x="35" y="135" width="85" height="40" rx="3" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="77" y="152" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="8.5" text-anchor="middle">USB-CAM</text>
        <text x="77" y="165" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="7.5" text-anchor="middle">1080p 30fps</text>

        <rect x="135" y="135" width="85" height="40" rx="3" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="177" y="152" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="8.5" text-anchor="middle">MQ2 SENSOR</text>
        <text x="177" y="165" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="7.5" text-anchor="middle">Gas / Smoke ADC</text>

        <rect x="235" y="135" width="85" height="40" rx="3" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="277" y="152" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="8.5" text-anchor="middle">HC-SR04</text>
        <text x="277" y="165" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="7.5" text-anchor="middle">Echo &lt; 15cm Stop</text>

        <rect x="335" y="135" width="90" height="40" rx="3" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="380" y="152" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="8.5" text-anchor="middle">DUAL DC MOTORS</text>
        <text x="380" y="165" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="7.5" text-anchor="middle">PWM Speed Ctrl</text>

        <path d="M77 135V115" stroke="#71717A" stroke-width="1"/>
        <path d="M177 135V115" stroke="#71717A" stroke-width="1"/>
        <path d="M277 135V115" stroke="#71717A" stroke-width="1"/>
        <path d="M380 135V115" stroke="#71717A" stroke-width="1"/>

        <!-- Bottom specs -->
        <text x="230" y="196" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">DUAL-TIER EDGE ROBOTICS ARCHITECTURE • FAIL-SAFE WATCHDOG ENABLED</text>
      </svg>
    `,
    "proj-black-box": `
      <svg class="schematic-svg" viewBox="0 0 460 210" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Automobile Black Box Architecture Diagram">
        <rect width="460" height="210" rx="8" fill="#0E0E10"/>
        <path d="M0 35H460 M0 70H460 M0 105H460 M0 140H460 M0 175H460" stroke="#1D1D20" stroke-width="1"/>
        <path d="M46 0V210 M92 0V210 M138 0V210 M184 0V210 M230 0V210 M276 0V210 M322 0V210 M368 0V210 M414 0V210" stroke="#1D1D20" stroke-width="1"/>

        <!-- Core MCU Block -->
        <rect x="175" y="45" width="110" height="80" rx="4" fill="#18181B" stroke="#3F3F46" stroke-width="1.5"/>
        <text x="230" y="75" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="11" text-anchor="middle">ATmega328P</text>
        <text x="230" y="90" fill="#A1A1A1" font-family="'JetBrains Mono', monospace" font-size="8.5" text-anchor="middle">16MHz 8-bit AVR</text>
        <text x="230" y="105" fill="#C8B69B" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">Forensic Firmware</text>

        <!-- Sensors Left Block -->
        <rect x="25" y="40" width="105" height="42" rx="4" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="77" y="58" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="9" text-anchor="middle">MPU6050 6-DOF</text>
        <text x="77" y="71" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">Impact & Roll Detection</text>

        <rect x="25" y="95" width="105" height="42" rx="4" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="77" y="113" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="9" text-anchor="middle">MQ-3 GAS SENSOR</text>
        <text x="77" y="126" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">BAC Threshold ADC</text>

        <!-- Storage & Actuation Right Block -->
        <rect x="330" y="40" width="105" height="42" rx="4" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="382" y="58" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="9" text-anchor="middle">AT24C256 EEPROM</text>
        <text x="382" y="71" fill="#C8B69B" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">Non-Volatile Ring Buffer</text>

        <rect x="330" y="95" width="105" height="42" rx="4" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="382" y="113" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="9" text-anchor="middle">IGNITION RELAY</text>
        <text x="382" y="126" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">Interlock Cut-Off</text>

        <path d="M130 61H175" stroke="#71717A" stroke-width="1.5"/>
        <path d="M130 116H175" stroke="#71717A" stroke-width="1.5"/>
        <path d="M285 61H330" stroke="#C8B69B" stroke-width="1.5"/>
        <path d="M285 116H330" stroke="#71717A" stroke-width="1.5"/>

        <rect x="25" y="155" width="410" height="35" rx="3" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="35" y="176" fill="#A1A1A1" font-family="'JetBrains Mono', monospace" font-size="8.5">CRASH ALGORITHM: |Ax| + |Ay| + |Az| &gt; 3.5g → 200ms Pre/Post Event Capture into EEPROM</text>
      </svg>
    `,
    "proj-lightning": `
      <svg class="schematic-svg" viewBox="0 0 460 210" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Lightning Arresting System Diagram">
        <rect width="460" height="210" rx="8" fill="#0E0E10"/>
        <path d="M0 35H460 M0 70H460 M0 105H460 M0 140H460 M0 175H460" stroke="#1D1D20" stroke-width="1"/>
        <path d="M46 0V210 M92 0V210 M138 0V210 M184 0V210 M230 0V210 M276 0V210 M322 0V210 M368 0V210 M414 0V210" stroke="#1D1D20" stroke-width="1"/>

        <!-- Central MCU Block -->
        <rect x="175" y="45" width="110" height="75" rx="4" fill="#18181B" stroke="#3F3F46" stroke-width="1.5"/>
        <text x="230" y="73" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="11" text-anchor="middle">STM32 Nucleo</text>
        <text x="230" y="88" fill="#A1A1A1" font-family="'JetBrains Mono', monospace" font-size="8.5" text-anchor="middle">ARM Cortex-M4</text>
        <text x="230" y="103" fill="#C8B69B" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">Fast ADC & EXTI</text>

        <!-- Power & Surge Blocks -->
        <rect x="25" y="40" width="110" height="42" rx="4" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="80" y="58" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="9" text-anchor="middle">SOLAR PV (10W)</text>
        <text x="80" y="71" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">Energy Harvesting</text>

        <rect x="25" y="95" width="110" height="42" rx="4" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="80" y="113" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="9" text-anchor="middle">TP4056 + Li-Ion</text>
        <text x="80" y="126" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">3.7V Battery Buffer</text>

        <rect x="325" y="40" width="110" height="42" rx="4" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="380" y="58" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="9" text-anchor="middle">SURGE TRANSDUCER</text>
        <text x="380" y="71" fill="#C8B69B" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">Transient Pulse Capture</text>

        <rect x="325" y="95" width="110" height="42" rx="4" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="380" y="113" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="9" text-anchor="middle">I2C LCD DISPLAY</text>
        <text x="380" y="126" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">Peak V/I Readout</text>

        <path d="M135 61H175" stroke="#71717A" stroke-width="1.5"/>
        <path d="M135 116H175" stroke="#71717A" stroke-width="1.5"/>
        <path d="M285 61H325" stroke="#C8B69B" stroke-width="1.5"/>
        <path d="M285 116H325" stroke="#71717A" stroke-width="1.5"/>

        <rect x="25" y="155" width="410" height="35" rx="3" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="35" y="176" fill="#A1A1A1" font-family="'JetBrains Mono', monospace" font-size="8.5">DUAL-FUNCTION TOPOLOGY: Autonomous Off-Grid Operation + High-Voltage Pulse Isolation</text>
      </svg>
    `,
    "proj-arbiter": `
      <svg class="schematic-svg" viewBox="0 0 460 210" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Verilog Arbiter FSM State Graph">
        <rect width="460" height="210" rx="8" fill="#0E0E10"/>
        <path d="M0 35H460 M0 70H460 M0 105H460 M0 140H460 M0 175H460" stroke="#1D1D20" stroke-width="1"/>
        <path d="M46 0V210 M92 0V210 M138 0V210 M184 0V210 M230 0V210 M276 0V210 M322 0V210 M368 0V210 M414 0V210" stroke="#1D1D20" stroke-width="1"/>

        <!-- FSM State Nodes -->
        <circle cx="90" cy="80" r="32" fill="#18181B" stroke="#3F3F46" stroke-width="1.5"/>
        <text x="90" y="78" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="10" text-anchor="middle">S_IDLE</text>
        <text x="90" y="90" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="7.5" text-anchor="middle">Grant=4'b0000</text>

        <circle cx="230" cy="45" r="32" fill="#18181B" stroke="#C8B69B" stroke-width="1.5"/>
        <text x="230" y="43" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="10" text-anchor="middle">M0_HIGH</text>
        <text x="230" y="55" fill="#C8B69B" font-family="'JetBrains Mono', monospace" font-size="7.5" text-anchor="middle">Req[0]=1 (PRIO)</text>

        <circle cx="370" cy="80" r="32" fill="#18181B" stroke="#3F3F46" stroke-width="1.5"/>
        <text x="370" y="78" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="10" text-anchor="middle">M1_PASS</text>
        <text x="370" y="90" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="7.5" text-anchor="middle">Token Handoff</text>

        <circle cx="230" cy="130" r="32" fill="#18181B" stroke="#3F3F46" stroke-width="1.5"/>
        <text x="230" y="128" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="10" text-anchor="middle">M2_M3_PASS</text>
        <text x="230" y="140" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="7.5" text-anchor="middle">Round-Robin</text>

        <!-- State Transitions -->
        <path d="M120 68L200 48" stroke="#C8B69B" stroke-width="1.5"/>
        <path d="M260 48L340 68" stroke="#71717A" stroke-width="1.5"/>
        <path d="M345 98L260 125" stroke="#71717A" stroke-width="1.5"/>
        <path d="M200 125L115 98" stroke="#71717A" stroke-width="1.5"/>

        <rect x="25" y="172" width="410" height="24" rx="3" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="35" y="188" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="8">LANGUAGE: Verilog HDL (IEEE 1364)</text>
        <text x="230" y="188" fill="#C8B69B" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">STARVATION-FREE GUARANTEE</text>
        <text x="425" y="188" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="end">FMAX &gt; 250 MHz</text>
      </svg>
    `,
    "proj-waste": `
      <svg class="schematic-svg" viewBox="0 0 460 210" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Smart Waste Digital Twin System Diagram">
        <rect width="460" height="210" rx="8" fill="#0E0E10"/>
        <path d="M0 35H460 M0 70H460 M0 105H460 M0 140H460 M0 175H460" stroke="#1D1D20" stroke-width="1"/>
        <path d="M46 0V210 M92 0V210 M138 0V210 M184 0V210 M230 0V210 M276 0V210 M322 0V210 M368 0V210 M414 0V210" stroke="#1D1D20" stroke-width="1"/>

        <!-- Left: Municipal Smart Bins Mesh -->
        <rect x="30" y="40" width="105" height="90" rx="4" fill="#18181B" stroke="#3F3F46" stroke-width="1.5"/>
        <text x="82" y="65" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="10.5" text-anchor="middle">SMART BIN MESH</text>
        <text x="82" y="82" fill="#A1A1A1" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">Simulated Nodes</text>
        <text x="82" y="97" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="7.5" text-anchor="middle">Ultrasonic Fill Sensors</text>
        <text x="82" y="112" fill="#C8B69B" font-family="'JetBrains Mono', monospace" font-size="7.5" text-anchor="middle">Dynamic Capacity %</text>

        <!-- Center: Real-Time Cloud Engine -->
        <rect x="175" y="40" width="110" height="90" rx="4" fill="#18181B" stroke="#3F3F46" stroke-width="1.5"/>
        <text x="230" y="65" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="10.5" text-anchor="middle">DIGITAL TWIN CORE</text>
        <text x="230" y="82" fill="#A1A1A1" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">Firebase Firestore</text>
        <text x="230" y="97" fill="#C8B69B" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">OSRM Route Solver</text>
        <text x="230" y="112" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="7.5" text-anchor="middle">Heuristic TSP Engine</text>

        <!-- Right: Dispatcher GIS UI -->
        <rect x="325" y="40" width="105" height="90" rx="4" fill="#18181B" stroke="#3F3F46" stroke-width="1.5"/>
        <text x="377" y="65" fill="#EDEDEA" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="10.5" text-anchor="middle">DISPATCH PORTAL</text>
        <text x="377" y="82" fill="#A1A1A1" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">React & Leaflet GIS</text>
        <text x="377" y="97" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="7.5" text-anchor="middle">Live Truck Telemetry</text>
        <text x="377" y="112" fill="#C8B69B" font-family="'JetBrains Mono', monospace" font-size="7.5" text-anchor="middle">Citizen Issue Portal</text>

        <path d="M135 85H175" stroke="#71717A" stroke-width="1.5"/>
        <path d="M285 85H325" stroke="#C8B69B" stroke-width="1.5"/>

        <rect x="30" y="148" width="400" height="42" rx="3" fill="#141416" stroke="#27272A" stroke-width="1"/>
        <text x="40" y="165" fill="#A1A1A1" font-family="'JetBrains Mono', monospace" font-size="8">BEST IDEA AWARD • GITAM COLLEGE HACKATHON</text>
        <text x="40" y="180" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="7.5">Software-based dynamic digital twin for municipal waste logistics optimization</text>
      </svg>
    `
  };

  container.innerHTML = `
    <div class="projects-section-inner">
      
      <!-- Project Category Filters -->
      <div class="project-filter-controls">
        <button class="proj-filter-btn active font-mono" data-filter="all">ALL (6)</button>
        <button class="proj-filter-btn font-mono" data-filter="final-year">FINAL YEAR (1)</button>
        <button class="proj-filter-btn font-mono" data-filter="hackathon">HACKATHONS (2)</button>
        <button class="proj-filter-btn font-mono" data-filter="academic">ACADEMIC (3)</button>
      </div>

      <!-- 6 Editorial Case Study Cards -->
      <div class="projects-editorial-list">
        ${FEATURED_PROJECTS.map(proj => {
          let categoryClass = "academic";
          if (proj.category.toLowerCase().includes("final")) categoryClass = "final-year";
          else if (proj.category.toLowerCase().includes("hackathon") || proj.badge.toLowerCase().includes("hackathon") || proj.badge.toLowerCase().includes("award")) categoryClass = "hackathon";

          const schematicHtml = projectSchematics[proj.id] || '';

          return `
            <article class="project-case-card" data-category="${categoryClass}" id="${proj.id}">
              
              <!-- Top Metadata Header -->
              <div class="case-card-header">
                <div class="case-header-left">
                  <span class="case-number font-mono">0${proj.num}</span>
                  <div class="case-titles">
                    <h3 class="case-title">${proj.title}</h3>
                    <span class="case-category font-mono">${proj.category}</span>
                  </div>
                </div>
                <div class="case-header-right">
                  <span class="case-badge-pill font-mono ${categoryClass}">${proj.badge}</span>
                </div>
              </div>

              <!-- Case Study Main Grid (Visual Schematic + Details) -->
              <div class="case-card-body">
                <div class="case-visual-box">
                  ${schematicHtml}
                </div>

                <div class="case-details-box">
                  <div class="case-desc-block">
                    <span class="case-field-label font-mono">SYSTEM OVERVIEW</span>
                    <p class="case-desc-text">${proj.description}</p>
                  </div>

                  <div class="case-tech-block">
                    <span class="case-field-label font-mono">ENGINEERING STACK</span>
                    <div class="case-tech-chips">
                      ${proj.tech.map(t => `<span class="case-tag font-mono">${t}</span>`).join('')}
                    </div>
                  </div>

                  <div class="case-meta-split">
                    <div class="case-meta-col">
                      <span class="case-field-label font-mono">ENGINEERING ROLE</span>
                      <span class="case-meta-val">${proj.role}</span>
                    </div>
                    <div class="case-meta-col">
                      <span class="case-field-label font-mono">VERIFIED OUTCOME</span>
                      <span class="case-meta-val highlight-val">${proj.outcome}</span>
                    </div>
                  </div>
                </div>
              </div>

            </article>
          `;
        }).join('')}
      </div>

      <!-- Project Timeline / Engineering Progression -->
      <div class="project-timeline-container">
        <div class="timeline-head">
          <span class="timeline-kicker font-mono">03 / PROGRESSION</span>
          <h3 class="timeline-title">SYSTEMATIC ENGINEERING PROGRESSION</h3>
          <p class="timeline-sub">Progression timeline illustrating the evolution of technical breadth across semesters and competitions.</p>
        </div>

        <div class="timeline-track">
          ${PROJECT_TIMELINE.map((item, idx) => `
            <div class="timeline-step">
              <div class="step-badge font-mono">${item.stage}</div>
              <div class="step-card">
                <span class="step-domain font-mono">${item.domain}</span>
                <h4 class="step-title">${item.title}</h4>
                <span class="step-tech font-mono">${item.tech}</span>
              </div>
              ${idx < PROJECT_TIMELINE.length - 1 ? '<div class="step-arrow">→</div>' : ''}
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;

  setupFilterEvents();
}

function setupFilterEvents() {
  const filterBtns = document.querySelectorAll('.proj-filter-btn');
  const projectCards = document.querySelectorAll('.project-case-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}
