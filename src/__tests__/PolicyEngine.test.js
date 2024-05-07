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

  });
  /*
  test("Renders for UK if proper data passed");
  test("Metadata re-fetches if country ID changes");
  test("Fetches baseline policy data");
  test("Fetches reform policy data");
  test("Fetches user profile if user is logged in");
  test("Redirects from / to /[countryId]");
  test("Loads auth callback");
  test("Loads about page");
  test("Loads jobs page");
  test("Loads testimonials page");
  test("Loads calculator interstitial page");
  test("Loads research page");
  test("Loads contact page");
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