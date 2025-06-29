export function sumArray(arr) {
  return arr.reduce((acc, val) => acc + val, 0);
}

export const aggregators = {
  sum: sumArray,
};
