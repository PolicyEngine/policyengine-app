import { useEffect, useRef, useState } from "react";
import { DisplayError, DisplayImpact, DisplayWait } from "./Display";
import { useSearchParams } from "react-router-dom";
import { asyncApiCall, copySearchParams, apiCall } from "../../../api/call";
import { defaultYear } from "data/constants";
import { areObjectsSame } from "../../../data/areObjectsSame";
import { updateUserPolicy } from "../../../api/userPolicies";
import useCountryId from "../../../hooks/useCountryId";
import { wrappedResponseJson } from "../../../data/wrappedJson";
import LoadingCentered from "layout/LoadingCentered";
import {
  makeSequentialSimulationRequests,
  SimulationRequestSetup,
} from "../../../api/makeSequentialSimulationRequests";
import { determineIfMultiYear } from "./utils";
import { aggregateMultiYearBudgets } from "../../../api/societyWideAggregation/aggregate";

/**
 *
 * This component fetches the impact data for all impact types except cliff. It
 * displays a progress bar while the data is fetched. It displays an error if
 * one is encountered. If the impact is fetched successfully, then it displays
 * the impact using charts and buttons for performing actions such as
 * downloading data and sharing results.
 *
 * @param {object} props
 * @param {object} props.policy the policy object
 * @param {object} props.metadata the metadata object
 * @returns a component for fetching the impact data and communicating relevant
 * information to the user
 */
