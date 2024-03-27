import { useState } from "react";
import style from "redesign/style";
import { motion } from "framer-motion";

/**
 * React component providing a standardized form checkbox component
 * @param {Object} props
 * @param {String} props.name The JS 'name' to be applied to the input
 * @param {String} [props.label=""] The label to be applied to the form field
 * @param {Array} props.items An array of items to be included; must include "name" and "label" keys
 * @param {Function} [props.changeHandler] An optional change handler to be run on form
 * component change events, available outside of FormContext component
 * @param {Object} [props.labelStyle] Optional styling for the label
 * @param {Object} [props.containerStyle] Optional styling for the component's div container
 * @param {Object} [props.inputStyle] Optional styling for the input element
 * @param {String} [props.focusStyle] Optional styling for the box shadow displayed when
 * component is focused
 * @returns {import("react").ReactComponentElement}
 */
export default function FormCheckbox(props) {
  const {
    name,
    label="",
    items,
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
    console.log(e);
    setInput((prev) => ({
      ...prev,
    }));
  }

  const iteratedItems = items.map((item) => {
    return (
      <CheckItem
        key={item.name}
        name={item.name}
        itemLabel={item.label}
      />
    )
  });

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "8px",
        ...containerStyle,
      }}
    >
      <label
        style={{
          name: `form-label-${label.toLowerCase()}`,
          fontFamily: "Roboto",
          fontWeight: 300,
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
      {iteratedItems}
    </div>
  );
}

function CheckItem(props) {
  const {
    name,
    itemLabel,
    checked,
    onCheck
  } = props;

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
      <input
        type="checkbox"
        name={name}
        title={itemLabel}
        style={{
          borderRadius: 0,
          height: 20,
          width: 20,
          padding: 5,
          appearance: "none",
          backgroundColor: checked
            ? style.colors.TEAL_PRESSED
            : style.colors.TEAL_LIGHT,
          cursor: "pointer",
        }}
        onClick={() => {
          onCheck(!checked);
        }}
      />
      <p style={{ marginLeft: 15, margin: 0, fontFamily: "Roboto Serif" }}>
        {itemLabel}
      </p>
    </div>
  );
}