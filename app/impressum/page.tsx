import { LegalPage } from "@/components/templates/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

// Title/description kept from the live page. Content: facts from the live Impressum (18.10.2026).
export const metadata = pageMetadata({
  title: "Impressum | Gold Sohn – Goldankauf Wiesbaden",
  description: "Rechtliche Informationen zu Gold Sohn – Ihrem Partner für den Goldankauf in Wiesbaden und dem Rhein-Main-Gebiet.",
  path: "/impressum/",
});

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum" path="/impressum/">
      <p className="rounded-xl border border-dashed border-gold/70 bg-cream px-4 py-3 text-sm !text-gold-ink">
        Vor dem Livegang: Text 1:1 mit dem aktuellen Impressum abgleichen (rechtlich geprüfte Fassung übernehmen).
      </p>
      <div>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          {site.name}
          <br />
          Inhaber: {site.owner}
          <br />
          {site.street}
          <br />
          {site.zip} {site.city}
          <br />
          {site.country}
        </p>
        <p>Rechtsform: {site.legalForm}, nicht im Handelsregister eingetragen.</p>
      </div>
      <div>
        <h2>Kontakt</h2>
        <p>
          Telefon: {site.phone}
          <br />
          E-Mail: {site.email}
        </p>
      </div>
      <div>
        <h2>Umsatzsteuer</h2>
        <p>Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.</p>
      </div>
      <div>
        <h2>Tätigkeit</h2>
        <p>Goldankauf, An- und Verkauf von Edelmetallen sowie An- und Verkauf von Uhren.</p>
      </div>
      <div>
        <h2>Streitschlichtung</h2>
        <p>
          Wir nehmen an Streitbeilegungsverfahren vor der Universalschlichtungsstelle des Zentrums für Schlichtung e.V. in Kehl am Rhein teil.
          [Bitte Formulierung und Adresse mit dem aktuellen Impressum abgleichen.]
        </p>
      </div>
    </LegalPage>
  );
}
