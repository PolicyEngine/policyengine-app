import { useEffect, useRef, useState } from "react";
import {
  DisplayError,
  DisplayImpact,
  DisplayWait,
  LowLevelDisplay,
} from "./Display";
import { useSearchParams } from "react-router-dom";
import { asyncApiCall, copySearchParams, apiCall } from "../../../api/call";
import ErrorPage from "layout/ErrorPage";
import { defaultYear } from "data/constants";
import { areObjectsSame } from "../../../data/areObjectsSame";
import { updateUserPolicy } from "../../../api/userPolicies";
import useCountryId from "../../../hooks/useCountryId";
// import LoadingCentered from "layout/LoadingCentered";

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
  const timePeriod = searchParams.get("timePeriod");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId = searchParams.get("baseline");
  const maxHouseholds = searchParams.get("mode") == "full" ? null : 10_000;
  const renamed = searchParams.get("renamed");

  const [impact, setImpact] = useState(null);
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
    /*
    if (data.average_time && data.message) {
      setQueueMsg(data.message);
    }
    */
    if (data.queue_position) {
      setQueuePos(data.queue_position);
    }
  }

  useEffect(() => {
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
      const url = `/${metadata.countryId}/economy/${reformPolicyId}/over/${baselinePolicyId}?region=${region}&time_period=${timePeriod}&version=${selectedVersion}${maxHouseholdString}`;
      setImpact(null);
      setError(null);
      // start counting (but stop when the API call finishes)
      const interval = setInterval(() => {
        setSecondsElapsed((secondsElapsed) => secondsElapsed + 1);
      }, 1000);
      apiCall(url, null)
        .then((res) => res.json())
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
  }, [region, timePeriod, reformPolicyId, baselinePolicyId, maxHouseholds]);

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
    return <DisplayError error={error} />;
  }

  if (!impact) {
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

  // Remove the following eslint ignore when cliff impacts are restored
  // eslint-disable-next-line no-unused-vars
  const [impact, setImpact] = useState(null);
  const [error, setError] = useState(null);
  const {
    metadata,
    // policy,
  } = props;
  useEffect(() => {
    if (!!region && !!timePeriod && !!reformPolicyId && !!baselinePolicyId) {
      const url = `/${metadata.countryId}/economy/${reformPolicyId}/over/${baselinePolicyId}?region=${region}&time_period=${timePeriod}&target=cliff`;
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
  }, [region, timePeriod, reformPolicyId, baselinePolicyId]);

  if (error) {
    return <DisplayError error={error} />;
  }

  // Remove the below block when cliff impacts are reinstated
  return (
    <LowLevelDisplay {...props}>
      <ErrorPage message="This service is temporarily unavailable. Please try again later." />
    </LowLevelDisplay>
  );

  /*
  if (!impact) {
    return <LoadingCentered message="Computing the cliff impact..." />;
  }

  return (
    <DisplayImpact
      impact={impact}
      policy={policy}
      metadata={metadata}
    />
  );
  */
}
