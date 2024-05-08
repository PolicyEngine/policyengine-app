import { fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import fetch from "node-fetch";
import PolicyRightSidebar, {
  SinglePolicyChange,
} from "pages/policy/PolicyRightSidebar";
import "@testing-library/jest-dom";
import { defaultForeverYear } from "../../../data/constants";
import { formatFullDate } from "../../../lang/format";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
    useNavigate: jest.fn(),
  };
});

let metadataUS = null;
let metadataUK = null;

const standardPolicyUS = {
  baseline: {
    data: {},
    label: "Current law",
    id: 2,
  },
  reform: {
    data: {},
    label: "Current law",
    id: 2,
  },
};

const standardPolicyUK = {
  baseline: {
    data: {},
    label: "Current law",
    id: 1,
  },
  reform: {
    data: {},
    label: "Current law",
    id: 1,
  },
};

beforeAll(async () => {
  async function fetchMetadata(countryId) {
    const res = await fetch(
      `https://api.policyengine.org/${countryId}/metadata`,
    );
    const metadataRaw = await res.json();
    const metadata = metadataRaw.result;
    return metadata;
  }

  metadataUS = await fetchMetadata("us");
  metadataUK = await fetchMetadata("uk");
});

describe("Enhanced CPS selector", () => {
  test("Should be present for the US site", async () => {
    const testSearchParams = {
      focus: "gov",
    };

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(testSearchParams), jest.fn()];
    });

    // Declare props
    const props = {
      metadata: {
        ...metadataUS,
        countryId: "us",
      },
      policy: standardPolicyUS,
      defaultOpen: true,
    };

    const { getByTestId } = render(<PolicyRightSidebar {...props} />);

    await waitFor(() => {
      expect(getByTestId("enhanced_cps_switch")).toBeInTheDocument();
    });
  });
  test("Should not render for the UK site", async () => {
    const testSearchParams = {
      focus: "gov",
    };

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(testSearchParams), jest.fn()];
    });

    // Declare props
    const props = {
      metadata: {
        ...metadataUK,
        countryId: "uk",
      },
      policy: standardPolicyUK,
      defaultOpen: true,
    };

    const { queryByTestId } = render(<PolicyRightSidebar {...props} />);

    await waitFor(() => {
      expect(queryByTestId("enhanced_cps_switch")).not.toBeInTheDocument();
    });
  });
  test("Should be enabled when region is 'us'", async () => {
    const testSearchParams = {
      focus: "gov",
      region: "us",
    };

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(testSearchParams), jest.fn()];
    });

    // Declare props
    const props = {
      metadata: {
        ...metadataUS,
        countryId: "us",
      },
      policy: standardPolicyUS,
      defaultOpen: true,
    };

    const { getByTestId } = render(<PolicyRightSidebar {...props} />);

    expect(getByTestId("enhanced_cps_switch").classList).not.toContain(
      "ant-switch-disabled",
    );
  });
  test("Should be enabled when region is 'enhanced_us'", async () => {
    const testSearchParams = {
      focus: "gov",
      region: "enhanced_us",
    };

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(testSearchParams), jest.fn()];
    });

    // Declare props
    const props = {
      metadata: {
        ...metadataUS,
        countryId: "us",
      },
      policy: standardPolicyUS,
      defaultOpen: true,
    };

    const { getByTestId } = render(<PolicyRightSidebar {...props} />);

    expect(getByTestId("enhanced_cps_switch").classList).not.toContain(
      "ant-switch-disabled",
    );
  });
  test("Should be enabled when region is 'null'", async () => {
    const testSearchParams = {
      focus: "gov",
    };

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(testSearchParams), jest.fn()];
    });

    // Declare props
    const props = {
      metadata: {
        ...metadataUS,
        countryId: "us",
      },
      policy: standardPolicyUS,
      defaultOpen: true,
    };

    const { getByTestId } = render(<PolicyRightSidebar {...props} />);

    expect(getByTestId("enhanced_cps_switch").classList).not.toContain(
      "ant-switch-disabled",
    );
  });
  test("Should not be enabled when region is a state", async () => {
    const testSearchParams = {
      focus: "gov",
      region: "ar",
    };

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(testSearchParams), jest.fn()];
    });

    // Declare props
    const props = {
      metadata: {
        ...metadataUS,
        countryId: "us",
      },
      policy: standardPolicyUS,
      defaultOpen: true,
    };

    const { getByTestId } = render(<PolicyRightSidebar {...props} />);

    expect(getByTestId("enhanced_cps_switch").classList).toContain(
      "ant-switch-disabled",
    );
  });
  test("Should change region when selected", () => {
    const testSearchParams = {
      focus: "gov",
      region: "us",
    };

    const expectedSearchParams = {
      focus: "gov",
      region: "enhanced_us",
    };

    const mockSetSearchParams = jest.fn();

    useSearchParams.mockImplementation(() => {
      return [new URLSearchParams(testSearchParams), mockSetSearchParams];
    });

    // Declare props
    const props = {
      metadata: {
        ...metadataUS,
        countryId: "us",
      },
      policy: standardPolicyUS,
      defaultOpen: true,
    };

    const { getByTestId } = render(<PolicyRightSidebar {...props} />);
    fireEvent.click(getByTestId("enhanced_cps_switch"));
    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams(expectedSearchParams),
    );
  });
});

