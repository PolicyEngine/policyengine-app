import React from "react";
import { Button, Tooltip } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import style from "../../../style";

/**
 * A reusable reset button component that can be used throughout the ParameterEditor
 *
 * @param {Object} props
 * @param {Function} props.onReset - Function to call when reset button is clicked
 * @param {Object} props.buttonStyle - Additional styles to apply to the button
 * @param {String} props.tooltipText - Text to show in tooltip
 * @param {String} props.size - Button size (default: "middle")
 * @returns {import("react").ReactElement}
 */
const ResetButton = ({
  onReset,
  buttonStyle = {},
  tooltipText = "Reset",
  size = "middle",
}) => {
  const button = (
    <Button
      shape="circle"
      icon={<UndoOutlined />}
      onClick={onReset}
      size={size}
      style={{
        aspectRatio: 1,
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: style.colors.DARK_GRAY,
        ...buttonStyle,
      }}
    />
  );

  return <Tooltip title={tooltipText}>{button}</Tooltip>;
};

export default ResetButton;
