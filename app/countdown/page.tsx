import type { Metadata } from "next";
import Link from "next/link";
import Countdown from "./countdown";

export const metadata: Metadata = {
  title: "Liminal Countdown · Anticipation, designed.",
  description:
    "A studio designing the precise seconds before everything changes — countdown choreography for moments worth marking.",
};

const stats = [
  { value: "5", label: "Seconds in a perfect countdown" },
  { value: "1,440", label: "Minutes in a day worth marking" },
  { value: "0.04", label: "Seconds of human reaction time" },
  { value: "∞", label: "Moments worth claiming" },
];

const moments = [
  {
    title: "New Year midnights",
    body: "Town squares, rooftop parties, screen-mirrored watch parties — every clock on Earth aligned for a single shared breath.",
  },
  {
    title: "Product launches",
    body: "Five seconds of held silence, then the curtain. We design the cadence of every keynote moment so the room exhales together.",
  },
  {
    title: "Stadium openers",
    body: "Walkouts, opening ceremonies, encore returns. The seconds before the lights cut — the seconds the audience came to feel.",
  },
];

export default function CountdownPage() {
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
          Liminal Studio
        </span>
      </nav>

      <Countdown />

      {/* Anticipation */}
      <section className="px-6 py-32 sm:px-10 sm:py-48">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            01 — Anticipation
          </p>
          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              The architecture of waiting.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/80">
              Five seconds before midnight. The breath before a kiss. The pause
              before the curtain. We design those exact intervals — the precise
              tempo that turns ordinary seconds into something an audience will
              remember a decade later. Anticipation is a craft. We treat it
              like one.
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

      {/* Moments */}
      <section className="px-6 py-32 sm:px-10 sm:py-48">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            02 — Moments we design
          </p>
          <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            What we count down to.
          </h2>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {moments.map((item) => (
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

      {/* Time as material */}
      <section className="px-6 py-32 sm:px-10 sm:py-48">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            03 — Time as material
          </p>
          <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Every second is a decision.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/80">
            Composers shape time with rests. Filmmakers shape it with cuts. We
            shape it with countdowns — discrete units of held breath, engineered
            to land at the exact frame the room is waiting for.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-48 pt-16 sm:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Mark the moment.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/80">
            Tell us the second the room is supposed to hold its breath.
            We&apos;ll engineer everything that comes before it.
          </p>
          <a
            href="mailto:hello@liminal.studio"
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-white/90"
          >
            Plan your countdown
            <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/60 px-6 py-10 backdrop-blur-sm sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 text-xs uppercase tracking-[0.25em] text-white/50 sm:flex-row sm:items-center">
          <span>© Liminal Studio</span>
          <span>Designed in countdown</span>
        </div>
      </footer>
    </div>
  );
}
