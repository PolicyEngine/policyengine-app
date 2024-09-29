import { render } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import PolicyEngine from "../../PolicyEngine";


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

describe("PolicyEngine home pages", () => {
  test("Routes to about page for US", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/about",
      origin: "https://www.policyengine.org/us/about",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(getByText("Our people")).toBeInTheDocument();
  });

  test("Routes to testimonials page for US", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/testimonials",
      origin: "https://www.policyengine.org/us/testimonials",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(getByText("What people say about PolicyEngine")).toBeInTheDocument();
  });
});