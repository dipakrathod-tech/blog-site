import Link from "next/link";
import { getPosts, getTags } from "../../../lib/get-posts";
import { getPostReadTime } from "../../../lib/read-time";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export const metadata = {
  title: "Posts",
};

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Define category mappings based on tags
const categoryMapping = {
  aws: ["aws", "lambda", "s3", "ec2", "cloudformation", "cloud"],
  devops: ["devops", "docker", "kubernetes", "ci/cd", "jenkins", "terraform"],
  development: [
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "node",
    "python",
    "web",
  ],
  challenge: ["challenge", "tutorial", "learning", "guide"],
};

function categorizePost(post) {
  const tags = post.frontMatter?.tags || [];
  const categories = [];

  for (const [category, keywords] of Object.entries(categoryMapping)) {
    const hasMatch = tags.some((tag) =>
      keywords.some((keyword) =>
        tag.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    if (hasMatch) {
      categories.push(category);
    }
  }

  return categories.length > 0 ? categories : ["development"];
}

export default async function PostsPage() {
  const tags = await getTags();
  const posts = await getPosts();
  const allTags = Object.create(null);

  for (const tag of tags) {
    allTags[tag] ??= 0;
    allTags[tag] += 1;
  }

  // Categorize all posts
  const categorizedPosts = {
    all: posts,
    aws: [],
    devops: [],
    development: [],
    challenge: [],
  };

  posts.forEach((post) => {
    const categories = categorizePost(post);
    categories.forEach((category) => {
      if (categorizedPosts[category]) {
        categorizedPosts[category].push(post);
      }
    });
  });

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
    <div data-pagefind-ignore="all" className="prose-wide">
      <section className="w-full py-8 md:py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-full mx-auto">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-8 space-y-4">
            <Badge variant="outline" className="px-4 py-1.5">
              All Posts
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Explore{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                All Posts
              </span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
              Browse through our collection of posts on cloud computing, DevOps,
              development, and technical challenges
            </p>
          </div>

          {/* Tags Overview */}
          <div className="mb-8 p-4 rounded-lg border bg-card">
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(allTags).map(([tag, count]) => (
                <Link key={tag} href={`/tags/${tag}`}>
                  <Badge
                    variant="outline"
                    className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    {tag} ({count})
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          {/* Categorized Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="all" className="text-sm md:text-base">
                All ({categorizedPosts.all.length})
              </TabsTrigger>
              <TabsTrigger value="aws" className="text-sm md:text-base">
                AWS ({categorizedPosts.aws.length})
              </TabsTrigger>
              <TabsTrigger value="devops" className="text-sm md:text-base">
                DevOps ({categorizedPosts.devops.length})
              </TabsTrigger>
              <TabsTrigger value="development" className="text-sm md:text-base">
                Development ({categorizedPosts.development.length})
              </TabsTrigger>
              <TabsTrigger value="challenge" className="text-sm md:text-base">
                Challenge ({categorizedPosts.challenge.length})
              </TabsTrigger>
            </TabsList>

            {Object.entries(categorizedPosts).map(
              ([category, categoryPosts]) => (
                <TabsContent key={category} value={category} className="mt-6">
                  {categoryPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {categoryPosts.map((post, index) =>
                        renderPostCard(post, index)
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground text-lg">
                        No posts found in this category yet.
                      </p>
                    </div>
                  )}
                </TabsContent>
              )
            )}
          </Tabs>
        </div>
      </section>
    </div>
  );
}
