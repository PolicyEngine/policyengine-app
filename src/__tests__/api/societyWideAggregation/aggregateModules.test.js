import {
  aggregateBudgetModule,
  aggregateDecileModule,
  aggregateInequalityModule,
  aggregateIntraDecileModule,
  aggregatePovertyByAgeModule,
  aggregatePovertyByGenderModule,
  aggregatePovertyByRaceModule,
  aggregateConstituencyModule,
  aggregateDetailedBudgetModule,
} from "../../../api/societyWideAggregation/aggregateModules";

import {
  validBudgetModuleData,
  expectedBudgetModuleData,
  validDecileModuleData,
  expectedDecileModuleData,
  validInequalityModuleData,
  expectedInequalityModuleData,
  validIntraDecileModuleData,
  expectedIntraDecileModuleData,
  validPovertyByAgeModuleData,
  expectedPovertyByAgeModuleData,
  emptyPovertyByAgeModuleData,
  expectedEmptyPovertyByAgeModuleData,
  validPovertyByGenderModuleData,
  expectedPovertyByGenderModuleData,
  emptyPovertyByGenderModuleData,
  expectedEmptyPovertyByGenderModuleData,
  validPovertyByRaceModuleData,
  expectedPovertyByRaceModuleData,
  emptyPovertyByRaceModuleData,
  expectedEmptyPovertyByRaceModuleData,
  validConstituencyModuleData,
  expectedConstituencyModuleData,
  emptyConstituencyModuleData,
  validDetailedBudgetModuleData,
  expectedDetailedBudgetModuleData,
  emptyDetailedBudgetModuleData,
  expectedEmptyDetailedBudgetModuleData,
  emptyIntraDecileModuleData,
  expectedEmptyIntraDecileModuleData,
} from "../../__setup__/sampleSocietyWideModules";

describe("aggregateBudgetModule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid budget data", () => {
    test("it should return a valid budget object", () => {
      expect(aggregateBudgetModule(validBudgetModuleData)).toEqual(
        expectedBudgetModuleData,
      );
    });
  });

  describe("Given no budget data", () => {
    test("it should return an object with all keys and null values", () => {
      const emptyBudgetModuleData = [];
      const expectedEmptyBudgetModuleData = {
        baseline_net_income: null,
        benefit_spending_impact: null,
        budgetary_impact: null,
        households: null,
        state_tax_revenue_impact: null,
        tax_revenue_impact: null,
      };

      expect(aggregateBudgetModule(emptyBudgetModuleData)).toEqual(
        expectedEmptyBudgetModuleData,
      );
    });
  });
});

describe("aggregateDecileModule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid decile data", () => {
    test("it should return a valid decile object", () => {
      expect(aggregateDecileModule(validDecileModuleData)).toEqual(
        expectedDecileModuleData,
      );
    });
  });

  describe("Given no decile data", () => {
    test("it should return an object with empty objects", () => {
      const emptyDecileModuleData = [];
      const expectedEmptyDecileModuleData = {
        average: {},
        relative: {},
      };

      expect(aggregateDecileModule(emptyDecileModuleData)).toEqual(
        expectedEmptyDecileModuleData,
      );
    });
  });
});

describe("aggregateInequalityModule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid inequality data", () => {
    test("it should return a valid inequality object", () => {
      expect(aggregateInequalityModule(validInequalityModuleData)).toEqual(
        expectedInequalityModuleData,
      );
    });
  });

  describe("Given no inequality data", () => {
    test("it should return an object containing nulled sub-objects", () => {
      const emptyInequalityModuleData = [];
      const expectedEmptyInequalityModuleData = {
        gini: {
          baseline: null,
          reform: null,
        },
        top_10_pct_share: {
          baseline: null,
          reform: null,
        },
        top_1_pct_share: {
          baseline: null,
          reform: null,
        },
      };

      expect(aggregateInequalityModule(emptyInequalityModuleData)).toEqual(
        expectedEmptyInequalityModuleData,
      );
    });
  });
});

describe("aggregateIntraDecileModule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid intra decile data", () => {
    test("it should return a valid intra decile object", () => {
      expect(aggregateIntraDecileModule(validIntraDecileModuleData)).toEqual(
        expectedIntraDecileModuleData,
      );
    });
  });

  describe("Given no intra decile data", () => {
    test("it should return an object with properly structured nulls and empty arrays", () => {
      expect(aggregateIntraDecileModule(emptyIntraDecileModuleData)).toEqual(
        expectedEmptyIntraDecileModuleData,
      );
    });
  });
});

describe("aggregatePovertyByAgeModule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid poverty by age data", () => {
    test("it should return a valid poverty by age object", () => {
      expect(aggregatePovertyByAgeModule(validPovertyByAgeModuleData)).toEqual(
        expectedPovertyByAgeModuleData,
      );
    });
  });

  describe("Given no poverty by age data", () => {
    test("it should return an object with nulled sub-objects", () => {
      expect(aggregatePovertyByAgeModule(emptyPovertyByAgeModuleData)).toEqual(
        expectedEmptyPovertyByAgeModuleData,
      );
    });
  });
});

describe("aggregatePovertyByGenderModule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid poverty by gender data", () => {
    test("it should return a valid poverty by gender object", () => {
      expect(
        aggregatePovertyByGenderModule(validPovertyByGenderModuleData),
      ).toEqual(expectedPovertyByGenderModuleData);
    });
  });

  describe("Given no poverty by gender data", () => {
    test("it should return an object with nulled sub-objects", () => {
      expect(
        aggregatePovertyByGenderModule(emptyPovertyByGenderModuleData),
      ).toEqual(expectedEmptyPovertyByGenderModuleData);
    });
  });
});

describe("aggregatePovertyByRaceModule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid poverty by race data", () => {
    test("it should return a valid poverty by race object", () => {
      expect(
        aggregatePovertyByRaceModule(validPovertyByRaceModuleData),
      ).toEqual(expectedPovertyByRaceModuleData);
    });
  });

  describe("Given no poverty by race data", () => {
    test("it should return an object with nulled sub-objects", () => {
      expect(
        aggregatePovertyByRaceModule(emptyPovertyByRaceModuleData),
      ).toEqual(expectedEmptyPovertyByRaceModuleData);
    });
  });
});

describe("aggregateConstituencyModule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid constituency data", () => {
    test("it should return a valid constituency object", () => {
      expect(aggregateConstituencyModule(validConstituencyModuleData)).toEqual(
        expectedConstituencyModuleData,
      );
    });
  });

  describe("Given no constituency data", () => {
    test("it should throw an error for empty impacts", () => {
      expect(() => {
        aggregateConstituencyModule(emptyConstituencyModuleData);
      }).toThrow("Cannot aggregate empty or undefined impacts");
    });

    test("it should throw an error for undefined impacts", () => {
      expect(() => {
        aggregateConstituencyModule(undefined);
      }).toThrow("Cannot aggregate empty or undefined impacts");
    });
  });
});

describe("aggregateDetailedBudgetModule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid detailed budget data", () => {
    test("it should return a valid detailed budget object", () => {
      expect(
        aggregateDetailedBudgetModule(validDetailedBudgetModuleData),
      ).toEqual(expectedDetailedBudgetModuleData);
    });
  });

  describe("Given no detailed budget data", () => {
    test("it should return an empty object", () => {
      expect(
        aggregateDetailedBudgetModule(emptyDetailedBudgetModuleData),
      ).toEqual(expectedEmptyDetailedBudgetModuleData);
    });
  });
});
