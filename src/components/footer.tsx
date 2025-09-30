"use client";

import React from "react";
import { Footer } from "nextra-theme-blog";
import Newsletter from "@/components/ui/Newsletter";
import { FaTwitter, FaGithub, FaLinkedin, FaRss } from "react-icons/fa";
import { cn } from "@/lib/utils";

export default function CustomFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn("border-t border-muted/40 bg-background/50 mt-12", className)}
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="md:flex md:items-start md:justify-between gap-8">
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Dipak Rathod</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Software engineering notes, tutorials, and occasional thoughts
              about cloud, DevOps & Software development.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://github.com/dipakrathod-tech"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-sky-500 transition-colors"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-blue-600 transition-colors"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="/rss.xml"
                aria-label="RSS"
                className="ml-3 text-muted-foreground hover:text-amber-600"
              >
                <FaRss className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 md:mt-0">
            <Newsletter />
          </div>
        </div>

        <div className="mt-8 border-t border-muted/40 pt-6 flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} © Dipak Rathod. All rights reserved.
          </p>
          <nav className="flex items-center gap-4">
            <a
              href="/about"
              className="text-sm text-muted-foreground hover:underline"
            >
              About
            </a>
            <a
              href="/uses"
              className="text-sm text-muted-foreground hover:underline"
            >
              Uses
            </a>
            <a
              href="/privacy"
              className="text-sm text-muted-foreground hover:underline"
            >
              Privacy
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
