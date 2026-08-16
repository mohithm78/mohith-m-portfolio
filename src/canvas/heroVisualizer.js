// Minimalist Precision Engineering Blueprint Visualizer
// Low-contrast, high-craft architectural schematic for hardware-software integration

export class HeroVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.width = 0;
    this.height = 0;
    this.time = 0;
    this.hoveredBlock = null;
    this.animationFrameId = null;

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Architectural System Blocks
    this.blocks = [
      { id: 'mcu', label: 'STM32 / ESP32 MCU', sub: 'ARM Cortex-M • FreeRTOS Kernel', x: 0.5, y: 0.18, w: 180, h: 48, tag: '32-BIT CORE' },
      { id: 'sensors', label: 'TRANSDUCERS / SENSORS', sub: 'ADC • IMU • I2C Bus Nodes', x: 0.22, y: 0.50, w: 160, h: 48, tag: 'ANALOG / DIGITAL' },
      { id: 'firmware', label: 'FIRMWARE & ISRs', sub: 'Ring Buffers • Low-Level HAL', x: 0.78, y: 0.50, w: 160, h: 48, tag: 'DETERMINISTIC' },
      { id: 'comm', label: 'COMMUNICATION BUS', sub: 'UART • SPI • CAN 2.0B • MQTT', x: 0.5, y: 0.76, w: 190, h: 48, tag: 'PHYSICAL LAYER' }
    ];

    this.routes = [
      { from: 0, to: 1, label: 'DMA / I2C' },
      { from: 0, to: 2, label: 'SysTick / EXTI' },
      { from: 1, to: 3, label: 'Filtered Telemetry' },
      { from: 2, to: 3, label: 'Packet Serialization' }
    ];

    this.pulses = [
      { routeIdx: 0, progress: 0.2, speed: 0.005 },
      { routeIdx: 1, progress: 0.6, speed: 0.006 },
      { routeIdx: 2, progress: 0.4, speed: 0.005 },
      { routeIdx: 3, progress: 0.8, speed: 0.007 }
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width;
      const my = (e.clientY - rect.top) / rect.height;
      this.checkHover(mx * this.width, my * this.height);
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.hoveredBlock = null;
    });

    this.animate();
  }

  checkHover(px, py) {
    let found = null;
    this.blocks.forEach((b, idx) => {
      const bx = b.x * this.width;
      const by = b.y * this.height;
      if (
        px >= bx - b.w / 2 &&
        px <= bx + b.w / 2 &&
        py >= by - b.h / 2 &&
        py <= by + b.h / 2
      ) {
        found = idx;
      }
    });
    this.hoveredBlock = found;
  }

  resize() {
    const parent = this.canvas.parentElement;
    this.width = parent ? parent.clientWidth : 460;
    this.height = parent ? parent.clientHeight : 380;

    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  animate() {
    if (!this.reducedMotion) {
      this.time += 0.015;
      this.pulses.forEach(p => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
      });
    }

    this.draw();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  draw() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    // Subtle dark engineering grid (fine grid lines)
    ctx.strokeStyle = '#18181B';
    ctx.lineWidth = 1;
    const gridStep = 32;
    for (let x = 0; x < w; x += gridStep) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Draw interconnect traces
    this.routes.forEach(route => {
      const b1 = this.blocks[route.from];
      const b2 = this.blocks[route.to];

      const x1 = b1.x * w;
      const y1 = b1.y * h;
      const x2 = b2.x * w;
      const y2 = b2.y * h;

      // Base copper line
      ctx.beginPath();
      ctx.strokeStyle = '#27272A';
      ctx.lineWidth = 1.5;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Solder point terminals
      ctx.fillStyle = '#3F3F46';
      ctx.beginPath();
      ctx.arc(x1, y1, 2.5, 0, Math.PI * 2);
      ctx.arc(x2, y2, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw subtle moving data pulses (low contrast, warm tone)
    if (!this.reducedMotion) {
      this.pulses.forEach(p => {
        const route = this.routes[p.routeIdx];
        const b1 = this.blocks[route.from];
        const b2 = this.blocks[route.to];

        const x1 = b1.x * w;
        const y1 = b1.y * h;
        const x2 = b2.x * w;
        const y2 = b2.y * h;

        const curX = x1 + (x2 - x1) * p.progress;
        const curY = y1 + (y2 - y1) * p.progress;

        ctx.fillStyle = '#C8B69B';
        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Draw system architecture blocks
    this.blocks.forEach((b, idx) => {
      const bx = b.x * w;
      const by = b.y * h;
      const isHover = this.hoveredBlock === idx;
      const bw = Math.min(b.w, w * 0.44);
      const bh = b.h;

      // Card body
      ctx.fillStyle = isHover ? '#1F1F23' : '#141416';
      ctx.strokeStyle = isHover ? '#C8B69B' : '#2E2E33';
      ctx.lineWidth = isHover ? 1.5 : 1;

      ctx.beginPath();
      ctx.roundRect(bx - bw / 2, by - bh / 2, bw, bh, 4);
      ctx.fill();
      ctx.stroke();

      // Tag
      ctx.fillStyle = isHover ? '#C8B69B' : '#71717A';
      ctx.font = '600 8px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(b.tag, bx + bw / 2 - 8, by - bh / 2 + 12);

      // Status indicator point
      ctx.fillStyle = isHover ? '#C8B69B' : '#52525B';
      ctx.beginPath();
      ctx.arc(bx - bw / 2 + 10, by, 3, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = isHover ? '#FFFFFF' : '#EDEDEA';
      ctx.font = '700 9.5px "Space Grotesk", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(b.label, bx - bw / 2 + 20, by - 2);

      // Subtitle
      ctx.fillStyle = '#8E8E93';
      ctx.font = '500 8px "Inter", sans-serif';
      ctx.fillText(b.sub, bx - bw / 2 + 20, by + 12);
    });
  }
}
