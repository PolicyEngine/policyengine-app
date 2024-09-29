import { render } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import PolicyEngine from "../../PolicyEngine";


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

describe("PolicyEngine special pages", () => {
  test("Routes to donate page for UK", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/uk/donate",
      origin: "https://www.policyengine.org/uk/donate",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(getByText("The Difference Your Support Makes")).toBeInTheDocument();
  });

  test("Routes to user profile page if supplied with a user ID for UK", () => {
    const testUserId = "1";

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: `/uk/profile/${testUserId}`,
      origin: `https://www.policyengine.org/uk/profile/${testUserId}`,
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(getByText("Profile")).toBeInTheDocument();
  });

  test("Routes to API documentation page for US", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/api",
      origin: "https://www.policyengine.org/us/api",
    };

    const { getByText } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    expect(getByText("PolicyEngine API Documentation")).toBeInTheDocument();
  });

  test("Routes to TRAFWA calculator", () => {
    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(), jest.fn()];
    });

    window.location = {
      ...window.location,
      pathname: "/us/trafwa-ctc-calculator",
      origin: "https://www.policyengine.org/us/trafwa-ctc-calculator",
    };

    const { getByTitle } = render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
      );

      expect(getByTitle("TRAFWA Child Tax Credit Calculator")).toBeInTheDocument();
    });
  
    test("Routes to Citizens Economic Council page", () => {
      useSearchParams.mockImplementation(() => {
        return [new URLSearchParams(), jest.fn()];
      });
  
      window.location = {
        ...window.location,
        pathname: "/uk/cec",
        origin: "https://www.policyengine.org/uk/cec",
      };
  
      const { getByTitle } = render(
        <BrowserRouter>
          <PolicyEngine />
        </BrowserRouter>
      );
  
      expect(getByTitle("Citizens' Economic Council reform simulator")).toBeInTheDocument();
    });
  });