import { MetadataRoute } from "next";
import { INDICATORS } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://1persontrader.com";

  const staticPages = [
    "",
    "/indicators",
    "/pricing",
    "/faq",
    "/contact",
    "/terms",
    "/privacy",
    "/refund-policy",
    "/risk-disclaimer",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const indicatorPages = INDICATORS.map((indicator) => ({
    url: `${baseUrl}/indicators/${indicator.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...indicatorPages];
}
