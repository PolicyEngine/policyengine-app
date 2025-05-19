import { updateDeprecatedSearchParams } from "../../routing/updateDeprecatedSearchParams";

describe("updateDeprecatedSearchParams", () => {
  const validCountryId = "us";
  const validDataset = "enhanced_cps";
  const validRegion = "us";
  const deprecatedRegion = "enhanced_us";

  test("should return null if no updates are needed", () => {
    const searchParams = new URLSearchParams({
      region: validRegion,
      country_id: validCountryId,
      dataset: validDataset,
    });
    const result = updateDeprecatedSearchParams(searchParams);
    expect(result).toBeNull();
  });
  test("should return new URLSearchParams object with updated params, updating relevant params", () => {
    const searchParams = new URLSearchParams({
      region: deprecatedRegion,
      country_id: validCountryId,
      dataset: validDataset,
    });
    const result = updateDeprecatedSearchParams(searchParams);
    expect(result).not.toBeNull();
    expect(result.get("region")).toBe(validRegion);
    expect(result.get("dataset")).toBe(validDataset);
  });
  test("should return new URLSearchParams object with updated params, adding relevant new params", () => {
    const searchParams = new URLSearchParams({
      region: deprecatedRegion,
      country_id: validCountryId,
    });
    const result = updateDeprecatedSearchParams(searchParams);
    expect(result).not.toBeNull();
    expect(result.get("region")).toBe(validRegion);
    expect(result.get("dataset")).toBe(validDataset);
  });
});
