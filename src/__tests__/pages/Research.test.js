import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Research from "../../pages/Research";
import { BrowserRouter } from "react-router-dom";

describe("Research Page", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <Research />
      </BrowserRouter>,
    );
    const heading = screen.getByRole("heading", {
      name: /Research and analysis/i,
    });
    expect(heading).toBeInTheDocument();
    const subheadingText =
      "Read PolicyEngine's research on recent and proposed policy reforms, as well as technical and general updates from the organisation.";
    const subheading = screen.getByText(subheadingText);
    expect(subheading).toBeInTheDocument();
  });
});
