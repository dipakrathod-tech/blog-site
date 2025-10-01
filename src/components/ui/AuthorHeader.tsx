"use client";

import React from "react";
import { AvatarCircles } from "./avatar-circles";
import { Twitter, Github, Linkedin } from "lucide-react";
import authorData from "@/data/author";

interface SocialLink {
  href: string;
  label: string;
}

interface AuthorHeaderProps {
  className?: string;
  date?: Date | string;
}

export default function AuthorHeader({ className, date }: AuthorHeaderProps) {
  const avatars = [
    {
      imageUrl: authorData.avatar ?? "/file.svg",
      profileUrl: authorData.profileUrl,
    },
  ];

  const socials: SocialLink[] = [
    { href: authorData.socials.twitter, label: "Twitter" },
    { href: authorData.socials.github, label: "GitHub" },
    { href: authorData.socials.linkedin, label: "LinkedIn" },
  ];

  // Format the date
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <section
      className={"flex items-center justify-between " + (className ?? "")}
    >
      <div className="flex items-center gap-4">
        <AvatarCircles avatarUrls={avatars} />
        <div>
          <div className="text-sm font-semibold">{authorData.name}</div>
          <div className="text-xs text-muted-foreground">
            {formattedDate && (
              <>
                <time dateTime={new Date(date!).toISOString()}>
                  {formattedDate}
                </time>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {socials.map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="text-foreground hover:text-primary"
          >
            {s.label === "Twitter" && <Twitter size={18} />}
            {s.label === "GitHub" && <Github size={18} />}
            {s.label === "LinkedIn" && <Linkedin size={18} />}
          </a>
        ))}
      </div>
    </section>
  );
}
