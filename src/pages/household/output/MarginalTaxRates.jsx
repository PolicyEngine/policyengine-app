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
import { useSearchParams } from "react-router-dom";
import { Switch } from "antd";
import LoadingCentered from "../../../layout/LoadingCentered";
import { ChartLogo } from "../../../api/charts";

export default function MarginalTaxRates(props) {
  const { householdInput, householdBaseline, metadata, policyLabel } = props;
  const [baselineMtr, setBaselineMtr] = useState(null);
  const [searchParams] = useSearchParams();
  const householdId = searchParams.get("household");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId =
    searchParams.get("baseline") || metadata.current_law_id;
  const [reformMtr, setReformMtr] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelta, setShowDelta] = useState(false);
  let title;

  const currentEarnings = getValueFromHousehold(
    "employment_income",
    "2023",
    "you",
    householdInput,
    metadata
  );
  const currentMtr = getValueFromHousehold(
    "marginal_tax_rate",
    "2023",
    "you",
    householdBaseline,
    metadata
  );

  useEffect(() => {
    let householdData = JSON.parse(JSON.stringify(householdInput));
    householdData.people.you.employment_income["2023"] = null;
    householdData.axes = [
      [
        {
          name: "employment_income",
          period: "2023",
          min: 0,
          max: Math.max(200_000, 2 * currentEarnings),
          count: 401,
        },
      ],
    ];
    let requests = [];
    requests.push(
      apiCall(`/${metadata.countryId}/calculate`, {
        household: householdData,
        policy_id: baselinePolicyId,
      })
        .then((res) => res.json())
        .then((data) => {
          setBaselineMtr(data.result);
        })
        .catch((err) => {
          setError(err);
        })
    );
    if (reformPolicyId) {
      requests.push(
        apiCall(`/${metadata.countryId}/calculate`, {
          household: householdData,
          policy_id: reformPolicyId,
        })
          .then((res) => res.json())
          .then((data) => {
            setReformMtr(data.result);
          })
          .catch((err) => {
            setError(err);
          })
      );
    }
    Promise.all(requests).then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reformPolicyId, baselinePolicyId, householdId]);

  if (error) {
    return (
      <ErrorPage message="We ran into an issue when trying to simulate your household's net income under different earnings. Please try again later." />
    );
  }

  let plot;

  if (baselineMtr && !reformMtr) {
    const earningsArray = getValueFromHousehold(
      "employment_income",
      "2023",
      "you",
      baselineMtr,
      metadata
    );
    const mtrArray = getValueFromHousehold(
      "marginal_tax_rate",
      "2023",
      "you",
      baselineMtr,
      metadata
    );
    title = `Your current marginal tax rate is ${formatVariableValue(
      { unit: "/1" },
      currentMtr,
      0
    )}`;
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
                color: style.colors.BLUE,
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
              tickformat: ",.0f",
            },
            yaxis: {
              title: "Marginal tax rate",
              ...getPlotlyAxisFormat(metadata.variables.marginal_tax_rate.unit),
              tickformat: ".0%",
            },
            legend: {
              // Position above the plot
              y: 1.1,
              orientation: "h",
            },
            ...ChartLogo,
          }}
          config={{
            displayModeBar: false,
            responsive: true,
          }}
          style={{
            width: "100%",
          }}
        />
      </FadeIn>
    );
  } else if (baselineMtr && reformMtr) {
    const earningsArray = getValueFromHousehold(
      "employment_income",
      "2023",
      "you",
      baselineMtr,
      metadata
    );
    const baselineMtrArray = getValueFromHousehold(
      "marginal_tax_rate",
      "2023",
      "you",
      baselineMtr,
      metadata
    );
    const reformMtrArray = getValueFromHousehold(
      "marginal_tax_rate",
      "2023",
      "you",
      reformMtr,
      metadata
    );

    const currEarningsIdx = earningsArray.indexOf(currentEarnings)
    const reformMtrValue = reformMtrArray[currEarningsIdx]
    
    if (currentMtr !== reformMtrValue) {
      title = `${policyLabel} ${
        reformMtrValue > currentMtr ? "increases" : "decreases"
      } your marginal tax rate from ${formatVariableValue(
        { unit: "/1" },
        currentMtr,
        0
      )} to ${formatVariableValue({ unit: "/1" }, reformMtrValue, 0)}`;
    } else {
      title = `${policyLabel} doesn't change your marginal tax rate`;
    }
    // Add the main line, then add a 'you are here' line
    let data;
    if (showDelta) {
      data = [
        {
          x: earningsArray,
          y: reformMtrArray.map(
            (value, index) => value - baselineMtrArray[index]
          ),
          type: "line",
          name: "MTR difference",
          line: {
            color: style.colors.BLUE,
            shape: "hv",
          },
        },
        {
          x: [currentEarnings, currentEarnings],
          y: [0, reformMtrValue - currentMtr],
          type: "line",
          name: "Your current MTR difference",
          line: {
            color: style.colors.MEDIUM_DARK_GRAY,
            shape: "hv",
          },
        },
      ];
    } else {
      data = [
        {
          x: earningsArray,
          y: reformMtrArray,
          type: "line",
          name: "Reform MTR",
          line: {
            color: style.colors.BLUE,
            shape: "hv",
          },
        },
        {
          x: earningsArray,
          y: baselineMtrArray,
          type: "line",
          name: "Baseline MTR",
          line: {
            color: style.colors.MEDIUM_DARK_GRAY,
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
            shape: "hv",
          },
        },
      ];
    }

    plot = (
      <FadeIn>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span style={{ marginRight: 10 }}>Show baseline and reform</span>
          <Switch
            checked={showDelta}
            onChange={(checked) => setShowDelta(checked)}
          />
          <span style={{ marginLeft: 10 }}>
            Show difference between baseline and reform
          </span>
        </div>
        <Plot
          data={data}
          layout={{
            xaxis: {
              title: "Employment income",
              ...getPlotlyAxisFormat(
                metadata.variables.employment_income.unit,
                0
              ),
              tickformat: ",.0f",
            },
            yaxis: {
              title: "Marginal tax rate",
              ...getPlotlyAxisFormat(
                metadata.variables.marginal_tax_rate.unit,
                0
              ),
              tickformat: (showDelta ? "+" : "") + ".0%",
            },
            legend: {
              // Position above the plot
              y: 1.1,
              orientation: "h",
            },
            ...ChartLogo,
          }}
          config={{
            displayModeBar: false,
            responsive: true,
          }}
          style={{
            width: "100%",
          }}
        />
      </FadeIn>
    );
  }

  return (
    <ResultsPanel
      title={title}
      description="This chart shows how your net income changes under different earnings. It is based on your household's current situation."
    >
      {loading ? (
        <div style={{ height: 300 }}>
          <LoadingCentered />
        </div>
      ) : (
        <div style={{ minHeight: 400 }}>{plot}</div>
      )}
    </ResultsPanel>
  );
}
