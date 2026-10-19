"use client";

import { useRef } from "react";
import { EASE, MOTION_OK, ScrollTrigger, gsap, replay, useGSAP } from "@/lib/gsap";

export const processSteps = [
  { n: "I", title: "Versandtasche anfordern", text: "Kostenlos und unverbindlich online anfordern – oder selbst versenden, zum Beispiel per Einschreiben." },
  { n: "II", title: "Edelmetalle einsenden", text: "Sie legen Ihre Wertgegenstände in die Versandtasche und senden das Paket an Gold Sohn." },
  { n: "III", title: "Metallprüfung", text: "Ihre Wertgegenstände werden professionell geprüft und auf Basis des aktuellen Edelmetallkurses bewertet." },
  { n: "IV", title: "Angebot & Auszahlung", text: "Sie erhalten Ihr Angebot per E-Mail oder telefonisch. Stimmen Sie zu, erfolgt die Auszahlung sofort." },
];

/** Vertical timeline: the gold line draws with the scroll, each step lights up as it passes. */
export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", el);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo("[data-line]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 60%", end: "bottom 60%", scrub: true } });
        steps.forEach((s) => {
          s.dataset.active = "false";
          ScrollTrigger.create({
            trigger: s,
            start: "top 62%",
            onEnter: () => (s.dataset.active = "true"),
            onLeaveBack: () => (s.dataset.active = "false"),
          });
          gsap.from(s.querySelectorAll("h3, p"), { x: 30, autoAlpha: 0, duration: 1.1, ease: EASE, stagger: 0.1, scrollTrigger: replay(s, "top 80%") });
          gsap.from(s.querySelector("[data-num]"), { scale: 0.4, autoAlpha: 0, duration: 1, ease: "back.out(1.7)", scrollTrigger: replay(s, "top 82%") });
        });
        return () => steps.forEach((s) => (s.dataset.active = "true"));
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative flex flex-col gap-9 pl-[66px] sm:gap-14 sm:pl-24">
      <span aria-hidden className="absolute bottom-2.5 left-[22px] top-2.5 w-px bg-pearl sm:left-[31px]">
        <span data-line className="absolute inset-0 origin-top bg-gold" />
      </span>
      {processSteps.map((s) => (
        <li key={s.n} data-step data-active="true" className="group relative flex min-h-0 flex-col gap-2.5 sm:min-h-[150px]">
          <span
            data-num
            aria-hidden
            className="absolute -left-[66px] -top-1 flex size-[45px] items-center justify-center rounded-full bg-white font-serif text-[17px] italic text-ink-2 shadow-[inset_0_0_0_1px_#B9B6B0,0_0_0_10px_#fff] transition-[background,color,box-shadow] duration-700 group-data-[active=true]:bg-gold group-data-[active=true]:text-[#241F19] group-data-[active=true]:shadow-[inset_0_0_0_1px_#C5A064,0_0_0_10px_#fff,0_18px_30px_-12px_rgba(140,104,48,.6)] sm:-left-24 sm:size-16 sm:text-[22px]"
          >
            {s.n}
          </span>
          <h3 className="text-[22px] leading-tight transition-colors duration-700 group-data-[active=false]:text-[#8A847C] sm:text-[27px] xl:text-[30px]">
            <span className="sr-only">Schritt {s.n}: </span>
            {s.title}
          </h3>
          <p className="max-w-[420px] text-[15px] text-ink-2 sm:text-base">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
