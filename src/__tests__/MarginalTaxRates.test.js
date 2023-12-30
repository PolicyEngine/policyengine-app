import { render, screen } from "@testing-library/react";
import MarginalTaxRates from "pages/household/output/MarginalTaxRates";
import { useSearchParams } from "react-router-dom";

jest.mock("react-plotly.js", () => jest.fn());
jest.mock("../api/variables.js", () => ({
  getValueFromHousehold: jest.fn(),
  getPlotlyAxisFormat: jest.fn(),
}));
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
  };
});

const householdInput = {
  people: {
    you: {
      employment_income: {
        2024: {},
      },
    },
  },
};

const metadata = {
  countryId: "us",
};

const policy = {
  baseline: {
    data: {},
  },
  reform: {
    data: {},
  },
};

describe("Test Render Output", () => {
  test("Should render description", () => {
    useSearchParams.mockImplementation(() => {
      const get = (param) => {
        if (param === "focus") {
          return "householdOutput.mtr";
        } else if (param === "reform") {
          return "13870";
        } else if (param === "baseline") {
          return "13867";
        } else if (param === "household") {
          return "33253";
        }
      };
      return [{ get }];
    });
    render(
      <MarginalTaxRates
        householdInput={householdInput}
        metadata={metadata}
        policy={policy}
      />,
    );
    expect(
      screen.getByText(
        "This chart shows how your marginal tax rate changes under different earnings. It is based on your household's current situation.",
      ),
    ).toBeTruthy();
  });
});

//TODO: Either render plots here or in own test files for validation
