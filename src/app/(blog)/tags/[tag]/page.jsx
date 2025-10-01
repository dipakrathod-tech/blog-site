import Link from "next/link";
import { getPosts, getTags } from "../../../../lib/get-posts";
import { getPostReadTime } from "../../../../lib/read-time";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ArrowRight, Tag } from "lucide-react";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import authorData from "@/data/author";

export async function generateMetadata(props) {
  const params = await props.params;
  return {
    title: `Posts Tagged with “${decodeURIComponent(params.tag)}”`,
  };
}

export async function generateStaticParams() {
  const allTags = await getTags();
  return [...new Set(allTags)].map((tag) => ({ tag }));
}

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function TagPage(props) {
  const params = await props.params;
  const { title } = await generateMetadata({ params });
  const posts = await getPosts();
  const tagName = decodeURIComponent(params.tag);

  const filteredPosts = posts.filter((post) =>
    post.frontMatter.tags.includes(tagName)
  );

  const renderPostCard = (post, index) => {
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
            {tags.map((tag, tagIndex) => (
              <Badge
                key={tagIndex}
                variant={tag === tagName ? "default" : "secondary"}
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
    <div className="prose-wide">
      <section className="w-full py-8 md:py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-full mx-auto">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-8 space-y-4">
            <Badge variant="outline" className="px-4 py-1.5 gap-1.5">
              <Tag className="h-3 w-3" />
              {tagName}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Posts Tagged with{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                "{tagName}"
              </span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
              Found {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "post" : "posts"} with this tag
            </p>
          </div>

          {/* Back to All Posts */}
          <div className="mb-8">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to All Posts
            </Link>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPosts.map((post, index) => renderPostCard(post, index))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No posts found with this tag.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
