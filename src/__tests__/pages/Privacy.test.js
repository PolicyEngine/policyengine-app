import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PolicyEngine from "../../PolicyEngine";

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
      expect(screen.getByText(/privacy/i)).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});