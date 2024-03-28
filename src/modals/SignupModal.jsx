
import { useState } from "react";
import { Modal } from "antd";
import FormContext from "../layout/forms/FormContext";
import FormInput from "../layout/forms/FormInput";
import FormCheckbox from "../layout/forms/FormCheckbox";
import colors from "../style/colors";
import bcrypt from "bcryptjs";
import { submitToMailchimp } from "../data/mailchimpSubscription";

export default function SignupModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [submitMsg, setSubmitMsg] = useState("");

  /**
   * Find cookie; if no cookie found, return false
   * @param {String} name Name of cookie
   * @returns {String|false}
   */
  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    const fullCookie = cookies.find((cookie) => cookie.trim().startsWith(`${name}=`));
    if (!fullCookie) {
      return false;
    }
    return fullCookie.split("=")[1];
  }

  /**
   * Cookie setter function
   * @param {String} name 
   * @param {String} value 
   * @param {Number|String} [maxAge=31536000] The maximum cookie age, in ms
   * @param {String} [path="/"] The cookie path
   */
  function setCookie(name, value, maxAge=31536000, path) {
    document.cookie = `${name}=${value};max-age=${String(maxAge)};path=${path}`;
  }

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
    const consentCookie = getCookie("consent");
    if (!consentCookie) {
      setSubmitMsg("This operation requires cookies to be enabled");
      return;
    }

    // Store cookie with hash of email
    // For the time being, this will just log to console,
    // since it's unclear how this should be implemented
    const salt = await bcrypt.genSalt(10);
    const emailHash = await bcrypt.hash(formInput.email, salt);
    console.debug(emailHash);

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

    // Set submit message
    const submitText = "Email successfully submitted";
    if (subscribeMsg) {
      submitText.concat(`; ${subscribeMsg}`);
    }

    setSubmitMsg(submitText);

    // Destroy modal
    setIsModalOpen(false);
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
      >PolicyEngine depends on you</h6>
      <p>PolicyEngine&apos;s free, open-source software relies on your feedback to make further improvements.</p>
      <p>To see your results, please provide your email address below.</p>
      <FormContext
        submitButtonText="Submit"
        submitMsg={submitMsg}
        onSubmit={handleSubmit}
        formStyle={{
          gap: 0
        }}
      >
        <FormInput
          name="email"
          type="email"
          placeholder="Email address"
          aria-label="Email address"
        />
        <FormCheckbox
          name="newsletterSignup"
          items={[
            {
              name: "signupBox",
              label: "Sign me up for the PolicyEngine newsletter"
            }
          ]}
        />
      </FormContext>
    </Modal>
  );
}