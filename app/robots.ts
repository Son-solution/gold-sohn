import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/site";

/** Only the production deployment may be indexed (NEXT_PUBLIC_SITE_ENV=production). */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }], sitemap: `${siteUrl}/sitemap.xml` };
}
