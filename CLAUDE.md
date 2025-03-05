# PolicyEngine App Development Guidelines

## Build & Test Commands

- Install: `make install` (npm ci & black)
- Start dev server: `make debug` (or `npm start`)
- Run all tests: `make test` or `npm run test`
- Run single test: `npx jest path/to/test.js` or with pattern: `npx jest -t "test name pattern"`
- Lint & format: `make format` (runs prettier & eslint fix, **use this before committing**)
- Check lint only: `npm run lint`
- Coverage report: Check the `coverage/` directory after running tests

## Code Style Guidelines

- **Node version**: Use Node >=22.0.0 (use nvm to manage versions)
- **Formatting**: Uses Prettier (default config) with ESLint
- **React**: 
  - Functional components with hooks
  - No need to import React in most files due to new JSX transform (React 17+)
  - Only import React when using React namespace features directly (React.lazy, React.Suspense, etc.)
  - Use named exports from React (e.g., `import { useState, useEffect } from "react"`)
- **Imports**: 
  - Group by external/internal
  - Prefer named imports
  - Keep imports organized and minimize unused imports
- **Testing**: Jest with React Testing Library; tests in `__tests__` directory with `.test.js` suffix
- **File naming**: Use PascalCase for components, camelCase for utilities
- **TypeScript**: Gradually adopting; new files should use TypeScript when possible
- **Error handling**: Use try/catch for API calls; display user-friendly error messages
- **Pre-commit hooks**: Uses husky and lint-staged to enforce linting on commit
- **Component size**: Keep functions less than 150 lines after formatting

## Common Patterns & Libraries

- **UI Components**: Uses Ant Design (`antd`) for UI components (Button, Switch, Dropdown, etc.)
- **State management**: No global state - prefer props and lifting state up
- **React Router**: Uses `react-router-dom` v6 with search params for state preservation
- **Charts/Graphs**: Uses `plotly.js` and `react-plotly.js` for data visualization
- **Markdown**: Uses `react-markdown` with plugins for rendering markdown content
- **Page Structure**: Typically follows Header -> PageHeader -> Content -> Footer pattern
- **Country-specific content**: Use the `countryId` hook and conditionals/props to handle US/UK differences
- **Image loading**: Use `require()` for dynamic images rather than direct string paths

## Common Gotchas & Best Practices

- Use the spread operator for state updates: `setState({...state, property: value})`
- Use regex with global flag (`/pattern/g`) when replacing multiple occurrences in strings
- `findInTree` function navigates variable hierarchies using path strings like "input.household.children"
- URL-encoded parameters need proper decoding (e.g., %5B to [, %5D to ])
- React.useEffect with empty deps array (`[]`) runs once on mount, no array runs on every render
- Always include all dependencies in React hooks' dependency arrays (especially with useCallback and useEffect)
- For shared components used across multiple country pages (UK/US), create a common component and pass country info as props
- When creating new pages, ensure they follow the same page structure as existing ones (i.e., include Header/Footer)
- Follow the "PolicyEngine React commandments" in `src/README.md` for component structure
- Add docstrings to all components and graceful error handling
- When making changes, follow existing patterns in the codebase
- Run `npm run lint -- --max-warnings=0` locally to ensure the CI pipeline will pass (CI uses zero tolerance for warnings)

## Accessibility Guidelines

- Color contrast: Ensure text remains readable on hover states - avoid blue text on blue backgrounds
- Prefer text underlines or other non-color indicators for hover states when possible
- Add appropriate ARIA attributes to interactive and multimedia elements:
  - Use `aria-label` for iframes, images, and controls that need better descriptions
  - Include `title` attribute for iframes
- Avoid using logical operators (`&&`) for compound assignments in event handlers - use explicit code blocks with braces `{}`
- Test all interactive elements with keyboard navigation (Tab key)
- When using ANTD components, check for accessibility-specific props and options
- Image elements should always have descriptive `alt` text
- Maintain focus visibility for keyboard users
- Test with a screen reader periodically to verify interface usability

## Blog Posts

- Keep URLs in blog post markdown files short (without query parameters) to prevent line-breaking issues
- When adding blog posts, remember to remove the title (with the single #), description, and cover image
- Use proper Markdown footnote syntax (`[^1]`) instead of superscript footnotes
- New blog posts in `posts.json` should be added at the beginning of the array (most recent first)
- For new blog posts from Medium, install `mediumexporter` and use it to download the post content
- Image file paths should match the blog post filename in the posts.json entry
