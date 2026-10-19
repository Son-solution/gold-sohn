import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { VideoPlayer } from "@/components/process/VideoPlayer";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** "So funktioniert der Goldankauf" – animated timeline + original explainer video. */
export function ProcessSection({ as = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <section id="ablauf" aria-label="So funktioniert der Goldankauf" className="section bg-white">
      <div className="container-luxe">
        <SectionHeader as={as} eyebrow="Ablauf" title={["So funktioniert der ", { em: "Goldankauf" }]} />
        <div className="grid grid-cols-1 items-start gap-12 sm:gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-14 xl:gap-20">
          <ProcessTimeline />
          <div className="lg:sticky lg:top-28">
            <VideoPlayer />
          </div>
        </div>
      </div>
    </section>
  );
}
