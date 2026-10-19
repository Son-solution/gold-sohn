import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";

export function LegalPage({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Rechtliches" title={[title]} crumbs={[{ name: title, path }]} cta={null} />
      <section className="section bg-white">
        <div className="container-luxe">
          <div className="prose-luxe flex min-w-0 max-w-3xl flex-col gap-7 break-words sm:gap-8 [&_h2]:mb-2 [&_h2]:text-[23px] [&_h2]:leading-tight sm:[&_h2]:text-[28px]">{children}</div>
        </div>
      </section>
    </>
  );
}
