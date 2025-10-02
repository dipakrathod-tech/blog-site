"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface Post {
  route: string;
  name: string;
  readTime: string;
  frontMatter?: {
    title?: string;
    description?: string;
    date?: string;
    tags?: string[];
  };
}

interface CategorySelectorProps {
  categorizedPosts: {
    all: Post[];
    aws: Post[];
    devops: Post[];
    development: Post[];
    challenge: Post[];
  };
  authorData: {
    name: string;
    avatar?: string;
    profileUrl: string;
  };
}

function formatDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function CategorySelector({
  categorizedPosts,
  authorData,
}: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All", count: categorizedPosts.all.length },
    { value: "aws", label: "AWS", count: categorizedPosts.aws.length },
    { value: "devops", label: "DevOps", count: categorizedPosts.devops.length },
    {
      value: "development",
      label: "Development",
      count: categorizedPosts.development.length,
    },
    {
      value: "challenge",
      label: "Challenge",
      count: categorizedPosts.challenge.length,
    },
  ];

  const renderPostCard = (post: Post, index: number) => {
    const title = post.frontMatter?.title || post.name;
    const description = post.frontMatter?.description || "";
    const date = post.frontMatter?.date
      ? formatDate(post.frontMatter.date)
      : "";
    const tags = post.frontMatter?.tags || [];
    const readTime = post.readTime;

    return (
      <Card
        key={index}
        className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, tagIndex) => (
              <Badge key={tagIndex} variant="secondary" className="text-xs">
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
              <p className="text-sm font-medium truncate">{authorData.name}</p>
              <p className="text-xs text-muted-foreground">Author</p>
            </div>
          </div>

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

        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    );
  };

  return (
    <>
      {/* Mobile Select Dropdown */}
      <div className="md:hidden mb-8">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label} ({category.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mobile Content */}
      <div className="md:hidden mt-6">
        {categorizedPosts[selectedCategory as keyof typeof categorizedPosts]
          .length > 0 ? (
          <div className="grid gap-6">
            {categorizedPosts[
              selectedCategory as keyof typeof categorizedPosts
            ].map((post, index) => renderPostCard(post, index))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No posts found in this category yet.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
