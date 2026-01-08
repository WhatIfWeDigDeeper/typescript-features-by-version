# Copilot Instructions for TypeScript Features Repository

## Project Overview

This repository documents and demonstrates TypeScript language features across versions 3.0 through 4.0+ using executable Jest tests. Each test file serves as both documentation and verification that TypeScript features work as officially described.

**Key principle**: Tests are the primary artifact. They demonstrate features through working code examples with assertions that validate behavior.

## File Organization

```
src/
├── 3.0.spec.ts through 4.0.spec.ts    # Version-specific test files
├── utilityTypes.ts                      # Shared utility type definitions
└── 3.8sample.ts                         # Additional examples (optional format)
```

- **Version files follow the naming pattern**: `X.Y.spec.ts` (e.g., `3.5.spec.ts`, `4.0.spec.ts`)
- **Each version file is self-contained**: Contains all examples for that version
- **Features are grouped by category**: Within each version file, features are organized into nested describe blocks

## Test Structure and Patterns

### Hierarchical Organization

Every test file follows this structure:

```typescript
describe('X.Y', (): void => {
  describe('Feature Category Name', (): void => {
    // Type definitions, helper functions, setup code

    it('describes specific observable behavior', (): void => {
      // Arrange
      const example = someValue;

      // Act
      const result = performAction(example);

      // Assert
      expect(result).toEqual(expectedValue);
    });

    it('another behavior example', (): void => {
      // test implementation
    });
  });

  describe('Another Feature Category', (): void => {
    // More tests...
  });
});
```

### Key Conventions

1. **Return type annotations**: All test functions must have explicit return type annotations (`: void`)
   - `describe` blocks: `(): void =>`
   - `it` blocks: `(): void =>`
   - Helper functions: explicit return types required

2. **Test naming**: Use present tense, describe observable behavior
   - ✅ Good: `it('spreads array elements into function parameters', ...)`
   - ❌ Poor: `it('should test spread operator', ...)`

3. **Test organization**: Follow AAA pattern (Arrange, Act, Assert)
   - Keep tests focused on a single feature aspect
   - One assertion per test is preferred unless testing related behaviors

4. **Feature demonstration code**: Include types, interfaces, and helper functions inside the describe block before test cases
   ```typescript
   describe('Union type inference', (): void => {
     type Result = string | number;
     const getValue = (): Result => Math.random() > 0.5 ? "hello" : 42;

     it('infers union types correctly', (): void => {
       const value = getValue();
       expect(typeof value).toMatch(/string|number/);
     });
   });
   ```

## Writing New Tests

When adding a new feature to an existing version file:

1. **Locate the appropriate feature category** within the version's describe block
2. **If the category doesn't exist**, create a new `describe('Feature Name', ...)`
3. **Define any types/helpers** at the describe block level (outside the `it` blocks)
4. **Write the test case** with explicit return type annotation
5. **Use meaningful assertions** that validate the feature works as documented

Example of adding a test to an existing category:

```typescript
describe('3.8', (): void => {
  // ... other categories ...

  describe('Type-Only Imports and Exports', (): void => {
    // Existing tests...

    type OnlyType = { id: number };

    it('allows importing only the type without runtime value', (): void => {
      const obj: OnlyType = { id: 1 };
      expect(obj.id).toBe(1);
    });
  });
});
```

## Coding Standards

### TypeScript Strictness

- **Strict mode is enabled**: All code must pass TypeScript's strict checks
- **No implicit `any`**: Always provide explicit types
- **Explicit return types**: Every function and test must declare return type
- **No unused variables**: Use eslint:disable only when necessary for feature demos

### Allowed Exceptions

- `@ts-expect-error`: Use to demonstrate type errors intentionally
- `// eslint-disable-next-line`: Allowed when demonstrating features that violate rules

Example:
```typescript
it('shows that this produces a type error', (): void => {
  // @ts-expect-error - intentionally assigning wrong type
  const x: string = 42;
  expect(x).toBe(42);
});
```

## Common Development Tasks

### Run Tests
```bash
npm test                    # Run all tests once
npm run test:watch         # Run tests in watch mode
jest src/3.8.spec.ts       # Run specific version file
```

### Code Quality
```bash
npm run lint               # Check for linting issues
npm run lint:fix           # Auto-fix linting issues
npm run format             # Format code with Prettier
```

### Build and Validate
```bash
npm run compile            # Compile TypeScript to dist/
npm run compile:watch      # Watch mode compilation
npm run prepush            # Compile and run all tests
```

## Adding a New Version File

When TypeScript releases a new version:

1. Create `src/X.Y.spec.ts` in the same format as existing files
2. Structure with top-level describe block for version: `describe('X.Y', ...)`
3. Organize features by category in nested describe blocks
4. Follow all code conventions (explicit return types, naming, etc.)
5. Reference the official TypeScript release notes for feature descriptions

## Testing Philosophy

- **Tests document behavior**: Each test should be readable as documentation
- **Tests verify accuracy**: Assertions confirm features work as TypeScript team documents
- **Examples are executable**: Code is not pseudo-code; it compiles and runs
- **Coverage by feature, not by line**: Aim to demonstrate each feature aspect, not maximize coverage percentage

## Debugging

VSCode launch configurations are available for debugging:
- "Jest Tests" - Debug all tests
- "Jest Active Unit Test" - Debug current test file

Use `npm run test:watch` during development for rapid feedback.

## References

- [CLAUDE.md](../../CLAUDE.md) - Development environment and configuration details
- [Official TypeScript Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/) - Feature specifications
- [jest.config.js](../../jest.config.js) - Jest configuration
- [tsconfig.json](../../tsconfig.json) - TypeScript strict mode settings
