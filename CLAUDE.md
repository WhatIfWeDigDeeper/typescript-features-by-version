# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript features demonstration repository that contains test specs showcasing features from each TypeScript version release (3.0 through 4.0+). Each version has a corresponding test spec file ([src/3.0.spec.ts](src/3.0.spec.ts), [src/3.1.spec.ts](src/3.1.spec.ts), etc.) with examples demonstrating the features introduced in that release.

## Development Commands

### Dependency Management
- **IMPORTANT**: Always use `npm ci` for clean installs (never `rm -rf node_modules && npm install`)
- `npm ci` - Clean install dependencies (preferred method)
- `npm install` - Install/update dependencies
- `npm install <package>` - Add new dependency

### Testing
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `jest <file-path>` - Run a specific test file (e.g., `jest src/4.0.spec.ts`)

### Building
- `npm run compile` - Compile TypeScript to JavaScript (outputs to `dist/`)
- `npm run compile:watch` - Compile in watch mode
- `npm run clean` - Remove build output

### Linting & Formatting
- `npm run lint` - Run ESLint on all files
- `npm run lint:fix` - Auto-fix linting issues in src/**/*.ts
- `npm run format` - Format all files with Prettier

### Pre-commit
- Husky is configured to run `lint-staged` on pre-commit
- `lint-staged` runs `npm run lint:fix` on staged .ts files

## Code Structure

### Test Specs Organization
Each test spec file ([src/X.Y.spec.ts](src/)) is organized by TypeScript version and contains:
- Top-level `describe` block for the version (e.g., `describe('4.0', ...)`)
- Nested `describe` blocks for each feature category
- Individual `it` test cases demonstrating specific feature behaviors
- Tests are executable examples that verify TypeScript language features work as documented

The test files serve both as documentation and verification that TypeScript features work as expected.

### Shared Utilities
- [src/utilityTypes.ts](src/utilityTypes.ts) - Shared utility types (currently minimal)

## TypeScript Configuration

The project uses strict TypeScript settings ([tsconfig.json](tsconfig.json)):
- Target: ES2020
- Strict mode enabled with additional checks (`noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `noFallthroughCasesInSwitch`)
- Experimental decorators enabled
- Output directory: `dist/`

## ESLint Configuration

This project uses ESLint 9 with flat config format ([eslint.config.js](eslint.config.js)):
- ES module based configuration
- TypeScript ESLint integration via `typescript-eslint` package
- Notable rules:
  - `@typescript-eslint/explicit-function-return-type`: warn (tests should have explicit return types)
  - `@typescript-eslint/no-explicit-any`: warn (avoid `any` but allowed when necessary for demos)
  - `@typescript-eslint/no-unused-vars`: error
- Prettier integration for formatting consistency

## Testing Framework

Jest with ts-jest transformer:
- Tests match pattern: `src/**/*.spec.ts`
- Configuration in [jest.config.js](jest.config.js)
- Node test environment

## Debug Configurations

VSCode launch configurations available ([.vscode/launch.json](.vscode/launch.json)):
- "Jest Tests" - Debug all unit tests
- "Jest Active Unit Test" - Debug the currently open test file

## Adding TypeScript Version Features

When adding missing features to a version spec file:
1. Compare against the official TypeScript release notes for that version
2. Focus on features that can be demonstrated in tests (skip compiler flags that only affect tsconfig, editor-only features, etc.)
3. Each feature should have its own `describe` block with `it` tests showing usage and type errors via `@ts-expect-error`
