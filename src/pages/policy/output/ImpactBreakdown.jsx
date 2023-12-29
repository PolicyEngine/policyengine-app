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
      desc: formatDescBudget(budgetaryImpact, metadata.currency),
    },
    {
      data: povertyRateChange,
      desc: formatDescPovertyRate(povertyRateChange),
    },
    {
      name: "Population percentage that gains",
      data: winnersPercent
    },
    {
      name: "Population percentage that loses",
      data: losersPercent
    }
  ];

  // Define data constants and populate data structure

  // Pass data structure to template
  return (
    <>
      <p>{`${listItems[0].desc}, ${listItems[1].desc}, ${winnersPercent}, ${losersPercent}`}</p>
    </>
  );
}

function formatPowers(value) {
  const powers = {
    12: "qa",
    9: "tn",
    6: "bn",
  };

  let displayValue = value;
  for (const power in powers) {
    if (value / Math.pow(10, power) >= 1) {
      displayValue = `${Math.round(value / Math.pow(10, power), 2)}${powers[power]}`;
      break;
    }
  }
  return displayValue;

}

/**
 * Creates a display string based on an input budgetary impact value
 * @param {Number|String} value The data value corresponding to the description
 * @param {String} label The currency label taken from the metadata
 * @returns {String}
 */
function formatDescBudget(value, label) {

  // Handle error cases
  if (!value || Number.isNaN(value)) {
    return `There was an error in calculating your policy reform's impact on the budget`;
  }

  // Handle zero cases
  if (value === 0) {
    return `Your policy reform would have no impact on the budget`;
  }

  // Apply number formatting
  let displayValue = Math.abs(value);

  // Break large numbers down
  displayValue = formatPowers(displayValue);

  // Return string
  return `Your policy reform would ${value > 0 ? 'raise' : 'cost'} ${label}${displayValue} this year`;

}

function formatDescPovertyRate(value) {
  // Handle error cases
  if (!value || Number.isNaN(value)) {
    return `There was an error in calculating your policy reform's impact on the poverty rate`;
  }

  // Handle zero cases
  if (value === 0) {
    return `Your policy reform would have no impact on the poverty rate`;
  }

  // Apply number formatting
  let displayValue = Math.round(Math.abs(value) * 100, 2);

  // Break large numbers down
  displayValue = formatPowers(displayValue);

  // Return string
  return `Your policy reform would ${value > 0 ? 'raise': 'lower'} the poverty rate by ${displayValue}% this year`;

}