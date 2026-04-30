import type { Metadata } from "next";
import Link from "next/link";
import Confetti from "./confetti";

export const metadata: Metadata = {
  title: "Drawn · Live online drawings, designed for the reveal.",
  description:
    "A live drawing platform built around the moment — roulette tension, multi-source confetti, and verifiable randomness for brand giveaways, community draws, and awards ceremonies.",
};

const stats = [
  { value: "12k+", label: "Drawings hosted" },
  { value: "2.4M", label: "Entries processed" },
  { value: "00.00", label: "Bias detected" },
  { value: "4 sec", label: "Average reveal" },
];

const features = [
  {
    title: "Theatrical reveal",
    body: "Roulette tension, a deceleration curve tuned by ear, and confetti that fires from four sources on landing. Your winner moment is engineered, not accidental.",
  },
  {
    title: "Verifiable fairness",
    body: "Every drawing is seeded with public block entropy and signed at reveal. Anyone can re-derive the winner from the published seed and entry list.",
  },
  {
    title: "Drop-in widgets",
    body: "Embed in your livestream, your launch page, or your hall-screen broadcast. A single share URL — no installs, no plugins, no operator booth.",
  },
];

const moments = [
  {
    label: "Brand giveaways",
    body: "Pull a winner from your post replies, your newsletter list, or your event RSVPs — live on stage or stream, in front of the people who entered.",
  },
  {
    label: "Community drops",
    body: "Discord, Slack, and Telegram members compete for a prize. The bot handles eligibility and entries; we handle the reveal the audience came to see.",
  },
  {
    label: "Awards ceremonies",
    body: "Replace the envelope. The reveal is broadcast-quality, latency-bounded, and timed to your room's tempo — not to a producer's stopwatch.",
  },
];

export default function ConfettiPage() {
  return (
    <div className="relative min-h-svh bg-black text-white">
      <nav className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-6 sm:px-10">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.3em] text-white/60 transition hover:text-white"
        >
          ← Showcase
        </Link>
        <span className="text-xs uppercase tracking-[0.3em] text-white/60">
          Drawn
        </span>
      </nav>

      <Confetti />

      {/* The reveal */}
      <section className="px-6 py-32 sm:px-10 sm:py-48">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            01 — The reveal
          </p>
          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              The drum roll, designed.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/80">
              Every drawing has the same job: hold a thousand people in
              suspense, then break it. We engineer that exact second — the
              roulette tempo, the cubic deceleration, the burst that fires from
              four directions on landing — so the room exhales together.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-24 sm:px-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-5xl font-semibold tracking-tight sm:text-6xl">
                {s.value}
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-white/60">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Built for live audiences */}
      <section className="px-6 py-32 sm:px-10 sm:py-48">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            02 — Built for live audiences
          </p>
          <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Three pillars. One winner.
          </h2>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {features.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md transition hover:border-white/30"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/75">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="px-6 py-32 sm:px-10 sm:py-48">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            03 — Where it runs
          </p>
          <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            From brand floors to bedroom streams.
          </h2>
          <ul className="mt-16 divide-y divide-white/10 border-y border-white/10">
            {moments.map((m) => (
              <li
                key={m.label}
                className="grid gap-6 py-8 md:grid-cols-[1fr_2fr] md:gap-12"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  {m.label}
                </p>
                <p className="text-base leading-7 text-white/80">{m.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Trust */}
      <section className="px-6 py-32 sm:px-10 sm:py-48">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            04 — Trusted randomness
          </p>
          <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Verifiable, not vibes.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/80">
            Each drawing is seeded with a public block hash captured at the
            instant of reveal. We sign and publish every drawing record — anyone
            with the seed and the entry list can re-derive the winner offline
            and confirm the result.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-48 pt-16 sm:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Run your drawing.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/80">
            Tell us your prize, your audience, and the moment of reveal.
            We&apos;ll engineer everything that comes before it.
          </p>
          <a
            href="mailto:hello@drawn.studio"
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-white/90"
          >
            Host a drawing
            <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/60 px-6 py-10 backdrop-blur-sm sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 text-xs uppercase tracking-[0.25em] text-white/50 sm:flex-row sm:items-center">
          <span>© Drawn</span>
          <span>Designed for the reveal</span>
        </div>
      </footer>
    </div>
  );
}
