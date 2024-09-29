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

describe("PolicyEngine Auth Callback Route", () => {
  test("Routes to auth callback", () => {
    useSearchParams.mockImplementation(() => [new URLSearchParams(), jest.fn()]);

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
});