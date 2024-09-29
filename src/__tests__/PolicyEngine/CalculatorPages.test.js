import { render } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import PolicyEngine from "../../PolicyEngine";


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

describe("PolicyEngine calculator pages", () => {
  test("Routes to calculator interstitial page for UK", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/calculator",
      origin: "https://www.policyengine.org/uk/calculator",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(getByText("Choose a calculator")).toBeInTheDocument();
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
});