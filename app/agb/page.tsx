import { LegalPage } from "@/components/templates/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AGB | Gold Sohn",
  description: "Allgemeine Geschäftsbedingungen von Gold Sohn.",
  path: "/agb/",
});

export default function AgbPage() {
  return (
    <LegalPage title="AGB" path="/agb/">
      <p className="rounded-xl border border-dashed border-gold/70 bg-cream px-4 py-3 text-sm !text-gold-ink">
        Platzhalter: Bitte die AGB von gold-sohn.de/agb/ 1:1 übernehmen. Dieser Text wurde bewusst nicht neu verfasst.
      </p>
    </LegalPage>
  );
}
