export const childNames = {
  us: "dependent",
  default: "child",
};

export const childCountFilters = {
  us: (person) => person?.is_tax_unit_dependent?.["2023"],
  default: (person) => person?.age?.[2023] < 18,
};
