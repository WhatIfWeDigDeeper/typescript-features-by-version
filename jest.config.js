// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const commonConfig = require('./jest.common.config');

module.exports = {
  ...commonConfig,
  ...{
    moduleFileExtensions: [
      "js",
      "json"
    ],
    rootDir: "dist",
    testRegex: "src/.*\\.spec\\.js$",
  }
};
