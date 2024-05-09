import { addVariable } from "pages/household/input/VariableEditor.jsx";
import { defaultHouseholds } from "data/defaultHouseholds.js";
import { addChild } from "pages/household/input/CountChildren.jsx";
import { defaultYear } from "data/constants";
import { metadataUK, metadataUS } from "../../../__setup__/metadata_fetch.test";

describe("Test addVariable function", () => {
  test("Add a variable to default UK household", () => {
    let testHousehold = JSON.parse(JSON.stringify(defaultHouseholds.uk));
    const testVariable = metadataUK.variables.is_blind;

    testHousehold.people.you = {
      ...testHousehold.people.you,
      is_blind: {
        [defaultYear]: false,
      },
    };

    const resultHousehold = addVariable(
      defaultHouseholds.uk,
      testVariable,
      "people",
      defaultYear,
    );

    expect(resultHousehold).toStrictEqual(testHousehold);
  });
  test("Add variable to UK household with multiple people", () => {
    let testHousehold = JSON.parse(JSON.stringify(defaultHouseholds.uk));
    let setupHousehold = JSON.parse(JSON.stringify(defaultHouseholds.uk));
    const testVariable = metadataUK.variables.is_blind;

    // Add two children to both
    testHousehold = addChild(testHousehold, "uk", defaultYear);
    testHousehold = addChild(testHousehold, "uk", defaultYear);
    setupHousehold = addChild(setupHousehold, "uk", defaultYear);
    setupHousehold = addChild(setupHousehold, "uk", defaultYear);

    // Add the is_blind variable to all members
    Object.keys(testHousehold.people).forEach((person) => {
      testHousehold.people[person] = {
        ...testHousehold.people[person],
        is_blind: {
          [defaultYear]: false,
        },
      };
    });

    // Create a 2-child household to use within addVariable

    const resultHousehold = addVariable(
      setupHousehold,
      testVariable,
      "people",
      defaultYear,
    );

    expect(resultHousehold).toStrictEqual(testHousehold);
  });
  test("Add variable to US default household", () => {
    let testHousehold = JSON.parse(JSON.stringify(defaultHouseholds.us));
    const testVariable = metadataUS.variables.is_blind;

    testHousehold.people.you = {
      ...testHousehold.people.you,
      is_blind: {
        [defaultYear]: false,
      },
    };

    const resultHousehold = addVariable(
      defaultHouseholds.us,
      testVariable,
      "people",
      defaultYear,
    );

    expect(resultHousehold).toStrictEqual(testHousehold);
  });
  test("Add variable to US household with multiple people", () => {
    let testHousehold = JSON.parse(JSON.stringify(defaultHouseholds.us));
    let setupHousehold = JSON.parse(JSON.stringify(defaultHouseholds.us));
    const testVariable = metadataUS.variables.is_blind;

    // Add two children to both
    testHousehold = addChild(testHousehold, "us", defaultYear);
    testHousehold = addChild(testHousehold, "us", defaultYear);
    setupHousehold = addChild(setupHousehold, "us", defaultYear);
    setupHousehold = addChild(setupHousehold, "us", defaultYear);

    // Add the is_blind variable to all members
    Object.keys(testHousehold.people).forEach((person) => {
      testHousehold.people[person] = {
        ...testHousehold.people[person],
        is_blind: {
          [defaultYear]: false,
        },
      };
    });

    // Create a 2-child household to use within addVariable

    const resultHousehold = addVariable(
      setupHousehold,
      testVariable,
      "people",
      defaultYear,
    );

    expect(resultHousehold).toStrictEqual(testHousehold);
  });
});
