"use client";

import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;

function randomIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomNumBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomFloatBetween(min: number, max: number, decimals: number) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

type SceneState = {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
};

class Tail {
  x: number;
  y: number;
  vy: number;
  friction = 0.95;
  opacity = 1;
  angle = 0;
  hue: number;
  scene: SceneState;

  constructor(scene: SceneState, x: number, vy: number, hue: number) {
    this.scene = scene;
    this.x = x;
    this.y = scene.canvasHeight;
    this.vy = vy;
    this.hue = hue;
  }

  update() {
    this.vy *= this.friction;
    this.opacity = -this.vy;
    this.angle += 1;
    this.y += this.vy;
    this.x += Math.cos(this.angle) * this.vy * 0.2;
  }

  draw() {
    const { ctx } = this.scene;
    ctx.beginPath();
    ctx.fillStyle = `hsla(${this.hue}, 90%, 78%, ${this.opacity})`;
    ctx.arc(this.x, this.y, 1.6, 0, TAU);
    ctx.fill();
    ctx.closePath();
  }
}

class Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  hue: number;
  scene: SceneState;

  constructor(
    scene: SceneState,
    x: number,
    y: number,
    vx: number,
    vy: number,
    opacity: number,
    hue: number,
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.opacity = opacity;
    this.hue = hue;
  }

  update() {
    this.opacity -= 0.015;
    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    const { ctx } = this.scene;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 0, TAU);
    ctx.fillStyle = `hsla(${this.hue}, 80%, 82%, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }
}

type ParticleOptions = {
  hue: number;
  forcedSpread?: number;
  particleRadius?: number;
  decay?: number;
};

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  gravity = 0.12;
  friction = 0.93;
  opacity: number;
  hue: number;
  decay: number;
  scene: SceneState;

  constructor(
    scene: SceneState,
    x: number,
    y: number,
    options: ParticleOptions,
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.hue = options.hue;
    this.decay = options.decay ?? 0.018;
    this.radius = options.particleRadius ?? 2;

    const angle = randomNumBetween(0, TAU);
    const spread = options.forcedSpread ?? randomFloatBetween(1, 10, 1);
    const speed = spread * scene.canvasHeight * 0.002;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.opacity = randomNumBetween(0.9, 1);
  }

  update() {
    this.opacity -= this.decay;
    this.vy += this.gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.y += this.vy;
    this.x += this.vx;
  }

  draw() {
    const { ctx } = this.scene;
    ctx.fillStyle = `hsla(${this.hue}, 100%, 65%, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, TAU);
    ctx.fill();
    ctx.closePath();
  }
}

type FireworkType = "standard" | "rainbow" | "big" | "ring" | "double";

function pickFireworkType(): FireworkType {
  const r = Math.random();
  if (r < 0.32) return "standard";
  if (r < 0.55) return "rainbow";
  if (r < 0.7) return "big";
  if (r < 0.85) return "ring";
  return "double";
}

