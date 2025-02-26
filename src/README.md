# policyengine.org

PolicyEngine React commandments:

- All components must be functional components.
- No React.Context (unless _absolutely_ necessary).
- Add _at least_ a docstring to every component.
- Add graceful error handling to every component. Don't assume that the data you're getting is correct.
- Add new rules to this list as you begin to follow them.
- Keep functions less than 150 lines after formatting.

## Running locally

`npm ci` and then `npm start`.

## Tips from things I've learned

- If you're modifying a state, you _must_ set it to a new object. Otherwise, React won't re-render. For example, use the spread operator `setState({...state, newProperty: newValue})` or if dealing with deeply nested objects, use a proper immutability helper like immer.js instead of `setState(state)`. Avoid using `JSON.parse(JSON.stringify(state))` as it's inefficient and loses functions/symbols.
- React.useEffect takes the second argument of the list of dependencies (variables whose change causes useEffect()). There's different behaviour if you pass an empty list instead of not passing anything: the former will only run once, the latter will run every time the component re-renders. If you're not sure, use the empty list. The latter can often cause infinite loops. (if you are finding infinite loops, check the useEffect() dependencies)
