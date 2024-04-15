// Taken from https://developer.auth0.com/resources/guides/spa/react/basic-authentication#add-route-guards-to-react
import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import AuthCallback from "../layout/AuthCallback";

export const AuthenticationGuard = ({ component, ...props }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <AuthCallback />
    ),
  });

  return <Component {...props} />;
};