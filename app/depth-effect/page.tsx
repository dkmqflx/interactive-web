import type { Metadata } from "next";
import Link from "next/link";
import DepthEffect from "./depth-effect";

export const metadata: Metadata = {
  title: "Starlight Earth · Depth Effect",
  description:
    "A WebGL earth — base sphere, glowing point cloud, and atmospheric back-side glow rendered with custom GLSL shaders.",
};

export default function DepthEffectPage() {
  return (
    <div className="relative min-h-svh bg-black text-white">
      <DepthEffect />

      <main className="relative z-10 flex min-h-svh flex-col">
        <nav className="flex items-center justify-between px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.3em] text-white/60 transition hover:text-white"
          >
          </Link>
          <span className="text-xs uppercase tracking-[0.3em] text-white/60">
            Depth Effect
          </span>
        </nav>

        <section className="flex flex-1 items-center px-6 sm:px-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.4em] text-white/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              WebGL · Custom GLSL
            </p>
            <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              A starlight
              <br />
              earth.
            </h1>
            <p className="mt-8 text-lg leading-8 text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              Three layered shaders compose the planet: a tinted base sphere
              that fades by view distance, a wireframe icosahedron rendered as
              additive points to suggest continents, and an atmospheric
              back-side glow whose intensity tracks the orbit zoom. Drag to
              rotate, scroll to zoom.
            </p>
          </div>
        </section>

        <footer className="px-6 pb-10 pt-6 text-xs uppercase tracking-[0.25em] text-white/50 sm:px-10">
          Three.js · GLSL · OrbitControls
        </footer>
      </main>
    </div>
  );
}
