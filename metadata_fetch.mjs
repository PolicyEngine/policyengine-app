import fetch from "node-fetch";
import fs from "fs";
import path from "path";

let metadataUS = null;
let metadataUK = null;
let metadataCA = null;
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.join(
  __dirname,
  "src",
  "__tests__",
  "__setup__",
  "data.json",
);

async function fetchMetadata(countryId) {
  const res = await fetch(`https://api.policyengine.org/${countryId}/metadata`);
  // For the time being, this is being kept as res.json(), unlike
  // the rest of the repo, due to Jest's challenges with ES6 modules
  const metadataRaw = await res.json();
  const metadata = metadataRaw.result;
  return metadata;
}

metadataUS = await fetchMetadata("us");
metadataUK = await fetchMetadata("uk");
metadataCA = await fetchMetadata("ca");

let jsonData = {
  metadataUS: metadataUS,
  metadataUK: metadataUK,
  metadataCA: metadataCA,
};
// For the time being, this is being kept as res.json(), unlike
// the rest of the repo, due to Jest's challenges with ES6 modules
jsonData = JSON.stringify(jsonData);

fs.writeFile(filePath, jsonData, (err) => {
  if (err) throw err;
  console.log("Data has been written to src/__tests__/__setup__/data.json");
});
