import { useState } from "react";
import style from "redesign/style";
import { motion } from "framer-motion";

import Button from "controls/Button";

/**
 * React component providing a simple form; does not currently handle
 * radio or select menus, but could be expanded to do so in future
 * @param {Object} props
 * @param {Array<Object>} props.inputFields Each field should be an object inside
 * this array-type prop and should contain the fields "label", "type" (e.g., "tel"),
 * "options" (for radio or dropdown), and optional "placeholder"
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
 * @param {Object} [props.labelStyle] Style object targeted at all
 * form labels
 * @param {Object} [props.buttonStyle] Style object for submit button
 * @param {Object} [props.inputStyle] Style object for all inputs
 * @param {String} [props.submitMsg] Optional message to be displayed upon
 * submission
 * @param {Object} [props.submitMsgTypes] Optional object of msg types and
 * validation bar display colors
 * @returns {import("react").ReactComponentElement}
 */
export default function SmallForm(props) {
  const {
    action,
    method,
    onSubmit,
    onClick,
    containerStyle,
    formStyle,
    labelStyle,
    inputStyle,
    buttonStyle,
    inputFields,
    submitButtonText,
    submitMsg,
  } = props;

  const [formInput, setFormInput] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Field change handler
  function handleChange(e) {
    setFormInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

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

  const inputFieldsJSX = inputFields.map((field, index) => (
    <div
      key={index}
      style={{
        width: "100%",
        paddingTop: index > 0 ? "20px" : 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <label
        key={index}
        style={{
          name: `form-label-${field.label.toLowerCase()}`,
          fontFamily: "Roboto",
          fontWeight: 300,
          color: style.colors.WHITE,
          textTransform: "uppercase",
          letterSpacing: 2.4,
          width: "100%",
          fontSize: "1rem",
          lineHeight: "1.2",
          ...labelStyle,
        }}
      >
        {field.label}
      </label>
      <motion.input
        name={field.label}
        type={field.type || "text"}
        placeholder={field.placeholder}
        onChange={handleChange}
        style={{
          border: "none",
          borderBottom: `1px solid ${style.colors.WHITE}`,
          backgroundColor: style.colors.LIGHT_GRAY,
          color: style.colors.DARK_GRAY,
          width: "100%",
          height: 50,
          fontSize: 20,
          fontWeight: 300,
          padding: 10,
          boxShadow: `0px 0px 0px ${style.colors.BLUE_PRIMARY}`,
          ...inputStyle,
        }}
        // While focussing, make the bottom border blue from left to right
        whileFocus={{
          boxShadow: isFormSubmitted
            ? `0px 5px 0px ${style.colors.TEAL_ACCENT}`
            : `0px 5px 0px ${style.colors.BLUE_PRIMARY}`,
        }}
      />
    </div>
  ));

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
          ...formStyle,
        }}
      >
        {inputFieldsJSX}
      </form>
      <Button
        text={submitButtonText || "Submit"}
        onClick={onClick instanceof Function ? (e) => onClick(e) : undefined}
        style={{
          width: "100%",
          ...buttonStyle,
        }}
      />
      <p
        style={{
          margin: 0,
          lineHeight: "1em",
        }}
      >
        {submitMsg}
      </p>
    </div>
  );
}
