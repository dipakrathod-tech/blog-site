# OpenGraph Images Implementation

This document describes the implementation of dynamic OpenGraph (OG) and Twitter images for the blog site.

## Overview

The implementation provides dynamically generated social media preview images for both the site homepage and individual blog posts. These images appear when links are shared on platforms like Twitter, Facebook, LinkedIn, and other social networks.

## Architecture

### Components

#### 1. **OGImage Component** (`src/components/OGImage.tsx`)

A reusable React component that renders the visual layout for OpenGraph images.

**Props:**
```typescript
interface OGImageProps {
  title: string;          // Main heading text
  description?: string;   // Optional description/subtitle
  logoSrc?: string;       // Optional logo image
  category?: string;      // Optional category badge (e.g., "AWS", "DevOps")
}
```

**Design Features:**
- Dark slate background (#0f172a)
- Category badge in indigo (#4f46e5)
- Large, bold title (72px)
- Description in slate-400
- Footer with author name and website
- Responsive layout with proper spacing

#### 2. **Root-Level Images** (`src/app/opengraph-image.tsx` & `src/app/twitter-image.tsx`)

These files generate the default OG images for the homepage and any pages without specific OG images.

**Configuration:**
- **Size:** 1200x630 pixels (recommended by Facebook/Twitter)
- **Format:** PNG
- **Alt Text:** "Dipak Rathod - Cloud & DevOps Engineer"

#### 3. **Blog Post Images** (`src/app/(blog)/posts/[slug]/opengraph-image.tsx` & `twitter-image.tsx`)

Dynamic images for individual blog posts that pull data from the post's frontmatter.

**Features:**
- Automatically extracts title, description, and tags from post metadata
- Uses the first tag as the category badge
- Provides fallback for missing posts

## File Convention

Next.js automatically recognizes these special files:

```
app/
├── opengraph-image.tsx       # Site-wide OG image
├── twitter-image.tsx          # Site-wide Twitter image
└── (blog)/posts/[slug]/
    ├── opengraph-image.tsx    # Post-specific OG image
    └── twitter-image.tsx      # Post-specific Twitter image
```

## How It Works

### Build Time Generation

1. During build (`next build`), Next.js automatically:
   - Discovers all `opengraph-image.tsx` files
   - Executes the default export function
   - Generates PNG images
   - Adds appropriate `<meta>` tags to the HTML

### Generated Meta Tags

For the root level:
```html
<meta property="og:image" content="<generated-url>" />
<meta property="og:image:alt" content="Dipak Rathod - Cloud & DevOps Engineer" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<meta name="twitter:image" content="<generated-url>" />
<meta name="twitter:image:alt" content="Dipak Rathod - Cloud & DevOps Engineer" />
<meta name="twitter:image:type" content="image/png" />
<meta name="twitter:image:width" content="1200" />
<meta name="twitter:image:height" content="630" />
```

## Usage

### Adding OG Images to New Routes

1. Create an `opengraph-image.tsx` file in your route directory
2. Import the `OGImage` component
3. Export the required metadata and default function:

```tsx
import { ImageResponse } from "next/og";
import { OGImage } from "@/components/OGImage";

export const alt = "Your Alt Text";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <OGImage
      title="Your Title"
      description="Your description"
      category="Category"
    />,
    { ...size }
  );
}
```

### Customizing the OGImage Component

To modify the appearance:

1. Edit `src/components/OGImage.tsx`
2. Adjust styles using inline style objects
3. Note: Only a subset of CSS is supported by `ImageResponse`
   - Flexbox works
   - Grid layout works
   - Some advanced CSS features may not work

### Supported CSS Properties

The `ImageResponse` API (powered by Satori) supports:
- Flexbox layout
- Basic text styling (fontSize, fontWeight, color, etc.)
- Backgrounds (solid colors, gradients)
- Borders and border-radius
- Padding and margin
- Text transformations
- Basic filters

**Not supported:**
- CSS animations
- Complex selectors
- Pseudo-elements
- Some advanced transforms

## Best Practices

### Image Dimensions
- **OpenGraph:** 1200x630px (1.91:1 ratio) - recommended for Facebook
- **Twitter:** 1200x630px for summary_large_image card
- File size limits:
  - Twitter: Max 5MB
  - OpenGraph: Max 8MB

### Performance
- Images are generated at build time (static optimization)
- Cached and served from CDN
- No runtime overhead

### Dynamic Content
If you need to generate images with dynamic data:
1. Use the `params` prop in dynamic routes
2. Fetch data within the Image function
3. Configure caching behavior if needed

### Testing
To test your OG images:
1. Build the project: `npm run build`
2. Use tools like:
   - [OpenGraph.xyz](https://www.opengraph.xyz/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

## Troubleshooting

### Images Not Showing
1. Ensure the build completed successfully
2. Check that meta tags are present in the HTML
3. Clear social media platform caches
4. Verify image URLs are publicly accessible

### TypeScript Errors
The component may show TypeScript errors because:
- `next/og` types might not be fully recognized
- JSX in ImageResponse uses a special runtime
These are typically safe to ignore if the build succeeds.

### Styling Issues
If styles don't appear:
1. Use only supported CSS properties
2. Use inline styles (style prop)
3. Avoid className-based styling
4. Test with simple styles first

## File Size Optimization

To keep images under size limits:
1. Use solid colors instead of gradients when possible
2. Avoid complex images or patterns
3. Optimize any embedded images
4. Consider using SVG for logos

## Future Enhancements

Potential improvements:
- [ ] Add custom fonts (via font loading)
- [ ] Include author avatar
- [ ] Add visual patterns or backgrounds
- [ ] Support different layouts per category
- [ ] Add reading time indicator
- [ ] Include post publication date

## References

- [Next.js OpenGraph Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [ImageResponse API](https://nextjs.org/docs/app/api-reference/functions/image-response)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
