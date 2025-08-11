import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  MediumBlogPreview,
  SmallBlogPreview,
  FeaturedBlogPreview,
} from "../../pages/home/HomeBlogPreview";
import posts from "../../posts/posts.json";

// Mock the image loader
jest.mock(
  "../../images/posts/obbba-household-by-household.png",
  () => "mocked-image",
  { virtual: true },
);

// Mock the postTransformers to ensure slug is set
jest.mock("../../posts/postTransformers", () => {
  const actualPosts = require("../../posts/posts.json");
  const postsSorted = actualPosts.sort((a, b) => (a.date < b.date ? 1 : -1));

  for (let post of postsSorted) {
    if (post.filename) {
      post.slug = post.filename.substring(0, post.filename.indexOf("."));
    } else if (post.external_url) {
      post.slug = post.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    }
  }

  return {
    posts: postsSorted,
    locationLabels: {},
    locationTags: [],
    topicLabels: {},
    topicTags: [],
  };
});

describe("External URL redirect behavior", () => {
  const obbbaPost = posts.find(
    (post) => post.external_url === "/us/obbba-household-by-household",
  );

  beforeEach(() => {
    // Ensure the post has a slug for testing
    if (obbbaPost && !obbbaPost.slug) {
      obbbaPost.slug = "obbba-household-by-household-dummy";
    }
  });

  test("MediumBlogPreview should link directly to external URL", () => {
    expect(obbbaPost).toBeDefined();

    const { container } = render(
      <MemoryRouter>
        <MediumBlogPreview blog={obbbaPost} minHeight={300} />
      </MemoryRouter>,
    );

    const linkElement = container.querySelector("a");
    expect(linkElement).toBeTruthy();
    expect(linkElement.getAttribute("href")).toBe(
      "/us/obbba-household-by-household",
    );
    expect(linkElement.getAttribute("href")).not.toBe(
      "/us/research/obbba-household-by-household-dummy",
    );
  });

  test("SmallBlogPreview should link directly to external URL", () => {
    expect(obbbaPost).toBeDefined();

    const { container } = render(
      <MemoryRouter>
        <SmallBlogPreview blog={obbbaPost} />
      </MemoryRouter>,
    );

    const linkElement = container.querySelector("a");
    expect(linkElement).toBeTruthy();
    expect(linkElement.getAttribute("href")).toBe(
      "/us/obbba-household-by-household",
    );
    expect(linkElement.getAttribute("href")).not.toBe(
      "/us/research/obbba-household-by-household-dummy",
    );
  });

  test("FeaturedBlogPreview should link directly to external URL", () => {
    expect(obbbaPost).toBeDefined();

    const { container } = render(
      <MemoryRouter>
        <FeaturedBlogPreview blogs={obbbaPost} width="100%" imageHeight={200} />
      </MemoryRouter>,
    );

    const linkElement = container.querySelector("a");
    expect(linkElement).toBeTruthy();
    expect(linkElement.getAttribute("href")).toBe(
      "/us/obbba-household-by-household",
    );
    expect(linkElement.getAttribute("href")).not.toBe(
      "/us/research/obbba-household-by-household-dummy",
    );
  });
});
