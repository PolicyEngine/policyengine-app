
import { useEffect, useState } from "react";
import { Modal } from "antd";
import colors from "../style/colors";
import bcrypt from "bcryptjs";
import { submitToMailchimp } from "../data/mailchimpSubscription";
import Button from "../controls/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { loginOptions } from "../auth/authUtils";
import useCountryId from "../hooks/useCountryId";
import style from "../redesign/style";

export default function SignupModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [submitMsg, setSubmitMsg] = useState("");
  const [isNewsletterChecked, setIsNewsletterChecked] = useState(true);

  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  const countryId = useCountryId();

  function handleNewsletterCheck() {
    setIsNewsletterChecked(prev => !prev);
  }

  async function handleSubmit() {

    loginWithRedirect(loginOptions(countryId, {add_to_mailchimp: isNewsletterChecked}));

    // Destroy modal
    setIsModalOpen(false);
  }

  if (isLoading || isAuthenticated) {
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
            onClick={
              () => setIsModalOpen(false)
            }
          />
        </div>
      </div>
    </Modal>
  );
}