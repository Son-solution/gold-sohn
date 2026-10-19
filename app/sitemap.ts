import type { MetadataRoute } from "next";
import { cities, cityPath } from "@/lib/content/cities";
import { services } from "@/lib/content/services";
import { siteUrl } from "@/lib/site";

const staticPaths = [
  "/",
  "/preise/",
  "/goldrechner/",
  "/versandtasche/",
  "/selbstversand/",
  "/so-funktionierts/",
  "/about/",
  "/contact/",
  "/faq/",
  "/blog/",
  "/standorte/",
  "/impressum/",
  "/datenschutz/",
  "/agb/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...staticPaths, ...services.map((s) => s.path), ...cities.map((c) => cityPath(c.slug))];
  return paths.map((p) => ({
    url: `${siteUrl}${p}`,
    changeFrequency: p === "/" || p === "/preise/" ? "daily" : "monthly",
    priority: p === "/" ? 1 : services.some((s) => s.path === p) ? 0.9 : 0.6,
  }));
}
