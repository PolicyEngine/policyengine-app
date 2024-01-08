export const childNames = {
  us: "dependent",
  default: "child",
};

export function defaultChildren(countryId, year) {
  const childObjects = {
    us: {
      age: {
        [year]: 10,
      },
      is_tax_unit_dependent: {
        [year]: true,
      },
    },
    default: {
      age: {
        [year]: 10,
      },
    },
  };

  if (countryId in childObjects) {
    return childObjects[countryId];
  }
  return childObjects.default;
}

export function childCountFilters(countryId, year) {
  const filters = {
    us: (person) => person?.is_tax_unit_dependent?.[year],
    default: (person) => person?.age?.[year] < 18,
  };

  if (Object.keys(filters).includes(countryId)) {
    return filters[countryId];
  }
  return filters.default;

}

export const childAdders = {
  // prettier-ignore
  uk: function(situation, defaultChild, childName) {
    const newSituation = JSON.parse(JSON.stringify(situation));
    newSituation.people[childName] = defaultChild;
    newSituation.benunits["your immediate family"].members.push(childName);
    newSituation.households["your household"].members.push(childName);
    return newSituation;
  },
  // prettier-ignore
  us: function(situation, defaultChild, childName, childCount, year) { 
    const newSituation = JSON.parse(JSON.stringify(situation));
    newSituation.people[childName] = defaultChild;
    newSituation.tax_units["your tax unit"].members.push(childName);
    newSituation.families["your family"].members.push(childName);
    newSituation.spm_units["your household"].members.push(childName);
    newSituation.households["your household"].members.push(childName);
    newSituation.marital_units[`${childName}'s marital unit`] = {
      members: [childName],
      marital_unit_id: { [year]: childCount + 1 },
    };
    return newSituation;
  },
  // prettier-ignore
  default: function(situation, defaultChild, childName) {
    const newSituation = JSON.parse(JSON.stringify(situation));
    newSituation.people[childName] = defaultChild;
    newSituation.households["your household"].members.push(childName);
    return newSituation;
  },
};
