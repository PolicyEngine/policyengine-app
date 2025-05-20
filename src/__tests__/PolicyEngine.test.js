import { BrowserRouter, useSearchParams } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import PolicyEngine from "../PolicyEngine";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
  };
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
  }),
);

afterEach(() => {
  global.fetch.mockClear();
});

describe("PolicyEngine.jsx", () => {
  test("Renders for US if proper data passed", () => {
    useSearchParams.mockImplementation(() => [
      new URLSearchParams(),
      jest.fn(),
    ]);

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
  test("Converts deprecated 'region=enhanced_us' URL search param to 'region=us' and 'dataset=enhanced_cps'", () => {
    const deprecatedEnhancedUsParams = new URLSearchParams({
      region: "enhanced_us",
      country_id: "us",
    });

    const updatedSearchParams = new URLSearchParams({
      country_id: "us",
      region: "us",
      dataset: "enhanced_cps",
    });

    const mockSearchParams = {
      get: jest.fn((key) => deprecatedEnhancedUsParams.get(key)),
      has: jest.fn((key) => deprecatedEnhancedUsParams.has(key)),
      delete: jest.fn((key) => deprecatedEnhancedUsParams.delete(key)),
      set: jest.fn((key, value) => {
        deprecatedEnhancedUsParams.set(key, value);
      }),
      [Symbol.iterator]: function () {
        return deprecatedEnhancedUsParams[Symbol.iterator]();
      },
    };

    const mockSetSearchParams = jest.fn();

    useSearchParams.mockImplementation(() => [
      mockSearchParams,
      mockSetSearchParams,
    ]);

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>,
    );

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    expect(mockSetSearchParams).toHaveBeenCalledWith(updatedSearchParams);
  });
});
