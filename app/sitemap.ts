import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/services/residential",
    "/services/commercial",
    "/services/architectural",
    "/projects",
    "/how-we-work",
    "/contact",
  ]

  return routes.map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }))
}
