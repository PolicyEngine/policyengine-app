// Intervals are represented as arrays of size 2. All intervals in a function
// call should contain objects of the same type that can be compared using ge
// (greater than or equals)

/**
 *
 * @callback greaterThanOrEquals
 * @param {*} o1
 * @param {*} o2
 * @return {bool} o1 >= o2
 */

/**
 * Intersection of intervals
 *
 * @param {*[]} a an interval
 * @param {*[]} b another interval
 * @param {greaterThanOrEquals} ge handles comparison between interval endpoints
 * @returns {*} the intersection of a and b
 */
export function intersect(a, b, ge) {
  let r = [a[0], a[1]];
  if (ge(b[0], a[0])) {
    r[0] = b[0];
  }
  if (ge(a[1], b[1])) {
    r[1] = b[1];
  }
  return r;
}

/**
 * Union of intervals
 *
 * @param {*[]} a an interval
 * @param {*[]} b another interval
 * @param {greaterThanOrEquals} ge handles comparison between interval endpoints
 * @returns {*} the union of a and b
 */
export function union(a, b, ge) {
  let r = [a[0], a[1]];
  if (ge(a[0], b[0])) {
    r[0] = b[0];
  }
  if (ge(b[1], a[1])) {
    r[1] = b[1];
  }
  return r;
}

/**
 * Containment of intervals
 *
 * @param {*[]} a an interval
 * @param {*[]} b another interval
 * @param {greaterThanOrEquals} ge handles comparison between interval endpoints
 * @returns {bool} true iff a contains b
 */
export function contains(a, b, ge) {
  return ge(b[0], a[0]) && ge(a[1], b[1]);
}

/**
 * Emptiness of an interval
 *
 * @param {*[]} a an interval
 * @param {greaterThanOrEquals} ge handles comparison between interval endpoints
 * @returns {bool} true iff interval is empty
 */
export function empty(a, ge) {
  return ge(a[0], a[1]);
}

/**
 * Difference of intervals
 *
 * @param {*[]} a an interval
 * @param {*[]} b another interval
 * @param {greaterThanOrEquals} ge handles comparison between interval endpoints
 * @returns {*[]} an array of intervals representing a - b
 */
export function diff(a, b, ge) {
  let i = intersect(a, b, ge);
  if (empty(i, ge)) return [a];
  return [
    [a[0], i[0]],
    [i[1], a[1]],
  ].filter((e) => !empty(e, ge));
}
