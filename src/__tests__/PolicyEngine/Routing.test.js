import { render } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import PolicyEngine from "../../PolicyEngine";


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

describe("PolicyEngine routing", () => {
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
});