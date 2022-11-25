import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useSearchParams } from "react-router-dom";
import { asyncApiCall, copySearchParams } from "../../../api/call";
import ErrorPage from "../../../layout/Error";
import LoadingCentered from "../../../layout/LoadingCentered";
import ResultsPanel from "../../../layout/ResultsPanel";
import style from "../../../style";


export default function CliffImpact(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const focus = searchParams.get("focus");
  const region = searchParams.get("region");
  const timePeriod = searchParams.get("timePeriod");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId = searchParams.get("baseline");
  const [impact, setImpact] = useState(null);
  const [error, setError] = useState(null);
  const { metadata, policyLabel } = props;
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

  const cliff_gap_change = impact.reform.cliff_share / impact.baseline.cliff_share - 1
  const cliff_share_change = impact.reform.cliff_gap / impact.baseline.cliff_gap - 1

  const chart = <Plot
    data={[
        {
            x: ["Cliff rate", "Cliff gap"],
            y: [
                cliff_share_change,
                cliff_gap_change,
            ],
            type: "bar",
            marker: {
                color: [
                    cliff_share_change > 0 ? style.colors.DARK_GRAY : style.colors.DARK_GREEN,
                    cliff_gap_change > 0 ? style.colors.DARK_GRAY : style.colors.DARK_GREEN,
                ],
            },
            text: [
                `${cliff_share_change >= 0 ? "+" : ""}${(cliff_share_change * 100).toFixed(1)}%`,
                `${cliff_gap_change >= 0 ? "+" : ""}${(cliff_gap_change * 100).toFixed(1)}%`,
            ],
            textposition: "auto",
            textangle: 0,
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
    }}
    config={{
        displayModeBar: false,
    }}
    style={{
        width: "100%",
    }}
    />;

    const title = `${policyLabel} ${
        (cliff_share_change === 0 || cliff_gap_change === 0) ?
            "does not affect cliffs" :
            (cliff_share_change > 0) & (cliff_gap_change > 0) ?
                "makes cliffs more prevalent" :
                (cliff_share_change < 0) & (cliff_gap_change < 0) ?
                    "makes cliffs less prevalent" :
                    "has an ambiguous effect on cliffs"
    }`;

    return <ResultsPanel
        title={title}
        description="The cliff rate is the share of adults who would be worse off if their employment income increased by $2,000. The cliff gap is the sum of the losses incurred by everyone on a cliff if their income rose in this way."
        >
        {chart}
        </ResultsPanel>
}