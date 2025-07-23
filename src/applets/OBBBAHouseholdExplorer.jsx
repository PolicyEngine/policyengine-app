import Header from "../layout/Header";
import { Helmet } from "react-helmet";
import style from "../style";
import { useWindowHeight } from "../hooks/useWindow";
import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export default function OBBBAHouseholdExplorer() {
  const windowHeight = useWindowHeight();
  const [searchParams] = useSearchParams();
  const iframeRef = useRef(null);
  const [iframeReady, setIframeReady] = useState(false);
  const scrollTimeoutsRef = useRef([]);

  // Get the household ID from URL params
  const householdId = searchParams.get("household");

  const baseUrl = "https://policyengine.github.io/obbba-scatter";
  const iframeOrigin = new URL(baseUrl).origin;

  // Construct iframe URL with all parameters
  const iframeUrl = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    return url;
  }, [baseUrl, searchParams]);

  // Clear any pending scroll timeouts
  const clearScrollTimeouts = useCallback(() => {
    scrollTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    scrollTimeoutsRef.current = [];
  }, []);

  // Handle scroll to household with multiple retry attempts
  const scrollToHousehold = useCallback(
    (householdId, attempt = 1) => {
      if (!iframeRef.current?.contentWindow || !householdId) return;

      // Send scroll request to iframe
      iframeRef.current.contentWindow.postMessage(
        {
          type: "scrollToHousehold",
          householdId: householdId,
        },
        iframeOrigin,
      );

      // Also try alternative scroll methods
      if (attempt === 1) {
        // Try scrolling to section after a delay
        const timeout1 = setTimeout(() => {
          iframeRef.current?.contentWindow?.postMessage(
            {
              type: "scrollToSection",
              section: "lower-income",
            },
            iframeOrigin,
          );
        }, 500);
        scrollTimeoutsRef.current.push(timeout1);
      }

      // Schedule retry attempts
      if (attempt < 3) {
        const timeout2 = setTimeout(() => {
          scrollToHousehold(householdId, attempt + 1);
        }, attempt * 2000); // Exponential backoff: 2s, 4s
        scrollTimeoutsRef.current.push(timeout2);
      }
    },
    [iframeOrigin],
  );

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== iframeOrigin) return;

      switch (event.data?.type) {
        case "requestUrlParams":
        case "iframeReady":
          setIframeReady(true);
          // Send params to iframe
          iframeRef.current?.contentWindow?.postMessage(
            {
              type: "urlParams",
              params: Object.fromEntries(searchParams),
            },
            iframeOrigin,
          );

          // Start scroll attempts if we have a household ID
          if (householdId) {
            clearScrollTimeouts();
            // Give iframe time to process params before scrolling
            const timeout = setTimeout(() => {
              scrollToHousehold(householdId);
            }, 1000);
            scrollTimeoutsRef.current.push(timeout);
          }
          break;

        case "urlUpdate":
          // If iframe signals it has updated with params, try scrolling
          if (householdId && event.data?.params) {
            clearScrollTimeouts();
            const timeout = setTimeout(() => {
              scrollToHousehold(householdId);
            }, 500);
            scrollTimeoutsRef.current.push(timeout);
          }
          break;

        case "dataLoaded":
          // Final scroll attempt when data is fully loaded
          if (householdId) {
            clearScrollTimeouts();
            scrollToHousehold(householdId);
          }
          break;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      clearScrollTimeouts();
    };
  }, [
    iframeOrigin,
    searchParams,
    householdId,
    scrollToHousehold,
    clearScrollTimeouts,
  ]);

  // Handle iframe load
  const handleIframeLoad = () => {
    // Give iframe time to initialize
    setTimeout(() => {
      // Send initial params in case iframe didn't request them
      iframeRef.current?.contentWindow?.postMessage(
        {
          type: "urlParams",
          params: Object.fromEntries(searchParams),
        },
        iframeOrigin,
      );

      // If we still haven't marked iframe as ready, try scrolling anyway
      if (!iframeReady && householdId) {
        const timeout = setTimeout(() => {
          scrollToHousehold(householdId);
        }, 2000);
        scrollTimeoutsRef.current.push(timeout);
      }
    }, 1000);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => clearScrollTimeouts();
  }, [clearScrollTimeouts]);

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
          style={{ border: "none" }}
          allow="clipboard-write"
          allowFullScreen
          onLoad={handleIframeLoad}
        />
      </div>
    </>
  );
}
