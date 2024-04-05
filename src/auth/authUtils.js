export function loginOptions(countryId, customParams) {
  return (
    { 
      appState: { 
        returnTo: `/${countryId}`
      },
      authorizationParams: {
        ...customParams
      }
    }
  );
}

export const logoutOptions = { logoutParams: { returnTo: window.location.origin } };