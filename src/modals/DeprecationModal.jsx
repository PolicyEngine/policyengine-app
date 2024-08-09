import { useState } from "react";

import { Modal } from "antd";
import Button from "../controls/Button";
import useCountryId from "../hooks/useCountryId";

export default function DeprecationModal(props) {
  const { newPolicy, countryVersion } = props;

  const [isModalOpen, setIsModalOpen] = useState(true);

  const countryId = useCountryId();

  async function handleSubmit() {

    // Destroy modal
    setIsModalOpen(false);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

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
      <p>{`Unfortunately, as of policyengine-${countryId} v.${countryVersion}, some of your parameters are no longer supported.`}
      </p>
      <p>{`Click the button on the left below to transfer your remaining valid parameters to a new policy.`}</p>
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
          <Button text="Transfer parameters" onClick={handleSubmit} width="100%" />
          <Button
            text="Not at this time"
            type="secondary"
            width="100%"
            onClick={handleCloseModal}
          />
        </div>
      </div>
    </Modal>
  );
}

