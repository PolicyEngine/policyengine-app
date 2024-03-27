
import { useState } from "react";
import { Modal } from "antd";
import FormContext from "../layout/forms/FormContext";
import FormItem from "../layout/forms/FormItem";
import colors from "../style/colors";
import bcrypt from "bcryptjs";

export default function SignupModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [submitMsg, setSubmitMsg] = useState("");

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    const fullCookie = cookies.find((cookie) => cookie.trim().startsWith(`${name}=`));
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
    if (!getCookie("consent")) {
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
      // Don't do anything if box isn't checked

      // If there's a cookie indicating they have, don't do anything

      // Otherwise, execute newsletter signup

      // Store long-term cookie indicating that user has signed up
      // for newsletter

      // If an error occurs, setSubmitMsg with error

    // Set submit message
    setSubmitMsg("Email successfully submitted");

    // Destroy modal

  }

  return (
    <Modal 
      open={isModalOpen}
      footer={null}
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
      >
        <FormItem
          name="email"
          label=""
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          containerStyle={{
            paddingTop: "16px",
          }}
        />
      </FormContext>
    </Modal>
  );
}