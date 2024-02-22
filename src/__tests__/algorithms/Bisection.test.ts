import { bisect } from "algorithms/Bisection";

describe("bisection", () => {
  test("small cases", () => {
    expect(bisect([], 1, (a: number) => a - 1)).toBe(0);
    expect(bisect([1], 1, (a: number) => a - 1)).toBe(0);
    expect(bisect([1], 2, (a: number) => a - 2)).toBe(1);
    expect(bisect([1], 1, (a: number) => a - 1, 0, 1, true)).toBe(1);
  });

  const a = [0, 1, 2, 3, 4, 5];
  test.each(a)("identity", (e) => {
    expect(bisect(a, e, (o: number) => o - e)).toBe(e);
  });

  test.each(a)("successor 1", (e) => {
    expect(bisect(a, e + 0.5, (o: number) => o - e - 0.5)).toBe(e + 1);
  });

  test.each(a)("successor 2", (e) => {
    expect(bisect(a, e, (o: number) => o - e, 0, a.length, true)).toBe(e + 1);
  });

  test.each(a)("successor 3", (e) => {
    expect(
      bisect(a, e + 0.5, (o: number) => o - e - 0.5, 0, a.length, true),
    ).toBe(e + 1);
  });

  test("duplicates", () => {
    const a = [0, 1, 2, 3, 3, 3, 6, 7];
    expect(bisect(a, 3, (e: number) => e - 3)).toBe(3);
    expect(bisect(a, 3, (e: number) => e - 3, 0, a.length, true)).toBe(6);
  });

  test("unknown", () => {
    const a = [-2, -1];
    expect(bisect(a, 1, (e: number) => e - 1, 0, a.length, false)).toBe(
      a.length,
    );
  });
});
