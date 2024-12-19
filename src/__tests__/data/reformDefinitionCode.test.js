import {
  getReproducibilityCodeBlock,
  getHeaderCode,
  getBaselineCode,
  getReformCode,
  getSituationCode,
  getImplementationCode,
  sanitizeStringToPython,
} from "data/reformDefinitionCode";
import {
  baselinePolicyUS,
  baselinePolicyUK,
  reformPolicyUS,
  reformPolicyUK,
  householdUS,
} from "../__setup__/sampleData";
import data from "../__setup__/data.json";

let metadataUS = data["metadataUS"];
let metadataUK = data["metadataUK"];

describe("Test getReproducibilityCodeBlock", () => {
  test("Properly outputs array of values from functions it calls", () => {
    const output = getReproducibilityCodeBlock(
      "household",
      metadataUS,
      reformPolicyUS,
      "us",
      2024,
      null,
      householdUS,
    );

    expect(output).toBeInstanceOf(Array);
  });
});

describe("Test getHeaderCode", () => {
  test("Properly format household without reform", () => {
    const output = getHeaderCode("household", metadataUS, baselinePolicyUS);
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(1);
  });

  test("Properly format household with reform", () => {
    const output = getHeaderCode("household", metadataUS, reformPolicyUS);
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(2);
  });

  test("Properly format standard policy", () => {
    const output = getHeaderCode("policy", metadataUS, reformPolicyUS);
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(2);
  });
});

