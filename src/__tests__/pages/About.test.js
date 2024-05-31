import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import About from "../../pages/About";
import { BrowserRouter } from "react-router-dom";

describe("About Page", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    const heading = screen.getByRole("heading", { name: /Our people/i });

    expect(heading).toBeInTheDocument();
    const max = screen.getByText(
      "PolicyEngine's team leads a global movement of open-source contributors.",
    );
    expect(max).toBeInTheDocument();
  });
});
