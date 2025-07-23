import Header from "../layout/Header";
import { Helmet } from "react-helmet";
import style from "../style";
import { useWindowHeight } from "../hooks/useWindow";
import { useEffect, useRef, useMemo, useState } from "react";
import {useLocation } from "react-router-dom";

export default function OBBBAHouseholdExplorer() {
  const windowHeight = useWindowHeight();
  const location = useLocation();
  const iframeRef = useRef(null);

  // Capture initial URL parameters only on first render
  const [initialUrlParams] = useState(
    () => new URLSearchParams(location.search),
  );

  // Memoize baseUrl to prevent unnecessary re-renders
  // Hardcoding URL to bypass any build/environment issues
  const baseUrl = useMemo(
    () => "https://policyengine.github.io/obbba-scatter",
    [],
  );

  // Memoize iframe origin for efficient message verification
  const iframeOrigin = useMemo(() => new URL(baseUrl).origin, [baseUrl]);

  // Construct iframe URL with initial parameters only - never changes after initial load
  const iframeUrl = useMemo(() => {
    return initialUrlParams.toString()
      ? `${baseUrl}?${initialUrlParams.toString()}`
      : baseUrl;
  }, [baseUrl, initialUrlParams]);

  useEffect(() => {
    // Listen for messages from the iframe
    const handleMessage = (event) => {
      // Verify the message is from our iframe
      if (event.origin !== iframeOrigin) return;

      // Handle URL update messages from the iframe
      if (event.data?.type === "urlUpdate" && event.data?.params) {
        // Ignore these messages to keep URL stable during shuffling
        return;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [iframeOrigin]);

  return (
    <>
      <Helmet>
        <title>OBBBA Household Explorer | PolicyEngine</title>
      </Helmet>
      <Header />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: windowHeight - style.spacing.HEADER_HEIGHT,
          width: "100%",
        }}
      >
        <iframe
          ref={iframeRef}
          src={iframeUrl}
          title="OBBBA Household Explorer"
          height={`calc(100vh - ${style.spacing.HEADER_HEIGHT}px)`}
          width="100%"
          style={{ overflow: "hidden" }}
          allow="clipboard-write"
        />
      </div>
    </>
  );
}
