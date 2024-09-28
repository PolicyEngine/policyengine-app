import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import PolicyEngine from "../PolicyEngine";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

jest.mock("react-plotly.js", () => jest.fn());

describe("Test main PolicyEngine component", () => {
  test("Renders for US if proper data passed", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us",
      origin: "https://www.policyengine.org/us",
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(screen.getByText("Computing Public Policy for Everyone")).toBeInTheDocument();
    expect(screen.getByText("Trusted across the US")).toBeInTheDocument();
  });

  test("Renders for UK if proper data passed", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk",
      origin: "https://www.policyengine.org/uk",
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(screen.getByText("Computing Public Policy for Everyone")).toBeInTheDocument();
    expect(screen.getByText("Trusted across the UK")).toBeInTheDocument();
  });
});