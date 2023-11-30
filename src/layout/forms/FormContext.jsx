import React, { Children, useState } from "react";

import useDisplayCategory from "redesign/components/useDisplayCategory";
import Button from "controls/Button";

/**
 * Form container/wrapper component
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
    display,
    children
  } = props;

  const [formInput, setFormInput] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const displayCategory = display || useDisplayCategory();

  // FormInput item change handler
  function handleChange(e) {
    console.log(e.target);
    setFormInput((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
  }

  React.useEffect(() => {
    console.log(formInput);
  }, [formInput])

  // Pass change handler to children
  const handledChildren = Children.map(children, (child) => {
    return ({
      ...child,
      name: child.props.label,
      props: {
        ...child.props,
        changeHandler: (e) => handleChange(e),
      }
    })
  });

  console.log(handledChildren);

  /**
   * Submission handler only employed when onSubmit prop is defined;
   * @param {Event} e
   */ 
  function handleSubmit(e) {
    if (onSubmit instanceof Function) {
      onSubmit(e, formInput);
    }

    setIsFormSubmitted(true);

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
        ...containerStyle
      }}
    >
      <form
        onSubmit={handleSubmit}
        action={action}
        method={method || "post"}
        style={{
          width: "100%",
          ...formStyle
        }}
      >
        {handledChildren}
      </form>
      <Button 
        text={submitButtonText || "Submit"}
        onClick={onClick instanceof Function ? ((e) => onClick(e)) : undefined}
        style={{
          width: "100%",
          ...buttonStyle
        }}
      />
      <p
        style={{
          margin: 0,
          lineHeight: "1em"
        }}
      >
        {submitMsg}
      </p>
    </div>
  );

}