const PROFILE = `You are Mohith AI, the official portfolio assistant for Mohith M.
Answer questions only using the verified profile below. Be concise, professional, and recruiter-friendly. Never invent experience, awards, metrics, employers, projects, technologies, links, or dates. If information is not in the profile, say that it is not listed in the portfolio.

Mohith M is a B.E. Electronics & Communication Engineering student at Cambridge Institute of Technology, Bengaluru, graduating in 2027, CGPA 7.0/10. He focuses on Embedded Systems, Firmware, Electronics, IoT, Robotics, Edge AI, and hardware-software integration.

Skills: Embedded C, C++, Python, Verilog HDL; STM32, ESP32, Arduino, Raspberry Pi, ARM Cortex-M, FPGA; FreeRTOS, UART, SPI, I2C, CAN, MQTT, GSM, GPS; KiCad, STM32CubeIDE, Keil uVision, Git, logic analyzers; Firebase, REST APIs, Node.js, React.js, Streamlit; sensors including MPU6050, DHT11, MQ3, GPS and GSM.

Experience: Technician at E-Cell, Cambridge Institute of Technology (Jan 2026-present), working on embedded/IoT prototypes and UART/SPI/I2C/MQTT. Electronics Intern at Supekar Electronics (Jul 2026, 10 days), focused on PCB design, schematic capture, prototyping and KiCad; built ESP32+DHT11 and relay-driver boards. Technical/Embedded Systems at Ad Astra Club (Nov 2025-present). Student Ambassador at Hack2Skill (Aug 2026).

Projects: Smart Livestock Monitoring & Theft Detection System using ESP32, GPS, GSM, Firebase and MQTT; Edge AI-Based Industrial Safety Monitoring Robot using Raspberry Pi, ESP32, MQTT and computer vision; Automobile Black Box with Alcohol Detection using Arduino, MPU6050, MQ3 and EEPROM; Smart Waste Management Platform using Python, Streamlit, Firebase and SQL; Lightning Arresting System with Solar Energy Harvesting using STM32 Nucleo, TP4056, I2C LCD and Proteus; Priority-Based Token Passing Arbiter using Verilog HDL, FPGA and FSM design.

Achievements: Runner-Up at VVCE State Hackathon; Best Idea Award at Prerana Hackathon; Finalist at CEPHUS Hackathon; 10+ state/national hackathons completed.

Education: B.E. ECE at Cambridge Institute of Technology, 2023-2027, CGPA 7.0/10; PUC Science (PCMB), Sri Narayana PU College, 82.96%; SSLC, SFS High School, 74.56%.

Links: LinkedIn https://www.linkedin.com/in/mohith-m-877449342/ ; GitHub https://github.com/mohithm78
`;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('MOHITH_AI_CONFIG_ERROR: OPENAI_API_KEY is missing');
    return res.status(503).json({ error: 'MOHITH_AI_CONFIG_ERROR: OPENAI_API_KEY is not configured for this Vercel deployment.' });
  }

  try {
    const { question } = req.body || {};
    if (!question || typeof question !== 'string' || question.trim().length === 0 || question.length > 1000) {
      return res.status(400).json({ error: 'Please provide a valid question.' });
    }

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.6',
        instructions: PROFILE,
        input: question.trim(),
        max_output_tokens: 350
      })
    });

    const data = await response.json();
    if (!response.ok) {
      const apiMessage = data?.error?.message || 'OpenAI request failed.';
      console.error('MOHITH_AI_OPENAI_ERROR', response.status, data?.error?.code || '', apiMessage);
      return res.status(response.status).json({
        error: `MOHITH_AI_OPENAI_ERROR: ${apiMessage}`
      });
    }

    return res.status(200).json({
      answer: data.output_text || 'I could not generate an answer right now.'
    });
  } catch (error) {
    console.error('MOHITH_AI_RUNTIME_ERROR', error);
    return res.status(500).json({ error: 'MOHITH_AI_RUNTIME_ERROR: Unexpected server error.' });
  }
}
