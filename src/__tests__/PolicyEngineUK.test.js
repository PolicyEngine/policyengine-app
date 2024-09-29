import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";

import PolicyEngine from "../PolicyEngine";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
  };
});

jest.mock("react-plotly.js", () => jest.fn());

const { location } = window;

beforeAll(() => {
  window.scrollTo = jest.fn();

  delete window.location;
  window.location = {
    reload: jest.fn(),
  };
});

afterAll(() => {
  window.location = location;
  jest.resetAllMocks();
});

describe("PolicyEngine UK Routes", () => {
  test("Renders for UK if proper data passed", () => {
    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

    window.location = {
      ...window.location,
      pathname: "/uk",
      origin: "https://www.policyengine.org/uk",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(
      getByText("Computing Public Policy for Everyone"),
    ).toBeInTheDocument();
    expect(getByText("Trusted across the UK")).toBeInTheDocument();
  });

  test("Routes to calculator interstitial page for UK", () => {
    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

    window.location = {
      ...window.location,
      pathname: "/uk/calculator",
      origin: "https://www.policyengine.org/uk/calculator",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("Choose a calculator")).toBeInTheDocument();
  });

  test("Routes to research page for UK", () => {
    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

    window.location = {
      ...window.location,
      pathname: "/uk/research",
      origin: "https://www.policyengine.org/uk/research",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("Research and analysis")).toBeInTheDocument();
    // The below test should be re-enabled when tags on the page are no longer text nodes
    // inside divs, which does not follow proper semantic HTML and cannot be tested using getByText
    // expect(getByText("uk")).toBeInTheDocument();
  });

  test("Routes to donate page for UK", () => {
    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

    window.location = {
      ...window.location,
      pathname: "/uk/donate",
      origin: "https://www.policyengine.org/uk/donate",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("The Difference Your Support Makes")).toBeInTheDocument();
  });

  test("Routes to privacy page for UK", () => {
    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

    window.location = {
      ...window.location,
      pathname: "/uk/privacy",
      origin: "https://www.policyengine.org/uk/privacy",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("Privacy")).toBeInTheDocument();
  });

  // Note: This test only determines if routing occurs;
  // more detailed testing should be done for the component itself
  test("Routes to policy page for UK", () => {
    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

    window.location = {
      ...window.location,
      pathname: "/uk/policy",
      origin: "https://www.policyengine.org/uk/policy",
    };

    const { queryByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(
      queryByText("Computing Public Policy for Everyone"),
    ).not.toBeInTheDocument();
  });

  test("Routes to user profile page if supplied with a user ID for UK", () => {
    const testUserId = "1";

    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

    window.location = {
      ...window.location,
      pathname: `/uk/profile/${testUserId}`,
      origin: `https://www.policyengine.org/uk/profile/${testUserId}`,
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("Profile")).toBeInTheDocument();
  });

  test("Routes to Citizens Economic Council page", () => {
    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

    window.location = {
      ...window.location,
      pathname: "/uk/cec",
      origin: "https://www.policyengine.org/uk/cec",
    };

    const { getByTitle } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(
      getByTitle("Citizens' Economic Council reform simulator"),
    ).toBeInTheDocument();
  });
});
