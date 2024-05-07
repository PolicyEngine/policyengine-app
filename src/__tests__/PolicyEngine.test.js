import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import fetch from "node-fetch";

import PolicyEngine from "../redesign/components/PolicyEngine";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
  };
});

jest.mock("react-plotly.js", () => jest.fn());

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
  };
});

let metadataUS = null;
let metadataUK = null;

const {location} = window;

beforeAll(async () => {
  const res = await fetch("https://api.policyengine.org/us/metadata");
  const metadataRaw = await res.json();
  metadataUS = metadataRaw.result;

  const resUK = await fetch("https://api.policyengine.org/uk/metadata");
  const metadataRawUK = await resUK.json();
  metadataUK = metadataRawUK.result;

  window.scrollTo = jest.fn();

  delete window.location;
  window.location = {
    reload: jest.fn()
  };
});

afterAll(() => {
  window.location = location;
});

describe("Test main PolicyEngine component", () => {
  test("Renders for US if proper data passed", () => {

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us",
      origin: "https://www.policyengine.org/us"
    };

    const {getByText} = render(
    <BrowserRouter>
      <PolicyEngine />
    </BrowserRouter>);

    expect(getByText("Computing Public Policy for Everyone")).toBeInTheDocument();
    expect(getByText("Trusted across the US")).toBeInTheDocument();

  });
  test("Renders for UK if proper data passed", () => {

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk",
      origin: "https://www.policyengine.org/uk"
    };

    const {getByText} = render(
    <BrowserRouter>
      <PolicyEngine />
    </BrowserRouter>);

    expect(getByText("Computing Public Policy for Everyone")).toBeInTheDocument();
    expect(getByText("Trusted across the UK")).toBeInTheDocument();
  });
  /*
  test("Metadata re-fetches if country ID changes");
  test("Fetches baseline policy data");
  test("Fetches reform policy data");
  test("Fetches user profile if user is logged in");
  test("Redirects from / to /[countryId]");
  test("Loads auth callback");
  */
  test("Loads about page for US", () => {

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/about",
      origin: "https://www.policyengine.org/us/about"
    };

    const {getByText} = render(
    <BrowserRouter>
      <PolicyEngine />
    </BrowserRouter>);

    expect(getByText("Our people")).toBeInTheDocument();
  });
  test("Loads jobs page for UK", () => {

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/jobs",
      origin: "https://www.policyengine.org/uk/jobs"
    };

    const {getByText} = render(
    <BrowserRouter>
      <PolicyEngine />
    </BrowserRouter>);

    expect(getByText("Join Our Team")).toBeInTheDocument();
  });
  test("Loads testimonials page for US", () => {

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/testimonials",
      origin: "https://www.policyengine.org/us/testimonials"
    };

    const {getByText} = render(
    <BrowserRouter>
      <PolicyEngine />
    </BrowserRouter>);

    expect(getByText("What people say about PolicyEngine")).toBeInTheDocument();
  });
  test("Loads calculator interstitial page for UK", () => {

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/calculator",
      origin: "https://www.policyengine.org/uk/calculator"
    };

    const {getByText} = render(
    <BrowserRouter>
      <PolicyEngine />
    </BrowserRouter>);

    expect(getByText("Choose a calculator")).toBeInTheDocument();
  });
  test("Loads research page for US", () => {

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/research",
      origin: "https://www.policyengine.org/us/research"
    };

    const {getByText} = render(
    <BrowserRouter>
      <PolicyEngine />
    </BrowserRouter>);

    expect(getByText("Research and analysis")).toBeInTheDocument();
    // The below test should be re-enabled when tags on the page are no longer text nodes
    // inside divs, which does not follow proper semantic HTML and cannot be tested using getByText
    // expect(getByText("us")).toBeInTheDocument(); 

  });
  test("Loads research page for UK", () => {

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/research",
      origin: "https://www.policyengine.org/uk/research"
    };

    const {getByText} = render(
    <BrowserRouter>
      <PolicyEngine />
    </BrowserRouter>);

    expect(getByText("Research and analysis")).toBeInTheDocument();
    // The below test should be re-enabled when tags on the page are no longer text nodes
    // inside divs, which does not follow proper semantic HTML and cannot be tested using getByText
    // expect(getByText("uk")).toBeInTheDocument(); 
  });
  /*
  test("Loads contact page for US");
  test("Loads donate page");
  test("Loads individual blog posts");
  test("Loads privacy page");
  test("Loads T&C page");
  test("Loads household page");
  test("Loads policy page");
  test("Loads user profile page");
  test("Loads API documentation page");
  test("Loads TRAFWA calculator");
  test("Loads Citizens Economic Council page");
  test("Redirects from /countryId/blog/slug to /countryId/research/slug");
  test("Redirects for unrecognized paths");
  */
});