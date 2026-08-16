// ==========================================================================
// MOHITH M — PORTFOLIO DATA SOURCE
// Strictly Verified, Authentic, Professional Engineering Data
// ==========================================================================

export const PERSONAL_INFO = {
  name: "MOHITH M",
  role: "ECE Student | Embedded Systems | Firmware | Electronics | IoT",
  institution: "Cambridge Institute of Technology, Bengaluru",
  degree: "B.E. Electronics & Communication Engineering",
  graduation: "2027",
  cgpa: "7.0 / 10",
  location: "Bengaluru, Karnataka, India",
  email: "imnotshix2422@gmail.com",
  phone: "+91 93805 44601",
  linkedin: "https://www.linkedin.com/in/mohith-m-877449342/",
  github: "https://github.com/mohithm78",
  heroIntro: "ECE student focused on building reliable embedded systems, connected devices, and practical electronics solutions through hands-on development.",
  contactHeading: "LET'S BUILD SOMETHING USEFUL.",
  quote: "Building practical systems where electronics, firmware, IoT and intelligent software meet."
};

export const ENGINEERING_FOCUS_PILLARS = [
  {
    num: "01",
    title: "EMBEDDED SYSTEMS",
    desc: "Microcontroller-level design, firmware architecture, real-time operating systems, and hardware peripherals control.",
    tags: ["Microcontrollers", "Embedded C", "Firmware", "GPIO", "Timers", "Interrupts", "ADC", "PWM", "Sensors"]
  },
  {
    num: "02",
    title: "ELECTRONICS",
    desc: "Digital electronics, circuit design, PCB layout, schematic capture, and sensor interfacing.",
    tags: ["Digital Electronics", "Circuit Design", "PCB Design", "Schematic Capture", "Sensor Interfacing", "Hardware Integration"]
  },
  {
    num: "03",
    title: "COMMUNICATION",
    desc: "Serial bus protocols, cellular telemetry, publish-subscribe IoT communication, and sensor data streaming.",
    tags: ["UART", "SPI", "I2C", "CAN", "MQTT", "GSM", "GPS"]
  },
  {
    num: "04",
    title: "SOFTWARE & TOOLS",
    desc: "Embedded algorithms, dynamic system modeling, digital logic simulation, and command-line development environments.",
    tags: ["C", "C++", "Python", "Linux", "Ubuntu", "Red Hat", "MATLAB", "Simulink", "Git", "IoT"]
  }
];

export const TECHNICAL_SKILLS_MATRIX = [
  {
    category: "PROGRAMMING",
    skills: ["C", "C++", "Python", "Embedded C"]
  },
  {
    category: "MICROCONTROLLERS",
    skills: ["ESP32", "STM32", "Arduino", "Raspberry Pi Pico"]
  },
  {
    category: "COMMUNICATION",
    skills: ["UART", "SPI", "I2C", "CAN", "MQTT", "GSM", "GPS"]
  },
  {
    category: "EMBEDDED",
    skills: ["Firmware", "RTOS Concepts", "Sensors", "GPIO", "Interrupts", "Timers", "ADC", "PWM"]
  },
  {
    category: "ELECTRONICS",
    skills: ["Digital Electronics", "Circuit Design", "PCB Design", "Schematic Capture", "Hardware Integration"]
  },
  {
    category: "SOFTWARE / TOOLS",
    skills: ["Git", "VS Code", "Keil", "Arduino IDE", "KiCad", "Proteus", "MATLAB", "Simulink", "Linux", "Ubuntu", "Red Hat"]
  }
];

export const COMMUNICATION_PROTOCOLS = [
  {
    name: "UART",
    type: "Asynchronous Serial",
    usage: "Full-duplex point-to-point communication with GPS receivers, GSM telemetry modems and serial debug consoles."
  },
  {
    name: "SPI",
    type: "Synchronous Serial (4-Wire)",
    usage: "High-speed master-slave synchronous bus for high-bandwidth displays, flash memories and sensor ICs."
  },
  {
    name: "I2C",
    type: "Synchronous 2-Wire (SDA/SCL)",
    usage: "Multi-device open-drain peripheral bus with pull-up resistors for IMUs, RTCs and environmental sensors."
  },
  {
    name: "CAN",
    type: "Differential Robust Bus (CAN 2.0B)",
    usage: "Message-based differential broadcast protocol with hardware CRC and arbitration for automotive and industrial systems."
  },
  {
    name: "MQTT",
    type: "Lightweight Publish/Subscribe",
    usage: "Compact IoT messaging over TCP/IP sockets for battery-powered telemetry nodes and cloud platforms."
  }
];

