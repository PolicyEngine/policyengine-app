import React from "react";
import { Button, Tooltip } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import style from "../../../style";

/**
 * A reusable reset button component that can be used throughout the ParameterEditor
 *
 * @param {Object} props
 * @param {Function} props.onReset - Function to call when reset button is clicked
 * @param {String} props.tooltipText - Text to display in tooltip (default: "Reset to default")
 * @param {Object} props.buttonStyle - Additional styles to apply to the button
 * @param {String} props.size - Button size (default: "middle")
 * @param {Boolean} props.showText - Whether to show "Reset" text alongside icon (default: false)
 * @returns {import("react").ReactElement}
 */
const ResetButton = ({
  onReset,
  tooltipText = "Reset to default",
  buttonStyle = {},
  size = "small",
  showText = false,
}) => {
  return (
    <Tooltip title={tooltipText}>
      <Button
        icon={<UndoOutlined />}
        onClick={onReset}
        size={size}
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "10px",
          paddingRight: "10px",
          justifyContent: "center",
          color: style.colors.DARK_GRAY,
          ...buttonStyle,
        }}
      >
        {showText && "Reset"}
      </Button>
    </Tooltip>
  );
};

export default ResetButton;
