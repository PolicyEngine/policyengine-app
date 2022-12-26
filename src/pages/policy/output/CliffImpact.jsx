import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useSearchParams } from "react-router-dom";
import { asyncApiCall, copySearchParams } from "../../../api/call";
import { ChartLogo } from "../../../api/charts";
import { aggregateCurrency, percent } from "../../../api/language";
import ErrorPage from "../../../layout/Error";
import HoverCard from "../../../layout/HoverCard";
import LoadingCentered from "../../../layout/LoadingCentered";
import ResultsPanel from "../../../layout/ResultsPanel";
import style from "../../../style";

export default function CliffImpact(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get("region");
  const timePeriod = searchParams.get("timePeriod");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId = searchParams.get("baseline");
  const [impact, setImpact] = useState(null);
  const [error, setError] = useState(null);
  const { metadata, policyLabel } = props;
  const [hovercard, setHovercard] = useState(null);
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
        searchParams.get("timePeriod") || defaults.timePeriod
      );
      newSearch.set(
        "baseline",
        searchParams.get("baseline") || defaults.baseline
      );
      setSearchParams(newSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, timePeriod, reformPolicyId, baselinePolicyId]);

  if (error) {
    return (
      <ErrorPage
        message={`We ran into an issue when trying to simulate your policy. Please try again later. The full message is ${JSON.stringify(
          error
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
    impact.reform.cliff_share / impact.baseline.cliff_share - 1;
  const cliff_gap_change =
    impact.reform.cliff_gap / impact.baseline.cliff_gap - 1;

  const chart = (
    <Plot
      data={[
        {
          x: ["Cliff rate", "Cliff gap"],
          y: [cliff_share_change, cliff_gap_change],
          type: "bar",
          marker: {
            color: [
              cliff_share_change > 0
                ? style.colors.DARK_GRAY
                : style.colors.DARK_GREEN,
              cliff_gap_change > 0
                ? style.colors.DARK_GRAY
                : style.colors.DARK_GREEN,
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
          hoverinfo: "none",
        },
      ]}
      layout={{
        yaxis: {
          title: "Relative change",
          tickformat: "+,.0%",
        },
        uniformtext: {
          mode: "hide",
          minsize: 8,
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
      onHover={(data) => {
        const metric = data.points[0].x;
        const baseline = metric === "Cliff rate" ? impact.baseline.cliff_share : impact.baseline.cliff_gap;
        const reform = metric === "Cliff rate" ? impact.reform.cliff_share : impact.reform.cliff_gap;
        const change = reform / baseline - 1;
        const formatter = 
          metric === "Cliff rate" ?
            percent :
            x => aggregateCurrency(x, metadata);
        const message = `The ${metric.toLowerCase()} ${
          change > 0.0001 ?
            `rises ${percent(change)} from ${formatter(baseline)} to ${formatter(reform)}` :
            change < -0.0001 ?
              `falls ${percent(-change)} from ${formatter(baseline)} to ${formatter(reform)}` :
              `remains at ${percent(baseline)}`
        }.`;
        setHovercard({
          title: data.points[0].x,
          body: message,
        })
      }}
    />
  );

  const title = `${policyLabel} ${
    cliff_share_change === 0 && cliff_gap_change === 0
      ? "doesn't affect cliffs"
      : cliff_share_change >= 0 && cliff_gap_change >= 0
      ? "makes cliffs more prevalent"
      : cliff_share_change <= 0 && cliff_gap_change <= 0
      ? "makes cliffs less prevalent"
      : "has an ambiguous effect on cliffs"
  }`;

  return (
    <ResultsPanel
      title={title}
      description="The cliff rate is the share of households whose net income falls if each adult earned an additional £2,000. The cliff gap is the sum of the losses incurred by all households on a cliff if their income rose in this way."
    >
      <HoverCard
        content={hovercard}
      >
        {chart}
      </HoverCard>
    </ResultsPanel>
  );
}
