import fetch from "node-fetch";
import {
  getHeaderCode,
  getBaselineCode,
  getReformCode,
  getSituationCode,
  getImplementationCode
} from "data/reformDefinitionCode";

let metadataUS = null;
let metadataUK = null;

beforeAll(async () => {
  const res = await fetch("https://api.policyengine.org/us/metadata");
  const metadataRaw = await res.json();
  metadataUS = metadataRaw.result;

  const resUK = await fetch("https://api.policyengine.org/uk/metadata");
  const metadataRawUK = await resUK.json();
  metadataUK = metadataRawUK.result;
});

const baselinePolicyUK = {
  baseline: {
    data: {},
    label: "Current law",
    id: 1,
  },
  reform: {
    data: {},
    label: "Current law",
    id: 1,
  },
}

const baselinePolicyUS = {
  baseline: {
    data: {},
    label: "Current law",
    id: 2,
  },
  reform: {
    data: {},
    label: "Current law",
    id: 2,
  },
};

const normalPolicyUK = {
  baseline: {
    data: {},
    label: "Current law",
    id: 1,
  },
  reform: {
    data: {
      "sample.reform.item": {
        "2020.01.01": true,
        "2022.01.01": true
      }
    },
    label: "Sample reform",
    id: 0,
  },
};

const normalPolicyUS = {
  baseline: {
    data: {},
    label: "Current law",
    id: 2,
  },
  reform: {
    data: {
      "sample.reform.item": {
        "2020.01.01": false,
        "2022.01.01": false
      }
    },
    label: "Sample reform",
    id: 0,
  },
};

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
        "2022.01.01": 20
      }
    },
    label: "Sample reform",
    id: 0,
  },
};

describe("Test getHeaderCode", () => {

  test("Properly format household without reform", () => {
    const output = getHeaderCode("household", metadataUS, baselinePolicyUS);
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(1);
  });

  test("Properly format household with reform", () => {
    const output = getHeaderCode("household", metadataUS, normalPolicyUS);
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(3);
  });

  test("Properly format standard policy", () => {
    const output = getHeaderCode("policy", metadataUS, normalPolicyUS);
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(3);
  });

  test("Properly format policy with param name that has number", () => {
    const output = getHeaderCode("policy", metadataUS, numberedPolicyUS);
    expect(output).toBeInstanceOf(Array);
    expect(output.length).toBe(4);
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
    const output = getBaselineCode("policy", normalPolicyUS, "us");
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
    const output = getReformCode("policy", normalPolicyUK, "uk");
    expect(output).toBeInstanceOf(Array);

    const paramAccessor = Object.keys(normalPolicyUK.reform.data)[0];
    expect(output).toContain(
      `    parameters.${paramAccessor}.update(`,
    );
    expect(output).toContain(
      `        value=True)`
    );
  });
  test("Ensure addition of use_reported_state_income_tax for US policy", () => {
    const output = getReformCode("policy", normalPolicyUS, "us");
    expect(output).toBeInstanceOf(Array);
    expect(output).toContain(
      "    parameters.simulation.reported_state_income_tax.update(",
    )
    const paramName = Object.keys(normalPolicyUS.reform.data)[0];
    const paramAccessor = `parameters.${paramName}`;
    expect(output).toContain(
      `    ${paramAccessor}.update(`,
    );
    expect(output).toContain(
      `        value=False)`
    );
  });
  test("Ensure use of 'reduce' for policies with numbers", () => {
    const output = getReformCode("policy", numberedPolicyUS, "us");
    expect(output).toBeInstanceOf(Array);
    expect(output).toContain(
      "    parameters.simulation.reported_state_income_tax.update(",
    )
    const paramName = Object.keys(numberedPolicyUS.reform.data)[0];
    const paramAccessor = `reduce(getattr, "${paramName}".split("."), parameters)`;
    expect(output).toContain(
      `    ${paramAccessor}.update(`,
    );
  });
});
/*
describe("Test getSituationCode", () => {

});
*/
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
      "baseline = Microsimulation(reform=baseline_reform)"
    );
  });
  test("If US, return lines with state tax overrides", () => {
    const output = getImplementationCode("policy", "us", 2024);
    expect(output).toBeInstanceOf(Array);
    expect(output).toContain(
      "baseline = Microsimulation(reform=baseline_reform)"
    );
  });

});

/*
    ...getSituationCode(
      type,
      metadata,
      policy,
      year,
      householdInput,
      earningVariation,
    ),
    */