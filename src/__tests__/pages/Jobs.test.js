import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PolicyEngine from "../../PolicyEngine";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

describe("Test PolicyEngine Jobs page", () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...window.location, pathname: "/uk/jobs" },
    });
  });

  test("Routes to jobs page for UK", async () => {
    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    await waitFor(() => {
      const computeButton = screen.getByText(/Compute Policy Impact/i);
      expect(computeButton).toBeInTheDocument();
    }, { timeout: 10000 });
  });
});