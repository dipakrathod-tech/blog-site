import { ImageResponse } from "next/og";
import { OGImage } from "@/components/OGImage";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Image metadata
export const alt = "Dipak Rathod - Cloud & DevOps Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Load the logo from the public directory
  const logoData = await readFile(join(process.cwd(), "public/icon.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <OGImage
        title="Dipak Rathod"
        description="Cloud & DevOps Engineer - Sharing insights on AWS, DevOps, and Cloud Architecture"
        category="Blog"
        logoSrc={logoSrc}
      />
    ),
    {
      ...size,
    }
  );
}
