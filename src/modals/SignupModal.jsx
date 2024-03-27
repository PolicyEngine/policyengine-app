
import { useState } from "react";
import { Modal } from "antd";
import FormContext from "../layout/forms/FormContext";
import FormItem from "../layout/forms/FormItem";
import colors from "../style/colors";

export default function SignupModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [submitMsg, setSubmitMsg] = useState("");

  function handleSubmit(event, formInput) {
    // Prevent immediate submission
    event.preventDefault();
    console.log(formInput);
    console.log(event);

    // Validate that email is valid
    // Regex taken from https://stackabuse.com/validate-email-addresses-with-regular-expressions-in-javascript/
    const emailRegex = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}", "g");
    const isEmailValid = emailRegex.test(formInput.email);
    if (!isEmailValid) {
      setSubmitMsg("Error: Invalid email provided; please try again");
    }

    // Store cookie with hash of email

    // Don't need to POST it anywhere - this should be 
    // done by the policy calculation component, which should
    // check for cookie presence, then POST if present

    // Check if user wants to sign up for newsletter
      // Don't do anything if box isn't checked

      // If there's a cookie indicating they have, don't do anything

      // Otherwise, execute newsletter signup

      // Store long-term cookie indicating that user has signed up
      // for newsletter

      // If an error occurs, setSubmitMsg with error

    // Set submit message

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