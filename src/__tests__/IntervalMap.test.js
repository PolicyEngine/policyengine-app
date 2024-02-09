const { IntervalMap } = require("algorithms/IntervalMap");

describe("IntervalMap construction", () => {
  test("empty map", () => {
    const m = new IntervalMap([], (x, y) => x - y);
    expect(m.get(0)).toBeUndefined();
    expect(m.toArray()).toStrictEqual([]);
  });

  test("one entry", () => {
    const m = new IntervalMap([[1, "a"]], (x, y) => x - y);
    expect(m.get(0)).toBeUndefined();
    expect(m.get(1)).toBe("a");
    expect(m.get(10)).toBe("a");
    expect(m.toArray()).toStrictEqual([[1, "a"]]);
  });

  test("two entries", () => {
    const m = new IntervalMap(
      [
        [1, "a"],
        [2, "b"],
      ],
      (x, y) => x - y,
    );
    expect(m.get(0)).toBeUndefined();
    expect(m.get(1)).toBe("a");
    expect(m.get(1.5)).toBe("a");
    expect(m.get(2)).toBe("b");
    expect(m.get(10)).toBe("b");
    expect(m.toArray()).toStrictEqual([
      [1, "a"],
      [2, "b"],
    ]);
  });

  test("ten entries, one duplicate", () => {
    const m = new IntervalMap(
      [
        [1, "a"],
        [2, "b"],
        [3, "c"],
        [4, "d"],
        [5, "e"],
        [6, "f"],
        [7, "f"],
        [8, "h"],
        [9, "i"],
        [10, "f"],
      ],
      (x, y) => x - y,
    );
    expect(m.toArray()).toStrictEqual([
      [1, "a"],
      [2, "b"],
      [3, "c"],
      [4, "d"],
      [5, "e"],
      [6, "f"],
      [8, "h"],
      [9, "i"],
      [10, "f"],
    ]);
  });
});

describe("IntervalMap operations", () => {
  test("one interval", () => {
    const m = new IntervalMap([], (x, y) => x - y);
    m.set(-1, 1, "a");
    expect(m.toArray()).toStrictEqual([
      [-1, "a"],
      [1, undefined],
    ]);
  });

  test("disjoint intervals", () => {
    const m = new IntervalMap([], (x, y) => x - y);
    m.set(-2, -1, "a");
    m.set(1, 2, "b");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [-1, undefined],
      [1, "b"],
      [2, undefined],
    ]);
  });

  test("adjacent intervals", () => {
    const m = new IntervalMap([], (x, y) => x - y);
    m.set(-1, 0, "a");
    m.set(0, 1, "b");
    expect(m.toArray()).toStrictEqual([
      [-1, "a"],
      [0, "b"],
      [1, undefined],
    ]);
  });

  test("adjacent intervals added in reverse order", () => {
    const m = new IntervalMap([], (x, y) => x - y);
    m.set(0, 1, "b");
    m.set(-1, 0, "a");
    expect(m.toArray()).toStrictEqual([
      [-1, "a"],
      [0, "b"],
      [1, undefined],
    ]);
  });

  test("intersecting intervals", () => {
    const m = new IntervalMap([], (x, y) => x - y);
    m.set(-2, 1, "a");
    m.set(-1, 2, "b");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [-1, "b"],
      [2, undefined],
    ]);
  });

  test("nested intervals", () => {
    const m = new IntervalMap([], (x, y) => x - y);
    m.set(-2, 2, "a");
    m.set(-1, 1, "b");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [-1, "b"],
      [1, "a"],
      [2, undefined],
    ]);
  });

  test("adjacent intervals with same value", () => {
    const m = new IntervalMap([], (x, y) => x - y);
    m.set(-1, 0, "a");
    m.set(0, 1, "a");
    expect(m.toArray()).toStrictEqual([
      [-1, "a"],
      [1, undefined],
    ]);
  });

  test("nested intervals with same value", () => {
    const m = new IntervalMap([], (x, y) => x - y);
    m.set(-3, 3, "a");
    m.set(-2, 2, "a");
    m.set(-1, 1, "a");
    expect(m.toArray()).toStrictEqual([
      [-3, "a"],
      [3, undefined],
    ]);
  });

  test("nested intervals with same value in reverse order", () => {
    const m = new IntervalMap([], (x, y) => x - y);
    m.set(-1, 1, "a");
    m.set(-2, 2, "a");
    m.set(-3, 3, "a");
    expect(m.toArray()).toStrictEqual([
      [-3, "a"],
      [3, undefined],
    ]);
  });

  test("nested intervals with same value in third order", () => {
    const m = new IntervalMap([], (x, y) => x - y);
    m.set(-1, 1, "a");
    m.set(-3, 3, "a");
    m.set(-2, 2, "a");
    expect(m.toArray()).toStrictEqual([
      [-3, "a"],
      [3, undefined],
    ]);
  });

  test("minimal size", () => {
    const m = new IntervalMap([], (x, y) => x - y);
    m.set(-3, 3, "a");
    m.set(-2, 2, "b");
    m.set(-2.5, 0, "a");
    expect(m.toArray()).toStrictEqual([
      [-3, "a"],
      [0, "b"],
      [2, "a"],
      [3, undefined],
    ]);
    m.set(0, 2, "a");
    expect(m.toArray()).toStrictEqual([
      [-3, "a"],
      [3, undefined],
    ]);
  });
});
