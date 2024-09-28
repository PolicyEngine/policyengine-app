import "@testing-library/jest-dom";
import { render, waitFor, act, screen } from "@testing-library/react";
import CookieConsent from "modals/CookieConsent";

// Mock external dependencies
jest.mock("react-plotly.js", () => jest.fn());
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: () => [new URLSearchParams()],
}));

// Mock framer-motion to prevent animation issues
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

// Mock useDisplayCategory hook
jest.mock("../hooks/useDisplayCategory", () => () => "desktop");

describe("Test cookie consent pop-up", () => {
  beforeEach(() => {
    document.cookie = "consent=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    jest.useFakeTimers();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  test("Pop-up appears without cookie existing", async () => {
    act(() => {
      render(<CookieConsent />);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      const popup = screen.queryByTestId("cookie-consent-popup");
      console.log("Popup element:", popup);
      expect(popup).toBeInTheDocument();
    }, { timeout: 2000 });

    const acceptButton = screen.queryByTestId("accept-cookies-button");
    console.log("Accept button:", acceptButton);
    expect(acceptButton).toBeInTheDocument();

    const declineButton = screen.queryByTestId("decline-cookies-button");
    console.log("Decline button:", declineButton);
    expect(declineButton).toBeInTheDocument();
  });

  test("Pop-up does not appear if cookies have been accepted", async () => {
    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: "consent=granted;max-age=31536000;path=/",
    });

    act(() => {
      render(<CookieConsent />);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      const popup = screen.queryByTestId("cookie-consent-popup");
      console.log("Popup element (should be null):", popup);
      expect(popup).toBeNull();
    }, { timeout: 2000 });
  });

  afterEach(() => {
    document.cookie = "consent=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    jest.useRealTimers();
    console.log.mockRestore();
  });
});