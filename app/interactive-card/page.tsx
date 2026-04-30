import type { Metadata } from "next";
import Link from "next/link";
import InteractiveCard from "./interactive-card";

export const metadata: Metadata = {
  title: "Visa · Start something priceless",
  description:
    "Spin five Visa card tiers — Classic to Infinite — in 3D. See the global payment network and tier benefits at a glance.",
};

const stats = [
  { value: "200+", label: "Countries & territories" },
  { value: "100M+", label: "Merchants worldwide" },
  { value: "65,000+", label: "Transactions per second" },
  { value: "24/7", label: "Global cardholder support" },
];

const tiers = [
  {
    name: "Classic",
    body: "An everyday card built for global usability. Pay safely at merchants at home and around the world.",
  },
  {
    name: "Gold",
    body: "Premium touches for travel and shopping. Loss-and-theft protection and 24-hour concierge included.",
  },
  {
    name: "Platinum",
    body: "Airport lounges, travel insurance, hotel privileges — your everyday becomes business class.",
  },
  {
    name: "Signature",
    body: "Tailored benefits for a signature lifestyle. Dining, golf, and hotels — every moment, signature.",
  },
  {
    name: "Infinite",
    body: "The pinnacle of Visa. A 24-hour personal concierge wherever you are in the world.",
  },
];

const security = [
  {
    title: "Visa Secure",
    body: "An additional verification layer for online payments that stops fraud before it happens — the global standard for safer checkout.",
  },
  {
    title: "Contactless payment",
    body: "Tap your card and the payment is done. Faster, cleaner, and just as secure.",
  },
  {
    title: "Zero Liability",
    body: "Visa covers loss, theft, and unauthorized use. Use your card with complete peace of mind.",
  },
];

export default function InteractiveCardPage() {
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
          Visa
        </span>
      </nav>

      <InteractiveCard />

      {/* Intro */}
      <section className="px-6 py-32 sm:px-10 sm:py-48">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            01 — With Visa
          </p>
          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Start something priceless.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/80">
              Visa is a global payment network used in more than 200 countries
              and territories. From a coffee on the corner to a flight across
              the world, one card lets you pay safely and conveniently anywhere
              the Visa mark appears. Spin the card above and pick the tier that
              fits your life — Classic to Infinite.
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

      {/* Tiers */}
      <section className="px-6 py-32 sm:px-10 sm:py-48">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            02 — Card tiers
          </p>
          <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            The one card that fits you.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">
            Every Visa card runs on the same global network. Higher tiers add
            premium benefits — travel insurance, airport lounges, and a
            personal concierge — layered on top.
          </p>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tiers.map((tier) => (
              <article
                key={tier.name}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md transition hover:border-white/30"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                  Visa
                </p>
                <h3 className="mt-2 text-2xl font-semibold">{tier.name}</h3>
                <p className="mt-4 text-sm leading-7 text-white/75">
                  {tier.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="px-6 py-32 sm:px-10 sm:py-48">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_1fr] md:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              03 — Secure payments
            </p>
            <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Every payment is backed by Visa security.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/80">
              Visa runs a multi-layered security system that keeps payments
              safe wherever you are. AI-powered fraud detection, EMV chips,
              tokenization, and real-time monitoring all work together to
              protect every transaction — at the register and online.
            </p>
          </div>
          <ul className="grid gap-3 self-end text-sm">
            {security.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-4 backdrop-blur-md"
              >
                <p className="text-sm font-semibold text-white">
                  {item.title}
                </p>
                <p className="mt-2 text-xs leading-6 text-white/70">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Anywhere */}
      <section className="px-6 py-32 sm:px-10 sm:py-48">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            04 — Anywhere
          </p>
          <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Borderless payments. One card.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/80">
            A café in Tokyo, a boutique in Paris, a taxi in New York — wherever
            you see the Visa mark, the same card works. No currency exchange,
            no second card. One card is your passport to the world.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-48 pt-16 sm:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            A bigger world, with Visa.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/80">
            Cards are issued through partner banks. Pick your next card today.
          </p>
          <a
            href="https://www.visa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-white/90"
          >
            Explore Visa cards
            <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/60 px-6 py-10 backdrop-blur-sm sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 text-xs uppercase tracking-[0.25em] text-white/50 sm:flex-row sm:items-center">
          <span>© Visa Interactive Demo</span>
          <span>Three.js + GSAP</span>
        </div>
      </footer>
    </div>
  );
}