export function FetchAndDisplayImpact(props) {
  const { metadata, policy, userPolicyId, showPolicyImpactPopup } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get("region");
  const dataset = searchParams.get("dataset");
  const timePeriod = searchParams.get("timePeriod");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId = searchParams.get("baseline");
  const maxHouseholds = searchParams.get("mode") === "lite" ? 10_000 : null;
  const renamed = searchParams.get("renamed");
  const simYears = searchParams.get("simYears"); // Number of years to run for multi-year simulations
  const isMultiYear = determineIfMultiYear(searchParams);

  const [impact, setImpact] = useState(null);
  const [singleYearResults, setSingleYearResults] = useState(null); // Only used for multi-year simulations
  const [multiYearImpact, setMultiYearImpact] = useState(null); // Only used for multi-year simulations
  const [error, setError] = useState(null);
  const [averageImpactTime, setAverageImpactTime] = useState(20);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [queuePos, setQueuePos] = useState("");

  const policyRef = useRef(null);
  const countryId = useCountryId();

  /**
   * Callback function utilized within asyncApiCall to
   * display the queue position to the user
   * @param {Object} data The data output within asyncApiCall to be consumed by the callback
   * @returns {Void}
   */
  function computingCallback(data) {
    // Position in queue message only occurs with average_time
    // in the response object; if this is present, enable message
    if (data.queue_position) {
      setQueuePos(data.queue_position);
    }
  }

  useEffect(() => {
    /**
     * Setup multi-year request objects required by makeSequentialRequests
     * @param {String} countryId
     * @param {Number} reformPolicyId
     * @param {Number} baselinePolicyId
     * @param {String} region
     * @param {String | Number} timePeriod
     * @param {String} version
     * @param {String | Number} maxHouseholds
     * @param {String} dataset
     * @param {String | Number} simYears
     * @returns {Array<SimulationRequestSetup>} Array of RequestSetup objects
     */
    function setupMultiYearRequests(
      countryId,
      reformPolicyId,
      baselinePolicyId,
      region,
      timePeriod,
      version,
      maxHouseholds,
      dataset,
      simYears,
    ) {
      const INTERVAL = 1_000; // Chosen to match single-sim run interval lengths
      let requests = [];

      const datasetInput = dataset ? `&dataset=${dataset}` : "";
      const maxHouseholdInput = maxHouseholds
        ? `&max_households=${maxHouseholds}`
        : "";

      for (let i = 0; i < simYears; i++) {
        const yearOfSim = Number(timePeriod) + i;
        const url =
          `/${countryId}/economy/${reformPolicyId}/over/` +
          `${baselinePolicyId}?region=${region}&time_period=${yearOfSim}` +
          `&version=${version}${maxHouseholdInput}${datasetInput}`;

        requests.push(
          SimulationRequestSetup.cast({
            year: yearOfSim,
            path: url,
            interval: INTERVAL,
            firstInterval: INTERVAL,
          }),
        );
      }

      return requests;
    }

    /**
     * Runs multi-year requests
     * @param {String} countryId
     * @param {Number} reformPolicyId
     * @param {Number} baselinePolicyId
     * @param {String} region
     * @param {String | Number} timePeriod
     * @param {String} version
     * @param {String | Number} maxHouseholds
     * @param {String} dataset
     * @param {Number} simYears
     * @returns {Object<Array<SequentialSimulationResult>, SocietyWideImpact>} Object containing singleYearResults and aggregatedResult
     */
    async function runMultiYearRequests(
      countryId,
      reformPolicyId,
      baselinePolicyId,
      region,
      timePeriod,
      version,
      maxHouseholds,
      dataset,
      simYears,
    ) {
      // Set up requests array
      const requests = setupMultiYearRequests(
        countryId,
        reformPolicyId,
        baselinePolicyId,
        region,
        timePeriod,
        version,
        maxHouseholds,
        dataset,
        simYears,
      );

      // Make sequential requests
      const collection = await makeSequentialSimulationRequests(requests);

      const singleYearResults = collection.results.map((item) => item);
      const singleYearImpacts = singleYearResults.map((item) => item.result);

      // Aggregate budgetary impacts and place into Impact-like object with budget key
      const aggregatedResult = {
        budget: aggregateMultiYearBudgets(countryId, singleYearImpacts),
      };

      return {
        singleYearResults: singleYearResults,
        aggregatedResult: aggregatedResult,
      };
    }

    if (
      areObjectsSame(policy?.reform?.data, policyRef.current?.reform?.data) &&
      areObjectsSame(
        policy?.baseline?.data,
        policyRef.current?.baseline?.data,
      ) &&
      renamed
    ) {
      return;
    }

    if (!!region && !!timePeriod && !!reformPolicyId && !!baselinePolicyId) {
      const selectedVersion = searchParams.get("version") || metadata.version;
      const maxHouseholdString = maxHouseholds
        ? `&max_households=${maxHouseholds}`
        : "";
      const datasetString = dataset ? `&dataset=${dataset}` : "";
      const url =
        `/${metadata.countryId}/economy/${reformPolicyId}/over/` +
        `${baselinePolicyId}?region=${region}&time_period=${timePeriod}` +
        `&version=${selectedVersion}${maxHouseholdString}${datasetString}`;
      setImpact(null);
      setMultiYearImpact(null);
      setSingleYearResults(null);
      setError(null);
      // If user requests valid multi-year value, make sequential requests
      if (isMultiYear) {
        runMultiYearRequests(
          metadata.countryId,
          reformPolicyId,
          baselinePolicyId,
          region,
          timePeriod,
          selectedVersion,
          maxHouseholds,
          dataset,
          simYears,
        )
          .then((aggregatedData) => {
            setMultiYearImpact(aggregatedData.aggregatedResult);
            setSingleYearResults(aggregatedData.singleYearResults);
          })
          .catch((err) => {
            setError(err);
          });

        return;
      }

      // start counting (but stop when the API call finishes)
      const interval = setInterval(() => {
        setSecondsElapsed((secondsElapsed) => secondsElapsed + 1);
      }, 1000);
      apiCall(url, null)
        .then((res) => wrappedResponseJson(res))
        .then((intermediateData) => {
          if (averageImpactTime === 20) {
            setAverageImpactTime(intermediateData.average_time || 20);
          }
        });
      asyncApiCall(url, null, 1_000, 1_000, computingCallback)
        .then((data) => {
          if (data.status === "error") {
            if (!data.result.baseline_economy) {
              data.result.baseline_economy = {
                status: "error",
                message: "An error outside the baseline economy computation.",
              };
            }
            if (!data.result.reform_economy) {
              data.result.reform_economy = {
                status: "error",
                message: "An error outside the baseline economy computation.",
              };
            }
            if (data.message) {
              data.result.message = data.message;
            }
            setError(data.result);
            setSecondsElapsed(0);
            clearInterval(interval);
          } else {
            setImpact(data.result);
            setSecondsElapsed(0);
            clearInterval(interval);
          }
        })
        .catch((err) => {
          setError(err);
          setSecondsElapsed(0);
          clearInterval(interval);
        });
    } else {
      const timeOptions = metadata.economy_options.time_period;

      const yearArray = timeOptions.reduce((accu, periodObj) => {
        return [...accu, Number(periodObj.name)];
      }, []);

      const defaultTimePeriod = yearArray.includes(defaultYear)
        ? defaultYear
        : timeOptions[0].name;

      const defaults = {
        region: metadata.economy_options.region[0].name,
        timePeriod: defaultTimePeriod,
        baseline: metadata.current_law_id,
      };
      let newSearch = copySearchParams(searchParams);
      // Set missing query parameters to their defaults.
      newSearch.set("region", searchParams.get("region") || defaults.region);
      newSearch.set(
        "timePeriod",
        searchParams.get("timePeriod") || defaults.timePeriod,
      );
      newSearch.set(
        "baseline",
        searchParams.get("baseline") || defaults.baseline,
      );
      setSearchParams(newSearch, { replace: true });
    }
    policyRef.current = policy;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    region,
    dataset,
    timePeriod,
    reformPolicyId,
    baselinePolicyId,
    maxHouseholds,
    simYears,
  ]);

  useEffect(() => {
    if (!impact || !userPolicyId || !countryId) return;

    const updatedUserPolicy = {
      id: userPolicyId,
      budgetary_impact: impact.budget.budgetary_impact,
    };

    updateUserPolicy(countryId, updatedUserPolicy).then((updatedPolicyId) => {
      if (!updatedPolicyId) {
        console.error("Error while updating user policy:");
      }
    });
  }, [impact, countryId, userPolicyId]);

  if (error) {
    return <DisplayError />;
  }

  if (
    (!isMultiYear && !impact) ||
    (isMultiYear && !multiYearImpact && !singleYearResults)
  ) {
    return (
      <DisplayWait
        averageImpactTime={averageImpactTime}
        secondsElapsed={secondsElapsed}
        queuePos={queuePos}
      />
    );
  }

  return (
    <DisplayImpact
      impact={impact}
      multiYearImpact={multiYearImpact}
      singleYearResults={singleYearResults}
      policy={policy}
      metadata={metadata}
      showPolicyImpactPopup={showPolicyImpactPopup}
    />
  );
}

