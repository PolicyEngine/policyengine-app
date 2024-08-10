import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeprecationModal, { removeDeprecatedParams } from "../../modals/DeprecationModal";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("DeprecationModal", () => {

  test("Renders and shows missing param correctly", () => {
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

    const testDeprecatedParams = [
      "test-deprecated-provision",
    ];

    const testCountryVersion = "0.0.0";

    const testProps = {
      oldPolicy: testPolicy,
      metadata: testMetadata,
      deprecatedParams: testDeprecatedParams,
      countryVersion: testCountryVersion,
    };

    render(
      <BrowserRouter>
        <DeprecationModal {...testProps} />
      </BrowserRouter>,
    );

    const headingText = "Your policy is deprecated";
    const heading = screen.getByText(headingText);

    const renderedParam = screen.getByText("- test-deprecated-provision");

    expect(heading).toBeInTheDocument();
    expect(renderedParam).toBeInTheDocument();

  });
  /*
  test("Close modal button works correctly");
  test("Transfer parameters button works correctly");
  */

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