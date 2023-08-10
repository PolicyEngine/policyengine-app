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
import { Radio } from "antd";
import LoadingCentered from "../../../layout/LoadingCentered";
import { ChartLogo } from "../../../api/charts";
import { plotLayoutFont } from "pages/policy/output/utils";
import useMobile from "layout/Responsive";
import Screenshottable from "layout/Screenshottable";

export default function MarginalTaxRates(props) {
  const {
    householdInput,
    householdBaseline,
    householdReform,
    metadata,
    policyLabel,
    policy,
  } = props;
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
  const mobile = useMobile();
  let title;

  const currentEarnings = getValueFromHousehold(
    "employment_income",
    "2023",
    "you",
    householdInput,
    metadata,
  );
  const currentMtr = getValueFromHousehold(
    "marginal_tax_rate",
    "2023",
    "you",
    householdBaseline,
    metadata,
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
          max: Math.max(
            metadata.countryId === "ng" ? 1_200_000 : 200_000,
            2 * currentEarnings,
          ),
          count: 401,
        },
      ],
    ];
    let requests = [];
    requests.push(
      apiCall(`/${metadata.countryId}/calculate`, {
        household: householdData,
        policy: policy.baseline.data,
      })
        .then((res) => res.json())
        .then((data) => {
          setBaselineMtr(data.result);
        })
        .catch((err) => {
          setError(err);
        }),
    );
    if (reformPolicyId) {
      requests.push(
        apiCall(`/${metadata.countryId}/calculate`, {
          household: householdData,
          policy: policy.reform.data,
        })
          .then((res) => res.json())
          .then((data) => {
            setReformMtr(data.result);
          })
          .catch((err) => {
            setError(err);
          }),
      );
    }
    Promise.all(requests).then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reformPolicyId, baselinePolicyId, householdId]);

  if (error) {
    return <ErrorPane />;
  }

  let plot;

  if (baselineMtr && !reformMtr) {
    const earningsArray = getValueFromHousehold(
      "employment_income",
      "2023",
      "you",
      baselineMtr,
      metadata,
    );
    const mtrArray = getValueFromHousehold(
      "marginal_tax_rate",
      "2023",
      "you",
      baselineMtr,
      metadata,
    );
    title = `Your current marginal tax rate is ${formatVariableValue(
      { unit: "/1" },
      currentMtr,
      1,
    )}`;
    // Add the main line, then add a 'you are here' line
    plot = (
      <FadeIn>
        <Screenshottable title="Marginal tax rate by employment income">
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
                x: [currentEarnings],
                y: [currentMtr],
                type: "scatter",
                name: "Your current MTR",
                mode: "markers",
                line: {
                  color: style.colors.BLUE,
                },
              },
            ]}
            layout={{
              xaxis: {
                title: "Household head employment income",
                ...getPlotlyAxisFormat(
                  metadata.variables.employment_income.unit,
                ),
                tickformat: ",.0f",
              },
              margin: {
                t: 0,
              },
              yaxis: {
                title: "Marginal tax rate",
                ...getPlotlyAxisFormat(
                  metadata.variables.marginal_tax_rate.unit,
                ),
                tickformat: ".1%",
              },
              legend: {
                // Position above the plot
                y: 1.1,
                orientation: "h",
              },
              ...ChartLogo(mobile ? 0.97 : 1.05, mobile ? -0.25 : -0.2),
              ...plotLayoutFont,
            }}
            config={{
              displayModeBar: false,
              responsive: true,
            }}
            style={{
              width: "100%",
            }}
          />
        </Screenshottable>
      </FadeIn>
    );
  } else if (baselineMtr && reformMtr) {
    const earningsArray = getValueFromHousehold(
      "employment_income",
      "2023",
      "you",
      baselineMtr,
      metadata,
    );
    const baselineMtrArray = getValueFromHousehold(
      "marginal_tax_rate",
      "2023",
      "you",
      baselineMtr,
      metadata,
    );
    const reformMtrArray = getValueFromHousehold(
      "marginal_tax_rate",
      "2023",
      "you",
      reformMtr,
      metadata,
    );

    const reformMtrValue = getValueFromHousehold(
      "marginal_tax_rate",
      "2023",
      "you",
      householdReform,
      metadata,
    );

    if (Math.abs(currentMtr - reformMtrValue) > 0.001) {
      title = `${policyLabel} ${
        reformMtrValue > currentMtr ? "increases" : "decreases"
      } your marginal tax rate from ${formatVariableValue(
        { unit: "/1" },
        currentMtr,
        0,
      )} to ${formatVariableValue({ unit: "/1" }, reformMtrValue, 0)}`;
    } else {
      title = `${policyLabel} doesn't change your marginal tax rate`;
    }
    // Add the main line, then add a 'you are here' points
    let data;
    if (showDelta) {
      data = [
        {
          x: earningsArray,
          y: reformMtrArray.map(
            (value, index) => value - baselineMtrArray[index],
          ),
          type: "line",
          name: "MTR difference",
          line: {
            color: style.colors.BLUE,
            shape: "hv",
          },
        },
        {
          x: [currentEarnings],
          y: [reformMtrValue - currentMtr],
          type: "scatter",
          name: "Your current MTR difference",
          mode: "markers",
          line: {
            color: style.colors.BLUE,
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
          x: [currentEarnings],
          y: [currentMtr],
          type: "scatter",
          name: "Your current MTR",
          mode: "markers",
          line: {
            color: style.colors.GRAY,
          },
        },
        {
          x: [currentEarnings],
          y: [reformMtrValue],
          type: "scatter",
          name: "Your reform MTR",
          mode: "markers",
          line: {
            color: style.colors.BLUE,
          },
        },
      ];
    }
    const options = [
      {
        label: "Baseline and reform",
        value: false,
      },
      {
        label: "Difference",
        value: true,
      },
    ];
    const onDelta = ({ target: { value } }) => {
      console.log("checked", value);
      setShowDelta(value);
    };
    plot = (
      <FadeIn>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Radio.Group
            options={options}
            onChange={onDelta}
            value={showDelta}
            buttonStyle="solid"
          />
        </div>
        <Screenshottable
          title={
            showDelta
              ? "Change to marginal tax rate by employment income"
              : "Marginal tax rate by employment income"
          }
        >
          <Plot
            data={data}
            layout={{
              xaxis: {
                title: "Household head employment income",
                ...getPlotlyAxisFormat(
                  metadata.variables.employment_income.unit,
                  0,
                ),
                tickformat: ",.0f",
              },
              yaxis: {
                title: (showDelta ? "Change in m" : "M") + "arginal tax rate",
                ...getPlotlyAxisFormat(
                  metadata.variables.marginal_tax_rate.unit,
                  0,
                ),
                tickformat: (showDelta ? "+" : "") + ".0%",
              },
              legend: {
                // Position above the plot
                y: 1.1,
                orientation: "h",
              },
              margin: {
                t: 0,
              },
              ...ChartLogo(mobile ? 0.97 : 1.05, mobile ? -0.25 : -0.2),
              ...plotLayoutFont,
            }}
            config={{
              displayModeBar: false,
              responsive: true,
            }}
            style={{
              width: "100%",
            }}
          />
        </Screenshottable>
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

function ErrorPane() {
  return (
    <ErrorPage message="We ran into an issue when trying to simulate your household's net income under different earnings. Please try again later." />
  );
}
