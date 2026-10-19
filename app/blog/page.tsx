import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { legacyPosts } from "@/lib/content/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog | Gold Sohn",
  description: "Aktuelles rund um Goldpreis, Silberpreis und Edelmetalle von Gold Sohn.",
  path: "/blog/",
});

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="Blog" title={["Edelmetalle ", { em: "aktuell" }]} lead="Marktberichte und Wissen rund um Gold, Silber, Platin und Palladium." crumbs={[{ name: "Blog", path: "/blog/" }]} cta={null} />
      <section className="section bg-white" aria-label="Beiträge">
        <div className="container-luxe">
          <p className="mb-10 rounded-xl border border-dashed border-gold/70 bg-cream px-4 py-3 text-sm text-gold-ink">
            [Migration ausstehend: Die {legacyPosts.length} bestehenden Beiträge werden mit Inhalt übernommen – siehe docs/SEO-MIGRATION.md. Die Liste zeigt die URLs, die erhalten bleiben.]
          </p>
          <Reveal stagger={0.05} className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            {legacyPosts.map((p) => (
              <article key={p.slug} className="m-center min-w-0 rounded-[20px] bg-cream p-5 sm:rounded-[22px] sm:p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-gold-ink">{p.date ?? "Ratgeber"}</p>
                <h2 className="mt-2 text-[19px] leading-snug sm:text-[22px]">{p.title}</h2>
                <p className="mt-2 break-all text-xs text-ink-2">/{p.slug}/</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
