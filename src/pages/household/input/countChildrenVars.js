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
    situation.people[childName] = defaultChild;
    situation.benunits["your immediate family"].members.push(childName);
    situation.households["your household"].members.push(childName);
    return situation;
  },
  // prettier-ignore
  us: function(situation, defaultChild, childName, childCount) { 
    situation.people[childName] = defaultChild;
    situation.tax_units["your tax unit"].members.push(childName);
    situation.families["your family"].members.push(childName);
    situation.spm_units["your household"].members.push(childName);
    situation.households["your household"].members.push(childName);
    situation.marital_units[`${childName}'s marital unit`] = {
      members: [childName],
      marital_unit_id: { 2023: childCount + 1 },
    };
    return situation;
  },
  // prettier-ignore
  default: function(situation, defaultChild, childName) {
    situation.people[childName] = defaultChild;
    situation.households["your household"].members.push(childName);
    return situation;
  },
};
