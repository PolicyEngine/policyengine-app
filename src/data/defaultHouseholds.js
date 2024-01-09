import { defaultYear } from "./constants";

const DEFAULT_AGE = 40;

export const defaultHouseholds = {
  uk: {
    people: {
      you: {
        age: {
          [defaultYear]: DEFAULT_AGE
        }
      },
    },
    benunits: {
      "your immediate family": {
        members: ["you"],
      },
    },
    households: {
      "your household": {
        members: ["you"],
      },
    },
  },
  us: {
    people: {
      you: {
        age: {
          [defaultYear]: DEFAULT_AGE
        }
      },
    },
    families: {
      "your family": {
        members: ["you"],
      },
    },
    marital_units: {
      "your marital unit": {
        members: ["you"],
      },
    },
    tax_units: {
      "your tax unit": {
        members: ["you"],
      },
    },
    spm_units: {
      "your household": {
        members: ["you"],
      },
    },
    households: {
      "your household": {
        members: ["you"],
      },
    },
  },
  default: {
    people: {
      you: {
        age: {
          [defaultYear]: DEFAULT_AGE
        }
      },
    },
    households: {
      "your household": {
        members: ["you"],
      },
    },
  },
};
