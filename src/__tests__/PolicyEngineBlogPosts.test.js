import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import postJson from "../posts/posts.json";

import PolicyEngine from "../PolicyEngine";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
  };
});

const { location } = window;

beforeAll(() => {
  window.scrollTo = jest.fn();

  delete window.location;
  window.location = {
    reload: jest.fn(),
  };
});

afterAll(() => {
  window.location = location;
  jest.resetAllMocks();
});

describe("PolicyEngine Blog Posts", () => {
  // This test only ensures that the JS page renders, not that markdown is transformed,
  // as markdown files are stubbed out in our current implementation of Jest.
  // Processing markdown properly, which should be done to test blog files,
  // would likely require a custom webpack setup.
  test("Routes to individual blog posts for US", () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        text: () => Promise.resolve("success"),
      }),
    );

    // Filter posts.json for US articles
    const filteredPostJson = postJson.filter((post) =>
      post.tags.includes("us"),
    );

    // Choose one at random
    const randIndex = Math.floor(Math.random() * filteredPostJson.length);

    const selectedPost = filteredPostJson[randIndex];
    const postFilepath = selectedPost.filename.split(".")[0];

    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

    window.location = {
      ...window.location,
      pathname: `/us/research/${postFilepath}`,
      origin: `https://www.policyengine.org/us/research/${postFilepath}`,
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    const link = screen.getByRole("link", { name: /Research/i });
    expect(link).toBeInTheDocument();
  });
});
