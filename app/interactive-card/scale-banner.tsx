"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScaleBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame,
        { width: "78vw", borderRadius: 32 },
        {
          width: "100vw",
          borderRadius: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "center 45%",
            scrub: 0.6,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="flex justify-center">
        <div
          ref={frameRef}
          className="relative aspect-[21/9] w-[78vw] overflow-hidden rounded-[2rem]"
          style={{ willChange: "width, border-radius" }}
        >
          <Image
            src="/projects/interactive-card/scale.jpg"
            alt="A busy global city street at dusk"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/55" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/75 sm:text-sm">
              By the numbers
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
              At the scale of the world.
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base md:text-lg">
              200 countries. 100 million merchants. 65,000 transactions every
              second — your card, working everywhere, 24/7.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
