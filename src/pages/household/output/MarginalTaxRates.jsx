import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { apiCall } from "../../../api/call";
import {
  formatVariableValue,
  getPlotlyAxisFormat,
  getValueFromHousehold,
} from "../../../api/variables";
import ErrorPage from "../../../layout/Error";
import ResultsPanel from "../../../layout/ResultsPanel";
import style from "../../../style";
import FadeIn from "../../../layout/FadeIn";
import Spinner from "../../../layout/Spinner";

export default function MarginalTaxRates(props) {
  const { household, metadata } = props;
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let householdData = JSON.parse(JSON.stringify(household.input));
    householdData.people.you.employment_income["2022"] = null;
    householdData.axes = [
      [
        {
          name: "employment_income",
          period: "2022",
          min: 0,
          max: 200_000,
          count: 101,
        },
      ],
    ];
    apiCall(`/${metadata.countryId}/calculate`, { household: householdData })
      .then((res) => res.json())
      .then((data) => {
        setResult(data.result);
      })
      .catch((err) => {
        setError(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <ErrorPage message="We ran into an issue when trying to simulate your household's net income under different earnings. Please try again later." />
    );
  }

  let plot;

  if (result) {
    const earningsArray = getValueFromHousehold(
      "employment_income",
      "2022",
      "you",
      result,
      metadata
    );
    const mtrArray = getValueFromHousehold(
      "marginal_tax_rate",
      "2022",
      "you",
      result,
      metadata
    );
    const currentEarnings = getValueFromHousehold(
      "employment_income",
      "2022",
      "you",
      household.input,
      metadata
    );
    const currentMtr = getValueFromHousehold(
      "marginal_tax_rate",
      "2022",
      "you",
      household.baseline,
      metadata
    );
    // Add the main line, then add a 'you are here' line
    plot = (
      <FadeIn>
        <Plot
          data={[
            {
              x: earningsArray,
              y: mtrArray,
              type: "line",
              name: "Marginal tax rate",
              line: {
                shape: "hv",
              },
            },
            {
              x: [currentEarnings, currentEarnings],
              y: [0, currentMtr],
              type: "line",
              name: "Your current MTR",
              line: {
                color: style.colors.DARK_GRAY,
              },
            },
          ]}
          layout={{
            xaxis: {
              title: "Employment income",
              ...getPlotlyAxisFormat(metadata.variables.employment_income.unit),
            },
            yaxis: {
              title: "Marginal tax rate",
              ...getPlotlyAxisFormat(metadata.variables.marginal_tax_rate.unit),
            },
          }}
          config={{
            displayModeBar: false,
          }}
          style={{
            width: "100%",
          }}
        />
      </FadeIn>
    );
  }

  const mtr = getValueFromHousehold(
    "marginal_tax_rate",
    "2022",
    "you",
    household.baseline,
    metadata
  );

  return (
    <ResultsPanel
      title={`Your marginal tax rate is ${
        mtr !== null ? (
          formatVariableValue(metadata.variables.marginal_tax_rate, mtr)
        ) : (
          <Spinner />
        )
      }`}
      description="Your marginal tax rate is the tax rate you pay on your next dollar of income. The chart below shows how your marginal tax rate changes as your income changes."
    >
      {plot}
    </ResultsPanel>
  );
}
