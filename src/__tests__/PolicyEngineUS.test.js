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

describe("PolicyEngine US Routes", () => {
  test("Renders for US if proper data passed", () => {
    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

    window.location = {
      ...window.location,
      pathname: "/us",
      origin: "https://www.policyengine.org/us",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(
      getByText("Computing Public Policy for Everyone"),
    ).toBeInTheDocument();
    expect(getByText("Trusted across the US")).toBeInTheDocument();
  });

  test("Routes to about page for US", () => {
    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

    window.location = {
      ...window.location,
      pathname: "/us/about",
      origin: "https://www.policyengine.org/us/about",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("Our people")).toBeInTheDocument();
  });

  test("Routes to testimonials page for US", () => {
    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

    window.location = {
      ...window.location,
      pathname: "/us/testimonials",
      origin: "https://www.policyengine.org/us/testimonials",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("What people say about PolicyEngine")).toBeInTheDocument();
  });

  test("Routes to research page for US", () => {
    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

    window.location = {
      ...window.location,
      pathname: "/us/research",
      origin: "https://www.policyengine.org/us/research",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("Research and analysis")).toBeInTheDocument();
    // The below test should be re-enabled when tags on the page are no longer text nodes
    // inside divs, which does not follow proper semantic HTML and cannot be tested using getByText
    // expect(getByText("us")).toBeInTheDocument();
  });

  test("Routes to T&C page for US", () => {
    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

    window.location = {
      ...window.location,
      pathname: "/us/terms",
      origin: "https://www.policyengine.org/us/terms",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("Terms of Service")).toBeInTheDocument();
  });

  // Note: This test only determines if routing occurs;
  // more detailed testing should be done for the component itself
  test("Routes to household page for US", () => {
    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

    window.location = {
      ...window.location,
      pathname: "/us/household",
      origin: "https://www.policyengine.org/us/household",
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

  test("Routes to API documentation page for US", () => {
    // This test uses node-fetch to actually fetch country metadata,
    // but can't use fetch to fetch the API component's sample data,
    // and since it's not possible to conditionally polyfill fetch,
    // this is a better way of silencing the inevitable 404 error
    jest.spyOn(console, "error").mockImplementation(() => {});

    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

    window.location = {
      ...window.location,
      pathname: "/us/api",
      origin: "https://www.policyengine.org/us/api",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(getByText("PolicyEngine API Documentation")).toBeInTheDocument();
  });

  test("Routes to TRAFWA calculator", () => {
    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

    window.location = {
      ...window.location,
      pathname: "/us/trafwa-ctc-calculator",
      origin: "https://www.policyengine.org/us/trafwa-ctc-calculator",
    };

    const { getByTitle } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(
      getByTitle("TRAFWA Child Tax Credit Calculator"),
    ).toBeInTheDocument();
  });
});
