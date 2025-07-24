import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppPage from "../../pages/AppPage";
import { apps } from "../../apps/appTransformers";

// Mock the apps data
jest.mock("../../apps/appTransformers", () => ({
  apps: [
    {
      title: "OBBBA household-by-household analysis",
      description: "Test description",
      url: "https://policyengine.github.io/obbba-scatter",
      slug: "obbba-household-by-household",
      tags: ["us", "featured", "policy"],
    },
    {
      title: "Other App",
      description: "Other app description",
      url: "https://example.com/other-app",
      slug: "other-app",
      tags: ["us"],
    },
  ],
}));

// Mock react-router-dom hooks
const mockNavigate = jest.fn();
const mockLocation = {
  pathname: "/us/obbba-household-by-household",
  search: "?household=12345&baseline=current",
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ appName: "obbba-household-by-household" }),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

// Mock the Header and Footer components
jest.mock("../../layout/Header", () => {
  return function Header() {
    return <div data-testid="header">Header</div>;
  };
});

jest.mock("../../layout/Footer", () => {
  return function Footer() {
    return <div data-testid="footer">Footer</div>;
  };
});

describe("AppPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset location mock
    mockLocation.search = "";
  });

  it("renders the OBBBA iframe with URL parameters on initial load", () => {
    mockLocation.search = "?household=12345&baseline=current";
    
    const { container } = render(
      <BrowserRouter>
        <AppPage />
      </BrowserRouter>
    );

    const iframe = container.querySelector("iframe");
    expect(iframe).toBeTruthy();
    expect(iframe.src).toBe(
      "https://policyengine.github.io/obbba-scatter?household=12345&baseline=current"
    );
  });

  it("does not add URL parameters to non-OBBBA apps", () => {
    // Change to other app
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: () => ({ appName: "other-app" }),
      useNavigate: () => mockNavigate,
      useLocation: () => ({ ...mockLocation, pathname: "/us/other-app" }),
    }));

    const { container } = render(
      <BrowserRouter>
        <AppPage />
      </BrowserRouter>
    );

    const iframe = container.querySelector("iframe");
    expect(iframe).toBeTruthy();
    expect(iframe.src).toBe("https://example.com/other-app");
  });

  it("handles postMessage from iframe and updates parent URL", async () => {
    const { container } = render(
      <BrowserRouter>
        <AppPage />
      </BrowserRouter>
    );

    // Wait for iframe to be rendered
    await waitFor(() => {
      expect(container.querySelector("iframe")).toBeTruthy();
    });

    // Simulate postMessage from iframe
    const messageEvent = new MessageEvent("message", {
      data: {
        type: "urlUpdate",
        params: "household=67890&baseline=reform",
      },
      origin: "https://policyengine.github.io",
    });

    window.dispatchEvent(messageEvent);

    // Check that navigate was called with the new parameters
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        "/us/obbba-household-by-household?household=67890&baseline=reform",
        { replace: true }
      );
    });
  });

  it("ignores postMessage from unauthorized origins", async () => {
    render(
      <BrowserRouter>
        <AppPage />
      </BrowserRouter>
    );

    // Simulate postMessage from wrong origin
    const messageEvent = new MessageEvent("message", {
      data: {
        type: "urlUpdate",
        params: "household=99999",
      },
      origin: "https://malicious-site.com",
    });

    window.dispatchEvent(messageEvent);

    // Navigate should not have been called
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("does not reload iframe when URL is updated from iframe message", async () => {
    const { container } = render(
      <BrowserRouter>
        <AppPage />
      </BrowserRouter>
    );

    // Get initial iframe
    const iframe = container.querySelector("iframe");
    const initialSrc = iframe.src;

    // Simulate postMessage from iframe
    const messageEvent = new MessageEvent("message", {
      data: {
        type: "urlUpdate",
        params: "household=67890&baseline=reform",
      },
      origin: "https://policyengine.github.io",
    });

    window.dispatchEvent(messageEvent);

    // Wait a bit to ensure any potential re-render would have happened
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });

    // Check that iframe src hasn't changed (no reload)
    const iframeAfter = container.querySelector("iframe");
    expect(iframeAfter.src).toBe(initialSrc);
  });

  it("logs debug information when receiving URL updates", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    render(
      <BrowserRouter>
        <AppPage />
      </BrowserRouter>
    );

    // Simulate postMessage from iframe
    const messageEvent = new MessageEvent("message", {
      data: {
        type: "urlUpdate",
        params: "household=67890&baseline=reform",
      },
      origin: "https://policyengine.github.io",
    });

    window.dispatchEvent(messageEvent);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Received urlUpdate from iframe:",
        "household=67890&baseline=reform"
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        "Navigating to:",
        "/us/obbba-household-by-household?household=67890&baseline=reform"
      );
    });

    consoleSpy.mockRestore();
  });

  describe("URL synchronization sequence", () => {
    it("should handle rapid sequential URL updates correctly", async () => {
      render(
        <BrowserRouter>
          <AppPage />
        </BrowserRouter>
      );

      // Simulate rapid sequential messages
      const messages = [
        { household: "11111", baseline: "current" },
        { household: "22222", baseline: "current" },
        { household: "33333", baseline: "current" },
      ];

      for (const params of messages) {
        const messageEvent = new MessageEvent("message", {
          data: {
            type: "urlUpdate",
            params: new URLSearchParams(params).toString(),
          },
          origin: "https://policyengine.github.io",
        });

        window.dispatchEvent(messageEvent);
        
        // Small delay to simulate real-world timing
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      // Check that navigate was called for each update
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(3);
        expect(mockNavigate).toHaveBeenLastCalledWith(
          "/us/obbba-household-by-household?household=33333&baseline=current",
          { replace: true }
        );
      });
    });
  });
});