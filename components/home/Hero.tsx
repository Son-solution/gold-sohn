"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { useRef } from "react";
import { EASE, MOTION_OK, gsap, useGSAP } from "@/lib/gsap";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

/**
 * Touch devices: the hero image follows the phone's tilt (same soft parallax as the mouse).
 * iOS only exposes the sensor after a permission prompt – by decision it is skipped there.
 * Returns a cleanup function.
 */
function tiltParallax(el: HTMLElement, par: Element) {
  const DOE = window.DeviceOrientationEvent as (typeof DeviceOrientationEvent & { requestPermission?: unknown }) | undefined;
  if (!DOE || typeof DOE.requestPermission === "function") return () => {};

  const tx = gsap.quickTo(par, "x", { duration: 0.9, ease: "power3.out" });
  const ty = gsap.quickTo(par, "y", { duration: 0.9, ease: "power3.out" });
  let base: { x: number; y: number } | null = null;
  let last = 0;
  let inView = true;

  const onTilt = (e: DeviceOrientationEvent) => {
    if (!inView || e.beta == null || e.gamma == null) return;
    // Map device axes to screen axes for the current rotation.
    const angle = window.screen.orientation?.angle ?? 0;
    let x = e.gamma;
    let y = e.beta;
    if (angle === 90) [x, y] = [e.beta, -e.gamma];
    else if (angle === 270) [x, y] = [-e.beta, e.gamma];
    else if (angle === 180) [x, y] = [-e.gamma, -e.beta];

    const now = performance.now();
    // Neutral position = how the phone is held; re-centre on sensor jumps (phone held upright).
    if (!base || Math.abs(x - base.x) > 45 || Math.abs(y - base.y) > 45) base = { x, y };
    else {
      // Follow posture changes over ~4 s (time-based, independent of the sensor's event rate).
      const k = 1 - Math.exp(-(now - last) / 4000);
      base.x += (x - base.x) * k;
      base.y += (y - base.y) * k;
    }
    last = now;

    const nx = gsap.utils.clamp(-1, 1, (x - base.x) / 15);
    const ny = gsap.utils.clamp(-1, 1, (y - base.y) / 15);
    tx(-nx * 26);
    ty(-ny * 18);
  };

  // Only react while the hero is on screen.
  const io = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (!inView) {
      base = null;
      tx(0);
      ty(0);
    }
  });
  io.observe(el);
  window.addEventListener("deviceorientation", onTilt);
  return () => {
    window.removeEventListener("deviceorientation", onTilt);
    io.disconnect();
  };
}

const headline = [
  [{ t: "Ihr", em: false }, { t: "Gold.", em: false }],
  [{ t: "Unser", em: true }, { t: "Versprechen.", em: true }],
];