describe("Test getBaselineCode", () => {
  test("Output nothing for household type", () => {
    const output = getBaselineCode(baselinePolicyUS, metadataUS);
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(0);
  });
  test("Output nothing for policies with current-law baseline", () => {
    const output = getBaselineCode(baselinePolicyUK, metadataUK);
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(0);
  });
  test("Output baseline for policies with stated baseline", () => {
    let testPolicy = JSON.parse(JSON.stringify(baselinePolicyUK));
    testPolicy = {
      ...testPolicy,
      baseline: {
        data: {
          "sample.reform.item": {
            "2020.01.01": true,
            "2022.01.01": true,
          },
        },
        label: "dworkin",
        id: 1,
      },
    };
    const output = getBaselineCode(testPolicy, metadataUK);
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(7);
  });
});
describe("Test getReformCode", () => {
  test("Output nothing if there's no reform", () => {
    const output = getReformCode(baselinePolicyUS, metadataUS);
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(0);
  });
  test("Ensure normal output for non-US policy", () => {
    const output = getReformCode(reformPolicyUK, metadataUK);
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(7);
  });
});
describe("Test getSituationCode", () => {
  test("Policy type returns empty array", () => {
    const output = getSituationCode(
      "policy",
      metadataUS,
      baselinePolicyUS,
      2024,
    );
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(0);
  });
  test("Null variables deleted", () => {
    let testHousehold = JSON.parse(JSON.stringify(householdUS));
    const testVarName = Object.keys(metadataUS.variables).filter(
      (variable) => metadataUS.variables[variable].isInputVariable,
    )[150];
    const testVar = metadataUS.variables[testVarName];

    testHousehold.people.you = {
      ...testHousehold.people.you,
      [testVar.name]: {
        2024: null,
      },
    };

    const output = getSituationCode(
      "household",
      metadataUS,
      baselinePolicyUS,
      2024,
      testHousehold,
    );
    expect(output).toBeInstanceOf(Array);
    expect(output).not.toContain(testVar.name);
  });
  test("Inclusion of earning variation adds axes", () => {
    let testHousehold = JSON.parse(JSON.stringify(householdUS));

    const output = getSituationCode(
      "household",
      metadataUS,
      baselinePolicyUS,
      2024,
      testHousehold,
      true,
    );

    let includedString = "axes";
    let passing = false;

    for (const line of output) {
      if (line.includes(includedString)) {
        passing = true;
        break;
      }
    }

    expect(output).toBeInstanceOf(Array);
    expect(passing).toBe(true);
  });
  test("Code is sanitized for Python", () => {
    let testHousehold = JSON.parse(JSON.stringify(householdUS));

    const output = getSituationCode(
      "household",
      metadataUS,
      baselinePolicyUS,
      2024,
      testHousehold,
    );

    let excludedStrings = ["true", "false", "null"];
    let passing = true;

    for (const line of output) {
      for (const string of excludedStrings) {
        if (line.includes(string)) {
          passing = false;
          break;
        }
      }
    }

    expect(output).toBeInstanceOf(Array);
    expect(passing).toBe(true);
  });
  test("Reform code added if reform exists", () => {
    let testHousehold = JSON.parse(JSON.stringify(householdUS));

    const output = getSituationCode(
      "household",
      metadataUS,
      reformPolicyUS,
      2024,
      testHousehold,
    );

    let includedString = "reform";
    let passing = false;

    for (const line of output) {
      if (line.includes(includedString)) {
        passing = true;
        break;
      }
    }

    expect(output).toBeInstanceOf(Array);
    expect(passing).toBe(true);
  });
});
describe("Test getImplementationCode", () => {
  test("If not a policy type, return empty array", () => {
    const output = getImplementationCode("household", "us", metadataUS, 2024);
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(0);
  });
  test("If policy, return lines", () => {
    const output = getImplementationCode(
      "policy",
      "uk",
      metadataUK,
      2024,
      baselinePolicyUK,
    );
    expect(output).toBeInstanceOf(Array);
    // Ensure we don't code for reversed baseline and reform
    expect(output).not.toContain(
      "baseline = Microsimulation(reform=baseline_reform)",
    );
    // Ensure we don't code for state-level runs
    expect(output).not.toContain(
      'baseline = Microsimulation(dataset="pooled_3_year_cps_2023")',
    );
    // And ensure we don't code for both simultaneously
    expect(output).not.toContain(
      'baseline = Microsimulation(reform=baseline_reform, dataset="pooled_3_year_cps_2023")',
    );
  });
  test("If set baseline, return lines with baseline", () => {
    let testPolicy = JSON.parse(JSON.stringify(baselinePolicyUK));
    testPolicy = {
      ...testPolicy,
      baseline: {
        data: {
          "sample.reform.item": {
            "2020.01.01": true,
            "2022.01.01": true,
          },
        },
        label: "dworkin",
        id: 1,
      },
    };
    const output = getImplementationCode(
      "policy",
      "uk",
      metadataUK,
      2024,
      testPolicy,
    );
    expect(output).toBeInstanceOf(Array);
    expect(output).toContain("baseline = Microsimulation(reform=baseline)");
  });
  test("If US state, return lines with pooled 3-year CPS dataset", () => {
    let testPolicy = JSON.parse(JSON.stringify(baselinePolicyUS));
    testPolicy = {
      ...testPolicy,
      reform: {
        data: {
          "sample.reform.item": {
            "2020.01.01": true,
            "2022.01.01": true,
          },
        },
      },
    };

    const output = getImplementationCode(
      "policy",
      "ca",
      metadataUS,
      2024,
      testPolicy,
      null,
    );
    expect(output).toBeInstanceOf(Array);
    expect(output).toContain(
      'baseline = Microsimulation(dataset="pooled_3_year_cps_2023")',
    );
    expect(output).toContain(
      'reformed = Microsimulation(reform=reform, dataset="pooled_3_year_cps_2023")',
    );
  });
  test("If dataset provided, return lines with dataset", () => {
    const output = getImplementationCode(
      "policy",
      "us",
      metadataUS,
      2024,
      baselinePolicyUS,
      "enhanced_cps",
    );
    expect(output).toBeInstanceOf(Array);
    expect(output).toContain(
      'baseline = Microsimulation(dataset="enhanced_cps_2024")',
    );
  });
  test("If dataset provided alongside US state, return lines with dataset, not Pooled 3-Year CPS", () => {
    const output = getImplementationCode(
      "policy",
      "ks",
      metadataUS,
      2024,
      baselinePolicyUS,
      "enhanced_cps",
    );
    expect(output).toBeInstanceOf(Array);
    expect(output).toContain(
      'baseline = Microsimulation(dataset="enhanced_cps_2024")',
    );
  });
});

describe("Test sanitizeStringToPython", () => {
  test("It should convert 'null' to 'None'", () => {
    const testLine = "dworkin = null";

    const testOutput = sanitizeStringToPython(testLine);
    expect(testOutput).toBe("dworkin = None");
  });
  test("It should convert 'true' to 'True'", () => {
    const testLine = "dworkin = true";

    const testOutput = sanitizeStringToPython(testLine);
    expect(testOutput).toBe("dworkin = True");
  });
  test("It should convert 'false' to 'False'", () => {
    const testLine = "dworkin = false";

    const testOutput = sanitizeStringToPython(testLine);
    expect(testOutput).toBe("dworkin = False");
  });
});