export const EXPERIENCES = [
  {
    role: "Electronics Intern",
    org: "Supekar Electronics",
    period: "Jul 2026 (10 Days)",
    type: "Industry Internship Program",
    bullets: [
      "Completed a 10-day industry internship program focused on PCB design, schematic capture, and electronics prototyping.",
      "Used KiCad for schematic capture and 2-layer PCB layout, practicing component placement, trace routing, and design rule checking.",
      "Designed, soldered, and functionally validated test circuits including an ESP32 + DHT11 sensor board and an optocoupler-isolated relay driver."
    ]
  },
  {
    role: "Technician",
    org: "E-Cell CIT Bengaluru",
    period: "Jan 2026 – Present",
    type: "Student Technical Team",
    bullets: [
      "Engineer embedded and IoT prototypes using STM32, ESP32, Arduino, and Raspberry Pi platforms.",
      "Implement and debug communication protocols including UART, SPI, I2C, and MQTT for student prototypes.",
      "Collaborate with multidisciplinary engineering peers on sensor integration, power distribution, and rapid hardware prototyping."
    ]
  },
  {
    role: "Technical / Embedded Systems",
    org: "Ad Astra Club",
    period: "Nov 2025 – Present",
    type: "Student Club",
    bullets: [
      "Contributed to circuit design, firmware development, and embedded system prototyping for student projects.",
      "Supported testing, debugging, and integration of sensors, actuators, and microcontroller platforms."
    ]
  },
  {
    role: "Student Ambassador",
    org: "Hack2Skill",
    period: "Aug 2026",
    type: "Technical Outreach",
    bullets: [
      "Engaged in technical outreach and supported student participation in innovation initiatives and hackathons."
    ]
  }
];

export const FEATURED_PROJECTS = [
  {
    id: "proj-livestock",
    num: "01",
    title: "SMART LIVESTOCK MONITORING SYSTEM",
    badge: "PARIVARTHAN 2026 • VVCE Mysuru",
    category: "IoT / Embedded Systems",
    event: "PARIVARTHAN 2026 Hackathon, VVCE Mysuru",
    tech: ["ESP32", "GPS", "GSM", "Sensors", "MQTT", "IoT"],
    role: "Firmware Development, Sensor Interfacing & Telemetry Integration",
    description: "An IoT-based livestock monitoring and protection system designed to support animal health monitoring, location tracking, geofencing, and alert communication.",
    outcome: "Successfully engineered and demonstrated an end-to-end connected IoT prototype at PARIVARTHAN 2026."
  },
  {
    id: "proj-edge-robot",
    num: "02",
    title: "EDGE AI ROBOT",
    badge: "Final Year Project",
    category: "Embedded Systems / Robotics / Edge AI",
    tech: ["Raspberry Pi", "ESP32", "Sensors", "Edge AI", "Computer Vision", "MQTT"],
    role: "Hardware Architecture, Dual-Tier Controller Integration & Embedded Firmware",
    description: "A final-year engineering project focused on intelligent robotic operation using embedded computing, sensors, and edge-based processing.",
    outcome: "Developing a robust dual-tier hardware-software architecture integrating real-time motion with edge-based intelligence."
  },
  {
    id: "proj-black-box",
    num: "03",
    title: "BLACK BOX",
    badge: "3rd Semester Project",
    category: "Embedded Systems / Electronics",
    tech: ["Arduino", "MPU6050", "Sensors", "EEPROM", "Circuit Design"],
    role: "Microcontroller Firmware & Hardware Interfacing",
    description: "An academic embedded/electronics project demonstrating microcontroller-based system development and hardware integration.",
    outcome: "Successfully designed and validated a working hardware prototype with non-volatile event recording."
  },
  {
    id: "proj-lightning",
    num: "04",
    title: "LIGHTNING",
    badge: "4th Semester Project",
    category: "Electronics / Embedded Systems",
    tech: ["STM32", "Solar Energy Harvesting", "Sensors", "Proteus", "Power Electronics"],
    role: "Hardware Circuit Design & Simulation Validation",
    description: "An academic engineering project demonstrating solar-assisted surge protection and electronics sensing.",
    outcome: "Simulated in Proteus and validated with an STM32-based voltage/current monitoring circuit."
  },
  {
    id: "proj-arbiter",
    num: "05",
    title: "PRIORITY-BASED SYSTEM",
    badge: "5th Semester Project",
    category: "Digital Electronics / Embedded Systems",
    tech: ["Verilog HDL", "Digital Logic", "FSM Design", "FPGA"],
    role: "Digital Logic Design & Verilog HDL Simulation",
    description: "A digital/electronics engineering project implementing priority arbitration logic for shared resource management.",
    outcome: "Synthesized and verified state machine arbitration with priority override."
  },
  {
    id: "proj-waste",
    num: "06",
    title: "SMART WASTE MANAGEMENT SYSTEM",
    badge: "GITAM College Hackathon",
    category: "Smart City / IoT / Software",
    event: "GITAM College Hackathon",
    tech: ["React", "JavaScript", "Firebase", "Firestore", "OpenStreetMap", "Leaflet", "OSRM"],
    role: "Frontend Interface & Route Optimization Logic",
    description: "A software-based Smart Waste Management prototype using a Digital Twin approach with real-time waste-bin monitoring, waste generation simulation, route optimization, interactive map, citizen issue reporting, and analytics dashboard.",
    outcome: "Developed and presented as a complete software prototype at the GITAM College Hackathon."
  }
];

