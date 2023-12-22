import style from "../../../../style";
import { convertToCurrencyString } from "./convertToCurrencyString";

export function getCliffs(
  netIncomeArray,
  earningsArray,
  range,
  isReform = false,
  currency = "$",
  useHoverCard = false,
) {
  // Return a list of [(start, end), ...] where the net income does not increase
  if (!netIncomeArray || !earningsArray) return [];
  let cliffs = [];
  let inCliff = false;
  let cliffStart = 0;
  for (let i = 1; i < netIncomeArray.length; i++) {
    if (netIncomeArray[i] - netIncomeArray[i - 1] <= 0) {
      if (!inCliff) {
        cliffStart = i - 1;
        inCliff = true;
      }
    } else if (
      inCliff &&
      (netIncomeArray[i] > netIncomeArray[cliffStart] ||
        i === netIncomeArray.length - 1)
    ) {
      cliffs.push([earningsArray[cliffStart], earningsArray[i]]);
      inCliff = false;
    }
  }

  return cliffs.map((points, i) => {
    return {
      x: [points[0], points[0], points[1], points[1], points[0]],
      y: [0, range[1], range[1], 0, 0],
      fill: "toself",
      mode: "lines",
      fillcolor: style.colors.DARK_GRAY,
      name: `Cliff ${i + 1}${isReform ? " (reform)" : ""}`,
      ...(useHoverCard
        ? {
            text: "",
          }
        : {
            text:
              `<b>Cliff ${i + 1}${isReform ? " (reform)" : ""}</b><br><br>` +
              `Your net income falls after earning ` +
              `${convertToCurrencyString(currency, points[0])}<br>` +
              `until earning ${convertToCurrencyString(currency, points[1])} ` +
              `in the ${isReform ? "reform" : "baseline"} scenario.`,
          }),
      opacity: 0.1,
      line_width: 0,
      showlegend: false,
      type: "scatter",
      line: {
        color: style.colors.DARK_GRAY,
      },
      ...(useHoverCard
        ? {
            hoverinfo: "none",
          }
        : {
            hoverinfo: "text",
          }),
    };
  });
}
