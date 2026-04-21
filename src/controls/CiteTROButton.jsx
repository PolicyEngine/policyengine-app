import { useState } from "react";
import { Modal, Tabs, message } from "antd";
import Button from "./Button";
import {
  generateBibTeXCitation,
  generateAPACitation,
  generateChicagoCitation,
  generateValidationCommand,
  generateTROPermalink,
} from "../api/traceCitation";
import colors from "../style/colors";

/**
 * Button that opens a modal for citing TRACE TRO results
 * @param {Object} props
 * @param {Object} props.troData - TRO data from API response
 * @param {string} props.troData.tro_url - URL to the TRO JSON-LD file
 * @param {string} props.troData.tro_id - TRO identifier
 * @param {Object} props.troData.manifest - Data release manifest
 * @param {string} props.country - Country code (us, uk)
 * @param {string} props.simulationType - Type of simulation (household, policy)
 * @param {string} [props.buttonText] - Custom button text
 * @param {string} [props.buttonType] - Button type (primary, secondary, etc.)
 */
export default function CiteTROButton({
  troData,
  country,
  simulationType,
  buttonText = "Cite this result",
  buttonType = "secondary",
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("bibtex");

  if (!troData || !troData.tro_url || !troData.tro_id) {
    // Don't show button if TRO data is not available
    return null;
  }

  const citationOptions = {
    troUrl: troData.tro_url,
    troId: troData.tro_id,
    country,
    simulationType,
  };

  const bibTexCitation = generateBibTeXCitation(citationOptions);
  const apaCitation = generateAPACitation(citationOptions);
  const chicagoCitation = generateChicagoCitation(citationOptions);
  const validationCommand = generateValidationCommand();
  const permalink = generateTROPermalink(country, troData.tro_id);

  const handleCopyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success(`${label} copied to clipboard`);
    });
  };

  const handleDownloadTRO = async () => {
    try {
      const response = await fetch(troData.tro_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `trace.tro.${troData.tro_id}.jsonld`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      message.success("TRO file downloaded");
    } catch (error) {
      message.error("Failed to download TRO file");
      console.error("TRO download error:", error);
    }
  };

  const citationTabs = [
    {
      key: "bibtex",
      label: "BibTeX",
      content: bibTexCitation,
    },
    {
      key: "apa",
      label: "APA",
      content: apaCitation,
    },
    {
      key: "chicago",
      label: "Chicago",
      content: chicagoCitation,
    },
  ];

  return (
    <>
      <Button
        text={buttonText}
        type={buttonType}
        onClick={() => setIsModalOpen(true)}
      />
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={700}
        title="Cite this result"
      >
        <div style={{ marginTop: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 12 }}>
            Citation formats
          </h3>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={citationTabs.map((tab) => ({
              key: tab.key,
              label: tab.label,
              children: (
                <div>
                  <pre
                    style={{
                      backgroundColor: colors.LIGHT_GRAY,
                      padding: 16,
                      borderRadius: 4,
                      fontSize: 12,
                      fontFamily: "monospace",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      overflowX: "auto",
                      marginBottom: 12,
                    }}
                  >
                    {tab.content}
                  </pre>
                  <Button
                    text="Copy citation"
                    type="secondary"
                    onClick={() =>
                      handleCopyToClipboard(tab.content, `${tab.label} citation`)
                    }
                  />
                </div>
              ),
            }))}
          />

          <div
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: `1px solid ${colors.LIGHT_GRAY}`,
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 16 }}>
              Actions
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <Button
                text="Download TRACE TRO"
                type="primary"
                onClick={handleDownloadTRO}
              />
              <Button
                text="Copy permalink"
                type="secondary"
                onClick={() => handleCopyToClipboard(permalink, "Permalink")}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: `1px solid ${colors.LIGHT_GRAY}`,
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 12 }}>
              Verify this result
            </h3>
            <p style={{ fontSize: 14, marginBottom: 12, color: colors.DARK_GRAY }}>
              To verify the reproducibility of this result, download the TRO
              file and run:
            </p>
            <pre
              style={{
                backgroundColor: colors.LIGHT_GRAY,
                padding: 16,
                borderRadius: 4,
                fontSize: 12,
                fontFamily: "monospace",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {validationCommand}
            </pre>
          </div>
        </div>
      </Modal>
    </>
  );
}
