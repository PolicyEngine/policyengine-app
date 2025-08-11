import posts from "../../posts/posts.json";

describe("posts.json validation", () => {
  test("all posts should have either filename or external_url", () => {
    posts.forEach((post, index) => {
      const hasFilename = "filename" in post;
      const hasExternalUrl = "external_url" in post;

      expect(hasFilename || hasExternalUrl).toBe(true);
    });
  });

  test("posts with external_url should still have filename for backend compatibility", () => {
    // This test ensures backend social_card_tags.py won't crash
    // The backend expects all posts to have a filename field
    // Posts with external_url should have a dummy filename (e.g., "obbba-household-by-household-dummy.md")
    // The actual file doesn't need to exist - it's just for backend compatibility
    const postsWithExternalUrl = posts.filter((post) => post.external_url);

    postsWithExternalUrl.forEach((post) => {
      // Posts with external_url must have a filename field to prevent backend crash
      expect(post.filename).toBeDefined();
    });
  });

  test("all posts should have required fields", () => {
    const requiredFields = ["title", "description", "date", "image", "authors"];

    posts.forEach((post) => {
      requiredFields.forEach((field) => {
        expect(post[field]).toBeDefined();
      });
    });
  });

  test("post dates should be valid", () => {
    posts.forEach((post) => {
      const date = new Date(post.date);
      expect(!isNaN(date.getTime())).toBe(true);
    });
  });

  test("post authors should be non-empty arrays", () => {
    posts.forEach((post) => {
      expect(Array.isArray(post.authors)).toBe(true);
      expect(post.authors.length).toBeGreaterThan(0);
    });
  });
});
