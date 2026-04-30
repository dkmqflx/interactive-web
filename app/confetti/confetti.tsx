"use client";

import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;

function randomNumBetween(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 255, g: 255, b: 255 };
}

const DEFAULT_COLORS = [
  "#FF577F", // hot pink
  "#FF8C42", // tangerine
  "#FFD93D", // gold yellow
  "#6BCB77", // mint
  "#4DC9FF", // sky blue
  "#C266FF", // violet
];
type Shape = "circle" | "square";
const DEFAULT_SHAPES: Shape[] = ["circle", "square"];

type ParticleOpts = {
  nx: number;
  ny: number;
  deg: number;
  colors: string[];
  shapes: Shape[];
  spread: number;
  canvasWidth: number;
  canvasHeight: number;
};

class Particle {
  angle: number;
  r: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  friction = 0.89;
  gravity = 0.5;
  width: number;
  height: number;
  opacity = 1;
  widthDelta: number;
  heightDelta: number;
  rotation: number;
  rotationDelta: number;
  color: { r: number; g: number; b: number };
  shape: Shape;

  constructor(opts: ParticleOpts) {
    this.angle =
      (Math.PI / 180) *
      randomNumBetween(opts.deg - opts.spread, opts.deg + opts.spread);
    this.r = randomNumBetween(30, 100);
    this.x = opts.canvasWidth * opts.nx;
    this.y = opts.canvasHeight * opts.ny;
    this.vx = this.r * Math.cos(this.angle);
    this.vy = this.r * Math.sin(this.angle);

    // ~20% of particles are wide streamers; the rest are roughly square confetti with size jitter.
    if (Math.random() < 0.2) {
      this.width = randomNumBetween(18, 26);
      this.height = randomNumBetween(5, 8);
    } else {
      const base = randomNumBetween(10, 15);
      this.width = base;
      this.height = base;
    }

    this.widthDelta = randomNumBetween(0, 360);
    this.heightDelta = randomNumBetween(0, 360);
    this.rotation = randomNumBetween(0, 360);
    this.rotationDelta = randomNumBetween(-1, 1);
    this.color = hexToRgb(
      opts.colors[Math.floor(randomNumBetween(0, opts.colors.length - 1))],
    );
    this.shape =
      opts.shapes[Math.floor(randomNumBetween(0, opts.shapes.length - 1))];
  }

  update() {
    this.vy += this.gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.005;
    this.widthDelta += 2;
    this.heightDelta += 2;
    this.rotation += this.rotationDelta;
  }

  drawCircle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      Math.abs(this.width * Math.cos((Math.PI / 180) * this.widthDelta)) / 2,
      Math.abs(this.height * Math.sin((Math.PI / 180) * this.heightDelta)) / 2,
      0,
      0,
      TAU,
    );
    ctx.fill();
    ctx.closePath();
  }

  drawSquare(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(
      this.x,
      this.y,
      this.width * Math.cos((Math.PI / 180) * this.widthDelta),
      this.height * Math.sin((Math.PI / 180) * this.heightDelta),
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x + this.width * 1.2, this.y + this.height * 1.2);
    ctx.rotate((Math.PI / 180) * this.rotation);
    ctx.translate(-this.x - this.width * 1.2, -this.y - this.height * 1.2);
    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
    if (this.shape === "circle") this.drawCircle(ctx);
    else this.drawSquare(ctx);
    ctx.restore();
  }
}

export default function Confetti() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio > 1 ? 2 : 1;
    const interval = 1000 / 60;

    let canvasWidth = 0;
    let canvasHeight = 0;
    const particles: Particle[] = [];

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      canvasWidth = rect.width;
      canvasHeight = rect.height;
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    type Burst = {
      nx: number;
      ny: number;
      count: number;
      deg: number;
      colors?: string[];
      shapes?: Shape[];
      spread?: number;
    };

    const confetti = (opts: Burst) => {
      const colors = opts.colors ?? DEFAULT_COLORS;
      const shapes = opts.shapes ?? DEFAULT_SHAPES;
      const spread = opts.spread ?? 30;
      for (let i = 0; i < opts.count; i++) {
        particles.push(
          new Particle({
            nx: opts.nx,
            ny: opts.ny,
            deg: opts.deg,
            colors,
            shapes,
            spread,
            canvasWidth,
            canvasHeight,
          }),
        );
      }
    };

    let rafId = 0;
    let then = Date.now();
    let deg = 0;

    const frame = () => {
      rafId = requestAnimationFrame(frame);
      const now = Date.now();
      const delta = now - then;
      if (delta < interval) return;
      if (canvasWidth === 0 || canvasHeight === 0) return;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      deg += 1;

      confetti({ nx: 0.5, ny: 0.5, count: 5, deg: 225 + deg, spread: 1 });
      confetti({ nx: 0.5, ny: 0.5, count: 5, deg: 90 + deg, spread: 1 });
      confetti({ nx: 0.5, ny: 0.5, count: 5, deg: 315 + deg, spread: 1 });

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.opacity < 0 || p.y > canvasHeight) particles.splice(i, 1);
      }

      then = now - (delta % interval);
    };

    const onClick = () => {
      confetti({ nx: 0, ny: 0.5, count: 10, deg: -50 });
    };

    resize();
    rafId = requestAnimationFrame(frame);
    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);
    wrapper.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      wrapper.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative h-svh w-full cursor-pointer overflow-hidden bg-black select-none"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        className="z-0"
      />
    </div>
  );
}
