import { apiCall } from "./call";

export async function postUserPolicy(countryId, policyToAdd) {
  try {
    const res = await apiCall(
      `/${countryId}/user_policy`,
      policyToAdd,
      "POST"
    );
    const resJSON = await res.json();
    if (resJSON.status !== "ok") {
      console.error("Error within PolicyOutput component:");
      console.error(resJSON.message);
    } 
  } catch (err) {
    console.error("Error within PolicyOutput component:");
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
