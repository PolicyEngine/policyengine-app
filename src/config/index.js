/**
 * Configuration values for the application
 * These can be overridden by environment variables
 */

// API URLs
export const API_URL = process.env.REACT_APP_API_URL || "https://api.policyengine.org";
export const API_AUDIENCE = process.env.REACT_APP_API_AUDIENCE || "https://api.policyengine.org/";

// Auth configuration (moved from authUtils.js for centralization)
export const AUTH0_DOMAIN = "policyengine.uk.auth0.com";  
export const AUTH0_CLIENT_ID = "jbAXjeFRxGpGRxkedjt2wRLHJd26bwDS";

// Redirect URL for Auth0
export const AUTH0_REDIRECT_URI = process.env.REACT_APP_DEBUG
  ? "http://localhost:3000/callback"
  : "https://policyengine.org/callback"; 