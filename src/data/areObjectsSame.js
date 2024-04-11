/**
 * Function to recursively compare two objects
 * @param {null | Object} firstObject
 * @param {null | Object} secondObject
 * @returns {Boolean} Whether or not the two objects are
 * the same
 */
export function areObjectsSame(firstObject, secondObject) {
  // Ensure that both objects fed to the function are,
  // in fact, objects; return false if one isn't
  if (firstObject === null || typeof firstObject !== "object") {
    return false;
  }

  if (secondObject === null || typeof secondObject !== "object") {
    return false;
  }

  // Take the keys of both
  const firstObjKeys = Object.keys(firstObject);
  const secondObjKeys = Object.keys(secondObject);

  // Return false if the key arrays aren't the same length
  if (firstObjKeys.length !== secondObjKeys.length) {
    return false;
  }

  // For each key in firstObjKeys...
  for (const key of firstObjKeys) {
    // Access the two objects at said key
    const firstVal = firstObject[key];
    const secondVal = secondObject[key] || null;

    // If both values are objects, recurse and return
    if (typeof firstVal === "object" && typeof secondVal === "object") {
      return areObjectsSame(firstVal, secondVal);
    }

    // If the values aren't the same, return false
    if (firstVal !== secondVal) {
      return false;
    }
  }

  // If we made it this far, return true
  return true;
}