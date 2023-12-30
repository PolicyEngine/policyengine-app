// Breakdown template component that will receive a 
// JS data structure, iterate, and apply styling


export default function ImpactBreakdown(props) {
  const { metadata, policy, impact } = props;

  // TODO: Remove this log
  console.log(metadata);
  console.log(policy);
  console.log(impact);

  const TITLE = "Your reform impact";

  // Define the impact items to be included in the output
  const budgetaryImpact = impact.budget.budgetary_impact;
  const povertyOverview = impact.poverty.poverty.all;
  const decileOverview = impact.intra_decile.all;
  const povertyRateChange = povertyOverview.reform - povertyOverview.baseline;
  const winnersPercent = decileOverview["Gain more than 5%"] + decileOverview["Gain less than 5%"];
  const losersPercent = decileOverview["Lose more than 5%"] + decileOverview["Lose less than 5%"];

  const listItems = [
    {
      data: budgetaryImpact,
      formatted: formatDesc(budgetaryImpact, "budgetaryImpact", {currencyLabel: metadata.currency}),
    },
    {
      data: povertyRateChange,
      formatted: formatDesc(povertyRateChange, "povertyRateChange", {percentage: true}),
    },
    {
      data: winnersPercent,
      formatted: formatDesc(winnersPercent, "winnersPercent", {percentage: true}),
    },
    {
      data: losersPercent,
      formatted: formatDesc(losersPercent, "losersPercent", {percentage: true})
    }
  ];

  // Define data constants and populate data structure

  // Pass data structure to template
  return (
    <>
      <p>{`${listItems[0].formatted}, ${listItems[1].formatted}, ${listItems[2].formatted}, ${listItems[3].formatted}`}</p>
    </>
  );
}

/**
 * Break large numbers into units of million, trillion, etc.
 * @param {Number} value The value to be processed
 * @returns {Array<Number, String>} An array, where the first item is the new display value,
 * and the second is its postfix label
 */
function formatPowers(value) {
  const powers = new Map([
    [15, "qa"],
    [12, "tn"],
    [9, "bn"],
    [6, "mn"]
  ]);
  let label = "";
  let displayValue = value;

  for (const [power, unit] of powers) {
    if (value / Math.pow(10, power) >= 1) {
      displayValue = value / Math.pow(10, power);
      label = unit;
      break;
    }
  }
  return [Number(displayValue), label];

}

/**
 * Creates a display string based on an input value
 * @param {Number|String} value The data value corresponding to the description
 * @param {String} type The type of value to be formatted; corresponds with 
 * certain default values defined in the function
 * @param {Object} [options] An object containing a series of optional args
 * @param {String} [options.currencyLabel] The currency label to be applied to the text
 * @param {boolean} [options.percentage] Whether or not the input is a percentage value
 * @returns {String || Array<String, String>}
 */
function formatDesc(value, type, options) {
  let {currencyLabel, percentage} = options;
  let action = "";
  let displayValue = "";
  let postfixLabel = "";

  // Declare template nouns for output when value is 0
  const templateStringsZero = {
    budgetaryImpact: "Your policy reform would have no impact on the budget",
    povertyRateChange: "Your policy reform would have no impact on the poverty rate",
    winnersPercent: "Under your reform, no households would receive a higher net income",
    losersPercent: "Under your reform, no households would receive a lower net income",
  };

  const templateStringsError = {
    budgetaryImpact: "budget",
    povertyRateChange: "poverty rate",
    winnersPercent: "percentage of households receiving a higher net income",
    losersPercent: "percentage of households receiving a lower net income",
  };

  // Handle zero cases
  if (value === 0) {
    return templateStringsZero[type];
  }

  // Handle error cases; doing so after 0 because 0 is falsy
  if (!value || Number.isNaN(value)) {
    return `There was an error in calculating your policy reform's impact on the ${templateStringsError[type]}`;
  }

  // Declare default "action" value and manual overrides
  const actions = {
    default: ["raise", "lower"],
    budgetaryImpact: ["savings", "cost"]
  };

  // Determine action
  const key = Object.keys(actions).includes(type) ? type : "default";
  if (value > 0) {
    action = actions[key][0];
  } else {
    action = actions[key][1];
  }

  // Remove negative signs
  displayValue = Math.abs(Number(value));

  // If percentage, multiple by 100
  if (percentage) {
    displayValue *= 100;
  }

  // Break large numbers down
  [displayValue, postfixLabel] = formatPowers(displayValue);

  // Round to two decimal points
  displayValue = displayValue.toFixed(2);

  // Declare template strings for output; must be after all processing
  // to enable proper string construction
  const templateStrings = {
    budgetaryImpact: `Your reform's projected net budgetary ${action} is`,
    povertyRateChange: `Your reform would ${action} the poverty rate by`,
    winnersPercent: "Percentage of the population that would receive " +  
    "higher net income under your reform:",
    losersPercent: "Percentage of the population that would receive " +
    "lower net income under your reform:",
  };

  const templateValues = {
    budgetaryImpact: `${currencyLabel}${displayValue}${postfixLabel}`,
    povertyRateChange: `${displayValue}%`,
    winnersPercent: `${displayValue}%`,
    losersPercent: `${displayValue}%`,
  }

  // Return string and corresponding value
  return [templateStrings[type], templateValues[type]];

}