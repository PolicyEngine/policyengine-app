const isUsOrUk = (region) => region === "us" || region === "uk";

const getLabel = (region, options) =>
  isUsOrUk(region)
    ? ""
    : "in " + options.find((option) => option.value === region)?.label;

const getLabelForPopulation = (region, options) =>
  isUsOrUk(region)
    ? " of the population"
    : " of " +
      options.find((option) => option.value === region)?.label +
      " residents";

export { getLabel, getLabelForPopulation };
