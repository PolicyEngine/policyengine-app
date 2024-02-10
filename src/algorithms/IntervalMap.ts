import { bisect } from "./Bisection";

export class IntervalMap<KeyType, ValueType> {
  array: Array<[KeyType, ValueType | undefined]>;
  readonly keyCmp: (a: KeyType, b: KeyType) => number;
  readonly valueEq: (
    a: ValueType | undefined,
    b: ValueType | undefined,
  ) => boolean;

  /**
   *
   * @param array an object that maps keys to values
   * @param keyCmp comparator for keys
   * @param valueEq equality checker for values
   * @returns an interval map with useful operations
   */
  constructor(
    array: Array<[KeyType, ValueType | undefined]>,
    keyCmp: (a: KeyType, b: KeyType) => number,
    valueEq: (a: ValueType | undefined, b: ValueType | undefined) => boolean,
  ) {
    this.array = [];
    array.sort((a, b) => keyCmp(a[0], b[0]));
    let prevValue: ValueType | undefined;
    for (const [key, value] of array) {
      if (!valueEq(value, prevValue)) {
        this.array.push([key, value]);
        prevValue = value;
      }
    }
    // the loop ensures that two consecutive elements do not have duplicates,
    // and the first element does not have an undefined value.
    this.keyCmp = keyCmp;
    this.valueEq = valueEq;
  }

  /**
   *
   * Map the interval [key1, key2) to value
   * @param key1 the left endpoint of the interval
   * @param key2 the right endpoint of the interval
   * @param value the value that the interval [x1, x2) maps to
   */
  set(key1: KeyType, key2: KeyType, value: ValueType): undefined {
    const array = this.array;
    const n = array.length;
    const keyCmp = this.keyCmp;
    const valueEq = this.valueEq;

    // empty interval
    if (keyCmp(key1, key2) >= 0) return;

    // empty array
    if (n === 0) {
      array.push([key1, value], [key2, undefined]);
      return;
    }

    // nonempty interval and array here

    let idx1 = bisect(
      array,
      key1,
      (a: [KeyType, ValueType | undefined]) => keyCmp(a[0], key1),
      0,
      array.length,
      false,
    );

    if (idx1 === n) {
      // all elements have keys < x1 < x2
      const v = array[n - 1][1];
      if (!valueEq(value, v)) {
        array.push([key1, value], [key2, v]);
      }
      return;
    }

    let idx2 =
      bisect(
        array,
        key2,
        (a: [KeyType, ValueType | undefined]) => keyCmp(a[0], key2),
        0,
        array.length,
        true,
      ) - 1;

    if (idx2 === -1) {
      // all elements have keys > x2 > x1
      if (!valueEq(value, undefined)) {
        array.splice(0, 0, [key1, value], [key2, undefined]);
      }
      return;
    }

    // idx1 is the index of the first element with key >= x1
    // idx2 is the index of the last element with key <= x2

    const insert1 = !(idx1 > 0 && valueEq(array[idx1 - 1][1], value));
    const insert2 = !valueEq(array[idx2][1], value);

    if (insert1 && insert2) {
      array.splice(
        idx1,
        idx2 - idx1 + 1,
        [key1, value],
        [key2, array[idx2][1]],
      );
    } else if (insert1) {
      array.splice(idx1, idx2 - idx1 + 1, [key1, value]);
    } else if (insert2) {
      array.splice(idx1, idx2 - idx1 + 1, [key2, array[idx2][1]]);
    } else {
      array.splice(idx1, idx2 - idx1 + 1);
    }
  }

  /**
   *
   * Get value at key
   * @param key a point in the domain
   */
  get(key: KeyType): ValueType | undefined {
    const array = this.array;
    const n = array.length;
    const keyCmp = this.keyCmp;

    if (n === 0) return;

    const idx = bisect(
      array,
      key,
      (a: [KeyType, ValueType | undefined]) => keyCmp(a[0], key),
      0,
      n,
      false,
    );

    if (idx === n) {
      return array[idx - 1][1];
    }

    if (keyCmp(array[idx][0], key) === 0) {
      return array[idx][1];
    }

    if (idx > 0) {
      return array[idx - 1][1];
    }
  }

  /**
   *
   * @returns number of intervals
   */
  size(): number {
    return this.array.length;
  }

  /**
   *
   * @returns the keys in the map
   */
  keys(): Array<KeyType> {
    return this.array.map((element) => element[0]);
  }

  /**
   *
   * @returns the values in the map
   */
  values(): Array<ValueType | undefined> {
    return this.array.map((element) => element[1]);
  }

  /**
   *
   * @returns an array representation of the map
   */
  toArray(): Array<[KeyType, ValueType | undefined]> {
    return this.array.map((element) => [element[0], element[1]]);
  }

  /**
   *
   * @returns a copy of the map
   */
  copy(): IntervalMap<KeyType, ValueType> {
    return new IntervalMap(this.toArray(), this.keyCmp, this.valueEq);
  }

  /**
   *
   * @param other the other interval map. We assume that both maps have the same
   * final value, the same keyCmp, and the same valueEq.
   * @returns a list of [key1, key2, value] triples such that the intervals
   * defined by the keys are disjoint and if other.set() is called for all such
   * triples the current map will be created.
   *
   */
  minus(
    other: IntervalMap<KeyType, ValueType>,
  ): Array<[KeyType, KeyType, ValueType | undefined]> {
    const keys = this.keys().concat(other.keys());
    keys.sort(this.keyCmp);
    const equalValues = keys.map((key) =>
      this.valueEq(this.get(key), other.get(key)),
    );
    let idx = 0;
    const diff: Array<[KeyType, KeyType, ValueType | undefined]> = [];
    while (idx + 1 < keys.length) {
      if (!equalValues[idx]) {
        diff.push([keys[idx], keys[idx + 1], this.get(keys[idx])]);
      }
      idx += 1;
    }
    let i = 0;
    const mergedDiff: Array<[KeyType, KeyType, ValueType | undefined]> = [];
    while (i < diff.length) {
      let [st, en, val] = diff[i];
      while (i + 1 < diff.length && this.valueEq(diff[i][2], diff[i + 1][2])) {
        en = diff[i + 1][1];
        i += 1;
      }
      mergedDiff.push([st, en, val]);
      i += 1;
    }
    return mergedDiff;
  }
}
