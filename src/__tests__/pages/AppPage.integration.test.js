import { render, act, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AppPage from "../../pages/AppPage";

// This integration test simulates the actual "one behind" issue
// where the iframe might be sending outdated parameters

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
  ],
}));

// Track navigation calls
const navigationHistory = [];
const mockNavigate = jest.fn((url) => {
  navigationHistory.push(url);
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ appName: "obbba-household-by-household" }),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    pathname: "/us/obbba-household-by-household",
    search: navigationHistory.length > 0 
      ? navigationHistory[navigationHistory.length - 1].split("?")[1] || ""
      : "?household=initial",
  }),
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

describe("AppPage Integration - One Behind Issue", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    navigationHistory.length = 0;
  });

  it("demonstrates the 'one behind' issue when iframe sends old state", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    
    render(
      <BrowserRouter>
        <AppPage />
      </BrowserRouter>
    );

    // Simulate the problematic sequence where iframe sends old state
    const sequence = [
      {
        iframeCurrentState: "household=12345",
        iframeSendsState: "household=initial", // Sends old state
        expectedParentUrl: "household=initial",
      },
      {
        iframeCurrentState: "household=67890",
        iframeSendsState: "household=12345", // Sends previous state
        expectedParentUrl: "household=12345",
      },
      {
        iframeCurrentState: "household=99999",
        iframeSendsState: "household=67890", // Sends previous state
        expectedParentUrl: "household=67890",
      },
    ];

    for (const step of sequence) {
      console.log(`\n--- Iframe shows: ${step.iframeCurrentState} ---`);
      console.log(`Iframe sends: ${step.iframeSendsState}`);
      
      // Simulate iframe sending the OLD state
      const messageEvent = new MessageEvent("message", {
        data: {
          type: "urlUpdate",
          params: step.iframeSendsState,
        },
        origin: "https://policyengine.github.io",
      });

      act(() => {
        window.dispatchEvent(messageEvent);
      });

      await waitFor(() => {
        const lastCall = mockNavigate.mock.calls[mockNavigate.mock.calls.length - 1];
        if (lastCall) {
          const urlParams = lastCall[0].split("?")[1];
          console.log(`Parent URL updated to: ${urlParams}`);
          expect(urlParams).toBe(step.expectedParentUrl);
        }
      });
    }

    console.log("\n--- Summary ---");
    console.log("The parent URL is always one step behind what the iframe displays!");
    console.log("This happens because the iframe sends its OLD state before updating internally.");

    consoleSpy.mockRestore();
  });

  it("shows correct behavior when iframe sends current state", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    
    render(
      <BrowserRouter>
        <AppPage />
      </BrowserRouter>
    );

    // Simulate the CORRECT sequence where iframe sends current state
    const sequence = [
      {
        iframeCurrentState: "household=12345",
        iframeSendsState: "household=12345", // Sends current state
        expectedParentUrl: "household=12345",
      },
      {
        iframeCurrentState: "household=67890",
        iframeSendsState: "household=67890", // Sends current state
        expectedParentUrl: "household=67890",
      },
    ];

    for (const step of sequence) {
      console.log(`\n--- Iframe shows: ${step.iframeCurrentState} ---`);
      console.log(`Iframe sends: ${step.iframeSendsState}`);
      
      const messageEvent = new MessageEvent("message", {
        data: {
          type: "urlUpdate",
          params: step.iframeSendsState,
        },
        origin: "https://policyengine.github.io",
      });

      act(() => {
        window.dispatchEvent(messageEvent);
      });

      await waitFor(() => {
        const lastCall = mockNavigate.mock.calls[mockNavigate.mock.calls.length - 1];
        if (lastCall) {
          const urlParams = lastCall[0].split("?")[1];
          console.log(`Parent URL updated to: ${urlParams}`);
          expect(urlParams).toBe(step.expectedParentUrl);
        }
      });
    }

    console.log("\n--- Summary ---");
    console.log("When iframe sends its CURRENT state, URLs stay in sync!");

    consoleSpy.mockRestore();
  });

  it("demonstrates timing issue with state updates", async () => {
    render(
      <BrowserRouter>
        <AppPage />
      </BrowserRouter>
    );

    // Simulate what might be happening in the iframe
    const simulateIframeClick = async (newHousehold) => {
      // 1. User clicks on household
      console.log(`User clicks household: ${newHousehold}`);
      
      // 2. Iframe might send message BEFORE updating its own state
      const oldState = navigationHistory.length > 0 
        ? navigationHistory[navigationHistory.length - 1].split("=")[1]
        : "initial";
      
      const messageEvent = new MessageEvent("message", {
        data: {
          type: "urlUpdate",
          params: `household=${oldState}`, // Sends OLD state!
        },
        origin: "https://policyengine.github.io",
      });

      window.dispatchEvent(messageEvent);
      
      // 3. Then iframe updates its own display
      console.log(`Iframe now displays: ${newHousehold} (but parent got: ${oldState})`);
    };

    // Simulate user interactions
    await simulateIframeClick("12345");
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
    
    await simulateIframeClick("67890");
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(2));
    
    // Verify the "one behind" pattern
    expect(mockNavigate).toHaveBeenNthCalledWith(1, 
      "/us/obbba-household-by-household?household=initial", 
      { replace: true }
    );
    expect(mockNavigate).toHaveBeenNthCalledWith(2, 
      "/us/obbba-household-by-household?household=initial", // Still showing first value!
      { replace: true }
    );
  });
});