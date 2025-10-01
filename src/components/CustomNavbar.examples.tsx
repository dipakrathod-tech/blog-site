/**
 * Custom Navbar Usage Examples
 *
 * This file demonstrates various ways to use the custom navbar component
 * that's compatible with Nextra Blog theme.
 */

import { ThemeSwitch } from "nextra-theme-blog";
import { Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { CustomNavbar } from "./CustomNavbar";

// ============================================
// Example 1: Basic Usage (Same as Nextra)
// ============================================
export async function BasicNavbar() {
  return (
    <CustomNavbar pageMap={await getPageMap()}>
      <Search />
      <ThemeSwitch />
    </CustomNavbar>
  );
}

// ============================================
// Example 2: With Custom Wrapper/Styling
// ============================================
export async function StyledNavbar() {
  return (
    <nav className="w-11/12 md:w-4/5 mx-auto pt-4">
      <CustomNavbar pageMap={await getPageMap()}>
        <Search />
        <ThemeSwitch />
      </CustomNavbar>
    </nav>
  );
}

// ============================================
// Example 3: Only ThemeSwitch (No Search)
// ============================================
export async function NavbarWithThemeOnly() {
  return (
    <CustomNavbar pageMap={await getPageMap()}>
      <ThemeSwitch />
    </CustomNavbar>
  );
}

// ============================================
// Example 4: Only Search (No ThemeSwitch)
// ============================================
export async function NavbarWithSearchOnly() {
  return (
    <CustomNavbar pageMap={await getPageMap()}>
      <Search />
    </CustomNavbar>
  );
}

// ============================================
// Example 5: No Children (Navigation Links Only)
// ============================================
export async function NavbarLinksOnly() {
  return <CustomNavbar pageMap={await getPageMap()} />;
}

// ============================================
// Example 6: With Custom Additional Components
// ============================================
export async function NavbarWithCustomComponents() {
  return (
    <CustomNavbar pageMap={await getPageMap()}>
      <Search />
      {/* You can add any custom component here */}
      <button className="x:p-2">Custom Button</button>
      <ThemeSwitch />
    </CustomNavbar>
  );
}

// ============================================
// Example 7: Fully Custom Styled Version
// ============================================
export async function FullyCustomNavbar() {
  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <nav className="container mx-auto px-4">
        <CustomNavbar pageMap={await getPageMap()}>
          <div className="flex items-center gap-4">
            <Search />
            <ThemeSwitch />
          </div>
        </CustomNavbar>
      </nav>
    </div>
  );
}

/**
 * Props Documentation:
 *
 * CustomNavbar accepts the same props as Nextra's Navbar:
 *
 * @param pageMap - Array of PageMapItem from Nextra
 *   - Obtained via `getPageMap()` from "nextra/page-map"
 *   - Contains all page metadata and navigation structure
 *
 * @param children - Optional ReactNode
 *   - Typically contains <Search /> and <ThemeSwitch />
 *   - Can include any custom components
 *   - Components are rendered after navigation links
 *
 * Features:
 * - ✅ Automatically generates navigation links from pageMap
 * - ✅ Active route highlighting
 * - ✅ View transitions support
 * - ✅ Responsive design
 * - ✅ Fully compatible with Nextra Blog theme
 * - ✅ Customizable styling via className
 * - ✅ Supports all Nextra components (Search, ThemeSwitch)
 */
