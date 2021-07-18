// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  coverageDirectory: "coverage",
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      diagnostics: false,
      isolatedModules: true
    }
  },
  moduleDirectories: [
    "node_modules"
  ],
  moduleFileExtensions: [
    "js",
    "ts",
    "json"
  ],
  rootDir: ".",
  roots: [
    "src"
  ],
  testEnvironment: "node",
  testRegex: "src/.*\\.spec\\.ts$",
  transform: {
    "^.+\\.(ts)$": "ts-jest"
  },
};
