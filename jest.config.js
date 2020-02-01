// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  moduleFileExtensions: [
    "js",
    "ts",
    "json"
  ],
  moduleDirectories: [
    "node_modules"
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
  roots: [
    "src"
  ],
  testRegex: "src/.*\\.spec\\.ts$",
  testEnvironment: "node",
  coverageDirectory: "coverage",
};