describe("SinglePolicyChange", () => {
  const testCountryId = "us";
  const testValue = 3;
  const testParamLabel = "maxwell";

  test("Should display simple, single-year policies correctly", () => {
    // This must be declared here, and not in describe
    // block, because "beforeAll" doesn't run before describe
    // setup - strange pattern
    const allParams = metadataUS.parameters;
    const testStartDate = "2024-01-01";
    const testEndDate = "2024-12-31";

    const { getByText } = render(
      <BrowserRouter>
        <SinglePolicyChange
          startDateStr={testStartDate}
          endDateStr={testEndDate}
          parameterMetadata={
            allParams[Object.keys(allParams)[Object.keys(allParams).length / 2]]
          }
          value={testValue}
          paramLabel={testParamLabel}
          countryId={testCountryId}
        />
      </BrowserRouter>,
    );

    expect(getByText("2024")).toBeInTheDocument();
  });
  test("Should display simple, multi-year policies correctly", () => {
    const allParams = metadataUS.parameters;
    const testStartDate = "2024-01-01";
    const testEndDate = "2025-12-31";

    const { getByText } = render(
      <BrowserRouter>
        <SinglePolicyChange
          startDateStr={testStartDate}
          endDateStr={testEndDate}
          parameterMetadata={
            allParams[Object.keys(allParams)[Object.keys(allParams).length / 2]]
          }
          value={testValue}
          paramLabel={testParamLabel}
          countryId={testCountryId}
        />
      </BrowserRouter>,
    );

    expect(getByText("2024 to 2025")).toBeInTheDocument();
  });
  test("Should display simple-start, forever policies correctly", () => {
    const allParams = metadataUS.parameters;
    const testStartDate = "2024-01-01";
    const testEndDate = defaultForeverYear.concat("-12-31");

    const { getByText } = render(
      <BrowserRouter>
        <SinglePolicyChange
          startDateStr={testStartDate}
          endDateStr={testEndDate}
          parameterMetadata={
            allParams[Object.keys(allParams)[Object.keys(allParams).length / 2]]
          }
          value={testValue}
          paramLabel={testParamLabel}
          countryId={testCountryId}
        />
      </BrowserRouter>,
    );

    expect(getByText("2024 onward")).toBeInTheDocument();
  });
  test("Should display complex-start, forever policies correctly", () => {
    const allParams = metadataUS.parameters;
    const testStartDate = "2024-01-02";
    const testEndDate = defaultForeverYear.concat("-12-31");

    const { getByText } = render(
      <BrowserRouter>
        <SinglePolicyChange
          startDateStr={testStartDate}
          endDateStr={testEndDate}
          parameterMetadata={
            allParams[Object.keys(allParams)[Object.keys(allParams).length / 2]]
          }
          value={testValue}
          paramLabel={testParamLabel}
          countryId={testCountryId}
        />
      </BrowserRouter>,
    );

    const startOutput = formatFullDate(testStartDate, testCountryId);

    expect(getByText(`${startOutput} onward`)).toBeInTheDocument();
  });
  test("Should display complex-start, complex-end policies correctly", () => {
    const allParams = metadataUS.parameters;
    const testStartDate = "2024-01-02";
    const testEndDate = "2025-12-30";

    const { getByText } = render(
      <BrowserRouter>
        <SinglePolicyChange
          startDateStr={testStartDate}
          endDateStr={testEndDate}
          parameterMetadata={
            allParams[Object.keys(allParams)[Object.keys(allParams).length / 2]]
          }
          value={testValue}
          paramLabel={testParamLabel}
          countryId={testCountryId}
        />
      </BrowserRouter>,
    );

    const startOutput = formatFullDate(testStartDate, testCountryId);
    const endOutput = formatFullDate(testEndDate, testCountryId);

    expect(getByText(`${startOutput} to ${endOutput}`)).toBeInTheDocument();
  });
  test("Should display complex-start, simple-end policies correctly", () => {
    const allParams = metadataUS.parameters;
    const testStartDate = "2024-01-02";
    const testEndDate = "2025-12-31";

    const { getByText } = render(
      <BrowserRouter>
        <SinglePolicyChange
          startDateStr={testStartDate}
          endDateStr={testEndDate}
          parameterMetadata={
            allParams[Object.keys(allParams)[Object.keys(allParams).length / 2]]
          }
          value={testValue}
          paramLabel={testParamLabel}
          countryId={testCountryId}
        />
      </BrowserRouter>,
    );

    const startOutput = formatFullDate(testStartDate, testCountryId);
    const endOutput = formatFullDate(testEndDate, testCountryId);

    expect(getByText(`${startOutput} to ${endOutput}`)).toBeInTheDocument();
  });
  test("Should display simple-start, complex-end policies correctly", () => {
    const allParams = metadataUS.parameters;
    const testStartDate = "2024-01-01";
    const testEndDate = "2025-12-30";

    const { getByText } = render(
      <BrowserRouter>
        <SinglePolicyChange
          startDateStr={testStartDate}
          endDateStr={testEndDate}
          parameterMetadata={
            allParams[Object.keys(allParams)[Object.keys(allParams).length / 2]]
          }
          value={testValue}
          paramLabel={testParamLabel}
          countryId={testCountryId}
        />
      </BrowserRouter>,
    );

    const startOutput = formatFullDate(testStartDate, testCountryId);
    const endOutput = formatFullDate(testEndDate, testCountryId);

    expect(getByText(`${startOutput} to ${endOutput}`)).toBeInTheDocument();
  });
});
