import React from "react";
import { Button } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import style from "../../../style";

/**
 * A reusable reset button component that can be used throughout the ParameterEditor
 *
 * @param {Object} props
 * @param {Function} props.onReset - Function to call when reset button is clicked
 * @param {Object} props.buttonStyle - Additional styles to apply to the button
 * @param {String} props.size - Button size (default: "small")
 * @returns {import("react").ReactElement}
 */
const ResetButton = ({ onReset, buttonStyle = {}, size = "middle" }) => {
  return (
    <Button
      shape="circle"
      icon={<UndoOutlined />}
      onClick={onReset}
      size={size}
      style={{
        width: 48,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: style.colors.DARK_GRAY,
        ...buttonStyle,
      }}
    />
  );
};

export default ResetButton;
