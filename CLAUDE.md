# PolicyEngine App Development Guidelines

## Build & Test Commands

- Install: `make install` (npm ci & black)
- Start dev server: `make debug` (or `npm start`)
- Run all tests: `make test` or `npm run test`
- Run single test: `npx jest path/to/test.js` or with pattern: `npx jest -t "test name pattern"`
- Lint & format: `make format` (runs prettier & eslint fix)
- Check lint only: `npm run lint`

## Code Style Guidelines

- **Node version**: Use Node >=22.0.0 (use nvm to manage versions)
- **Formatting**: Uses Prettier (default config) with ESLint
- **React**: Functional components with hooks; no need to import React due to new JSX transform
- **Imports**: Group by external/internal; prefer named imports
- **Testing**: Jest with React Testing Library; tests in `__tests__` directory with `.test.js` suffix
- **File naming**: Use PascalCase for components, camelCase for utilities
- **TypeScript**: Gradually adopting; new files should use TypeScript when possible
- **Error handling**: Use try/catch for API calls; display user-friendly error messages
- **Pre-commit hooks**: Uses husky and lint-staged to enforce linting on commit

## Common Patterns & Gotchas

- Use the spread operator for state updates: `setState({...state, property: value})`
- Use regex with global flag (`/pattern/g`) when replacing multiple occurrences in strings
- `findInTree` function navigates variable hierarchies using path strings like "input.household.children"
- URL-encoded parameters need proper decoding (e.g., %5B to [, %5D to ])
- Check existing TODOs in the codebase before implementing new features
- In React components, use conditional rendering with the && operator for optional elements

When making changes, follow existing patterns in the codebase and run `make format` before committing.
