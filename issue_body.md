## Issue Description

The `findInTree` function in `src/api/variables.js` has a bug where it only replaces the first occurrence of URL-encoded square brackets (%5B, %5D) with their decoded equivalents ([, ]).

## Problem

When a path contains multiple square brackets (e.g., something like "input.households[0].members[1]"), only the first set gets properly decoded, potentially causing issues when navigating the variable tree structure.

Current code:

```javascript
path = path.replace("%5B", "[").replace("%5D", "]");
```

## Proposed Solution

Update the code to use regular expressions with the global flag to replace all occurrences:

```javascript
path = path.replace(/%5B/g, "[").replace(/%5D/g, "]");
```

## Impact

This will improve the robustness of the application when handling complex paths in the variable tree structure, preventing potential bugs when users navigate to pages with nested array indices in the URL parameters.
