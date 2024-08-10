import { useState } from "react";

import { Modal } from "antd";
import Button from "../controls/Button";
import useCountryId from "../hooks/useCountryId";
import { getNewPolicyId } from "../api/parameters";
import { useSearchParams } from "react-router-dom";
import { copySearchParams } from "../api/call";
import style from "../style";

export default function DeprecationModal(props) {
  const { oldPolicy, countryVersion, metadata, deprecatedParams } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [error, setError] = useState(null);

  const countryId = useCountryId();

  async function handleSubmit() {
    // Remove deprecated parameters from policy
    const newPolicy = removeDeprecatedParams(metadata, oldPolicy);

    // Create new policy with parameters given
    const { baseline, reform } = newPolicy;

    let newBaselineId = null;
    let newReformId = null;

    try {
      if (!baseline.id) {
        const baselineRes = await getNewPolicyId(
          countryId,
          baseline.data,
          baseline.label,
        );
        if (!baselineRes.status === "ok") {
          console.error("Error creating new baseline policy");
          console.error(baselineRes);
          setError(
            "Error: Back-end error while trying to create new baseline policy; please try again later",
          );
        } else {
          newBaselineId = baselineRes.policy_id;
        }
      }
      if (!reform.id) {
        const reformRes = await getNewPolicyId(
          countryId,
          reform.data,
          reform.label,
        );
        if (!reformRes.status === "ok") {
          console.error("Error creating new baseline policy");
          console.error(reformRes);
          setError(
            "Error: Back-end error while trying to create new baseline policy; please try again later",
          );
        } else {
          newReformId = reformRes.policy_id;
        }
      }
    } catch (err) {
      console.error("Network error while trying to create new policy");
      console.error(err);
      setError(
        "Error: Network connection error while trying to create new policy; please try again later",
      );
    }

    // On success, redirect
    let newSearch = copySearchParams(searchParams);

    // If new policy IDs are created, set them in the URL,
    // otherwise use old; redirect to input section of calculator
    newSearch.set("baseline", newBaselineId || baseline.id);
    newSearch.set("reform", newReformId || reform.id);
    newSearch.set("focus", "gov");
    setSearchParams(newSearch);

    // Destroy modal
    setIsModalOpen(false);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  const deprecatedParamsJSX = deprecatedParams.map((param) => (
    <p key={param} style={{ fontStyle: "italic" }}>{`- ${param}`}</p>
  ));

  return (
    <Modal open={isModalOpen} footer={null} closable={false}>
      <h6
        style={{
          paddingBottom: "16px",
          fontWeight: 500,
          fontSize: 20,
        }}
      >
        Your policy is deprecated
      </h6>
      <p>
        {`Unfortunately, as of policyengine-${countryId} v.${countryVersion}, some of your parameters are no longer supported:`}
      </p>
      {deprecatedParamsJSX}
      <p>{`Click the button on the left to transfer your remaining valid parameters to a new policy.`}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "12px",
          paddingTop: "12px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            columnGap: "16px",
          }}
        >
          <Button
            text="Transfer parameters"
            onClick={handleSubmit}
            width="100%"
          />
          <Button
            text="Not at this time"
            type="secondary"
            width="100%"
            onClick={handleCloseModal}
          />
        </div>
        {error && <p style={{ color: style.colors.DARK_RED }}>{error}</p>}
      </div>
    </Modal>
  );
}

export function removeDeprecatedParams(metadata, policy) {
  const newPolicy = JSON.parse(JSON.stringify(policy));
  const baselineAndReform = Object.values(newPolicy);

  for (const item of baselineAndReform) {
    // Iterate over each provision

    // Handle current law, where data is null, and handle empty object
    if (!item.data || Object.keys(item.data).length === 0) {
      continue;
    } else {
      for (const provision in item.data) {
        if (!Object.keys(metadata.parameters).includes(provision)) {
          delete item.data[provision];

          // Null out ID to signal that this policy is now different
          item.id = null;
        }
      }
    }
  }
  return newPolicy;
}
