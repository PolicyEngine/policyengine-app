import { IntervalMap } from "algorithms/IntervalMap";

const keyCmp = (x: number, y: number) => x - y;
const valueEq = (x: string, y: string) => x === y;

function f(i: number): string {
  return String.fromCharCode(97 + i);
}

function array(n: number): Array<[number, string]> {
  const a = [];
  for (let i = 0; i < n; i++) {
    a.push([i, f(i)]);
  }
  return a;
}

function randArray(n: number, m: number): Array<[number, string]> {
  const rand = () => Math.floor(Math.random() * m);
  const a = [];
  for (let i = 0; i < n; i++) {
    a.push([i, f(rand())]);
  }
  return a;
}

function keys(n: number): Array<number> {
  const a = [];
  for (let i = 0; i < n; i++) {
    a.push(i);
  }
  return a;
}

function hasDuplicates<T>(a: Array<T>): boolean {
  const s = new Set(a);
  return s.size < a.length;
}

function hasConsecutiveDuplicates<T>(a: Array<T>): boolean {
  for (let i = 0; i + 1 < a.length; i++) {
    if (a[i] === a[i + 1]) return true;
  }
  return false;
}

function isSorted(a: Array<[number, string]>): boolean {
  for (let i = 0; i + 1 < a.length; i++) {
    if (a[i][0] > a[i + 1][0]) return false;
  }
  return true;
}

describe("construct", () => {
  test("an empty map", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    expect(m.size()).toBe(0);
    expect(m.keys()).toStrictEqual([]);
    expect(m.values()).toStrictEqual([]);
    expect(m.toArray()).toStrictEqual([]);
  });

  test.concurrent.each([5, 25, 125])(
    "nonempty maps without repeated keys or values in initializer",
    (size) => {
      const a = array(size);
      const m = new IntervalMap(a, keyCmp, valueEq);
      expect(m.size()).toBe(size);
      expect(m.toArray()).toStrictEqual(a);
    },
  );

  test.concurrent.each([5, 25, 125])(
    "nonempty maps with repeated keys in initializer",
    (size, numValues) => {
      const a = array(size);
      a.concat(a);
      const m = new IntervalMap(a, keyCmp, valueEq);
      expect(hasDuplicates(m.keys())).toBe(false);
      expect(m.size()).toBe(size);
    },
  );

  test.concurrent.each([
    [5, 2],
    [5, 5],
    [25, 5],
    [25, 25],
    [125, 5],
  ])("nonempty maps with repeated values in initializer", (size, numValues) => {
    const a = randArray(size, numValues);
    const m = new IntervalMap(a, keyCmp, valueEq);
    expect(hasConsecutiveDuplicates(m.values())).toBe(false);
    expect(m.size()).toBeLessThanOrEqual(size);
  });

  test.concurrent.each([5, 25, 125])(
    "nonempty maps without unsorted initializer",
    (size) => {
      const a = array(size);
      a.reverse();
      const m = new IntervalMap(a, keyCmp, valueEq);
      expect(isSorted(m.toArray())).toBe(true);
      expect(m.size()).toBe(size);
    },
  );
});

describe("get values from ", () => {
  const n = 10;
  const a = array(n);

  test("empty map", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    expect(m.get(0)).toBeUndefined();
  });

  test.each(keys(n))("nonempty map", (key) => {
    const m = new IntervalMap(a, keyCmp, valueEq);
    expect(m.get(key)).toBe(f(key));
    expect(m.get(key + 0.5)).toBe(f(key));
  });
});

