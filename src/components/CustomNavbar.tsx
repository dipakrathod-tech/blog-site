"use client";

import { PageMapItem } from "nextra";
import { normalizePages } from "nextra/normalize-pages";
import { FC, ReactNode } from "react";
import { CustomNavbarLink } from "./CustomNavbarLink";

type CustomNavbarProps = {
  children?: ReactNode;
  pageMap: PageMapItem[];
};

/**
 * Custom Navbar component compatible with Nextra Blog theme
 * 
 * This component takes the same props as Nextra's Navbar:
 * - pageMap: Array of page items from Nextra
 * - children: Optional children (typically ThemeSwitch and Search components)
 * 
 * Usage:
 * ```tsx
 * <CustomNavbar pageMap={await getPageMap()}>
 *   <Search />
 *   <ThemeSwitch />
 * </CustomNavbar>
 * ```
 */
export const CustomNavbar: FC<CustomNavbarProps> = ({ children, pageMap }) => {
  // Normalize the pageMap to get top-level navigation items
  const { topLevelNavbarItems } = normalizePages({
    list: pageMap,
    route: "/",
  });

  return (
    <header
      className="x:flex x:items-center x:gap-3 x:justify-end"
      data-pagefind-ignore="all"
    >
      {/* Render navigation links */}
      {topLevelNavbarItems.map((nav) => (
        <CustomNavbarLink key={nav.route} href={nav.route}>
          {nav.title}
        </CustomNavbarLink>
      ))}
      
      {/* Render children (Search, ThemeSwitch, etc.) */}
      {children}
    </header>
  );
};
