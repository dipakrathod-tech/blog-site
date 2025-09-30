import { usePathname } from "next/navigation";
import type { PageMapItem } from "nextra";
import { normalizePages } from "nextra/normalize-pages";

export function useActiveMetadata({ pageMap }: { pageMap: PageMapItem[] }) {
  const pathname = usePathname();

  const { activeMetadata } = normalizePages({
    list: pageMap,
    route: pathname,
  });

  return activeMetadata || null;
}
