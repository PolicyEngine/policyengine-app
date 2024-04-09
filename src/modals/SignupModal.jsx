
import { useEffect, useState } from "react";
import { Modal } from "antd";
import colors from "../style/colors";
import bcrypt from "bcryptjs";
import { submitToMailchimp } from "../data/mailchimpSubscription";
import Button from "../controls/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { loginOptions } from "../auth/authUtils";
import useCountryId from "../redesign/components/useCountryId";
import style from "../redesign/style";

export default function SignupModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [submitMsg, setSubmitMsg] = useState("");
  const [isNewsletterChecked, setIsNewsletterChecked] = useState(true);

  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const countryId = useCountryId();

  function handleNewsletterCheck() {
    setIsNewsletterChecked(prev => !prev);
  }

  async function handleSubmit() {
    // Empty any existing submit message
    setSubmitMsg("");

    loginWithRedirect(loginOptions(countryId, {add_to_mailchimp: isNewsletterChecked}));
    // If user hasn't consented to storing cookies, indicate
    // that they must
    /*
    const consentCookie = getCookie("consent");
    if (!consentCookie) {
      setSubmitMsg("This operation requires cookies to be enabled");
      return;
    }
    */

    // Store cookie with hash of email
    // For the time being, this will just log to console,
    // since it's unclear how this should be implemented
    /*
    const salt = await bcrypt.genSalt(10);
    const emailHash = await bcrypt.hash(formInput.email, salt);
    console.debug(emailHash);
    */

    /*
    setCookie(
      "email_hash",
      hashValue,
    );
    */

    // Don't need to POST it anywhere - this should be 
    // done by the policy calculation component, which should
    // check for cookie presence, then POST if present;
    // or should we POST it somewhere? Unclear at moment

    // Check if user wants to sign up for newsletter
    // Set a value that will be appended to submit message in case of success
    let subscribeMsg = null;

    // console.log(formInput);

    // Execute if user has consented to cookies and checked box to sign up
    /*
    if (consentCookie && formInput.signupBox === true) {
      const response = await submitToMailchimp(formInput.email);

      // Store long-term cookie indicating that user has signed up
      // for newsletter
      subscribeMsg = response.message

      // Display outcome
      // If an error occurs, setSubmitMsg with error and return
      if (!response.isSuccessful) {
        setSubmitMsg(subscribeMsg);
        return;
      }
    }
    */

    // Set submit message
    const submitText = "Email successfully submitted";
    if (subscribeMsg) {
      submitText.concat(`; ${subscribeMsg}`);
    }

    setSubmitMsg(submitText);

    // Destroy modal
    setIsModalOpen(false);
  }

  if (isAuthenticated) {
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
          paddingTop: "20px",
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
        <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
          <input
            type="checkbox"
            name="signupBox"
            title="Sign me up for the PolicyEngine newsletter"
            style={{
              borderRadius: 0,
              height: 20,
              width: 20,
              padding: 5,
              appearance: "none",
              backgroundColor: isNewsletterChecked
                ? style.colors.TEAL_PRESSED
                : style.colors.TEAL_LIGHT,
              cursor: "pointer",
            }}
            onClick={handleNewsletterCheck}
          />
          <p style={{ marginLeft: 15, margin: 0, fontFamily: "Roboto Serif" }}>
            Sign me up for the PolicyEngine newsletter
          </p>
        </div>
        <p
          style={{
            margin: 0,
            lineHeight: "1em",
            wordWrap: "normal",
            width: "100%",
          }}
        >
          {submitMsg || <br />}
        </p>
      </div>
    </Modal>
  );
}