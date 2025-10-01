"use client";

import { Link } from "next-view-transitions";
import { useFSRoute } from "nextra/hooks";
import { ComponentProps, FC } from "react";

/**
 * Custom NavbarLink component compatible with Nextra's implementation
 *
 * This component automatically highlights the active route and uses
 * Next.js view transitions for smooth navigation.
 */
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
