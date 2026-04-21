import { useState } from "react";
import { Tooltip } from "antd";
import colors from "../style/colors";

/**
 * Display version information badge for simulation results
 * Shows abbreviated version info with expandable details on hover/click
 * @param {Object} props
 * @param {Object} props.manifest - Data release manifest from TRO
 * @param {string} props.manifest.rules_version - Version of rules package
 * @param {string} props.manifest.data_version - Version of data package
 * @param {string} props.manifest.data_file - Data file name
 * @param {string} props.manifest.data_hash - SHA-256 hash of data file
 * @param {string} [props.troUrl] - Optional link to full TRO
 * @param {string} [props.size] - Size variant: 'small' | 'medium' | 'large'
 */
export default function VersionBadge({ manifest, troUrl, size = "medium" }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!manifest) {
    return null;
  }

  const { rules_version, data_version, data_file, data_hash } = manifest;

  // Truncate hash for display
  const shortHash = data_hash ? data_hash.substring(0, 8) : "";

  // Calculate font sizes based on size prop
  const fontSizes = {
    small: { text: 10, mono: 9 },
    medium: { text: 11, mono: 10 },
    large: { text: 12, mono: 11 },
  };

  const fontSize = fontSizes[size] || fontSizes.medium;

  // Short form for badge display
  const shortVersion = `rules ${rules_version} · data ${data_file}@${data_version} · sha256:${shortHash}`;

  // Full manifest details for tooltip
  const fullDetails = (
    <div style={{ maxWidth: 400 }}>
      <div style={{ marginBottom: 8 }}>
        <strong>Data Release Manifest</strong>
      </div>
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 11,
          lineHeight: 1.5,
        }}
      >
        <div>
          <strong>Rules version:</strong> {rules_version}
        </div>
        <div>
          <strong>Data version:</strong> {data_version}
        </div>
        <div>
          <strong>Data file:</strong> {data_file}
        </div>
        <div style={{ wordBreak: "break-all" }}>
          <strong>Data hash:</strong> {data_hash}
        </div>
      </div>
      {troUrl && (
        <div style={{ marginTop: 12, fontSize: 11 }}>
          <a
            href={troUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: colors.BLUE }}
          >
            View full TRO
          </a>
        </div>
      )}
    </div>
  );

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: colors.LIGHT_GRAY,
    border: `1px solid ${colors.MEDIUM_LIGHT_GRAY}`,
    borderRadius: 4,
    padding: "4px 10px",
    fontSize: fontSize.text,
    fontFamily: "monospace",
    color: colors.DARK_GRAY,
    cursor: "help",
    transition: "all 0.2s ease",
  };

  const handleClick = () => {
    if (troUrl) {
      window.open(troUrl, "_blank");
    }
  };

  return (
    <Tooltip title={fullDetails} placement="top">
      <div
        style={badgeStyle}
        onClick={handleClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.MEDIUM_LIGHT_GRAY;
          e.currentTarget.style.borderColor = colors.DARK_GRAY;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.LIGHT_GRAY;
          e.currentTarget.style.borderColor = colors.MEDIUM_LIGHT_GRAY;
        }}
      >
        {shortVersion}
      </div>
    </Tooltip>
  );
}
