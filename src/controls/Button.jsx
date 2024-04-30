import React from "react";
import { Button as AntButton } from "antd";
import colors from "../style/colors";

export const buttonStyles = {
  primary: {
    standard: {
      backgroundColor: colors.TEAL_ACCENT,
      borderColor: colors.TEAL_ACCENT,
      color: colors.WHITE,
    },
    hover: {
      backgroundColor: colors.TEAL_PRESSED,
      borderColor: colors.TEAL_PRESSED,
      color: colors.WHITE,
    },
  },
  secondary: {
    standard: {
      backgroundColor: "transparent",
      borderColor: colors.TEAL_ACCENT,
      color: colors.TEAL_ACCENT,
    },
    hover: {
      backgroundColor: colors.TEAL_PRESSED,
      borderColor: colors.TEAL_PRESSED,
      color: colors.WHITE,
    },
  },
  disabled: {
    standard: {
      backgroundColor: "transparent",
      borderColor: colors.GRAY,
      color: colors.GRAY,
    },
    hover: {
      backgroundColor: "transparent",
      borderColor: colors.GRAY,
      color: colors.GRAY,
    },
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
  if (!type || !Object.keys(buttonStyles).includes(type)) {
    type = "primary";
  }

  return (
    <AntButton
      style={{
        display: "flex",
        alignItems: "center",
        borderColor: buttonStyles[type].standard.borderColor,
        borderWidth: 3,
        backgroundColor: buttonStyles[type].standard.backgroundColor,
        textTransform: "uppercase",
        width: width,
        height: height || "auto",
        borderRadius: 0,
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 14,
        fontFamily: "Roboto",
        fontWeight: 500,
        letterSpacing: 2.4,
        textAlign: "center",
        whiteSpace: "normal",
        justifyContent: "center",
        color: buttonStyles[type].standard.color,
        transition: "none",
        ...style,
      }}
      disabled={type === "disabled"}
      onMouseOver={(e) =>
        (e.currentTarget.style.backgroundColor =
          buttonStyles[type].hover.backgroundColor) &&
        (e.currentTarget.style.borderColor =
          buttonStyles[type].hover.borderColor) &&
        (e.currentTarget.style.color = buttonStyles[type].hover.color)
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.backgroundColor =
          buttonStyles[type].standard.backgroundColor) &&
        (e.currentTarget.style.borderColor =
          buttonStyles[type].standard.borderColor) &&
        (e.currentTarget.style.color = buttonStyles[type].standard.color)
      }
      size={
        size
          ? size
          : width
            ? width.endswith && width.endswith("%")
              ? width
              : `${width}px`
            : "300px"
      }
      onClick={onClick}
    >
      {text}
    </AntButton>
  );
}
