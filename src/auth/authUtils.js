export function loginOptions(countryId) {
  return (
    { appState: { returnTo: `/${countryId}` } }
  );
}

export const logoutOptions = { logoutParams: { returnTo: window.location.origin } };