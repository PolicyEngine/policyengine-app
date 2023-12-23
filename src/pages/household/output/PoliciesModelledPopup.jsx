import { CheckCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { getValueFromHousehold } from "../../../api/variables";
import Button from "../../../controls/Button";

function PoliciesModelledChecklist(props) {
  const { metadata, householdInput } = props;
  if (!metadata.modelled_policies || !metadata.modelled_policies.filtered) {
    return null;
  }
  const modelledPolicies = metadata.modelled_policies;
  let modelledNames = modelledPolicies.core.modelled || [];
  let notModelledNames = modelledPolicies.core.not_modelled || [];
  for (const variable of Object.keys(modelledPolicies.filtered)) {
    for (const value of Object.keys(modelledPolicies.filtered[variable])) {
      // Check if the household input matches the filter
      const actualValue = getValueFromHousehold(
        variable,
        2023,
        "your household",
        householdInput,
        metadata,
      );
      if (actualValue === value) {
        modelledNames = modelledNames.concat(
          modelledPolicies.filtered[variable][value].modelled || [],
        );
        notModelledNames = notModelledNames.concat(
          modelledPolicies.filtered[variable][value].not_modelled || [],
        );
      }
    }
  }
  const modelledSteps = modelledNames.map((name) => {
    return (
      <div
        key={name}
        style={{ display: "flex", padding: 5, alignItems: "center" }}
      >
        <CheckCircleFilled style={{ color: "green", fontSize: 20 }} />
        <div style={{ marginLeft: 10 }}>{name}</div>
      </div>
    );
  });
  const notModelledSteps = notModelledNames.concat(["+ more"]).map((name) => {
    return (
      <div
        key={name}
        style={{ display: "flex", padding: 5, alignItems: "center" }}
      >
        <div style={{ marginLeft: 10 }}>{name}</div>
      </div>
    );
  });
  return (
    <div style={{ textAlign: "center" }}>
      {modelledSteps}
      {notModelledNames.length > 0 && (
        <>
          <h6 style={{ marginTop: 10 }}>Coming soon</h6>
          <div>{notModelledSteps}</div>
        </>
      )}

      <p>
        PolicyEngine results may not constitute exact tax liabilities or benefit
        entitlements.
      </p>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          type="primary"
          onClick={() => Modal.destroyAll()}
          text="See my results"
        />
      </div>
    </div>
  );
}

export default function PoliciesModelledPopup(props) {
  const [needToOpenModal, setNeedToOpenModal] = useState(true);
  const {
    metadata,
    householdInput,
    hasShownHouseholdPopup,
    setHasShownHouseholdPopup,
  } = props;
  useEffect(() => {
    const openModal = () => {
      Modal.info({
        title: "PolicyEngine estimates your taxes and benefits",
        content: (
          <>
            <PoliciesModelledChecklist
              metadata={metadata}
              householdInput={householdInput}
            />
          </>
        ),
        style: {
          borderRadius: 25,
        },
        okButtonProps: {
          style: {
            display: "none",
          },
        },
        icon: null,
        closable: false,
        keyboard: true,
      });
    };
    if (
      needToOpenModal &&
      !!metadata.modelled_policies &&
      !hasShownHouseholdPopup
    ) {
      openModal();
      setNeedToOpenModal(false);
      setHasShownHouseholdPopup(true);
    }
  }, [
    needToOpenModal,
    metadata,
    householdInput,
    hasShownHouseholdPopup,
    setHasShownHouseholdPopup,
  ]);
  return null;
}
