import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import PolicyEngine from "../PolicyEngine";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

jest.mock("react-plotly.js", () => jest.fn());

describe("Test PolicyEngine routing", () => {
  test("Routes to auth callback", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/callback",
      origin: "https://www.policyengine.org/callback",
    };

    const { queryByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(queryByText("Follow us on social media")).not.toBeInTheDocument();
  });

  test("Routes to about page for US", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/about",
      origin: "https://www.policyengine.org/us/about",
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(screen.getByText("Our people")).toBeInTheDocument();
  });

  test("Routes to calculator interstitial page for UK", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/calculator",
      origin: "https://www.policyengine.org/uk/calculator",
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(screen.getByText("Choose a calculator")).toBeInTheDocument();
  });

  test("Routes to research page for US", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/research",
      origin: "https://www.policyengine.org/us/research",
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(screen.getByText("Research and analysis")).toBeInTheDocument();
  });

  test("Routes to research page for UK", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/research",
      origin: "https://www.policyengine.org/uk/research",
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(screen.getByText("Research and analysis")).toBeInTheDocument();
  });

  test("Routes to household page for US", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/household",
      origin: "https://www.policyengine.org/us/household",
    };

    const { queryByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(queryByText("Computing Public Policy for Everyone")).not.toBeInTheDocument();
  });

  test("Routes to policy page for UK", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/policy",
      origin: "https://www.policyengine.org/uk/policy",
    };

    const { queryByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(queryByText("Computing Public Policy for Everyone")).not.toBeInTheDocument();
  });

  test("Routes to user profile page if supplied with a user ID for UK", () => {
    const testUserId = "1";

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: `/uk/profile/${testUserId}`,
      origin: `https://www.policyengine.org/uk/profile/${testUserId}`,
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  test("Routes to API documentation page for US", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/api",
      origin: "https://www.policyengine.org/us/api",
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/PolicyEngine API Documentation/i)).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  test("Routes to TRAFWA calculator", async () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/trafwa-ctc-calculator",
      origin: "https://www.policyengine.org/us/trafwa-ctc-calculator",
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/TRAFWA Child Tax Credit Calculator/i)).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  test("Routes to Citizens Economic Council page", async () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/cec",
      origin: "https://www.policyengine.org/uk/cec",
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Citizens' Economic Council reform simulator/i)).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});
