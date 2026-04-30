"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";

const CARD_WIDTH = 15.8;
const CARD_HEIGHT = 10;
const CARD_RADIUS = 0.5;

export type CardDesign = {
  id: string;
  tier: string;
  background: [string, string];
  textColor: string;
  accentColor: string;
  number: string;
  holder: string;
  validThru: string;
  sideColor: string;
};

export const CARDS: CardDesign[] = [
  {
    id: "classic",
    tier: "Classic",
    background: ["#2ea7d0", "#10567a"],
    textColor: "#ffffff",
    accentColor: "#bfeaff",
    number: "4000 1111 2222 3333",
    holder: "JAMES ANDERSON",
    validThru: "12/29",
    sideColor: "#10567a",
  },
  {
    id: "gold",
    tier: "Gold",
    background: ["#1a3a6b", "#091a36"],
    textColor: "#ffffff",
    accentColor: "#d4af37",
    number: "4000 1234 5678 9010",
    holder: "JAMES ANDERSON",
    validThru: "12/30",
    sideColor: "#091a36",
  },
  {
    id: "platinum",
    tier: "Platinum",
    background: ["#6e6e72", "#2c2c2e"],
    textColor: "#f5f5f7",
    accentColor: "#e6e6e6",
    number: "4000 5678 9012 3456",
    holder: "JAMES ANDERSON",
    validThru: "06/31",
    sideColor: "#2c2c2e",
  },
  {
    id: "signature",
    tier: "Signature",
    background: ["#2b1a4a", "#0f0a1f"],
    textColor: "#ffffff",
    accentColor: "#c9a86a",
    number: "4000 9876 5432 1098",
    holder: "JAMES ANDERSON",
    validThru: "09/32",
    sideColor: "#0f0a1f",
  },
  {
    id: "infinite",
    tier: "Infinite",
    background: ["#0c4435", "#04211a"],
    textColor: "#f5f5f7",
    accentColor: "#c9a86a",
    number: "4000 8765 4321 0987",
    holder: "JAMES ANDERSON",
    validThru: "12/35",
    sideColor: "#04211a",
  },
];

function buildCardTexture(card: CardDesign): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1264;
  canvas.height = 800;
  const ctx = canvas.getContext("2d")!;

  const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grd.addColorStop(0, card.background[0]);
  grd.addColorStop(1, card.background[1]);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
  ctx.lineWidth = 1.5;
  for (let i = -canvas.height; i < canvas.width; i += 14) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + canvas.height, canvas.height);
    ctx.stroke();
  }
  ctx.restore();

  ctx.fillStyle = card.textColor;
  ctx.font = "300 78px 'Helvetica Neue', Arial, sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText("Visa", 70, 60);
  ctx.font = "500 78px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillStyle = card.accentColor;
  ctx.fillText(card.tier, 220, 60);

  ctx.save();
  const chipX = 90;
  const chipY = 320;
  const chipW = 110;
  const chipH = 86;
  const chipGrd = ctx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
  chipGrd.addColorStop(0, "#e8c982");
  chipGrd.addColorStop(0.5, "#c9a86a");
  chipGrd.addColorStop(1, "#a88d4f");
  ctx.fillStyle = chipGrd;
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(chipX, chipY, chipW, chipH, 12);
  } else {
    ctx.rect(chipX, chipY, chipW, chipH);
  }
  ctx.fill();
  ctx.strokeStyle = "rgba(0, 0, 0, 0.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(chipX, chipY + chipH / 2);
  ctx.lineTo(chipX + chipW, chipY + chipH / 2);
  ctx.moveTo(chipX + chipW / 2, chipY);
  ctx.lineTo(chipX + chipW / 2, chipY + chipH);
  ctx.moveTo(chipX + chipW * 0.25, chipY + chipH * 0.25);
  ctx.lineTo(chipX + chipW * 0.75, chipY + chipH * 0.25);
  ctx.moveTo(chipX + chipW * 0.25, chipY + chipH * 0.75);
  ctx.lineTo(chipX + chipW * 0.75, chipY + chipH * 0.75);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  const wifiX = 260;
  const wifiY = 363;
  ctx.strokeStyle = card.textColor;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  for (let r = 14; r <= 42; r += 14) {
    ctx.beginPath();
    ctx.arc(wifiX, wifiY, r, -Math.PI / 4, Math.PI / 4);
    ctx.stroke();
  }
  ctx.restore();

  ctx.fillStyle = card.textColor;
  ctx.font = "500 68px 'Courier New', monospace";
  ctx.fillText(card.number, 70, 470);

  ctx.font = "300 18px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillStyle = card.textColor;
  ctx.fillText("GOOD", 280, 600);
  ctx.fillText("THRU", 280, 622);
  ctx.font = "500 36px 'Courier New', monospace";
  ctx.fillText(card.validThru, 360, 600);

  ctx.font = "500 36px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText(card.holder, 70, 680);

  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.font = "italic 900 110px 'Helvetica Neue', Arial, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("VISA", canvas.width - 60, 590);
  ctx.font = "italic 400 38px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillStyle = card.accentColor;
  ctx.fillText(card.tier, canvas.width - 60, 700);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function buildCardMesh(initialTexture: THREE.Texture, sideColor: string) {
  const x = CARD_WIDTH / 2 - CARD_RADIUS;
  const y = CARD_HEIGHT / 2 - CARD_RADIUS;

  const shape = new THREE.Shape();
  shape
    .absarc(x, y, CARD_RADIUS, Math.PI / 2, 0, true)
    .lineTo(x + CARD_RADIUS, -y)
    .absarc(x, -y, CARD_RADIUS, 0, -Math.PI / 2, true)
    .lineTo(-x, -(y + CARD_RADIUS))
    .absarc(-x, -y, CARD_RADIUS, -Math.PI / 2, Math.PI, true)
    .lineTo(-(x + CARD_RADIUS), y)
    .absarc(-x, y, CARD_RADIUS, Math.PI, Math.PI / 2, true);

  const uvGenerator = {
    generateTopUV(
      _geometry: THREE.ExtrudeGeometry,
      vertices: number[],
      indexA: number,
      indexB: number,
      indexC: number,
    ) {
      const toUV = (i: number) =>
        new THREE.Vector2(
          (vertices[i * 3] + CARD_WIDTH / 2) / CARD_WIDTH,
          (vertices[i * 3 + 1] + CARD_HEIGHT / 2) / CARD_HEIGHT,
        );
      return [toUV(indexA), toUV(indexB), toUV(indexC)];
    },
    generateSideWallUV() {
      return [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1, 0),
        new THREE.Vector2(1, 1),
        new THREE.Vector2(0, 1),
      ];
    },
  };

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.01,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 3,
    UVGenerator: uvGenerator as unknown as THREE.UVGenerator,
  });

  const frontMaterial = new THREE.MeshStandardMaterial({
    map: initialTexture,
    side: THREE.DoubleSide,
    roughness: 0.45,
    metalness: 0.45,
  });
  const sideMaterial = new THREE.MeshStandardMaterial({
    color: sideColor,
    roughness: 0.6,
    metalness: 0.4,
  });

  const mesh = new THREE.Mesh(geometry, [frontMaterial, sideMaterial]);
  return { mesh, frontMaterial, sideMaterial };
}

