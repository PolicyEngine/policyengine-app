// External package imports
// Internal imports
import { createDefaultHousehold } from "api/variables.js";
import { defaultHouseholds } from "data/defaultHouseholds.js";
import { metadataUS } from "../../../metadata_fetch.mjs";

function constructTestSituationUS() {
  let testHousehold = JSON.parse(JSON.stringify(defaultHouseholds.us));

  return testHousehold;
}

// cDH sample metadata

describe("createDefaultHousehold", () => {
  test("creates default household for US", () => {
    const expectedDefaultHousehold = constructTestSituationUS();
    const output = createDefaultHousehold(metadataUS);
    expect(output).toStrictEqual(expectedDefaultHousehold);
  });
});
