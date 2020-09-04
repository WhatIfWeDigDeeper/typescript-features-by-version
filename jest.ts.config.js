// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const commonConfig = require('./jest.common.config');

module.exports = {
  ...commonConfig,
  ...{
    moduleFileExtensions: [
      "js",
      "ts",
      "json"
    ],
    transform: {
      "^.+\\.(ts)$": "ts-jest"
    },
    globals: {
      "ts-jest": {
        tsConfig: "tsconfig.json",
        diagnostics: false,
        isolatedModules: true
      }
    },
    rootDir: ".",
    testRegex: "src/.*\\.spec\\.ts$",
  }
};