#!/usr/bin/env node
/**
 * Validates blog posts in posts.json to ensure:
 * 1. All cover images exist in src/images/posts/
 * 2. All required fields are present
 * 3. Descriptions are < 160 characters
 * 4. Image filenames match post slugs
 */

const fs = require("fs");
const path = require("path");

const POSTS_JSON = path.join(__dirname, "../src/posts/posts.json");
const COVER_IMAGES_DIR = path.join(__dirname, "../src/images/posts");

let errors = [];
let warnings = [];

function validate() {
  // Read posts.json
  const posts = JSON.parse(fs.readFileSync(POSTS_JSON, "utf8"));

  posts.forEach((post, index) => {
    const postNum = `Post #${index + 1} (${post.filename || "unnamed"})`;

    // Check required fields
    const requiredFields = [
      "title",
      "description",
      "date",
      "tags",
      "authors",
      "filename",
      "image",
    ];
    requiredFields.forEach((field) => {
      const value = post[field];
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0)
      ) {
        errors.push(`${postNum}: Missing or empty required field '${field}'`);
      }
    });

    if (!post.filename || !post.image) return;

    // Check description length
    if (post.description && post.description.length > 160) {
      warnings.push(
        `${postNum}: Description is ${post.description.length} chars (should be < 160 for social previews)`,
      );
    }

    // Check country tag
    if (post.tags && !post.tags.includes("us") && !post.tags.includes("uk")) {
      warnings.push(`${postNum}: Missing country tag ('us' or 'uk')`);
    }

    // Check image filename matches post slug (nice-to-have, not critical)
    const postSlug = post.filename.replace(/\.(md|ipynb)$/, "");
    const imageSlug = post.image.replace(/\.(png|jpg|jpeg|webp)$/, "");
    if (postSlug !== imageSlug) {
      warnings.push(
        `${postNum}: Image filename '${post.image}' doesn't match post slug '${postSlug}' (optional pattern)`,
      );
    }

    // Check cover image exists in src/images/posts/
    const coverImagePath = path.join(COVER_IMAGES_DIR, post.image);
    if (!fs.existsSync(coverImagePath)) {
      errors.push(`${postNum}: Cover image not found at ${coverImagePath}`);
    } else {
      // Verify it's a valid image file
      const stat = fs.statSync(coverImagePath);
      if (stat.size === 0) {
        errors.push(`${postNum}: Cover image ${post.image} is empty (0 bytes)`);
      }
    }

    // Check markdown file exists (unless it's an external_url post)
    // Note: Posts with external_url redirect to apps/pages instead of rendering markdown
    if (!post.external_url) {
      const mdPath = path.join(
        __dirname,
        "../src/posts/articles",
        post.filename,
      );
      if (!fs.existsSync(mdPath)) {
        errors.push(`${postNum}: Markdown file not found at ${mdPath}`);
      }
    }
  });

  // Print results
  console.log("=".repeat(60));
  console.log("Blog Posts Validation Results");
  console.log("=".repeat(60));

  if (errors.length === 0 && warnings.length === 0) {
    console.log("✅ All validation checks passed!");
    console.log(`   Validated ${posts.length} blog posts`);
    return 0;
  }

  if (errors.length > 0) {
    console.log(`\n❌ ${errors.length} ERROR(S) FOUND:\n`);
    errors.forEach((err) => console.log(`   ${err}`));
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  ${warnings.length} WARNING(S):\n`);
    warnings.forEach((warn) => console.log(`   ${warn}`));
  }

  console.log("\n" + "=".repeat(60));

  // Exit with error code if there are errors
  return errors.length > 0 ? 1 : 0;
}

const exitCode = validate();
process.exit(exitCode);
