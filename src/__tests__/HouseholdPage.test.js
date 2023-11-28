import { updateHousehold } from "pages/HouseholdPage.jsx";
import { defaultHouseholds } from "data/defaultHouseholds.js";
// Temporarily disabling below
// import { addChild } from "pages/household/input/CountChildren.jsx";

jest.mock("react-plotly.js", () => jest.fn());

describe("Test updateHousehold function", () => {
  /* Disabling until we can determine a way to strengthen this test
  test("Ensure function removes variables properly from US household", async () => {
    let seedHousehold = null;
    let metadata = null;
    let testHousehold = JSON.parse(JSON.stringify(defaultHouseholds.us));

    // Construct the test household present in household #33010
    for (let i = 0; i < 2; i++) {
      testHousehold = addChild(testHousehold, "us");
    }

    // Alter "your household"
    testHousehold.households["your household"] = {
      ...testHousehold.households["your household"],
      state_name: {
        2023: "NM",
      },
    };

    // Alter "you" in #33010
    testHousehold.people.you = {
      ...testHousehold.people.you,
      age: {
        2023: 40,
      },
      employment_income: {
        2023: 30000,
      },
      rent: {
        2023: 12000,
      },
    };

    // Alter #33010's "your first dependent"
    testHousehold.people["your first dependent"] = {
      ...testHousehold.people["your first dependent"],
      age: {
        2023: 5,
      },
      employment_income: {
        2023: 0,
      },
    };

    // Alter #33010's "your second dependent"
    testHousehold.people["your second dependent"] = {
      ...testHousehold.people["your second dependent"],
      age: {
        2023: 3,
      },
      employment_income: {
        2023: 0,
      },
    };

    // Add #33010's input childcare expenses
    testHousehold.spm_units["your household"] = {
      ...testHousehold.spm_units["your household"],
      childcare_expenses: {
        2023: 6000,
      },
    };

    // Edit marital unit IDs
    testHousehold.marital_units["your first dependent's marital unit"] = {
      ...testHousehold.marital_units["your first dependent's marital unit"],
      marital_unit_id: {
        2023: 2,
      },
    };

    testHousehold.marital_units["your marital unit"] = {
      ...testHousehold.marital_units["your marital unit"],
      marital_unit_id: {
        2023: 0,
      },
    };

    testHousehold.marital_units["your second dependent's marital unit"] = {
      ...testHousehold.marital_units["your second dependent's marital unit"],
      marital_unit_id: {
        2023: 3,
      },
    };

    try {
      const res = await fetch(
        "https://api.policyengine.org/us/household/33010",
      );
      const resJSON = await res.json();
      seedHousehold = resJSON.result.household_json;

      const res2 = await fetch("https://api.policyengine.org/us/metadata");
      const resJSON2 = await res2.json();
      metadata = resJSON2.result;
    } catch (err) {
      console.error(err);
    }

    const resultHousehold = updateHousehold(seedHousehold, metadata);

    expect(resultHousehold).toStrictEqual(testHousehold);
  });
  */
  test("Ensure function removes variables properly from UK household", async () => {
    let seedHousehold = null;
    let metadata = null;
    let testHousehold = JSON.parse(JSON.stringify(defaultHouseholds.uk));

    // Add in household #33001's BRMA, local authority, region
    testHousehold.households["your household"] = {
      ...testHousehold.households["your household"],
      BRMA: {
        2023: "MAIDSTONE",
      },
      local_authority: {
        2023: "MAIDSTONE",
      },
      region: {
        2023: "LONDON",
      },
    };

    // Update "you"
    testHousehold.people.you = {
      ...testHousehold.people.you,
      age: {
        2023: 40,
      },
      employment_income: {
        2023: 55000,
      },
    };

    try {
      const res = await fetch(
        "https://api.policyengine.org/uk/household/33001",
      );
      const resJSON = await res.json();
      seedHousehold = resJSON.result.household_json;

      const res2 = await fetch("https://api.policyengine.org/uk/metadata");
      const resJSON2 = await res2.json();
      metadata = resJSON2.result;
    } catch (err) {
      console.error(err);
    }

    const resultHousehold = updateHousehold(seedHousehold, metadata);

    expect(resultHousehold).toStrictEqual(testHousehold);
  });
  test("Ensure function returns false when householdInput contains deleted input variable with truthy value", async () => {
    let metadata = null;

    // Fetch US metadata
    try {
      const res = await fetch("https://api.policyengine.org/us/metadata");
      const resJSON = await res.json();
      metadata = resJSON.result;
    } catch (err) {
      console.error(err);
    }

    // Create false household that contains non-existent input variable with truthy value
    let testHousehold = JSON.parse(JSON.stringify(defaultHouseholds.us));
    testHousehold.people.you = {
      ...testHousehold.people.you,
      garbageVariable: {
        2023: 7,
      },
    };

    const resultHousehold = updateHousehold(testHousehold, metadata);
    expect(resultHousehold).toBe(false);
  });
});
