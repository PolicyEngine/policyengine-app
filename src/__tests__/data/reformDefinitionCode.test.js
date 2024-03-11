import fetch from "node-fetch";
import {
  getReproducibilityCodeBlock,
  getHeaderCode,
  getBaselineCode,
  getReformCode,
  getSituationCode,
  getImplementationCode,
} from "data/reformDefinitionCode";
import {
  baselinePolicyUS,
  baselinePolicyUK,
  reformPolicyUS,
  reformPolicyUK,
  householdUS,
} from "../__setup__/sampleData";

let metadataUS = null;

beforeAll(async () => {
  const res = await fetch("https://api.policyengine.org/us/metadata");
  const metadataRaw = await res.json();
  metadataUS = metadataRaw.result;
});

const numberedPolicyUS = {
  baseline: {
    data: {},
    label: "Current law",
    id: 2,
  },
  reform: {
    data: {
      "sample.reform.item.2": {
        "2020.01.01": 15,
        "2022.01.01": 20,
      },
    },
    label: "Sample reform",
    id: 0,
  },
};

describe("Test getReproducibilityCodeBlock", () => {
  test("Properly outputs array of values from functions it calls", () => {
    const output = getReproducibilityCodeBlock(
      "household",
      metadataUS,
      reformPolicyUS,
      "us",
      2024,
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
    expect(output.length).toBe(3);
  });

  test("Properly format standard policy", () => {
    const output = getHeaderCode("policy", metadataUS, reformPolicyUS);
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(3);
  });
});

describe("Test getBaselineCode", () => {
  test("Output nothing for household type", () => {
    const output = getBaselineCode("household", baselinePolicyUS, "us");
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(0);
  });
  test("Output nothing for non-US", () => {
    const output = getBaselineCode("policy", baselinePolicyUK, "uk");
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(0);
  });
  test("Output baseline override for US policies", () => {
    const output = getBaselineCode("policy", reformPolicyUS, "us");
    expect(output).toBeInstanceOf(Array);
    expect(output).toContain(
      "    parameters.simulation.reported_state_income_tax.update(",
    );
  });
});
describe("Test getReformCode", () => {
  test("Output nothing if there's no reform", () => {
    const output = getReformCode("household", baselinePolicyUS, "us");
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(0);
  });
  test("Ensure normal output for non-US policy", () => {
    const output = getReformCode("policy", reformPolicyUK, "uk");
    expect(output).toBeInstanceOf(Array);

    const paramAccessor = Object.keys(reformPolicyUK.reform.data)[0];
    expect(output).toContain(`    parameters.${paramAccessor}.update(`);
    expect(output).toContain(`        value=True)`);
  });
  test("Ensure addition of use_reported_state_income_tax for US policy", () => {
    const output = getReformCode("policy", reformPolicyUS, "us");
    expect(output).toBeInstanceOf(Array);
    expect(output).toContain(
      "    parameters.simulation.reported_state_income_tax.update(",
    );
    const paramName = Object.keys(reformPolicyUS.reform.data)[0];
    const paramAccessor = `parameters.${paramName}`;
    expect(output).toContain(`    ${paramAccessor}.update(`);
    expect(output).toContain(`        value=False)`);
  });
  test("Ensure proper formatting for policies with numbers", () => {
    const output = getReformCode("policy", numberedPolicyUS, "us");
    expect(output).toBeInstanceOf(Array);
    expect(output).toContain(
      "    parameters.simulation.reported_state_income_tax.update(",
    );
    const paramName = Object.keys(numberedPolicyUS.reform.data)[0];
    let nameParts = paramName.split(".");
    let numPart = nameParts[nameParts.length - 1];
    numPart = `children["${numPart}"]`;
    nameParts[nameParts.length - 1] = numPart;
    const sanitizedName = nameParts.join(".");

    expect(output).toContain(`    parameters.${sanitizedName}.update(`);
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
    const output = getImplementationCode("household", "us", 2024);
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(0);
  });
  test("If not US, return lines without state tax overrides", () => {
    const output = getImplementationCode("policy", "uk", 2024);
    expect(output).toBeInstanceOf(Array);
    expect(output).not.toContain(
      "baseline = Microsimulation(reform=baseline_reform)",
    );
  });
  test("If US, return lines with state tax overrides", () => {
    const output = getImplementationCode("policy", "us", 2024);
    expect(output).toBeInstanceOf(Array);
    expect(output).toContain(
      "baseline = Microsimulation(reform=baseline_reform)",
    );
  });
});
