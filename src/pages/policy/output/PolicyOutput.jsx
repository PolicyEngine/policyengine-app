import { useEffect, useState } from "react";
import { DisplayEmpty, LowLevelDisplay } from "./Display";
import PolicyReproducibility from "./PolicyReproducibility";
import {
  FetchAndDisplayCliffImpact,
  FetchAndDisplayImpact,
} from "./FetchAndDisplayImpact";
import { getCookie } from "../../../data/cookies";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useAuth0 } from "@auth0/auth0-react";
import useCountryId from "../../../hooks/useCountryId";
import { postUserPolicy, cullOldPolicies } from "../../../api/userPolicies";
import SignupModal from "../../../modals/SignupModal";

export default function PolicyOutput(props) {
  const { metadata, policy, userProfile } = props;

  const [savedPolicies, setSavedPolicies] = useLocalStorage("saved-policies", []);
  const [userPolicyId, setUserPolicyId] = useState(null);
  const countryId = useCountryId();
  const { isAuthenticated, user } = useAuth0();

  const urlParams = new URLSearchParams(window.location.search);
  const focus = urlParams.get("focus");
  const reformPolicyId = urlParams.get("reform");
  const geography = urlParams.get("region");
  const timePeriod = urlParams.get("timePeriod");

  useEffect(() => {

    function addPolicyToLocalStorage(policyToAdd) {
      const filteredPolicies = cullOldPolicies(savedPolicies);
      // Make sure policy doesn't match another one
      const matches = filteredPolicies.filter((item) => item.reform_id === policyToAdd.reform_id && item.baseline_id === policyToAdd.baseline_id);
      if (matches.length > 0) {
        return;
      }
    
      // If it doesn't, save
      setSavedPolicies([
        ...filteredPolicies,
        policyToAdd
      ]); 
    }

    async function attribPolicyToUser() {
      // Create a policy object to save
      let policyToSave = {
        country_id: countryId,
        reform_label: policy.reform.label,
        reform_id: policy.reform.id,
        baseline_label: policy.baseline.label,
        baseline_id: policy.baseline.id,
        geography: geography,
        year: timePeriod,
        api_version: metadata.version,
        number_of_provisions: countProvisions(policy),
        added_date: Date.now(), 
        updated_date: Date.now() 
      };

      if (!isAuthenticated && getCookie("consent")) {
        addPolicyToLocalStorage(policyToSave);
      } else if (isAuthenticated) {
        // Also emit the current policy
        policyToSave = {
          ...policyToSave,
          user_id: userProfile.user_id
        };

        let failedAttempts = [];
        let userPolicyId = null;
        try {
          userPolicyId = await postUserPolicy(countryId, policyToSave);
        } catch (err) {
          failedAttempts = failedAttempts.concat(policyToSave);
        }

        // Finally, overwrite savedPolicies with fails (could be empty)
        setSavedPolicies(failedAttempts);
      }
    }

    if (countryId) {
      attribPolicyToUser();
    }
  }, [countryId]);

  let impactType = null;
  if (focus !== "policyOutput") {
    impactType = /policyOutput\.(.+)/.exec(focus)[1];
  }

  if (!reformPolicyId) {
    return <DisplayEmpty />;
  }
  if (impactType === "codeReproducibility") {
    return (
      <LowLevelDisplay {...props}>
        <PolicyReproducibility metadata={metadata} policy={policy} />
      </LowLevelDisplay>
    );
  } else if (impactType === "cliffImpact") {
    return <FetchAndDisplayCliffImpact {...props} />;
  }
  return (
    <>
      <SignupModal />
      <FetchAndDisplayImpact {...props} />
    </>
  );
}

/**
 * Counts number of unique provisions in the reform portion of a policy
 * @param {Object} policy 
 * @returns {Number}
 */
function countProvisions(policy) {
  const reformData = policy.reform.data;
  let count = 0;

  // For each provision, count the number of time-based changes, then
  // add that to count
  for (const provision in reformData) {
    count += Object.keys(reformData[provision]).length;
  }

  return count;

}
