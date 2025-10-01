"use client";

import React from "react";
import { OrbitingCircles } from "./ui/orbiting-circles";
import { RainbowButton } from "./ui/rainbow-button";
import { AvatarCircles } from "./ui/avatar-circles";
import authorData from "@/data/author";
import { FaDocker, FaGitAlt, FaLinux, FaPython, FaJava } from "react-icons/fa";
import {
  SiKubernetes,
  SiTerraform,
  SiJenkins,
  SiAmazonaws,
  SiJavascript,
} from "react-icons/si";
import { BiCodeAlt } from "react-icons/bi";
import Link from "next/link";

export default function BlogHero() {
  const avatars = [
    {
      imageUrl: authorData.avatar ?? "/profile.jpg",
      profileUrl: authorData.profileUrl,
    },
  ];

  return (
    <section className="relative w-full min-h-[calc(100vh-72px)] flex items-center overflow-hidden py-8 md:py-12">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6 z-10">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  My Blog
                </span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                Exploring the world of Cloud, DevOps, and modern development
                patterns. Join me on this journey of continuous learning and
                innovation.
              </p>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-2">
              <Link href="/posts">
                <RainbowButton size="default" className="text-sm">
                  Explore Articles
                </RainbowButton>
              </Link>
              <Link
                href="https://dipakrathod.me"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline"
              >
                Learn more about me →
              </Link>
            </div>

            {/* Author Section */}
            <div className="flex items-center gap-3 pt-4 mt-2 border-t border-border">
              <AvatarCircles avatarUrls={avatars} className="scale-90" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Written by
                </p>
                <a
                  href={authorData.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {authorData.name}
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Orbiting Circles Animation */}
          <aside className="hidden lg:flex relative h-[450px] w-full items-center justify-center">
            <div className="relative flex h-full w-full max-w-[450px] items-center justify-center">
              {/* Center Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-background shadow-lg">
                <BiCodeAlt className="h-8 w-8 text-primary" />
              </div>

              {/* Inner Circle - Fast - Programming Languages */}
              <OrbitingCircles
                className="h-10 w-10 border-none bg-background shadow-md"
                radius={70}
                duration={15}
                iconSize={40}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                  <FaPython className="h-5 w-5 text-white" />
                </div>
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500">
                  <SiJavascript className="h-5 w-5 text-black" />
                </div>
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-orange-600">
                  <FaJava className="h-5 w-5 text-white" />
                </div>
              </OrbitingCircles>

              {/* Middle Circle - Medium - Cloud & DevOps */}
              <OrbitingCircles
                className="h-10 w-10 border-none bg-background shadow-md"
                radius={120}
                duration={20}
                reverse
                iconSize={40}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600">
                  <SiAmazonaws className="h-5 w-5 text-white" />
                </div>
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                  <FaDocker className="h-5 w-5 text-white" />
                </div>
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
                  <SiKubernetes className="h-5 w-5 text-white" />
                </div>
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-700">
                  <SiTerraform className="h-5 w-5 text-white" />
                </div>
              </OrbitingCircles>

              {/* Outer Circle - Slow - Tools & OS */}
              <OrbitingCircles
                className="h-10 w-10 border-none bg-background shadow-md"
                radius={170}
                duration={25}
                iconSize={40}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600">
                  <FaLinux className="h-5 w-5 text-white" />
                </div>
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-orange-600 to-red-600">
                  <FaGitAlt className="h-5 w-5 text-white" />
                </div>
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700">
                  <SiJenkins className="h-5 w-5 text-white" />
                </div>
              </OrbitingCircles>
            </div>
          </aside>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-400 opacity-20 blur-[100px]" />
      </div>
    </section>
  );
}
