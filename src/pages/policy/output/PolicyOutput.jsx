import React from "react";
import { DisplayEmpty, LowLevelDisplay } from "./Display";
import PolicyReproducibility from "./PolicyReproducibility";
import {
  FetchAndDisplayCliffImpact,
  FetchAndDisplayImpact,
} from "./FetchAndDisplayImpact";

export default function PolicyOutput(props) {
  const urlParams = new URLSearchParams(window.location.search);
  const focus = urlParams.get("focus");
  const reformPolicyId = urlParams.get("reform");
  let impactType = null;
  if (focus !== "policyOutput") {
    impactType = /policyOutput\.(.+)/.exec(focus)[1];
  }

  if (!reformPolicyId) {
    return <DisplayEmpty />;
  }
  const { metadata, policy } = props;
  if (impactType === "codeReproducibility") {
    return (
      <LowLevelDisplay {...props}>
        <PolicyReproducibility metadata={metadata} policy={policy} />;
      </LowLevelDisplay>
    );
  } else if (impactType === "cliffImpact") {
    return <FetchAndDisplayCliffImpact {...props} />;
  }
  return <FetchAndDisplayImpact {...props} />;
}
