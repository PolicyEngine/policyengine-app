---
description: Comprehensive review of a blog post using all QA agents
---

# Reviewing Blog Post: $ARGUMENTS

This command orchestrates all blog post QA agents to comprehensively review a post before publishing.

## Step 1: Identify the Post

```bash
# If argument provided, find that post
if [ -n "$ARGUMENTS" ]; then
    POST_SLUG="$ARGUMENTS"
else
    # Otherwise use the first post in posts.json
    POST_SLUG=$(jq -r '.[0].filename' src/posts/posts.json | sed 's/.md$//')
fi

echo "Reviewing post: $POST_SLUG"
```

## Step 2: Run All QA Agents

### Agent 1: blog-post-reviewer
**Checks**:
- Description length < 160 chars
- Images exist in correct location
- No duplicate metadata in markdown
- Country tag included
- posts.json formatting

**Invoke**: blog-post-reviewer agent with post slug

### Agent 2: writing-style-checker
**Checks**:
- Active voice usage
- No unsupported adjectives
- Neutral language (for policy posts)
- Sentence case headers
- Data precision

**Invoke**: writing-style-checker agent with post slug

### Agent 3: visual-qa-checker
**Checks**:
- Image optimization (< 500KB)
- Cover image aspect ratio
- Alt text on all images
- Social preview simulation

**Invoke**: visual-qa-checker agent with post slug

### Agent 4: visual-pdf-reviewer
**Checks**:
- Capture post as PDF/screenshot
- Visual layout quality
- Typography and readability
- Image rendering
- Event details formatting
- Overall design consistency

**Invoke**: visual-pdf-reviewer agent with post slug

## Step 3: Aggregate Results

**Collect issues from all agents**:

```markdown
## Comprehensive Blog Post Review: [POST_SLUG]

### Summary
- Total issues found: X
- Critical issues: X
- Warnings: X
- Suggestions: X

### blog-post-reviewer Results
[Insert agent 1 findings]

### writing-style-checker Results
[Insert agent 2 findings]

### visual-qa-checker Results
[Insert agent 3 findings]

### visual-pdf-reviewer Results
[Insert agent 4 findings - includes visual review of PDF/screenshot]

### Overall Status
[READY TO PUBLISH / CHANGES NEEDED / BLOCKED]
```

## Step 4: Generate Screenshot Preview

```bash
# Ensure dev server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "⚠️  Dev server not running. Start with: npm start"
else
    # Open the post
    open http://localhost:3000/us/research/$POST_SLUG

    # Wait for page to load
    sleep 3

    # Capture screenshots
    echo "📸 Taking screenshots..."

    # Desktop view - full page
    screencapture -w ~/Downloads/${POST_SLUG}-desktop.png

    # Social preview card simulation
    # (would need to screenshot the card preview specifically)
fi
```

## Step 5: Create Review Checklist

**Based on learnings from DC office post**:

```markdown
### Pre-Publish Checklist

#### Content
- [ ] Description < 160 characters
- [ ] Country tag included ("us" or "uk")
- [ ] Authors array correct
- [ ] Date format: YYYY-MM-DD
- [ ] Post added to beginning of posts.json array

#### Images
- [ ] Cover image exists in public/images/posts/
- [ ] Cover image cropped properly (no browser UI)
- [ ] Cover image optimized (< 500KB)
- [ ] Cover image aspect ratio suitable for social cards (16:9 or 2:1)
- [ ] All in-post images exist in public/images/posts/
- [ ] All images have descriptive alt text
- [ ] In-post images optimized (< 300KB each)

#### Markdown
- [ ] No title (# Title) at top of file
- [ ] No description paragraph
- [ ] No cover image in markdown
- [ ] Content starts immediately
- [ ] Headers use sentence case
- [ ] Images reference /images/posts/ paths

#### Event Posts (if applicable)
- [ ] When and Where on separate lines
- [ ] Full address included
- [ ] RSVP link provided
- [ ] Event time specified (e.g., 5:30-7:30 PM)

#### Writing Style
- [ ] Active voice (for policy reports: strict; for blog posts: preferred)
- [ ] No unsupported adjectives (policy reports only)
- [ ] Sentence case headers
- [ ] Appropriate tone for content type

#### Visual QA
- [ ] Reviewed desktop screenshot - looks good
- [ ] Social preview fits (< 160 chars)
- [ ] No layout issues observed
- [ ] Text readable
- [ ] Event details clearly formatted (if applicable)

#### Final Steps
- [ ] make format run successfully
- [ ] npm run lint passes with --max-warnings=0
- [ ] Tested in dev server
- [ ] All QA agents approve
```

