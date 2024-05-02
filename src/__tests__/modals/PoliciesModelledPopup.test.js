import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
// External package imports
import fetch from "node-fetch";

import HouseholdOutput from "pages/household/output/HouseholdOutput";
import { createDefaultHousehold } from "../../api/variables";

jest.mock("react-plotly.js", () => jest.fn());

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
  };
});

let metadataUS = null;
beforeAll(async () => {
  const res = await fetch("https://api.policyengine.org/us/metadata");
  const metadataRaw = await res.json();
  metadataUS = metadataRaw.result;
});

describe("Test PoliciesModelledPopup", () => {
  test("Pop-up appears after beginning calculations", async () => {
    const testProps = {
      policy: {
        reform: {
          label: "testVal",
        },
        baseline: {
          label: "testVal",
        },
      },
    };

    let sampleHousehold = createDefaultHousehold(metadataUS);
    // The below is necessary to prevent a litany of 'quiet' errors that
    // will materialize in the console
    sampleHousehold.people.you.state_name = {
      2024: "az"
    };
    sampleHousehold.households["your household"].state_name = {
      2024: "az"
    }

    useSearchParams.mockImplementation(() => {
      const get = (param) => {
        if (param === "focus") {
          return "householdOutput.netIncome";
        } else if (param === "reform") {
          return "testVal";
        } else if (param === "baseline") {
          return "testVal";
        }
      };
      return [{ get }];
    });

    const { getByText } = render(
      <BrowserRouter>
        <HouseholdOutput loading={true} policy={testProps.policy} metadata={metadataUS} setHasShownHouseholdPopup={() => false} householdInput={sampleHousehold}/>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(
        getByText(
          "PolicyEngine results may not constitute exact tax liabilities or benefit entitlements.",
        ),
      ).toBeInTheDocument();
    })
  });
});