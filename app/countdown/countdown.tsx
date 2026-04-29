"use client";

import { useEffect, useRef, useState } from "react";

const TAU = Math.PI * 2;

type Color = [number, number, number]; // [hue, saturation%, lightness%]
const WHITE: Color = [0, 0, 100];
const CYAN: Color = [190, 90, 70];
const AMBER: Color = [40, 100, 65];

type ParticleOpts = {
  startR: number;
  color: Color;
  size: number;
  speedMul: number;
  fadeRate: number;
};

class Particle {
  r: number;
  angle: number;
  rAlpha: number;
  rFriction: number;
  angleAlpha: number;
  angleFriction: number;
  opacity: number;
  color: Color;
  size: number;
  fadeRate: number;
  x = 0;
  y = 0;

  constructor(opts: ParticleOpts) {
    this.r = opts.startR;
    this.angle = Math.random() * 360;
    this.rAlpha = (Math.random() * 5 + 1) * opts.speedMul;
    this.rFriction = 0.95 + Math.random() * 0.06;
    this.angleAlpha = 1 + Math.random();
    this.angleFriction = 0.97 + Math.random() * 0.02;
    this.opacity = 0.6 + Math.random() * 0.4;
    this.color = opts.color;
    this.size = opts.size;
    this.fadeRate = opts.fadeRate;
  }

  update(cx: number, cy: number) {
    this.rAlpha *= this.rFriction;
    this.r += this.rAlpha;
    this.angleAlpha *= this.angleFriction;
    this.angle += this.angleAlpha;
    const rad = (this.angle * Math.PI) / 180;
    this.x = cx + this.r * Math.cos(rad);
    this.y = cy + this.r * Math.sin(rad);
    this.opacity -= this.fadeRate;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const [h, s, l] = this.color;
    ctx.beginPath();
    ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${this.opacity})`;
    ctx.arc(this.x, this.y, this.size, 0, TAU);
    ctx.fill();
    ctx.closePath();
  }
}

class Shockwave {
  cx: number;
  cy: number;
  r: number;
  maxR: number;
  opacity = 1;

  constructor(cx: number, cy: number, startR: number, maxR: number) {
    this.cx = cx;
    this.cy = cy;
    this.r = startR;
    this.maxR = maxR;
  }

  update() {
    this.r += (this.maxR - this.r) * 0.06;
    this.opacity -= 0.014;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.opacity <= 0) return;
    ctx.save();
    ctx.shadowColor = `rgba(160, 220, 255, ${this.opacity})`;
    ctx.shadowBlur = 24;
    ctx.strokeStyle = `rgba(220, 240, 255, ${this.opacity * 0.85})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.cx, this.cy, this.r, 0, TAU);
    ctx.stroke();
    ctx.restore();
  }
}

class Flash {
  cx: number;
  cy: number;
  radius: number;
  opacity = 1;

  constructor(cx: number, cy: number, radius: number) {
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
  }

