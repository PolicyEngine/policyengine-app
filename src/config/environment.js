// Environment-specific configuration

// Helper function to determine the correct OBBBA iframe URL
function getOBBBAIframeUrl() {
  // If explicitly set via environment variable, use that
  if (process.env.REACT_APP_OBBBA_IFRAME_URL) {
    return process.env.REACT_APP_OBBBA_IFRAME_URL;
  }

  // GitHub Pages deployment uses base path /obbba-scatter
  const githubPagesUrl = "https://policyengine.github.io/obbba-scatter";

  // Always use the base GitHub Pages URL
  // GitHub Pages automatically serves the repository content from the /obbba-scatter base path.
  // No additional path concatenation is needed.
  return githubPagesUrl;
}

const config = {
  // OBBBA iframe URL with automatic detection
  OBBBA_IFRAME_URL: getOBBBAIframeUrl(),
};

export default config;
