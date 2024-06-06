// src/components/ParameterEditor.test.jsx

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ParameterEditor from "../../../../pages/policy/input/ParameterEditor";
import { BrowserRouter } from "react-router-dom";

global.URL.createObjectURL = jest.fn();

jest.mock("react-plotly.js", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-plot">Mock Plot Component</div>,
  };
});

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
  countryId: "exampleCountryId",
  economy_options: {
    time_period: [{ name: "2020" }, { name: "2021" }, { name: "2022" }],
  },
};

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

const parameterName = "exampleParameter";

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
