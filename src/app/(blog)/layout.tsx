import { Layout } from "nextra-theme-blog";
import "nextra-theme-blog/style.css";
import "./../globals.css";
import Giscus from "@/components/ui/Giscus";

export const metadata = {
  title: "Blog | Dipak Rathod",
  description:
    "Dipak Rathod's technical blog featuring articles on Cloud computing, DevOps automation, AWS services, containerization with Docker, Kubernetes orchestration, and modern software development practices.",
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
