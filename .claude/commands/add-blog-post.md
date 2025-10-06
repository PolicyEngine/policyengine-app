---
description: Create a new blog post with proper formatting, images, and posts.json entry
---

# Adding New Blog Post: $ARGUMENTS

This command guides you through creating a new PolicyEngine blog post with all required components.

## Step 1: Gather Information

Ask the user for the following if not already provided in $ARGUMENTS:

**Required**:
- **Title**: Post title
- **Description**: Brief description (< 160 chars for social preview)
- **Authors**: Author slugs (e.g., max-ghenis, daphne-hansell)
- **Tags**: Content tags (must include "us" or "uk" plus topic tags like "org", "policy", "ai")
- **Filename**: Slug for the markdown file (e.g., "dc-office-ai-coding")
- **Cover image**: Path to cover image or location to find it

**Optional**:
- **Date**: Use today's date if not specified (format: YYYY-MM-DD)
- **Event details**: If it's an event post (when, where, RSVP link)

## Step 2: Validate Description Length

```bash
DESC="[user's description]"
echo "Description length: ${#DESC} characters"
```

**If > 160 characters**: Suggest trimming while keeping key info

## Step 3: Create Markdown File

**File location**: `src/posts/articles/[filename].md`

**Important**:
- ❌ DO NOT include title (# Title) at top
- ❌ DO NOT include description paragraph
- ❌ DO NOT include cover image
- ✅ Start directly with content

**Template**:
```markdown
[Opening paragraph introducing the topic]

## Section heading (sentence case)

[Content with active voice, clear structure]

### Subsection if needed

[More content]

## Conclusion or call to action

[Final thoughts, event details if applicable]
```

**For event posts, include**:
```markdown
**When:** [Date and time]

**Where:** [Full address]

[RSVP link](https://example.com)
```

## Step 4: Handle Images

### Cover Image
```bash
# IMPORTANT: Cover image filename MUST match post slug
# Example: dc-office-ai-coding.md → dc-office-ai-coding.png

# Cover images go in src/images/posts/ (loaded via require() at build time)
mv [source-path] src/images/posts/[post-slug].png

# Verify it exists
ls -lh src/images/posts/[post-slug].png
```

### In-Post Images
```bash
# In-post images go in public/images/posts/ (served at runtime)
cp [source-path] public/images/posts/[image-name].jpg

# Reference in markdown as:
# ![Alt text](/images/posts/[image-name].jpg)
```

**Image Location Summary**:
- **Cover images**: `src/images/posts/` (webpack require())
- **In-post images**: `public/images/posts/` (runtime URL serving)

## Step 5: Update posts.json

**Add to beginning of array**:

```bash
# Read current posts.json
CURRENT=$(cat src/posts/posts.json)

# Create new entry (you'll format this based on user input)
NEW_ENTRY='{
  "title": "[title]",
  "description": "[description < 160 chars]",
  "date": "YYYY-MM-DD",
  "tags": ["us", "org", "ai"],
  "authors": ["author-slug"],
  "filename": "[filename].md",
  "image": "[image-filename].png"
}'

# Add to beginning of posts array
jq ". = [$NEW_ENTRY] + ." src/posts/posts.json > src/posts/posts.json.tmp
mv src/posts/posts.json.tmp src/posts/posts.json
```

**Required fields**:
- `title`: String
- `description`: String (< 160 chars)
- `date`: YYYY-MM-DD or YYYY-MM-DD HH:MM:SS
- `tags`: Array (must include country: "us" or "uk")
- `authors`: Array of slugs
- `filename`: String ending in .md
- `image`: Image filename in public/images/posts/

## Step 6: Review with blog-post-reviewer Agent

```bash
# Invoke the blog-post-reviewer agent
```

**Agent will check**:
- Description length
- Image paths exist
- No duplicate metadata in markdown
- Country tag included
- Writing style appropriate
- Event details formatted (if applicable)

## Step 7: Verify in Dev Server

```bash
# If dev server not running
npm start

# Open post
open http://localhost:3000/us/research/[filename]
```

**Check**:
- Cover image displays
- In-post images display
- Description appears correctly
- Event details formatted nicely
- Social preview looks good

## Step 8: Format and Prepare for Commit

```bash
# Run formatters
make format

# Check no lint errors
npm run lint -- --max-warnings=0
```

## Example: Creating Event Post

**User provides**:
- Title: "PolicyEngine DC Officewarming"
- Description: "Join us at the Open Gov Hub for happy hour Wednesday!"
- Authors: ["max-ghenis", "daphne-hansell"]
- Tags: ["us", "org", "event"]
- Filename: "dc-officewarming-oct-2025"
- Cover: /Users/user/Downloads/office-photo.jpg

**You create**:

1. `src/posts/articles/dc-officewarming-oct-2025.md`:
```markdown
We're excited to invite you to celebrate our new DC office at the Open Gov Hub!

After using Claude Code to build an interactive comparison tool for choosing our space, we've found our perfect home among 40+ civic tech organizations.

**When:** Wednesday, October 9, 5:30-7:30 PM

**Where:** Open Gov Hub, 1100 13th St NW, Washington, DC 20005

[RSVP here](https://luma.com/event-id)
```

2. Copy image:
```bash
cp /Users/user/Downloads/office-photo.jpg public/images/posts/dc-officewarming.jpg
```

3. Update posts.json (add to beginning):
```json
{
  "title": "PolicyEngine DC Officewarming",
  "description": "Join us at the Open Gov Hub for happy hour Wednesday!",
  "date": "2025-10-05",
  "tags": ["us", "org", "event"],
  "authors": ["max-ghenis", "daphne-hansell"],
  "filename": "dc-officewarming-oct-2025.md",
  "image": "dc-officewarming.jpg"
}
```

## Common Patterns

### Blog/Org Post
- **Tags**: ["us", "org", "ai"]
- **Tone**: Conversational, narrative
- **Length**: Flexible, can be longer
- **Images**: Team photos, screenshots

### Policy Report
- **Tags**: ["us", "policy", "featured"]
- **Tone**: Factual, objective
- **Style**: Active voice, no unsupported adjectives
- **Images**: Charts, graphs, data visualizations

### Event Announcement
- **Tags**: ["us", "org", "event"]
- **Must include**: When, Where, RSVP link
- **Format**: Clear event details with blank lines
- **Call to action**: "Join us", "RSVP here"

## Pre-Flight Checklist

Before completing, verify:
- [ ] Markdown file created in `src/posts/articles/`
- [ ] No title/description/cover in markdown
- [ ] Cover image copied to `public/images/posts/`
- [ ] Any in-post images copied to `public/images/posts/`
- [ ] posts.json updated with new entry at beginning
- [ ] Description < 160 characters
- [ ] Country tag included ("us" or "uk")
- [ ] Date format correct (YYYY-MM-DD)
- [ ] Event details formatted (if applicable)
- [ ] Reviewed by blog-post-reviewer agent
- [ ] Tested in dev server
- [ ] Formatters run (make format)

## Success Criteria

Post is ready when:
- ✅ All images display correctly
- ✅ Description fits in social preview
- ✅ No duplicate metadata
- ✅ Appropriate writing style
- ✅ No lint errors
- ✅ blog-post-reviewer approves
