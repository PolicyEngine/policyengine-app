import { useState } from "react";
import { Popover } from "antd";
import style from "../style";

/**
 * Small always-visible strip that identifies which model version and
 * dataset produced a simulation result.
 *
 * See PolicyEngine/policyengine-app#2831 for motivation. This is the
 * plain version-identification surface — the TRACE-bound "Cite this
 * result" download is scoped separately in #2830 and blocked on the
 * api work in PolicyEngine/policyengine-api#3485.
 *
 * Today the api metadata endpoint only exposes the country-package
 * version and the selectable dataset name. Once the api migrates to
 * policyengine.py v4 (api#3486) and begins returning
 * policyengine-{country}-data version and h5 content hash on every
 * simulation response, this component should read those additional
 * fields and expand the visible badge.
 */
export default function VersionBadge(props) {
  const {
    countryId,
    modelVersion,
    dataset,
    dataVersion,
    h5Sha,
    compact = false,
  } = props;

  const [popoverOpen, setPopoverOpen] = useState(false);

  if (!modelVersion) {
    return null;
  }

  const modelPackageName =
    countryId === "us"
      ? "policyengine-us"
      : countryId === "uk"
        ? "policyengine-uk"
        : countryId === "canada"
          ? "policyengine-canada"
          : `policyengine-${countryId}`;

  // Human-readable dataset label. The api exposes canonical names like
  // "enhanced_cps" or "cps" — surface them as-is so a reader who
  // knows the pipeline can tell exactly what ran.
  const datasetLabel = dataset || "default";

  const compactStrip = (
    <code
      style={{
        fontFamily: "monospace",
        fontSize: compact ? "11px" : "12px",
        color: style.colors.DARK_GRAY,
        backgroundColor: style.colors.LIGHT_GRAY,
        padding: "2px 6px",
        borderRadius: "3px",
        whiteSpace: "nowrap",
      }}
      aria-label={`Model and dataset versions used for this result`}
    >
      {`${modelPackageName}@${modelVersion} · ${datasetLabel}`}
      {dataVersion && `@${dataVersion}`}
      {h5Sha && ` · h5 sha256:${h5Sha.substring(0, 8)}…`}
    </code>
  );

  const detailContent = (
    <div style={{ maxWidth: 360, fontSize: 13, lineHeight: 1.5 }}>
      <div style={{ marginBottom: 8 }}>
        <strong>Model package</strong>
        <div style={{ fontFamily: "monospace", fontSize: 12 }}>
          {modelPackageName}=={modelVersion}
        </div>
      </div>
      <div style={{ marginBottom: 8 }}>
        <strong>Dataset</strong>
        <div style={{ fontFamily: "monospace", fontSize: 12 }}>
          {datasetLabel}
          {dataVersion ? `@${dataVersion}` : ""}
        </div>
      </div>
      {h5Sha && (
        <div style={{ marginBottom: 8 }}>
          <strong>h5 content hash</strong>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              wordBreak: "break-all",
            }}
          >
            sha256:{h5Sha}
          </div>
        </div>
      )}
      <div style={{ color: style.colors.DARK_GRAY, marginTop: 10 }}>
        These identify the pinned software and microdata that produced this
        result. A citable TRO that binds them under a SHA-256 composition
        fingerprint is coming &mdash; see issue{" "}
        <a
          href="https://github.com/PolicyEngine/policyengine-app/issues/2830"
          target="_blank"
          rel="noopener noreferrer"
        >
          policyengine-app#2830
        </a>
        .
      </div>
    </div>
  );

  return (
    <Popover
      content={detailContent}
      title="Reproducibility identifiers"
      trigger="click"
      open={popoverOpen}
      onOpenChange={setPopoverOpen}
      placement="top"
    >
      <span
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setPopoverOpen(!popoverOpen);
          }
        }}
        style={{ cursor: "pointer" }}
      >
        {compactStrip}
      </span>
    </Popover>
  );
}
