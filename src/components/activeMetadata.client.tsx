"use client";

import React from "react";
import { useActiveMetadata } from "../hooks/useActiveMetadata";
import type { PageMapItem } from "nextra";

export default function ActiveMetadataClient({
  pageMap,
}: {
  pageMap: PageMapItem[];
}) {
  const data = useActiveMetadata({ pageMap });

  return (
    <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
