/**
 * Side-by-Side Comparison: Nextra Navbar vs Custom Navbar
 *
 * This file shows how the custom implementation matches Nextra's behavior
 */

// ============================================
// NEXTRA'S ORIGINAL IMPLEMENTATION (from node_modules)
// ============================================

/* 
// File: node_modules/nextra-theme-blog/dist/components/navbar.js

import { normalizePages } from "nextra/normalize-pages";
import { NavbarLink } from "./navbar-link";

const Navbar = ({ children, pageMap }) => {
  const { topLevelNavbarItems } = normalizePages({
    list: pageMap,
    route: "/"
  });
  
  return (
    <header 
      className="x:mb-8 x:flex x:items-center x:gap-3 x:justify-end" 
      data-pagefind-ignore="all"
    >
      {topLevelNavbarItems.map((nav) => (
        <NavbarLink key={nav.route} href={nav.route}>
          {nav.title}
        </NavbarLink>
      ))}
      {children}
    </header>
  );
};
*/

// ============================================
// CUSTOM IMPLEMENTATION (src/components/CustomNavbar.tsx)
// ============================================

/*
"use client";

import { PageMapItem } from "nextra";
import { normalizePages } from "nextra/normalize-pages";
import { FC, ReactNode } from "react";
import { CustomNavbarLink } from "./CustomNavbarLink";

type CustomNavbarProps = {
  children?: ReactNode;
  pageMap: PageMapItem[];
};

export const CustomNavbar: FC<CustomNavbarProps> = ({ children, pageMap }) => {
  const { topLevelNavbarItems } = normalizePages({
    list: pageMap,
    route: "/",
  });

  return (
    <header
      className="x:mb-8 x:flex x:items-center x:gap-3 x:justify-end"
      data-pagefind-ignore="all"
    >
      {topLevelNavbarItems.map((nav) => (
        <CustomNavbarLink key={nav.route} href={nav.route}>
          {nav.title}
        </CustomNavbarLink>
      ))}
      {children}
    </header>
  );
};
*/

// ============================================
// NEXTRA'S NAVBAR LINK (from node_modules)
// ============================================

/*
// File: node_modules/nextra-theme-blog/dist/components/navbar-link.js

"use client";
import { Link } from "next-view-transitions";
import { useFSRoute } from "nextra/hooks";

const NavbarLink = (props) => {
  const pathname = useFSRoute();
  const isActive = props.href === pathname || undefined;
  
  return (
    <Link 
      className="x:aria-[current]:no-underline x:aria-[current]:opacity-60" 
      aria-current={isActive}
      {...props} 
    />
  );
};
*/

// ============================================
// CUSTOM NAVBAR LINK (src/components/CustomNavbarLink.tsx)
// ============================================

/*
"use client";

import { Link } from "next-view-transitions";
import { useFSRoute } from "nextra/hooks";
import { ComponentProps, FC } from "react";

export const CustomNavbarLink: FC<ComponentProps<typeof Link>> = (props) => {
  const pathname = useFSRoute();
  const isActive = props.href === pathname;

  return (
    <Link
      className="x:aria-[current]:no-underline x:aria-[current]:opacity-60"
      aria-current={isActive || undefined}
      {...props}
    />
  );
};
*/

// ============================================
// COMPARISON SUMMARY
// ============================================

/**
 * WHAT'S IDENTICAL:
 * ✅ Props API (pageMap, children)
 * ✅ HTML structure
 * ✅ CSS classes
 * ✅ Active link detection logic
 * ✅ View transitions support
 * ✅ Accessibility attributes
 * ✅ Behavior and functionality
 *
 * WHAT'S DIFFERENT:
 * ✨ TypeScript types are explicit (CustomNavbar)
 * ✨ Code is in your source (not node_modules)
 * ✨ Can be modified without forking
 * ✨ Better IDE support
 * ✨ Easier to debug
 *
 * COMPATIBILITY:
 * 🎯 100% drop-in replacement
 * 🎯 Works with all Nextra components
 * 🎯 Same styling system
 * 🎯 Same props and behavior
 */

// ============================================
// USAGE COMPARISON
// ============================================

// Using Nextra's Navbar:
/*
import { Navbar, ThemeSwitch } from "nextra-theme-blog";
import { Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";

export default async function NavbarComponent() {
  return (
    <Navbar pageMap={await getPageMap()}>
      <Search />
      <ThemeSwitch />
    </Navbar>
  );
}
*/

// Using Custom Navbar:
/*
import { ThemeSwitch } from "nextra-theme-blog";
import { Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { CustomNavbar } from "./CustomNavbar";

export default async function NavbarComponent() {
  return (
    <CustomNavbar pageMap={await getPageMap()}>
      <Search />
      <ThemeSwitch />
    </CustomNavbar>
  );
}
*/

// ============================================
// PROPS INTERFACE COMPARISON
// ============================================

/**
 * Nextra's Navbar Props (inferred from .d.mts):
 *
 * type NavbarProps = {
 *   children?: ReactNode;
 *   pageMap: PageMapItem[];
 * }
 *
 * Custom Navbar Props:
 *
 * type CustomNavbarProps = {
 *   children?: ReactNode;
 *   pageMap: PageMapItem[];
 * }
 *
 * Result: IDENTICAL ✅
 */

// ============================================
// RENDERING OUTPUT COMPARISON
// ============================================

/**
 * Both implementations render the exact same HTML:
 *
 * <header
 *   class="x:mb-8 x:flex x:items-center x:gap-3 x:justify-end"
 *   data-pagefind-ignore="all"
 * >
 *   <a href="/posts" class="x:aria-[current]:no-underline x:aria-[current]:opacity-60">
 *     Posts
 *   </a>
 *   <a href="/about" class="x:aria-[current]:no-underline x:aria-[current]:opacity-60">
 *     About
 *   </a>
 *   <!-- Search component -->
 *   <!-- ThemeSwitch component -->
 * </header>
 */

// ============================================
// WHY THIS MATTERS
// ============================================

/**
 * BENEFITS OF CUSTOM IMPLEMENTATION:
 *
 * 1. **Transparency**
 *    - You can see exactly what the code does
 *    - No "black box" from node_modules
 *
 * 2. **Customization**
 *    - Modify without package ejection
 *    - Add features specific to your needs
 *    - Change styling easily
 *
 * 3. **Learning**
 *    - Understand how Nextra works internally
 *    - Learn React patterns
 *    - Build similar components
 *
 * 4. **Maintenance**
 *    - Not dependent on theme updates
 *    - Control your own destiny
 *    - Can fix bugs immediately
 *
 * 5. **Integration**
 *    - Add analytics tracking
 *    - Integrate with your state management
 *    - Add custom event handlers
 *
 * TRADE-OFFS:
 *
 * - More code to maintain
 * - Won't get automatic updates from Nextra
 * - Need to update manually if Nextra changes API
 */

// ============================================
// MIGRATION PATH
// ============================================

/**
 * If Nextra changes their Navbar API, you can:
 *
 * 1. Check their source code
 * 2. Update your CustomNavbar to match
 * 3. Keep your customizations intact
 * 4. Or revert to using Nextra's version
 *
 * The beauty is: YOU HAVE THE CHOICE! 🎉
 */

export {};
