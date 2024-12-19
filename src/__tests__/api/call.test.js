import { renderHook } from "@testing-library/react";
import { useAuthenticatedApiCall } from "../../api/call";
import * as authenticatedFetch from "../../hooks/useAuthenticatedFetch";

jest.mock("../../hooks/useAuthenticatedFetch");
let mock_authenticated_fetch;
const DEFAULT_FETCH_RESULT = {
  status: 200,
};

const SOME_REQUEST_BODY = {
  content: "BLAH",
};

describe("useAuthenticatedApiCall", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mock_authenticated_fetch = jest.fn(() =>
      Promise.resolve(DEFAULT_FETCH_RESULT),
    );

    authenticatedFetch.useAuthenticatedFetch.mockReturnValue({
      authenticatedFetch: mock_authenticated_fetch,
    });
  });

  test("it should wrap fetch with authenticatedFetch", async () => {
    const { result } = renderHook(() => useAuthenticatedApiCall());

    const response = await result.current.authenticatedApiCall(
      "/test/path",
      SOME_REQUEST_BODY,
      "POST",
    );

    expect(response).toEqual(DEFAULT_FETCH_RESULT);
    expect(mock_authenticated_fetch.mock.calls[0]).toEqual([
      "https://api.policyengine.org/test/path",
      {
        body: JSON.stringify(SOME_REQUEST_BODY),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      },
    ]);
  });
});
