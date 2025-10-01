"use client";

import { useRouter, usePathname } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default function GoBack() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Only show on nested pages (more than 1 segment)
  const isNestedPage = segments.length > 1;

  if (!isNestedPage) {
    return null;
  }

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors print:hidden underline"
      aria-label="Go back"
    >
      <IoArrowBack size={16} />
      Back
    </button>
  );
}
