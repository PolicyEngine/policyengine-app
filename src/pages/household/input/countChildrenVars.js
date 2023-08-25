export const childNames = {
  us: "dependent",
  default: "child",
};

export const childCountFilters = {
  us: (person) => person?.is_tax_unit_dependent?.["2023"],
  default: (person) => person?.age?.[2023] < 18,
};

export const childAdders = {
  // prettier-ignore
  uk: function(situation, defaultChild, childName) {
    const newSituation = Object.assign(situation);
    newSituation.people[childName] = defaultChild;
    newSituation.benunits["your immediate family"].members.push(childName);
    newSituation.households["your household"].members.push(childName);
    return newSituation;
  },
  // prettier-ignore
  us: function(situation, defaultChild, childName, childCount) { 
    const newSituation = Object.assign(situation);
    newSituation.people[childName] = defaultChild;
    newSituation.tax_units["your tax unit"].members.push(childName);
    newSituation.families["your family"].members.push(childName);
    newSituation.spm_units["your household"].members.push(childName);
    newSituation.households["your household"].members.push(childName);
    newSituation.marital_units[`${childName}'s marital unit`] = {
      members: [childName],
      marital_unit_id: { 2023: childCount + 1 },
    };
    return newSituation;
  },
  // prettier-ignore
  default: function(situation, defaultChild, childName) {
    const newSituation = Object.assign(situation);
    newSituation.people[childName] = defaultChild;
    newSituation.households["your household"].members.push(childName);
    return newSituation;
  },
};
