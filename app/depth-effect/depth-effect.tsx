"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const earthVertexShader = /* glsl */ `
varying vec2 vUv;
varying float vDistance;

void main() {
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(position, 1.0);
  float dist = pow(length(mvPosition.xyz) / 2.0, 6.0);

  gl_Position = projectionMatrix * mvPosition;

  vUv = uv;
  vDistance = dist;
}
`;

const earthFragmentShader = /* glsl */ `
uniform sampler2D uTexture;
varying vec2 vUv;
varying float vDistance;

void main() {
  vec4 map = texture2D(uTexture, vUv);
  vec3 col = 1.0 - map.rgb;
  float alpha = col.r;

  vec3 baseCol = vec3(0.18, 0.10, 0.42);
  vec3 hotCol = vec3(0.55, 0.30, 0.95);
  float strength = mix(map.rgb * 5.0, baseCol, vDistance).b * 2.2;

  vec3 finalCol = mix(baseCol, hotCol, 0.4) * strength;

  gl_FragColor = vec4(finalCol, alpha * finalCol.b);
}
`;

const earthPointsVertexShader = /* glsl */ `
varying vec2 vUv;
varying float vDistance;

void main() {
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(position, 1.0);
  float hiddeness = 0.45;
  float dist = (1.0 / length(mvPosition.xyz)) - hiddeness;

  gl_PointSize = 24.0;
  gl_Position = projectionMatrix * mvPosition;

  vUv = uv;
  vDistance = dist;
}
`;

const earthPointsFragmentShader = /* glsl */ `
uniform sampler2D uTexture;
uniform float uTime;

varying vec2 vUv;
varying float vDistance;

float circle(vec2 coord, float r) {
  float fromCenter = length(coord - 0.5);
  float strength = r / fromCenter - r * 2.0;
  return strength;
}

float random(vec2 uv) {
  return fract(dot(uv, vec2(12.9898, 78.233)));
}

void main() {
  vec4 map = texture2D(uTexture, vUv);
  vec3 col = 1.0 - map.rgb;

  float strength = circle(gl_PointCoord, 0.035);
  float alpha = col.r * strength * vDistance;
  float randomNumber = random(vUv + uTime / 250.0);

  vec3 cyanCol = vec3(0.35, 0.85, 1.0);
  vec3 magentaCol = vec3(0.85, 0.40, 1.0);

  vec3 finalCol = mix(cyanCol, magentaCol, randomNumber);

  gl_FragColor = vec4(finalCol, alpha);
}
`;

const earthGlowVertexShader = /* glsl */ `
varying vec3 vNormal;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * viewMatrix * modelPosition;

  vNormal = normalize(normalMatrix * normal);
}
`;

const earthGlowFragmentShader = /* glsl */ `
varying vec3 vNormal;
uniform float uZoom;

void main() {
  vec3 lightSource = vec3(0.0, 0.0, 1.0);
  float strength = max(1.0, pow(1.0 / (uZoom / 2.0), 5.0));
  float intensity = pow(0.85 - dot(vNormal, lightSource), 4.5) * strength * 1.4;
  vec3 auroraCol = vec3(0.45, 0.65, 1.0);

  gl_FragColor = vec4(auroraCol, 1.0) * intensity;
}
`;

export default function DepthEffect() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    const canvasSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const clock = new THREE.Clock();
    const textureLoader = new THREE.TextureLoader();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasSize.width / canvasSize.height,
      0.1,
      100,
    );
    camera.position.set(0, 0, 2);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    const earthTexture = textureLoader.load("/depth-effect/earth-specular-map.png");
    const pointsTexture = textureLoader.load("/depth-effect/earth-specular-map.png");

    const earthMaterial = new THREE.ShaderMaterial({
      wireframe: false,
      uniforms: {
        uTexture: { value: earthTexture },
      },
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
    });
    const earthGeometry = new THREE.SphereGeometry(0.8, 30, 30);
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);

    const pointsMaterial = new THREE.ShaderMaterial({
      wireframe: true,
      uniforms: {
        uTexture: { value: pointsTexture },
        uTime: { value: 0 },
      },
      vertexShader: earthPointsVertexShader,
      fragmentShader: earthPointsFragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    const pointsGeometry = new THREE.IcosahedronGeometry(0.8, 30);
    pointsGeometry.rotateY(-Math.PI);
    const earthPoints = new THREE.Points(pointsGeometry, pointsMaterial);

    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uZoom: { value: 1 },
      },
      vertexShader: earthGlowVertexShader,
      fragmentShader: earthGlowFragmentShader,
      wireframe: false,
      side: THREE.BackSide,
      transparent: true,
    });
    const glowGeometry = new THREE.SphereGeometry(1, 40, 40);
    const earthGlow = new THREE.Mesh(glowGeometry, glowMaterial);

    scene.add(earth, earthPoints, earthGlow);

    const resize = () => {
      canvasSize.width = window.innerWidth;
      canvasSize.height = window.innerHeight;

      camera.aspect = canvasSize.width / canvasSize.height;
      camera.updateProjectionMatrix();

      renderer.setSize(canvasSize.width, canvasSize.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    resize();

    let rafId = 0;
    const draw = () => {
      earth.rotation.x += 0.0008;
      earth.rotation.y += 0.0008;

      earthPoints.rotation.x += 0.0008;
      earthPoints.rotation.y += 0.0008;

      controls.update();
      renderer.render(scene, camera);

      glowMaterial.uniforms.uZoom.value = controls.target.distanceTo(
        controls.object.position,
      );
      pointsMaterial.uniforms.uTime.value = clock.getElapsedTime();

      rafId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      controls.dispose();

      earthGeometry.dispose();
      earthMaterial.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      earthTexture.dispose();
      pointsTexture.dispose();

      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 bg-black"
      aria-hidden
    />
  );
}
