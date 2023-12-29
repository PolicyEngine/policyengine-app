import { Modal } from "antd";
import { useEffect, useState } from "react";
import Button from "../../../controls/Button";

export default function PolicyImpactPopup(props) {
  const [needToOpenModal, setNeedToOpenModal] = useState(true);
  const {
    metadata,
    hasShownPopulationImpactPopup,
    setHasShownPopulationImpactPopup,
  } = props;

  const countryLinks = {
    us: "/us/blog/2022-12-28-enhancing-the-current-population-survey-for-policy-analysis",
    uk: "/uk/blog/2022-03-07-how-machine-learning-tools-make-policyengine-more-accurate",
  };

  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: "8px",
      }}
    >
      <div>
        <p
          style={{
            textAlign: "left",
          }}
        >
          PolicyEngine estimates reform impacts using microsimulation.{" "}
          <a href={countryLinks[metadata.countryId]}>Learn more</a>
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
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
