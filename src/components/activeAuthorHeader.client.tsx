"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AuthorHeader from "@/components/ui/AuthorHeader";

export default function ActiveAuthorHeader() {
  const pathname = usePathname();

  // Only show on blog post pages
  if (!pathname?.includes("/posts/")) {
    return null;
  }

  return (
      <AuthorHeader />
  );
}
