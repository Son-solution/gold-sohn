"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { images } from "@/lib/images";
import { primaryNav } from "@/lib/navigation";
import { services } from "@/lib/content/services";
import { site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();
  const lastY = useRef(0);
  const ddTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ddRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const openState = useRef({ dd: false, menu: false });

  useEffect(() => {
    openState.current = { dd: ddOpen, menu: menuOpen };
  }, [ddOpen, menuOpen]);

  // Glass background after scrolling; hide while scrolling down, reveal on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const blocked = openState.current.dd || openState.current.menu;
      if (y > 600 && y > lastY.current + 4 && !blocked) setHidden(true);
      else if (y < lastY.current - 4 || y < 600) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the dropdown on outside click / Escape.
  useEffect(() => {
    if (!ddOpen) return;
    const onDown = (e: PointerEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDdOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [ddOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    burgerRef.current?.focus({ preventScroll: true });
  }, []);

  const hoverOpen = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (ddTimer.current) clearTimeout(ddTimer.current);
    setDdOpen(true);
  };
  const hoverClose = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    ddTimer.current = setTimeout(() => setDdOpen(false), 180);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 z-50 transition-[translate,background-color,box-shadow] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
          scrolled ? "bg-white/85 shadow-[0_1px_0_rgba(197,160,100,.32),0_20px_40px_-32px_rgba(80,60,30,.4)] backdrop-blur-xl" : ""
        } ${hidden ? "-translate-y-[110%]" : ""}`}
        style={{ top: "env(safe-area-inset-top, 0px)" }}
      >
        <div className={`container-luxe flex items-center gap-6 transition-[height] duration-700 xl:gap-8 ${scrolled ? "h-16 sm:h-[70px]" : "h-[76px] sm:h-[88px]"}`}>
          <Link href="/" aria-label="Gold Sohn – zur Startseite" className="shrink-0">
            <Image src={images.logo} alt="Gold Sohn" priority className={`w-auto transition-[height] duration-700 ${scrolled ? "h-[22px] sm:h-6" : "h-6 sm:h-[28px]"}`} />
          </Link>

          <nav aria-label="Hauptnavigation" className="ml-auto hidden items-center gap-6 whitespace-nowrap lg:flex xl:gap-7">
            <div ref={ddRef} className="relative" onMouseEnter={hoverOpen} onMouseLeave={hoverClose}>
              <button
                type="button"
                className="link-underline inline-flex items-center gap-2 py-2.5 text-[13px] font-medium uppercase tracking-[0.14em] text-ink-strong"
                aria-expanded={ddOpen}
                aria-controls="ankauf-menu"
                onClick={() => setDdOpen((v) => !v)}
              >
                Ankauf
                <ChevronDown aria-hidden className={`size-3.5 transition-transform duration-500 ${ddOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {ddOpen ? (
                  <motion.div
                    id="ankauf-menu"
                    className="glass absolute left-[-28px] top-[calc(100%+14px)] grid w-[580px] grid-cols-2 gap-1 rounded-3xl bg-white/95 p-4 shadow-[0_40px_80px_-40px_rgba(80,60,30,.45)]"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12, clipPath: "inset(0% 0% 100% 0% round 24px)" }}
                    animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 24px)" }}
                    exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.6, ease }}
                  >
                    {services.map((s, i) => (
                      <motion.div
                        key={s.slug}
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease, delay: 0.06 + i * 0.035 }}
                      >
                        <Link
                          href={s.path}
                          onClick={() => setDdOpen(false)}
                          className="flex items-center gap-3.5 rounded-2xl p-2.5 transition-colors hover:bg-cream"
                        >
                          <Image src={s.image} alt="" width={48} height={48} sizes="48px" className="size-12 shrink-0 rounded-xl object-cover" />
                          <span>
                            <span className="block font-serif text-[17px] text-ink-strong">{s.navLabel}</span>
                            <span className="block text-xs text-ink-2">{s.teaser}</span>
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
            {primaryNav.map((item) => (
              <Link key={item.href} href={item.href} className="link-underline py-2.5 text-[12px] font-medium uppercase tracking-[0.12em] text-ink-strong xl:text-[13px] xl:tracking-[0.14em]">
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/versandtasche/" className="btn btn-gold hidden !min-h-[46px] whitespace-nowrap !px-6 !text-xs min-[1400px]:inline-flex">
            Versandtasche anfordern
          </Link>

          <button
            ref={burgerRef}
            type="button"
            className="ml-auto inline-flex size-12 items-center justify-center rounded-full bg-white/80 shadow-[inset_0_0_0_1px_rgba(51,51,51,.18)] lg:hidden"
            aria-label="Menü öffnen"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu aria-hidden className="size-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            className="fixed inset-0 z-[70] flex flex-col overflow-auto overscroll-contain bg-cream px-5 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-10"
            style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 14px)" }}
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.55, ease: [0.7, 0, 0.84, 0] } }}
            transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
            onKeyDown={(e) => e.key === "Escape" && closeMenu()}
          >
            <div className="flex min-h-[58px] items-center justify-between">
              <Image src={images.logo} alt="Gold Sohn" className="h-6 w-auto" />
              <button
                type="button"
                autoFocus
                className="inline-flex size-12 items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(51,51,51,.18)]"
                aria-label="Menü schließen"
                onClick={closeMenu}
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>
            <motion.nav
              aria-label="Mobile Navigation"
              className="mt-6 flex flex-col sm:mt-10"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.35 } } }}
            >
              {[{ label: "Ankauf", href: "/goldankauf/" }, ...primaryNav].map((item, i) => (
                <motion.div
                  key={item.href}
                  variants={{ hidden: { opacity: 0, y: reduce ? 0 : 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline justify-between border-b border-[rgba(197,160,100,.32)] py-3 font-serif text-[clamp(1.6rem,1.1rem+2.6vw,2.6rem)] leading-tight text-ink-strong sm:py-4"
                  >
                    {item.label}
                    <span className="font-sans text-xs tracking-[0.2em] text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <div className="mt-6 flex flex-wrap gap-2">
              {services.map((s) => (
                <Link key={s.slug} href={s.path} onClick={() => setMenuOpen(false)} className="rounded-full bg-white px-4 py-2 text-sm text-ink-strong shadow-[inset_0_0_0_1px_rgba(197,160,100,.35)]">
                  {s.navLabel}
                </Link>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-3 pt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <Link href="/versandtasche/" onClick={() => setMenuOpen(false)} className="btn btn-gold">
                Versandtasche anfordern
              </Link>
              <p className="flex items-center justify-center gap-2 text-sm text-ink-2">
                <Phone aria-hidden className="size-4 text-gold-ink" /> {site.phone}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