export default function FireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio > 1 ? 2 : 1;
    const fps = 60;
    const interval = 1000 / fps;

    const scene: SceneState = {
      ctx,
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight,
    };

    const particles: Particle[] = [];
    const tails: Tail[] = [];
    const sparks: Spark[] = [];

    const resize = () => {
      scene.canvasWidth = window.innerWidth;
      scene.canvasHeight = window.innerHeight;
      canvas.width = scene.canvasWidth * dpr;
      canvas.height = scene.canvasHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      canvas.style.width = `${scene.canvasWidth}px`;
      canvas.style.height = `${scene.canvasHeight}px`;
    };

    const createTail = () => {
      const x = randomIntBetween(
        scene.canvasWidth * 0.1,
        scene.canvasWidth * 0.9,
      );
      const vy =
        randomIntBetween(scene.canvasHeight / 30, scene.canvasHeight / 22) * -1;
      const hue = randomIntBetween(0, 360);
      tails.push(new Tail(scene, x, vy, hue));
    };

    const drawFlash = (x: number, y: number, hue: number, radius: number) => {
      const grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grd.addColorStop(0, `hsla(${hue}, 100%, 88%, 0.9)`);
      grd.addColorStop(0.4, `hsla(${hue}, 100%, 65%, 0.4)`);
      grd.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, TAU);
      ctx.fill();
      ctx.closePath();
    };

    const createFirework = (x: number, y: number) => {
      const type = pickFireworkType();
      const baseHue = randomIntBetween(0, 360);

      if (type === "standard") {
        const N = 110;
        for (let i = 0; i < N; i++) {
          particles.push(
            new Particle(scene, x, y, {
              hue: (baseHue + randomIntBetween(0, 30)) % 360,
            }),
          );
        }
        drawFlash(x, y, baseHue, 130);
      } else if (type === "rainbow") {
        const N = 130;
        for (let i = 0; i < N; i++) {
          particles.push(
            new Particle(scene, x, y, { hue: randomIntBetween(0, 360) }),
          );
        }
        drawFlash(x, y, baseHue, 130);
      } else if (type === "big") {
        const N = 200;
        for (let i = 0; i < N; i++) {
          particles.push(
            new Particle(scene, x, y, {
              hue: (baseHue + randomIntBetween(0, 40)) % 360,
              particleRadius: 2.6,
            }),
          );
        }
        drawFlash(x, y, baseHue, 200);
      } else if (type === "ring") {
        const N = 90;
        for (let i = 0; i < N; i++) {
          particles.push(
            new Particle(scene, x, y, {
              hue: (baseHue + randomIntBetween(0, 25)) % 360,
              forcedSpread: 8,
              decay: 0.014,
            }),
          );
        }
        drawFlash(x, y, baseHue, 110);
      } else {
        const offsetX = randomNumBetween(-70, 70);
        const offsetY = randomNumBetween(-50, 50);
        const hueA = baseHue;
        const hueB = (baseHue + 180) % 360;
        const N = 75;
        for (let i = 0; i < N; i++) {
          particles.push(
            new Particle(scene, x, y, {
              hue: (hueA + randomIntBetween(0, 25)) % 360,
            }),
          );
          particles.push(
            new Particle(scene, x + offsetX, y + offsetY, {
              hue: (hueB + randomIntBetween(0, 25)) % 360,
            }),
          );
        }
        drawFlash(x, y, hueA, 110);
        drawFlash(x + offsetX, y + offsetY, hueB, 110);
      }
    };

    let rafId = 0;
    let then = Date.now();

    const frame = () => {
      rafId = requestAnimationFrame(frame);
      const now = Date.now();
      const delta = now - then;
      if (delta < interval) return;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
      ctx.fillRect(0, 0, scene.canvasWidth, scene.canvasHeight);

      ctx.fillStyle = `rgba(255, 255, 255, ${particles.length / 40000})`;
      ctx.fillRect(0, 0, scene.canvasWidth, scene.canvasHeight);

      ctx.globalCompositeOperation = "lighter";

      if (Math.random() < 0.045) createTail();
      if (Math.random() < 0.012) {
        createTail();
        createTail();
      }

      tails.forEach((tail, i) => {
        tail.update();
        tail.draw();

        for (let s = 0; s < Math.round(Math.abs(tail.vy * 0.4)); s++) {
          const vx = randomNumBetween(-5, 5) * 0.01;
          const vy = randomNumBetween(-30, 30) * 0.01;
          const opacity = randomNumBetween(5, 7) * 0.1;
          sparks.push(
            new Spark(scene, tail.x, tail.y, vx, vy, opacity, tail.hue),
          );
        }

        if (tail.opacity <= 0.05) {
          tails.splice(i, 1);
          createFirework(tail.x, tail.y);
        }
      });

      sparks.forEach((spark, i) => {
        spark.update();
        spark.draw();
        if (spark.opacity <= 0.05) sparks.splice(i, 1);
      });

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        if (Math.random() < 0.12) {
          const opacity = randomNumBetween(0.2, 0.5);
          sparks.push(
            new Spark(scene, particle.x, particle.y, 0, 0, opacity, particle.hue),
          );
        }

        if (particle.opacity <= 0) particles.splice(i, 1);
      });

      then = now - (delta % interval);
    };

    resize();
    rafId = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
