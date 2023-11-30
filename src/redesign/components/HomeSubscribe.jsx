import React, { useState } from 'react';
import jsonp from 'jsonp';

import style from "../style";
import Section from "./Section";
import SmallForm from "../../layout/SmallForm";
import useDisplayCategory from "./useDisplayCategory";

export default function HomeSubscribe() {
  return (
    <Section backgroundColor={style.colors.BLUE_PRESSED}>
      <SubscribeToPolicyEngine />
    </Section>
  );
}

export function SubscribeToPolicyEngine({displaySize}) {
  const [submitMsg, setSubmitMsg] = useState("");

  const displayCategory = useDisplayCategory();

  const submitLink = "https://policyengine.us5.list-manage.com/subscribe/post-json?u=e5ad35332666289a0f48013c5&amp;id=71ed1f89d8&amp;f_id=00f173e6f0";
  const submitButtonText = "Subscribe";
  const inputFields = [
    {
      label: "email",
      type: "email",
      placeholder: "Enter your email address"
    }
  ];

  function submitHandler(event, formInput) {
    event.preventDefault();

    // "error" is if there is a connection issue, while "data" is Mailchimp's
    // res object, including signup errors
    jsonp(`${submitLink}&EMAIL=${formInput.email}`, {param: 'c'}, (error, data) => {
      if (error) {
        setSubmitMsg("There was an issue processing your subscription; please try again later.");
      }
      if (data) {
        // "data" also contains "result" param 
        // of either "success" or "error"
        const {msg} = data;
        if (typeof msg==="string") {
          setSubmitMsg(msg);
        }
      }
    });
  }

  return (
    <div
      style={{
        backgroundColor: style.colors.BLUE_PRESSED,
      }}
    >
      {
        {
          mobile: <SubscribeToPolicyEngineMobile 
            inputFields={inputFields}
            submitLink={submitLink}
            submitButtonText={submitButtonText}
            onSubmit={submitHandler}
            submitMsg={submitMsg}
          />,
          tablet: <SubscribeToPolicyEngineTablet 
            inputFields={inputFields} 
            submitLink={submitLink}
            submitButtonText={submitButtonText}
            onSubmit={submitHandler}
            submitMsg={submitMsg}
          />,
          desktop: <SubscribeToPolicyEngineDesktop 
            inputFields={inputFields} 
            submitLink={submitLink}
            submitButtonText={submitButtonText}
            onSubmit={submitHandler}
            submitMsg={submitMsg}
          />,
        }[displaySize || displayCategory]
      }
    </div>
  );
}

function SubscribeToPolicyEngineDesktop(props) {
  const {
    inputFields,
    submitLink,
    submitButtonText,
    onSubmit,
    submitMsg
  } = props;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 300,
      }}
    >
      <div style={{ width: "40vw" }}>
        <h2 style={{ color: "white" }}>Subscribe to PolicyEngine</h2>
        <p>Get the latests posts delivered right to your inbox.</p>
      </div>
      <SmallForm 
        inputFields={inputFields}
        action={submitLink}
        method="post"
        submitButtonText={submitButtonText}
        onSubmit={onSubmit}
        containerStyle={{width: "40vw"}}
        formStyle={{width: "500px"}}
        buttonStyle={{width: "500px"}}
        submitMsg={submitMsg}
      />
    </div>
  );
}

function SubscribeToPolicyEngineTablet(props) {
  const {
    inputFields,
    submitLink,
    submitButtonText,
    onSubmit,
    submitMsg
  } = props;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 300,
      }}
    >
      <div style={{ width: "40vw", paddingRight: 50 }}>
        <h2 style={{ color: "white" }}>Subscribe to PolicyEngine</h2>
        <p>Get the latests posts delivered right to your inbox.</p>
      </div>
      <SmallForm 
        inputFields={inputFields}
        action={submitLink}
        onSubmit={onSubmit}
        method="post"
        submitButtonText={submitButtonText}
        containerStyle={{width: "40vw"}}
        formStyle={{width: "400px"}}
        buttonStyle={{width: "400px"}}
        submitMsg={submitMsg}
      />
    </div>
  );
}

export function SubscribeToPolicyEngineMobile(props) {
  const {
    inputFields,
    submitLink,
    submitButtonText,
    onSubmit,
    submitMsg
  } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: 50 }}>
        <h2 style={{ color: "white" }}>Subscribe to PolicyEngine</h2>
        <p>Get the latests posts delivered right to your inbox.</p>
      </div>
      <SmallForm 
        inputFields={inputFields}
        action={submitLink}
        onSubmit={onSubmit}
        method="post"
        submitButtonText={submitButtonText}
        submitMsg={submitMsg}
      />
    </div>
  );
}
