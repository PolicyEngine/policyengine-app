import {
  setUKMaritalStatus,
  setUSMaritalStatus,
  setCAMaritalStatus,
} from "pages/household/input/MaritalStatus";
import { defaultHouseholds } from "data/defaultHouseholds";

// Metadata fetching function
async function fetchMetadata(countryId) {
  const res = await fetch(`https://api.policyengine.org/${countryId}/metadata`);
  const metadataRaw = await res.json();
  const metadata = metadataRaw.result;
  return metadata;
}

describe("Setting UK marital status within MaritalStatus.jsx", () => {
  test("functions with empty UK dataset, without adding empty tax variables", async () => {
    // Fetch UK metadata
    const metadata = await fetchMetadata("uk");

    // Take the default UK household struct, then following code from MaritalStatus.jsx,
    // edit the struct
    let testStruct = JSON.parse(JSON.stringify(defaultHouseholds.uk));
    const newStatus = "married";
    const defaultPartner = {
      age: {
        2024: 40,
      },
    };
    const partnerName = "your partner";
    testStruct.people[partnerName] = JSON.parse(JSON.stringify(defaultPartner));
    testStruct.benunits["your immediate family"].members.push(partnerName);
    testStruct.benunits["your immediate family"].is_married = {
      2024: true,
    };
    testStruct.benunits["your immediate family"].is_married["2024"] = true;
    testStruct.households["your household"].members.push(partnerName);

    // Compare the populated default struct against invocation of setUKMaritalStatus
    const output = setUKMaritalStatus(
      defaultHouseholds.uk,
      newStatus,
      metadata.variables,
    );

    expect(output).toStrictEqual(testStruct);
  });
});

describe("Setting US marital status within MaritalStatus.jsx", () => {
  test("functions with empty US dataset, without adding empty tax variables", async () => {
    // Fetch US metadata
    const metadata = await fetchMetadata("us");

    // Take the default US household struct, then following code from MaritalStatus.jsx,
    // edit the struct

    let testStruct = JSON.parse(JSON.stringify(defaultHouseholds.us));
    const newStatus = "married";
    const defaultPartner = {
      age: {
        2024: 40,
      },
    };
    const partnerName = "your partner";
    testStruct.people[partnerName] = JSON.parse(JSON.stringify(defaultPartner));
    testStruct.families["your family"].members.push(partnerName);
    testStruct.marital_units["your marital unit"].members.push(partnerName);
    testStruct.tax_units["your tax unit"].members.push(partnerName);
    testStruct.spm_units["your household"].members.push(partnerName);
    testStruct.households["your household"].members.push(partnerName);

    // Compare the populated default struct against invocation of setUSMaritalStatus
    const output = setUSMaritalStatus(
      defaultHouseholds.us,
      newStatus,
      metadata.variables,
    );

    expect(output).toStrictEqual(testStruct);
  });
});

describe("Setting Canada marital status within MaritalStatus.jsx", () => {
  test("functions with empty Canada dataset, without adding empty tax variables", async () => {
    // Fetch Canada metadata
    const metadata = await fetchMetadata("ca");

    // Take the default Canada household struct, then following code from MaritalStatus.jsx,
    // edit the struct

    let testStruct = defaultHouseholds.default;
    const newStatus = "married";
    const defaultPartner = {
      age: {
        2024: 40,
      },
    };
    const partnerName = "your partner";
    testStruct.people[partnerName] = JSON.parse(JSON.stringify(defaultPartner));
    testStruct.households["your household"].members.push(partnerName);

    // Compare the populated default struct against invocation of setCAMaritalStatus
    const output = setCAMaritalStatus(
      defaultHouseholds.default,
      newStatus,
      metadata.variables,
    );

    expect(output).toStrictEqual(testStruct);
  });
});
