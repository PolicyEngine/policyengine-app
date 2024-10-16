import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { wrappedJsonStringify, wrappedResponseJson } from "./src/data/wrappedJson";

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
  const metadataRaw = await wrappedResponseJson(res);
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
jsonData = wrappedJsonStringify(jsonData);

fs.writeFile(filePath, jsonData, (err) => {
  if (err) throw err;
  console.log("Data has been written to src/__tests__/__setup__/data.json");
});
