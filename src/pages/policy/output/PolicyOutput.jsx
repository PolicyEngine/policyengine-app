import { useEffect } from "react";
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

export default function PolicyOutput(props) {
  const { metadata, policy } = props;

  const [savedPolicies, setSavedPolicies] = useLocalStorage("saved-policies", []);
  const countryId = useCountryId();
  const { isAuthenticated, user } = useAuth0();

  const urlParams = new URLSearchParams(window.location.search);
  const focus = urlParams.get("focus");
  const reformPolicyId = urlParams.get("reform");

  useEffect(() => {

    function attribPolicyToUser() {
      if (!isAuthenticated) {
        // Create a policy object to save
        const policyToSave = {
          country_id: countryId,
          reform_label: policy.reform.label,
          reform_id: policy.reform.id,
          baseline_label: policy.baseline.label,
          baseline_id: policy.baseline.id,
        };

        // Make sure it doesn't match another one
        const matches = savedPolicies.filter((item) => item.reform_id === policyToSave.reform_id && item.baseline_id === policyToSave.baseline_id);
        if (matches.length > 0) {
          return;
        }

        // If it doesn't, save
        setSavedPolicies([
          ...savedPolicies,
          policyToSave
        ]);
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
  return <FetchAndDisplayImpact {...props} />;
}
