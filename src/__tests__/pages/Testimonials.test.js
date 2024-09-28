import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PolicyEngine from "../../PolicyEngine";

// Mock window.URL.createObjectURL to prevent error
beforeAll(() => {
  window.URL.createObjectURL = jest.fn(() => "blob-url");
});

// Mock react-plotly.js to prevent errors related to Plot component
jest.mock("react-plotly.js", () => () => null);

// Mock CookieConsent
jest.mock("../../modals/CookieConsent", () => () => null);

describe("Test PolicyEngine Testimonials page", () => {
  beforeEach(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: { ...window.location, pathname: "/us/testimonials" },
    });
  });

  test("Routes to testimonials page for US", async () => {
    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    await waitFor(() => {
      // Ensure the heading is available on the page
      expect(screen.getByRole("heading", { name: /testimonials/i })).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});