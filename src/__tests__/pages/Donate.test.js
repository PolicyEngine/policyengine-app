import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PolicyEngine from "../../PolicyEngine";

// Mock react-plotly.js to prevent actual rendering during the test
jest.mock('react-plotly.js', () => () => <div data-testid="mock-plot" />);

// Mock window.URL.createObjectURL for Plotly.js or other components that need it
beforeAll(() => {
  window.URL.createObjectURL = jest.fn();

  // Mock canvas for plotly.js
  HTMLCanvasElement.prototype.getContext = () => {
    return {
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      getImageData: jest.fn(),
      putImageData: jest.fn(),
      createImageData: jest.fn(),
      setTransform: jest.fn(),
      drawImage: jest.fn(),
      save: jest.fn(),
      fillText: jest.fn(),
      restore: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      stroke: jest.fn(),
      translate: jest.fn(),
      scale: jest.fn(),
      rotate: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      measureText: jest.fn(() => ({ width: 0 })),
      transform: jest.fn(),
      rect: jest.fn(),
      clip: jest.fn(),
    };
  };
});

describe("Test PolicyEngine Donate page", () => {
  beforeEach(() => {
    // Mock window.location to simulate routing
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...window.location, pathname: "/uk/donate" },
    });
  });

  test("Routes to donate page for UK", async () => {
    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    // Wait for the donate elements to appear on the page
    await waitFor(() => {
      const donateElements = screen.getAllByText(/donate/i);
      expect(donateElements.length).toBeGreaterThan(0);
    }, { timeout: 5000 });
  });
});