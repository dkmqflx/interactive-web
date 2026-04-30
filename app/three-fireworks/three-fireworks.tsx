"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Pattern = "peony" | "ring" | "willow" | "chrys";

type Particle = {
  px: number;
  py: number;
  pz: number;
  vx: number;
  vy: number;
  vz: number;
  cr: number;
  cg: number;
  cb: number;
  life: number;
  decay: number;
};

const PALETTES: number[][] = [
  [0xffe066, 0xff7b00, 0xff2e63, 0xfff5b1],
  [0x00ffae, 0x60ffd4, 0xfff5b1, 0x00b894],
  [0xff5cf4, 0x9d4dff, 0x4dc9ff, 0xfff5b1],
  [0x4dc9ff, 0xffffff, 0x6ee7ff, 0x80a4ff],
  [0xff3b30, 0xffcc00, 0x4cd964, 0x5ac8fa, 0xaf52de],
  [0xff9a8b, 0xffadad, 0xfff5b1, 0xff8e72],
];

const PATTERNS: Pattern[] = ["peony", "ring", "willow", "chrys"];

class Firework {
  particles: Particle[];
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  points: THREE.Points;
  positions: Float32Array;
  colors: Float32Array;
  gravity: number;
  drag: number;
  alive: boolean;

  constructor({
    x,
    y,
    z,
    pattern,
    palette,
    texture,
  }: {
    x: number;
    y: number;
    z: number;
    pattern: Pattern;
    palette: THREE.Color[];
    texture: THREE.Texture;
  }) {
    const count =
      pattern === "willow" ? 2200 : pattern === "chrys" ? 3600 : 3000;
    const baseSpeed =
      pattern === "willow" ? 20 : pattern === "ring" ? 32 : 28;

    this.particles = new Array<Particle>(count);
    this.positions = new Float32Array(count * 3);
    this.colors = new Float32Array(count * 3);

    this.gravity = pattern === "willow" ? 0.22 : 0.06;
    this.drag = pattern === "willow" ? 0.984 : 0.992;
    this.alive = true;

    // Random tilted ring basis (used by ring pattern)
    const ringNormal = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() * 0.4 + 0.5,
    ).normalize();
    const helper =
      Math.abs(ringNormal.x) > 0.9
        ? new THREE.Vector3(0, 1, 0)
        : new THREE.Vector3(1, 0, 0);
    const ringT1 = helper.clone().cross(ringNormal).normalize();
    const ringT2 = ringNormal.clone().cross(ringT1).normalize();

