import { countryApiCall } from "./call.js";
import * as yup from "yup";

export const RequestSetup = yup.object({
  countryId: yup.string().required(),
  path: yup.string().required(),
  body: yup.object().notRequired(),
  method: yup.string().notRequired(),
  secondAttempt: yup.boolean().notRequired(),
  fetchMethod: yup.mixed().notRequired(), // Note: yup has no function validator
});

export const SequentialResult = yup.object({
  status: yup.string().required(),
  requestIndex: yup.number().required(),
  requestSetup: RequestSetup.required(),
  response: yup.object().notRequired(),
  error: yup
    .object({
      message: yup.string().notRequired(),
      status: yup.number().notRequired(),
      data: yup.mixed().notRequired(),
    })
    .notRequired()
    .default(null),
});

/**
 * Make sequential API requests, waiting for each to complete before starting the next
 * @param {Array<RequestSetup>} requests - Array of RequestSetup objects; keys and values correspond with apiCall args
 * @param {Function} [onComplete = null] - Optional callback for when an individual request completes
 * @returns {Promise<Object>} - Promise resolving to a formatted object containing the results of each request
 * and a summary of the request process
 * The return Object contains the following keys:
 * - results {Array<SequentialResult>}: Array of SequentialResult instances
 */

export async function makeSequentialRequests(requests, onComplete = null) {
  const results = [];
  let successCount = 0;
  let errorCount = 0;

  try {
    for (let i = 0; i < requests.length; i++) {
      const requestSetup = requests[i];

      try {
        // Make the request and wait for it to complete
        const response = await countryApiCall(
          requestSetup.countryId,
          requestSetup.path,
          requestSetup.body,
          requestSetup.method,
          requestSetup.secondAttempt,
          requestSetup.fetchMethod,
        );

        const validResult = SequentialResult.cast({
          status: "success",
          requestIndex: i,
          requestSetup: requestSetup,
          response: response,
        });

        results.push(validResult);

        successCount++;
      } catch (error) {
        console.error(`Request ${i + 1} failed:`, error.message);

        results.push(
          SequentialResult.cast({
            status: "error",
            requestIndex: i,
            error: {
              message: error.message,
              status: error.response?.status,
              data: error.response?.data,
            },
            requestSetup: requestSetup,
          }),
        );

        errorCount++;
      } finally {
        // Call the onComplete callback if provided
        if (onComplete) {
          onComplete({
            current: i,
            total: requests.length,
            successCount,
            errorCount,
          });
        }
      }
    }

    return {
      results,
      summary: {
        total: requests.length,
        successes: successCount,
        errors: errorCount,
      },
    };
  } catch (error) {
    // Handle any unexpected errors in the main function
    console.error("Sequential requests failed:", error);
    throw error;
  }
}
