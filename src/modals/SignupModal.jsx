
import { useState } from "react";
import { Modal } from "antd";
import Button from "../controls/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { loginOptions } from "../auth/authUtils";
import useCountryId from "../hooks/useCountryId";

export default function SignupModal(props) {
  const {
    setShowPolicyImpactPopup
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(true);

  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  const countryId = useCountryId();

  async function handleSubmit() {
    const path = `${window.location.pathname}${window.location.search}`;
    loginWithRedirect(loginOptions(countryId, {redirectPath: path}));

    // Destroy modal
    setIsModalOpen(false);
    setShowPolicyImpactPopup(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setShowPolicyImpactPopup(true);
  }

  if (isLoading || isAuthenticated) {
    setShowPolicyImpactPopup(true);
    return null;
  }

  return (
    <Modal 
      open={isModalOpen}
      footer={null}
      closable={false}
    >
      <h6
        style={{
          paddingBottom: "16px",
          fontWeight: "bold",
          fontSize: 20
        }}
      >Save your results</h6>
      <p>Create a free PolicyEngine account to save your policy simulations.</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "12px",
          paddingTop: "12px"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            columnGap: "16px"
          }}
        >
          <Button 
            text="Sign in"
            onClick={handleSubmit}
            width="100%"
          />
          <Button
            text="Not at this time"
            type="textLight"
            width="100%"
            onClick={handleCloseModal}
          />
        </div>
      </div>
    </Modal>
  );
}