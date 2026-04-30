import type { Metadata } from "next";
import Link from "next/link";
import ThreeFireworks from "./three-fireworks";

export const metadata: Metadata = {
  title: "Three.js Fireworks · An Endless Sky",
  description:
    "A WebGL particle fireworks loop — peony, ring, willow, and chrysanthemum bursts launch on their own across a multi-palette night sky.",
};

export default function ThreeFireworksPage() {
  return (
    <div className="relative min-h-svh bg-black text-white">
      <ThreeFireworks />

      <main className="relative z-10 flex min-h-svh flex-col">
        <nav className="flex items-center justify-between px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.3em] text-white/60 transition hover:text-white"
          >
            ← Showcase
          </Link>
          <span className="text-xs uppercase tracking-[0.3em] text-white/60">
            Three.js Fireworks
          </span>
        </nav>

        <section className="flex flex-1 items-center px-6 sm:px-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.4em] text-white/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              WebGL · Particle system
            </p>
            <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              An endless
              <br />
              firework sky.
            </h1>
            <p className="mt-8 text-lg leading-8 text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              Peony, ring, willow, and chrysanthemum bursts launch on their own
              every second or so — thousands of additive-blended point sprites
              per shell, each one carrying its own velocity, color, gravity,
              and lifetime. Sit back and let the sky run.
            </p>
          </div>
        </section>

        <footer className="px-6 pb-10 pt-6 text-xs uppercase tracking-[0.25em] text-white/50 sm:px-10">
          Three.js · WebGL · Auto-launch
        </footer>
      </main>
    </div>
  );
}
