import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

/**
 * Get an 'authenticatedFetch' function which, if the user is logged in,
 * will automatically attach an access token to any API request.
 * @returns {{authenticatedFetch:(path:string, opts:Record)=>Promise}}
 */
export function useAuthenticatedFetch() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const authenticatedFetch = useCallback(
    async (path, opts) => {
      opts = opts ?? {};
      const headers = { ...(opts.headers ?? {}) };

      if (isAuthenticated) {
        try {
          //as per https://auth0.com/docs/quickstart/spa/react/02-calling-an-api
          const accessToken = await getAccessTokenSilently();
          headers["Authorization"] = `Bearer ${accessToken}`;
        } catch (error) {
          //IGNORE. If we can't get an access token we just call the API
          //without it.
        }
      }

      return await fetch(path, {
        ...opts,
        headers,
      });
    },
    [isAuthenticated, getAccessTokenSilently],
  );
  return {
    authenticatedFetch,
  };
}
