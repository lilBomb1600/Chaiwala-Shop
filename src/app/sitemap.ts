import type { MetadataRoute } from "next";

const siteUrl = "https://www.chaiwalashop.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/menu", "/gallery", "/about", "/contact"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
