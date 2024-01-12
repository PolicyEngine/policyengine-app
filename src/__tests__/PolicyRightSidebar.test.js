import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useSearchParams } from "react-router-dom";
import fetch from "node-fetch";
import { defaultYear } from "data/constants";
import PolicyRightSidebar from "pages/policy/PolicyRightSidebar";

jest.mock("react-router-dom", () => {

  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
    useNavigate: jest.fn()
  };
});

// Metadata fetching function; incredibly, this must run inside test 
// because of async/await
async function fetchMetadata(countryId) {
  const res = await fetch(`https://api.policyengine.org/${countryId}/metadata`);
  const metadataRaw = await res.json();
  const metadata = metadataRaw.result;
  return metadata;
}

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
}

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
}

beforeAll( async () => {
  const metadataUS = await fetchMetadata("us");
  const metadataUK = await fetchMetadata("uk");
});

describe("Test render output", () => {
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
  test("Should be present for the US site", async () => {
    const testSearchParams = {
      focus: "gov"
    };

    // Fetched metadata
    const metadataUS = await fetchMetadata("us");

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
      policy: standardPolicyUS
    };

    render(<PolicyRightSidebar {...props}/>);

    expect(screen.findByText("Utilize Enhanced CPS")).toBeInTheDocument();

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
      metadata: metadataUK,
      policy: standardPolicyUK
    };

    render(<PolicyRightSidebar {...props}/>);

    expect(screen.findByText("Utilize Enhanced CPS")).not.toBeInTheDocument();

  });
  test("Should be enabled when region is 'us'");
  test("Should be enabled when region is 'enhanced_us'");
  test("Should be enabled when region is 'null'");
  test("Should not be enabled when region is a state");
  test("Should change region when selected");
});