import {
  SocietyWideImpactUK,
  SocietyWideImpactUS,
} from "../schemas/societyWideImpact.js";
import { asyncApiCall } from "./call.js";
import * as yup from "yup";

export const SimulationRequestSetup = yup.object({
  year: yup.number().required(),
  path: yup.string().required(),
  body: yup.object().notRequired().default(null),
  interval: yup.number().default(1000),
  firstInterval: yup.number().default(200),
});

export const SequentialSimulationResult = yup.object({
  status: yup.string().required(),
  requestIndex: yup.number().required(),
  simulationRequestSetup: SimulationRequestSetup.required(),
  result: yup.mixed().oneOf([SocietyWideImpactUK, SocietyWideImpactUS]),
  error: yup
    .object({
      message: yup.string().notRequired(),
      statusCode: yup.number().notRequired(),
      data: yup.mixed().notRequired(),
    })
    .notRequired()
    .default(null),
});

export const SequentialSimulationResultCollection = yup.object({
  results: yup.array(SequentialSimulationResult).required(),
  summary: yup
    .object({
      total: yup.number().required(),
      successes: yup.number().required(),
      errors: yup.number().required(),
    })
    .required(),
});

/**
 * Make sequential requests to the simulation worker and API, waiting for each to complete before starting the next
 * @param {Array<SimulationRequestSetup>} requests - Array of SimulationRequestSetup objects; keys and values correspond with apiCall args
 * @param {Function} [onComplete = null] - Optional callback for when an individual request completes
 * @returns {Promise<SequentialSimulationResultCollection>} - Promise resolving to a formatted object containing the results of each request
 * and a summary of the request process
 * The return Object contains the following keys:
 * - results {Array<SequentialResult>}: Array of SequentialResult instances
 */

export async function makeSequentialSimulationRequests(
  requests,
  onComplete = null,
) {
  const results = [];
  let successCount = 0;
  let errorCount = 0;

  try {
    for (let i = 0; i < requests.length; i++) {
      const requestSetup = requests[i];

      try {
        // Make the request and wait for it to complete
        const response = await asyncApiCall(
          requestSetup.path,
          requestSetup.body,
          requestSetup.interval,
          requestSetup.firstInterval,
        );

        results.push(
          SequentialSimulationResult.cast({
            status: "success",
            requestIndex: i,
            simulationRequestSetup: requestSetup,
            result: response.result,
          }),
        );

        successCount++;
      } catch (error) {
        console.error(`Request ${i + 1} failed:`, error.message);

        results.push(
          SequentialSimulationResult.cast({
            status: "error",
            requestIndex: i,
            error: {
              message: error.message,
              statusCode: error.response?.status,
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
