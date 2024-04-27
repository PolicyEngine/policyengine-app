import React from "react";
import { Button as AntButton } from "antd";
import colors from "../style/colors";

export const buttonStyles = {
  primary: {
    hoverBackgroundColor: colors.TEAL_PRESSED,
    standardBackgroundColor: colors.TEAL_ACCENT,
    borderColor: colors.TEAL_ACCENT,
    color: colors.WHITE,
  },
  secondary: {
    hoverBackgroundColor: colors.TEAL_PRESSED,
    standardBackgroundColor: colors.WHITE,
    borderColor: colors.TEAL_ACCENT,
    color: colors.BLACK,
  },
  disabled: {
    hoverBackgroundColor: colors.BLUE_PRESSED,
    standardBackgroundColor: colors.BLUE_LIGHT,
    borderColor: colors.BLUE_PRESSED,
    color: colors.WHITE,
  },
  textLight: {
    hoverBackgroundColor: colors.LIGHT_GRAY,
    standardBackgroundColor: "inherit",
    textColor: colors.BLUE,
    borderColor: colors.BLUE,
  },
  default: {
    hoverBackgroundColor: colors.TEAL_PRESSED,
    standardBackgroundColor: colors.TEAL_ACCENT,
    borderColor: colors.TEAL_PRESSED,
    color: colors.WHITE,
  },
};

/**
 * Standardized button that takes a series of props; for links, use LinkButton instead
 * @param {Object} [props]
 * @param {String} [props.text] The text to be displayed on the button
 * @param {Function} [props.onClick] A click event to be fired
 * @param {String|Number} [props.width] The desired width of the button; Number-type sets width to px
 * @param {String} [props.type] A defined type for the button from among "primary", "secondary", or "default"
 * @param {Object} [props.size] A JSX styling object; overrides props.width when passed
 * @param {String|Number} [props.height] The desired height of the button; Number-type sets height to px
 * @param {String} [props.hoverStart="left"] The desired direction from which the button's hover effect starts
 * @param {String} [props.backgroundColor] Desired background color, overriding default styling
 * @param {String} [props.activeBackgroundColor] Desired background color when button is hovered and ":active"
 * @param {Object} [props.style] Desired JSX-formatted styling object; overrides all other style attributes
 * @returns {import("react").ReactComponentElement}
 */
export default function Button(props) {
  let { text, onClick, width, type, size, height, style } = props;
  // Assign fallback values for styling
  if (!type || !(Object.keys(buttonStyles).includes(type))) {
    type = "default";
  }
  // Calculate the border to use
  const borderColor = buttonStyles[type].borderColor
    ? buttonStyles[type].borderColor
    : null;

  return (
    <AntButton
      style={{
        display: "flex",
        alignItems: "center",
        border: `1px solid ${borderColor || buttonStyles[type].standardBackgroundColor}`,
        borderRadius: "0",
        borderColor: buttonStyles[type].borderColor,
        borderWidth: 5,
        backgroundColor: buttonStyles[type].standardBackgroundColor,
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
        textAlign: "center",
        whiteSpace: "normal",
        justifyContent: "center",
        color: buttonStyles[type].color,
        transition: "none",
        ...style,
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.backgroundColor =
          buttonStyles[type].hoverBackgroundColor) &&
        (e.currentTarget.style.borderColor = borderColor
          ? borderColor
          : buttonStyles[type].hoverBackgroundColor)
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.backgroundColor =
          buttonStyles[type].standardBackgroundColor) &&
        (e.currentTarget.style.borderColor =
          buttonStyles[type].borderColor)
      }
      size={size ? size : width ? `${width}px` : "300px"}
      onClick={onClick}
    >
      {text}
    </AntButton>
  );
}
