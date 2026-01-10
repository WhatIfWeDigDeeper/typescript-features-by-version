// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

export default {
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'ts', 'json'],
  rootDir: '.',
  roots: ['src'],
  testEnvironment: 'node',
  testRegex: 'src/.*\\.spec\\.ts$',
  moduleNameMapper: {
    '^(.*)\\.js$': '$1'
  },
  transform: {
    '^.+\\.(ts)$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json'
    }],
  },
};
