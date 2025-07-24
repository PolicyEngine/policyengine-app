import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { apps } from "../apps/appTransformers";
import { Helmet } from "react-helmet";
import { useEffect, useRef, useState } from "react";

export default function AppPage() {
  const { appName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const iframeRef = useRef(null);

  const app = apps.find((app) => app.slug === appName);

  // Check if this is an OBBBA app that needs special handling
  const isOBBBAApp = app?.slug === "obbba-household-by-household";
  const [initialUrl, setInitialUrl] = useState(null);

  // Construct iframe URL with parameters (for OBBBA app only on initial load)
  useEffect(() => {
    if (!app) return;

    if (isOBBBAApp && !initialUrl) {
      const baseUrl = app.url;
      const separator = baseUrl.includes("?") ? "&" : "?";
      const urlParams = new URLSearchParams(location.search);

      const url = urlParams.toString()
        ? `${baseUrl}${separator}${urlParams.toString()}`
        : baseUrl;

      setInitialUrl(url);
    } else if (!isOBBBAApp) {
      // For non-OBBBA apps, just use the app URL
      setInitialUrl(app.url);
    }
  }, [app, location.search, initialUrl, isOBBBAApp]);

  // Listen for messages from OBBBA iframe
  useEffect(() => {
    if (!isOBBBAApp || !app) return;

    const handleMessage = (event) => {
      try {
        const iframeOrigin = new URL(app.url).origin;
        if (event.origin !== iframeOrigin) return;

        // Handle URL update messages from the iframe
        if (event.data?.type === "urlUpdate" && event.data?.params) {
          const newParams = new URLSearchParams(event.data.params);
          navigate(`${location.pathname}?${newParams.toString()}`, {
            replace: true,
          });
        }
      } catch (e) {
        console.error("Error handling iframe message:", e);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isOBBBAApp, app, navigate, location.pathname]);

  if (!app) {
    return (
      <>
        <Header />
        <div style={{ padding: "50px", textAlign: "center" }}>
          <h1>App not found</h1>
          <p>The app &ldquo;{appName}&rdquo; could not be found.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{app.title} - PolicyEngine</title>
        <meta name="description" content={app.description} />
      </Helmet>
      <Header />
      <div style={{ height: "var(--app-content-height)" }}>
        {initialUrl && (
          <iframe
            ref={iframeRef}
            src={initialUrl}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
            title={app.title}
            aria-label={app.description}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