## Common Issues to Check For

### From DC Office Post Experience

1. **Browser UI in screenshots**
   - Issue: Screenshot included URL bar
   - Fix: Crop top portion using Python PIL
   ```bash
   python3 -c "
   from PIL import Image
   img = Image.open('public/images/posts/screenshot.png')
   cropped = img.crop((0, 140, img.width, img.height))  # Adjust 140 as needed
   cropped.save('public/images/posts/screenshot.png')
   "
   ```

2. **Description too long**
   - Issue: 227 characters
   - Fix: Trim to ~144 chars while keeping key points
   - Pattern: "We [action]. The result: [outcome]. Join us [CTA]!"

3. **Wrong image directory**
   - Issue: Images in src/images/posts/
   - Fix: Move to public/images/posts/
   ```bash
   mv src/images/posts/[image] public/images/posts/[image]
   ```

4. **Event formatting**
   - Issue: When and Where on same line
   - Fix: Add blank line between them

5. **Missing links**
   - Issue: Open Gov Hub not linked
   - Fix: Add links to organizations/tools mentioned

6. **Featured tag**
   - Issue: Blog post tagged as "featured"
   - Fix: Remove "featured" for internal/org posts

## Automation Workflow

```bash
# Run all checks in sequence
echo "1/4 Running blog-post-reviewer..."
# [invoke agent]

echo "2/4 Running writing-style-checker..."
# [invoke agent]

echo "3/4 Running visual-qa-checker..."
# [invoke agent]

echo "4/4 Running visual-pdf-reviewer..."
# [invoke agent - captures and reviews PDF]

echo "📋 Generating checklist..."
# [create checklist]

echo "✅ Review complete!"
echo "📄 PDF saved to ~/Downloads/[slug]-review.pdf for manual inspection"
```

## Output Format

```markdown
# Blog Post Review: [TITLE]

**Post**: `[filename].md`
**Date**: [date]
**Authors**: [authors]
**Tags**: [tags]
**URL**: http://localhost:3000/us/research/[slug]

---

## Quick Status

🟢 **READY TO PUBLISH** - All checks passed
🟡 **MINOR ISSUES** - X suggestions, not blocking
🔴 **CHANGES NEEDED** - X critical issues must be fixed

---

## Detailed Results

### ✅ blog-post-reviewer
[Results from agent 1]

### ✅ writing-style-checker
[Results from agent 2]

### ⚠️  visual-qa-checker
Found 1 issue:
- Team photo needs optimization (1.9MB → compress to ~200KB)

### ✅ visual-pdf-reviewer
Visual rendering looks excellent:
- Cover image displays prominently and clearly
- Typography is readable and well-spaced
- Event details stand out and are easy to scan
- Overall layout is professional and polished

---

## Screenshots

Saved to:
- `~/Downloads/[slug]-desktop.png` - Desktop view
- `~/Downloads/[slug]-social-preview.png` - Social card preview

---

## Pre-Publish Checklist

[Auto-generated checklist based on findings]

---

## Recommendations

1. **Optimize team photo** (from visual-qa-checker)
   ```bash
   sips --resampleWidth 1200 \
        --setProperty formatOptions 80 \
        public/images/posts/open-gov-hub-team.jpg \
        --out public/images/posts/open-gov-hub-team.jpg
   ```

2. **Consider adding link** (from blog-post-reviewer)
   Link to Open Gov Hub website in first mention

---

## Next Steps

### If Ready to Publish
```bash
make format
git add .
git commit -m "Add blog post: [title]"
git push
```

### If Changes Needed
Address issues above, then run `/review-blog-post [slug]` again
```

## Success Criteria

Post is ready to publish when:
- ✅ All 3 QA agents approve
- ✅ Screenshots show no visual issues
- ✅ All checklist items checked
- ✅ make format and npm run lint pass
- ✅ Tested in dev server

## Usage Examples

```bash
# Review latest post (first in posts.json)
/review-blog-post

# Review specific post by slug
/review-blog-post dc-office-ai-coding

# Review and generate detailed report
/review-blog-post dc-office-ai-coding --detailed
```
