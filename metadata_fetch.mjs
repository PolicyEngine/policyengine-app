import fetch from "node-fetch";

var metadataUS = null;
var metadataUK = null;
var metadataCA = null;

async function fetchMetadata(countryId) {
  const res = await fetch(
    `https://api.policyengine.org/${countryId}/metadata`,
  );
  const metadataRaw = await res.json();
  const metadata = metadataRaw.result;
  // console.log('metadata, ', metadata)
  return metadata;
}

const fetchAllMetadata = async () => {
  await fetchMetadata("us").then((result) => metadataUS = result);
  await fetchMetadata("uk").then((result) => metadataUK = result);
  await fetchMetadata("ca").then((result) => metadataCA = result);
};

await fetchAllMetadata();
console.log(metadataUS)

export { metadataUS, metadataUK, metadataCA };
