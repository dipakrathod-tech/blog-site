import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/get-posts";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  // Get the latest posts for shortcuts
  const posts = await getPosts();
  const latestPosts = posts.slice(0, 4); // Get top 4 posts for shortcuts

  // Create shortcuts for latest blog posts
  const shortcuts: MetadataRoute.Manifest["shortcuts"] = latestPosts.map(
    (post) => ({
      name: post.frontMatter.title,
      short_name: post.frontMatter.title.substring(0, 30),
      description: post.frontMatter.description,
      url: `/posts/${post.name}`,
      icons: [
        {
          src: "/icon.svg",
          sizes: "any",
          type: "image/svg+xml",
        },
      ],
    })
  );

  return {
    name: "Dipak Rathod - Cloud & DevOps Engineer Blog",
    short_name: "Dipak's Blog",
    description:
      "Technical blog by Dipak Rathod covering AWS, DevOps, Cloud Architecture, Kubernetes, Docker, and modern software development practices.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a", // slate-900 to match OG images
    orientation: "portrait-primary",
    scope: "/",
    lang: "en-US",
    dir: "ltr",
    categories: [
      "education",
      "productivity",
      "technology",
      "news",
      "development",
    ],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    shortcuts,
    screenshots: [
      // Optional: Add screenshots if you have them
      // {
      //   src: "/screenshot-wide.png",
      //   sizes: "1920x1080",
      //   type: "image/png",
      //   form_factor: "wide",
      //   label: "Blog Homepage"
      // },
      // {
      //   src: "/screenshot-narrow.png",
      //   sizes: "750x1334",
      //   type: "image/png",
      //   form_factor: "narrow",
      //   label: "Blog Homepage Mobile"
      // }
    ],
    related_applications: [],
    prefer_related_applications: false,
    // PWA display overrides for better platform support
    display_override: ["window-controls-overlay", "standalone", "browser"],
  };
}
