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
  // We don't want to show "large" values in this chart. See
  // https://github.com/PolicyEngine/policyengine-app/issues/66.
  const showValueOnYAxis = (value) => value >= -2 && value <= 2;
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
    const x1 = earningsArray;
    const y1 = mtrArray;
    const x2 = [currentEarnings];
    const y2 = [currentMtr];
    const xaxisValues = x1.concat(x2);
    const yaxisValues = y1.filter(showValueOnYAxis).concat(y2);
    // note that we do not filter currentMtr
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
                x: x1,
                y: y1,
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
                x: x2,
                y: y2,
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
                ...getPlotlyAxisFormat(
                  metadata.variables.employment_income.unit,
                  xaxisValues,
                ),
              },
              margin: {
                t: 0,
              },
              yaxis: {
                title: "Marginal tax rate",
                ...getPlotlyAxisFormat(
                  metadata.variables.marginal_tax_rate.unit,
                  yaxisValues,
                ),
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
    let data, xaxisValues, yaxisValues;
    if (showDelta) {
      const x1 = earningsArray;
      const y1 = reformMtrArray.map(
        (value, index) => value - baselineMtrArray[index],
      );
      const x2 = [currentEarnings];
      const y2 = [reformMtrValue - currentMtr];
      xaxisValues = x1.concat(x2);
      yaxisValues = y1.filter(showValueOnYAxis).concat(y2);
      // note that we do not filter reformMtrValue - currentMtr
      data = [
        {
          x: x1,
          y: y1,
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
          x: x2,
          y: y2,
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
      const x1 = earningsArray;
      const y1 = reformMtrArray;
      const y2 = baselineMtrArray;
      const x2 = [currentEarnings];
      const y3 = [currentMtr];
      const y4 = [reformMtrValue];
      xaxisValues = x1.concat(x2);
      yaxisValues = y1.concat(y2, y3, y4);
      data = [
        {
          x: x1,
          y: y1,
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
          x: x1,
          y: y2,
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
          x: x2,
          y: y3,
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
          x: x2,
          y: y4,
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
                ...getPlotlyAxisFormat(
                  metadata.variables.employment_income.unit,
                  xaxisValues,
                ),
              },
              yaxis: {
                title: (showDelta ? "Change in m" : "M") + "arginal tax rate",
                ...getPlotlyAxisFormat(
                  metadata.variables.marginal_tax_rate.unit,
                  yaxisValues,
                ),
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