/**
 *
 * This component fetches the cliff impact data. It displays a message while the
 * data is fetched. It displays an error if one is encountered. If the impact is
 * fetched successfully, then it displays the impact using charts and buttons
 * for performing actions such as downloading data and sharing results.
 *
 * @param {object} props
 * @param {object} props.policy the policy object
 * @param {object} props.metadata the metadata object
 * @returns a component for fetching the cliff impact data and communicating
 * relevant information to the user
 */
export function FetchAndDisplayCliffImpact(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get("region");
  const timePeriod = searchParams.get("timePeriod");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId = searchParams.get("baseline");
  const dataset = searchParams.get("dataset");

  const [impact, setImpact] = useState(null);
  const [error, setError] = useState(null);
  const { metadata, policy } = props;
  useEffect(() => {
    if (!!region && !!timePeriod && !!reformPolicyId && !!baselinePolicyId) {
      const url =
        `/${metadata.countryId}/economy/${reformPolicyId}/over/${baselinePolicyId}` +
        `?region=${region}&time_period=${timePeriod}&target=cliff&dataset=${dataset}`;
      setImpact(null);
      setError(null);
      asyncApiCall(url, null, 5_000)
        .then((data) => {
          if (data.status === "error") {
            setError(data.message);
          } else {
            setImpact(data.result);
          }
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      const timeOptions = metadata.economy_options.time_period;

      const yearArray = timeOptions.reduce((accu, periodObj) => {
        return [...accu, Number(periodObj.name)];
      }, []);

      const defaultTimePeriod = yearArray.includes(defaultYear)
        ? defaultYear
        : timeOptions[0].name;

      const defaults = {
        region: metadata.economy_options.region[0].name,
        timePeriod: defaultTimePeriod,
        baseline: metadata.current_law_id,
      };
      let newSearch = copySearchParams(searchParams);
      // Set missing query parameters to their defaults.
      newSearch.set("region", searchParams.get("region") || defaults.region);
      newSearch.set(
        "timePeriod",
        searchParams.get("timePeriod") || defaults.timePeriod,
      );
      newSearch.set(
        "baseline",
        searchParams.get("baseline") || defaults.baseline,
      );
      setSearchParams(newSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, timePeriod, reformPolicyId, baselinePolicyId, dataset]);

  if (error) {
    return <DisplayError error={error} />;
  }

  if (!impact) {
    return <LoadingCentered message="Computing the cliff impact..." />;
  }

  return <DisplayImpact impact={impact} policy={policy} metadata={metadata} />;
}
