import { bisect } from "./Bisection";

/**
 *
 * @callback keyCmpCallback
 * @param {*} element1
 * @param {*} element2
 */

/**
 *
 * @callback valueEqCallback
 * @param {*} element1
 * @param {*} element2
 */

export class IntervalMap {
  /**
   *
   * @param {array} array an object that maps keys to values
   * @param {keyCmpCallback} keyCmp comparator for keys
   * @param {valueEqCallback} valueEq equality checker for values
   * @returns an interval map with useful operations
   */
  constructor(array, keyCmp = (x, y) => x - y, valueEq = (x, y) => x === y) {
    this.array = [];
    array.sort((a, b) => keyCmp(a[0], b[0]));
    let prevValue;
    for (const [key, value] in array) {
      if (!valueEq(value, prevValue)) {
        array.push([key, value]);
        prevValue = value;
      }
    }
    // the loop ensures that two consecutive elements do not have duplicates,
    // and the first element does not have an undefined value.
    this.array = array;
    this.keyCmp = keyCmp;
    this.valueEq = valueEq;
  }

  /**
   *
   * Map the interval [x1, x2) to y
   * @param {*} x1 the left endpoint of the interval
   * @param {*} x2 the right endpoint of the interval
   * @param {*} y the value that the interval [x1, x2) maps to
   */
  set(x1, x2, y) {
    const array = this.array;
    const keyCmp = this.keyCmp;
    const valueEq = this.valueEq;

    // empty interval
    if (keyCmp(x1, x2) >= 0) return;

    // empty array
    if (array.length === 0) {
      array.push([x1, y], [x2, undefined]);
      return;
    }

    // nonempty interval and array here

    let idx1 = bisect(array, x1, 0, array.length, false, (element, x) =>
      keyCmp(element[0], x),
    );

    if (idx1 === array.length) {
      // all elements have keys < x1 < x2
      const v = array[array.length - 1][1];
      if (!valueEq(y, v)) {
        array.push([x1, y], [x2, v]);
      }
      return;
    }

    let idx2 =
      bisect(array, x2, 0, array.length, true, (element, x) =>
        keyCmp(element[0], x),
      ) - 1;

    if (idx2 === -1) {
      // all elements have keys > x2 > x1
      if (!valueEq(y, undefined)) {
        array.splice(0, 0, [x1, y], [x2, undefined]);
      }
      return;
    }

    // idx1 is the index of the first element with key >= x1
    // idx2 is the index of the last element with key <= x2

    const insert1 = !(idx1 > 0 && valueEq(array[idx1 - 1][1], y));
    const insert2 = !valueEq(array[idx2][1], y);

    if (insert1 && insert2) {
      array.splice(idx1, idx2 - idx1 + 1, [x1, y], [x2, array[idx2][1]]);
    } else if (insert1) {
      array.splice(idx1, idx2 - idx1 + 1, [x1, y]);
    } else if (insert2) {
      array.splice(idx1, idx2 - idx1 + 1, [x2, array[idx2][1]]);
    } else {
      array.splice(idx1, idx2 - idx1 + 1);
    }
  }

  /**
   *
   * Get value at x
   * @param {*} x a point in the domain
   */
  get(x) {
    // first element with key <= x
    const element = this.array.findLast(
      (element) => this.keyCmp(element[0], x) <= 0,
    );
    return element?.[1];
  }

  /**
   *
   * @returns number of intervals
   */
  size() {
    return this.array.length;
  }

  /**
   *
   * @returns the keys in the map
   */
  keys() {
    return this.array.map((element) => element[0]);
  }

  /**
   *
   * @returns the values in the map
   */
  values() {
    return this.array.map((element) => element[1]);
  }

  /**
   *
   * @returns an array representation of the map
   */
  toArray() {
    return this.array.map((element) => element);
  }

  /**
   *
   * @returns a copy
   */
  copy() {
    return new IntervalMap(this.toArray(), this.keyCmp, this.valueEq);
  }
}