export const PROJECT_TIMELINE = [
  {
    stage: "3rd SEM",
    title: "Black Box",
    tech: "Microcontroller • IMU • EEPROM",
    domain: "Embedded & Electronics"
  },
  {
    stage: "4th SEM",
    title: "Lightning System",
    tech: "STM32 • Solar Harvesting • Proteus",
    domain: "Power & Embedded Control"
  },
  {
    stage: "5th SEM",
    title: "Priority-Based System",
    tech: "Verilog HDL • Digital Logic • FSM",
    domain: "Digital System Design"
  },
  {
    stage: "Hackathons",
    title: "Smart Livestock & Waste Twin",
    tech: "ESP32 • GPS • GSM • React • GIS",
    domain: "IoT & Connected Systems"
  },
  {
    stage: "Final Year",
    title: "Edge AI Robot",
    tech: "Embedded Computing • Sensors • Edge AI",
    domain: "Robotics & Edge Processing"
  }
];

export const TECHNICAL_EVENTS = [
  {
    event: "NATIONAL LEVEL TECH FEST — PRAVRUTTI",
    org: "M S Ramaiah University",
    project: "Line-Following Robot",
    badge: "National Level Tech Fest",
    description: "Participated in the National Level Tech Fest 'PRAVRUTTI' at M S Ramaiah University and designed/developed a line-following robot.",
    skills: ["Embedded Systems", "Robotics", "Circuit Design", "Rapid Prototyping", "Problem Solving"]
  },
  {
    event: "STATE-LEVEL PROJECT EXPO",
    org: "Cambridge Institute of Technology",
    project: "Smart Agriculture – Empowering Farmers with Sustainable Farming",
    badge: "State-Level Project Expo",
    mentor: "Chandrakala",
    description: "Presented a smart agriculture solution focused on automation, IoT integration, and sustainable farming practices aimed at helping farmers improve productivity while reducing cost and effort.",
    skills: ["Smart Agriculture", "IoT", "Automation", "Sustainability", "Agritech", "Teamwork"]
  }
];

export const ENGINEERING_TOOLS = [
  {
    name: "MATLAB",
    tag: "Numerical Analysis & Modeling",
    points: ["Circuit modeling", "Block diagram simulation", "Engineering computation"]
  },
  {
    name: "SIMULINK",
    tag: "Model-Based Design",
    points: ["Control systems modeling", "Dynamic system simulation", "Embedded target deployment"]
  },
  {
    name: "PROTEUS",
    tag: "Circuit Simulation",
    points: ["Circuit modeling", "SPICE analysis", "Microcontroller prototyping"]
  },
  {
    name: "KiCad",
    tag: "Schematic & PCB Layout",
    points: ["Schematic capture", "2-Layer PCB layout", "Design rule checking (DRC)"]
  }
];

