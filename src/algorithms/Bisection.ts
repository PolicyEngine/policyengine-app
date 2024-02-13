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
export function bisect<T>(
  a: ReadonlyArray<T>,
  x: any,
  cmpToX: (a: T) => number,
  lo: number = 0,
  hi: number = a.length,
  findRightMost: boolean = false,
): number {
  if (hi <= lo) return lo;
  if (hi === lo + 1) {
    const c = cmpToX(a[lo]);
    if (c < 0) return hi;
    if (c > 0) return lo;
    if (c === 0 && findRightMost) return hi;
    return lo;
  }
  const mid = Math.floor((lo + hi) / 2.0);
  const c = cmpToX(a[mid]);
  if (c < 0 || (c === 0 && findRightMost)) {
    return bisect(a, x, cmpToX, mid + 1, hi, findRightMost);
  }
  return bisect(a, x, cmpToX, lo, mid, findRightMost);
}
