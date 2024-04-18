import { apiCall } from "./call";

const USER_POLICY_ENDPOINT = "/user_policy";

export async function postUserPolicy(countryId, policyToAdd) {

  try {
    const res = await apiCall(
      `/${countryId}${USER_POLICY_ENDPOINT}`,
      policyToAdd,
      "POST"
    );
    const resJSON = await res.json();
    // If the record already exists...
    if (res.status === 200 && resJSON.status === "ok") {
      // Update the API version and updated_date fields
      await updateUserPolicy(countryId, policyToAdd, resJSON.result.id);
    }
    if (resJSON.status !== "ok") {
      console.error("Error while POSTing user policy:");
      console.error(resJSON.message);
    } 
  } catch (err) {
    console.error("Network-related error while POSTing user policy:");
    console.error(err);
  }
}

export async function updateUserPolicy(countryId, policyToAdd, userPolicyId) {
  const updatedPolicy = {
    id: userPolicyId,
    api_version: policyToAdd.api_version,
    updated_date: policyToAdd.updated_date
  };

  try {
    const res = await apiCall(
      `/${countryId}${USER_POLICY_ENDPOINT}`,
      updatedPolicy,
      "PUT"
    );
    const resJson = await res.json();
    if (resJson.status !== "ok") {
      console.error("Error while POSTing user policy:");
      console.error(resJson.message);
    }
  } catch (err) {
    console.error("Network-related error while updating user policy:");
    console.error(err);
  }
}

export function cullOldPolicies(policies) {
  const currentDate = Date.now();
  const VALID_PERIOD_IN_MS = 1000 * 60 * 60 * 24 * 14 // 14 days in MS
  const filteredPolicies = policies.filter((policy) => {
    return (Math.abs(currentDate - policy.created_at) < VALID_PERIOD_IN_MS);
  }); 
  return filteredPolicies;
}
