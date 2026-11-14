
import type { MetadataRoute } from "next"

const baseUrl = "https://qraft.studio"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/auth/callback",
        "/studio/#soon",
        "/studio/#settings",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
