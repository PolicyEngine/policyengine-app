/** This test file is designed to identify if any upstream changes break the next and previous buttons in the mobile view. It tests
 * to ensure the flattenTree function works correctly, that buttons are present as expected, and that when buttons click the focus
 * updates as expected.
 */

import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import { getPolicyOutputTree } from "../../../../pages/policy/output/tree";
import { flattenTree } from "../../../../layout/MobileCalculatorPage";
import { MobileBottomNavButtons } from "../../../../layout/MobileCalculatorPage";
import { impactKeys } from "../../../../pages/policy/output/ImpactTypes.jsx";

jest.mock("react-plotly.js", () => jest.fn());

// Mock the utils module
jest.mock("../../../../pages/policy/output/utils", () => ({
  determineIfMultiYear: jest.fn().mockReturnValue(false),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

const setSearchParams = jest.fn();

useSearchParams.mockReturnValue([new URLSearchParams(), setSearchParams]);

// mock data
const mockMetadataUS = {
  countryId: "us", // Change this to test for different countries if needed
};

const mockMetadataUK = {
  countryId: "uk", // Change this to test for different countries if needed
};

/** Ensure flattenTree function is working correctly with tree file. If file format changes
 * should break this test since it includes all current pages in the test. , but it is possible it may not since only some files are included
 * in the check.
 */

describe("flattenTree Integration Tests", () => {
  test("should flatten POLICY_OUTPUT_TREE correctly for US", () => {
    const policyOutputTree = getPolicyOutputTree(mockMetadataUS.countryId);
    const flattenedTree = flattenTree(policyOutputTree);

    expect(flattenedTree).toEqual(
      expect.arrayContaining([
        // Policy Breakdown
        expect.objectContaining({
          name: "policyOutput.policyBreakdown",
          label: "Overview",
        }),
        // Budgetary Impact
        expect.objectContaining({
          name: "policyOutput.budgetaryImpact.overall",
          label: "Overall",
        }),
        // Distributional Impact
        expect.objectContaining({
          name: "policyOutput.distributionalImpact.incomeDecile.relative",
          label: "Relative",
        }),
        expect.objectContaining({
          name: "policyOutput.distributionalImpact.incomeDecile.average",
          label: "Average",
        }),
        // Winners and Losers
        expect.objectContaining({
          name: "policyOutput.winnersAndLosers.incomeDecile",
          label: "By income decile",
        }),
        // Poverty Impact (Regular)
        expect.objectContaining({
          name: "policyOutput.povertyImpact.regular.byAge",
          label: "By age",
        }),
        expect.objectContaining({
          name: "policyOutput.povertyImpact.regular.byGender",
          label: "By gender",
        }),
        expect.objectContaining({
          name: "policyOutput.povertyImpact.regular.byRace",
          label: "By race",
        }),
        // Poverty Impact (Deep)
        expect.objectContaining({
          name: "policyOutput.povertyImpact.deep.byAge",
          label: "By age",
        }),
        expect.objectContaining({
          name: "policyOutput.povertyImpact.deep.byGender",
          label: "By gender",
        }),
        // Inequality Impact
        expect.objectContaining({
          name: "policyOutput.inequalityImpact",
          label: "Inequality impact",
        }),
        // Labor Supply Impact
        expect.objectContaining({
          name: "policyOutput.laborSupplyImpact.earnings.overall.relative",
          label: "Relative",
        }),
        expect.objectContaining({
          name: "policyOutput.laborSupplyImpact.earnings.overall.absolute",
          label: "Absolute",
        }),
        expect.objectContaining({
          name: "policyOutput.laborSupplyImpact.earnings.byDecile.relative.total",
          label: "Total",
        }),
        expect.objectContaining({
          name: "policyOutput.laborSupplyImpact.earnings.byDecile.relative.income",
          label: "Income effect",
        }),
        expect.objectContaining({
          name: "policyOutput.laborSupplyImpact.earnings.byDecile.relative.substitution",
          label: "Substitution effect",
        }),
        expect.objectContaining({
          name: "policyOutput.laborSupplyImpact.earnings.byDecile.absolute.total",
          label: "Total",
        }),
        expect.objectContaining({
          name: "policyOutput.laborSupplyImpact.earnings.byDecile.absolute.income",
          label: "Income effect",
        }),
        expect.objectContaining({
          name: "policyOutput.laborSupplyImpact.earnings.byDecile.absolute.substitution",
          label: "Substitution effect",
        }),
        // AI Summary
        expect.objectContaining({
          name: "policyOutput.analysis",
          label: "AI summary (experimental)",
        }),
        // Code Reproducibility
        expect.objectContaining({
          name: "policyOutput.codeReproducibility",
          label: "Reproduce in Python",
        }),
      ]),
    );

    // Additional assertions can be added here
  });

  test("should flatten POLICY_OUTPUT_TREE correctly for UK", () => {
    const policyOutputTree = getPolicyOutputTree(mockMetadataUK.countryId);
    const flattenedTree = flattenTree(policyOutputTree);

    expect(flattenedTree).toEqual(
      expect.arrayContaining([
        // Policy Breakdown
        expect.objectContaining({
          name: "policyOutput.policyBreakdown",
          label: "Overview",
        }),
        // Budgetary Impact
        expect.objectContaining({
          name: "policyOutput.budgetaryImpact.overall",
          label: "Overall",
        }),
        expect.objectContaining({
          name: "policyOutput.budgetaryImpact.byProgram",
          label: "By program",
        }),
        // Distributional Impact
        expect.objectContaining({
          name: "policyOutput.distributionalImpact.incomeDecile.relative",
          label: "Relative",
        }),
        expect.objectContaining({
          name: "policyOutput.distributionalImpact.incomeDecile.average",
          label: "Average",
        }),
        expect.objectContaining({
          name: "policyOutput.distributionalImpact.wealthDecile.relative",
          label: "Relative",
        }),
        expect.objectContaining({
          name: "policyOutput.distributionalImpact.wealthDecile.average",
          label: "Average",
        }),
        // Winners and Losers
        expect.objectContaining({
          name: "policyOutput.winnersAndLosers.incomeDecile",
          label: "By income decile",
        }),
        expect.objectContaining({
          name: "policyOutput.winnersAndLosers.wealthDecile",
          label: "By wealth decile",
        }),
        // Poverty Impact (Regular)
        expect.objectContaining({
          name: "policyOutput.povertyImpact.regular.byAge",
          label: "By age",
        }),
        expect.objectContaining({
          name: "policyOutput.povertyImpact.regular.byGender",
          label: "By gender",
        }),
        // Poverty Impact (Deep)
        expect.objectContaining({
          name: "policyOutput.povertyImpact.deep.byAge",
          label: "By age",
        }),
        expect.objectContaining({
          name: "policyOutput.povertyImpact.deep.byGender",
          label: "By gender",
        }),
        // Inequality Impact
        expect.objectContaining({
          name: "policyOutput.inequalityImpact",
          label: "Inequality impact",
        }),
        // Labor Supply Impact
        expect.objectContaining({
          name: "policyOutput.laborSupplyImpact.earnings.overall.relative",
          label: "Relative",
        }),
        expect.objectContaining({
          name: "policyOutput.laborSupplyImpact.earnings.overall.absolute",
          label: "Absolute",
        }),
        expect.objectContaining({
          name: "policyOutput.laborSupplyImpact.earnings.byDecile.relative.total",
          label: "Total",
        }),
        expect.objectContaining({
          name: "policyOutput.laborSupplyImpact.earnings.byDecile.relative.income",
          label: "Income effect",
        }),
        expect.objectContaining({
          name: "policyOutput.laborSupplyImpact.earnings.byDecile.relative.substitution",
          label: "Substitution effect",
        }),
        expect.objectContaining({
          name: "policyOutput.laborSupplyImpact.earnings.byDecile.absolute.total",
          label: "Total",
        }),
        expect.objectContaining({
          name: "policyOutput.laborSupplyImpact.earnings.byDecile.absolute.income",
          label: "Income effect",
        }),
        expect.objectContaining({
          name: "policyOutput.laborSupplyImpact.earnings.byDecile.absolute.substitution",
          label: "Substitution effect",
        }),
        // AI Summary
        expect.objectContaining({
          name: "policyOutput.analysis",
          label: "AI summary (experimental)",
        }),
        // Code Reproducibility
        expect.objectContaining({
          name: "policyOutput.codeReproducibility",
          label: "Reproduce in Python",
        }),
      ]),
    );

    // Additional assertions can be added here
  });
});

/** US: Ensure previous and next buttons are present as expected. This tests uses values from the upstream
 * files to population "options" and tests each value in the array to ensure that the previous/next
 * buttons are present as expected.
 */

describe("MobileBottomNavButtons Component US", () => {
  let options = [];
  const validFocusValues = impactKeys;
  const POLICY_OUTPUT_TREE = getPolicyOutputTree(mockMetadataUS.countryId);
  const options_prep = flattenTree(POLICY_OUTPUT_TREE[0].children);

  options_prep.forEach((option, index) => {
    const optionName = option.name.replace("policyOutput.", "");
    if (
      optionName === "policyBreakdown" ||
      optionName === "codeReproducibility" ||
      validFocusValues.includes(optionName)
    ) {
      options.push(option);
    }
  });

  test("Previous button is not present at the first index (index = 0)", () => {
    const focus = options[0].name;

    // Render the component with the first focus
    const { unmount } = render(
      <MemoryRouter>
        <MobileBottomNavButtons
          focus={focus}
          type="policy"
          metadata={mockMetadataUS}
        />
      </MemoryRouter>,
    );

    // Check the presence of the Previous button
    const prevButton = screen.queryByTestId("prev-button");
    expect(prevButton).not.toBeInTheDocument();

    // Check the presence of the Next button
    const nextButton = screen.queryByTestId("next-button");
    expect(nextButton).toBeInTheDocument();

    unmount();
  });

  test("Next button is not present at the last index (index = length - 1)", () => {
    const focus = options[options.length - 1].name;

    // Render the component with the last focus
    const { unmount } = render(
      <MemoryRouter>
        <MobileBottomNavButtons
          focus={focus}
          type="policy"
          metadata={mockMetadataUS}
        />
      </MemoryRouter>,
    );

    // Check the presence of the Previous button
    const prevButton = screen.queryByTestId("prev-button");
    expect(prevButton).toBeInTheDocument();

    // Check the presence of the Next button
    const nextButton = screen.queryByTestId("next-button");
    expect(nextButton).not.toBeInTheDocument();

    unmount();
  });

  test("Next and Previous buttons are present for middle indices", () => {
    for (let index = 1; index < options.length - 1; index++) {
      const focus = options[index].name;

      // Render the component with the current focus
      const { unmount } = render(
        <MemoryRouter>
          <MobileBottomNavButtons
            focus={focus}
            type="policy"
            metadata={mockMetadataUS}
          />
        </MemoryRouter>,
      );

      // Check the presence of the Previous button
      const prevButton = screen.queryByTestId("prev-button");
      expect(prevButton).toBeInTheDocument();

      // Check the presence of the Next button
      const nextButton = screen.queryByTestId("next-button");
      expect(nextButton).toBeInTheDocument();

      unmount();
    }
  });
});

/** UK: Ensure previous and next buttons are present as expected. This tests uses values from the upstream
 * files to population "options" and tests each value in the array to ensure that the previous/next
 * buttons are present as expected.
 */

describe("MobileBottomNavButtons Component UK", () => {
  let options = [];
  const validFocusValues = impactKeys;
  const POLICY_OUTPUT_TREE = getPolicyOutputTree(mockMetadataUK.countryId);
  const options_prep = flattenTree(POLICY_OUTPUT_TREE[0].children);

  options_prep.forEach((option, index) => {
    const optionName = option.name.replace("policyOutput.", "");
    if (
      optionName === "policyBreakdown" ||
      optionName === "codeReproducibility" ||
      validFocusValues.includes(optionName)
    ) {
      options.push(option);
    }
  });

  test("Previous button is not present at the first index (index = 0)", () => {
    const focus = options[0].name;

    // Render the component with the first focus
    const { unmount } = render(
      <MemoryRouter>
        <MobileBottomNavButtons
          focus={focus}
          type="policy"
          metadata={mockMetadataUK}
        />
      </MemoryRouter>,
    );

    // Check the presence of the Previous button
    const prevButton = screen.queryByTestId("prev-button");
    expect(prevButton).not.toBeInTheDocument();

    // Check the presence of the Next button
    const nextButton = screen.queryByTestId("next-button");
    expect(nextButton).toBeInTheDocument();

    unmount();
  });

  test("Next button is not present at the last index (index = length - 1)", () => {
    const focus = options[options.length - 1].name;

    // Render the component with the last focus
    const { unmount } = render(
      <MemoryRouter>
        <MobileBottomNavButtons
          focus={focus}
          type="policy"
          metadata={mockMetadataUK}
        />
      </MemoryRouter>,
    );

    // Check the presence of the Previous button
    const prevButton = screen.queryByTestId("prev-button");
    expect(prevButton).toBeInTheDocument();

    // Check the presence of the Next button
    const nextButton = screen.queryByTestId("next-button");
    expect(nextButton).not.toBeInTheDocument();

    unmount();
  });

  test("Next and Previous buttons are present for middle indices", () => {
    for (let index = 1; index < options.length - 1; index++) {
      const focus = options[index].name;

      // Render the component with the current focus
      const { unmount } = render(
        <MemoryRouter>
          <MobileBottomNavButtons
            focus={focus}
            type="policy"
            metadata={mockMetadataUK}
          />
        </MemoryRouter>,
      );

      // Check the presence of the Previous button
      const prevButton = screen.queryByTestId("prev-button");
      expect(prevButton).toBeInTheDocument();

      // Check the presence of the Next button
      const nextButton = screen.queryByTestId("next-button");
      expect(nextButton).toBeInTheDocument();

      unmount();
    }
  });
});

/** Ensure previous and next buttons update focus as expected. This tests uses values from the upstream
 * files to population "options" and tests each value in the array to ensure that when the previous/next
 * button is pressed the navigation is updated as expected.
 */

// US Next button

describe("MobileBottomNavButtons Component button click next US", () => {
  const validFocusValues = impactKeys;
  const POLICY_OUTPUT_TREE = getPolicyOutputTree(mockMetadataUS.countryId);
  const options_prep = flattenTree(POLICY_OUTPUT_TREE[0].children);
  const options = [];
  options_prep.forEach((option, index) => {
    const optionName = option.name.replace("policyOutput.", "");
    if (
      optionName === "policyBreakdown" ||
      optionName === "codeReproducibility" ||
      validFocusValues.includes(optionName)
    ) {
      options.push(option);
    }
  });

  test("Except for last: focus is updated to the next option.name when the next button is clicked", () => {
    for (let index = 0; index < options.length - 1; index++) {
      const focus = options[index].name;

      // Render the component with the initial focus
      const { unmount } = render(
        <MemoryRouter>
          <MobileBottomNavButtons
            focus={focus}
            type="policy"
            metadata={mockMetadataUS}
          />
        </MemoryRouter>,
      );

      // Get the next button
      const nextButton = screen.getByTestId("next-button");

      // Simulate clicking the next button
      fireEvent.click(nextButton);

      // Assert that setSearchParams was called
      expect(setSearchParams).toHaveBeenCalled();

      // Extract the search params and assert the focus value
      const recentCallIndex = setSearchParams.mock.calls.length - 1;
      const searchParams = setSearchParams.mock.calls[recentCallIndex][0];
      const focusValue = searchParams.get("focus");

      expect(focusValue).toBe(options[index + 1].name);

      unmount();
    }
  });
});
// UK Next button

describe("MobileBottomNavButtons Component button click next UK", () => {
  test("Except for last: focus is updated to the next option.name when the next button is clicked", () => {
    const validFocusValues = impactKeys;
    const POLICY_OUTPUT_TREE = getPolicyOutputTree(mockMetadataUK.countryId);
    const options_prep = flattenTree(POLICY_OUTPUT_TREE[0].children);
    const options = [];
    options_prep.forEach((option, index) => {
      const optionName = option.name.replace("policyOutput.", "");
      if (
        optionName === "policyBreakdown" ||
        optionName === "codeReproducibility" ||
        validFocusValues.includes(optionName)
      ) {
        options.push(option);
      }
    });

    for (let index = 0; index < options.length - 1; index++) {
      const focus = options[index].name;

      // Render the component with the initial focus
      const { unmount } = render(
        <MemoryRouter>
          <MobileBottomNavButtons
            focus={focus}
            type="policy"
            metadata={mockMetadataUK}
          />
        </MemoryRouter>,
      );

      // Get the next button
      const nextButton = screen.getByTestId("next-button");

      // Simulate clicking the next button
      fireEvent.click(nextButton);

      // Assert that setSearchParams was called
      expect(setSearchParams).toHaveBeenCalled();

      // Extract the search params and assert the focus value
      const recentCallIndex = setSearchParams.mock.calls.length - 1;
      const searchParams = setSearchParams.mock.calls[recentCallIndex][0];
      const focusValue = searchParams.get("focus");

      expect(focusValue).toBe(options[index + 1].name);

      unmount();
    }
  });
});

// US Previous button
describe("MobileBottomNavButtons Component button click previous US", () => {
  test("focus is updated to the previous option.name when the previous button is clicked", () => {
    const validFocusValues = impactKeys;
    const POLICY_OUTPUT_TREE = getPolicyOutputTree(mockMetadataUS.countryId);
    const options_prep = flattenTree(POLICY_OUTPUT_TREE[0].children);
    const options = [];
    options_prep.forEach((option, index) => {
      const optionName = option.name.replace("policyOutput.", "");
      if (
        optionName === "policyBreakdown" ||
        optionName === "codeReproducibility" ||
        validFocusValues.includes(optionName)
      ) {
        options.push(option);
      }
    });

    for (let index = 1; index < options.length; index++) {
      const focus = options[index].name;

      // Render the component with the initial focus
      const { unmount } = render(
        <MemoryRouter>
          <MobileBottomNavButtons
            focus={focus}
            type="policy"
            metadata={mockMetadataUS}
          />
        </MemoryRouter>,
      );

      // Get the next button
      const prevButton = screen.getByTestId("prev-button");

      // Simulate clicking the next button
      fireEvent.click(prevButton);

      // Assert that setSearchParams was called
      expect(setSearchParams).toHaveBeenCalled();

      // Extract the search params and assert the focus value
      const recentCallIndex = setSearchParams.mock.calls.length - 1;
      const searchParams = setSearchParams.mock.calls[recentCallIndex][0];
      const focusValue = searchParams.get("focus");

      expect(focusValue).toBe(options[index - 1].name);

      unmount();
    }
  });
});

// UK Previous button
describe("MobileBottomNavButtons Component button click previous UK", () => {
  test("focus is updated to the previous option.name when the previous button is clicked", () => {
    const validFocusValues = impactKeys;
    const POLICY_OUTPUT_TREE = getPolicyOutputTree(mockMetadataUK.countryId);
    const options_prep = flattenTree(POLICY_OUTPUT_TREE[0].children);
    const options = [];
    options_prep.forEach((option, index) => {
      const optionName = option.name.replace("policyOutput.", "");
      if (
        optionName === "policyBreakdown" ||
        optionName === "codeReproducibility" ||
        validFocusValues.includes(optionName)
      ) {
        options.push(option);
      }
    });

    for (let index = 1; index < options.length; index++) {
      const focus = options[index].name;

      // Render the component with the initial focus
      const { unmount } = render(
        <MemoryRouter>
          <MobileBottomNavButtons
            focus={focus}
            type="policy"
            metadata={mockMetadataUK}
          />
        </MemoryRouter>,
      );

      // Get the next button
      const prevButton = screen.getByTestId("prev-button");

      // Simulate clicking the next button
      fireEvent.click(prevButton);

      // Assert that setSearchParams was called
      expect(setSearchParams).toHaveBeenCalled();

      // Extract the search params and assert the focus value
      const recentCallIndex = setSearchParams.mock.calls.length - 1;
      const searchParams = setSearchParams.mock.calls[recentCallIndex][0];
      const focusValue = searchParams.get("focus");

      expect(focusValue).toBe(options[index - 1].name);

      unmount();
    }
  });
});
