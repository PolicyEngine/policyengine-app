import APIDocumentationPage, {
  exampleInputs,
  APIResultCard,
} from "../../pages/learn/APIDocumentationPage";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as countryIdFuncs from "hooks/useCountryId";
import { BrowserRouter } from "react-router-dom";
import data from "../__setup__/data.json";

let metadataUS = data["metadataUS"];
let metadataUK = data["metadataUK"];
let metadataCA = data["metadataCA"];

beforeAll(async () => {
  document.createRange = () => {
    const range = new Range();

    range.getBoundingClientRect = jest.fn();

    range.getClientRects = jest.fn(() => ({
      item: () => null,
      length: 0,
    }));

    return range;
  };
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("exampleInputs", () => {
  test("Works", () => {
    expect(!!exampleInputs).toBe(true);
  });
});

describe("APIResultCard", () => {
  test("Properly displays a variable card", () => {
    const variableNames = Object.keys(metadataUS.variables);
    const testVariable = variableNames[Math.floor(variableNames.length / 2)];
    const cardMetadata = metadataUS.variables[testVariable];

    const { getByText } = render(
      <APIResultCard type="variable" metadata={cardMetadata} />,
    );

    expect(getByText(cardMetadata.label)).toBeInTheDocument();
    expect(getByText("Variable")).toBeInTheDocument();
    expect(
      getByText(`Period: ${cardMetadata.definitionPeriod}`),
    ).toBeInTheDocument();
    expect(
      getByText(
        `Unit:${cardMetadata.unit === null ? "" : " " + cardMetadata.unit}`,
      ),
    ).toBeInTheDocument();
    expect(getByText(`Python name: ${cardMetadata.name}`)).toBeInTheDocument();
  });
  test("Properly displays a parameter card", () => {
    const paramNames = Object.keys(metadataUS.parameters);
    const testParam = paramNames[Math.floor(paramNames.length / 2)];
    const cardMetadata = metadataUS.parameters[testParam];

    const { getByText } = render(
      <APIResultCard type="parameter" metadata={cardMetadata} />,
    );

    const cardPeriod = cardMetadata.period || "None";
    const cardUnit = cardMetadata.unit || "N/A";

    expect(getByText(cardMetadata.label)).toBeInTheDocument();
    expect(getByText("Parameter")).toBeInTheDocument();
    expect(getByText(`Period: ${cardPeriod}`)).toBeInTheDocument();
    expect(getByText(`Unit: ${cardUnit}`)).toBeInTheDocument();
    expect(
      getByText(`Python name: ${cardMetadata.parameter}`),
    ).toBeInTheDocument();
  });
});

describe("APIDocumentationPage", () => {
  test("Properly renders US API documentation page", () => {
    const countryIdSpy = jest
      .spyOn(countryIdFuncs, "default")
      .mockImplementation(() => "us");

    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <APIDocumentationPage metadata={metadataUS} />
      </BrowserRouter>,
    );

    expect(countryIdSpy).toHaveBeenCalled();
    // Ensure that page is properly rendered with US content
    expect(getByTestId("APIEndpoint_json_blocks")).toBeTruthy();
    expect(
      getByText(/household.api.policyengine.org\/us/i),
    ).toBeInTheDocument();
  });

  test("Properly renders UK API documentation page", () => {
    const countryIdSpy = jest
      .spyOn(countryIdFuncs, "default")
      .mockImplementation(() => "uk");

    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <APIDocumentationPage metadata={metadataUK} />
      </BrowserRouter>,
    );

    expect(countryIdSpy).toHaveBeenCalled();
    // Ensure that page is properly rendered with UK content
    expect(getByTestId("APIEndpoint_json_blocks")).toBeTruthy();
    expect(
      getByText(/household.api.policyengine.org\/uk/i),
    ).toBeInTheDocument();
  });

  test("Properly renders other country API documentation page", () => {
    const countryIdSpy = jest
      .spyOn(countryIdFuncs, "default")
      .mockImplementation(() => "ca");

    const { getByTestId } = render(
      <BrowserRouter>
        <APIDocumentationPage metadata={metadataCA} />
      </BrowserRouter>,
    );

    expect(countryIdSpy).toHaveBeenCalled();
    // Ensure that API endpoint json blocks are rendered
    expect(getByTestId("APIEndpoint_json_blocks")).toBeTruthy();
  });
});
