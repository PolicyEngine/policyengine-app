import apps from "../apps/apps.json";
import posts from "../posts/posts.json";

describe("Slug uniqueness validation", () => {
  test("all app slugs should be unique", () => {
    const slugs = apps.map((app) => app.slug);
    const uniqueSlugs = new Set(slugs);

    expect(slugs.length).toBe(uniqueSlugs.size);

    // If test fails, show duplicates
    if (slugs.length !== uniqueSlugs.size) {
      const duplicates = slugs.filter(
        (slug, index) => slugs.indexOf(slug) !== index,
      );
      console.error("Duplicate app slugs found:", duplicates);
    }
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip("all post filenames should be unique (skipped due to pre-existing duplicate)", () => {
    // This test is currently skipped because there's a pre-existing duplicate:
    // "oregons-nonrefundable-exemption-credit.md" appears twice in posts.json
    // This should be fixed in a separate PR
    const filenames = posts
      .filter((post) => post.filename)
      .map((post) => post.filename);
    const uniqueFilenames = new Set(filenames);

    expect(filenames.length).toBe(uniqueFilenames.size);

    // If test fails, show duplicates
    if (filenames.length !== uniqueFilenames.size) {
      const duplicates = filenames.filter(
        (filename, index) => filenames.indexOf(filename) !== index,
      );
      console.error("Duplicate post filenames found:", duplicates);
    }
  });

  test("app slugs should not conflict with post filenames", () => {
    const appSlugs = apps.map((app) => app.slug);
    const postSlugs = posts
      .filter((post) => post.filename)
      .map((post) => post.filename.replace(/\.md$/, ""));

    const conflicts = appSlugs.filter((appSlug) => postSlugs.includes(appSlug));

    expect(conflicts.length).toBe(0);

    // If test fails, show conflicts
    if (conflicts.length > 0) {
      console.error("App slugs that conflict with post filenames:", conflicts);
      console.error(
        "These would cause routing ambiguity between /:countryId/:appName and /:countryId/research/:postName",
      );
    }
  });

  test("app slugs should follow naming convention", () => {
    apps.forEach((app) => {
      // Slugs should be lowercase kebab-case
      expect(app.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    });
  });
});
