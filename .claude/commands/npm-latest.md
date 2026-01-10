# npm-latest Command

Updates npm packages to their latest versions with automated testing and validation in an isolated git worktree.

## Usage

```bash
/npm-latest <packages>    # Update specific packages
/npm-latest .             # Update all packages
/npm-latest jest*         # Update with glob pattern
```

## Workflow

1. Create git worktree for isolated testing
2. Check latest versions (prefer LTS tags when available)
3. Update packages with `npm install <package>@latest`
4. Run `npm audit` and attempt fixes
5. Validate with compile, lint, and test commands
6. Fix any compatibility issues from breaking changes
7. Create commit with updates and fixes
8. Ask user to approve merge or review first
9. Merge to current branch and clean up worktree

## Instructions for Claude

### Setup

1. **Parse arguments**: "." means all packages, globs like `jest*` expand to matching packages
2. **Find package.json** in current directory or `expense-tracker-ai/`
3. **Create worktree**:
   ```bash
   WORKTREE_NAME="npm-update-$(date +%Y%m%d-%H%M%S)"
   git worktree add "../$WORKTREE_NAME" -b "$WORKTREE_NAME"
   ```
   All subsequent commands run in worktree directory.

### Update Process

4. **Check versions**: Run `npm view <package> version` for each package
5. **Update packages**: `npm install pkg1@latest pkg2@latest ...`
   - Handle peer dependency warnings if they appear
6. **Audit**: Run `npm audit` then `npm audit fix` if needed

### Validation

7. **Run validation** (capture all errors, don't stop early):
   - `npm run compile` (or `npm run build`)
   - `npm run lint`
   - `npm test`

### Handle Results

8. **If validation passes**:
   - Create commit with summary of changes
   - Use AskUserQuestion with options:
     - "Yes, merge and clean up (Recommended)"
     - "No, I'll review first" - provide review instructions
     - "Discard changes"

9. **If validation fails**:
   - Fix compatibility issues (e.g., API changes, new lint rules)
   - Rerun validation
   - If issues persist, explain errors and ask user how to proceed

### Cleanup

10. **Merge** (if approved): `git merge "$WORKTREE_NAME" --no-edit`
11. **Remove worktree**: `git worktree remove "../$WORKTREE_NAME"`

## Common Breaking Changes to Fix

- Jest 30: `toThrowError()` → `toThrow()`
- ESLint: literal types → `as const` assertions
- TypeScript: Check for new strict checks
- Empty test functions: Add implementation or disable rule

## Output Format

Use structured output with clear sections:
- Packages to update (current → latest)
- Worktree created
- Audit results
- Validation results (compile, lint, test)
- Commit summary
- Merge status

## Edge Cases

- No package.json: Error with clear message
- Not a git repo: Error - worktree requires git
- Glob matches nothing: Warn user
- Network failures: Provide clear error
- Already latest: Note in summary
