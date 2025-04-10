import { aggregateDecileComparison, aggregateValues } from "./aggregateUtils";

export function aggregateLaborSupplyModule(laborSupplyData) {
  return {
    hours: {
      baseline: aggregateValues(laborSupplyData.map((l) => l?.hours?.baseline)),
      change: aggregateValues(laborSupplyData.map((l) => l?.hours?.change)),
      income_effect: aggregateValues(
        laborSupplyData.map((l) => l?.hours?.income_effect),
      ),
      reform: aggregateValues(laborSupplyData.map((l) => l?.hours?.reform)),
      substitution_effect: aggregateValues(
        laborSupplyData.map((l) => l?.hours?.substitution_effect),
      ),
    },
    income_lsr: aggregateValues(laborSupplyData.map((l) => l?.income_lsr)),
    substitution_lsr: aggregateValues(
      laborSupplyData.map((l) => l?.substitution_lsr),
    ),
    total_change: aggregateValues(laborSupplyData.map((l) => l?.total_change)),
    revenue_change: aggregateValues(
      laborSupplyData.map((l) => l?.revenue_change),
    ),
    decile: {
      average: {
        income: aggregateDecileComparison(
          laborSupplyData.map((l) => l?.decile?.average?.income),
        ),
        substitution: aggregateDecileComparison(
          laborSupplyData.map((l) => l?.decile?.average?.substitution),
        ),
      },
      relative: {
        income: aggregateDecileComparison(
          laborSupplyData.map((l) => l?.decile?.relative?.income),
          "mean",
        ),
        substitution: aggregateDecileComparison(
          laborSupplyData.map((l) => l?.decile?.relative?.substitution),
          "mean",
        ),
      },
    },
    relative_lsr: {
      income: aggregateValues(
        laborSupplyData.map((l) => l?.relative_lsr?.income),
        "mean",
      ),
      substitution: aggregateValues(
        laborSupplyData.map((l) => l?.relative_lsr?.substitution),
        "mean",
      ),
    },
  };
}
