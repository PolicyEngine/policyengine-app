// Internal imports
import { createDefaultHousehold } from "api/variables.js";
import { defaultHouseholds } from "data/defaultHouseholds.js";

function constructTestSituationUS() {
  let testHousehold = JSON.parse(JSON.stringify((defaultHouseholds.us)));

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
