import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PolicyEngine from "../../PolicyEngine";

// Mock react-plotly.js to avoid rendering plots in this test
jest.mock("react-plotly.js", () => () => <div>Mocked Plot</div>);

describe("Test PolicyEngine Privacy page", () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...window.location, pathname: "/uk/privacy" },
    });
  });

  test("Routes to privacy page for UK", async () => {
    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    await waitFor(() => {
      // Use getByRole to target the h1 element specifically with level 1
      expect(screen.getByRole("heading", { name: /privacy/i, level: 1 })).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});