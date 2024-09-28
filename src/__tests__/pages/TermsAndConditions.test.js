import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PolicyEngine from "../../PolicyEngine";

describe("Test PolicyEngine T&C page", () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...window.location, pathname: "/us/terms" },
    });
  });

  test("Routes to T&C page for US", async () => {
    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/terms/i)).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});