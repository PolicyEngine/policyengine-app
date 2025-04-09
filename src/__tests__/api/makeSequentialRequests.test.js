import { makeSequentialRequests } from "../../api/makeSequentialRequests";
import * as callModule from "../../api/call";

jest.mock("../../api/call", () => ({
  ...jest.requireActual("../../api/call"),
  countryApiCall: jest.fn(),
}));

describe("makeSequentialRequests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given a list of successful requests", () => {
    test("it should process all requests sequentially and return successful results", async () => {
      const requests = [
        { countryId: "us", path: "/api/users", method: "GET" },
        { countryId: "ca", path: "/api/posts", method: "GET" },
        { countryId: "uk", path: "/api/comments", method: "GET" },
      ];

      const mockResponses = [
        { data: "users data" },
        { data: "posts data" },
        { data: "comments data" },
      ];

      // Mock successful responses
      callModule.countryApiCall
        .mockResolvedValueOnce(mockResponses[0])
        .mockResolvedValueOnce(mockResponses[1])
        .mockResolvedValueOnce(mockResponses[2]);

      const result = await makeSequentialRequests(requests);

      expect(callModule.countryApiCall).toHaveBeenCalledTimes(3);
      expect(callModule.countryApiCall).toHaveBeenNthCalledWith(
        1,
        "us",
        "/api/users",
        undefined,
        "GET",
        undefined,
        undefined,
      );
      expect(callModule.countryApiCall).toHaveBeenNthCalledWith(
        2,
        "ca",
        "/api/posts",
        undefined,
        "GET",
        undefined,
        undefined,
      );
      expect(callModule.countryApiCall).toHaveBeenNthCalledWith(
        3,
        "uk",
        "/api/comments",
        undefined,
        "GET",
        undefined,
        undefined,
      );

      expect(result).toEqual({
        results: [
          {
            status: "success",
            requestIndex: 0,
            requestSetup: requests[0],
            response: mockResponses[0],
            error: null,
          },
          {
            status: "success",
            requestIndex: 1,
            requestSetup: requests[1],
            response: mockResponses[1],
            error: null,
          },
          {
            status: "success",
            requestIndex: 2,
            requestSetup: requests[2],
            response: mockResponses[2],
            error: null,
          },
        ],
        summary: {
          total: 3,
          successes: 3,
          errors: 0,
        },
      });
    });

    test("it should call onComplete callback after each request", async () => {
      const requests = [
        { countryId: "us", path: "/api/users", method: "GET" },
        { countryId: "ca", path: "/api/posts", method: "GET" },
      ];

      callModule.countryApiCall
        .mockResolvedValueOnce({ data: "users data" })
        .mockResolvedValueOnce({ data: "posts data" });

      const onComplete = jest.fn();

      await makeSequentialRequests(requests, onComplete);

      expect(onComplete).toHaveBeenCalledTimes(2);
      expect(onComplete).toHaveBeenNthCalledWith(1, {
        current: 0,
        total: 2,
        successCount: 1,
        errorCount: 0,
      });
      expect(onComplete).toHaveBeenNthCalledWith(2, {
        current: 1,
        total: 2,
        successCount: 2,
        errorCount: 0,
      });
    });
  });

  describe("Given a list with mixed successful and failed requests", () => {
    test("it should continue processing after failures and track error counts", async () => {
      const requests = [
        { countryId: "us", path: "/api/users", method: "GET" },
        { countryId: "ca", path: "/api/posts", method: "GET" },
        { countryId: "uk", path: "/api/comments", method: "GET" },
      ];

      const mockError = new Error("API Error");
      mockError.response = { status: 404, data: "Not Found" };

      // First request succeeds, second fails, third succeeds
      callModule.countryApiCall
        .mockResolvedValueOnce({ data: "users data" })
        .mockRejectedValueOnce(mockError)
        .mockResolvedValueOnce({ data: "comments data" });

      const result = await makeSequentialRequests(requests);

      expect(callModule.countryApiCall).toHaveBeenCalledTimes(3);
      expect(result.results[0].status).toBe("success");
      expect(result.results[1].status).toBe("error");
      expect(result.results[1].error).toEqual({
        message: "API Error",
        status: 404,
        data: "Not Found",
      });
      expect(result.results[2].status).toBe("success");
      expect(result.summary).toEqual({
        total: 3,
        successes: 2,
        errors: 1,
      });
      expect(console.error).toHaveBeenCalledWith(
        "Request 2 failed:",
        "API Error",
      );
    });
  });

  describe("Given a request with secondAttempt flag", () => {
    test("it should pass the secondAttempt parameter to the API call", async () => {
      const requests = [
        {
          countryId: "us",
          path: "/api/users",
          method: "GET",
          secondAttempt: true,
        },
      ];

      callModule.countryApiCall.mockResolvedValueOnce({ data: "users data" });

      await makeSequentialRequests(requests);

      expect(callModule.countryApiCall).toHaveBeenCalledWith(
        "us",
        "/api/users",
        undefined,
        "GET",
        true,
        undefined,
      );
    });
  });

  describe("Given a POST request with body", () => {
    test("it should pass the body to the API call", async () => {
      const requestBody = { name: "John", age: 30 };
      const requests = [
        {
          countryId: "us",
          path: "/api/users",
          method: "POST",
          body: requestBody,
        },
      ];

      callModule.countryApiCall.mockResolvedValueOnce({ data: "created" });

      await makeSequentialRequests(requests);

      expect(callModule.countryApiCall).toHaveBeenCalledWith(
        "us",
        "/api/users",
        requestBody,
        "POST",
        undefined,
        undefined,
      );
    });
  });

  describe("Given an empty requests array", () => {
    test("it should return empty results with zero counts", async () => {
      const requests = [];

      const result = await makeSequentialRequests(requests);

      expect(callModule.countryApiCall).not.toHaveBeenCalled();
      expect(result).toEqual({
        results: [],
        summary: {
          total: 0,
          successes: 0,
          errors: 0,
        },
      });
    });
  });

  describe("Given an unexpected error in the main function", () => {
    test("it should throw the error", async () => {
      // Force an error in the main function by setting requests to null
      const requests = null;

      await expect(makeSequentialRequests(requests)).rejects.toThrow();
      expect(console.error).toHaveBeenCalledWith(
        "Sequential requests failed:",
        expect.any(Error),
      );
    });
  });
});
