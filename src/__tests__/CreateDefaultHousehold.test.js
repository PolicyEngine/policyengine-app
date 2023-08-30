// Internal imports
import { createDefaultHousehold } from "api/variables.js";
import { defaultHouseholds } from "data/defaultHouseholds.js";

function constructTestSituationUS() {
  let testHousehold = JSON.parse(JSON.stringify((defaultHouseholds.us)));

  // Add state_name to households
  testHousehold.households["your household"] = {
    ...testHousehold.households["your household"],
    state_name: {
      2023: null
    }
  };

  // Add employment_income and age to each person
  testHousehold.people.you = {
    ...testHousehold.people.you,
    employment_income: {
      2023: 0
    },
    age: {
      2023: 40
    }
  };

  return testHousehold;
}

// cDH sample metadata
async function fetchMetadata(countryId) {
	const res = await fetch(`https://api.policyengine.org/${countryId}/metadata`);
	const metadata = await res.json();
	return metadata.result;
}

describe('createDefaultHousehold', () => {
	test('creates default household for US', async () => {

		let metadata = await fetchMetadata("us");
    metadata.countryId = "us";
    const expectedDefaultHousehold = constructTestSituationUS();

		const output = createDefaultHousehold(metadata);
		expect(output).toStrictEqual(expectedDefaultHousehold);
	});
});
