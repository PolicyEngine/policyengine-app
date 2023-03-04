/** 
 * Function accepts a given currency symbol and number and converts them 
 * into a currency string 
 * 
 * ("$", 10000) => "$10,000"
 * */
export function convertToCurrencyString(symbol, amount) {
  return `${symbol}${amount.toLocaleString("en-GB", { maximumFractionDigits: 0 })}`
}