import "@testing-library/jest-dom";
import { checkIsPolicyDeprecated } from "../../pages/PolicyPage";

jest.mock("react-plotly.js", () => jest.fn());

describe("checkIsPolicyDeprecated", () => {
  test("correctly handles baseline policy", () => {
    
    const testPolicy = {
      baseline: {
        data: null,
      },
      reform: {
        data: {
          "test-provision": {},
        },
      },
    };

    const testMetadata = {
      parameters: {
        "test-provision": {},
      },
    };

    expect(checkIsPolicyDeprecated(testMetadata, testPolicy)).toBe(false);
  });
  test("correctly handles policy with empty data", () => {

    const testPolicy = {
      baseline: {
        data: null,
      },
      reform: {
        data: {},
      },
    };

    const testMetadata = {
      parameters: {
        "test-provision": {},
      },
    };

    expect(checkIsPolicyDeprecated(testMetadata, testPolicy)).toBe(false);
    
  });
  test("correctly marks policy as deprecated", () => {
      
      const testPolicy = {
        baseline: {
          data: null,
        },
        reform: {
          data: {
            "test-provision": {},
            "deprecated-provision": {},
          },
        },
      };
  
      const testMetadata = {
        parameters: {
          "test-provision": {},
        },
      };
  
      expect(checkIsPolicyDeprecated(testMetadata, testPolicy)).toBe(true);
  });


});
