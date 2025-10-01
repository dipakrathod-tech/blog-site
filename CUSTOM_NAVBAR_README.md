# Custom Navbar for Nextra Blog Theme

A fully compatible custom navbar implementation that accepts the same props as Nextra Blog's navbar component, with support for ThemeSwitch and Search components.

## 📋 Overview

This custom navbar implementation provides:

- ✅ **Full Nextra compatibility** - Takes the same props as `nextra-theme-blog`'s Navbar
- ✅ **Automatic navigation generation** - Builds nav links from pageMap
- ✅ **Active route highlighting** - Shows current page
- ✅ **View transitions** - Smooth page transitions
- ✅ **Component support** - Works with Search and ThemeSwitch
- ✅ **Fully customizable** - Easy to style and extend

## 📁 Files Structure

```
src/components/
├── CustomNavbar.tsx          # Main navbar component
├── CustomNavbarLink.tsx      # Individual nav link component
├── navbar.tsx                # Wrapper that uses CustomNavbar
└── CustomNavbar.examples.tsx # Usage examples
```

## 🔧 Implementation Details

### CustomNavbar Component

The main component that renders the navigation header:

```tsx
type CustomNavbarProps = {
  children?: ReactNode;
  pageMap: PageMapItem[];
};
```

**Key Features:**

- Uses `normalizePages` from Nextra to process pageMap
- Renders top-level navigation items
- Supports children (Search, ThemeSwitch, etc.)
- Maintains Nextra's styling conventions

### CustomNavbarLink Component

Renders individual navigation links with active state:

```tsx
type CustomNavbarLinkProps = ComponentProps<typeof Link>;
```

**Key Features:**

- Uses `next-view-transitions` for smooth transitions
- Automatically detects active route with `useFSRoute()`
- Applies `aria-current` for accessibility
- Matches Nextra's styling

## 📦 Dependencies

Required packages (already included in Nextra):

- `nextra` - For pageMap and hooks
- `next-view-transitions` - For smooth page transitions (newly added)
- `react` - React library

## 🚀 Usage

### Basic Usage (Same as Nextra)

```tsx
import { ThemeSwitch } from "nextra-theme-blog";
import { Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { CustomNavbar } from "./CustomNavbar";

export default async function Navbar() {
  return (
    <CustomNavbar pageMap={await getPageMap()}>
      <Search />
      <ThemeSwitch />
    </CustomNavbar>
  );
}
```

### With Custom Wrapper

```tsx
export default async function Navbar() {
  return (
    <nav className="w-11/12 md:w-4/5 mx-auto pt-4">
      <CustomNavbar pageMap={await getPageMap()}>
        <Search />
        <ThemeSwitch />
      </CustomNavbar>
    </nav>
  );
}
```

### Only ThemeSwitch

```tsx
export default async function Navbar() {
  return (
    <CustomNavbar pageMap={await getPageMap()}>
      <ThemeSwitch />
    </CustomNavbar>
  );
}
```

### Only Search

```tsx
export default async function Navbar() {
  return (
    <CustomNavbar pageMap={await getPageMap()}>
      <Search />
    </CustomNavbar>
  );
}
```

### Navigation Links Only

```tsx
export default async function Navbar() {
  return <CustomNavbar pageMap={await getPageMap()} />;
}
```

### With Custom Components

```tsx
export default async function Navbar() {
  return (
    <CustomNavbar pageMap={await getPageMap()}>
      <Search />
      <MyCustomButton />
      <ThemeSwitch />
    </CustomNavbar>
  );
}
```

## 🎨 Styling

The component uses Nextra's CSS classes (prefixed with `x:`):

```tsx
// Header container
className = "x:mb-8 x:flex x:items-center x:gap-3 x:justify-end";

// Active link styling
className = "x:aria-[current]:no-underline x:aria-[current]:opacity-60";
```

### Custom Styling

You can wrap the navbar in your own styled container:

```tsx
<div className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
  <nav className="container mx-auto px-4">
    <CustomNavbar pageMap={await getPageMap()}>
      <Search />
      <ThemeSwitch />
    </CustomNavbar>
  </nav>
</div>
```

## 🔍 How It Works

1. **PageMap Processing**: The `pageMap` prop is processed by Nextra's `normalizePages()` function
2. **Navigation Items**: Top-level navbar items are extracted
3. **Link Rendering**: Each item is rendered as a `CustomNavbarLink`
4. **Active State**: The current route is detected using `useFSRoute()` hook
5. **Children Rendering**: Any children (Search, ThemeSwitch) are rendered after the links

## 🆚 Comparison with Nextra's Navbar

| Feature             | Nextra Navbar | Custom Navbar |
| ------------------- | ------------- | ------------- |
| Props API           | ✅ Same       | ✅ Same       |
| PageMap Support     | ✅ Yes        | ✅ Yes        |
| Children Support    | ✅ Yes        | ✅ Yes        |
| Active Highlighting | ✅ Yes        | ✅ Yes        |
| View Transitions    | ✅ Yes        | ✅ Yes        |
| Custom Styling      | ⚠️ Limited    | ✅ Easy       |
| TypeScript          | ✅ Yes        | ✅ Yes        |

## 🛠️ Customization Examples

### Change Layout Direction

```tsx
<header className="x:mb-8 x:flex x:items-center x:gap-3 x:justify-start">
  {/* Left-aligned navigation */}
</header>
```

### Add Divider Between Links

```tsx
{
  topLevelNavbarItems.map((nav, index) => (
    <Fragment key={nav.route}>
      <CustomNavbarLink href={nav.route}>{nav.title}</CustomNavbarLink>
      {index < topLevelNavbarItems.length - 1 && (
        <span className="text-gray-400">|</span>
      )}
    </Fragment>
  ));
}
```

### Custom Link Styling

Modify `CustomNavbarLink.tsx`:

```tsx
<Link
  className="hover:text-blue-500 transition-colors aria-[current]:font-bold"
  aria-current={isActive || undefined}
  {...props}
/>
```

## 📚 API Reference

### CustomNavbar Props

| Prop       | Type            | Required | Description                                      |
| ---------- | --------------- | -------- | ------------------------------------------------ |
| `pageMap`  | `PageMapItem[]` | Yes      | Navigation structure from Nextra                 |
| `children` | `ReactNode`     | No       | Components to render (Search, ThemeSwitch, etc.) |

### CustomNavbarLink Props

Extends all props from `next-view-transitions`'s `Link` component:

| Prop           | Type        | Required | Description                 |
| -------------- | ----------- | -------- | --------------------------- |
| `href`         | `string`    | Yes      | Link destination            |
| `children`     | `ReactNode` | Yes      | Link content                |
| All Link props | Various     | No       | Standard Next.js Link props |

## 🐛 Troubleshooting

### TypeScript Errors

If you see module not found errors, ensure all packages are installed:

```bash
pnpm install
```

### Styling Issues

Make sure you've imported Nextra's styles in your layout:

```tsx
import "nextra-theme-blog/style.css";
```

### Active Link Not Highlighting

Verify that your route structure matches your pageMap. The `useFSRoute()` hook should automatically detect the current route.

## 📖 Additional Resources

- [Nextra Documentation](https://nextra.site/)
- [Nextra Blog Theme](https://nextra.site/docs/blog-theme)
- [Next.js View Transitions](https://www.npmjs.com/package/next-view-transitions)

## 📝 License

This implementation follows the same license as your project.
