import { Modal } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import Button from "../../../controls/Button";

export default function PolicyImpactPopup(props) {
  const [needToOpenModal, setNeedToOpenModal] = useState(true);
  const {
    metadata,
    hasShownPopulationImpactPopup,
    setHasShownPopulationImpactPopup,
  } = props;
  const content = (
    <div style={{ marginLeft: '10%' }}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {metadata.countryId === "us" ? (
          <p>
            PolicyEngine estimates reform impacts using microsimulation.{" "}
            <a
              href="/us/research/enhancing-the-current-population-survey-for-policy-analysis"
              target="_blank"
            >
              Learn more
            </a>
          </p>
        ) : (
          <p>
            PolicyEngine estimates reform impacts using microsimulation.{" "}
            <a href="/uk/research/how-machine-learning-tools-make-policyengine-more-accurate">
              Learn more
            </a>
          </p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20, width: '100%' }}>
        <Button
          type="primary"
          onClick={() => Modal.destroyAll()}
          text="See the results"
        />
      </div>
    </div>
  );
  useEffect(() => {
    const openModal = () => {
      Modal.info({
        title:
          "PolicyEngine simulates your reform over thousands of households",
        content: content,
        style: {
          borderRadius: 25,
          margin: '20%'
        },
        okButtonProps: {
          style: {
            display: "none",
          },
        },
        icon: null,
        closable: false,
        keyboard: true,
        centered: true,
      });
    };
    if (needToOpenModal && !hasShownPopulationImpactPopup) {
      openModal();
      setNeedToOpenModal(false);
      setHasShownPopulationImpactPopup(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    needToOpenModal,
    metadata,
    hasShownPopulationImpactPopup,
    setHasShownPopulationImpactPopup,
  ]);
  return null;
}
