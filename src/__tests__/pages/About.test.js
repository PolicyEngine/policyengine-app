import React from "react";
import "@testing-library/jest-dom";
import { screen, render, within } from "@testing-library/react";
import About from "../../pages/About";
import { BrowserRouter } from "react-router-dom";
import { founders, staff } from "../../data/staff";

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

  test("each founder has an image, a name, and a description", async () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    for (const founder of Object.values(founders)) {
      const nameElement = await screen.findByText(founder.name);
      expect(nameElement).toBeInTheDocument();

      // The parent container div that holds the image and description
      const bioContainer = nameElement.closest("div").parentElement;
      expect(bioContainer).not.toBeNull();

      // Check the image
      const img = within(bioContainer).getByRole("img", {
        name: founder.name,
      });
      expect(img).toBeInTheDocument();

      const descriptionPart = founder.bio.split(" ").slice(0, 5).join(" ");
      const description = within(bioContainer).getByText((content, element) => {
        return (
          element.tagName.toLowerCase() === "p" &&
          content.includes(descriptionPart)
        );
      });
      expect(description).toBeInTheDocument();
    }
  });

  test("each team member has an image, a name, and a description", async () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    for (const member of Object.values(staff)) {
      const nameElement = await screen.findByText(member.name);
      expect(nameElement).toBeInTheDocument();

      // The parent container div that holds the image and description
      const bioContainer = nameElement.closest("div").parentElement;
      expect(bioContainer).not.toBeNull();

      // Check the image
      const img = within(bioContainer).getByRole("img", {
        name: member.name,
      });
      expect(img).toBeInTheDocument();

      // Check the description by using a part of the bio text
      const descriptionPart = member.bio.split(" ").slice(0, 5).join(" ");
      const description = within(bioContainer).getByText((content, element) => {
        return (
          element.tagName.toLowerCase() === "p" &&
          content.includes(descriptionPart)
        );
      });
      expect(description).toBeInTheDocument();
    }
  });
});
