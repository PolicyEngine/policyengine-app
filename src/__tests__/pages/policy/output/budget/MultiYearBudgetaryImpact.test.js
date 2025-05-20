// window.matchMedia used in Ant Design Table components
import { render, screen } from "@testing-library/react";
import MultiYearBudgetaryImpact, {
  getYearlyImpacts,
  getYearRangeFromArray,
  roundToBillions,
} from "pages/policy/output/budget/MultiYearBudgetaryImpact";
import "@testing-library/jest-dom";
import data from "../../../../__setup__/data.json";

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
        firstInterval: 200,
      },
      result: {
        budget: {
          budgetary_impact: 5e9,
          benefit_spending_impact: 6e9,
          tax_revenue_impact: 7e9,
          state_tax_revenue_impact: 8e9,
        },
      },
    },
    {
      simulationRequestSetup: {
        year: 2021,
        path: "/api/simulation",
        body: null,
        interval: 1000,
        firstInterval: 200,
      },
      result: {
        budget: {
          budgetary_impact: 9e9,
          benefit_spending_impact: 10e9,
          tax_revenue_impact: 11e9,
          state_tax_revenue_impact: 12e9,
        },
      },
    },
  ];

  const mockImpact = {
    budget: {
      budgetary_impact: 13e9,
      benefit_spending_impact: 14e9,
      tax_revenue_impact: 15e9,
      state_tax_revenue_impact: 16e9,
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
        2020: String(mockSingleYearResults[0].result.budget[budgetKey] / 1e9),
        2021: String(mockSingleYearResults[1].result.budget[budgetKey] / 1e9),
      });
    });

    test("getYearRangeFromArray should format year range correctly", () => {
      // Given
      const years = [2020, 2021, 2022, 2023, 2024];
      const yearsMerged = "2020-24";

      // When
      const result = getYearRangeFromArray(years);

      // Then
      expect(result).toBe(yearsMerged);
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
        region: "us",
      };

      // When
      render(<MultiYearBudgetaryImpact {...props} />);

      // Then
      expect(
        screen.getByText("Test Policy in the US, 2020-21"),
      ).toBeInTheDocument();
    });

    test("should render table with correct columns", () => {
      // Given
      const props = {
        impact: mockImpact,
        singleYearResults: mockSingleYearResults,
        metadata: mockMetadata,
        policyLabel: "Test Policy",
        region: "us",
      };

      // When
      render(<MultiYearBudgetaryImpact {...props} />);

      // Then
      expect(
        screen.getByText("Net revenue impact (billions)"),
      ).toBeInTheDocument();
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
        region: "us",
      };

      const expectedHeaders = [
        "Federal tax",
        "Benefits",
        "Federal budget",
        "State tax",
      ];

      // When
      render(<MultiYearBudgetaryImpact {...props} />);

      // Make sure all headers render
      expectedHeaders.forEach((header) => {
        expect(screen.getByText(header)).toBeInTheDocument();
      });

      // Check for expected values from mock impacts
      expect(
        screen.getByText(mockImpact.budget.budgetary_impact / 1e9),
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockImpact.budget.benefit_spending_impact / 1e9),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          mockSingleYearResults[0].result.budget.budgetary_impact / 1e9,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          mockSingleYearResults[1].result.budget.budgetary_impact / 1e9,
        ),
      ).toBeInTheDocument();
    });
  });
});
