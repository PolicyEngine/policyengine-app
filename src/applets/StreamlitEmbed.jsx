import { useState } from "react";
import { Alert } from "antd";
import Header from "../layout/Header";
import { Helmet } from "react-helmet";
import style from "../style";
import { useWindowHeight } from "../hooks/useWindow";

/**
 * Reusable component for embedding Streamlit apps with sleep state handling
 *
 * Note: Due to CORS restrictions, we cannot detect if a Streamlit app is sleeping
 * from the parent page. The notice is shown by default and users can dismiss it.
 *
 * @param {Object} props
 * @param {string} props.embedUrl - The Streamlit app URL with ?embedded=true
 * @param {string} props.directUrl - The Streamlit app URL without embedded param (for direct access)
 * @param {string} props.title - Page title for Helmet
 * @param {string} props.iframeTitle - Title attribute for iframe (accessibility)
 * @param {number} [props.height] - Optional fixed height (defaults to responsive)
 * @param {number} [props.width] - Optional fixed width (defaults to 100%)
 */
export default function StreamlitEmbed({
  embedUrl,
  directUrl,
  title,
  iframeTitle,
  height,
  width,
}) {
  const windowHeight = useWindowHeight();

  // Generate a unique storage key for this app
  const storageKey = `streamlit-notice-dismissed-${embedUrl}`;

  // Check if user has previously dismissed this notice in this session
  const [alertVisible, setAlertVisible] = useState(() => {
    return !sessionStorage.getItem(storageKey);
  });

  const handleAlertClose = () => {
    setAlertVisible(false);
    // Remember that user dismissed this notice for this session
    sessionStorage.setItem(storageKey, "true");
  };

  // Calculate iframe dimensions
  const iframeHeight = height || `calc(100vh - ${style.spacing.HEADER_HEIGHT})`;
  const iframeWidth = width || "100%";

  return (
    <>
      <Helmet>
        <title>{title} | PolicyEngine</title>
      </Helmet>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: windowHeight - style.spacing.HEADER_HEIGHT,
          width: "100vw",
        }}
      >
        {alertVisible && (
          <Alert
            message="App Sleep Notice"
            description={
              <span>
                If you see a message that this app is sleeping, please visit{" "}
                <a
                  href={directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline" }}
                >
                  the app directly
                </a>{" "}
                to wake it up, then return to this page.
              </span>
            }
            type="info"
            closable
            onClose={handleAlertClose}
            style={{
              margin: "16px",
              marginBottom: "0",
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flex: 1,
            width: "100vw",
          }}
        >
          <iframe
            src={embedUrl}
            title={iframeTitle}
            height={iframeHeight}
            width={iframeWidth}
            style={{ overflow: "hidden" }}
          />
        </div>
      </div>
    </>
  );
}
