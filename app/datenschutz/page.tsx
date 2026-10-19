import { LegalPage } from "@/components/templates/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Datenschutzerklärung | Gold Sohn",
  description: "Datenschutzerklärung von Gold Sohn.",
  path: "/datenschutz/",
});

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutz" path="/datenschutz/">
      <p className="rounded-xl border border-dashed border-gold/70 bg-cream px-4 py-3 text-sm !text-gold-ink">
        Platzhalter: Bitte die rechtlich geprüfte Datenschutzerklärung von gold-sohn.de/datenschutz/ 1:1 übernehmen und um die neuen Dienste ergänzen (z. B. Hosting bei Vercel,
        Formularversand über Resend oder Webhook, selbst gehostete Schriften). Dieser Text wurde bewusst nicht neu verfasst.
      </p>
    </LegalPage>
  );
}
