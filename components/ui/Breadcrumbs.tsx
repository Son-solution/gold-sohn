import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Startseite", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Brotkrumen" className="text-[13px] text-ink-2">
        <ol className="flex flex-wrap items-center gap-2 max-sm:justify-center">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i < all.length - 1 ? (
                <>
                  <Link href={c.path} className="link-underline hover:text-ink-strong">
                    {c.name}
                  </Link>
                  <span aria-hidden="true" className="text-soft">
                    /
                  </span>
                </>
              ) : (
                <span aria-current="page" className="text-ink-strong">
                  {c.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
