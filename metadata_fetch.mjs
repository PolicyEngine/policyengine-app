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

/**
 * Replaces Response.json(), which unfortunately has no
 * native way of passing a reviver
 *
 * This function is copied, instead of imported, due to
 * limitations of Jest within ES6+ module environment
 * @param {Response} response The response object
 * @returns {Promise} The JSON object, parsed with custom reviver
 */
function wrappedResponseJson(response) {
  return new Promise((resolve, reject) => {
    response.text().then((text) => {
      resolve(wrappedJsonParse(text));
    });
  });
}

function wrappedJsonParse() {
  return JSON.parse(...arguments, JsonReviver);
}

function JsonReviver(key, value) {
  if (value === "Infinity") {
    return Infinity;
  }
  if (value === "-Infinity") {
    return -Infinity;
  }
  return value;
}

async function fetchMetadata(countryId) {
  const res = await fetch(`https://api.policyengine.org/${countryId}/metadata`);
  // For the time being, this is being kept as res.json(), unlike
  // the rest of the repo, due to Jest's challenges with ES6 modules
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
// For the time being, this is being kept as res.json(), unlike
// the rest of the repo, due to Jest's challenges with ES6 modules
jsonData = JSON.stringify(jsonData);

fs.writeFile(filePath, jsonData, (err) => {
  if (err) throw err;
  console.log("Data has been written to src/__tests__/__setup__/data.json");
});
