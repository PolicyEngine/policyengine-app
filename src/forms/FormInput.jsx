import { useState } from "react";
import style from "style";
import { motion } from "framer-motion";

/**
 * React component providing a standardized form component; does not currently handle
 * radio or select menus, but could be expanded to do so in future
 * @param {Object} props
 * @param {String} props.name The JS 'name' to be applied to the input
 * @param {String} [props.label=""] The label to be applied to the form field
 * @param {String} props.type The input type of the field
 * @param {String} [props.placeholder] The item's placeholder text
 * @param {Function} [props.changeHandler] An optional change handler to be run on form
 * component change events, available outside of FormContext component
 * @param {Object} [props.labelStyle] Optional styling for the label
 * @param {Object} [props.containerStyle] Optional styling for the component's div container
 * @param {Object} [props.inputStyle] Optional styling for the input element
 * @param {String} [props.focusStyle] Optional styling for the box shadow displayed when
 * component is focused
 * @returns {import("react").ReactComponentElement}
 */
export default function FormItem(props) {
  const {
    name,
    labelDisabled,
    label = "",
    type,
    placeholder,
    changeHandler,
    labelStyle,
    containerStyle,
    inputStyle,
    focusStyle,
  } = props;

  const [input, setInput] = useState(null);

  // Field change handler
  function handleChange(e) {
    if (changeHandler && changeHandler instanceof Function) {
      changeHandler(e, input);
    }
    setInput(e.target.value);
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        ...containerStyle,
      }}
    >
      {!labelDisabled && (
        <label
          style={{
            name: `form-label-${label.toLowerCase()}`,
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
          {label}
        </label>
      )}
      <motion.input
        name={name}
        type={type || "text"}
        placeholder={placeholder}
        onChange={handleChange}
        style={{
          border: "none",
          borderBottom: `1px solid ${style.colors.WHITE}`,
          backgroundColor: style.colors.LIGHT_GRAY,
          color: style.colors.DARK_GRAY,
          width: "100%",
          height: 50,
          fontSize: 15,
          fontWeight: 300,
          padding: 10,
          boxShadow: `0px 0px 0px ${style.colors.BLUE}`,
          ...inputStyle,
        }}
        // While focusing, make the bottom border blue from left to right
        whileFocus={{
          boxShadow: focusStyle || `0px 5px 0px ${style.colors.BLUE}`,
        }}
      />
    </div>
  );
}
