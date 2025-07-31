import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { Alert, Button, Spin } from "antd";
import React, { useState } from "react";

/**
 * Component to handle Streamlit app wake-up and loading states
 * @param {Object} props
 * @param {string} props.streamlitUrl - The Streamlit app URL
 * @param {string} props.title - The title for the iframe
 * @param {string} props.wakeUpUrl - The direct URL to wake up the app (optional)
 * @param {Object} props.iframeProps - Additional props for the iframe
 * @param {React.ReactNode} props.children - Optional content to show while loading
 */
export default function StreamlitWakeUp({
  streamlitUrl,
  title,
  wakeUpUrl,
  iframeProps = {},
  children,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Default wake-up URL if not provided
  const defaultWakeUpUrl =
    wakeUpUrl || streamlitUrl.replace("?embedded=true", "");

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleWakeUp = () => {
    // Open the wake-up URL in a new tab
    window.open(defaultWakeUpUrl, "_blank");
    // Reset the iframe after a short delay
    setTimeout(() => {
      setIframeKey((prev) => prev + 1);
      setIsLoading(true);
      setHasError(false);
    }, 2000);
  };

  const handleRetry = () => {
    setIframeKey((prev) => prev + 1);
    setIsLoading(true);
    setHasError(false);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#f5f5f5",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            padding: "2rem",
          }}
        >
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            size="large"
          />
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <p>Loading embedded application...</p>
            {children}
            <div style={{ marginTop: "1rem" }}>
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                onClick={handleWakeUp}
                size="small"
              >
                Wake up app
              </Button>
            </div>
          </div>
        </div>
      )}

      {hasError && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#f5f5f5",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            padding: "2rem",
          }}
        >
          <Alert
            message="Application Error"
            description="The embedded application failed to load. This might be because the app is sleeping or temporarily unavailable."
            type="error"
            showIcon
            style={{ marginBottom: "1rem", maxWidth: "400px" }}
          />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={handleWakeUp}
            >
              Wake up app
            </Button>
            <Button onClick={handleRetry}>Retry</Button>
          </div>
        </div>
      )}

      <iframe
        key={iframeKey}
        src={streamlitUrl}
        title={title}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          overflow: "hidden",
        }}
        {...iframeProps}
      />
    </div>
  );
}
