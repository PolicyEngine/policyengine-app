// window.matchMedia used in Ant Design Table components
import { render, screen } from "@testing-library/react";
import MultiYearBudgetaryImpact, {
  getYearlyImpacts,
  getYearRangeFromArray,
  roundToBillions,
} from "pages/policy/output/budget/MultiYearBudgetaryImpact";
import "@testing-library/jest-dom";
import data from "../../../__setup__/data.json";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("MultiYearBudgetaryImpact", () => {
  const mockSingleYearResults = [
    {
      simulationRequestSetup: { 
        year: 2020,
        path: "/api/simulation",
        body: null,
        interval: 1000,
        firstInterval: 200
      },
      result: {
        budget: {
          budgetary_impact: 1.5e9,
          benefit_spending_impact: 2.3e9,
          tax_revenue_impact: 3.1e9,
          state_tax_revenue_impact: 0.8e9,
        },
      },
    },
    {
      simulationRequestSetup: { 
        year: 2021,
        path: "/api/simulation",
        body: null,
        interval: 1000,
        firstInterval: 200
      },
      result: {
        budget: {
          budgetary_impact: 9.7e9,
          benefit_spending_impact: 2.5e9,
          tax_revenue_impact: 3.3e9,
          state_tax_revenue_impact: 0.9e9,
        },
      },
    },
  ];

  const mockImpact = {
    budget: {
      budgetary_impact: 3.2e9,
      benefit_spending_impact: 4.8e9,
      tax_revenue_impact: 6.4e9,
      state_tax_revenue_impact: 1.7e9,
    },
  };

  describe("Utility Functions", () => {
    test("getYearlyImpacts should correctly format yearly impacts", () => {
      // Given
      const singleYearResults = mockSingleYearResults;
      const budgetKey = "budgetary_impact";

      // When
      const result = getYearlyImpacts(singleYearResults, budgetKey);

      // Then
      expect(result).toEqual({
        2020: "1.5",
        2021: "9.7",
      });
    });

    test("getYearRangeFromArray should format year range correctly", () => {
      // Given
      const years = [2020, 2021, 2022, 2023, 2024];

      // When
      const result = getYearRangeFromArray(years);

      // Then
      expect(result).toBe("2020-24");
    });

    test("roundToBillions should round numbers correctly", () => {
      // Given
      const number = 1.2345e9;
      const decimals = 2;

      // When
      const result = roundToBillions(number, decimals);

      // Then
      expect(result).toBe("1.23");
    });
  });

  describe("Component Behavior", () => {
    const mockMetadata = data["metadataUS"];

    test("should render with correct title", () => {
      // Given
      const props = {
        impact: mockImpact,
        singleYearResults: mockSingleYearResults,
        metadata: mockMetadata,
        policyLabel: "Test Policy",
        region: "us"
      };

      // When
      render(<MultiYearBudgetaryImpact {...props} />);

      // Then
      expect(screen.getByText("Test Policy in the US, 2020-21")).toBeInTheDocument();
    });

    test("should render table with correct columns", () => {
      // Given
      const props = {
        impact: mockImpact,
        singleYearResults: mockSingleYearResults,
        metadata: mockMetadata,
        policyLabel: "Test Policy",
        region: "us"
      };

      // When
      render(<MultiYearBudgetaryImpact {...props} />);

      // Then
      expect(screen.getByText("Net revenue impact (billions currency)")).toBeInTheDocument();
      expect(screen.getByText("2020")).toBeInTheDocument();
      expect(screen.getByText("2021")).toBeInTheDocument();
      expect(screen.getByText("2020-21")).toBeInTheDocument();
    });

    test("should render table with correct data", () => {
      // Given
      const props = {
        impact: mockImpact,
        singleYearResults: mockSingleYearResults,
        metadata: mockMetadata,
        policyLabel: "Test Policy",
        region: "us"
      };

      // When
      render(<MultiYearBudgetaryImpact {...props} />);

      // Then
      expect(screen.getByText("Federal tax")).toBeInTheDocument();
      expect(screen.getByText("Benefits")).toBeInTheDocument();
      expect(screen.getByText("Federal budget")).toBeInTheDocument();
      expect(screen.getByText("State tax")).toBeInTheDocument();
      expect(screen.getByText("1.5")).toBeInTheDocument();
      expect(screen.getByText("9.7")).toBeInTheDocument();
      expect(screen.getByText("3.2")).toBeInTheDocument();
    });
  });
});
