import { Layout } from "nextra-theme-blog";
import "nextra-theme-blog/style.css";
import "./../globals.css";
import Giscus from "@/components/ui/Giscus";

export const metadata = {
  title: "Blog Example",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      {/* <ActiveMetadata />  */}
      {children}
      <Giscus />
    </Layout>
  );
}
