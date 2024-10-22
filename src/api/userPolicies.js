import { wrappedResponseJson } from "../data/wrappedJson";
import { apiCall } from "./call";

const USER_POLICY_ENDPOINT = "/user-policy";

export async function postUserPolicy(countryId, policyToAdd) {
  // Prevent creation of records where baseline and reform are the same;
  // this is due to the fact that we link to the policy breakdown page,
  // which first tries to load current law, then updates via an effect
  // hook higher up in the application
  if (Number(policyToAdd.baseline_id) === Number(policyToAdd.reform_id)) {
    return null;
  }

  try {
    const res = await apiCall(
      `/${countryId}${USER_POLICY_ENDPOINT}`,
      policyToAdd,
      "POST",
    );
    const resJson = await wrappedResponseJson(res);
    // If the record already exists...
    if (res.status === 200 && resJson.status === "ok") {
      // Update the API version and updated_date fields
      const updatedPolicy = {
        id: resJson.result.id,
        api_version: policyToAdd.api_version,
        updated_date: policyToAdd.updated_date,
      };
      await updateUserPolicy(countryId, updatedPolicy);
      return resJson.result.id;
    } else if (resJson.status !== "ok") {
      console.error("Error while POSTing user policy:");
      console.error(resJson.message);
      return null;
    } else {
      return resJson.result.id;
    }
  } catch (err) {
    console.error("Network-related error while POSTing user policy:");
    console.error(err);
    return null;
  }
}

export async function updateUserPolicy(countryId, policyToAdd) {
  try {
    const res = await apiCall(
      `/${countryId}${USER_POLICY_ENDPOINT}`,
      policyToAdd,
      "PUT",
    );
    const resJson = await wrappedResponseJson(res);
    if (resJson.status !== "ok") {
      console.error("Error while POSTing user policy:");
      console.error(resJson.message);
      return null;
    } else {
      return resJson.result.id;
    }
  } catch (err) {
    console.error("Network-related error while updating user policy:");
    console.error(err);
    return null;
  }
}

export function cullOldPolicies(policies) {
  const currentDate = Date.now();
  const VALID_PERIOD_IN_MS = 1000 * 60 * 60 * 24 * 14; // 14 days in MS
  const filteredPolicies = policies.filter((policy) => {
    return Math.abs(currentDate - policy.added_date) < VALID_PERIOD_IN_MS;
  });
  return filteredPolicies;
}
