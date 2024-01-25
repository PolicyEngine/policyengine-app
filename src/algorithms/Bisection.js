/**
 *
 * @callback cmpCallback
 * @param {*} element1
 * @param {*} element2
 */

/**
 *
 * Locate the leftmost insertion point for x in arr to maintain sorted order.
 *
 * @param {Array} a a sorted array
 * @param {*} x a value
 * @param {number} lo the insertion point is found in [lo, hi); 0 by default
 * @param {number} hi the insertion point is found in [lo, hi); a.length by default
 * @param {bool} findRightMost return rightmost insertion point if true; false by default
 * @param {cmpCallback} cmp comparator for values
 *
 */
export function bisect(
  a,
  x,
  lo = 0,
  hi = a.length,
  findRightMost = false,
  cmp = (a, b) => a - b,
) {
  if (hi < lo || hi > a.length || lo < 0) return;
  if (hi === lo) return lo;
  if (hi === lo + 1) {
    const c = cmp(a[lo], x);
    if (c < 0) return hi;
    if (c > 0) return lo;
    if (cmp(a[lo], x) === 0 && findRightMost) return hi;
    return lo;
  }
  const mid = Math.floor((lo + hi) / 2.0);
  const c = cmp(a[mid], x);
  if (c < 0 || (c === 0 && findRightMost)) {
    return bisect(a, x, mid + 1, hi, findRightMost, cmp);
  }
  return bisect(a, x, lo, mid, findRightMost, cmp);
}
