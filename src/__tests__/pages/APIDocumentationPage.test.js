import {
  exampleInputs,
  APIResultCard
} from "../redesign/components/APIDocumentationPage";
import fetch from "node-fetch";
import { render } from "@testing-library/react";

let metadataUS = null;

beforeAll(async() => {
  async function fetchMetadata(countryId) {
    const res = await fetch(
      `https://api.policyengine.org/${countryId}/metadata`,
    );
    const metadataRaw = await res.json();
    const metadata = metadataRaw.result;
    return metadata;
  }

  metadataUS = await fetchMetadata("us");
  // metadataUK = await fetchMetadata("uk");
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

    const renderedCard = render(<APIResultCard 
      type="variable"
      metadata={cardMetadata}
    />);

    expect(cardMetadata.label).toBeInTheDocument();
    expect("Variable").toBeInTheDocument();
    expect(cardMetadata.definitionPeriod).toBeInTheDocument();
    expect(cardMetadata.unit).toBeInTheDocument();

  });
  /*
  test("Properly displays a parameter card");
  */
});

/*
describe("VariableParameterExplorer", () => {
  test("Properly displays the correct cards");
});

describe("APIDocumentationPage", () => {
  test("Properly fetches sample US output");
  test("Properly fetches sample UK output");
  test("Properly fetches sample 'other' output");
});
*/