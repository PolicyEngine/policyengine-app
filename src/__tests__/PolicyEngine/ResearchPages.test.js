import { render, screen } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import postJson from "../../posts/posts.json";
import PolicyEngine from "../../PolicyEngine";


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

describe("PolicyEngine research pages", () => {
  test("Routes to research page for US", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/research",
      origin: "https://www.policyengine.org/us/research",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(getByText("Research and analysis")).toBeInTheDocument();
  });

  test("Routes to research page for UK", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/research",
      origin: "https://www.policyengine.org/uk/research",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(getByText("Research and analysis")).toBeInTheDocument();
  });

  test("Routes to individual blog posts for US", () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        text: () => Promise.resolve("success"),
      })
    );

    const filteredPostJson = postJson.filter((post) => post.tags.includes("us"));
    const randIndex = Math.floor(Math.random() * filteredPostJson.length);
    const selectedPost = filteredPostJson[randIndex];
    const postFilepath = selectedPost.filename.split(".")[0];

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: `/us/research/${postFilepath}`,
      origin: `https://www.policyengine.org/us/research/${postFilepath}`,
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    const link = screen.getByRole("link", { name: /Research/i });
    expect(link).toBeInTheDocument();
  });
});