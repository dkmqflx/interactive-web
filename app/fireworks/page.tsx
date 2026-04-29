import type { Metadata } from "next";
import Link from "next/link";
import FireworksCanvas from "./fireworks-canvas";

export const metadata: Metadata = {
  title: "Fireworks · Light Up The Night",
  description:
    "A pyrotechnic studio crafting choreographed firework shows for festivals, weddings, and brand moments.",
};

const stats = [
  { value: "240+", label: "Shows produced" },
  { value: "38", label: "Cities, 14 countries" },
  { value: "12", label: "Years of pyro design" },
  { value: "0", label: "Missed cues" },
];

const services = [
  {
    title: "Festival headliners",
    body: "Stadium-scale finales engineered around your headline act — sequenced to musical cues with sub-second precision.",
  },
  {
    title: "Private celebrations",
    body: "Weddings, anniversaries, and milestone birthdays. Quiet shells, low-smoke compositions, and venues from rooftops to rivers.",
  },
  {
    title: "Brand moments",
    body: "Logo bursts, color-locked palettes, and broadcast-ready choreography for product launches and stadium activations.",
  },
];

export default function FireworksPage() {
  return (
    <div className="relative min-h-svh bg-black text-white">
      <FireworksCanvas />

      {/* Night-city silhouette anchored to viewport bottom */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[1] h-[36vh]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/fireworks/night-city.jpg"
          alt=""
          className="h-full w-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
      </div>

      <main className="relative z-10">
        {/* Top nav */}
        <nav className="flex items-center justify-between px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.3em] text-white/60 transition hover:text-white"
          >
            ← Showcase
          </Link>
          <span className="text-xs uppercase tracking-[0.3em] text-white/60">
            Vesper Pyrotechnics
          </span>
        </nav>

        {/* Hero */}
        <section className="flex min-h-[88svh] items-end px-6 pb-32 sm:px-10 sm:pb-48">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.4em] text-white/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              Pyrotechnic studio · est. 2014
            </p>
            <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              Light up
              <br />
              the night.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              We design fireworks the way composers write music — every burst,
              color, and silence sequenced to the second so the sky tells the
              story your audience came for.
            </p>
          </div>
        </section>

        {/* Choreography */}
        <section className="px-6 py-32 sm:px-10 sm:py-48">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              01 — Choreography
            </p>
            <div>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Every spark is on a click track.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/80">
                A great show is not a pile of explosions. It is a score: rising
                tails, held silences, the inevitable second when the whole sky
                opens at once. Our designers storyboard every cue against your
                soundtrack, simulate it in 3D, then fire it live to within a
                tenth of a second.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-white/10 bg-black/40 px-6 py-24 backdrop-blur-sm sm:px-10">
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

        {/* Services */}
        <section className="px-6 py-32 sm:px-10 sm:py-48">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              02 — What we do
            </p>
            <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Built for the night you only get one of.
            </h2>
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {services.map((item) => (
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

        {/* Code → celebration */}
        <section className="px-6 py-32 sm:px-10 sm:py-48">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_1fr] md:gap-20">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                03 — Behind the scenes
              </p>
              <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                From code to celebration.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/80">
                The sky above you isn&apos;t a video. It&apos;s a live particle
                simulation — every tail, every burst, every spark computed in
                your browser, frame by frame. The same engineering rigor goes
                into the real shows we fire: physics-true, music-locked,
                rehearsed until the silences feel inevitable.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-3 self-end text-sm">
              {[
                "Standard burst",
                "Rainbow shell",
                "Big peony",
                "Ring shell",
                "Double-burst",
                "Trailing comet",
              ].map((label) => (
                <li
                  key={label}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-center text-white/80 backdrop-blur-md"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-48 pt-32 sm:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
              Ready to set the night on fire?
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              Tell us the date, the place, and the song the sky is supposed to
              keep time with. We&apos;ll bring everything else.
            </p>
            <a
              href="mailto:hello@vesper.fireworks"
              className="mt-12 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-white/90"
            >
              Plan your show
              <span aria-hidden>→</span>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/60 px-6 py-10 backdrop-blur-sm sm:px-10">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 text-xs uppercase tracking-[0.25em] text-white/50 sm:flex-row sm:items-center">
            <span>© Vesper Pyrotechnics</span>
            <span>
              Skyline photo · Aman Nagpal / Unsplash
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