  update() {
    this.opacity -= 0.06;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.opacity <= 0) return;
    const grd = ctx.createRadialGradient(
      this.cx,
      this.cy,
      0,
      this.cx,
      this.cy,
      this.radius,
    );
    grd.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.9})`);
    grd.addColorStop(0.45, `rgba(180, 220, 255, ${this.opacity * 0.4})`);
    grd.addColorStop(1, "rgba(180, 220, 255, 0)");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(this.cx, this.cy, this.radius, 0, TAU);
    ctx.fill();
    ctx.closePath();
  }
}

class Star {
  x: number;
  y: number;
  baseAlpha: number;
  phase: number;
  size: number;

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.baseAlpha = 0.3 + Math.random() * 0.45;
    this.phase = Math.random() * TAU;
    this.size = Math.random() < 0.85 ? 0.7 : 1.3;
  }

  draw(ctx: CanvasRenderingContext2D, t: number) {
    const a = this.baseAlpha * (0.55 + 0.45 * Math.sin(t * 0.0015 + this.phase));
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
    ctx.arc(this.x, this.y, this.size, 0, TAU);
    ctx.fill();
    ctx.closePath();
  }
}

function drawRing(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  baseR: number,
  opacity: number,
  intensity: number,
  t: number,
) {
  if (opacity <= 0.01) return;
  ctx.save();

  // Outer halo
  ctx.strokeStyle = `rgba(180, 220, 255, ${0.1 * opacity})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, baseR * 1.18, 0, TAU);
  ctx.stroke();

  // Inner faint ring
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * opacity})`;
  ctx.beginPath();
  ctx.arc(cx, cy, baseR * 0.82, 0, TAU);
  ctx.stroke();

  // Main glow ring
  ctx.shadowColor = `rgba(180, 220, 255, ${0.7 * opacity})`;
  ctx.shadowBlur = 22 + 32 * intensity;
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.85 * opacity})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, baseR, 0, TAU);
  ctx.stroke();

  // Rotating dashed inner ring
  ctx.shadowBlur = 0;
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.55 * opacity})`;
  ctx.lineWidth = 4;
  ctx.setLineDash([18, 22]);
  ctx.lineDashOffset = -t * (0.04 + 0.2 * intensity);
  ctx.beginPath();
  ctx.arc(cx, cy, baseR - 14, 0, TAU);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.restore();
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const POP_KEYFRAMES: Keyframe[] = [
  { opacity: 0, transform: "scale(5)" },
  { opacity: 1, transform: "scale(1)" },
];
const POP_OPTIONS: KeyframeAnimationOptions = {
  duration: 400,
  easing: "cubic-bezier(0.165, 0.84, 0.44, 1)",
  fill: "forwards",
};

