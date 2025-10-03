import { BlogHero, FeaturedBlogs } from "@/components/component-index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Dipak Rathod's tech blog - Your gateway to Cloud computing, DevOps best practices, and modern development patterns. Explore tutorials on AWS, Docker, Kubernetes, Python, JavaScript, and continuous learning in software engineering.",
  openGraph: {
    title: "Dipak Rathod - Cloud & DevOps Expert | Tech Blog",
    description:
      "Join Dipak Rathod's journey through Cloud computing, DevOps automation, and modern development. Discover practical insights on AWS, containerization, and software engineering best practices.",
    url: "https://blog.dipakrathod.me",
  },
  twitter: {
    title: "Dipak Rathod - Cloud & DevOps Expert | Tech Blog",
    description:
      "Join Dipak Rathod's journey through Cloud computing, DevOps automation, and modern development. Practical insights on AWS, Docker, Kubernetes & more.",
  },
};

export default function HomePage() {
  return (
    <>
      <BlogHero />
      <FeaturedBlogs />
    </>
  );
}
