import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "nextra-theme-blog/style.css";
import "./globals.css";
import { CustomNavbar, CustomFooter } from "../components/component-index";
import ThemeProvider from "../components/ui/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dipak Rathod - Blog",
    template: "%s | Dipak Rathod",
  },
  description:
    "Dipak Rathod's tech blog exploring Cloud computing, DevOps practices, and modern development patterns. Discover insights on AWS, Docker, Kubernetes, Python, JavaScript, and continuous learning in software engineering.",
  keywords: [
    "Dipak Rathod",
    "Cloud computing",
    "DevOps",
    "AWS",
    "Docker",
    "Kubernetes",
    "Python",
    "JavaScript",
    "Java",
    "Terraform",
    "Jenkins",
    "Linux",
    "Git",
    "software engineering",
    "tech blog",
    "programming tutorials",
    "cloud architecture",
    "modern development",
  ],
  authors: [{ name: "Dipak Rathod", url: "https://dipakrathod.me" }],
  creator: "Dipak Rathod",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dipakrathod.me",
    title: "Dipak Rathod - Cloud & DevOps Tech Blog",
    description:
      "Dipak Rathod's tech blog exploring Cloud computing, DevOps practices, and modern development patterns. Insights on AWS, Docker, Kubernetes, and software engineering.",
    siteName: "Dipak Rathod Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dipak Rathod - Cloud & DevOps Tech Blog",
    description:
      "Exploring Cloud computing, DevOps practices, and modern development patterns. Insights on AWS, Docker, Kubernetes by Dipak Rathod.",
    creator: "@dipakrathod-tech",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <CustomNavbar />
          {children}
          <CustomFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
