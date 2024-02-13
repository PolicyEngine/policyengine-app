Object.defineProperty(exports, "__esModule", { value: true });
var IntervalMap_1 = require("algorithms/IntervalMap");
var keyCmp = function (x, y) {
  return x - y;
};
var valueEq = function (x, y) {
  return x === y;
};
function f(i) {
  return String.fromCharCode(97 + i);
}
function array(n) {
  var a = [];
  for (var i = 0; i < n; i++) {
    a.push([i, f(i)]);
  }
  return a;
}
function randArray(n, m) {
  var rand = function () {
    return Math.floor(Math.random() * m);
  };
  var a = [];
  for (var i = 0; i < n; i++) {
    a.push([i, f(rand())]);
  }
  return a;
}
function keys(n) {
  var a = [];
  for (var i = 0; i < n; i++) {
    a.push(i);
  }
  return a;
}
function hasDuplicates(a) {
  var s = new Set(a);
  return s.size < a.length;
}
function hasConsecutiveDuplicates(a) {
  for (var i = 0; i + 1 < a.length; i++) {
    if (a[i] === a[i + 1]) return true;
  }
  return false;
}
function isSorted(a) {
  for (var i = 0; i + 1 < a.length; i++) {
    if (a[i] > a[i + 1]) return false;
  }
  return true;
}
describe("construct", function () {
  test("an empty map", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    expect(m.size()).toBe(0);
    expect(m.keys()).toStrictEqual([]);
    expect(m.values()).toStrictEqual([]);
    expect(m.toArray()).toStrictEqual([]);
  });
  test.concurrent.each([5, 25, 125])(
    "nonempty maps without repeated keys or values in initializer",
    function (size) {
      var a = array(size);
      var m = new IntervalMap_1.IntervalMap(a, keyCmp, valueEq);
      expect(m.size()).toBe(size);
      expect(m.toArray()).toStrictEqual(a);
    },
  );
  test.concurrent.each([5, 25, 125])(
    "nonempty maps with repeated keys in initializer",
    function (size) {
      var a = array(size);
      a.concat(a);
      var m = new IntervalMap_1.IntervalMap(a, keyCmp, valueEq);
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
  ])(
    "nonempty maps with repeated values in initializer",
    function (size, numValues) {
      var a = randArray(size, numValues);
      var m = new IntervalMap_1.IntervalMap(a, keyCmp, valueEq);
      expect(hasConsecutiveDuplicates(m.values())).toBe(false);
      expect(m.size()).toBeLessThanOrEqual(size);
    },
  );
  test.concurrent.each([5, 25, 125])(
    "nonempty maps without unsorted initializer",
    function (size) {
      var a = array(size);
      a.reverse();
      var m = new IntervalMap_1.IntervalMap(a, keyCmp, valueEq);
      expect(isSorted(m.keys())).toBe(true);
      expect(m.size()).toBe(size);
    },
  );
});
describe("get values from", function () {
  var n = 10;
  var a = array(n);
  test("empty map", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    expect(m.get(0)).toBeUndefined();
  });
  test.each(keys(n))("nonempty map", function (key) {
    var m = new IntervalMap_1.IntervalMap(a, keyCmp, valueEq);
    expect(m.get(key)).toBe(f(key));
    expect(m.get(key + 0.5)).toBe(f(key));
  });
});
describe("set", function () {
  test("empty intervals", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    expect(m.set(0, 0, "a").toArray()).toStrictEqual([]);
    expect(m.set(0, -1, "a").toArray()).toStrictEqual([]);
  });
  test("one interval", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    expect(m.set(-1, 1, "a").toArray()).toStrictEqual([
      [-1, "a"],
      [1, undefined],
    ]);
  });
  test("disjoint intervals", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    m.set(-2, -1, "a").set(1, 2, "b");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [-1, undefined],
      [1, "b"],
      [2, undefined],
    ]);
  });
  test("disjoint intervals in reverse order", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    m.set(1, 2, "b").set(-2, -1, "a");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [-1, undefined],
      [1, "b"],
      [2, undefined],
    ]);
  });
  test("disjoint intervals in reverse order with an undefined value", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    m.set(1, 2, "b").set(-2, -1, undefined);
    expect(m.toArray()).toStrictEqual([
      [1, "b"],
      [2, undefined],
    ]);
  });
  test("adjacent intervals", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    m.set(-1, 0, "a").set(0, 1, "b");
    expect(m.toArray()).toStrictEqual([
      [-1, "a"],
      [0, "b"],
      [1, undefined],
    ]);
  });
  test("adjacent intervals in reverse order", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    m.set(0, 1, "b").set(-1, 0, "a");
    expect(m.toArray()).toStrictEqual([
      [-1, "a"],
      [0, "b"],
      [1, undefined],
    ]);
  });
  test("adjacent intervals with same value", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    m.set(-1, 0, "a").set(0, 1, "a");
    expect(m.toArray()).toStrictEqual([
      [-1, "a"],
      [1, undefined],
    ]);
  });
  test("adjacent intervals with same value in reverse order", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    m.set(0, 1, "a").set(-1, 0, "a");
    expect(m.toArray()).toStrictEqual([
      [-1, "a"],
      [1, undefined],
    ]);
  });
  test("intersecting intervals", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    m.set(-2, 1, "a").set(-1, 2, "b");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [-1, "b"],
      [2, undefined],
    ]);
  });
  test("intersecting intervals in reverse order", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    m.set(-1, 2, "b").set(-2, 1, "a");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [1, "b"],
      [2, undefined],
    ]);
  });
  test("intersecting intervals with same value", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    m.set(-2, 1, "a").set(-1, 2, "a");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [2, undefined],
    ]);
  });
  test("intersecting intervals with same value in reverse order", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    m.set(-1, 2, "a").set(-2, 1, "a");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [2, undefined],
    ]);
  });
  test("nested intervals", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    m.set(-2, 2, "a").set(-1, 1, "b");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [-1, "b"],
      [1, "a"],
      [2, undefined],
    ]);
  });
  test("nested intervals in reverse order", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    m.set(-1, 1, "b").set(-2, 2, "a");
    expect(m.toArray()).toStrictEqual([
      [-2, "a"],
      [2, undefined],
    ]);
  });
  test("nested intervals with same value", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    m.set(-3, 3, "a").set(-2, 2, "a").set(-1, 1, "a");
    expect(m.toArray()).toStrictEqual([
      [-3, "a"],
      [3, undefined],
    ]);
  });
  test("nested intervals with same value in reverse order", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    m.set(-1, 1, "a").set(-2, 2, "a").set(-3, 3, "a");
    expect(m.toArray()).toStrictEqual([
      [-3, "a"],
      [3, undefined],
    ]);
  });
  test("nested intervals with same value in third order", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    m.set(-1, 1, "a").set(-3, 3, "a").set(-2, 2, "a");
    expect(m.toArray()).toStrictEqual([
      [-3, "a"],
      [3, undefined],
    ]);
  });
  test("overwrite many intervals", function () {
    var a = array(10).concat([[10, "a"]]);
    var m = new IntervalMap_1.IntervalMap(a, keyCmp, valueEq);
    m.set(0.5, 10.5, "a");
    expect(m.toArray()).toStrictEqual([[0, "a"]]);
  });
});
describe("copy", function () {
  test("an empty map and check independence", function () {
    var m = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    var copy = m.copy();
    m.set(0, 1, "a");
    copy.set(0, 1, "b");
    expect(m.get(0.5)).toBe("a");
    expect(copy.get(0.5)).toBe("b");
    expect(m.size()).toStrictEqual(2);
    expect(copy.size()).toStrictEqual(2);
  });
});
describe("compute difference for", function () {
  test("one set op", function () {
    var m1 = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    var m2 = m1.copy().set(0, 1, "a");
    expect(m2.minus(m1)).toStrictEqual([[0, 1, "a"]]);
  });
  test("two disjoint set ops", function () {
    var m1 = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    var m2 = m1.copy().set(-2, -1, "a").set(1, 2, "b");
    expect(m2.minus(m1)).toStrictEqual([
      [-2, -1, "a"],
      [1, 2, "b"],
    ]);
  });
  test("two adjacent set ops", function () {
    var m1 = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    var m2 = m1.copy().set(-1, 0, "a").set(0, 1, "b");
    expect(m2.minus(m1)).toStrictEqual([
      [-1, 0, "a"],
      [0, 1, "b"],
    ]);
  });
  test("two adjacent set ops with the same value", function () {
    var m1 = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    var m2 = m1.copy().set(-1, 0, "a").set(0, 1, "a");
    expect(m2.minus(m1)).toStrictEqual([[-1, 1, "a"]]);
  });
  test("two intersecting set ops", function () {
    var m1 = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    var m2 = m1.copy().set(-2, 1, "a").set(-1, 2, "b");
    expect(m2.minus(m1)).toStrictEqual([
      [-2, -1, "a"],
      [-1, 2, "b"],
    ]);
  });
  test("two intersecting set ops in reverse order", function () {
    var m1 = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    var m2 = m1.copy().set(-1, 2, "b").set(-2, 1, "a");
    expect(m2.minus(m1)).toStrictEqual([
      [-2, 1, "a"],
      [1, 2, "b"],
    ]);
  });
  test("two intersecting set ops with same value", function () {
    var m1 = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    var m2 = m1.copy().set(-2, 1, "a").set(-1, 2, "a");
    expect(m2.minus(m1)).toStrictEqual([[-2, 2, "a"]]);
  });
  test("two intersecting set ops with same value in reverse order", function () {
    var m1 = new IntervalMap_1.IntervalMap([], keyCmp, valueEq);
    var m2 = m1.copy().set(-1, 2, "a").set(-2, 1, "a");
    expect(m2.minus(m1)).toStrictEqual([[-2, 2, "a"]]);
  });
  test("set ops with no effect", function () {
    var m1 = new IntervalMap_1.IntervalMap(
      [
        [1, "a"],
        [2, "b"],
      ],
      keyCmp,
      valueEq,
    );
    var m2 = m1.copy().set(1, 1.5, "a").set(3, 4, "b");
    expect(m2.minus(m1)).toStrictEqual([]);
  });
  test("one inexact set op", function () {
    var m1 = new IntervalMap_1.IntervalMap(
      [
        [1, "a"],
        [2, "b"],
      ],
      keyCmp,
      valueEq,
    );
    var m2 = m1.copy().set(0, 1.5, "a");
    expect(m2.minus(m1)).toStrictEqual([[0, 1, "a"]]);
  });
  test("another inexact set op", function () {
    var m1 = new IntervalMap_1.IntervalMap(
      [
        [1, "a"],
        [2, "b"],
      ],
      keyCmp,
      valueEq,
    );
    var m2 = m1.copy().set(1.5, 3, "b");
    expect(m2.minus(m1)).toStrictEqual([[1.5, 2, "b"]]);
  });
  test("one set on a base map with many steps", function () {
    var a = array(10);
    var m1 = new IntervalMap_1.IntervalMap(a, keyCmp, valueEq);
    var m2 = m1.copy().set(0.5, 9, "a");
    expect(m2.minus(m1)).toStrictEqual([[1, 9, "a"]]);
  });
  test("multiple sets overwritten by a final set", function () {
    var m1 = new IntervalMap_1.IntervalMap([[1, "a"]], keyCmp, valueEq);
    var m2 = m1
      .copy()
      .set(2, 3, "b")
      .set(3, 4, "c")
      .set(4, 5, "d")
      .set(1.5, 4, "a");
    expect(m2.minus(m1)).toStrictEqual([[4, 5, "d"]]);
  });
});
