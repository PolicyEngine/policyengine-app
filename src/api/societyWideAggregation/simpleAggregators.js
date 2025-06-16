export function sumArray(arr) {
  return arr.reduce((acc, val) => acc + val, 0);
}

export function findMeanOfArray(arr) {
  return arr.reduce((acc, val) => acc + val, 0) / arr.length;
}

export const aggregators = {
  sum: sumArray,
  mean: findMeanOfArray,
};
