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
  return (
    { 
      appState: { 
        returnTo: options?.redirectPath || `/${countryId}`
      },
      authorizationParams: {
        ...options?.customParams,
        countryId: countryId
      }
    }
  );
}

export const logoutOptions = { logoutParams: { returnTo: window.location.origin } };