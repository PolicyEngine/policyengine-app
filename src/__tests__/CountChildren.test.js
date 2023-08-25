import {
  getChildName
} from "pages/household/input/CountChildren.jsx";

describe("Test refactored CountChildren functions", () => {
  test("Confirm that getChildName works for UK", () => {

    expect(getChildName(2, "uk")).toBe("your third child");

  });

  test("Confirm that getChildName works for US", () => {
    expect(getChildName(1, "us")).toBe("your second dependent");
  });

  test("Confirm that getChildName works for Nigeria", () => {
    expect(getChildName(3, "ng")).toBe("your fourth child");
  });

  test("Confirm that getChildName works for future countries by default (e.g., Tuvalu", () => {
    expect(getChildName(4, "tv")).toBe("your fifth child");
  });

});