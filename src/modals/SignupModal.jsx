
import { useState } from "react";
import { Modal } from "antd";
import FormContext from "../layout/forms/FormContext";
import FormInput from "../layout/forms/FormInput";
import FormCheckbox from "../layout/forms/FormCheckbox";
import colors from "../style/colors";
import bcrypt from "bcryptjs";
import { submitToMailchimp } from "../data/mailchimpSubscription";
import Button from "../controls/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { loginOptions } from "../auth/authUtils";
import useCountryId from "../redesign/components/useCountryId";

export default function SignupModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [submitMsg, setSubmitMsg] = useState("");

  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const countryId = useCountryId();

  async function handleSubmit(event, formInput) {
    // Prevent immediate submission
    event.preventDefault();
    // Empty any existing submit message
    setSubmitMsg("");

    // Validate that email is valid
    // Regex taken from https://stackabuse.com/validate-email-addresses-with-regular-expressions-in-javascript/
    const emailRegex = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}", "g");
    const isEmailValid = emailRegex.test(formInput.email);
    if (!isEmailValid) {
      setSubmitMsg("Error: Invalid email provided; please try again");
      return;
    }

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

    console.log(formInput);

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
          display: "grid",
          gridTemplateColumns: "[leftHalf] 1fr [rightHalf] 1fr",
          columnGap: "16px"
        }}
      >
        <Button 
          text="Sign up"
          onClick={
            !isAuthenticated && (
              () => loginWithRedirect(loginOptions(countryId))
            )
          }
          width="100%"
          style={{
            gridArea: "leftHalf"
          }}
        />
        <Button
          text="Not at this time"
          type="textLight"
          width="100%"
          style={{
            gridArea: "rightHalf"
          }}
          onClick={
            () => setIsModalOpen(false)
          }
        />
      </div>
      <FormCheckbox
        name="newsletterSignup"
        items={[
          {
            name: "signupBox",
            label: "Sign me up for the PolicyEngine newsletter"
          }
        ]}
      />
    </Modal>
  );
}