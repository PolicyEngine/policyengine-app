import "@testing-library/jest-dom";
import { checkIsPolicyDeprecated, removeDeprecatedParams } from "../../pages/PolicyPage";

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

describe("removeDeprecatedParams", () => {
  test("properly handles baseline", () => {
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

    const testOutput = removeDeprecatedParams(testMetadata, testPolicy);

    expect(testOutput).toMatchObject(testPolicy);
  });
  test("removes deprecated parameters", () => {
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

    const testOutput = removeDeprecatedParams(testMetadata, testPolicy);

    let expectedOutput = JSON.parse(JSON.stringify(testPolicy));
    delete expectedOutput.reform.data["deprecated-provision"];

    expect(testOutput.reform.data).not.toHaveProperty("deprecated-provision");
    expect(testOutput).toMatchObject(expectedOutput);
  });
  test("properly handles policy with multiple non-deprecated parameters", () => {
    const testPolicy = {
      baseline: {
        data: null,
      },
      reform: {
        data: {
          "test-provision": {},
          "test-provision-2": {},
          "test-provision-3": {},
        },
      },
    };

    const testMetadata = {
      parameters: {
        "test-provision": {},
        "test-provision-2": {},
        "test-provision-3": {},
      },
    };

    const testOutput = removeDeprecatedParams(testMetadata, testPolicy);

    expect(testOutput).toMatchObject(testPolicy);
  });
});