import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import authorData from "@/data/author";
import { getPosts } from "@/lib/get-posts";
import { getPostReadTime } from "@/lib/read-time";

function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function FeaturedBlogs() {
  // Get latest 6 posts
  const allPosts = await getPosts();
  const latestPosts = allPosts.slice(0, 6);
  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-[95%] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 space-y-4">
          <Badge variant="outline" className="px-4 py-1.5">
            Latest Posts
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Latest{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Posts
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
            Explore our latest posts on cloud computing, DevOps practices, and
            modern development workflows
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {latestPosts.map((post, index) => {
            const title = post.frontMatter?.title || post.name;
            const description = post.frontMatter?.description || "";
            const date = post.frontMatter?.date
              ? formatDate(post.frontMatter.date)
              : "";
            const tags = post.frontMatter?.tags || [];
            const readTime = getPostReadTime(post.route);

            return (
              <Card
                key={index}
                className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <CardHeader className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag: string, tagIndex: number) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-xl md:text-2xl line-clamp-2 group-hover:text-primary transition-colors">
                    {title}
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base line-clamp-3">
                    {description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Author Section */}
                  <div className="flex items-center gap-3 pb-3 border-b border-border">
                    <AvatarCircles
                      avatarUrls={[
                        {
                          imageUrl: authorData.avatar ?? "/profile.jpg",
                          profileUrl: authorData.profileUrl,
                        },
                      ]}
                      className="scale-90"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {authorData.name}
                      </p>
                      <p className="text-xs text-muted-foreground">Author</p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4" />
                      <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span>{readTime}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Link
                    href={post.route}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all duration-300"
                  >
                    Read Post
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardFooter>

                {/* Hover Effect Gradient */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-base font-medium px-6 py-3 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300"
          >
            View All Posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
