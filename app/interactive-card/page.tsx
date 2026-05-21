import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import InteractiveCard from "./interactive-card";
import ScaleBanner from "./scale-banner";

export const metadata: Metadata = {
  title: "Credit Card · A card for anywhere you go",
  description:
    "Spin five credit card tiers — Classic to Infinite — in 3D. See the global payment network and tier benefits at a glance.",
};

const features = [
  {
    badge: "Global",
    title: "Pay anywhere on earth.",
    body: "Two hundred countries. One hundred million merchants. One card — accepted wherever your day takes you.",
    image: {
      src: "/projects/interactive-card/global.jpg",
      alt: "A blue and white payment card on a clean background",
    },
  },
  {
    badge: "Secure",
    title: "Backed by enterprise-grade security.",
    body: "AI-powered fraud detection, EMV chips, tokenization, and real-time monitoring watch every transaction — at the register and online.",
    image: {
      src: "/projects/interactive-card/secure.jpg",
      alt: "A hand holding a premium black credit card",
    },
  },
  {
    badge: "Contactless",
    title: "Tap to pay, in a heartbeat.",
    body: "Just bring your card close. No cash, no PIN, no waiting — faster than fumbling for change, and just as secure.",
    image: {
      src: "/projects/interactive-card/contactless.jpg",
      alt: "A hand presenting a card to a payment terminal",
    },
  },
];

const tiers = [
  {
    name: "Classic",
    tagline: "Everyday essentials",
    perks: [
      "Accepted in 200+ countries",
      "Loss & theft protection",
      "24/7 cardholder support",
    ],
    highlighted: false,
  },
  {
    name: "Platinum",
    tagline: "Where every trip flies business",
    perks: [
      "Airport lounge access",
      "Travel insurance, automatic",
      "Hotel & dining privileges",
      "Everything in Gold",
    ],
    highlighted: true,
  },
  {
    name: "Infinite",
    tagline: "The pinnacle tier",
    perks: [
      "24-hour global concierge",
      "Bespoke travel benefits",
      "Everything in Signature",
    ],
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Where can I get a credit card?",
    a: "Credit cards are issued by partner banks around the world. Apply directly through the bank that fits your needs — the network handles payments, the bank handles your account.",
  },
  {
    q: "Does my card work overseas?",
    a: "Yes. Your card is accepted at any merchant or ATM displaying the network mark, in more than 200 countries and territories. No second card, no extra paperwork.",
  },
  {
    q: "What's the difference between tiers?",
    a: "Every tier runs on the same global payment network. Higher tiers add premium benefits — airport lounges, travel insurance, dining privileges, and a personal concierge — layered on top.",
  },
  {
    q: "Is online payment secure?",
    a: "An extra verification layer is added to online checkouts, blocking fraud before it happens. Tokenization protects your card number so the merchant never sees it.",
  },
  {
    q: "What if my card is lost or stolen?",
    a: "Zero Liability means you're not responsible for unauthorized use. Report it to your issuing bank and we'll replace it — usually within a few business days, anywhere in the world.",
  },
];

export default function InteractiveCardPage() {
  return (
    <div className="relative min-h-svh bg-white text-slate-900">
      <nav className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-6 sm:px-10">
        <Link
          href="/"
          className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          ← Showcase
        </Link>
        <span className="text-sm font-bold text-blue-600">Credit Card</span>
      </nav>

      <InteractiveCard />

      {/* Hero text */}
      <section className="px-6 py-32 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
            A card for anywhere you go
          </p>
          <h2 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            One card,
            <br />
            <span className="text-blue-600">two hundred countries.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            From a coffee on the corner to a flight across the world, your card
            works wherever you go. Spin the card above and pick the tier that
            fits your life.
          </p>
        </div>
      </section>

      {/* Feature blocks — alternating */}
      <section className="bg-slate-50 px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto flex max-w-6xl flex-col gap-24 sm:gap-32">
          {features.map((feat, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={feat.title}
                className={`flex flex-col gap-10 md:flex-row md:items-center md:gap-20 ${
                  reverse ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl shadow-blue-500/20">
                    <Image
                      src={feat.image.src}
                      alt={feat.image.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 40vw, 100vw"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                    {feat.badge}
                  </p>
                  <h3 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                    {feat.title}
                  </h3>
                  <p className="mt-5 text-lg leading-8 text-slate-600">
                    {feat.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Scroll-expanding image banner */}
      <ScaleBanner />

      {/* Tier comparison */}
      <section className="px-6 py-32 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
              Pick your card
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              The one that fits you.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Every card runs on the same global network. Pick the tier with
              the benefits you&apos;ll actually use.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <article
                key={tier.name}
                className={`relative flex flex-col rounded-3xl p-8 ${
                  tier.highlighted
                    ? "bg-blue-600 text-white shadow-2xl shadow-blue-500/30 md:scale-[1.03]"
                    : "border border-slate-200 bg-white text-slate-900 shadow-sm"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 right-6 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-900">
                    Most popular
                  </span>
                )}
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <p
                  className={`mt-2 text-sm ${
                    tier.highlighted ? "text-blue-100" : "text-slate-500"
                  }`}
                >
                  {tier.tagline}
                </p>
                <ul className="mt-8 flex flex-1 flex-col gap-3 text-sm">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          tier.highlighted
                            ? "bg-white/20 text-white"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        ✓
                      </span>
                      <span
                        className={
                          tier.highlighted ? "text-blue-50" : "text-slate-700"
                        }
                      >
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-slate-500">
            Also available: Gold · Signature
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 px-6 py-32 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
            FAQ
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Good to know.
          </h2>
          <Accordion
            type="single"
            collapsible
            className="mt-12 w-full border-y border-slate-200"
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                className="border-slate-200"
              >
                <AccordionTrigger className="py-6 text-left text-lg font-semibold text-slate-900 hover:no-underline [&[data-state=open]>svg]:text-blue-600">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 pr-12 text-base leading-7 text-slate-600">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Ready for a card that
            <br />
            <span className="text-blue-600">goes everywhere?</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Cards are issued through partner banks. Pick your next card today.
          </p>
          <a
            href="#"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40"
          >
            Explore cards
            <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 text-sm text-slate-500 sm:flex-row sm:items-center">
          <span>© Credit Card Interactive Demo</span>
          <span>Photos · Unsplash · Three.js + GSAP</span>
        </div>
      </footer>
    </div>
  );
}
