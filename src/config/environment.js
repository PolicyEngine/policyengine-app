// Environment-specific configuration

// Helper function to determine the correct OBBBA iframe URL
function getOBBBAIframeUrl() {
  // If explicitly set via environment variable, use that
  if (process.env.REACT_APP_OBBBA_IFRAME_URL) {
    return process.env.REACT_APP_OBBBA_IFRAME_URL;
  }
  
  // GitHub Pages deployment uses base path /obbba-scatter
  const githubPagesUrl = 'https://policyengine.github.io/obbba-scatter';
  
  // In production, we need to account for the base path
  // The actual app is served from /obbba-scatter/ subdirectory
  if (process.env.NODE_ENV === 'production') {
    // Check if the base URL is accessible (this would be done at build time)
    // For now, we use the correct URL with base path
    return `${githubPagesUrl}/obbba-scatter`;
  }
  
  // In development, use the base URL
  return githubPagesUrl;
}

const config = {
  // OBBBA iframe URL with automatic detection
  OBBBA_IFRAME_URL: getOBBBAIframeUrl(),
};

export default config;