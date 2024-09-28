import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import PolicyEngine from "../PolicyEngine";
import postJson from "../posts/posts.json";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

jest.mock("react-plotly.js", () => jest.fn());

describe("Test PolicyEngine pages", () => {
  test("Routes to jobs page for UK", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/jobs",
      origin: "https://www.policyengine.org/uk/jobs",
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(screen.getByText("Join Our Team")).toBeInTheDocument();
  });

  test("Routes to testimonials page for US", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/testimonials",
      origin: "https://www.policyengine.org/us/testimonials",
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(screen.getByText("What people say about PolicyEngine")).toBeInTheDocument();
  });

  test("Routes to donate page for UK", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/donate",
      origin: "https://www.policyengine.org/uk/donate",
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(screen.getByText("The Difference Your Support Makes")).toBeInTheDocument();
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

  test("Routes to privacy page for UK", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/privacy",
      origin: "https://www.policyengine.org/uk/privacy",
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(screen.getByText("Privacy")).toBeInTheDocument();
  });

  test("Routes to T&C page for US", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/terms",
      origin: "https://www.policyengine.org/us/terms",
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
  });
});