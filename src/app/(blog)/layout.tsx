import { Layout, Navbar } from "nextra-theme-blog";
import "nextra-theme-blog/style.css";
import "./../globals.css";
import ActiveMetadata from "@/components/activeMetadata";

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
    </Layout>
  );
}