describe("set", () => {
  test("empty intervals", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    expect(m.set(0, 0, "a").toArray()).toStrictEqual([]);
    expect(m.set(0, -1, "a").toArray()).toStrictEqual([]);
  });

  test("one interval", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    expect(m.set(-1, 1, "a").toArray()).toStrictEqual([
      [-1, "a"],
      [1, undefined],
    ]);
  });

  test("disjoint intervals", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    m.set(-2, -1, "a").set(1, 2, "b");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [-1, undefined],
      [1, "b"],
      [2, undefined],
    ]);
  });

  test("disjoint intervals in reverse order", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    m.set(1, 2, "b").set(-2, -1, "a");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [-1, undefined],
      [1, "b"],
      [2, undefined],
    ]);
  });

  test("disjoint intervals in reverse order with an undefined value", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    m.set(1, 2, "b").set(-2, -1, undefined);
    expect(m.toArray()).toStrictEqual([
      [1, "b"],
      [2, undefined],
    ]);
  });

  test("adjacent intervals", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    m.set(-1, 0, "a").set(0, 1, "b");
    expect(m.toArray()).toStrictEqual([
      [-1, "a"],
      [0, "b"],
      [1, undefined],
    ]);
  });

  test("adjacent intervals in reverse order", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    m.set(0, 1, "b").set(-1, 0, "a");
    expect(m.toArray()).toStrictEqual([
      [-1, "a"],
      [0, "b"],
      [1, undefined],
    ]);
  });

  test("adjacent intervals with same value", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    m.set(-1, 0, "a").set(0, 1, "a");
    expect(m.toArray()).toStrictEqual([
      [-1, "a"],
      [1, undefined],
    ]);
  });

  test("adjacent intervals with same value in reverse order", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    m.set(0, 1, "a").set(-1, 0, "a");
    expect(m.toArray()).toStrictEqual([
      [-1, "a"],
      [1, undefined],
    ]);
  });

  test("intersecting intervals", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    m.set(-2, 1, "a").set(-1, 2, "b");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [-1, "b"],
      [2, undefined],
    ]);
  });

  test("intersecting intervals in reverse order", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    m.set(-1, 2, "b").set(-2, 1, "a");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [1, "b"],
      [2, undefined],
    ]);
  });

  test("intersecting intervals with same value", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    m.set(-2, 1, "a").set(-1, 2, "a");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [2, undefined],
    ]);
  });

  test("intersecting intervals with same value in reverse order", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    m.set(-1, 2, "a").set(-2, 1, "a");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [2, undefined],
    ]);
  });

  test("nested intervals", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    m.set(-2, 2, "a").set(-1, 1, "b");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [-1, "b"],
      [1, "a"],
      [2, undefined],
    ]);
  });

  test("nested intervals in reverse order", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    m.set(-1, 1, "b").set(-2, 2, "a");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [2, undefined],
    ]);
  });

  test("nested intervals with same value", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    m.set(-3, 3, "a").set(-2, 2, "a").set(-1, 1, "a");
    expect(m.toArray()).toStrictEqual([
      [-3, "a"],
      [3, undefined],
    ]);
  });

  test("nested intervals with same value in reverse order", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    m.set(-1, 1, "a").set(-2, 2, "a").set(-3, 3, "a");
    expect(m.toArray()).toStrictEqual([
      [-3, "a"],
      [3, undefined],
    ]);
  });

  test("nested intervals with same value in third order", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    m.set(-1, 1, "a").set(-3, 3, "a").set(-2, 2, "a");
    expect(m.toArray()).toStrictEqual([
      [-3, "a"],
      [3, undefined],
    ]);
  });

  test("overwrite many intervals", () => {
    const a = array(10).concat([[10, "a"]]);
    const m = new IntervalMap(a, keyCmp, valueEq);
    m.set(0.5, 10.5, "a");
    expect(m.toArray()).toStrictEqual([[0, "a"]]);
  });
});

describe("copy", () => {
  test("an empty map and check independence", () => {
    const m = new IntervalMap([], keyCmp, valueEq);
    const copy = m.copy();
    m.set(0, 1, "a");
    copy.set(0, 1, "b");
    expect(m.get(0.5)).toBe("a");
    expect(copy.get(0.5)).toBe("b");
    expect(m.size()).toStrictEqual(2);
    expect(copy.size()).toStrictEqual(2);
  });
});

