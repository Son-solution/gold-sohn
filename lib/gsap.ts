"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** Shared easing so every animation on the site feels like one system. */
export const EASE = "expo.out";
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** Scroll reveal that replays in both directions: in when entering, out when leaving (down or up). */
export const replay = (trigger: Element, start = "top 88%") => ({
  trigger,
  start,
  end: "bottom 12%",
  toggleActions: "play reverse play reverse",
});

export { gsap, ScrollTrigger, useGSAP };
