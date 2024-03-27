import React, { Children, useState } from "react";

import Button from "controls/Button";

/**
 * Form-wrapping context component
 * @param {Object} props
 * @param {String} props.submitButtonText="Submit" The text to be placed on
 * the form submission button; defaults to "Submit"
 * @param {String} [props.action] The link to
 * which the form should submit
 * @param {String} [props.method] The relevant HTTP method; defaults to "post"
 * if not provided
 * @param {Function} [props.onSubmit] An optional onSubmit handler; can
 * be combined with "action" prop
 * @param {Function} [props.onClick] An optional click handler for the
 * form's submit button that overrides merely submitting the form
 * @param {Object} [props.containerStyle] Style object to style the
 * form's outer div container
 * @param {Object} [props.formStyle] Style object for containing form tag
 * @param {Object} [props.buttonStyle] Style object for submit button
 * @param {String} [props.submitMsg] Optional message to be displayed upon
 * submission
 * @param {("mobile"|"tablet"|"desktop")} [props.display] Optional setting to
 * display a particular breakpoint's sizing and formatting
 * @returns {import("react").ReactComponentElement}
 */
export default function FormContext(props) {
  const {
    action,
    method,
    onSubmit,
    onClick,
    containerStyle,
    formStyle,
    buttonStyle,
    submitButtonText,
    submitMsg,
    children,
  } = props;

  const [formInput, setFormInput] = useState({});

  // FormInput item change handler
  function handleChange(e) {
    setFormInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Pass change handler to children
  const handledChildren = Children.map(children, (child) => {
    return {
      ...child,
      name: child.props.label,
      props: {
        ...child.props,
        changeHandler: (e) => handleChange(e),
      },
    };
  });

  // Submission handler only employed when onSubmit prop is defined;
  function handleSubmit(e) {
    if (onSubmit instanceof Function) {
      onSubmit(e, formInput);
    }
  }

  // This is included due to current limitations of Button and
  // should be altered if Button is rewritten
  function handleClick(e) {
    if (onClick instanceof Function) {
      onClick(e);
    }
    handleSubmit(e);
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "20px",
        ...containerStyle,
      }}
    >
      <form
        onSubmit={handleSubmit}
        action={action}
        method={method || "post"}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "16px",
          ...formStyle,
        }}
      >
        {handledChildren}
      </form>
      <Button
        text={submitButtonText || "Submit"}
        onClick={handleClick}
        style={{
          width: "100%",
          ...buttonStyle,
        }}
        width="100%"
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "2em",
        }}
      >
        <p
          style={{
            margin: 0,
            lineHeight: "1em",
            position: "absolute",
            top: 0,
            left: 0,
            wordWrap: "normal",
            width: "100%",
          }}
        >
          {submitMsg || <br />}
        </p>
      </div>
    </div>
  );
}
