import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from "./authUtils";

export default function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate();

  const domain = AUTH0_DOMAIN;
  const clientId = AUTH0_CLIENT_ID;

  const redirectUri = process.env.REACT_APP_DEBUG
    ? "http://localhost:3000/callback"
    : "https://policyengine.org/callback";

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
      }}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}
