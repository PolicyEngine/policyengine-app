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
    const postsWithExternalUrl = posts.filter(post => post.external_url);
    
    postsWithExternalUrl.forEach((post) => {
      // This should fail for the OBBBA post which only has external_url
      expect(post.filename).toBeDefined();
    });
  });

  test("all posts should have required fields", () => {
    const requiredFields = ["title", "description", "date", "image", "authors"];
    
    posts.forEach((post) => {
      requiredFields.forEach(field => {
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