describe("compute difference for", () => {
  test("one set op", () => {
    const m1 = new IntervalMap([], keyCmp, valueEq);
    const m2 = m1.copy().set(0, 1, "a");
    expect(m2.minus(m1)).toStrictEqual([[0, 1, "a"]]);
  });

  test("two disjoint set ops", () => {
    const m1 = new IntervalMap([], keyCmp, valueEq);
    const m2 = m1.copy().set(-2, -1, "a").set(1, 2, "b");
    expect(m2.minus(m1)).toStrictEqual([
      [-2, -1, "a"],
      [1, 2, "b"],
    ]);
  });

  test("two adjacent set ops", () => {
    const m1 = new IntervalMap([], keyCmp, valueEq);
    const m2 = m1.copy().set(-1, 0, "a").set(0, 1, "b");
    expect(m2.minus(m1)).toStrictEqual([
      [-1, 0, "a"],
      [0, 1, "b"],
    ]);
  });

  test("two adjacent set ops with the same value", () => {
    const m1 = new IntervalMap([], keyCmp, valueEq);
    const m2 = m1.copy().set(-1, 0, "a").set(0, 1, "a");
    expect(m2.minus(m1)).toStrictEqual([[-1, 1, "a"]]);
  });

  test("two intersecting set ops", () => {
    const m1 = new IntervalMap([], keyCmp, valueEq);
    const m2 = m1.copy().set(-2, 1, "a").set(-1, 2, "b");
    expect(m2.minus(m1)).toStrictEqual([
      [-2, -1, "a"],
      [-1, 2, "b"],
    ]);
  });

  test("two intersecting set ops in reverse order", () => {
    const m1 = new IntervalMap([], keyCmp, valueEq);
    const m2 = m1.copy().set(-1, 2, "b").set(-2, 1, "a");
    expect(m2.minus(m1)).toStrictEqual([
      [-2, 1, "a"],
      [1, 2, "b"],
    ]);
  });

  test("two intersecting set ops with same value", () => {
    const m1 = new IntervalMap([], keyCmp, valueEq);
    const m2 = m1.copy().set(-2, 1, "a").set(-1, 2, "a");
    expect(m2.minus(m1)).toStrictEqual([[-2, 2, "a"]]);
  });

  test("two intersecting set ops with same value in reverse order", () => {
    const m1 = new IntervalMap([], keyCmp, valueEq);
    const m2 = m1.copy().set(-1, 2, "a").set(-2, 1, "a");
    expect(m2.minus(m1)).toStrictEqual([[-2, 2, "a"]]);
  });

  test("set ops with no effect", () => {
    const m1 = new IntervalMap(
      [
        [1, "a"],
        [2, "b"],
      ],
      keyCmp,
      valueEq,
    );
    const m2 = m1.copy().set(1, 1.5, "a").set(3, 4, "b");
    expect(m2.minus(m1)).toStrictEqual([]);
  });

  test("one inexact set op", () => {
    const m1 = new IntervalMap(
      [
        [1, "a"],
        [2, "b"],
      ],
      keyCmp,
      valueEq,
    );
    const m2 = m1.copy().set(0, 1.5, "a");
    expect(m2.minus(m1)).toStrictEqual([[0, 1, "a"]]);
  });

  test("another inexact set op", () => {
    const m1 = new IntervalMap(
      [
        [1, "a"],
        [2, "b"],
      ],
      keyCmp,
      valueEq,
    );
    const m2 = m1.copy().set(1.5, 3, "b");
    expect(m2.minus(m1)).toStrictEqual([[1.5, 2, "b"]]);
  });

  test("one set on a base map with many steps", () => {
    const a = array(10);
    const m1 = new IntervalMap(a, keyCmp, valueEq);
    const m2 = m1.copy().set(0.5, 9, "a");
    expect(m2.minus(m1)).toStrictEqual([[1, 9, "a"]]);
  });

  test("multiple sets overwritten by a final set", () => {
    const m1 = new IntervalMap([[1, "a"]], keyCmp, valueEq);
    const m2 = m1
      .copy()
      .set(2, 3, "b")
      .set(3, 4, "c")
      .set(4, 5, "d")
      .set(1.5, 4, "a");
    expect(m2.minus(m1)).toStrictEqual([[4, 5, "d"]]);
  });
});
