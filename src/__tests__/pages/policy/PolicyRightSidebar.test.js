import { fireEvent, render, waitFor } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";
import PolicyRightSidebar from "pages/policy/PolicyRightSidebar";
import "@testing-library/jest-dom";
import data from "../../__setup__/data.json";

let metadataUS = data["metadataUS"];
let metadataUK = data["metadataUK"];

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
    useNavigate: jest.fn(),
  };
});

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
