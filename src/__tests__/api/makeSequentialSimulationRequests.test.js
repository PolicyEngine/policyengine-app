import * as callModule from "../../api/call";
import { makeSequentialSimulationRequests } from "../../api/makeSequentialSimulationRequests";

jest.mock("../../api/call", () => ({
  ...jest.requireActual("../../api/call"),
  asyncApiCall: jest.fn(),
}));

describe("makeSequentialSimulationRequests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given a list of successful requests", () => {
    test("it should process all requests sequentially and return successful results", async () => {
      const requests = [
        {
          year: 2020,
          path: "/api/simulation",
          body: { policy: "test" },
          interval: 1000,
          firstInterval: 200,
        },
        {
          year: 2021,
          path: "/api/simulation",
          body: { policy: "test" },
          interval: 1000,
          firstInterval: 200,
        },
        {
          year: 2022,
          path: "/api/simulation",
          body: { policy: "test" },
          interval: 1000,
          firstInterval: 200,
        },
      ];

      const mockResponses = [
        { result: { budget: { impact: 1.5e9 } } },
        { result: { budget: { impact: 2.3e9 } } },
        { result: { budget: { impact: 3.1e9 } } },
      ];

      // Mock successful responses
      callModule.asyncApiCall
        .mockResolvedValueOnce(mockResponses[0])
        .mockResolvedValueOnce(mockResponses[1])
        .mockResolvedValueOnce(mockResponses[2]);

      const result = await makeSequentialSimulationRequests(requests);

      expect(callModule.asyncApiCall).toHaveBeenCalledTimes(3);
      expect(callModule.asyncApiCall).toHaveBeenNthCalledWith(
        1,
        requests[0].path,
        requests[0].body,
        requests[0].interval,
        requests[0].firstInterval,
      );
      expect(callModule.asyncApiCall).toHaveBeenNthCalledWith(
        2,
        requests[1].path,
        requests[1].body,
        requests[1].interval,
        requests[1].firstInterval,
      );
      expect(callModule.asyncApiCall).toHaveBeenNthCalledWith(
        3,
        requests[2].path,
        requests[2].body,
        requests[2].interval,
        requests[2].firstInterval,
      );

      expect(result).toEqual({
        results: [
          {
            status: "success",
            requestIndex: 0,
            simulationRequestSetup: requests[0],
            result: mockResponses[0].result,
            error: null,
          },
          {
            status: "success",
            requestIndex: 1,
            simulationRequestSetup: requests[1],
            result: mockResponses[1].result,
            error: null,
          },
          {
            status: "success",
            requestIndex: 2,
            simulationRequestSetup: requests[2],
            result: mockResponses[2].result,
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
        {
          year: 2020,
          path: "/api/simulation",
          body: { policy: "test" },
          interval: 1000,
          firstInterval: 200,
        },
        {
          year: 2021,
          path: "/api/simulation",
          body: { policy: "test" },
          interval: 1000,
          firstInterval: 200,
        },
      ];

      callModule.asyncApiCall
        .mockResolvedValueOnce({ result: { budget: { impact: 1.5e9 } } })
        .mockResolvedValueOnce({ result: { budget: { impact: 2.3e9 } } });

      const onComplete = jest.fn();

      await makeSequentialSimulationRequests(requests, onComplete);

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
        {
          year: 2020,
          path: "/api/simulation",
          body: { policy: "test" },
          interval: 1000,
          firstInterval: 200,
        },
        {
          year: 2021,
          path: "/api/simulation",
          body: { policy: "test" },
          interval: 1000,
          firstInterval: 200,
        },
        {
          year: 2022,
          path: "/api/simulation",
          body: { policy: "test" },
          interval: 1000,
          firstInterval: 200,
        },
      ];

      const mockError = new Error("API Error");
      mockError.response = { status: 404, data: "Not Found" };
      mockError.config = {
        url: "/api/simulation",
        data: JSON.stringify({ policy: "test" }),
      };
      mockError.request = requests[1]; // Include the request setup in the error

      // First request succeeds, second fails, third succeeds
      callModule.asyncApiCall
        .mockResolvedValueOnce({ result: { budget: { impact: 1.5e9 } } })
        .mockRejectedValueOnce(mockError)
        .mockResolvedValueOnce({ result: { budget: { impact: 3.1e9 } } });

      const result = await makeSequentialSimulationRequests(requests);

      expect(callModule.asyncApiCall).toHaveBeenCalledTimes(3);
      expect(result.results[0].status).toBe("success");
      expect(result.results[1].status).toBe("error");
      expect(result.results[1].error).toEqual({
        message: "API Error",
        statusCode: 404,
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

  describe("Given an empty requests array", () => {
    test("it should return empty results with zero counts", async () => {
      const requests = [];

      const result = await makeSequentialSimulationRequests(requests);

      expect(callModule.asyncApiCall).not.toHaveBeenCalled();
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

      await expect(
        makeSequentialSimulationRequests(requests),
      ).rejects.toThrow();
      expect(console.error).toHaveBeenCalledWith(
        "Sequential requests failed:",
        expect.any(Error),
      );
    });
  });
});
