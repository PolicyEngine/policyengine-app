import { useState } from "react";
import style from "redesign/style";
import { motion } from "framer-motion";

import Button from "controls/Button";

/**
 * React component providing a standardized form component; does not currently handle
 * radio or select menus, but could be expanded to do so in future
 * @param {Object} props 
 * @param {String} props.label The label to be applied to the form field
 * @param {String} props.type The input type of the field
 * @param {String} [props.placeholder] The item's placeholder text
 * @param {Function} [props.changeHandler] An additional change handler to be run on form
 * component change events; will not override tracked input
 * @param {Object} [props.labelStyle] Optional styling for the label
 * @param {Object} [props.containerStyle] Optional styling for the component's div container
 * @param {Object} [props.inputStyle] Optional styling for the input element
 * @param {String} [props.focusStyle] Optional styling for the box shadow displayed when 
 * component is focused
 * @returns {import("react").ReactComponentElement}
 */
export default function FormItem(props) {
  const {
    label,
    type,
    placeholder,
    changeHandler,
    labelStyle,
    containerStyle,
    inputStyle,
    focusStyle
  } = props;

  const [input, setInput] = useState(null);

  // Field change handler
  function handleChange(e) {
    setInput(e.target.value);
    if (changeHandler && changeHandler instanceof Function) {
      changeHandler(e, input);
    }
  }

  return (
    <div 
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ...containerStyle
      }}>
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
          ...labelStyle
        }}
      >
        {label}
      </label>
      <motion.input
        name={label}
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
          fontSize: 20,
          fontWeight: 300,
          padding: 10,
          boxShadow: `0px 0px 0px ${style.colors.BLUE_PRIMARY}`,
          ...inputStyle
        }}
        // While focusing, make the bottom border blue from left to right
        whileFocus={{
          boxShadow: 
            focusStyle ||
            (`0px 5px 0px ${style.colors.BLUE_PRIMARY}`)
        }}
      />
    </div>
  );
}