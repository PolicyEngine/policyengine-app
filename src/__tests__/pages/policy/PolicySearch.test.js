import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { baselinePolicyUS } from "../../__setup__/sampleData";
import PolicySearch from "../../../pages/policy/PolicySearch";
import data from "../../__setup__/data.json";
import userEvent from "@testing-library/user-event";
import { when } from "jest-when";

let metadataUS = data["metadataUS"];

const testSearchResults = {
  result: [
    {
      id: 1,
      label: "Test stacking policy",
    },
  ],
};

// Note that any fetch will return text, which is then passed
// to wrappedJsonParse, hence the need to stringify, only for the
// app to then custom parse
const testSearchResultsWrapper = {
  json: () => Promise.resolve(testSearchResults),
  text: () => Promise.resolve(JSON.stringify(testSearchResults)),
};

const testStackingPolicy = {
  cruft: {
    "2024-01-01.2100-12-31": true,
  },
};

const testStackingPolicyWrapper = {
  ok: true,
  json: () =>
    Promise.resolve({
      result: {
        policy_json: testStackingPolicy,
      },
    }),
  text: () =>
    Promise.resolve(
      JSON.stringify({
        result: {
          policy_json: testStackingPolicy,
        },
      }),
    ),
};

const mockCountryApiCall = jest.fn();

when(mockCountryApiCall)
  .calledWith(expect.anything(), expect.stringContaining("/policy/1"))
  .mockReturnValue(testStackingPolicyWrapper);

when(mockCountryApiCall)
  .calledWith("us", expect.stringContaining("policies"))
  .mockReturnValue(testSearchResultsWrapper)
  .defaultReturnValue(() => {
    throw new Error("Error while mocking countryApiCall");
  });

jest.mock("../../../api/call.js", () => {
  const originalModule = jest.requireActual("../../../api/call.js");
  return {
    __esModule: true,
    ...originalModule,
    countryApiCall: (...args) => mockCountryApiCall(...args),
  };
});

const mockGetNewPolicyId = jest.fn();
mockGetNewPolicyId.mockReturnValue({
  status: "ok",
  policy_id: 2,
});

jest.mock("../../../api/parameters.js", () => {
  const originalModule = jest.requireActual("../../../api/parameters.js");
  return {
    ...originalModule,
    getNewPolicyId: () => mockGetNewPolicyId(),
  };
});

afterAll(() => {
  jest.resetAllMocks();
});

describe("PolicySearch", () => {
  test("Should render", () => {
    const testProps = {
      metadata: metadataUS,
      target: "reform",
      policy: baselinePolicyUS,
    };

    metadataUS = {
      ...metadataUS,
      countryId: "us",
    };

    render(
      <BrowserRouter>
        <PolicySearch {...testProps} />
      </BrowserRouter>,
    );

    const heading = screen.getByText("Current law");
    expect(heading).toBeInTheDocument();
  });
  test("On current law, should disable stacking", () => {
    const testProps = {
      metadata: metadataUS,
      target: "reform",
      policy: baselinePolicyUS,
      displayStack: true,
    };

    render(
      <BrowserRouter>
        <PolicySearch {...testProps} />
      </BrowserRouter>,
    );

    const stackButton = screen.getByRole("button", { name: /plus/i });
    expect(stackButton).toBeInTheDocument();
    expect(stackButton).toBeDisabled();
  });
  test("On current law, should allow policy selection", () => {
    const testProps = {
      metadata: metadataUS,
      target: "reform",
      policy: baselinePolicyUS,
      displayStack: true,
    };

    render(
      <BrowserRouter>
        <PolicySearch {...testProps} />
      </BrowserRouter>,
    );

    const checkmarkButton = screen.getByRole("button", { name: /check/i });
    expect(checkmarkButton).toBeInTheDocument();
    expect(checkmarkButton).not.toBeDisabled();
  });
  test("Should stack policies", async () => {
    const testBasePolicy = {
      baseline: {
        data: {},
        label: "Current law",
        id: 2,
      },
      reform: {
        data: {
          maxwell: {
            "2024-01-01.2100-12-31": true,
          },
          dworkin: {
            "2024-01-01.2100-12-31": true,
          },
        },
        label: "Test base policy",
      },
    };

    const testProps = {
      metadata: metadataUS,
      target: "reform",
      policy: testBasePolicy,
      displayStack: true,
    };

    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <PolicySearch {...testProps} />
      </BrowserRouter>,
    );

    // Find the input
    const input = screen.getByRole("combobox");

    // Click on it and search for "t"
    await user.click(input);
    await user.type(input, "t");

    // Select the only returned policy and click "plus" to stack it
    const policyItem = screen.getByText(/#1 test stacking policy/i);
    const plusButton = screen.getByRole("button", { name: /plus/i });
    await user.click(policyItem);
    await user.click(plusButton);

    // Ensure that new policy is created
    const params = new URLSearchParams(window.location.search);
    expect(params.get("reform")).toBe("2");
  });
});