    for (let i = 0; i < count; i++) {
      const color = palette[Math.floor(Math.random() * palette.length)];

      let vx = 0;
      let vy = 0;
      let vz = 0;

      if (pattern === "ring") {
        const angle = Math.random() * Math.PI * 2;
        const radial = baseSpeed * (0.92 + Math.random() * 0.16);
        const wobble = (Math.random() - 0.5) * baseSpeed * 0.08;
        vx =
          (Math.cos(angle) * ringT1.x + Math.sin(angle) * ringT2.x) * radial +
          ringNormal.x * wobble;
        vy =
          (Math.cos(angle) * ringT1.y + Math.sin(angle) * ringT2.y) * radial +
          ringNormal.y * wobble;
        vz =
          (Math.cos(angle) * ringT1.z + Math.sin(angle) * ringT2.z) * radial +
          ringNormal.z * wobble;
      } else {
        const u = Math.random() * 2 - 1;
        const t = Math.random() * Math.PI * 2;
        const r = Math.sqrt(1 - u * u);
        const mag =
          pattern === "chrys"
            ? baseSpeed * (0.55 + Math.random() * 0.7)
            : pattern === "willow"
              ? baseSpeed * (0.5 + Math.random() * 0.6)
              : baseSpeed * (0.82 + Math.random() * 0.32);
        vx = r * Math.cos(t) * mag;
        vy = r * Math.sin(t) * mag;
        vz = u * mag;
      }

      const decay =
        pattern === "willow"
          ? 0.0035 + Math.random() * 0.005
          : pattern === "chrys"
            ? 0.005 + Math.random() * 0.012
            : 0.006 + Math.random() * 0.01;

      this.particles[i] = {
        px: x,
        py: y,
        pz: z,
        vx,
        vy,
        vz,
        cr: color.r,
        cg: color.g,
        cb: color.b,
        life: 1,
        decay,
      };

      this.positions[i * 3] = x;
      this.positions[i * 3 + 1] = y;
      this.positions[i * 3 + 2] = z;
      this.colors[i * 3] = color.r;
      this.colors[i * 3 + 1] = color.g;
      this.colors[i * 3 + 2] = color.b;
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.positions, 3),
    );
    this.geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(this.colors, 3),
    );

    this.material = new THREE.PointsMaterial({
      size: pattern === "willow" ? 44 : pattern === "chrys" ? 38 : 36,
      sizeAttenuation: true,
      map: texture,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    this.points = new THREE.Points(this.geometry, this.material);
  }

  update() {
    let aliveCount = 0;
    const ps = this.particles;
    const positions = this.positions;
    const colors = this.colors;

    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      if (p.life <= 0) continue;

      p.vy -= this.gravity;
      p.vx *= this.drag;
      p.vy *= this.drag;
      p.vz *= this.drag;

      p.px += p.vx;
      p.py += p.vy;
      p.pz += p.vz;

      p.life -= p.decay;

      const k = i * 3;
      positions[k] = p.px;
      positions[k + 1] = p.py;
      positions[k + 2] = p.pz;

      // Curve: bright hold near 1, then fade fast — gives a "flash + linger"
      const lifeClamped = Math.max(0, p.life);
      const fade = lifeClamped * lifeClamped * (0.6 + 0.4 * lifeClamped);
      colors[k] = p.cr * fade;
      colors[k + 1] = p.cg * fade;
      colors[k + 2] = p.cb * fade;

      if (p.life > 0) aliveCount++;
    }

    (this.geometry.attributes.position as THREE.BufferAttribute).needsUpdate =
      true;
    (this.geometry.attributes.color as THREE.BufferAttribute).needsUpdate =
      true;

    if (aliveCount === 0) this.alive = false;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

export default function ThreeFireworks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      20000,
    );
    camera.position.z = 8000;

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/three-fireworks/particle.png");

    const palettes: THREE.Color[][] = PALETTES.map((p) =>
      p.map((hex) => new THREE.Color(hex)),
    );

    const fireworks: Firework[] = [];

    const launch = (override?: { x?: number; y?: number; pattern?: Pattern }) => {
      const pattern =
        override?.pattern ?? PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
      const palette = palettes[Math.floor(Math.random() * palettes.length)];
      const x = override?.x ?? THREE.MathUtils.randFloatSpread(5200);
      const y = override?.y ?? THREE.MathUtils.randFloat(-1800, 2400);
      const z = THREE.MathUtils.randFloatSpread(1500);
      const fw = new Firework({ x, y, z, pattern, palette, texture });
      scene.add(fw.points);
      fireworks.push(fw);
    };

    // Opening salvo so the page never feels empty.
    launch({ x: 0, y: 600, pattern: "chrys" });
    launch({ x: -2600, y: -200, pattern: "ring" });
    launch({ x: 2600, y: 1400, pattern: "peony" });
    launch({ x: -1200, y: 1800, pattern: "willow" });
    launch({ x: 1600, y: -800, pattern: "peony" });

    const pendingLaunches: number[] = [];
    let nextLaunchAt = performance.now() + 250;
    let rafId = 0;

    const render = () => {
      const now = performance.now();

      // Drain any staggered follow-up shots scheduled by previous frames.
      while (pendingLaunches.length && pendingLaunches[0] <= now) {
        pendingLaunches.shift();
        launch();
      }

      if (now >= nextLaunchAt) {
        // Always fire 2 simultaneously; sometimes a 3rd in the same beat.
        launch();
        launch();
        if (Math.random() < 0.55) launch();

        // Stagger 1–2 follow-up bursts so the sky stays busy between beats.
        const followUps = Math.random() < 0.45 ? 2 : 1;
        for (let i = 0; i < followUps; i++) {
          pendingLaunches.push(now + 90 + Math.random() * 260);
        }
        pendingLaunches.sort((a, b) => a - b);

        nextLaunchAt = now + 380 + Math.random() * 520;
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];
        fw.update();
        if (!fw.alive) {
          scene.remove(fw.points);
          fw.dispose();
          fireworks.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      for (const fw of fireworks) {
        scene.remove(fw.points);
        fw.dispose();
      }
      texture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 bg-black" aria-hidden />
  );
}
