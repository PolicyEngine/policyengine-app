import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Research, { BlogPostResults } from "../../pages/Research";
import { BrowserRouter } from "react-router-dom";

// Mock data for blog posts
const blogPosts = [
  {
    title: "Beta-launch: PolicyEngine's enhanced microdata for policy analysis",
    description:
      "By integrating and calibrating multiple datasets, PolicyEngine makes world-class tax-benefit microsimulation modeling available to anyone.",
    date: "2024-03-25 09:00:00",
    tags: ["us", "technical"],
    authors: ["max-ghenis", "nikhil-woodruff"],
    filename: "enhanced-cps-beta.md",
    image: "enhanced-cps-beta.png",
  },
  {
    title:
      "Child Tax Credit Provisions of the Tax Relief for American Workers and Families Act",
    description:
      "How the Wyden-Smith bipartisan tax package would affect families through 2025.",
    date: "2024-03-25 09:00:00",
    tags: ["us", "policy"],
    authors: ["max-ghenis"],
    filename: "trafwa-ctc.md",
    image: "trafwa-ctc.webp",
  },
  {
    title: "Individual income tax provisions of President Biden's 2025 Budget",
    description:
      "PolicyEngine projects the impact of expanding tax credits and raising taxes on high-income filers.",
    date: "2024-03-27 09:00:00",
    tags: ["us", "policy", "featured"],
    authors: ["max-ghenis", "pavel-makarchuk"],
    filename: "biden-budget-2025.md",
    image: "biden-budget-2025.jpeg",
  },
  {
    title: "Building the roots of PolicyEngine Nigeria",
    description:
      "We’re expanding PolicyEngine’s reach by empowering Nigerians to understand personal income tax policies.",
    date: "2023-04-21 09:00:00",
    tags: ["ng", "technical"],
    filename: "building-the-roots-of-policyengine-nigeria.md",
    image: "building-the-roots-of-policyengine-nigeria.webp",
    authors: ["nikhil-woodruff", "max-ghenis"],
  },
  {
    title: "PolicyEngine adds New York Family Assistance (TANF) to US model",
    description:
      "Enhancing analysis of public policy impacts on needy families.",
    date: "2023-04-08 09:00:00",
    tags: ["us", "us-ny", "policy"],
    filename: "new-york-tanf.md",
    image: "new-york-tanf.png",
    authors: ["max-ghenis", "donglai-xu", "lin-tao"],
  },
  {
    title: "From OpenFisca to PolicyEngine",
    description:
      "OpenFisca has catapulted our progress, and now we’ve forked it into our own microsimulation framework.",
    date: "2022-11-10",
    tags: ["global", "technical"],
    filename: "from-openfisca-to-policyengine.md",
    image: "from-openfisca-to-policyengine.png",
    authors: ["nikhil-woodruff"],
  },
  {
    title: "Stamp duties in PolicyEngine UK",
    date: "2022-09-22",
    authors: ["nikhil-woodruff"],
    tags: ["uk", "technical"],
    description:
      "The Times reported yesterday that Prime Minister Liz Truss will announce plans to cut Stamp Duty this week. PolicyEngine now supports\u2026",
    filename: "stamp-duties-in-policyengine-uk.md",
    image: "stamp-duties-in-policyengine-uk.jpg",
  },
  {
    title: "PolicyEngine's Spring 2024 update",
    description: "How PolicyEngine compares to the latest external forecasts.",
    date: "2024-04-16 09:00:00",
    tags: ["uk", "policy", "featured"],
    image: "uk_march_update.png",
    authors: ["nikhil-woodruff"],
    filename: "obr-forecast-update-spring-24.ipynb",
  },
  {
    title: "The Triple Lock Plus",
    description:
      "PolicyEngine estimates the impact of the UK government's proposed pension uprating policy reform.",
    date: "2024-05-28 09:00:00",
    tags: ["uk", "policy", "featured"],
    authors: ["nikhil-woodruff"],
    filename: "uk-triple-lock-plus.ipynb",
    image: "uk-triple-lock-plus.jpg",
  },
];

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

  // test("displays the correct number of results", () => {
  //   render(
  //     <BrowserRouter>
  //       <BlogPostResults posts={blogPosts} />
  //     </BrowserRouter>,
  //   );

  //   const numberOfPosts = screen.getByText(
  //     new RegExp(`${blogPosts.length}\n result\ns`),
  //   );
  //   expect(numberOfPosts).toBeInTheDocument();
  // });

  test("renders blog post links", () => {
    render(
      <BrowserRouter>
        <BlogPostResults posts={blogPosts} />
        {/* Render the BlogPostResults component */}
      </BrowserRouter>,
    );

    for (const post of blogPosts) {
      const titleElement = screen.getByText(post.title);
      expect(titleElement).toBeInTheDocument();

      const descriptionElement = screen.getByText(post.description);
      expect(descriptionElement).toBeInTheDocument();

      // Extract filename without extension
      const filenameWithoutExtension = post.filename.replace(/\.[^.]+$/, "");

      // Find the "Read" link associated with the current blog post
      const readLinks = screen.getAllByText("Read");
      const link = readLinks.find((readLink) => {
        const parent = readLink.closest(".stretched-link");
        return (
          parent &&
          parent.getAttribute("href") ===
            `/null/research/${filenameWithoutExtension}`
        );
      });

      expect(link).toBeInTheDocument();
    }
  });
});