/**
 * Cinematic hero: masked image reveal, slow camera drift, drifting window light
 * (cross-fade between two lighting states of the same studio frame), pointer parallax
 * with a soft light, magnetic CTAs and a scroll hand-off to the next section.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      mm.add({ motion: MOTION_OK, desk: "(min-width: 1024px)", hover: "(hover: hover)", touch: "(any-pointer: coarse)" }, (ctx) => {
        const { motion, desk, hover, touch } = ctx.conditions as { motion: boolean; desk: boolean; hover: boolean; touch: boolean };
        if (!motion) return;

        gsap
          .timeline({ defaults: { ease: EASE } })
          .fromTo(
            q("[data-media]"),
            { clipPath: desk ? "inset(18% 7% 18% 55% round 30px)" : "inset(10% 10% 10% 10% round 30px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 2.2, ease: "expo.inOut" },
          )
          .from(q("[data-zoom]"), { scale: 1.28, duration: 3 }, 0)
          .from(q("[data-eyebrow]"), { y: 20, autoAlpha: 0, duration: 1 }, 0.7)
          .from(q("[data-word]"), { yPercent: 118, rotate: 5, duration: 1.5, stagger: 0.08 }, 0.85)
          .from(q("[data-lead]"), { y: 26, autoAlpha: 0, duration: 1.2 }, 1.35)
          .from(q("[data-cta] > *"), { y: 26, autoAlpha: 0, duration: 1.1, stagger: 0.1 }, 1.5)
          .from(q("[data-strip] > *"), { y: 40, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, 1.6)
          .from(q("[data-video]"), { x: 30, autoAlpha: 0, duration: 1.1 }, 1.8);

        // Window light drifting across the wall + slow camera move
        gsap.to(q("[data-light-b]"), { opacity: 1, duration: 9, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 3 });
        gsap.to(q("[data-cam]"), { scale: 1.06, xPercent: -1.2, yPercent: -0.6, duration: 24, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 3 });

        if (desk) {
          gsap.to(q("[data-scroll]"), { yPercent: 16, scale: 1.06, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
          gsap.to(q("[data-copy]"), { y: -110, autoAlpha: 0.05, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "70% top", scrub: true } });
          gsap.to(q("[data-foot]"), { y: 60, autoAlpha: 0, ease: "none", scrollTrigger: { trigger: el, start: "30% top", end: "75% top", scrub: true } });
        }

        const cleanups: (() => void)[] = [];
        if (touch) cleanups.push(tiltParallax(el, q("[data-par]")[0]));
        if (!hover) return () => cleanups.forEach((fn) => fn());

        const par = q("[data-par]")[0];
        const glow = q("[data-glow]")[0];
        const px = gsap.quickTo(par, "x", { duration: 1.6, ease: "power3.out" });
        const py = gsap.quickTo(par, "y", { duration: 1.6, ease: "power3.out" });
        const gx = gsap.quickTo(glow, "x", { duration: 1.2, ease: "power3.out" });
        const gy = gsap.quickTo(glow, "y", { duration: 1.2, ease: "power3.out" });
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          px(-nx * 28);
          py(-ny * 16);
          gx(e.clientX - r.left);
          gy(e.clientY - r.top);
        };
        const onEnter = () => gsap.to(glow, { opacity: 1, duration: 1 });
        const onLeave = () => {
          gsap.to(glow, { opacity: 0, duration: 1 });
          px(0);
          py(0);
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

        // Magnetic CTAs
        q("[data-magnetic]").forEach((btn) => {
          const bx = gsap.quickTo(btn, "x", { duration: 0.6, ease: "power3.out" });
          const by = gsap.quickTo(btn, "y", { duration: 0.6, ease: "power3.out" });
          const move = (e: MouseEvent) => {
            const r = btn.getBoundingClientRect();
            bx((e.clientX - r.left - r.width / 2) * 0.25);
            by((e.clientY - r.top - r.height / 2) * 0.35);
          };
          const leave = () => {
            bx(0);
            by(0);
          };
          btn.addEventListener("mousemove", move as EventListener);
          btn.addEventListener("mouseleave", leave);
          cleanups.push(() => {
            btn.removeEventListener("mousemove", move as EventListener);
            btn.removeEventListener("mouseleave", leave);
          });
        });

        return () => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
          cleanups.forEach((fn) => fn());
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label="Einleitung"
      className="relative isolate flex flex-col overflow-hidden bg-[#F6F2EB] lg:min-h-[clamp(680px,100svh,960px)] lg:bg-[#F3EEE6]"
    >
      {/* Media */}
      <div data-media className="relative order-2 h-[clamp(340px,110vw,460px)] overflow-hidden sm:h-[520px] md:h-[600px] lg:absolute lg:inset-0 lg:-z-10 lg:h-auto">
        <div data-scroll className="absolute inset-0 will-change-transform">
          <div data-par className="absolute -inset-8 will-change-transform">
            <div data-zoom className="absolute inset-0 will-change-transform">
              <div data-cam className="absolute inset-0 will-change-transform">
                <Image
                  src={images.heroA}
                  alt="Feingoldbarren und schwere Goldkette auf Travertin im warmen Sonnenlicht"
                  fill
                  priority
                  sizes="100vw"
                  placeholder="blur"
                  className="object-cover object-[74%_50%] lg:object-[60%_50%]"
                />
                <Image
                  data-light-b
                  src={images.heroB}
                  alt=""
                  aria-hidden
                  fill
                  sizes="100vw"
                  className="object-cover object-[74%_50%] opacity-0 lg:object-[60%_50%]"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          data-glow
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 -ml-[450px] -mt-[450px] size-[900px] rounded-full opacity-0 mix-blend-soft-light"
          style={{ background: "radial-gradient(closest-side, rgba(255,240,214,.55), rgba(255,240,214,0))" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,242,235,1)_0%,rgba(246,242,235,0)_22%,rgba(246,242,235,0)_85%,rgba(246,242,235,.5)_100%)] lg:bg-[linear-gradient(90deg,rgba(246,242,235,.95)_0%,rgba(246,242,235,.84)_24%,rgba(246,242,235,.3)_44%,rgba(246,242,235,0)_58%),linear-gradient(180deg,rgba(246,242,235,.65)_0%,rgba(246,242,235,0)_16%,rgba(246,242,235,0)_80%,rgba(246,242,235,.55)_100%)]"
        />
      </div>

      {/* Copy */}
      <div data-copy className="container-luxe relative order-1 flex flex-col justify-center pb-10 pt-28 sm:pb-12 sm:pt-36 lg:flex-1 lg:pb-14 lg:pt-32">
        <div className="m-center flex max-w-[620px] flex-col gap-5 max-sm:mx-auto sm:gap-7 lg:gap-8">
          <span data-eyebrow className="eyebrow !text-[#5E4520]">
            Goldankauf &amp; Edelmetallankauf
          </span>
          <h1 className="h-hero" aria-label="Ihr Gold. Unser Versprechen.">
            {headline.map((row, r) => (
              <span key={r} className="block" aria-hidden="true">
                {row.map((w, i) => (
                  <span key={i}>
                    <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top">
                      <span data-word className="inline-block will-change-transform">
                        {w.em ? <em>{w.t}</em> : w.t}
                      </span>
                    </span>
                    {i < row.length - 1 ? " " : null}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p data-lead className="lead !max-w-[470px] !text-[15.5px] !text-[#36322D] sm:!text-xl">
            Gold und Edelmetalle sicher, transparent und zu fairen Preisen verkaufen.
          </p>
          <div data-cta className="btn-row sm:gap-3.5">
            <Link data-magnetic href="/goldrechner/" className="btn btn-gold">
              Jetzt Gold verkaufen <ArrowRight aria-hidden />
            </Link>
            <Link data-magnetic href="/versandtasche/" className="btn btn-line">
              Versandtasche anfordern
            </Link>
          </div>
        </div>
      </div>

      {/* Trust strip + video link */}
      <div data-foot className="relative order-3 z-10 lg:pb-11">
        <div className="container-luxe flex flex-col gap-0 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
          <div data-strip className="glass mb-14 flex flex-col rounded-[22px] sm:mb-16 sm:flex-row lg:mb-0 lg:min-w-0 lg:max-w-[880px] lg:flex-1 lg:rounded-3xl">
            {[
              ["Bewertung", "Kostenlos & unverbindlich"],
              ["Versand", "Versicherte Versandtasche"],
              ["Auszahlung", "Sofort nach Zustimmung"],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`flex flex-col items-center gap-1 px-5 py-3.5 text-center sm:flex-1 sm:items-start sm:justify-start sm:gap-1.5 sm:px-6 sm:py-5 sm:text-left xl:px-8 xl:py-6 ${
                  i ? "border-t border-[rgba(197,160,100,.32)] sm:border-l sm:border-t-0" : ""
                }`}
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#5E4520]">{k}</span>
                <b className="text-balance font-serif text-[16px] font-normal leading-snug text-[#24211E] sm:text-[18px] xl:text-[19px]">{v}</b>
              </div>
            ))}
          </div>
          <Link
            data-video
            href="/so-funktionierts/"
            className="glass order-first -mt-20 mb-6 flex w-fit max-w-full max-sm:self-center items-center gap-3.5 rounded-full py-2 pl-2 pr-5 shadow-[0_20px_40px_-24px_rgba(80,60,30,.45)] transition-[translate] duration-700 hover:-translate-y-1 sm:-mt-24 sm:gap-4 sm:py-2.5 sm:pl-2.5 sm:pr-6 lg:order-none lg:mt-0 lg:mb-1.5 lg:shrink-0"
          >
            <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-gold text-[#241F19] sm:size-12">
              <span aria-hidden className="absolute -inset-1.5 rounded-full border border-gold/70 [animation:pulse-ring_2.8s_cubic-bezier(.16,1,.3,1)_infinite]" />
              <Play aria-hidden className="ml-0.5 size-4 fill-current" />
            </span>
            <span className="min-w-0">
              <b className="block font-serif text-[15px] font-normal leading-snug text-[#24211E] sm:text-[17px]">So funktioniert der Goldankauf</b>
              <small className="block text-[11px] uppercase tracking-[0.18em] text-[#5E4520]">Erklärvideo · {site.videoDurationLabel}</small>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
