/** This test file is designed to identify if any upstream changes break the next and previous buttons in the mobile view. It tests
 * to ensure the flattenTree function works correctly, that buttons are present as expected, and that when buttons click the focus
 * updates as expected.
 */

import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import HOUSEHOLD_OUTPUT_TREE from "../../../../pages/household/output/tree";
import { flattenTree } from "../../../../layout/MobileCalculatorPage";
import { MobileBottomNavButtons } from "../../../../layout/MobileCalculatorPage";

jest.mock("react-plotly.js", () => jest.fn());

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

const setSearchParams = jest.fn();

useSearchParams.mockReturnValue([new URLSearchParams(), setSearchParams]);

const metadata = {};

/** Ensure flattenTree function is working correctly with tree file. If file format changes
 * should break this test since it includes all current pages in the test.
 */

describe("flattenTree Integration Tests", () => {
  test("should flatten HOUSEHOLD_OUTPUT_TREE correctly", () => {
    const flattenedTree = flattenTree(HOUSEHOLD_OUTPUT_TREE);

    expect(flattenedTree).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "householdOutput.netIncome",
          label: "Net income",
        }),
        expect.objectContaining({
          name: "householdOutput.earnings",
          label: "Varying your earnings",
        }),
        expect.objectContaining({
          name: "householdOutput.mtr",
          label: "Marginal tax rates",
        }),
        expect.objectContaining({
          name: "householdOutput.pythonReproducibility",
          label: "Reproduce in Python",
        }),
      ]),
    );

    // Additional assertions can be added here
  });
});

/** Ensure previous and next buttons are present as expected. This tests uses values from the upstream
 * files to population "options" and tests each value in the array to ensure that the previous/next
 * buttons are present as expected.
 */

describe("MobileBottomNavButtons Component button render", () => {
  const options = flattenTree(HOUSEHOLD_OUTPUT_TREE[0].children);

  test("Previous button is not present at first index", () => {
    const focus = options[0].name;

    // Render the component with the current focus
    const { unmount } = render(
      <MemoryRouter>
        <MobileBottomNavButtons
          focus={focus}
          type="household"
          metadata={metadata}
        />
      </MemoryRouter>,
    );

    // Check the absence of the previous button
    const prevButton = screen.queryByTestId("prev-button");
    expect(prevButton).not.toBeInTheDocument();

    // Check the presence of the next button
    const nextButton = screen.queryByTestId("next-button");
    expect(nextButton).toBeInTheDocument();

    unmount();
  });

  test("Next button is not present at the last index", () => {
    const focus = options[options.length - 1].name;

    // Render the component with the last focus
    const { unmount } = render(
      <MemoryRouter>
        <MobileBottomNavButtons
          focus={focus}
          type="household"
          metadata={metadata}
        />
      </MemoryRouter>,
    );

    // Check the absence of the next button
    const nextButton = screen.queryByTestId("next-button");
    expect(nextButton).not.toBeInTheDocument();

    // Check the presence of the previous button
    const prevButton = screen.queryByTestId("prev-button");
    expect(prevButton).toBeInTheDocument();

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
            type="household"
            metadata={metadata}
          />
        </MemoryRouter>,
      );

      // Check the presence of both buttons
      const prevButton = screen.queryByTestId("prev-button");
      expect(prevButton).toBeInTheDocument();

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

// Next button
describe("MobileBottomNavButtons Component button click next", () => {
  test("focus is updated to the next option.name when the next button is clicked", () => {
    const options = flattenTree(HOUSEHOLD_OUTPUT_TREE[0].children);

    for (let index = 0; index < options.length - 1; index++) {
      const focus = options[index].name;

      // Render the component with the initial focus
      const { unmount } = render(
        <MemoryRouter>
          <MobileBottomNavButtons
            focus={focus}
            type="household"
            metadata={metadata}
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

// Previous button

describe("MobileBottomNavButtons Component button click prev", () => {
  test("focus is updated to the previous option.name when the previous button is clicked", () => {
    const options = flattenTree(HOUSEHOLD_OUTPUT_TREE[0].children);

    for (let index = 1; index < options.length; index++) {
      const focus = options[index].name;

      // Render the component with the initial focus
      const { unmount } = render(
        <MemoryRouter>
          <MobileBottomNavButtons
            focus={focus}
            type="household"
            metadata={metadata}
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
