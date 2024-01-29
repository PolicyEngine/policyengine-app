const { bisect } = require("algorithms/Bisection");

describe("bisection", () => {
  test("small cases", () => {
    expect(bisect([], 1)).toBe(0);
    expect(bisect([1], 1)).toBe(0);
    expect(bisect([1], 2)).toBe(1);
    expect(bisect([1], 1, 0, 1, true)).toBe(1);
  });

  test("identity", () => {
    const a = [0, 1, 2, 3, 4, 5];
    test.each(a, (e) => {
      expect(bisect(a, e)).toBe(e);
    });
  });

  test("successor 1", () => {
    const a = [0, 1, 2, 3, 4, 5];
    test.each(a, (e) => {
      expect(bisect(a, e + 0.5)).toBe(e + 1);
    });
  });

  test("successor 2", () => {
    const a = [0, 1, 2, 3, 4, 5];
    test.each(a, (e) => {
      expect(bisect(a, e, 0, a.length, true)).toBe(e + 1);
    });
  });

  test("successor 4", () => {
    const a = [0, 1, 2, 3, 4, 5];
    test.each(a, (e) => {
      expect(bisect(a, e + 0.5, 0, a.length, true)).toBe(e + 1);
    });
  });

  test("duplicates", () => {
    const a = [0, 1, 2, 3, 3, 3, 6, 7];
    expect(bisect(a, 3)).toBe(3);
    expect(bisect(a, 3, 0, a.length, true)).toBe(6);
  });

  test("unknown", () => {
    const a = [-2, -1];
    expect(bisect(a, 1, 0, a.length, false)).toBe(a.length);
  });
});
