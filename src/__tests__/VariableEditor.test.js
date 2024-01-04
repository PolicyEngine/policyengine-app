import { addVariable } from "pages/household/input/VariableEditor.jsx";
import { defaultHouseholds } from "data/defaultHouseholds.js";
import { addChild } from "pages/household/input/CountChildren.jsx";

// Metadata fetching function
async function fetchMetadata(countryId) {
  const res = await fetch(`https://api.policyengine.org/${countryId}/metadata`);
  const metadataRaw = await res.json();
  const metadata = metadataRaw.result;
  return metadata;
}

describe("Test addVariable function", () => {
  test("Add a variable to default UK household", async () => {
    let testHousehold = JSON.parse(JSON.stringify(defaultHouseholds.uk));
    let metadataUK = await fetchMetadata("uk");
    const testVariable = metadataUK.variables.is_blind;

    testHousehold.people.you = {
      ...testHousehold.people.you,
      is_blind: {
        2024: false,
      },
    };

    const resultHousehold = addVariable(
      defaultHouseholds.uk,
      testVariable,
      "people",
    );

    expect(resultHousehold).toStrictEqual(testHousehold);
  });
  test("Add variable to UK household with multiple people", async () => {
    let testHousehold = JSON.parse(JSON.stringify(defaultHouseholds.uk));
    let setupHousehold = JSON.parse(JSON.stringify(defaultHouseholds.uk));
    let metadataUK = await fetchMetadata("uk");
    const testVariable = metadataUK.variables.is_blind;

    // Add two children to both
    testHousehold = addChild(testHousehold, "uk");
    testHousehold = addChild(testHousehold, "uk");
    setupHousehold = addChild(setupHousehold, "uk");
    setupHousehold = addChild(setupHousehold, "uk");

    // Add the is_blind variable to all members
    Object.keys(testHousehold.people).forEach((person) => {
      testHousehold.people[person] = {
        ...testHousehold.people[person],
        is_blind: {
          2024: false,
        },
      };
    });

    // Create a 2-child household to use within addVariable

    const resultHousehold = addVariable(setupHousehold, testVariable, "people");

    expect(resultHousehold).toStrictEqual(testHousehold);
  });
  test("Add variable to US default household", async () => {
    let testHousehold = JSON.parse(JSON.stringify(defaultHouseholds.us));
    let metadataUS = await fetchMetadata("us");
    const testVariable = metadataUS.variables.is_blind;

    testHousehold.people.you = {
      ...testHousehold.people.you,
      is_blind: {
        2024: false,
      },
    };

    const resultHousehold = addVariable(
      defaultHouseholds.us,
      testVariable,
      "people",
    );

    expect(resultHousehold).toStrictEqual(testHousehold);
  });
  test("Add variable to US household with multiple people", async () => {
    let testHousehold = JSON.parse(JSON.stringify(defaultHouseholds.us));
    let setupHousehold = JSON.parse(JSON.stringify(defaultHouseholds.us));
    let metadataUS = await fetchMetadata("us");
    const testVariable = metadataUS.variables.is_blind;

    // Add two children to both
    testHousehold = addChild(testHousehold, "us");
    testHousehold = addChild(testHousehold, "us");
    setupHousehold = addChild(setupHousehold, "us");
    setupHousehold = addChild(setupHousehold, "us");

    // Add the is_blind variable to all members
    Object.keys(testHousehold.people).forEach((person) => {
      testHousehold.people[person] = {
        ...testHousehold.people[person],
        is_blind: {
          2024: false,
        },
      };
    });

    // Create a 2-child household to use within addVariable

    const resultHousehold = addVariable(setupHousehold, testVariable, "people");

    expect(resultHousehold).toStrictEqual(testHousehold);
  });
});
