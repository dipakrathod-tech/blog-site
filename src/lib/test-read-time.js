// Test script to verify read time calculation
import { calculateReadTime, getPostReadTime } from "./read-time.js";
import fs from "fs";
import path from "path";

// Test with AWS Lambda post
const filePath = path.join(
  process.cwd(),
  "src",
  "app",
  "(blog)",
  "posts",
  "aws-lambda-best-practices",
  "page.mdx"
);

const content = fs.readFileSync(filePath, "utf-8");

console.log("=== Read Time Test ===\n");
console.log("File:", filePath);
console.log("File size:", content.length, "characters");
console.log("\n--- Processing Steps ---");

// Show processing steps
let text = content;

// Step 1: Remove frontmatter
const frontmatterMatch = text.match(/^---[\s\S]*?---/m);
if (frontmatterMatch) {
  console.log("Frontmatter removed:", frontmatterMatch[0].length, "chars");
  text = text.replace(/^---[\s\S]*?---\n*/m, "");
}

// Step 2: Count code blocks
const codeBlocks = text.match(/```[\s\S]*?```/g);
if (codeBlocks) {
  console.log("Code blocks found:", codeBlocks.length);
  let totalCodeWords = 0;
  codeBlocks.forEach((block, i) => {
    const codeContent = block.replace(/```\w*\n?/g, "");
    const words = codeContent
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
    totalCodeWords += words;
    if (i < 3) {
      // Show first 3 blocks
      console.log(`  Block ${i + 1}: ${words} words`);
    }
  });
  console.log("  Total code words:", totalCodeWords);
  console.log(
    "  Counted as:",
    Math.ceil(totalCodeWords * 0.5),
    "words (50% weight)"
  );
}

// Final calculation
const readTime = calculateReadTime(content);
console.log("\n--- Result ---");
console.log("Read Time:", readTime);

// Also test the actual function used in components
console.log("\nUsing getPostReadTime():");
const routeReadTime = getPostReadTime("/posts/aws-lambda-best-practices");
console.log("Read Time:", routeReadTime);
