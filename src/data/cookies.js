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
