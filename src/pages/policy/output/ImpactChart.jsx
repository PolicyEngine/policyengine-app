import HoverCard from "layout/HoverCard";
import DownloadableScreenshottable from "./DownloadableScreenshottable";
import { useRef } from "react";
import wrapAnsi from "wrap-ansi";
import { formatPercent } from "api/language";

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

/**
 *
 * @param {string} subjectTerm the subject of the sentence
 * @param {string} objectTerm the object of the sentence
 * @param {number} change the relative change
 * @param {number} tolerance the tolerance, a small positive number such as
 * 0.001. If the change is within this tolerance, then instead of using the
 * change in the message, we use a phrase of the form 'less than {tolerance}%'
 * @param {object} metadata the metadata object
 * @param {object} options more options
 * @param {number} options.baseline the baseline value
 * @param {number} options.reform the reform value
 * @param {function (number): string} options.formatter formatter for baseline and reform values
 *
 * @returns the relative change message
 */
export function relativeChangeMessage(
  subjectTerm,
  objectTerm,
  change,
  tolerance,
  metadata,
  options,
) {
  const formatter = (x) =>
    formatPercent(x, metadata, { maximumFractionDigits: 1 });
  const baselineReformTerm = options
    ? ` from ${options.formatter(options.baseline)} to ${options.formatter(
        options.reform,
      )}`
    : "";
  const signTerm =
    change > tolerance
      ? `increase ${objectTerm} by ${formatter(change) + baselineReformTerm}`
      : change > 0
        ? `increase ${objectTerm} by less than ${formatter(tolerance)}`
        : change < -tolerance
          ? `decrease ${objectTerm} by ${
              formatter(-change) + baselineReformTerm
            }`
          : change < 0
            ? `decrease ${objectTerm} by less than ${formatter(tolerance)}`
            : `have no effect on ${objectTerm}`;
  const msg = `${subjectTerm} would ${signTerm}`;
  return wrapAnsi(msg, 50).replaceAll("\n", "<br>");
}

/**
 *
 * @param {string} subjectTerm the subject of the sentence
 * @param {string} objectTerm the object of the sentence
 * @param {number} change the absolute change
 * @param {number} tolerance the tolerance, a positive number. If the change is
 * within this tolerance, then instead of using the change in the message, we
 * use a phrase of the form 'less than {tolerance}'
 * @param {function (number): string} formatter formats change values
 * @returns the absolute change message
 */
export function absoluteChangeMessage(
  subjectTerm,
  objectTerm,
  change,
  tolerance,
  formatter,
) {
  const signTerm =
    change > tolerance
      ? `increase ${objectTerm} by ${formatter(change)}`
      : change > 0
        ? `increase ${objectTerm} by less than ${formatter(tolerance)}`
        : change < -tolerance
          ? `decrease ${objectTerm} by ${formatter(-change)}`
          : change < 0
            ? `decrease ${objectTerm} by less than ${formatter(tolerance)}`
            : `have no effect on ${objectTerm}`;
  const msg = `${subjectTerm} would ${signTerm}`;
  return wrapAnsi(msg, 50).replaceAll("\n", "<br>");
}

/**
 *
 * Note this is not a general-purpose function -- it is meant to be used to
 * create titles in impact charts.
 *
 * @param {object} metadata the metadata object
 * @returns name of the region if it is found in metadata.economy_options.region
 * and it is not us or uk
 */
export function regionName(metadata) {
  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get("region");
  if (region === "us" || region === "uk") return;
  const options = metadata.economy_options.region.map((region) => {
    return { value: region.name, label: region.label };
  });
  return options.find((option) => option.value === region)?.label;
}
