import type { Metadata } from "next";
import { images } from "./images";
import { isIndexable, site, siteUrl } from "./site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Path with trailing slash, e.g. "/goldankauf/" */
  path: string;
  /** Absolute title (skip the "| Gold Sohn" template) – used where the live site's title already contains the brand. */
  absoluteTitle?: boolean;
}

export function pageMetadata({ title, description, path, absoluteTitle = true }: PageMetaInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: site.name,
      url: path,
      title,
      description,
      images: [{ url: images.heroA.src, width: images.heroA.width, height: images.heroA.height, alt: "Gold Sohn – Goldankauf" }],
    },
    robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export function absoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}

/** schema.org Organization / OnlineStore data, built only from verified facts. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: siteUrl,
    logo: absoluteUrl(images.logo.src),
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      postalCode: site.zip,
      addressLocality: site.city,
      addressCountry: "DE",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
