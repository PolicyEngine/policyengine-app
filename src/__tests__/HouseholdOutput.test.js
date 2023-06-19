import { render, screen } from "@testing-library/react";
import HousholdOutput from "../pages/household/output/HouseholdOutput.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import {
    formatVariableValue,
    getValueFromHousehold,
  } from "../api/variables.js";

const policy = {
    reform: {label: "Reform Label"},
    baseline: {label: "Baseline Label"}
}
const metadata={variables: {"household_net_income": {label: "variableName"}}};
const householdInput={};
const householdBaseline={};
const householdReform=true;

jest.mock("../api/variables.js", () => ({
    formatVariableValue: jest.fn(),
    getValueFromHousehold: jest.fn()
}));
jest.mock("react-plotly.js", () => jest.fn());
jest.mock("react-router-dom", () => {
    const originalModule = jest.requireActual("react-router-dom");
    return {
        __esModule: true,
        ...originalModule,
        useSearchParams: jest.fn()
    }
});


describe("Test Render Output", () => {
    test("Should render correct policy title", () => {
        useSearchParams.mockImplementation(() => {
            const get = (param) => {
                if (param === "focus") {
                    return "householdOutput.netIncome"
                } else if (param === "reform") {
                    return "13870"
                } else if (param === "baseline") {
                    return "13867"
                }
            }
            return [{get}];
        });
        
        render(
            <Router>
                <HousholdOutput 
                    policy = {policy}
                    metadata={metadata}
                    householdInput={householdInput}
                    householdBaseline={householdBaseline}
                    householdReform={householdReform}
                />
            </Router>
        );
        expect(screen.getByText(policy.reform.label + ' (compared against ' + policy.baseline.label, {exact: false})).toBeTruthy();
    });
});