export default function InteractiveCard() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const frontMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const sideMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const texturesRef = useRef<Map<string, THREE.CanvasTexture>>(new Map());
  const [activeId, setActiveId] = useState(CARDS[1].id);

  const initialCard = useMemo(
    () => CARDS.find((c) => c.id === activeId) ?? CARDS[0],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const initialRect = wrapper.getBoundingClientRect();
    let width = initialRect.width || window.innerWidth;
    let height = initialRect.height || window.innerHeight;

    renderer.setSize(width, height);
    renderer.domElement.style.display = "block";
    wrapper.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 500);
    camera.position.z = 28;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.rotateSpeed = 0.75;
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 2 - Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2 + Math.PI / 4;

    CARDS.forEach((c) => {
      texturesRef.current.set(c.id, buildCardTexture(c));
    });
    const initialTexture = texturesRef.current.get(initialCard.id)!;

    const { mesh, frontMaterial, sideMaterial } = buildCardMesh(
      initialTexture,
      initialCard.sideColor,
    );
    mesh.rotation.z = Math.PI * 0.05;
    scene.add(mesh);
    meshRef.current = mesh;
    frontMatRef.current = frontMaterial;
    sideMatRef.current = sideMaterial;

    const restingY = -Math.PI / 8;
    gsap.fromTo(
      mesh.rotation,
      { y: restingY - Math.PI * 4 },
      { y: restingY, duration: 2.5, ease: "back.out(2.5)" },
    );

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.7);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight1.position.set(2, 2, 4);
    directionalLight2.position.set(-2, 2, -4);
    scene.add(directionalLight1, directionalLight2);

    let rafId = 0;
    const render = () => {
      controls.update();
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      width = rect.width;
      height = rect.height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      controls.dispose();
      mesh.geometry.dispose();
      frontMaterial.dispose();
      sideMaterial.dispose();
      texturesRef.current.forEach((t) => t.dispose());
      texturesRef.current.clear();
      renderer.dispose();
      if (renderer.domElement.parentElement === wrapper) {
        wrapper.removeChild(renderer.domElement);
      }
      meshRef.current = null;
      frontMatRef.current = null;
      sideMatRef.current = null;
    };
  }, [initialCard]);

  const handleSelect = (id: string) => {
    if (id === activeId) return;
    const card = CARDS.find((c) => c.id === id);
    const mesh = meshRef.current;
    const frontMat = frontMatRef.current;
    const sideMat = sideMatRef.current;
    const texture = texturesRef.current.get(id);
    if (!card || !mesh || !frontMat || !sideMat || !texture) return;

    frontMat.map = texture;
    frontMat.needsUpdate = true;
    sideMat.color = new THREE.Color(card.sideColor);

    gsap.to(mesh.rotation, {
      y: mesh.rotation.y - Math.PI / 2,
      duration: 1,
      ease: "back.out(2.5)",
    });

    setActiveId(id);
  };

  return (
    <div className="relative h-svh w-full overflow-hidden bg-black">
      <div ref={wrapperRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center sm:bottom-16">
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-2 backdrop-blur-md sm:gap-3 sm:px-4">
          {CARDS.map((card) => {
            const isActive = card.id === activeId;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleSelect(card.id)}
                className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] transition sm:text-sm ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {card.tier}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
