import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ParameterEditor from "../../../../pages/policy/input/ParameterEditor";
import { getNewPolicyId } from "../../../../api/parameters";
import { useSearchParams } from "react-router-dom";

// Mock the required modules and components
jest.mock("react-router-dom", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("../../../../api/parameters", () => ({
  getNewPolicyId: jest.fn(),
}));

jest.mock("../../../../pages/policy/input/ResetButton", () => ({
  __esModule: true,
  default: ({ onReset }) => (
    <button data-testid="reset-button" onClick={onReset}>
      Reset
    </button>
  ),
}));

// Mock other components and functions used in ParameterEditor
jest.mock("../../../../layout/CenteredMiddleColumn", () => ({
  __esModule: true,
  default: ({ children }) => (
    <div data-testid="centered-column">{children}</div>
  ),
}));

jest.mock("../../../../pages/policy/input/ParameterOverTime", () => ({
  __esModule: true,
  default: () => <div data-testid="parameter-over-time">Chart</div>,
}));

// Mock a simplified IntervalMap implementation
jest.mock("../../../../algorithms/IntervalMap", () => ({
  IntervalMap: class {
    constructor(values) {
      this.values = values;
    }
    copy() {
      return new this.constructor(this.values);
    }
    set() {}
    get() {
      return 0;
    }
    minus() {
      return [];
    }
  },
}));

describe("ParameterEditor Reset Functionality", () => {
  const mockSetSearchParams = jest.fn();
  const mockParameter = {
    label: "Test Parameter",
    description: "A test parameter",
    values: { "2023-01-01": 100 },
    unit: "currency-USD",
    period: "yearly",
    economy: true,
  };

  const mockProps = {
    metadata: {
      parameters: {
        testParam: mockParameter,
      },
      countryId: "us",
      economy_options: {
        time_period: [{ name: 2023 }, { name: 2024 }],
      },
    },
    policy: {
      reform: {
        data: {
          testParam: { "2023-01-01.2023-12-31": 150 },
        },
      },
    },
    parameterName: "testParam",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    useSearchParams.mockReturnValue([
      new URLSearchParams({ reform: "test-reform-id" }),
      mockSetSearchParams,
    ]);

    getNewPolicyId.mockResolvedValue({
      status: "ok",
      policy_id: "new-reform-id",
    });
  });

  it("resets parameter when reset button is clicked", async () => {
    render(<ParameterEditor {...mockProps} />);

    // Find and click the reset button
    const resetButton = screen.getByTestId("reset-button");
    fireEvent.click(resetButton);

    // Verify the API call was made with the correct parameters
    expect(getNewPolicyId).toHaveBeenCalledWith(
      "us", // countryId
      {}, // Empty reforms object after removing testParam
    );

    // Wait for the promise to resolve and check if search params were updated
    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalled();
      // The mock implementation doesn't let us easily check exact params,
      // but we can at least verify it was called
    });
  });

  it("keeps existing reforms when resetting a specific parameter", async () => {
    const propsWithMultipleReforms = {
      ...mockProps,
      policy: {
        reform: {
          data: {
            testParam: { "2023-01-01.2023-12-31": 150 },
            otherParam: { "2023-01-01.2023-12-31": 200 },
          },
        },
      },
    };

    render(<ParameterEditor {...propsWithMultipleReforms} />);

    const resetButton = screen.getByTestId("reset-button");
    fireEvent.click(resetButton);

    // Verify the API call was made with just the otherParam reform
    expect(getNewPolicyId).toHaveBeenCalledWith("us", {
      otherParam: { "2023-01-01.2023-12-31": 200 },
    });

    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalled();
    });
  });

  it("removes the reform query parameter when no reforms remain", async () => {
    render(<ParameterEditor {...mockProps} />);

    // Set up the search params mock to capture the argument
    let capturedSearchParams;
    mockSetSearchParams.mockImplementation((params) => {
      capturedSearchParams = params;
    });

    const resetButton = screen.getByTestId("reset-button");
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalled();
      expect(capturedSearchParams.has("reform")).toBeFalsy();
    });
  });
});
