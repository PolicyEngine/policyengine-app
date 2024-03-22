import {
  getChildName,
  getCountChildren,
  addChild,
} from "pages/household/input/CountChildren.jsx";
import { removePerson } from "api/variables.js";
import { defaultHouseholds } from "data/defaultHouseholds.js";
import { defaultYear } from "data/constants";

describe("Test refactored CountChildren getChildName function", () => {
  test("Confirm that getChildName works for UK", () => {
    expect(getChildName(2, "uk")).toBe("your third child");
  });

  test("Confirm that getChildName works for US", () => {
    expect(getChildName(1, "us")).toBe("your second dependent");
  });

  test("Confirm that getChildName works for Nigeria", () => {
    expect(getChildName(3, "ng")).toBe("your fourth child");
  });

  test("Confirm that getChildName works for future countries by default (e.g., Tuvalu", () => {
    expect(getChildName(4, "tv")).toBe("your fifth child");
  });
});

describe("Test refactored CountChildren getCountChildren func", () => {
  test("Confirm that getCountChildren works for UK", () => {
    let testHousehold = JSON.parse(JSON.stringify(defaultHouseholds.uk));

    testHousehold.people["your first child"] = {
      age: {
        [defaultYear]: 15,
      },
    };
    testHousehold.people["your second child"] = {
      age: {
        [defaultYear]: 4,
      },
    };

    expect(getCountChildren(testHousehold, "uk", defaultYear)).toBe(2);
  });

  test("Confirm that getCountChildren works for US", () => {
    let testHousehold = JSON.parse(JSON.stringify(defaultHouseholds.us));

    testHousehold.people["your first dependent"] = {
      is_tax_unit_dependent: {
        [defaultYear]: true,
      },
    };

    expect(getCountChildren(testHousehold, "us", defaultYear)).toBe(1);
  });
});

describe("Test refactored addChild function", () => {
  test("Confirm that addChild works for UK", () => {
    let testHousehold = JSON.parse(JSON.stringify(defaultHouseholds.uk));

    const defaultChild = {
      age: { [defaultYear]: 10 },
    };
    const childCount = getCountChildren(testHousehold, "uk", defaultYear);
    const childName = getChildName(childCount, "uk");

    testHousehold.people[childName] = defaultChild;
    testHousehold.benunits["your immediate family"].members.push(childName);
    testHousehold.households["your household"].members.push(childName);

    expect(addChild(defaultHouseholds.uk, "uk", defaultYear)).toStrictEqual(
      testHousehold,
    );
  });
  test("Confirm that addChild works for US", () => {
    let testHousehold = JSON.parse(JSON.stringify(defaultHouseholds.us));

    const defaultChild = {
      age: { [defaultYear]: 10 },
      is_tax_unit_dependent: { [defaultYear]: true },
    };
    const childCount = getCountChildren(testHousehold, "us", defaultYear);
    const childName = getChildName(childCount, "us");

    testHousehold.people[childName] = defaultChild;
    testHousehold.tax_units["your tax unit"].members.push(childName);
    testHousehold.families["your family"].members.push(childName);
    testHousehold.spm_units["your household"].members.push(childName);
    testHousehold.households["your household"].members.push(childName);
    testHousehold.marital_units[`${childName}'s marital unit`] = {
      members: [childName],
      marital_unit_id: { [defaultYear]: childCount + 1 },
    };

    expect(addChild(defaultHouseholds.us, "us", defaultYear)).toStrictEqual(
      testHousehold,
    );
  });

  test("Confirm that addChild works for Nigeria", () => {
    let testHousehold = JSON.parse(JSON.stringify(defaultHouseholds.default));

    const defaultChild = {
      age: { [defaultYear]: 10 },
    };
    const childCount = getCountChildren(testHousehold, "ng", defaultYear);
    const childName = getChildName(childCount, "ng");

    testHousehold.people[childName] = defaultChild;
    testHousehold.households["your household"].members.push(childName);

    expect(
      addChild(defaultHouseholds.default, "ng", defaultYear),
    ).toStrictEqual(testHousehold);
  });
});

