import * as yup from "yup";
import { copySearchParams } from "../api/call";

export const DeprecatedSearchParam = yup.object({
  oldKey: yup.string().required(),
  oldValue: yup.string().required(),
  newKeysAndValues: yup
    .array()
    .of(
      yup.object({
        key: yup.string().required(),
        value: yup.string().required(),
      }),
    )
    .required(),
});

export const deprecatedSearchParams = [
  DeprecatedSearchParam.validateSync({
    oldKey: "region",
    oldValue: "enhanced_us",
    newKeysAndValues: [
      { key: "region", value: "us" },
      { key: "dataset", value: "enhanced_cps" },
    ],
  }),
];

export const deprecatedSearchParamKeys = deprecatedSearchParams.map(
  (param) => param.oldKey,
);

/**
 * Given a URLSearchParams object, return null if no updates are needed,
 * otherwise return new URLSearchParams object, replacing deprecated params
 * @param {URLSearchParams} searchParams
 * @returns {URLSearchParams|null} Null if no updates needed, otherwise new URLSearchParams object
 */
export function updateDeprecatedSearchParams(searchParams) {
  // Check if any deprecated params are present
  const hasDeprecatedParams = deprecatedSearchParams.some(
    (param) =>
      searchParams.has(param.oldKey) &&
      searchParams.get(param.oldKey) === param.oldValue,
  );
  if (!hasDeprecatedParams) {
    return null;
  }

  let newSearchParams = copySearchParams(searchParams);
  deprecatedSearchParams.forEach((param) => {
    if (searchParams.get(param.oldKey) === param.oldValue) {
      newSearchParams.delete(param.oldKey);
      param.newKeysAndValues.forEach((newParam) => {
        newSearchParams.set(newParam.key, newParam.value);
      });
    }
  });

  return newSearchParams;
}
