import posts from "./posts.json";

const postsSorted = posts.sort((a, b) => (a.date < b.date ? 1 : -1));

for (let post of postsSorted) {
  post.slug = post.filename.substring(0, post.filename.indexOf("."));
}

const tags = postsSorted.map((post) => post.tags);
const uniqueTags = [...new Set([].concat(...tags))].sort();

const locationTags = uniqueTags.filter((tag) =>
  ["us", "uk", "ng", "ca", "global"].some(
    (countryId) => tag.startsWith(countryId + "-") || tag === countryId,
  ),
);
const topicTags = uniqueTags
  .filter((tag) => !locationTags.includes(tag))
  .sort();

const topicLabels = {
  featured: "Featured",
  impact: "Impact",
  policy: "Policy analysis",
  technical: "Technical report",
};

const locationLabels = {
  us: "United States",
  uk: "United Kingdom",
  global: "Global",
  ng: "Nigeria",
  "us-dc": "District of Columbia, U.S.",
  "us-ak": "Alaska, U.S.",
  "us-al": "Alabama, U.S.",
  "us-ar": "Arkansas, U.S.",
  "us-az": "Arizona, U.S.",
  "us-ca": "California, U.S.",
  "us-co": "Colorado, U.S.",
  "us-ct": "Connecticut, U.S.",
  "us-de": "Delaware, U.S.",
  "us-fl": "Florida, U.S.",
  "us-ga": "Georgia, U.S.",
  "us-hi": "Hawaii, U.S.",
  "us-ia": "Iowa, U.S.",
  "us-id": "Idaho, U.S.",
  "us-il": "Illinois, U.S.",
  "us-in": "Indiana, U.S.",
  "us-ks": "Kansas, U.S.",
  "us-ky": "Kentucky, U.S.",
  "us-la": "Louisiana, U.S.",
  "us-ma": "Massachusetts, U.S.",
  "us-md": "Maryland, U.S.",
  "us-me": "Maine, U.S.",
  "us-mi": "Michigan, U.S.",
  "us-mn": "Minnesota, U.S.",
  "us-mo": "Missouri, U.S.",
  "us-ms": "Mississippi, U.S.",
  "us-mt": "Montana, U.S.",
  "us-nc": "North Carolina, U.S.",
  "us-nd": "North Dakota, U.S.",
  "us-ne": "Nebraska, U.S.",
  "us-nh": "New Hampshire, U.S.",
  "us-nj": "New Jersey, U.S.",
  "us-nm": "New Mexico, U.S.",
  "us-nv": "Nevada, U.S.",
  "us-ny": "New York, U.S.",
  "us-oh": "Ohio, U.S.",
  "us-ok": "Oklahoma, U.S.",
  "us-or": "Oregon, U.S.",
  "us-pa": "Pennsylvania, U.S.",
  "us-ri": "Rhode Island, U.S.",
  "us-sc": "South Carolina, U.S.",
  "us-sd": "South Dakota, U.S.",
  "us-tn": "Tennessee, U.S.",
  "us-tx": "Texas, U.S.",
  "us-ut": "Utah, U.S.",
  "us-va": "Virginia, U.S.",
  "us-vt": "Vermont, U.S.",
  "us-wa": "Washington, U.S.",
  "us-wi": "Wisconsin, U.S.",
  "us-wv": "West Virginia, U.S.",
  "us-wy": "Wyoming, U.S.",
};

export {
  postsSorted as posts,
  locationTags,
  uniqueTags,
  topicTags,
  locationLabels,
  topicLabels,
};
