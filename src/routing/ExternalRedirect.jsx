import { useEffect } from "react";

/**
 * Redirects the browser to an external URL outside the SPA's router.
 *
 * react-router's <Navigate> only resolves in-app paths, so vanity routes
 * that point at another domain (e.g. /policybench -> https://policybench.org)
 * use this instead. Renders a short fallback link in case the redirect is
 * slow or scripting is disabled.
 */
export default function ExternalRedirect({ to }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <p style={{ padding: 50, textAlign: "center" }}>
      Redirecting to <a href={to}>{to}</a>…
    </p>
  );
}
