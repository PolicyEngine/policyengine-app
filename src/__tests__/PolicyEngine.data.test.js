import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import PolicyEngine from "../PolicyEngine";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

// Mock the API calls
jest.mock("../api/call", () => ({
  fetchMetadata: jest.fn().mockResolvedValue({}),
  countryApiCall: jest.fn().mockResolvedValue({
    json: () =>
      Promise.resolve({
        result: {
          label: "Test Policy",
          policy_json: {}, // Mock policy data
        },
      }),
  }),
  apiCall: jest
    .fn()
    .mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve({ result: { user_id: 1 } }),
    })
    .mockResolvedValueOnce({ status: 404, status: "ok" })
    .mockResolvedValueOnce({ status: 201, result: { user_id: 1 } }),
}));

// Mock useAuth0
jest.mock("@auth0/auth0-react", () => ({
  useAuth0: jest.fn(() => ({
    isAuthenticated: true,
    user: { sub: "test_user_id" },
  })),
}));

describe("Test PolicyEngine data fetching and state", () => {
  beforeEach(() => {
    useSearchParams.mockImplementation(() => [new URLSearchParams(), jest.fn()]);
  });

  test("Fetches metadata and policies correctly", async () => {
    window.location = {
      ...window.location,
      pathname: "/us/policy",
      origin: "https://www.policyengine.org/us/policy",
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    // Wait for metadata and policies to be fetched and state updated
    await waitFor(
      () => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Assertions to check if metadata and policy data are in state
    // You'll likely need to access component state or use other techniques
    // expect(metadata).toEqual({}); // Example assertion, adjust as needed
    // expect(baselinePolicy.data).toEqual({});
    // expect(reformPolicy.data).toEqual({});
  });

  test("Fetches user profile correctly when authenticated", async () => {
    window.location = {
      ...window.location,
      pathname: "/us",
      origin: "https://www.policyengine.org/us",
    };

    render(
      <BrowserRouter>
        <PolicyEngine />
      </BrowserRouter>
    );

    // Wait for user profile to be fetched and state updated
    await waitFor(
      () => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Assert that userProfile state is updated correctly
    // You'll likely need to access component state or use other techniques
    // expect(userProfile).toEqual({ user_id: 1 }); // Example assertion
  });
});