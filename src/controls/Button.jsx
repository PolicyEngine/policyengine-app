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
  primaryBlue: {
    standard: {
      backgroundColor: colors.BLUE,
      borderColor: colors.BLUE,
      color: colors.WHITE,
    },
    hover: {
      backgroundColor: colors.BLUE_PRESSED,
      borderColor: colors.BLUE_PRESSED,
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
  secondaryBlue: {
    standard: {
      backgroundColor: "transparent",
      borderColor: colors.BLUE,
      color: colors.BLUE,
    },
    hover: {
      backgroundColor: colors.BLUE_PRESSED,
      borderColor: colors.BLUE_PRESSED,
      color: colors.WHITE,
    },
  },
  disabled: {
    standard: {
      backgroundColor: "transparent",
      borderColor: colors.MEDIUM_LIGHT_GRAY,
      color: colors.MEDIUM_LIGHT_GRAY,
    },
    hover: {
      backgroundColor: "transparent",
      borderColor: colors.MEDIUM_LIGHT_GRAY,
      color: colors.MEDIUM_LIGHT_GRAY,
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
 * @param {String} [props.activeBorderColor] Desired border color when button is hovered and ":active"
 * @param {Object} [props.style] Desired JSX-formatted styling object; overrides all other style attributes
 * @returns {import("react").ReactComponentElement}
 */
export default function Button(props) {
  let {
    testId,
    text,
    onClick,
    width,
    type,
    size,
    height,
    style,
    borderColor,
    backgroundColor,
    activeBackgroundColor,
    activeBorderColor,
  } = props;

  // This is an ugly solution to the fact that Ant Design needs these props
  // for tooltips, but if we add all possible props, various other Ant Design
  // props override our own design elements; see
  // https://ant.design/components/tooltip#why-sometime-not-work-on-hoc
  const {
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onFocus,
  } = props;
  const tooltipProps = {
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onFocus,
  };
  // Assign fallback values for styling
  if (!type || !Object.keys(buttonStyles).includes(type)) {
    type = "primary";
  }

  return (
    <AntButton
      style={{
        display: "flex",
        alignItems: "center",
        borderColor: borderColor || buttonStyles[type].standard.borderColor,
        borderWidth: 1,
        backgroundColor:
          backgroundColor || buttonStyles[type].standard.backgroundColor,
        textTransform: "uppercase",
        width: width,
        height: height || "auto",
        borderRadius: 0,
        padding: "15px 30px",
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
      data-testid={testId}
      disabled={type === "disabled"}
      onMouseOver={(e) =>
        (e.currentTarget.style.backgroundColor =
          activeBackgroundColor || buttonStyles[type].hover.backgroundColor) &&
        (e.currentTarget.style.borderColor =
          activeBorderColor || buttonStyles[type].hover.borderColor) &&
        (e.currentTarget.style.color = buttonStyles[type].hover.color)
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.backgroundColor =
          backgroundColor || buttonStyles[type].standard.backgroundColor) &&
        (e.currentTarget.style.borderColor =
          borderColor || buttonStyles[type].standard.borderColor) &&
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
      {...tooltipProps}
    >
      {text}
    </AntButton>
  );
}
