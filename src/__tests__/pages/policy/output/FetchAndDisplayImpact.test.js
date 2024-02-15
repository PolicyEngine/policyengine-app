import { areObjectsSame } from "../../../../pages/policy/output/FetchAndDisplayImpact";

jest.mock("react-plotly.js", () => jest.fn());

describe("areObjectsSame function", () => {
  const testObj = {
    firstKey: "maxwell",
    secondKey: "dworkin",
    thirdKey: "cruft"
  }

  test("First object is null should return false", () => {
    const firstObj = null;
    const secondObj = JSON.parse(JSON.stringify(testObj));

    expect(areObjectsSame(firstObj, secondObj)).toEqual(false);
  });
  test("Second object is null should return false", () => {
    const firstObj = JSON.parse(JSON.stringify(testObj));
    const secondObj = null;

    expect(areObjectsSame(firstObj, secondObj)).toEqual(false);
  });
  test("Different key lengths should return false", () => {
    const firstObj = JSON.parse(JSON.stringify(testObj));
    const secondObj = {
      firstKey: "garbageValue"
    };

    expect(areObjectsSame(firstObj, secondObj)).toEqual(false);
  });
  test("Same number of keys, but different keys, should return false", () => {
    const firstObj = JSON.parse(JSON.stringify(testObj));
    const secondObj = {
      firstKey: "garbageValue",
      secondKey: "northwestern",
      invalidKey: "invalidValue"
    };

    expect(areObjectsSame(firstObj, secondObj)).toEqual(false);
  });
  test("Different values should return false", () => {
    const firstObj = JSON.parse(JSON.stringify(testObj));
    const secondObj = {
      firstKey: "garbageValue",
      secondKey: "northwestern",
      thirdKey: "invalidValue"
    };

    expect(areObjectsSame(firstObj, secondObj)).toEqual(false);
  });
  test("Exact same keys and values should return true", () => {
    const firstObj = JSON.parse(JSON.stringify(testObj));
    const secondObj = {
      firstKey: "maxwell",
      secondKey: "dworkin",
      thirdKey: "cruft"
    };

    expect(areObjectsSame(firstObj, secondObj)).toEqual(true);
  });
});