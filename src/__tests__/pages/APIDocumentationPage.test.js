import APIDocumentationPage, {
  exampleInputs,
  APIResultCard,
} from "../../pages/APIDocumentationPage";
import fetch from "node-fetch";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as countryIdFuncs from "hooks/useCountryId";
import { BrowserRouter } from "react-router-dom";
import "whatwg-fetch";

let metadataUS = null;
let metadataUK = null;
let metadataCA = null;

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
  metadataCA = await fetchMetadata("ca");
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
    expect(getByText(`Unit: ${cardMetadata.unit}`)).toBeInTheDocument();
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
  test("Properly fetches sample US output", async () => {
    const countryIdSpy = jest
      .spyOn(countryIdFuncs, "default")
      .mockImplementation(() => "us");

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            message: "successfully resolved",
          }),
      }),
    );

    const { getByTestId, getByText } = await render(
      <BrowserRouter>
        <APIDocumentationPage metadata={metadataUS} />
      </BrowserRouter>,
    );

    expect(countryIdSpy).toHaveBeenCalled();
    // Ensure that US sample object rendering properly
    expect(getByTestId("APIEndpoint_json_blocks")).toContainElement(
      getByText(/household.api.policyengine.org\/us/i),
    );

    // Ensure that return block also rendered
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(getByTestId("APIEndpoint_json_blocks")).toContainElement(
        getByText('"successfully resolved"'),
      );
    });
  });
  test("Properly fetches sample UK output", async () => {
    const countryIdSpy = jest
      .spyOn(countryIdFuncs, "default")
      .mockImplementation(() => "uk");

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            message: "successfully resolved",
          }),
      }),
    );

    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <APIDocumentationPage metadata={metadataUK} />
      </BrowserRouter>,
    );

    expect(countryIdSpy).toHaveBeenCalled();
    // Ensure that UK sample object rendering properly
    expect(getByTestId("APIEndpoint_json_blocks")).toContainElement(
      getByText(/household.api.policyengine.org\/uk/i),
    );

    // Ensure that return block also rendered
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(getByTestId("APIEndpoint_json_blocks")).toContainElement(
        getByText('"successfully resolved"'),
      );
    });
  });
  test("Properly fetches sample 'other' output", async () => {
    const countryIdSpy = jest
      .spyOn(countryIdFuncs, "default")
      .mockImplementation(() => "ca");

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            message: "successfully resolved",
          }),
      }),
    );

    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <APIDocumentationPage metadata={metadataCA} />
      </BrowserRouter>,
    );

    expect(countryIdSpy).toHaveBeenCalled();
    // Ensure that Canada sample object rendering properly
    expect(getByTestId("APIEndpoint_json_blocks")).not.toContainHTML(
      '<span>"universal_credit_entitlement"</span>',
    );
    expect(getByTestId("APIEndpoint_json_blocks")).not.toContainHTML(
      '<span>"snap"</span>',
    );

    // Ensure that return block also rendered
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(getByTestId("APIEndpoint_json_blocks")).toContainElement(
        getByText('"successfully resolved"'),
      );
    });
  });
});
