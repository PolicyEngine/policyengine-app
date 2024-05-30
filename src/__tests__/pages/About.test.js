import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import About from "../../pages/About";
import { MemoryRouter } from "react-router-dom";

describe("About Page", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const heading = screen.getByRole("heading", { name: /Our people/i });

    expect(heading).toBeInTheDocument();
    const max = screen.getByText(
      "PolicyEngine's team leads a global movement of open-source contributors.",
    );
    expect(max).toBeInTheDocument();

    screen.debug(max);
  });
});