describe("Test that removePerson functions correctly", () => {
  test("With the UK", () => {
    const testSituation = {
      people: {
        you: {},
        "your partner": {
          age: {
            [defaultYear]: 40,
          },
        },
        "your first child": {
          age: {
            [defaultYear]: 10,
          },
        },
        "your second child": {
          age: {
            [defaultYear]: 10,
          },
        },
        "your third child": {
          age: {
            [defaultYear]: 10,
          },
        },
        "your fourth child": {
          age: {
            [defaultYear]: 10,
          },
        },
      },
      benunits: {
        "your immediate family": {
          members: [
            "you",
            "your partner",
            "your first child",
            "your second child",
            "your third child",
            "your fourth child",
          ],
          is_married: {
            [defaultYear]: true,
          },
        },
      },
      households: {
        "your household": {
          members: [
            "you",
            "your partner",
            "your first child",
            "your second child",
            "your third child",
            "your fourth child",
          ],
        },
      },
    };

    const expectedSituation = {
      people: {
        you: {},
        "your partner": {
          age: {
            [defaultYear]: 40,
          },
        },
        "your first child": {
          age: {
            [defaultYear]: 10,
          },
        },
        "your second child": {
          age: {
            [defaultYear]: 10,
          },
        },
        "your third child": {
          age: {
            [defaultYear]: 10,
          },
        },
      },
      benunits: {
        "your immediate family": {
          members: [
            "you",
            "your partner",
            "your first child",
            "your second child",
            "your third child",
          ],
          is_married: {
            [defaultYear]: true,
          },
        },
      },
      households: {
        "your household": {
          members: [
            "you",
            "your partner",
            "your first child",
            "your second child",
            "your third child",
          ],
        },
      },
    };

    const resultSituation = removePerson(testSituation, "your fourth child");

    expect(resultSituation).toStrictEqual(expectedSituation);
  });
  test("With the US", () => {
    const testSituation = {
      people: {
        you: {},
        "your partner": {
          age: {
            [defaultYear]: 40,
          },
        },
        "your first dependent": {
          age: {
            [defaultYear]: 10,
          },
          is_tax_unit_dependent: {
            [defaultYear]: true,
          },
        },
        "your second dependent": {
          age: {
            [defaultYear]: 10,
          },
          is_tax_unit_dependent: {
            [defaultYear]: true,
          },
        },
        "your third dependent": {
          age: {
            [defaultYear]: 10,
          },
          is_tax_unit_dependent: {
            [defaultYear]: true,
          },
        },
        "your fourth dependent": {
          age: {
            [defaultYear]: 10,
          },
          is_tax_unit_dependent: {
            [defaultYear]: true,
          },
        },
      },
      families: {
        "your family": {
          members: [
            "you",
            "your partner",
            "your first dependent",
            "your second dependent",
            "your third dependent",
            "your fourth dependent",
          ],
        },
      },
      marital_units: {
        "your marital unit": {
          members: ["you", "your partner"],
        },
        "your first dependent's marital unit": {
          members: ["your first dependent"],
          marital_unit_id: {
            [defaultYear]: 1,
          },
        },
        "your second dependent's marital unit": {
          members: ["your second dependent"],
          marital_unit_id: {
            [defaultYear]: 2,
          },
        },
        "your third dependent's marital unit": {
          members: ["your third dependent"],
          marital_unit_id: {
            [defaultYear]: 3,
          },
        },
        "your fourth dependent's marital unit": {
          members: ["your fourth dependent"],
          marital_unit_id: {
            [defaultYear]: 4,
          },
        },
      },
      tax_units: {
        "your tax unit": {
          members: [
            "you",
            "your partner",
            "your first dependent",
            "your second dependent",
            "your third dependent",
            "your fourth dependent",
          ],
        },
      },
      spm_units: {
        "your household": {
          members: [
            "you",
            "your partner",
            "your first dependent",
            "your second dependent",
            "your third dependent",
            "your fourth dependent",
          ],
        },
      },
      households: {
        "your household": {
          members: [
            "you",
            "your partner",
            "your first dependent",
            "your second dependent",
            "your third dependent",
            "your fourth dependent",
          ],
        },
      },
    };

    const expectedSituation = {
      people: {
        you: {},
        "your partner": {
          age: {
            [defaultYear]: 40,
          },
        },
        "your first dependent": {
          age: {
            [defaultYear]: 10,
          },
          is_tax_unit_dependent: {
            [defaultYear]: true,
          },
        },
        "your second dependent": {
          age: {
            [defaultYear]: 10,
          },
          is_tax_unit_dependent: {
            [defaultYear]: true,
          },
        },
        "your third dependent": {
          age: {
            [defaultYear]: 10,
          },
          is_tax_unit_dependent: {
            [defaultYear]: true,
          },
        },
      },
      families: {
        "your family": {
          members: [
            "you",
            "your partner",
            "your first dependent",
            "your second dependent",
            "your third dependent",
          ],
        },
      },
      marital_units: {
        "your marital unit": {
          members: ["you", "your partner"],
        },
        "your first dependent's marital unit": {
          members: ["your first dependent"],
          marital_unit_id: {
            [defaultYear]: 1,
          },
        },
        "your second dependent's marital unit": {
          members: ["your second dependent"],
          marital_unit_id: {
            [defaultYear]: 2,
          },
        },
        "your third dependent's marital unit": {
          members: ["your third dependent"],
          marital_unit_id: {
            [defaultYear]: 3,
          },
        },
      },
      tax_units: {
        "your tax unit": {
          members: [
            "you",
            "your partner",
            "your first dependent",
            "your second dependent",
            "your third dependent",
          ],
        },
      },
      spm_units: {
        "your household": {
          members: [
            "you",
            "your partner",
            "your first dependent",
            "your second dependent",
            "your third dependent",
          ],
        },
      },
      households: {
        "your household": {
          members: [
            "you",
            "your partner",
            "your first dependent",
            "your second dependent",
            "your third dependent",
          ],
        },
      },
    };

    const resultSituation = removePerson(
      testSituation,
      "your fourth dependent",
    );

    expect(resultSituation).toStrictEqual(expectedSituation);
  });
  test("With default cases", () => {
    const testSituation = {
      people: {
        you: {},
        "your partner": {
          age: {
            [defaultYear]: 40,
          },
        },
        "your first child": {
          age: {
            [defaultYear]: 10,
          },
        },
        "your second child": {
          age: {
            [defaultYear]: 10,
          },
        },
        "your third child": {
          age: {
            [defaultYear]: 10,
          },
        },
        "your fourth child": {
          age: {
            [defaultYear]: 10,
          },
        },
      },
      households: {
        "your household": {
          members: [
            "you",
            "your partner",
            "your first child",
            "your second child",
            "your third child",
            "your fourth child",
          ],
        },
      },
    };

    const expectedSituation = {
      people: {
        you: {},
        "your partner": {
          age: {
            [defaultYear]: 40,
          },
        },
        "your first child": {
          age: {
            [defaultYear]: 10,
          },
        },
        "your second child": {
          age: {
            [defaultYear]: 10,
          },
        },
        "your third child": {
          age: {
            [defaultYear]: 10,
          },
        },
      },
      households: {
        "your household": {
          members: [
            "you",
            "your partner",
            "your first child",
            "your second child",
            "your third child",
          ],
        },
      },
    };

    const resultSituation = removePerson(testSituation, "your fourth child");

    expect(resultSituation).toStrictEqual(expectedSituation);
  });
});
