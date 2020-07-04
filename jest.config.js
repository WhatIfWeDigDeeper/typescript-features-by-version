// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  moduleFileExtensions: [
    "js",
    "json"
  ],
  moduleDirectories: [
    "node_modules"
  ],
  rootDir: "dist",
  roots: [
    "src"
  ],
  testRegex: "src/.*\\.spec\\.js$",
  testEnvironment: "node",
  coverageDirectory: "coverage",
};
