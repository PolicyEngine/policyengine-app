import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PolicyEngine from "../../PolicyEngine";
import postJson from "../../posts/posts.json";

// Mock react-plotly.js in this file
jest.mock("react-plotly.js", () => () => <div>Mocked Plot</div>);

describe("Test PolicyEngine Blog Posts page", () => {
  beforeEach(() => {
    const filteredPostJson = postJson.filter((post) => post.tags.includes("us"));
    const randIndex = Math.floor(Math.random() * filteredPostJson.length);
    const selectedPost = filteredPostJson[randIndex];
    const postFilepath = selectedPost.filename.split(".")[0];

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...window.location, pathname: `/us/research/${postFilepath}` },
    });
  });

  test("Routes to individual blog posts for US", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        text: () => Promise.resolve("success"),
      })
    );

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/research/i)).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});