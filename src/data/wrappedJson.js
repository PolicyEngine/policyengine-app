/*
  This file is used to wrap JSON.parse and JSON.stringify functions;
  defined against MDN standards; see
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
  for details on JSON.parse() and
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
  for JSON.stringify().

  These will need to be used for any instance that involves
  passing around policies, as +inf and -inf are valid values,
  and JSON does not support them natively.

*/

function JsonReplacer(key, value) {
  if (value === Infinity) {
    return "Infinity";
  }
  if (value === -Infinity) {
    return "-Infinity";
  }
  return value;
}

function JsonReviver(key, value) {
  if (value === "Infinity") {
    return Infinity;
  }
  if (value === "-Infinity") {
    return -Infinity;
  }
  return value;
}

export function wrappedJsonParse() {
  return JSON.parse(...arguments, JsonReviver);
}

export function wrappedJsonStringify() {
  // json.stringify's second argument is a replacer function
  // Because JS doesn't allow passing params by name (akin to Python),
  // we need to specifically override the second arg to allow
  // callers of wrappedJsonStringify to pass later args,
  // such as JSON.stringify's 3rd arg, the space arg.

  let modifiedArgs = [...arguments];
  modifiedArgs[1] = JsonReplacer;
  return JSON.stringify(...modifiedArgs);
}

/**
 * Replaces Response.json(), which unfortunately has no
 * native way of passing a reviver
 * @param {Response} response The response object
 * @returns {Promise} The JSON object, parsed with custom reviver
 */
export function wrappedResponseJson(response) {
  return new Promise((resolve, reject) => {
    response.text().then((text) => {
      resolve(wrappedJsonParse(text));
    });
  });
}
