const esModules = [
  "data-uri-to-buffer",
  "fetch-blob",
  "formdata-polyfill",
  "node-fetch",
].join("|");

module.exports = {
  modulePaths: ["<rootDir>/src"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  setupFiles: ["<rootDir>/src/__tests__/setup/setup.js"],
  testMatch: ["**/__tests__/**/*.test.js"],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__tests__/setup/fileMock.js",
    "\\.(css|less)$": "<rootDir>/src/__tests__/setup/fileMock.js",
  },
};
