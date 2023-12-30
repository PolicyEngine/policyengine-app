import {
  CaretDownFilled,
  CaretUpFilled,
} from "@ant-design/icons";
import style from "../../../style";

export default function ImpactBreakdown(props) {
  const { metadata, policy, impact } = props;

  // Define the impact items to be included in the output
  const budgetaryImpact = impact.budget.budgetary_impact;
  const povertyOverview = impact.poverty.poverty.all;
  const decileOverview = impact.intra_decile.all;
  const povertyRateChange = povertyOverview.reform - povertyOverview.baseline;
  const winnersPercent = decileOverview["Gain more than 5%"] + decileOverview["Gain less than 5%"];
  const losersPercent = decileOverview["Lose more than 5%"] + decileOverview["Lose less than 5%"];

  const listItems = [
    {
      value: budgetaryImpact,
      type: "budgetaryImpact",
      formatted: formatDesc(budgetaryImpact, "budgetaryImpact", {currencyLabel: metadata.currency}),
    },
    {
      value: povertyRateChange,
      type: "povertyRateChange",
      formatted: formatDesc(povertyRateChange, "povertyRateChange", {percentage: true}),
    },
    {
      value: winnersPercent,
      type: "winnersPercent",
      formatted: formatDesc(winnersPercent, "winnersPercent", {percentage: true}),
    },
    {
      value: losersPercent,
      type: "losersPercent",
      formatted: formatDesc(losersPercent, "losersPercent", {percentage: true})
    }
  ];

  // Define data constants and populate data structure

  // Pass data structure to template
  return (
    <>
      <BreakdownTemplate data={listItems} />
    </>
  );
}

/**
 * Template for taking pre-formatted data and returning JSX of a breakdown page
 * @param {Object} props 
 * @param {Array<Object>} props.data An array of individual data objects that will become
 * each line in the template
 * @param {Number} props.data.value The numerical value of each line item
 * @param {Function} props.data.formatted The string formatter function associated with each line
 * @returns {import("react-markdown/lib/react-markdown").ReactElement}
 */
function BreakdownTemplate(props) {
  const { data } = props;

  const TITLE = "Your reform impact";
  const COLORS = {
    pos: style.colors.BLUE,
    neg: style.colors.DARK_GRAY
  };

  // When formatting, treat a negative number
  // as positive (e.g., in case of poverty rate change)
  const manualSignFlips = [
    "povertyRateChange",
    "losersPercent"
  ];

  // Declare arrow buttons
  const UpArrow = ({color}) => (
    <CaretUpFilled
      style={{
        color: color || COLORS.pos,
        display: "inline-flex",
        alignItems: "center",
      }}
    />
  );

  const DownArrow = ({color}) => (
    <CaretDownFilled
      style={{
        color: color || COLORS.neg,
        display: "inline-flex",
        alignItems: "center",
      }}
    />
  );

  // Iterate over the data...
  const lineItems = data.map((item, index) => {

    // Return a formatted line containing the string
    // and value, colored based on the value contained
    let color = null;

    if (item.value > 0) {
      if (manualSignFlips.includes(item.type)) {
        color = COLORS.neg;
      } else {
        color = COLORS.pos;
      }
    } else {
      if (manualSignFlips.includes(item.type)) {
        color = COLORS.pos;
      } else {
        color = COLORS.neg;
      }
    }

    const [formattedString, formattedValue] = item.formatted;
    
    return (
      <>
        <h2
          key={index + "h2"}
          style={{
            fontSize: 22
          }}
        >
          {formattedString}
        </h2>
        <div
          key={index + "div"}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "8px",
            fontSize: "22px"
          }}
        >
          {item.value && item.value > 0 && <UpArrow color={color}/>}
          {item.value && item.value < 0 && <DownArrow color={color}/>}
          {/*The h2 below needs to render, even if empty, to maintain the grid*/}
          <h2
            style={{
              fontSize: 22,
              color: color,
              textAlign: "right",
              marginBottom: 0
            }}
          >
            {formattedValue}
          </h2>
        </div>
      </>
    );
  });

  return (
    <div
      style={{
        minHeight: "100%",
        padding: "0px 20px"
      }}
    >
      <h2
        style={{
          marginBottom: "20px"
        }}
      >
        {TITLE}
      </h2>
      <div
        style={{
          width: "100%",
          display: "grid",
          alignContent: "center",
          gridTemplateColumns: "1fr max-content",
          rowGap: "20px",
          gap: "20px"
        }}
      >
      {lineItems}
      </div>
    </div>
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
    winnersPercent: "Under your reform, none of the population would receive a higher net income",
    losersPercent: "Under your reform, none of the population would receive a lower net income",
  };

  const templateStringsError = {
    budgetaryImpact: "budget",
    povertyRateChange: "poverty rate",
    winnersPercent: "percentage of households receiving a higher net income",
    losersPercent: "percentage of households receiving a lower net income",
  };

  // Handle zero cases
  if (value === 0) {
    return [templateStringsZero[type], ""];
  }

  // Handle error cases; doing so after 0 because 0 is falsy
  if (!value || Number.isNaN(value)) {
    return [`There was an error in calculating your policy reform's impact on the ${templateStringsError[type]}`, ""];
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
    winnersPercent: "Your reform would raise the net income for this percent " + 
    "of the population:",
    losersPercent: "Your reform would lower the net income for this percent " + 
    "of the population:",
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