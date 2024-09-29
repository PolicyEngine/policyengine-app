import { render } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import PolicyEngine from "../../PolicyEngine";


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

describe("PolicyEngine rendering", () => {
  test("Renders for US if proper data passed", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us",
      origin: "https://www.policyengine.org/us",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

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
      origin: "https://www.policyengine.org/uk",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(getByText("Computing Public Policy for Everyone")).toBeInTheDocument();
    expect(getByText("Trusted across the UK")).toBeInTheDocument();
  });
});