# Instructions for adding posts

1. Publish a post to Medium (any site will do but preferably blog.policyengine.org).[^1]
2. Ensure `npm install -g mediumexporter` is installed.
3. Run `mediumexporter {url_of_post} > src/posts/{YYYY-MM-DD}-{slug}.md`.[^2]
4. Download the cover image from the post and save it to `src/images/posts/{slug}.{ext}`.
5. Add a new entry to `src/posts/posts.json` with the below details (mostly self-explanatory):

```json
{
  "title": "The New PolicyEngine",
  "date": "2023-01-12 00:00:01",
  "authors": ["max-ghenis"],
  "tags": ["uk"],
  "description": "We’re taking economic policy to the next level with the most accessible tax and benefit model ever built.",
  "filename": "2023-01-01-uk-the-new-policyengine.md", // path *within* the src/posts directory
  "image": "uk-the-new-policyengine.png" // path *within* the src/images/posts directory
}
```

6. If needed, add a new author entry to `src/posts/authors.json`.
7. Remove the title (with the single #), the description and cover image from the post (the start of the markdown file should be the first sentence of the post).
8. Replace superscript footnotes with Markdown footnotes.

[^1]: This way, Medium does all the image optimisation and we can use their server space to host the images.
[^2]: A 'slug' is a code-friendly version of the post title. For example, the slug for "How to write a blog post" is `how-to-write-a-blog-post`.