export const LINUX_ENVIRONMENT = {
  title: "LINUX & DEVELOPMENT WORKFLOW",
  description: "Comfortable working with Linux-based development environments, command-line workflows, Git version control, build tools, and embedded toolchains.",
  tools: [
    "Ubuntu",
    "Red Hat Enterprise Linux",
    "Command-Line Workflows",
    "Git / GitHub",
    "Embedded Toolchains"
  ]
};

export const ACHIEVEMENTS = [
  {
    num: "01",
    title: "PARIVARTHAN 2026 Technical Hackathon",
    org: "VVCE Mysuru • State-Level Technical Hackathon",
    category: "Technical Competition"
  },
  {
    num: "02",
    title: "GITAM College Technical Hackathon",
    org: "GITAM University • Smart Waste Management Prototype",
    category: "Innovation Hackathon"
  },
  {
    num: "03",
    title: "CEPHUS Technical Forum",
    org: "State-Level Technical Challenge",
    category: "Technical Challenge"
  },
  {
    num: "04",
    title: "10+ State & National Hackathons",
    org: "Active Technical Competition & Prototyping Participation",
    category: "Competitive Exposure"
  }
];

export const CERTIFICATIONS = [
  {
    id: "cert-aiot",
    num: "01",
    name: "AIoT: AI of Things",
    org: "Ramaiah Skill Academy",
    year: "2024",
    category: "embedded-iot",
    badge: "Embedded / IoT"
  },
  {
    id: "cert-simulink",
    num: "02",
    name: "Deploying Simulink Models to Embedded Targets",
    org: "Ramaiah Skill Academy",
    year: "2024",
    category: "simulation",
    badge: "Simulation"
  },
  {
    id: "cert-python",
    num: "03",
    name: "Python Certification",
    org: "OneRoadmap",
    year: "2023",
    category: "software",
    badge: "Software"
  },
  {
    id: "cert-industry4",
    num: "04",
    name: "Industry 4.0 & Industrial IoT",
    org: "NPTEL",
    year: "2024",
    category: "embedded-iot",
    badge: "Embedded / IoT"
  },
  {
    id: "cert-ai-literacy",
    num: "05",
    name: "AI Literacy Certification",
    org: "IBM SkillsBuild",
    year: "2024",
    category: "ai",
    badge: "AI"
  },
  {
    id: "cert-promptwars",
    num: "06",
    name: "PromptWars Virtual",
    org: "Generative AI Solution Forum / Hack2skill",
    year: "2024",
    category: "ai",
    badge: "AI"
  }
];

export const BEYOND_ENGINEERING = [
  {
    title: "HUMANITY CALLS TRUST",
    org: "Community Welfare Initiative",
    role: "Approved Volunteer",
    desc: "Actively participated in community support and social welfare initiatives, demonstrating social responsibility, teamwork, and leadership."
  },
  {
    title: "CHIGAURU 2025",
    org: "Cultural & Arts Fest",
    role: "Runner-Up • Western Dance",
    desc: "Secured Runner-Up in the Western Dance competition at Chigauru 2025, demonstrating discipline, creative expression, and teamwork."
  }
];

export const EDUCATION_HISTORY = [
  {
    institution: "Cambridge Institute of Technology",
    degree: "B.E. Electronics & Communication Engineering",
    location: "Bengaluru, Karnataka",
    period: "2023 – 2027",
    score: "CGPA: 7.0 / 10",
    detail: "Core study in Embedded Systems, Digital Electronics, VLSI Design, Communication Networks, and Real-Time Systems."
  },
  {
    institution: "Sri Narayana PU College",
    degree: "Pre-University Course (PUC) — Science (PCMB)",
    location: "Bengaluru, Karnataka",
    period: "2021 – 2023",
    score: "Percentage: 82.96%",
    detail: "Focus on Physics, Chemistry, Mathematics, and Biology."
  },
  {
    institution: "SFS High School",
    degree: "Secondary School Leaving Certificate (SSLC)",
    location: "Bengaluru, Karnataka",
    period: "2020 – 2021",
    score: "Percentage: 74.56%",
    detail: "General Secondary School Curriculum with strong foundation in mathematics and science."
  }
];
