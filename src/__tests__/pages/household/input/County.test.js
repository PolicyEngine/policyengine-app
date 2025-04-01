import County from "../../../../pages/household/input/County";

describe("Given County component with no prior state...", () => {
  test("all counties are displayed on render");
  test("selecting a county updates the householdInput state");
  test("selecting a county updates the URL search params");
  test("selecting a county updates the householdId");
});

describe("Given County component with California selected as State...", () => {
  test("only counties in California are displayed");
  test("selecting a county updates the householdInput state");
  test("selecting a county updates the URL search params");
  test("selecting a county updates the householdId");
});

describe("Given user accesses county input page via URL...", () => {
  test("County component renders");
});