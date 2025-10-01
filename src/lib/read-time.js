import fs from "fs";
import path from "path";

/**
 * Calculate reading time for a blog post
 * @param {string} content - The text content to analyze
 * @param {number} wordsPerMinute - Average reading speed (default: 200)
 * @returns {string} - Formatted read time (e.g., "5 min read")
 */
export function calculateReadTime(content, wordsPerMinute = 200) {
  if (!content) return "1 min read";

  // Remove frontmatter
  let text = content.replace(/^---[\s\S]*?---\n*/m, "");

  // Remove import/export statements
  text = text.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, "");
  text = text.replace(/^export\s+.*?;?\s*$/gm, "");

  // Remove code blocks (but count them as readable content - about 50% weight)
  let codeWordCount = 0;
  text = text.replace(/```[\s\S]*?```/g, (match) => {
    // Extract text from code block and count words
    const codeContent = match.replace(/```\w*\n?/g, "");
    const codeWords = codeContent
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
    codeWordCount += Math.ceil(codeWords * 0.5); // Code counts as 50% since people skim
    return " "; // Replace with space to maintain sentence structure
  });

  // Remove inline code but keep the text inside
  text = text.replace(/`([^`]+)`/g, "$1");

  // Remove HTML/JSX tags
  text = text.replace(/<[^>]+>/g, " ");

  // Convert markdown links to text only
  text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");

  // Remove images
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, "");

  // Remove headers # but keep text
  text = text.replace(/^#{1,6}\s+/gm, "");

  // Remove bold/italic markers but keep text
  text = text.replace(/(\*\*|__)(.*?)\1/g, "$2");
  text = text.replace(/(\*|_)(.*?)\1/g, "$2");

  // Remove list markers
  text = text.replace(/^\s*[-*+]\s+/gm, "");
  text = text.replace(/^\s*\d+\.\s+/gm, "");

  // Remove blockquote markers
  text = text.replace(/^>\s+/gm, "");

  // Remove horizontal rules
  text = text.replace(/^[-*_]{3,}\s*$/gm, "");

  // Clean up extra whitespace
  text = text.replace(/\s+/g, " ").trim();

  // Count words in regular text
  const textWords = text.split(/\s+/).filter((word) => {
    // Filter out empty strings and very short strings that might be artifacts
    return word.length > 0 && word.match(/[a-zA-Z0-9]/);
  }).length;

  // Total word count (text + code)
  const totalWords = textWords + codeWordCount;

  // Calculate reading time (minimum 1 minute)
  const minutes = Math.max(1, Math.ceil(totalWords / wordsPerMinute));

  return minutes === 1 ? "1 min read" : `${minutes} min read`;
}

/**
 * Get read time for a post by reading its MDX file
 * @param {string} postRoute - The route of the post (e.g., "/posts/aws-lambda-best-practices")
 * @returns {string} - Formatted read time
 */
export function getPostReadTime(postRoute) {
  try {
    // Convert route to file path
    // Example: "/posts/aws-lambda-best-practices" -> "src/app/(blog)/posts/aws-lambda-best-practices/page.mdx"
    const postPath = postRoute.replace("/posts/", "");
    const filePath = path.join(
      process.cwd(),
      "src",
      "app",
      "(blog)",
      "posts",
      postPath,
      "page.mdx"
    );

    // Read file content
    const content = fs.readFileSync(filePath, "utf-8");

    return calculateReadTime(content);
  } catch (error) {
    // If file doesn't exist or can't be read, return default
    console.warn(
      `Could not calculate read time for ${postRoute}:`,
      error.message
    );
    return "5 min read";
  }
}
