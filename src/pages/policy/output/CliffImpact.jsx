import { useContext, useEffect, useState, useRef } from "react";
import Plot from "react-plotly.js";
import { useSearchParams } from "react-router-dom";
import { asyncApiCall, copySearchParams } from "../../../api/call";
import { ChartLogo } from "../../../api/charts";
import { aggregateCurrency, percent } from "../../../api/language";
import ErrorPage from "../../../layout/Error";
import HoverCard, { HoverCardContext } from "../../../layout/HoverCard";
import LoadingCentered from "../../../layout/LoadingCentered";
import useMobile from "../../../layout/Responsive";
import ResultsPanel from "../../../layout/ResultsPanel";
import DownloadableScreenshottable from "./DownloadableScreenshottable";
import style from "../../../style";
import DownloadCsvButton from "./DownloadCsvButton";
import { plotLayoutFont } from "pages/policy/output/utils";

export default function CliffImpact(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get("region");
  const timePeriod = searchParams.get("timePeriod");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId = searchParams.get("baseline");
  const [impact, setImpact] = useState(null);
  const [error, setError] = useState(null);
  const { metadata, policyLabel, preparingForScreenshot } = props;
  const mobile = useMobile();
  const screenshotRef = useRef();
  useEffect(() => {
    if (!!region && !!timePeriod && !!reformPolicyId && !!baselinePolicyId) {
      const url = `/${metadata.countryId}/economy/${reformPolicyId}/over/${baselinePolicyId}?region=${region}&time_period=${timePeriod}&target=cliff`;
      setImpact(null);
      setError(null);
      asyncApiCall(url, null, 5_000)
        .then((data) => {
          if (data.status === "error") {
            setError(data.message);
          } else {
            setImpact(data.result);
          }
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      const defaults = {
        region: metadata.economy_options.region[0].name,
        timePeriod: metadata.economy_options.time_period[0].name,
        baseline: metadata.current_law_id,
      };
      let newSearch = copySearchParams(searchParams);
      // Set missing query parameters to their defaults.
      newSearch.set("region", searchParams.get("region") || defaults.region);
      newSearch.set(
        "timePeriod",
        searchParams.get("timePeriod") || defaults.timePeriod,
      );
      newSearch.set(
        "baseline",
        searchParams.get("baseline") || defaults.baseline,
      );
      setSearchParams(newSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, timePeriod, reformPolicyId, baselinePolicyId]);

  if (error) {
    return (
      <ErrorPage
        message={`We ran into an issue when trying to simulate your policy. Please try again later. The full message is ${JSON.stringify(
          error,
        )}`}
      />
    );
  }

  if (!reformPolicyId) {
    return <ErrorPage message="No policy selected." />;
  }

  if (!impact) {
    return <LoadingCentered message="Computing the cliff impact..." />;
  }

  // The chart shows two bars: one for the relative change in the cliff share and one for the relative change in the cliff gap.

  const cliff_share_change =
    Math.round(
      (impact.reform.cliff_share / impact.baseline.cliff_share - 1) * 100,
    ) / 100;
  const cliff_gap_change =
    Math.round(
      (impact.reform.cliff_gap / impact.baseline.cliff_gap - 1) * 1000,
    ) / 1000;

  function CliffImpactPlot(props) {
    const setHoverCard = useContext(HoverCardContext);
    const { useHoverCard = false } = props;
    const metrics = ["Cliff rate", "Cliff gap"];
    return (
      <Plot
        data={[
          {
            x: metrics,
            y: [cliff_share_change, cliff_gap_change],
            type: "bar",
            marker: {
              color: [
                cliff_share_change > 0
                  ? style.colors.DARK_GRAY
                  : style.colors.BLUE,
                cliff_gap_change > 0
                  ? style.colors.DARK_GRAY
                  : style.colors.BLUE,
              ],
            },
            text: [
              `${cliff_share_change >= 0 ? "+" : ""}${(
                cliff_share_change * 100
              ).toFixed(1)}%`,
              `${cliff_gap_change >= 0 ? "+" : ""}${(
                cliff_gap_change * 100
              ).toFixed(1)}%`,
            ],
            textposition: "auto",
            textangle: 0,
            ...(useHoverCard
              ? {
                  hoverinfo: "none",
                }
              : {
                  customdata: metrics.map((metric) => {
                    const baseline =
                      metric === "Cliff rate"
                        ? impact.baseline.cliff_share
                        : impact.baseline.cliff_gap;
                    const reform =
                      metric === "Cliff rate"
                        ? impact.reform.cliff_share
                        : impact.reform.cliff_gap;
                    const change = reform / baseline - 1;
                    const formatter =
                      metric === "Cliff rate"
                        ? percent
                        : (x) => aggregateCurrency(x, metadata);
                    return `The ${metric.toLowerCase()} ${
                      change > 0.0001
                        ? `would rise ${percent(change)}<br>from ${formatter(
                            baseline,
                          )} to ${formatter(reform)}`
                        : change < -0.0001
                        ? `would fall ${percent(-change)}<br>from ${formatter(
                            baseline,
                          )} to ${formatter(reform)}`
                        : `would remain at ${percent(baseline)}`
                    }.`;
                  }),
                  hovertemplate: `<b>%{x}</b><br><br>%{customdata}<extra></extra>`,
                }),
          },
        ]}
        layout={{
          yaxis: {
            title: "Relative change",
            tickformat: "+,.0%",
          },
          ...(useHoverCard
            ? {}
            : {
                hoverlabel: {
                  align: "left",
                  bgcolor: "#FFF",
                  font: { size: "16" },
                },
              }),
          uniformtext: {
            mode: "hide",
            minsize: 8,
          },
          ...ChartLogo(mobile ? 0.97 : 0.97, mobile ? -0.25 : -0.15),
          margin: {
            t: 0,
            b: 80,
          },
          height: mobile ? 300 : 450,
          ...plotLayoutFont,
        }}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
        style={{
          width: "100%",
        }}
        {...(useHoverCard
          ? {
              onHover: (data) => {
                const metric = data.points[0].x;
                const baseline =
                  metric === "Cliff rate"
                    ? impact.baseline.cliff_share
                    : impact.baseline.cliff_gap;
                const reform =
                  metric === "Cliff rate"
                    ? impact.reform.cliff_share
                    : impact.reform.cliff_gap;
                const change = reform / baseline - 1;
                const formatter =
                  metric === "Cliff rate"
                    ? percent
                    : (x) => aggregateCurrency(x, metadata);
                const message = `The ${metric.toLowerCase()} ${
                  change > 0.0001
                    ? `would rise ${percent(change)} from ${formatter(
                        baseline,
                      )} to ${formatter(reform)}`
                    : change < -0.0001
                    ? `would fall ${percent(-change)} from ${formatter(
                        baseline,
                      )} to ${formatter(reform)}`
                    : `would remain at ${percent(baseline)}`
                }.`;
                setHoverCard({
                  title: data.points[0].x,
                  body: message,
                });
              },
              onUnhover: () => {
                setHoverCard(null);
              },
            }
          : {})}
      />
    );
  }

  const options = metadata.economy_options.region.map((region) => {
    return { value: region.name, label: region.label };
  });
  const label =
    region === "us" || region === "uk"
      ? ""
      : " in " + options.find((option) => option.value === region)?.label;

  const title = `${policyLabel} ${
    cliff_share_change === 0 && cliff_gap_change === 0
      ? "wouldn't affect cliffs"
      : cliff_share_change >= 0 && cliff_gap_change >= 0
      ? "would make cliffs more prevalent"
      : cliff_share_change <= 0 && cliff_gap_change <= 0
      ? "would make cliffs less prevalent"
      : "would have an ambiguous effect on cliffs"
  } ${label}`;

  const csvHeader = ["Metric", "Baseline", "Reform", "Change"];
  const data = [
    csvHeader,
    ...[
      {
        Metric: "Cliff rate",
        Baseline: impact.baseline.cliff_share,
        Reform: impact.reform.cliff_share,
        Change: cliff_share_change,
      },
      {
        Metric: "Cliff gap",
        Baseline: impact.baseline.cliff_gap,
        Reform: impact.reform.cliff_gap,
        Change: cliff_gap_change,
      },
    ].map((row) => [row.Metric, row.Baseline, row.Reform, row.Change]),
  ];

  const downloadButtonStyle = {
    position: "absolute",
    bottom: "-1px",
    left: "80px",
  };

  return (
    <ResultsPanel>
      <DownloadableScreenshottable ref={screenshotRef}>
        <h2>{title}</h2>
        <HoverCard>
          <CliffImpactPlot />
        </HoverCard>
      </DownloadableScreenshottable>
      <div className="chart-container">
        {!mobile && (
          <DownloadCsvButton
            preparingForScreenshot={preparingForScreenshot}
            content={data}
            filename={`cliffImpact${policyLabel.csv}`}
            style={downloadButtonStyle}
          />
        )}
      </div>
      <p style={{ marginTop: "10px" }}>
        The cliff rate is the share of households whose net income falls if each
        adult earned an additional {metadata.currency}2,000. The cliff gap is
        the sum of the losses incurred by all households on a cliff if their
        income rose in this way.
      </p>
    </ResultsPanel>
  );
}
