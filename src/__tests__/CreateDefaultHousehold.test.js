// External imports

// Internal imports
import { createDefaultHousehold, addYearlyVariables } from "api/variables.js";

// cDH sample data
const countryId = 'us';

const defaultHousehold = {
  people: {
    you: {},
  },
  families: {
    "your family": {
      members: ["you"],
    },
  },
  marital_units: {
    "your marital unit": {
      members: ["you"],
    },
  },
  tax_units: {
    "your tax unit": {
      members: ["you"],
    },
  },
  spm_units: {
    "your household": {
      members: ["you"],
    },
  },
  households: {
    "your household": {
      members: ["you"],
    },
  },
};

// cDH sample metadata
async function fetchMetadata() {
	const res = await fetch(`https://api.policyengine.org/${countryId}/metadata`);
	const metadata = await res.json();
	return metadata;
}

describe('createDefaultHousehold', () => {
	test('creates household without yearly variables', async () => {

		const metadata = await fetchMetadata();

		const output = createDefaultHousehold(countryId);

		expect(output).toStrictEqual(defaultHousehold);
	})
})