export default function Countdown() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const span5Ref = useRef<HTMLSpanElement>(null);
  const span4Ref = useRef<HTMLSpanElement>(null);
  const span3Ref = useRef<HTMLSpanElement>(null);
  const span2Ref = useRef<HTMLSpanElement>(null);
  const span1Ref = useRef<HTMLSpanElement>(null);

  const engineRef = useRef<{
    setIntensityTarget: (v: number) => void;
    fireBurst: () => void;
    reset: () => void;
  } | null>(null);
  const runningRef = useRef(false);
  const [running, setRunning] = useState(false);

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
    const shockwaves: Shockwave[] = [];
    const flashes: Flash[] = [];
    let stars: Star[] = [];

    let intensity = 0;
    let intensityTarget = 0;
    let ringOpacity = 1;
    let ringOpacityTarget = 1;

    const baseRingRadius = () => Math.min(canvasWidth, canvasHeight) / 4;

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

      stars = [];
      const starTarget = Math.round((canvasWidth * canvasHeight) / 22000);
      const starCount = Math.max(30, Math.min(80, starTarget));
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star(canvasWidth, canvasHeight));
      }
    };

    engineRef.current = {
      setIntensityTarget: (v) => {
        intensityTarget = v;
      },
      fireBurst: () => {
        ringOpacityTarget = 0;
        const cx = canvasWidth / 2;
        const cy = canvasHeight / 2;
        const baseR = baseRingRadius();

        flashes.push(new Flash(cx, cy, baseR * 2.4));
        shockwaves.push(
          new Shockwave(cx, cy, baseR, Math.max(canvasWidth, canvasHeight) * 1.05),
        );

        // Wave 1 — inner white, fastest
        for (let i = 0; i < 600; i++) {
          particles.push(
            new Particle({
              startR: baseR * 0.7,
              color: WHITE,
              size: 1,
              speedMul: 1.2,
              fadeRate: 0.005,
            }),
          );
        }
        // Wave 2 — mid cyan
        for (let i = 0; i < 400; i++) {
          particles.push(
            new Particle({
              startR: baseR,
              color: CYAN,
              size: 1.3,
              speedMul: 0.9,
              fadeRate: 0.0042,
            }),
          );
        }
        // Wave 3 — outer amber
        for (let i = 0; i < 300; i++) {
          particles.push(
            new Particle({
              startR: baseR * 1.1,
              color: AMBER,
              size: 1.5,
              speedMul: 0.7,
              fadeRate: 0.0035,
            }),
          );
        }
      },
      reset: () => {
        ringOpacity = 1;
        ringOpacityTarget = 1;
        intensity = 0;
        intensityTarget = 0;
      },
    };

    let rafId = 0;
    let then = Date.now();
    const frame = () => {
      rafId = requestAnimationFrame(frame);
      const now = Date.now();
      const delta = now - then;
      if (delta < interval) return;
      if (canvasWidth === 0 || canvasHeight === 0) return;

      // Soft trail fade — gives bursts a streak
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      intensity += (intensityTarget - intensity) * 0.08;
      ringOpacity += (ringOpacityTarget - ringOpacity) * 0.08;

      // Ambient stars (normal blending — re-establishes baseline brightness)
      for (const s of stars) s.draw(ctx, now);

      // Ring
      const cx = canvasWidth / 2;
      const cy = canvasHeight / 2;
      drawRing(ctx, cx, cy, baseRingRadius(), ringOpacity, intensity, now);

      // Bursts use additive blending for richer overlap
      ctx.globalCompositeOperation = "lighter";

      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        f.update();
        f.draw(ctx);
        if (f.opacity <= 0) flashes.splice(i, 1);
      }

      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.update();
        sw.draw(ctx);
        if (sw.opacity <= 0) shockwaves.splice(i, 1);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update(cx, cy);
        p.draw(ctx);
        if (p.opacity <= 0) particles.splice(i, 1);
      }

      then = now - (delta % interval);
    };

    resize();
    rafId = requestAnimationFrame(frame);
    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      engineRef.current = null;
    };
  }, []);

  const triggerCountdown = async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setRunning(true);

    const spans = [span5Ref, span4Ref, span3Ref, span2Ref, span1Ref];
    const hide = (el: HTMLElement | null) => {
      if (!el) return;
      el.getAnimations().forEach((a) => a.cancel());
      el.style.opacity = "0";
    };
    const pop = (el: HTMLElement | null) =>
      el?.animate(POP_KEYFRAMES, POP_OPTIONS);

    for (const ref of spans) hide(ref.current);
    engineRef.current?.reset();

    for (let i = 0; i < spans.length; i++) {
      if (i > 0) hide(spans[i - 1].current);
      pop(spans[i].current);
      const t = (i + 1) / spans.length;
      engineRef.current?.setIntensityTarget(0.95 * t);
      await sleep(1000);
    }
    hide(spans[spans.length - 1].current);

    engineRef.current?.fireBurst();
    engineRef.current?.setIntensityTarget(0);

    await sleep(2500);
    runningRef.current = false;
    setRunning(false);
  };

  const numbers: Array<{ ref: React.RefObject<HTMLSpanElement | null>; text: string }> = [
    { ref: span5Ref, text: "5" },
    { ref: span4Ref, text: "4" },
    { ref: span3Ref, text: "3" },
    { ref: span2Ref, text: "2" },
    { ref: span1Ref, text: "1" },
  ];

  return (
    <div
      ref={wrapperRef}
      onClick={triggerCountdown}
      className="relative h-svh w-full cursor-pointer overflow-hidden bg-black select-none"
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        className="z-0"
      />

      <div
        aria-live="polite"
        className="pointer-events-none absolute inset-0 z-10 text-white"
      >
        {numbers.map(({ ref, text }) => (
          <span
            key={text}
            ref={ref}
            style={{ fontSize: "clamp(8rem, 20vw, 18rem)", lineHeight: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold tracking-tight opacity-0 [text-shadow:0_0_60px_rgba(160,220,255,0.55)]"
          >
            {text}
          </span>
        ))}
      </div>

      {!running && (
        <p className="pointer-events-none absolute bottom-12 left-1/2 z-10 -translate-x-1/2 animate-pulse text-xs uppercase tracking-[0.3em] text-white/60">
          Click anywhere to start
        </p>
      )}
    </div>
  );
}
