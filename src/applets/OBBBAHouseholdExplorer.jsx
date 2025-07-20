import Header from "../layout/Header";
import { Helmet } from "react-helmet";
import style from "../style";
import { useWindowHeight } from "../hooks/useWindow";
import { useEffect, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OBBBAHouseholdExplorer() {
  const windowHeight = useWindowHeight();
  const navigate = useNavigate();
  const location = useLocation();
  const iframeRef = useRef(null);

  // Memoize baseUrl to prevent unnecessary re-renders
  const baseUrl = useMemo(
    () =>
      process.env.REACT_APP_OBBBA_IFRAME_URL ||
      "https://policyengine.github.io/obbba-scatter",
    [],
  );

  // Memoize iframe origin for efficient message verification
  const iframeOrigin = useMemo(() => new URL(baseUrl).origin, [baseUrl]);

  // Get current URL parameters to forward to iframe using location hook
  const urlParams = new URLSearchParams(location.search);

  // Construct iframe URL with forwarded parameters
  const iframeUrl = urlParams.toString()
    ? `${baseUrl}?${urlParams.toString()}`
    : baseUrl;

  useEffect(() => {
    // Listen for messages from the iframe
    const handleMessage = (event) => {
      // Verify the message is from our iframe
      if (event.origin !== iframeOrigin) return;

      // Handle URL update messages from the iframe
      if (event.data?.type === "urlUpdate" && event.data?.params) {
        const newParams = new URLSearchParams(event.data.params);
        navigate(`${location.pathname}?${newParams.toString()}`, {
          replace: true,
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [navigate, location.pathname, iframeOrigin]);

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
          height={`calc(100vh - ${style.spacing.HEADER_HEIGHT})`}
          width="100%"
          style={{ overflow: "hidden" }}
          allow="clipboard-write"
        />
      </div>
    </>
  );
}
