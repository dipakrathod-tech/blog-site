import { getPageMap } from "nextra/page-map";
import ActiveMetadataClient from "./activeMetadata.client";

// Server component: fetch the page map and render the client component
export default async function ActiveMetadata() {
  const pageMap = await getPageMap("/posts");

  return <ActiveMetadataClient pageMap={pageMap} />;
}
