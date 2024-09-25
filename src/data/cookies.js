/**
 * Find cookie; if no cookie found, return false
 * @param {String} name Name of cookie
 * @returns {String|false}
 */
export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  const fullCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${name}=`),
  );
  if (!fullCookie) {
    return false;
  }
  return fullCookie.split("=")[1];
}

/**
 * Cookie setter function
 * @param {String} name
 * @param {String} value
 * @param {Number|String} [maxAge=31536000] The maximum cookie age, in ms
 * @param {String} [path="/"] The cookie path
 */
export function setCookie(name, value, maxAge = 31536000, path) {
  document.cookie = `${name}=${value};max-age=${String(maxAge)};path=${path}`;
}