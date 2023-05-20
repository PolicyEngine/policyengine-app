import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { apiCall } from "../../../api/call";
import {
  // formatVariableValue,
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

export default function MarginalTaxRates(props) {
  const { householdInput, householdBaseline, metadata, policyLabel, policy } = props;
  const [baselineMtr, setBaselineMtr] = useState([]);
  const [searchParams] = useSearchParams();
  const householdId = searchParams.get("household");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId = searchParams.get("baseline") || metadata.current_law_id;
  const [reformMtr, setReformMtr] = useState([]);
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
  // eslint-disable-next-line no-unused-vars
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
          max: Math.max(
            metadata.countryId === "ng" ? 1_200_000 : 200_000,
            2 * currentEarnings
          ),
          count: 401,
        },
      ],
    ];
    let requests = [];
    requests.push(
      apiCall(`/${metadata.countryId}/calculate`, {
        household: householdData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Baseline MTR data:", data.result);
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
          policy: policy.reform.data,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Reform MTR data:", data.result);
            setReformMtr(data.result);
          })
          .catch((err) => {
            setError(err);
          })
      );
    }
    Promise.all(requests)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reformPolicyId, baselinePolicyId, householdId, householdInput, householdBaseline, metadata, policyLabel, policy]);

  if (error) {
    return <ErrorPane message="We ran into an issue when trying to simulate your household's net income under different earnings. Please try again later." />;
  }

  if (loading) {
    return <LoadingCentered />;
  }

  const data = [
    {
      x: baselineMtr.x,
      y: baselineMtr.y,
      type: "scatter",
      mode: "lines",
      name: "Baseline",
      line: {
        color: style.lightGrey,
        width: 2,
      },
    },
    {
      x: reformMtr.x,
      y: reformMtr.y,
      type: "scatter",
      mode: "lines",
      name: policyLabel,
      line: {
        color: style.pink,
        width: 2,
      },
    },
  ];

  const layout = {
    autosize: true,
    hovermode: "closest",
    showlegend: true,
    legend: {
      orientation: "h",
      x: 0.5,
      y: -0.15,
      xanchor: "center",
    },
    margin: {
      l: 40,
      r: 10,
      t: 0,
      b: 20,
    },
    yaxis: {
      title: "Marginal Tax Rate",
      tickformat: getPlotlyAxisFormat("marginal_tax_rate"),
    },
    xaxis: {
      title: "Earnings",
      tickformat: getPlotlyAxisFormat("employment_income"),
    },
    plot_bgcolor: style.backgroundGrey,
    paper_bgcolor: style.backgroundGrey,
  };

  if (showDelta) {
    const delta = {
      x: baselineMtr.x,
      y: baselineMtr.y.map((baselineRate, index) => {
        const reformRate = reformMtr.y[index];
        return reformRate - baselineRate;
      }),
      type: "scatter",
      mode: "lines",
      name: "Delta",
      line: {
        color: style.yellow,
        width: 2,
      },
    };
    data.push(delta);
  }

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  return (
    <ResultsPanel title="Marginal Tax Rates" {...props}>
      <FadeIn>
        <div className="chart">
          <div className="chart-header">
            <div className="chart-title">{title}</div>
            <div className="chart-controls">
              <Radio.Group value={showDelta} onChange={(e) => setShowDelta(e.target.value)}>
                <Radio style={radioStyle} value={false}>
                  Show Rates
                </Radio>
                <Radio style={radioStyle} value={true}>
                  Show Delta
                </Radio>
              </Radio.Group>
            </div>
          </div>
          <div className="chart-content">
            <Plot data={data} layout={layout} config={ChartLogo} />
          </div>
        </div>
      </FadeIn>
    </ResultsPanel>
  );
}

function ErrorPane({ message }) {
  return <ErrorPage message={message} />;
}
