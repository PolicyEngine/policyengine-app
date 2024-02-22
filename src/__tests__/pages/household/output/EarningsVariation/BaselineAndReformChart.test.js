import { fireEvent, render, screen } from "@testing-library/react";
import BaselineAndReformChart from "pages/household/output/EarningsVariation/BaselineAndReformChart";
import { getValueFromHousehold } from "api/variables.js";

jest.mock("react-plotly.js", () => jest.fn());
jest.mock("../api/variables.js", () => ({
  getValueFromHousehold: jest.fn(),
  getPlotlyAxisFormat: jest.fn(),
}));

const metadata = {
  variables: {
    employment_income: {
      unit: "currency-USD",
    },
    household_net_income: {
      unit: "currency-USD",
    },
    abc: {
      unit: "currency-USD",
    },
  },
};

describe("Test Render Output", () => {
  test("Should render toggle", () => {
    getValueFromHousehold.mockImplementation(() => {
      const testResult = [1, 2, 3];
      return testResult;
    });
    render(<BaselineAndReformChart metadata={metadata} variable={"abc"} />);

    fireEvent.click(screen.getByRole("radio", { name: /Absolute change/i }));

    const diffButton = screen.getByRole("radio", { name: /Absolute change/i });

    expect(diffButton).toHaveProperty("checked", true);
  });

  //TODO: Add tests for actual plot components BaselineAndReformTogetherPlot & BaselineReformDeltaPlot
});
