"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Play } from "lucide-react";
import { useRef, useState } from "react";
import { images, videoSrc } from "@/lib/images";
import { site } from "@/lib/site";

/**
 * Premium presentation of the original Gold Sohn explainer video.
 * The video is never auto-played; it loads only after the visitor presses play.
 */
export function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="flex min-w-0 flex-col gap-5 sm:gap-6">
      <div className="m-center flex flex-col gap-3">
        <span className="eyebrow">Erklärvideo · {site.videoDurationLabel}</span>
        <p className="font-serif text-[clamp(1.3rem,1rem+1.6vw,2.3rem)] leading-tight text-ink-strong">Ihr Weg zum fairen Ankauf – in 104 Sekunden.</p>
      </div>
      <motion.div
        className="relative rounded-[26px] bg-[linear-gradient(180deg,#F6F1E8,#fff)] p-2 shadow-[inset_0_0_0_1px_rgba(197,160,100,.5),0_60px_120px_-70px_rgba(100,75,35,.6)] sm:rounded-[40px] sm:p-4"
        initial={reduce ? false : { clipPath: "inset(8% 8% 8% 8% round 40px)", opacity: 0.3 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 40px)", opacity: 1 }}
        viewport={{ once: false, margin: "-10%" }}
        transition={{ duration: 1.6, ease: [0.87, 0, 0.13, 1] }}
      >
        <div className="relative aspect-video overflow-hidden rounded-[20px] bg-cream sm:rounded-[28px]">
          <AnimatePresence initial={false}>
            {playing ? (
              <motion.video
                key="video"
                ref={videoRef}
                className="absolute inset-0 size-full bg-cream"
                src={videoSrc}
                poster={images.posterSchritt1.src}
                controls
                autoPlay
                playsInline
                preload="auto"
                aria-label="Gold Sohn Erklärvideo: So funktioniert der Goldankauf"
                initial={reduce ? false : { clipPath: "inset(14% 20% 14% 20% round 28px)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
            ) : (
              <motion.button
                key="poster"
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 size-full cursor-pointer"
                aria-label={`Erklärvideo abspielen: So funktioniert der Goldankauf, ${site.videoDurationLabel}`}
                exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.6 } }}
              >
                <Image src={images.posterSchritt1} alt="" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover transition-[scale] duration-[1600ms] group-hover:scale-105" />
                <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(246,241,232,.75)_0%,rgba(246,241,232,0)_38%)]" />
                <span className="absolute bottom-1/2 left-1/2 flex size-[60px] -translate-x-1/2 translate-y-1/2 sm:translate-y-0 items-center justify-center rounded-full bg-white/90 text-gold-ink shadow-[inset_0_0_0_1px_#C5A064,0_30px_60px_-20px_rgba(100,75,35,.5)] backdrop-blur transition-[scale] duration-700 group-hover:scale-110 sm:bottom-[8%] sm:size-24">
                  <span aria-hidden className="absolute -inset-3 rounded-full border border-gold/55 [animation:pulse-ring_3s_cubic-bezier(.16,1,.3,1)_infinite]" />
                  <Play aria-hidden className="ml-1 size-5 fill-current sm:size-7" />
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <p className="text-[12.5px] text-ink-2 max-sm:text-center sm:text-[13px]">Original-Erklärvideo von Gold Sohn, unverändert eingebunden.</p>
    </div>
  );
}
