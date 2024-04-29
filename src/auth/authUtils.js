// The below are two public values vital to auth0 local setup
export const AUTH0_DOMAIN = "policyengine.uk.auth0.com";
export const AUTH0_CLIENT_ID = "jbAXjeFRxGpGRxkedjt2wRLHJd26bwDS";

/**
 * Provide login options for use with auth0
 * @param {String} countryId
 * @param {Object} options Various configuration options
 * @param {Object} options.customParams Optional custom parameters
 * to be passed to auth0 user object
 * @param {String} options.redirectPath Optional string, beginning
 * with "/", to follow URL and to which user will be redirected
 * @returns
 */
export function loginOptions(countryId, options) {
  return {
    appState: {
      returnTo: options?.redirectPath || `/${countryId}`,
    },
    authorizationParams: {
      ...options?.customParams,
      country_id: countryId,
    },
  };
}

export const logoutOptions = {
  logoutParams: { returnTo: window.location.origin },
};
