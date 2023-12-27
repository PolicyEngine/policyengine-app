import HoverCard from "layout/HoverCard";
import DownloadableScreenshottable from "./DownloadableScreenshottable";
import { useRef } from "react";

export default function ImpactChart(props) {
  const { title, description, children } = props;
  const screenshotRef = useRef();
  return (
    <DownloadableScreenshottable ref={screenshotRef}>
      <h2 style={{ width: "100%", wordWrap: "break-word", display: "inline" }}>
        {title}
      </h2>
      <HoverCard>{children}</HoverCard>
      {description}
    </DownloadableScreenshottable>
  );
}

export function impactTitle(
  policyLabel,
  change,
  changeLabel,
  impactLabel,
  suffix,
  metadata,
) {
  // TODO: is this a good idea? the country in the url is not the country that
  // has been analyzed by the back end
  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get("region");
  const options = metadata.economy_options.region.map((region) => {
    return { value: region.name, label: region.label };
  });
  // TODO: a tolerance should be used to decide the sign. For instance, a change
  // of 1e-09 is treated as an "increase" in the following code
  const signPhrase =
    change > 0
      ? `increase ${impactLabel} by ${changeLabel}`
      : change < 0
        ? `decrease ${impactLabel} by ${changeLabel}`
        : `have no effect on ${impactLabel}`;
  const regionLabel =
    region === "us" || region === "uk"
      ? ""
      : "in " + options.find((option) => option.value === region)?.label + " ";
  return `${policyLabel} would ${signPhrase} ${regionLabel} ${suffix}`;
}
