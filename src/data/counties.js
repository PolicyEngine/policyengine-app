import {
  getByCountyAndState,
  getCountiesByState,
} from "@aciesai/fips-county-codes";

export class County {
  constructor(stateCode, name, fullName, fips) {
    this.stateCode = stateCode;
    this.name = name;
    this.fullName = fullName;
    this.fips = fips;
  }

  /**
   *
   * @returns {string} The name of a given county
   */
  getShortName() {
    return this.name;
  }

  getFullName() {
    return this.fullName;
  }

  /**
   *
   * @returns {string} The two-letter state code for a given county
   */
  getStateCode() {
    return this.stateCode;
  }

  /**
   *
   * @returns {string} The name of a given county and its state abbreviation
   */
  getNameAndStateAbbrev() {
    return `${this.fullName}, ${this.stateCode}`;
  }

  /**
   *
   * @returns {string | undefined} A given county's five-digit FIPS code as a string
   */
  getFipsCode() {
    // This needs to be in a try-catch because the fips-county-codes package
    // throws an error if it cannot find the county
    try {
      const dataObj = getByCountyAndState(this.stateCode, this.fullName);
      return dataObj?.fips;
    } catch (err) {
      console.error(
        "Unable to get FIPS code for county",
        this.fullName,
        "in state",
        this.stateCode,
      );
      return undefined;
    }
  }
}

const arrStates = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

/**
 * Fetch a list of all counties
 * @returns {County[]} An array of all counties
 */
export function getAllCounties() {
  let allStates = [];

  for (const state of arrStates) {
    const allCounties = getCountiesByState(state);
    for (const county of allCounties) {
      allStates.push(
        new County(
          state,
          county.county,
          county.fullname,
          `${county.statefp}${county.countyfp}`,
        ),
      );
    }
  }

  return allStates;
}
