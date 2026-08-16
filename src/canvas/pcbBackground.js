// Realistic Engineering 3D PCB Canvas with Lighting & Parallax
// Resembles a clean semiconductor laboratory / high-end hardware engineering workstation

export class PCBBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.width = 0;
    this.height = 0;
    this.mouseX = 0.5;
    this.mouseY = 0.5;
    this.targetMouseX = 0.5;
    this.targetMouseY = 0.5;
    this.time = 0;
    this.animationFrameId = null;

    // Check prefers-reduced-motion
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Mouse movement parallax & specular light tracker
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = e.clientX / window.innerWidth;
      this.targetMouseY = e.clientY / window.innerHeight;
    });

    this.animate();
  }

  resize() {
    this.width = this.canvas.parentElement.clientWidth || window.innerWidth;
    this.height = this.canvas.parentElement.clientHeight || window.innerHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  animate() {
    if (!this.reducedMotion) {
      // Smooth lerp mouse tracking
      this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
      this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;
      this.time += 0.015;
    }

    this.draw();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  draw() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Parallax offsets
    const px = (this.mouseX - 0.5) * 28;
    const py = (this.mouseY - 0.5) * 20;

    // 1. Dark Substrate Background (Deep Obsidian Green/Navy FR4)
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#060A12';
    ctx.fillRect(0, 0, w, h);

    // Subtle FR4 PCB woven texture grid
    ctx.save();
    ctx.strokeStyle = 'rgba(15, 28, 48, 0.45)';
    ctx.lineWidth = 1;
    const gridSize = 32;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.restore();

    // 2. Realistic Copper Traces with Parallax Shift
    ctx.save();
    ctx.translate(px * 0.5, py * 0.5);

    // Trace layer 1: Ground Plane and Bus Paths
    const traceColor = 'rgba(56, 189, 248, 0.12)';
    const activeTraceColor = 'rgba(0, 229, 255, 0.35)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw routing bus bundles
    this.drawTraceBundle(ctx, w * 0.1, h * 0.2, w * 0.45, h * 0.45, traceColor);
    this.drawTraceBundle(ctx, w * 0.75, h * 0.15, w * 0.48, h * 0.65, traceColor);
    this.drawTraceBundle(ctx, w * 0.2, h * 0.85, w * 0.55, h * 0.6, traceColor);
    this.drawTraceBundle(ctx, w * 0.82, h * 0.75, w * 0.6, h * 0.5, traceColor);

    // Dynamic signal pulses moving along traces
    const pulseProgress1 = (this.time * 0.4) % 1;
    const pulseProgress2 = (this.time * 0.6 + 0.5) % 1;
    this.drawSignalPacket(ctx, w * 0.1, h * 0.2, w * 0.45, h * 0.45, pulseProgress1, '#00E5FF');
    this.drawSignalPacket(ctx, w * 0.75, h * 0.15, w * 0.48, h * 0.65, pulseProgress2, '#38BDF8');

    ctx.restore();

    // 3. Physical Electronic Components Layer (STM32 QFP, ESP32, SMD Resistors, Capacitors, LEDs)
    ctx.save();
    ctx.translate(px, py);

    // Component A: Central STM32 ARM Cortex-M QFP-64 Package
    const mcuX = w * 0.72;
    const mcuY = h * 0.38;
    this.drawQFPPackage(ctx, mcuX, mcuY, 80, "STM32F4", "ARM CORTEX-M4");

    // Component B: ESP32-WROOM-32 Module with RF Shield & PCB Antenna
    const espX = w * 0.18;
    const espY = h * 0.65;
    this.drawESP32Module(ctx, espX, espY, 95, 125);

    // Component C: Passive SMT 0805 Resistors & Decoupling Caps
    this.drawSMDResistor(ctx, mcuX - 70, mcuY - 20, 16, 8, "10k");
    this.drawSMDResistor(ctx, mcuX - 70, mcuY + 10, 16, 8, "4.7k");
    this.drawSMDCapacitor(ctx, mcuX - 70, mcuY + 35, 18, 10, "100nF");
    this.drawSMDCapacitor(ctx, mcuX + 65, mcuY - 30, 20, 12, "10µF");

    // Component D: 8-Pin Debug Header (SWD / JTAG / UART)
    this.drawPinHeader(ctx, mcuX + 75, mcuY + 25, 4, 2, "DEBUG_SWD");

    // Component E: Power Status & Heartbeat LEDs with realistic soft glow
    this.drawStatusLED(ctx, mcuX - 50, mcuY - 60, '#10B981', 'PWR 3V3', true);
    this.drawStatusLED(ctx, mcuX - 30, mcuY - 60, '#00E5FF', 'SYS_TICK', (Math.sin(this.time * 4) > 0));
    this.drawStatusLED(ctx, espX + 35, espY - 50, '#38BDF8', 'WIFI_ACT', (Math.sin(this.time * 6) > 0.3));

    ctx.restore();

    // 4. Moving Specular Lighting Reflection based on Mouse Position
    const lightX = this.mouseX * w;
    const lightY = this.mouseY * h;
    const radialGlow = ctx.createRadialGradient(lightX, lightY, 20, lightX, lightY, w * 0.65);
    radialGlow.addColorStop(0, 'rgba(0, 229, 255, 0.07)');
    radialGlow.addColorStop(0.5, 'rgba(14, 165, 233, 0.02)');
    radialGlow.addColorStop(1, 'rgba(6, 10, 18, 0)');

    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 0, w, h);
  }

  // Draw 45-degree angled PCB trace bundle
  drawTraceBundle(ctx, x1, y1, x2, y2, color) {
    ctx.strokeStyle = color;
    const midX = x1 + (x2 - x1) * 0.5;
    
    for (let offset = -12; offset <= 12; offset += 8) {
      ctx.beginPath();
      ctx.moveTo(x1 + offset, y1);
      ctx.lineTo(midX + offset, y1);
      ctx.lineTo(midX + (y2 - y1) * 0.4 + offset, y2);
      ctx.lineTo(x2 + offset, y2);
      ctx.stroke();

      // Vias at trace endpoints
      ctx.fillStyle = 'rgba(0, 229, 255, 0.25)';
      ctx.beginPath();
      ctx.arc(x1 + offset, y1, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x2 + offset, y2, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Draw discrete data packet pulse traveling down the copper trace
  drawSignalPacket(ctx, x1, y1, x2, y2, progress, color) {
    const midX = x1 + (x2 - x1) * 0.5;
    const cornerX = midX + (y2 - y1) * 0.4;

    let curX, curY;
    if (progress < 0.35) {
      const p = progress / 0.35;
      curX = x1 + (midX - x1) * p;
      curY = y1;
    } else if (progress < 0.7) {
      const p = (progress - 0.35) / 0.35;
      curX = midX + (cornerX - midX) * p;
      curY = y1 + (y2 - y1) * p;
    } else {
      const p = (progress - 0.7) / 0.3;
      curX = cornerX + (x2 - cornerX) * p;
      curY = y2;
    }

    ctx.save();
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(curX, curY, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Draw realistic QFP/QFN Microcontroller IC Package
  drawQFPPackage(ctx, cx, cy, size, label, sublabel) {
    const half = size / 2;
    ctx.save();

    // Package Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(cx - half + 4, cy - half + 6, size, size);

    // IC Body (Matte Epoxy Molded Resin)
    ctx.fillStyle = '#0F172A';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(cx - half, cy - half, size, size, 4);
    ctx.fill();
    ctx.stroke();

    // Pin 1 Index Dot
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.arc(cx - half + 8, cy - half + 8, 3, 0, Math.PI * 2);
    ctx.fill();

    // IC Copper Lead Pins (Gold / Tin finish)
    ctx.fillStyle = '#38BDF8';
    const pinCount = 8;
    const pinSpacing = size / (pinCount + 1);

    for (let i = 1; i <= pinCount; i++) {
      const pOffset = -half + i * pinSpacing;
      // Top pins
      ctx.fillRect(cx + pOffset - 1.5, cy - half - 6, 3, 6);
      // Bottom pins
      ctx.fillRect(cx + pOffset - 1.5, cy + half, 3, 6);
      // Left pins
      ctx.fillRect(cx - half - 6, cy + pOffset - 1.5, 6, 3);
      // Right pins
      ctx.fillRect(cx + half, cy + pOffset - 1.5, 6, 3);
    }

    // Laser-etched text
    ctx.fillStyle = '#94A3B8';
    ctx.font = '700 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(label, cx, cy - 2);

    ctx.fillStyle = '#64748B';
    ctx.font = '600 6px "JetBrains Mono", monospace';
    ctx.fillText(sublabel, cx, cy + 10);

    ctx.restore();
  }

  // Draw realistic ESP32-WROOM-32 Module
  drawESP32Module(ctx, x, y, width, height) {
    ctx.save();

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(x + 4, y + 6, width, height);

    // ESP32 PCB Substrate (Black FR4)
    ctx.fillStyle = '#090D16';
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 4);
    ctx.fill();
    ctx.stroke();

    // Metal RF Shielding Can
    ctx.fillStyle = '#1E293B';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x + 8, y + 36, width - 16, height - 44, 2);
    ctx.fill();
    ctx.stroke();

    // Laser Engraved ESP32 Shield Text
    ctx.fillStyle = '#94A3B8';
    ctx.font = '700 8px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText("ESP-WROOM-32", x + width / 2, y + 54);
    ctx.fillStyle = '#64748B';
    ctx.font = '600 6px "JetBrains Mono", monospace';
    ctx.fillText("FCC ID: 2AC7Z-ESPWROOM32", x + width / 2, y + 66);
    ctx.fillText("2.4GHz Wi-Fi + BLE", x + width / 2, y + 76);

    // PCB Inverted-F Meander Antenna Trace (Top Gold / Copper)
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + 16, y + 26);
    ctx.lineTo(x + width - 16, y + 26);
    ctx.lineTo(x + width - 16, y + 10);
    ctx.lineTo(x + width - 32, y + 10);
    ctx.lineTo(x + width - 32, y + 20);
    ctx.lineTo(x + width - 44, y + 20);
    ctx.lineTo(x + width - 44, y + 10);
    ctx.lineTo(x + 16, y + 10);
    ctx.stroke();

    // Side Castellated Solder Pads
    ctx.fillStyle = '#F59E0B';
    const padCount = 10;
    const padSpacing = (height - 30) / padCount;
    for (let i = 0; i < padCount; i++) {
      const py = y + 25 + i * padSpacing;
      ctx.fillRect(x - 1, py, 4, 3);
      ctx.fillRect(x + width - 3, py, 4, 3);
    }

    ctx.restore();
  }

  // Draw SMD 0805 Resistor
  drawSMDResistor(ctx, x, y, w, h, value) {
    ctx.save();
    // Body (Black ceramic)
    ctx.fillStyle = '#020617';
    ctx.fillRect(x, y, w, h);
    // End Terminals (Tin finish)
    ctx.fillStyle = '#CBD5E1';
    ctx.fillRect(x, y, 3.5, h);
    ctx.fillRect(x + w - 3.5, y, 3.5, h);
    // Silkscreen text
    ctx.fillStyle = '#64748B';
    ctx.font = '5px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(value, x + w / 2, y - 2);
    ctx.restore();
  }

  // Draw SMD Ceramic Capacitor (Brown / Tan body)
  drawSMDCapacitor(ctx, x, y, w, h, value) {
    ctx.save();
    // Body (Tan ceramic)
    ctx.fillStyle = '#78350F';
    ctx.fillRect(x, y, w, h);
    // End Terminals
    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(x, y, 4, h);
    ctx.fillRect(x + w - 4, y, 4, h);
    // Silkscreen
    ctx.fillStyle = '#64748B';
    ctx.font = '5px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(value, x + w / 2, y - 2);
    ctx.restore();
  }

  // Draw 2.54mm Pin Header Strip
  drawPinHeader(ctx, x, y, rows, cols, label) {
    ctx.save();
    ctx.fillStyle = '#090D16';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    const boxW = rows * 8 + 4;
    const boxH = cols * 8 + 4;
    ctx.fillRect(x, y, boxW, boxH);
    ctx.strokeRect(x, y, boxW, boxH);

    // Gold Pins inside square plastic shroud
    ctx.fillStyle = '#F59E0B';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        ctx.arc(x + 6 + r * 8, y + 6 + c * 8, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.fillStyle = '#64748B';
    ctx.font = '5px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(label, x, y + boxH + 7);
    ctx.restore();
  }

  // Draw surface mount status LED
  drawStatusLED(ctx, x, y, color, label, isOn) {
    ctx.save();
    // Plastic base
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(x - 3, y - 3, 6, 6);

    // LED Lens
    ctx.fillStyle = isOn ? color : 'rgba(100, 116, 139, 0.4)';
    if (isOn) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
    }
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Silkscreen
    ctx.fillStyle = '#64748B';
    ctx.font = '5px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, y + 10);
    ctx.restore();
  }
}
