import { defaultYear } from "data/constants";

export const baselinePolicyUK = {
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
};

export const baselinePolicyUS = {
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

export const reformPolicyUK = {
  baseline: {
    data: {},
    label: "Current law",
    id: 1,
  },
  reform: {
    data: {
      "sample.reform.item": {
        "2020.01.01": true,
        "2022.01.01": true,
      },
    },
    label: "Sample reform",
    id: 0,
  },
};

export const reformPolicyUS = {
  baseline: {
    data: {},
    label: "Current law",
    id: 2,
  },
  reform: {
    data: {
      "sample.reform.item": {
        "2020.01.01": false,
        "2022.01.01": false,
      },
    },
    label: "Sample reform",
    id: 0,
  },
};

export const householdUS = {
  people: {
    you: {
      age: {
        [defaultYear]: 40,
      },
      employment_income: {
        [defaultYear]: 15555,
      },
    },
    "your partner": {
      age: {
        [defaultYear]: 40,
      },
      employment_income: {
        [defaultYear]: 0,
      },
    },
    "your first dependent": {
      age: {
        [defaultYear]: 10,
      },
      is_tax_unit_dependent: {
        [defaultYear]: true,
      },
      employment_income: {
        [defaultYear]: 0,
      },
    },
  },
  families: {
    "your family": {
      members: ["you", "your partner", "your first dependent"],
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
  },
  tax_units: {
    "your tax unit": {
      members: ["you", "your partner", "your first dependent"],
    },
  },
  spm_units: {
    "your household": {
      members: ["you", "your partner", "your first dependent"],
    },
  },
  households: {
    "your household": {
      members: ["you", "your partner", "your first dependent"],
      state_name: {
        [defaultYear]: "AZ",
      },
    },
  },
};

export const householdUK = {
  people: {
    you: {
      age: {
        [defaultYear]: 40,
      },
      employment_income: {
        [defaultYear]: 15555,
      },
    },
    "your partner": {
      age: {
        [defaultYear]: 40,
      },
      employment_income: {
        [defaultYear]: 0,
      },
    },
    "your first child": {
      age: {
        [defaultYear]: 10,
      },
      employment_income: {
        [defaultYear]: 0,
      },
    },
  },
  benunits: {
    "your immediate family": {
      members: ["you", "your partner", "your first child"],
      is_married: {
        [defaultYear]: true,
      },
    },
  },
  households: {
    "your household": {
      members: ["you", "your partner", "your first child"],
      BRMA: {
        [defaultYear]: "PLYMOUTH",
      },
      local_authority: {
        [defaultYear]: "PLYMOUTH",
      },
      region: {
        [defaultYear]: "SOUTH_WEST",
      },
    },
  },
};