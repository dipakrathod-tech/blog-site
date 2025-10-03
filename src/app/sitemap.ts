import type { MetadataRoute } from "next";
import { getPosts, getTags } from "@/lib/get-posts";

// Base URL for your site - update this with your actual domain
const BASE_URL = "https://blog.dipakrathod.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all posts
  const posts = await getPosts();

  // Get all unique tags
  const allTags = await getTags();
  const uniqueTags = [...new Set(allTags)];

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/posts`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Dynamic blog post routes
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/posts/${post.name}`,
    lastModified: post.frontMatter.date
      ? new Date(post.frontMatter.date)
      : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic tag routes
  const tagRoutes: MetadataRoute.Sitemap = uniqueTags.map((tag) => ({
    url: `${BASE_URL}/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // RSS feed route
  const rssRoute: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/rss.xml`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];

  // Combine all routes
  return [...staticRoutes, ...postRoutes, ...tagRoutes, ...rssRoute];
}
