import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-cream pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="container-luxe m-center flex flex-col items-start gap-5 max-sm:items-center sm:gap-6">
        <span className="eyebrow">Fehler 404</span>
        <h1 className="h-display">
          Diese Seite <em>gibt es nicht.</em>
        </h1>
        <p className="lead">Die Adresse ist möglicherweise veraltet. Von hier aus geht es weiter:</p>
        <div className="btn-row gap-3">
          <Link href="/" className="btn btn-gold">
            Zur Startseite
          </Link>
          <Link href="/goldankauf/" className="btn btn-line">
            Goldankauf
          </Link>
        </div>
      </div>
    </section>
  );
}
