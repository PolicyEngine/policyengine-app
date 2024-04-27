import { areObjectsSame } from "../../../../data/areObjectsSame";

jest.mock("react-plotly.js", () => jest.fn());

describe("areObjectsSame function", () => {
  const testObj = {
    firstKey: "maxwell",
    secondKey: "dworkin",
    thirdKey: "cruft",
  };

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
      firstKey: "garbageValue",
    };

    expect(areObjectsSame(firstObj, secondObj)).toEqual(false);
  });
  test("Same number of keys, but different keys, should return false", () => {
    const firstObj = JSON.parse(JSON.stringify(testObj));
    const secondObj = {
      firstKey: "garbageValue",
      secondKey: "northwestern",
      invalidKey: "invalidValue",
    };

    expect(areObjectsSame(firstObj, secondObj)).toEqual(false);
  });
  test("Different values should return false", () => {
    const firstObj = JSON.parse(JSON.stringify(testObj));
    const secondObj = {
      firstKey: "garbageValue",
      secondKey: "northwestern",
      thirdKey: "invalidValue",
    };

    expect(areObjectsSame(firstObj, secondObj)).toEqual(false);
  });
  test("Exact same keys and values should return true", () => {
    const firstObj = JSON.parse(JSON.stringify(testObj));
    const secondObj = {
      firstKey: "maxwell",
      secondKey: "dworkin",
      thirdKey: "cruft",
    };

    expect(areObjectsSame(firstObj, secondObj)).toEqual(true);
  });
  test("Exact same nested objects should return true", () => {
    const nestedTestObj = {
      firstKey: "maxwell",
      secondKey: "dworkin",
      nestedKey: {
        firstSubKey: "maxwell",
        secondSubKey: "cruft",
      },
    };

    const firstObj = JSON.parse(JSON.stringify(nestedTestObj));
    const secondObj = JSON.parse(JSON.stringify(nestedTestObj));

    expect(areObjectsSame(firstObj, secondObj)).toEqual(true);
  });
  test("One nested object and one not should return false", () => {
    const nestedTestObj = {
      firstKey: "maxwell",
      secondKey: "dworkin",
      nestedKey: {
        firstSubKey: "maxwell",
        secondSubKey: "cruft",
      },
    };

    const firstObj = JSON.parse(JSON.stringify(testObj));
    const secondObj = JSON.parse(JSON.stringify(nestedTestObj));

    expect(areObjectsSame(firstObj, secondObj)).toEqual(false);
  });
  test("Different nested objects should return false", () => {
    const nestedTestObj = {
      firstKey: "maxwell",
      secondKey: "dworkin",
      nestedKey: {
        firstSubKey: "maxwell",
        secondSubKey: "cruft",
      },
    };

    const otherTestObj = {
      firstKey: "maxwell",
      secondKey: "garbageValue",
      nestedKey: {
        firstSubKey: "maxwell",
        secondSubKey: "illegalValue",
      },
    };

    const firstObj = JSON.parse(JSON.stringify(otherTestObj));
    const secondObj = JSON.parse(JSON.stringify(nestedTestObj));

    expect(areObjectsSame(firstObj, secondObj)).toEqual(false);
  });
});
