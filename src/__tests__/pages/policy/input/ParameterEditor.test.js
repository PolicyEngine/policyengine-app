import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ParameterEditor from "../../../../pages/policy/input/ParameterEditor";
import { BrowserRouter } from "react-router-dom";

// Mock the react-plotly.js library to avoid rendering the actual Plotly component during tests
jest.mock("react-plotly.js", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-plot">Mock Plot Component</div>,
  };
});

// Example metadata to be used as props for the ParameterEditor component
const metadata = {
  parameters: {
    exampleParameter: {
      label: "Example Parameter",
      description: "This is an example parameter.",
      period: "monthly",
      values: {
        "2024-01-01": 10,
        "2024-02-01": 20,
      },
      unit: "bool",
    },
  },
  countryId: "us",
  economy_options: {
    time_period: [{ name: "2020" }, { name: "2021" }, { name: "2022" }],
  },
};

// Example policy data to be used as props for the ParameterEditor component
const policy = {
  reform: {
    data: {
      exampleParameter: {
        "2024-01-01.2024-01-31": true,
        "2024-02-01.2024-02-28": false,
      },
    },
  },
};

// Parameter name to be used as a prop for the ParameterEditor component
const parameterName = "exampleParameter";

// Test suite for the ParameterEditor component
describe("ParameterEditor", () => {
  // Test case to check if the ParameterEditor component renders correctly
  test("renders ParameterEditor component", () => {
    render(
      <BrowserRouter>
        <ParameterEditor
          metadata={metadata}
          policy={policy}
          parameterName={parameterName}
        />
        ,
      </BrowserRouter>,
    );
  });
});
