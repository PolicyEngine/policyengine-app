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

    // Check for the PageHeader title
    const heading = screen.getByRole("heading", { name: /Our people/i });
    expect(heading).toBeInTheDocument();

    // Check for the section with a heading "Founders"
    const foundersSection = screen.getByRole("heading", { name: /Founders/i });
    expect(foundersSection).toBeInTheDocument();

    // Check for the section with a heading "Team"
    const teamSection = screen.getByRole("heading", { name: /Team/i });
    expect(teamSection).toBeInTheDocument();

    // Check that the link to jobs page exists
    const link = screen.getByRole("link", {
      name: /Learn about opportunities to join us./i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", expect.stringContaining("/jobs"));
  });
});
