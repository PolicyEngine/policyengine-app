import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { apiCall } from "../../../api/call";
import {
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
import SearchOptions from "../../../controls/SearchOptions";
import { capitalize } from "../../../api/language";

export default function EarningsVariation(props) {
  const { household, metadata } = props;
  const [baselineNetIncome, setBaselineNetIncome] = useState(null);
  const [searchParams] = useSearchParams();
  const householdId = searchParams.get("household");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId =
    searchParams.get("baseline") || metadata.current_law_id;
  const [reformNetIncome, setReformNetIncome] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelta, setShowDelta] = useState(false);
  const [variable, setVariable] = useState("household_net_income");
  const variableLabel = metadata.variables[variable].label || variable;

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
    setLoading(true);
    let requests = [];
    requests.push(
      apiCall(`/${metadata.countryId}/calculate`, {
        household: householdData,
        policy_id: baselinePolicyId,
      })
        .then((res) => res.json())
        .then((data) => {
          setBaselineNetIncome(data.result);
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
            setReformNetIncome(data.result);
          })
          .catch((err) => {
            setError(err);
          })
      );
    }
    Promise.all(requests).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reformPolicyId, baselinePolicyId, householdId]);

  if (error) {
    return (
      <ErrorPage message="We ran into an issue when trying to simulate your household's net income under different earnings. Please try again later." />
    );
  }

  let yAxisSelector = <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    }}>
      <SearchOptions
        defaultValue={variable}
        options={Object.values(metadata.variables).map((variable) => ({
          value: variable.name,
          label: capitalize(variable.label),
          }))}
        onSelect={(value) => setVariable(value)}
        style={{
          width: 400,
        }}
        />
    </div>

  let plot;

  try {

  if (baselineNetIncome && !reformNetIncome) {
    const earningsArray = getValueFromHousehold(
      "employment_income",
      "2022",
      "you",
      baselineNetIncome,
      metadata
    );
    const netIncomeArray = getValueFromHousehold(
      variable,
      "2022",
      null,
      baselineNetIncome,
      metadata
    );
    const currentEarnings = getValueFromHousehold(
      "employment_income",
      "2022",
      "you",
      household.input,
      metadata
    );
    const currentNetIncome = getValueFromHousehold(
      variable,
      "2022",
      null,
      household.baseline,
      metadata
    );
    // Check if netIncomeArray is a scalar (like 0) or a string
    if ((typeof netIncomeArray === "string") || (netIncomeArray === 0)) {
      throw new Error("No net income");
    }
    // Add the main line, then add a 'you are here' line
    plot = (
      <FadeIn key="baseline">
        <Plot
          key="baseline"
          data={[
            {
              x: earningsArray,
              y: netIncomeArray,
              type: "line",
              name: capitalize(variableLabel),
            },
            {
              x: [currentEarnings, currentEarnings],
              y: [0, currentNetIncome],
              type: "line",
              name: `Your current ${variableLabel}`,
              line: {
                color: style.colors.MEDIUM_DARK_GRAY,
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
              title: {
                text: capitalize(variableLabel),
              },
              ...getPlotlyAxisFormat(
                metadata.variables[variable].unit
              ),
              tickformat: ",.0f",
            },
            legend: {
              // Position above the plot
              y: 1.2,
              orientation: "h",
            },
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
  } else if (baselineNetIncome && reformNetIncome) {
    const earningsArray = getValueFromHousehold(
      "employment_income",
      "2022",
      "you",
      baselineNetIncome,
      metadata
    );
    const baselineNetIncomeArray = getValueFromHousehold(
      variable,
      "2022",
      null,
      baselineNetIncome,
      metadata
    );
    const reformNetIncomeArray = getValueFromHousehold(
      variable,
      "2022",
      null,
      reformNetIncome,
      metadata
    );
    const currentEarnings = getValueFromHousehold(
      "employment_income",
      "2022",
      "you",
      household.input,
      metadata
    );
    const currentNetIncome = getValueFromHousehold(
      variable,
      "2022",
      null,
      household.reform,
      metadata
    );
    const baselineNetIncomeValue = getValueFromHousehold(
      variable,
      "2022",
      null,
      household.baseline,
      metadata
    );
    // Check if netIncomeArray is a scalar (like 0) or a string
    if ((typeof reformNetIncomeArray === "string") || (reformNetIncomeArray === 0)) {
      throw new Error("No net income");
    }
    // Add the main line, then add a 'you are here' line
    let plotObject;
    if (showDelta) {
      let data = [
        {
          x: earningsArray,
          y: reformNetIncomeArray.map(
            (value, index) => value - baselineNetIncomeArray[index]
          ),
          type: "line",
          name: `Change in ${variableLabel}`,
          line: {
            color: style.colors.BLUE,
          },
        },
        {
          x: [currentEarnings, currentEarnings],
          y: [0, currentNetIncome - baselineNetIncomeValue],
          type: "line",
          name: `Your current change in ${variableLabel}`,
          line: {
            color: style.colors.MEDIUM_DARK_GRAY,
          },
        },
      ];
      plotObject = <Plot
          data={data}
          key="reform"
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
              title: `Change in ${variableLabel}`,
              ...getPlotlyAxisFormat(
                metadata.variables.household_net_income.unit,
                0
              ),
              tickformat: ",.0f",
            },
            legend: {
              // Position above the plot
              y: 1.2,
              orientation: "h",
            },
          }}
          config={{
            displayModeBar: false,
            responsive: true,
          }}
          style={{
            width: "100%",
          }}
        />
    } else {
      let data = [
        {
          x: earningsArray,
          y: baselineNetIncomeArray,
          type: "line",
          name: `Baseline ${variableLabel}`,
          line: {
            color: style.colors.MEDIUM_DARK_GRAY,
          },
        },
        {
          x: earningsArray,
          y: reformNetIncomeArray,
          type: "line",
          name: `Reform ${variableLabel}`,
          line: {
            color: style.colors.BLUE,
          },
        },
        {
          x: [currentEarnings, currentEarnings],
          y: [0, currentNetIncome],
          type: "line",
          name: `Your current ${variableLabel}`,
          line: {
            color: style.colors.MEDIUM_DARK_GRAY,
          },
        },
      ];
      plotObject = <Plot
        data={data}
        key="reform"
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
            title: capitalize(variableLabel),
            ...getPlotlyAxisFormat(
              metadata.variables.household_net_income.unit,
              0
            ),
            tickformat: ",.0f",
          },
          legend: {
            // Position above the plot
            y: 1.2,
            orientation: "h",
          },
        }}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
        style={{
          width: "100%",
        }}
      />
    }

    plot = (
      <FadeIn key="reform">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span style={{ marginRight: 10 }}>Show baseline and reform</span>
          <Switch
            checked={showDelta}
            onChange={(checked) => setShowDelta(checked)}
          />
          <span style={{ marginLeft: 10 }}>
            Show difference
          </span>
        </div>
        {plotObject}
      </FadeIn>
    );
  }

  } catch (e) {
    plot = <ErrorPage
      message={`We couldn't plot the variable ${variableLabel}.`}
      />
  }

  return (
    <ResultsPanel
      title="How your net income changes with your earnings"
      description="This chart shows how your net income changes under different earnings. It is based on your household's current situation."
    >
      {loading ? (
        <div style={{ height: 300 }}>
          <LoadingCentered />
        </div>
      ) : (
        <>
          {yAxisSelector}
          {plot}
        </>
      )}
    </ResultsPanel>
  );
}
