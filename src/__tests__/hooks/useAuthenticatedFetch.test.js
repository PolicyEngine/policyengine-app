import { renderHook } from "@testing-library/react";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import auth0 from "@auth0/auth0-react";

jest.mock("@auth0/auth0-react");
const DEFAULT_FETCH_RESULT = "ok";
let mockFetch;

describe("useAuthenticatedFetch", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    auth0.useAuth0.mockReturnValue({
      isAuthenticated: false,
      getAccessTokenSilently: async () => {
        throw new Error("TEST ATTEMPTED TO CALL GET ACCESS TOKENS");
      },
    });
    mockFetch = jest.fn(() => Promise.resolve(DEFAULT_FETCH_RESULT));
    global.fetch = mockFetch;
  });

  function givenTheUserIsLoggedIn(auth_token) {
    auth0.useAuth0.mockReturnValue({
      isAuthenticated: true,
      getAccessTokenSilently: async () => auth_token ?? "TEST_AUTH_TOKEN",
    });
  }

  function givenAuth0TokenCannotBeCreated() {
    auth0.useAuth0.mockReturnValue({
      isAuthenticated: true,
      getAccessTokenSilently: async () => {
        throw new Error("TEST ATTEMPTED TO CALL GET ACCESS TOKENS");
      },
    });
  }

  test("given the user is logged in then it adds the bearer token", async () => {
    givenTheUserIsLoggedIn("TEST_AUTH_TOKEN");
    const requestOptions = {
      headers: {
        whatever: "value",
      },
    };

    const { result } = renderHook(() => useAuthenticatedFetch());
    const response = await result.current.authenticatedFetch(
      "/test/path",
      requestOptions,
    );

    expect(response).toEqual(DEFAULT_FETCH_RESULT);
    expect(mockFetch.mock.calls[0]).toEqual([
      "/test/path",
      {
        ...requestOptions,
        headers: {
          ...requestOptions.headers,
          Authorization: "Bearer TEST_AUTH_TOKEN",
        },
      },
    ]);
  });

  test("given the user is not logged in then it adds nothing", async () => {
    const { result } = renderHook(() => useAuthenticatedFetch());

    const response = await result.current.authenticatedFetch("/test/path", {
      headers: { whatever: "value" },
    });

    expect(response).toEqual(DEFAULT_FETCH_RESULT);
    expect(mockFetch.mock.calls[0]).toEqual([
      "/test/path",
      { headers: { whatever: "value" } },
    ]);
  });

  test("given auth0 is not able to get a token then it ignores the error and adds nothing", async () => {
    givenAuth0TokenCannotBeCreated();

    const { result } = renderHook(() => useAuthenticatedFetch());

    const response = await result.current.authenticatedFetch("/test/path", {
      headers: { whatever: "value" },
    });

    expect(response).toEqual(DEFAULT_FETCH_RESULT);
    expect(mockFetch.mock.calls[0]).toEqual([
      "/test/path",
      { headers: { whatever: "value" } },
    ]);
  });
});
