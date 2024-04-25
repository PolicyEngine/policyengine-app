import { Modal } from "antd";
import { useState } from "react";
import Button from "../controls/Button";

export default function PolicyImpactPopup(props) {
  const [needToOpenModal, setNeedToOpenModal] = useState(true);
  const { metadata, showPolicyImpactPopup } = props;

  function handleSubmit() {
    // Destroy modal
    setNeedToOpenModal(false);
  }

  const US_LINK =
    "/us/research/enhancing-the-current-population-survey-for-policy-analysis";
  const UK_LINK =
    "/uk/research/how-machine-learning-tools-make-policyengine-more-accurate";

  if (!showPolicyImpactPopup) {
    return null;
  }

  return (
    <Modal open={needToOpenModal} footer={null} closable={false}>
      <h6
        style={{
          marginBottom: "12px",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        PolicyEngine simulates your reform over thousands of households{" "}
      </h6>
      <p
        style={{
          marginBottom: "16px",
        }}
      >
        PolicyEngine estimates reform impacts using microsimulation.{" "}
        <a
          href={metadata.countryId === "us" ? US_LINK : UK_LINK}
          target="_blank"
          rel="noreferrer"
        >
          Learn more
        </a>
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button type="primary" onClick={handleSubmit} text="See the results" />
      </div>
    </Modal>
  );
}
