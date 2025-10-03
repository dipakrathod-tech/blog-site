import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://blog.dipakrathod.me";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",                    // Disallow API routes
        "/_next/",                  // Disallow Next.js internals  
        "/private/",                // Disallow private routes
        "/*.json$",                 // Disallow JSON files
        "/_pagefind/",              // Disallow pagefind search data
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
