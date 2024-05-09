import fetch from "node-fetch";

let metadataUS = null;
let metadataUK = null;
let metadataCA = null;

beforeAll(async () => {
  async function fetchMetadata(countryId) {
    const res = await fetch(
      `https://api.policyengine.org/${countryId}/metadata`,
    );
    const metadataRaw = await res.json();
    const metadata = metadataRaw.result;
    return metadata;
  }

  metadataUS = await fetchMetadata("us");
  metadataUK = await fetchMetadata("uk");
  metadataCA = await fetchMetadata("ca");
});

export { metadataUS, metadataUK, metadataCA };
