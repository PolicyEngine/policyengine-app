const esModules = [
  "data-uri-to-buffer",
  "fetch-blob",
  "formdata-polyfill",
  "node-fetch"
].join("|");

module.exports = {
  modulePaths: [
    "<rootDir>/src"
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    `/node_modules/(?!${esModules})`
  ],
  setupFiles: [
    "<rootDir>/src/__tests__/setup/setup.js"
  ]
}