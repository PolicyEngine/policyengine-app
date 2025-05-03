import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { API_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_REDIRECT_URI } from "../config";

export default function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate();

  const domain = AUTH0_DOMAIN;
  const clientId = AUTH0_CLIENT_ID;

  const redirectUri = AUTH0_REDIRECT_URI;

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: API_AUDIENCE,
      }}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}
