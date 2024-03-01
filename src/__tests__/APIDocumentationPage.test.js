import {
  exampleInputs
} from "../redesign/components/APIDocumentationPage";

describe("exampleInputs", () => {
  test("Works", () => {
    expect(!!exampleInputs).toBe(true);
  });
});

/*
describe("APIResultCard", () => {
  test("Properly displays a variable card");
  test("Properly displays a parameter card");
});

describe("VariableParameterExplorer", () => {
  test("Properly displays the correct cards");
});

describe("APIDocumentationPage", () => {
  test("Properly fetches sample US output");
  test("Properly fetches sample UK output");
  test("Properly fetches sample 'other' output");
});
*/