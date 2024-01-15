import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useSearchParams } from "react-router-dom";
import fetch from "node-fetch";
import { defaultYear } from "data/constants";
import PolicyRightSidebar from "pages/policy/PolicyRightSidebar";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => {

  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
    useNavigate: jest.fn()
  };
});

describe("Test render output", () => {
  let metadataUS = null;

  beforeEach( async () => {
    // Metadata fetching function 
    async function fetchMetadata(countryId) {
      const res = await fetch(`https://api.policyengine.org/${countryId}/metadata`);
      const metadataRaw = await res.json();
      const metadata = metadataRaw.result;
      return metadata;
    }

    metadataUS = await fetchMetadata("us");
  });

  test("Should render sidebar for non-existent policy for US", async () => {
    const testSearchParams = {
      focus: "gov"
    };

    useSearchParams.mockImplementation(() => {
      return (
        [
          new URLSearchParams(testSearchParams),
          jest.fn()
        ]
      );
    });

    // Declare props
    const props = {
      metadata: metadataUS,
      policy: {
        reform: {
          data: null
        }
      }
    }

    render(<PolicyRightSidebar {...props}/>);

  });
});

describe("Enhanced CPS selector", () => {
  let metadataUS = null;
  let metadataUK = null;

  const standardPolicyUS = {
    "baseline": {
      "data": {},
      "label": "Current law",
      "id": 2
    },
    "reform": {
      "data": {},
      "label": "Current law",
      "id": 2
    }
  };

  const standardPolicyUK = {
    "baseline": {
      "data": {},
      "label": "Current law",
      "id": 1
    },
    "reform": {
      "data": {},
      "label": "Current law",
      "id": 1
    }
  };

  beforeEach( async () => {
    // Metadata fetching function 
    async function fetchMetadata(countryId) {
      const res = await fetch(`https://api.policyengine.org/${countryId}/metadata`);
      const metadataRaw = await res.json();
      const metadata = metadataRaw.result;
      return metadata;
    }

    metadataUS = await fetchMetadata("us");
    metadataUK = await fetchMetadata("uk");
  });

  test("Should be present for the US site", async () => {
    const testSearchParams = {
      focus: "gov"
    };

    useSearchParams.mockImplementation(() => {
      return (
        [
          new URLSearchParams(testSearchParams),
          jest.fn()
        ]
      );
    });

    // Declare props
    const props = {
      metadata: {
        ...metadataUS,
        countryId: "us"
      },
      policy: standardPolicyUS
    };

    const { getByTestId } = render(<PolicyRightSidebar {...props}/>);

    await waitFor(() => {
      expect(getByTestId("enhanced_cps_switch")).toBeInTheDocument()
    });

  });
  test("Should not render for the UK site", async () => {
    const testSearchParams = {
      focus: "gov"
    };

    useSearchParams.mockImplementation(() => {
      return (
        [
          new URLSearchParams(testSearchParams),
          jest.fn()
        ]
      );
    });

    // Declare props
    const props = {
      metadata: {
        ...metadataUK,
        countryId: "uk"
      },
      policy: standardPolicyUK
    };

    const { queryByTestId } = render(<PolicyRightSidebar {...props}/>);

    await waitFor(() => {
      expect(queryByTestId("enhanced_cps_switch")).not.toBeInTheDocument()
    });

  });
  test("Should be enabled when region is 'us'", async () => {
    const testSearchParams = {
      focus: "gov",
      region: "us"
    };

    useSearchParams.mockImplementation(() => {
      return (
        [
          new URLSearchParams(testSearchParams),
          jest.fn()
        ]
      );
    });

    // Declare props
    const props = {
      metadata: {
        ...metadataUS,
        countryId: "us"
      },
      policy: standardPolicyUS
    };

    const { getByTestId } = render(<PolicyRightSidebar {...props}/>);

    expect(getByTestId("enhanced_cps_switch").classList).not.toContain("ant-switch-disabled");

  });
  test("Should be enabled when region is 'enhanced_us'", async () => {
    const testSearchParams = {
      focus: "gov",
      region: "enhanced_us"
    };

    useSearchParams.mockImplementation(() => {
      return (
        [
          new URLSearchParams(testSearchParams),
          jest.fn()
        ]
      );
    });

    // Declare props
    const props = {
      metadata: {
        ...metadataUS,
        countryId: "us"
      },
      policy: standardPolicyUS
    };

    const { getByTestId } = render(<PolicyRightSidebar {...props}/>);

    expect(getByTestId("enhanced_cps_switch").classList).not.toContain("ant-switch-disabled");
  });
  test("Should be enabled when region is 'null'", async () => {
    const testSearchParams = {
      focus: "gov"
    };

    useSearchParams.mockImplementation(() => {
      return (
        [
          new URLSearchParams(testSearchParams),
          jest.fn()
        ]
      );
    });

    // Declare props
    const props = {
      metadata: {
        ...metadataUS,
        countryId: "us"
      },
      policy: standardPolicyUS
    };

    const { getByTestId } = render(<PolicyRightSidebar {...props}/>);

    expect(getByTestId("enhanced_cps_switch").classList).not.toContain("ant-switch-disabled");
  });
  test("Should not be enabled when region is a state", async () => {

    const testSearchParams = {
      focus: "gov",
      region: "ar"
    };

    useSearchParams.mockImplementation(() => {
      return (
        [
          new URLSearchParams(testSearchParams),
          jest.fn()
        ]
      );
    });

    // Declare props
    const props = {
      metadata: {
        ...metadataUS,
        countryId: "us"
      },
      policy: standardPolicyUS
    };

    const { getByTestId } = render(<PolicyRightSidebar {...props}/>);

    expect(getByTestId("enhanced_cps_switch").classList).toContain("ant-switch-disabled");
  });
  // test("Should change region when selected");
});