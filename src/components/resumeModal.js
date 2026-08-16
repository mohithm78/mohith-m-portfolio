// Recruiter Resume Modal & PDF Print / Export Engine
import { PERSONAL_INFO, EDUCATION_HISTORY, FEATURED_PROJECTS, ACHIEVEMENTS, CERTIFICATIONS, EXPERIENCES } from '../data/portfolioData.js';

export function initResumeModal() {
  const modalOverlay = document.getElementById('resume-modal-overlay');
  const openButtons = document.querySelectorAll('.btn-open-resume, .btn-download-resume');
  const closeButton = document.getElementById('btn-close-resume');
  const printButton = document.getElementById('btn-print-resume');
  const copyTextButton = document.getElementById('btn-copy-resume');

  if (!modalOverlay) return;

  const openModal = () => {
    modalOverlay.classList.remove('hidden');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.add('hidden');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeButton?.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
      closeModal();
    }
  });

  printButton?.addEventListener('click', () => {
    window.print();
  });

  copyTextButton?.addEventListener('click', () => {
    const textResume = `MOHITH M
Bengaluru, Karnataka, India | ${PERSONAL_INFO.email} | ${PERSONAL_INFO.phone}
LinkedIn: ${PERSONAL_INFO.linkedin} | GitHub: ${PERSONAL_INFO.github}

PROFESSIONAL IDENTITY:
ECE Student | Embedded Systems | Firmware | Electronics | IoT

SUMMARY:
Electronics & Communication Engineering undergraduate (2023–2027) at Cambridge Institute of Technology, Bengaluru (CGPA: 7.0/10). Hands-on experience developing microcontroller-based systems, firmware in Embedded C, communication protocols (UART, SPI, I2C, CAN, MQTT), PCB design in KiCad, and hardware-software integration.

EDUCATION:
- B.E. in Electronics & Communication Engineering (2023 – 2027)
  Cambridge Institute of Technology, Bengaluru | CGPA: 7.0 / 10
- Pre-University Course (PUC) - Science (2021 – 2023)
  Sri Narayana PU College | 82.96%
- Secondary School Leaving Certificate (SSLC) (2021)
  SFS High School | 74.56%

TECHNICAL SKILLS:
- Programming: C, C++, Python, Embedded C
- Microcontrollers: ESP32, STM32, Arduino, Raspberry Pi Pico
- Embedded: Firmware, RTOS Concepts, Sensors, GPIO, Interrupts, Timers, ADC, PWM
- Communication Protocols: UART, SPI, I2C, CAN, MQTT, GSM, GPS
- Electronics: Digital Electronics, Circuit Design, PCB Design, Schematic Capture, Hardware Integration
- Software & Tools: Git, VS Code, Keil, Arduino IDE, KiCad, Proteus, MATLAB, Simulink, Linux (Ubuntu, Red Hat)

EXPERIENCE:
- Electronics Intern | Supekar Electronics (Jul 2026, 10 Days)
  * Completed 10-day industry internship program focused on PCB design, schematic capture, and electronics prototyping.
  * Used KiCad for schematic capture and 2-layer PCB layout; validated ESP32+DHT11 and relay-driver hardware.
- Technician | E-Cell CIT Bengaluru (Jan 2026 – Present)
  * Engineer embedded and IoT prototypes using STM32, ESP32, Arduino and Raspberry Pi.
  * Implement and debug UART, SPI, I2C and MQTT protocols for prototypes.
- Technical / Embedded Systems | Ad Astra Club (Nov 2025 – Present)
  * Contributed to circuit design, firmware, and embedded system prototyping.
- Student Ambassador | Hack2Skill (Aug 2026)

SELECTED PROJECTS:
1. Smart Livestock Monitoring System [PARIVARTHAN 2026, VVCE Mysuru]
   * ESP32, GPS, GSM, Sensors, MQTT, IoT. Built IoT livestock tracking with geofencing and alert communication.
2. Edge AI Robot [FINAL YEAR PROJECT]
   * Raspberry Pi, ESP32, Sensors, Edge AI, Computer Vision, MQTT. Intelligent robotic operation using embedded computing.
3. Black Box [3rd SEMESTER PROJECT]
   * Arduino, MPU6050, Sensors, EEPROM. Microcontroller-based vehicle safety prototype with event recording.
4. Lightning [4th SEMESTER PROJECT]
   * STM32, Solar Energy Harvesting, Sensors, Proteus. Solar-assisted surge protection and electronics sensing.
5. Priority-Based System [5th SEMESTER PROJECT]
   * Verilog HDL, Digital Logic, FSM Design, FPGA. Priority arbitration logic for shared resource management.
6. Smart Waste Management System [GITAM COLLEGE HACKATHON]
   * React, JavaScript, Firebase, Firestore, Leaflet, OSRM. Software-based digital twin with route optimization.

TECHNICAL EVENTS & EXPOSURE:
- Line-Following Robot — PRAVRUTTI (National Level Tech Fest, M S Ramaiah University)
- Smart Agriculture Expo — Cambridge Institute of Technology (State-Level Project Expo)

CERTIFICATIONS:
1. AIoT: AI of Things (Ramaiah Skill Academy)
2. Deploying Simulink Models to Embedded Targets (Ramaiah Skill Academy)
3. Python Certification (OneRoadmap)
4. Industry 4.0 & Industrial IoT (NPTEL)
5. AI Literacy Certification (IBM SkillsBuild)
6. PromptWars Virtual (Generative AI Solution Forum / Hack2skill)

COMMUNITY & BEYOND:
- Approved Volunteer — Humanity Calls Trust (Community Welfare Initiative)
- Runner-Up — Western Dance (Chigauru 2025)
`;
    navigator.clipboard.writeText(textResume).then(() => {
      copyTextButton.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg> <span>COPIED!</span>`;
      setTimeout(() => {
        copyTextButton.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> <span>COPY TEXT</span>`;
      }, 2500);
    });
  });
}
