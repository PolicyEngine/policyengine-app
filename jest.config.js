module.exports = {
  modulePaths: [
    "<rootDir>/src"
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(react-markdown|bar)/)"
  ]
}
/*
  "jest": {
    "modulePaths": [
      "<rootDir>/src"
    ],
    "testEnvironment": "jsdom",
    "transform": {
      "^.+\\.[jt]sx?$": "babel-jest"
    },
    "transformIgnorePatterns": [
      "/node_modules/(?!(react-markdown|bar)/)"
    ]
  },
*/