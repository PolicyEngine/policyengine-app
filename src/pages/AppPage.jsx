import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { apps } from "../apps/appTransformers";
import { Helmet } from "react-helmet";
import { useEffect, useRef, useMemo, useState } from "react";

export default function AppPage() {
  const { appName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const [initialUrl, setInitialUrl] = useState(null);

  const app = apps.find((app) => app.slug === appName);

  // Construct iframe URL only on initial load
  useEffect(() => {
    if (!app || initialUrl) return;

    const baseUrl = app.url;
    const separator = baseUrl.includes("?") ? "&" : "?";
    const urlParams = new URLSearchParams(location.search);

    const url = urlParams.toString()
      ? `${baseUrl}${separator}${urlParams.toString()}`
      : baseUrl;

    setInitialUrl(url);
  }, [app, location.search, initialUrl]);

  // Memoize iframe origin for message verification
  const iframeOrigin = useMemo(() => {
    if (!app) return null;
    try {
      return new URL(app.url).origin;
    } catch (e) {
      console.error("Invalid iframe URL:", app.url);
      return null;
    }
  }, [app]);

  useEffect(() => {
    if (!iframeOrigin) return;

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
