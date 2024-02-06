import React from "react";
import { Button } from "antd";
import colors from "../style/colors";

const buttonStyles = {
  primary: {
    hoverBackgroundColor: colors.TEAL_PRESSED,
    standardBackgroundColor: colors.TEAL_ACCENT,
  },
  secondary: {
    hoverBackgroundColor: colors.BLUE_PRESSED,
    standardBackgroundColor: colors.BLUE_LIGHT,
  },
  disabled: {
    hoverBackgroundColor: colors.BLUE_PRESSED,
    standardBackgroundColor: colors.BLUE_LIGHT,
  },
  default: {
    hoverBackgroundColor: colors.TEAL_PRESSED,
    standardBackgroundColor: colors.TEAL_ACCENT,
  },
};

const NewButton = (props) => {
  let { text, onClick, width, type, size, height, style } = props;

  // Assign fallback values for styling
  if (!type || !(type in Object.keys(buttonStyles))) {
    type = "default";
  }

  return (
    <Button
      style={{
        display: "flex",
        borderRadius: "0",
        backgroundColor: colors.TEAL_ACCENT,
        textTransform: "uppercase",
        width: width || "min(300px, 70vw)",
        height: height || "auto",
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 15,
        fontFamily: "Roboto",
        fontWeight: 500,
        letterSpacing: 2.4,
        color: "#ffffff",
        ...style,
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.backgroundColor =
          buttonStyles[type].hoverBackgroundColor) &&
        (e.currentTarget.style.borderColor =
          buttonStyles[type].hoverBackgroundColor)
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.backgroundColor =
          buttonStyles[type].standardBackgroundColor) &&
        (e.currentTarget.style.borderColor =
          buttonStyles[type].standardBackgroundColor)
      }
      size={size ? size : width ? `${width}px` : "300px"}
      onClick={onClick}
    >
      {text ? text : `🎉New Button`}
    </Button>
  );
};

export default NewButton;
