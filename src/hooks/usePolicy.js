import { useQuery, useQueryClient } from "@tanstack/react-query";
import { copySearchParams, countryApiCall } from "../api/call";
import { COUNTRY_BASELINE_POLICIES, COUNTRY_CODES } from "../data/countries";
import { useSearchParams } from "react-router-dom";
import useMetadata from "./useMetadata";
import { extractCountryId } from "../pages/policy/output/utils";
async function getPolicy({ queryKey }) {
  const [, countryId, policyId] = queryKey;
  try {
    const response = await countryApiCall(countryId, `/policy/${policyId}`);
    const dataHolder = await response.json();

    if (dataHolder.result.label === "None") {
      dataHolder.result.label = null;
    }

    return {
      data: dataHolder.result.policy_json,
      label: dataHolder.result.label,
      id: policyId,
    };
  } catch (error) {
    console.error("Error fetching policy:", error);
    throw error; // Rethrow to allow react-query to handle it
  }
}
const usePolicy = () => {
  const countryId = extractCountryId();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { isMetadataSuccess } = useMetadata();

  const defaultBaselinePolicy = COUNTRY_CODES.includes(countryId)
    ? COUNTRY_BASELINE_POLICIES[countryId]
    : 1;
  const reformPolicyId = searchParams.get("reform") || defaultBaselinePolicy;
  const baselinePolicyId =
    searchParams.get("baseline") || defaultBaselinePolicy;

  const {
    isPending: isBaselinePolicyLoading,
    data: baselinePolicy,
    isError: isBaselineError,
    error: baseLineError,
  } = useQuery({
    queryKey: ["policy", countryId, baselinePolicyId],
    queryFn: getPolicy,
    onSuccess: (baselinePolicy) => {
      policy.baseline = baselinePolicy;
    },
    enabled: isMetadataSuccess,
  });
  const {
    isPending: isReformPolicyLoading,
    data: reformPolicy,
    isError: isReformError,
    error: reformError,
    refetch,
  } = useQuery({
    queryKey: ["policy", countryId, reformPolicyId],
    queryFn: getPolicy,
    onSuccess: (reformPolicy) => {
      policy.reform = reformPolicy;
    },
    enabled: isMetadataSuccess,
  });
  // Check for the "renamed" search parameter
  const isRenamed = searchParams.get("renamed");

  //TODO call refetch instead of this logic
  // Invalidate and refetch when "renamed" is found
  if (isRenamed) {
    console.log("renamed query");

    queryClient.invalidateQueries(["policy", countryId, reformPolicyId]);
    // Optionally, you can remove the "renamed" parameter here if desired
    let newSearch = copySearchParams(searchParams);
    newSearch.delete("renamed");
    setSearchParams(newSearch);
  }
  const policy = {
    baseline: baselinePolicy || {
      id: baselinePolicyId,
      label: null,
      data: null,
    },
    reform: reformPolicy || { id: reformPolicyId, label: null, data: null },
  };
  return {
    isPolicyLoading: isBaselinePolicyLoading || isReformPolicyLoading,
    isPolicyError: isBaselineError || isReformError,
    error: baseLineError || reformError,
    policy,
    refetchReformPolicy: refetch,
  };
};

export default usePolicy;
