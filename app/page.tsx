import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-24 sm:py-32">
        <header className="mb-16 sm:mb-24">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Interactive Web Showcase
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            A studio of scroll-driven web experiments.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Each project below has its own dedicated route — open one to feel
            its pacing, motion and copy in full.
          </p>
        </header>
        <section className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/countdown"
            className="group relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-8 transition hover:border-black/30 dark:border-white/[0.12] dark:bg-zinc-950 dark:hover:border-white/40"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Project 03 · Anticipation
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-black dark:text-zinc-50">
              Liminal Countdown
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Click-to-start 5-second sequence — a code-drawn glow ring,
              shockwave, and three-color particle burst, layered under a
              scroll-paced essay on moments worth marking.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-black transition group-hover:gap-3 dark:text-zinc-50">
              Open project
              <span aria-hidden>→</span>
            </span>
          </Link>
          <Link
            href="/fireworks"
            className="group relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-8 transition hover:border-black/30 dark:border-white/[0.12] dark:bg-zinc-950 dark:hover:border-white/40"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Project 02 · Pyrotechnics
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-black dark:text-zinc-50">
              Vesper Fireworks
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Studio promo site for a fireworks production company — Canvas
              particle simulation as a fixed background, with scroll-paced
              English copy layered above the skyline.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-black transition group-hover:gap-3 dark:text-zinc-50">
              Open project
              <span aria-hidden>→</span>
            </span>
          </Link>
          <Link
            href="/confetti"
            className="group relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-8 transition hover:border-black/30 dark:border-white/[0.12] dark:bg-zinc-950 dark:hover:border-white/40"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Project 04 · Reveal
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-black dark:text-zinc-50">
              Drawn
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              A live online drawing platform — press reveal, watch a roulette
              of names decelerate to a winner, and the moment lands with a
              four-source confetti burst.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-black transition group-hover:gap-3 dark:text-zinc-50">
              Open project
              <span aria-hidden>→</span>
            </span>
          </Link>
          <Link
            href="/interactive-card"
            className="group relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-8 transition hover:border-black/30 dark:border-white/[0.12] dark:bg-zinc-950 dark:hover:border-white/40"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Project 05 · WebGL
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-black dark:text-zinc-50">
              Visa Card 3D
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Spin five Visa cards — Classic, Gold, Platinum, Signature,
              Infinite — in 3D. Each tier&apos;s design is rendered live onto
              the card surface with Three.js and GSAP.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-black transition group-hover:gap-3 dark:text-zinc-50">
              Open project
              <span aria-hidden>→</span>
            </span>
          </Link>
          <Link
            href="/three-fireworks"
            className="group relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-8 transition hover:border-black/30 dark:border-white/[0.12] dark:bg-zinc-950 dark:hover:border-white/40"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Project 06 · Three.js
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-black dark:text-zinc-50">
              Three.js Fireworks
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Click anywhere to launch a WebGL fireworks burst — thousands of
              additive-blended point sprites scatter on a randomized velocity
              field, rendered with Three.js{" "}
              <code className="rounded bg-black/5 px-1 py-0.5 text-xs dark:bg-white/10">
                Points
              </code>
              .
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-black transition group-hover:gap-3 dark:text-zinc-50">
              Open project
              <span aria-hidden>→</span>
            </span>
          </Link>
          <Link
            href="/depth-effect"
            className="group relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-8 transition hover:border-black/30 dark:border-white/[0.12] dark:bg-zinc-950 dark:hover:border-white/40"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Project 07 · GLSL
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-black dark:text-zinc-50">
              Starlight Earth
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              A layered WebGL earth: a tinted base sphere, an additive point
              cloud, and a back-side atmospheric glow whose intensity tracks the
              orbit zoom — all driven by custom GLSL shaders.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-black transition group-hover:gap-3 dark:text-zinc-50">
              Open project
              <span aria-hidden>→</span>
            </span>
          </Link>
        </section>
      </main>
    </div>
  );
}
