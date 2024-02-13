Object.defineProperty(exports, "__esModule", { value: true });
var Bisection_1 = require("algorithms/Bisection");
describe("bisection", function () {
  test("small cases", function () {
    expect(
      (0, Bisection_1.bisect)([], 1, function (a) {
        return a - 1;
      }),
    ).toBe(0);
    expect(
      (0, Bisection_1.bisect)([1], 1, function (a) {
        return a - 1;
      }),
    ).toBe(0);
    expect(
      (0, Bisection_1.bisect)([1], 2, function (a) {
        return a - 2;
      }),
    ).toBe(1);
    expect(
      (0, Bisection_1.bisect)(
        [1],
        1,
        function (a) {
          return a - 1;
        },
        0,
        1,
        true,
      ),
    ).toBe(1);
  });
  var a = [0, 1, 2, 3, 4, 5];
  test.each(a)("identity", function (e) {
    expect(
      (0, Bisection_1.bisect)(a, e, function (o) {
        return o - e;
      }),
    ).toBe(e);
  });
  test.each(a)("successor 1", function (e) {
    expect(
      (0, Bisection_1.bisect)(a, e + 0.5, function (o) {
        return o - e - 0.5;
      }),
    ).toBe(e + 1);
  });
  test.each(a)("successor 2", function (e) {
    expect(
      (0, Bisection_1.bisect)(
        a,
        e,
        function (o) {
          return o - e;
        },
        0,
        a.length,
        true,
      ),
    ).toBe(e + 1);
  });
  test.each(a)("successor 3", function (e) {
    expect(
      (0, Bisection_1.bisect)(
        a,
        e + 0.5,
        function (o) {
          return o - e - 0.5;
        },
        0,
        a.length,
        true,
      ),
    ).toBe(e + 1);
  });
  test("duplicates", function () {
    var a = [0, 1, 2, 3, 3, 3, 6, 7];
    expect(
      (0, Bisection_1.bisect)(a, 3, function (e) {
        return e - 3;
      }),
    ).toBe(3);
    expect(
      (0, Bisection_1.bisect)(
        a,
        3,
        function (e) {
          return e - 3;
        },
        0,
        a.length,
        true,
      ),
    ).toBe(6);
  });
  test("unknown", function () {
    var a = [-2, -1];
    expect(
      (0, Bisection_1.bisect)(
        a,
        1,
        function (e) {
          return e - 1;
        },
        0,
        a.length,
        false,
      ),
    ).toBe(a.length);
  });
});
