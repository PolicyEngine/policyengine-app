import React, { useState } from "react";

import style from "../style";
import Section from "./Section";
import FormContext from "layout/forms/FormContext";
import FormInput from "layout/forms/FormInput";
import useDisplayCategory from "../../hooks/useDisplayCategory";
import { submitToMailchimp } from "../../data/mailchimpSubscription";

export default function HomeSubscribe() {
  return (
    <Section backgroundColor={style.colors.BLUE_PRESSED}>
      <SubscribeToPolicyEngine />
    </Section>
  );
}

/**
 * Subscription form component
 * @param {Object} props
 * @param {("mobile"|"tablet"|"desktop")} [props.displaySize] Optional; the
 * desired display category for the form component
 * @returns {import('react').ReactComponentElement}
 */
export function SubscribeToPolicyEngine(props) {
  const defaultCategory = useDisplayCategory();
  const { displaySize } = props;

  const [submitMsg, setSubmitMsg] = useState("");

  const displayCategory = displaySize || defaultCategory;

  const submitLink =
    "https://policyengine.us5.list-manage.com/subscribe/post-json?u=e5ad35332666289a0f48013c5&amp;id=71ed1f89d8&amp;f_id=00f173e6f0";
  const submitButtonText = "Subscribe";
  const inputFields = {
    label: "email",
    type: "email",
    placeholder: "Enter your email address",
  };

  async function submitHandler(event, formInput) {
    event.preventDefault();

    console.log(submitToMailchimp);
    // "error" is if there is a connection issue, while "data" is Mailchimp's
    // res object, including signup errors
    const mailchimpResponse = await submitToMailchimp(formInput.email);
    setSubmitMsg(mailchimpResponse.message);
  }

  const mobileWrapperStyling = {
    backgroundColor: style.colors.BLUE_PRESSED,
    display: "flex",
    flexDirection: "column",
  };

  const nonMobileWrapperStyling = {
    backgroundColor: style.colors.BLUE_PRESSED,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  };

  return (
    <div
      style={
        displayCategory === "mobile"
          ? mobileWrapperStyling
          : nonMobileWrapperStyling
      }
    >
      <div
        style={{
          width: displayCategory !== "mobile" && "40vw",
          paddingRight: displayCategory === "tablet" && 50,
          marginBottom: displayCategory === "mobile" && 50,
        }}
      >
        <h2 style={{ color: "white" }}>Subscribe to PolicyEngine</h2>
        <p>Get the latests posts delivered right to your inbox.</p>
      </div>
      <FormContext
        action={submitLink}
        method="post"
        submitButtonText={submitButtonText}
        onSubmit={submitHandler}
        /*This onClick is a workaround for current limitations within
        Button component and should be removed if Button is altered*/
        onClick={() => {
          return true;
        }}
        containerStyle={{
          width: displayCategory !== "mobile" ? "40vw" : "100%",
        }}
        submitMsg={submitMsg}
      >
        <FormInput
          name={inputFields.label}
          label={inputFields.label}
          type={inputFields.type}
          placeholder={inputFields.placeholder}
        />
      </FormContext>
    </div>
  );
}
