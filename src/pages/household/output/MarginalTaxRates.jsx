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
  const [showDelta, setShowDelta] = useState(true);
  const mobile = useMobile();

  let title;

  const currentEarnings = getValueFromHousehold(
    "employment_income",
    "2024",
    "you",
    householdInput,
    metadata,
  );
  const currentMtr = getValueFromHousehold(
    "marginal_tax_rate",
    "2024",
    "you",
    householdBaseline,
    metadata,
  );

  useEffect(() => {
    let householdData = JSON.parse(JSON.stringify(householdInput));
    householdData.people.you.employment_income["2024"] = null;
    householdData.axes = [
      [
        {
          name: "employment_income",
          period: "2024",
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
      apiCall(`/${metadata.countryId}/calculate-full`, {
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
        apiCall(`/${metadata.countryId}/calculate-full`, {
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

  // We don't want to show "large" values in this chart. See
  // https://github.com/PolicyEngine/policyengine-app/issues/66.
  const lb = -2;
  const ub = 2;

  const range = (array) => [Math.min(...array), Math.max(...array)];

  // values in array may get clipped
  // values in mustArray must be displayed
  const paddedRange = (array, mustArray) => {
    const rangeArray = range(array.concat(0));
    const rangeMustArray = range(mustArray);
    const padding = [0.1, 0.1];
    if (rangeArray[0] < lb) {
      rangeArray[0] = lb;
      padding[0] = 0;
    }
    if (rangeMustArray[0] < rangeArray[0]) {
      rangeArray[0] = rangeMustArray[0];
      padding[0] = 0.1;
    }
    if (rangeArray[1] > ub) {
      rangeArray[1] = ub;
      padding[1] = 0;
    }
    if (rangeMustArray[1] > rangeArray[1]) {
      rangeArray[1] = rangeMustArray[1];
      padding[1] = 0.1;
    }
    const d = rangeArray[1] - rangeArray[0];
    rangeArray[0] -= padding[0] * d;
    rangeArray[1] += padding[1] * d;
    return rangeArray;
  };

  if (baselineMtr && !reformMtr) {
    const earningsArray = getValueFromHousehold(
      "employment_income",
      "2024",
      "you",
      baselineMtr,
      metadata,
    );
    const mtrArray = getValueFromHousehold(
      "marginal_tax_rate",
      "2024",
      "you",
      baselineMtr,
      metadata,
    );
    const xaxisFormat = getPlotlyAxisFormat(
      metadata.variables.employment_income.unit,
      earningsArray.concat(currentEarnings),
    );
    const yaxisFormat = getPlotlyAxisFormat(
      metadata.variables.marginal_tax_rate.unit,
    );
    yaxisFormat.range = paddedRange(mtrArray, [currentMtr]);
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
                hovertemplate:
                  `<b>Marginal tax rate</b><br><br>` +
                  `If you earn %{x}, your<br>` +
                  `marginal tax rate will be %{y}.` +
                  `<extra></extra>`,
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
                hovertemplate:
                  `<b>Your current MTR</b><br><br>` +
                  `If you earn %{x}, your<br>` +
                  `marginal tax rate will be %{y}.` +
                  `<extra></extra>`,
              },
            ]}
            layout={{
              xaxis: {
                title: "Household head employment income",
                ...xaxisFormat,
              },
              margin: {
                t: 0,
              },
              yaxis: {
                title: "Marginal tax rate",
                ...yaxisFormat,
              },
              hoverlabel: {
                align: "left",
                bgcolor: "#FFF",
                font: { size: "16" },
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
      "2024",
      "you",
      baselineMtr,
      metadata,
    );
    const baselineMtrArray = getValueFromHousehold(
      "marginal_tax_rate",
      "2024",
      "you",
      baselineMtr,
      metadata,
    );
    const reformMtrArray = getValueFromHousehold(
      "marginal_tax_rate",
      "2024",
      "you",
      reformMtr,
      metadata,
    );
    const reformMtrValue = getValueFromHousehold(
      "marginal_tax_rate",
      "2024",
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
    let data, xaxisFormat, yaxisFormat;
    if (showDelta) {
      const deltaArray = reformMtrArray.map(
        (value, index) => value - baselineMtrArray[index],
      );
      const currentDelta = reformMtrValue - currentMtr;
      xaxisFormat = getPlotlyAxisFormat(
        metadata.variables.employment_income.unit,
        earningsArray.concat(currentEarnings),
      );
      yaxisFormat = getPlotlyAxisFormat(
        metadata.variables.marginal_tax_rate.unit,
      );
      yaxisFormat.range = paddedRange(deltaArray, [currentDelta]);
      // note that we do not filter reformMtrValue - currentMtr
      data = [
        {
          x: earningsArray,
          y: deltaArray,
          type: "line",
          name: "MTR difference",
          line: {
            color: style.colors.BLUE,
            shape: "hv",
          },
          hovertemplate:
            `<b>MTR difference</b><br><br>` +
            `If you earn %{x}, your marginal<br>` +
            `tax rate difference will be %{y}.` +
            `<extra></extra>`,
        },
        {
          x: [currentEarnings],
          y: [currentDelta],
          type: "scatter",
          name: "Your current MTR difference",
          mode: "markers",
          line: {
            color: style.colors.BLUE,
          },
          hovertemplate:
            `<b>Your current MTR difference</b><br><br>` +
            `If you earn %{x}, your marginal<br>` +
            `tax rate difference will be %{y}.` +
            `<extra></extra>`,
        },
      ];
    } else {
      xaxisFormat = getPlotlyAxisFormat(
        metadata.variables.employment_income.unit,
        earningsArray.concat(currentEarnings),
      );
      yaxisFormat = getPlotlyAxisFormat(
        metadata.variables.marginal_tax_rate.unit,
      );
      yaxisFormat.range = paddedRange(reformMtrArray.concat(baselineMtrArray), [
        currentMtr,
        reformMtrValue,
      ]);
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
          hovertemplate:
            `<b>Reform MTR</b><br><br>` +
            `If you earn %{x}, your reform<br>` +
            `marginal tax rate will be %{y}.` +
            `<extra></extra>`,
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
          hovertemplate:
            `<b>Baseline MTR</b><br><br>` +
            `If you earn %{x}, your baseline<br>` +
            `marginal tax rate will be %{y}.` +
            `<extra></extra>`,
        },
        {
          x: [currentEarnings],
          y: [currentMtr],
          type: "scatter",
          name: "Your baseline MTR",
          mode: "markers",
          line: {
            color: style.colors.GRAY,
          },
          hovertemplate:
            `<b>Your baseline MTR</b><br><br>` +
            `If you earn %{x}, your baseline<br>` +
            `marginal tax rate will be %{y}.` +
            `<extra></extra>`,
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
          hovertemplate:
            `<b>Your reform MTR</b><br><br>` +
            `If you earn %{x}, your reform<br>` +
            `marginal tax rate will be %{y}.` +
            `<extra></extra>`,
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
                ...xaxisFormat,
              },
              yaxis: {
                title: (showDelta ? "Change in m" : "M") + "arginal tax rate",
                ...yaxisFormat,
              },
              hoverlabel: {
                align: "left",
                bgcolor: "#FFF",
                font: { size: "16" },
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
      description="This chart shows how your marginal tax rate changes under different earnings. It is based on your household's current situation."
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
