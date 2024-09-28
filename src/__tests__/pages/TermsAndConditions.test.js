import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PolicyEngine from "../../PolicyEngine";

// Mock window.URL.createObjectURL to prevent error
beforeAll(() => {
  window.URL.createObjectURL = jest.fn();
});

// Mock react-plotly.js to avoid rendering plots in this test
jest.mock("react-plotly.js", () => () => <div>Mocked Plot</div>);

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

    // Use getAllByText and verify one of the elements matches
    await waitFor(() => {
      const termsElements = screen.getAllByText(/terms of service/i);
      expect(termsElements[0]).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});