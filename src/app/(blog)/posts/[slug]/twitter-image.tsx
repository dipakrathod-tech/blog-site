import { ImageResponse } from "next/og";
import { OGImage } from "@/components/OGImage";
import { getPageMap } from "nextra/page-map";
import { normalizePages } from "nextra/normalize-pages";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Image metadata
export const alt = "Blog Post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  // Load the logo from the public directory
  const logoData = await readFile(join(process.cwd(), "public/icon.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logoData.toString("base64")}`;

  // Get the post data
  const { directories } = normalizePages({
    list: await getPageMap("/posts"),
    route: "/posts",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post = directories.find((p: any) => p.name === params.slug);

  if (!post) {
    // Fallback if post not found
    return new ImageResponse(
      (
        <OGImage
          title="Post Not Found"
          description="The requested blog post could not be found."
          category="Blog"
          logoSrc={logoSrc}
        />
      ),
      {
        ...size,
      }
    );
  }

  const { title, description, tags } = post.frontMatter;
  const category = tags && tags.length > 0 ? tags[0] : "Blog";

  return new ImageResponse(
    (
      <OGImage
        title={title}
        description={description}
        category={category}
        logoSrc={logoSrc}
      />
    ),
    {
      ...size,
    }
  );
}
