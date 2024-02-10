Object.defineProperty(exports, "__esModule", { value: true });
exports.bisect = void 0;
/**
 *
 * Locate the leftmost insertion point for x in arr to maintain sorted order.
 *
 * @param a a sorted array
 * @param x a value
 * @param cmpToX compares an array value to x, e.g., (v) => v.key - x
 * @param lo the insertion point is found in [lo, hi); 0 by default
 * @param hi the insertion point is found in [lo, hi); a.length by default
 * @param findRightMost return rightmost insertion point if true; false by default
 *
 */
function bisect(a, x, cmpToX, lo, hi, findRightMost) {
  if (lo === void 0) {
    lo = 0;
  }
  if (hi === void 0) {
    hi = a.length;
  }
  if (findRightMost === void 0) {
    findRightMost = false;
  }
  if (hi <= lo) return lo;
  if (hi === lo + 1) {
    var c_1 = cmpToX(a[lo]);
    if (c_1 < 0) return hi;
    if (c_1 > 0) return lo;
    if (c_1 === 0 && findRightMost) return hi;
    return lo;
  }
  var mid = Math.floor((lo + hi) / 2.0);
  var c = cmpToX(a[mid]);
  if (c < 0 || (c === 0 && findRightMost)) {
    return bisect(a, x, cmpToX, mid + 1, hi, findRightMost);
  }
  return bisect(a, x, cmpToX, lo, mid, findRightMost);
}
exports.bisect = bisect;
