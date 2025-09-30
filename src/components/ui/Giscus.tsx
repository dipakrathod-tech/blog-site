"use client";

import React from "react";
import { usePathname } from "next/navigation";
import GiscusLib from "@giscus/react";
import giscusConfig from "@/data/giscus";
import { useTheme } from "nextra-theme-blog";

export default function Giscus() {
const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  // Nextra blog posts are typically under /posts/. Adjust this check if needed.
  if (!pathname?.includes("/posts/")) {
    return null;
    }
    
      const giscusTheme =
        resolvedTheme === "dark" ? "transparent_dark" : "light";

    return (
    <div className="mt-8">
      <GiscusLib
        id={giscusConfig.id}
        repo={giscusConfig.repo}
        repoId={giscusConfig.repoId}
        category={giscusConfig.category}
        categoryId={giscusConfig.categoryId}
        mapping={giscusConfig.mapping}
        term={giscusConfig.term}
        reactionsEnabled={giscusConfig.reactionsEnabled}
        emitMetadata={giscusConfig.emitMetadata}
        inputPosition={giscusConfig.inputPosition}
        theme={giscusTheme}
        lang={giscusConfig.lang}
        loading={giscusConfig.loading}
      />
    </div>
  );
}
