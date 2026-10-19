import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { images } from "@/lib/images";

/** Cinematic band with the gold mesh macro photo: widens with the scroll, drifts in depth. */
export function FeatureBand() {
  return (
    <section aria-label="Präzision" className="relative">
      <ParallaxMedia src={images.goldGeflecht} alt="Makroaufnahme eines feinen Goldgeflechts" className="h-[min(560px,140vw)] sm:h-[620px] lg:h-[760px]" travel={9}>
        <div className="container-luxe relative flex h-full items-end pb-8 sm:items-center sm:pb-0">
          <Reveal y={80} className="m-center flex max-w-[520px] max-sm:mx-auto flex-col gap-4 rounded-[24px] bg-[rgba(255,253,249,.86)] p-6 sm:gap-5 sm:rounded-[32px] shadow-[0_50px_90px_-50px_rgba(60,40,10,.6),inset_0_0_0_1px_rgba(255,255,255,.7)] backdrop-blur-xl sm:p-12">
            <span className="eyebrow">Präzision</span>
            <SplitHeading parts={["Jedes Gramm ", { em: "zählt." }]} className="h-display" />
            <p className="lead">Feingehalt, Gewicht und der aktuelle Edelmetallkurs bestimmen Ihr Angebot – transparent und nachvollziehbar.</p>
          </Reveal>
        </div>
      </ParallaxMedia>
    </section>
  );
}
