import styles from "../redesign/style";
import { HoverBox } from "../redesign/components/HoverBox";

const buttonStyles = {
  primary: {
    hoverBackgroundColor: styles.colors.TEAL_PRESSED,
    standardBackgroundColor: styles.colors.TEAL_ACCENT,
  },
  secondary: {
    hoverBackgroundColor: styles.colors.BLUE_PRESSED,
    standardBackgroundColor: styles.colors.BLUE_LIGHT,
  },
  disabled: {
    hoverBackgroundColor: styles.colors.BLUE_PRESSED,
    standardBackgroundColor: styles.colors.BLUE_LIGHT,
  },
  default: {
    hoverBackgroundColor: styles.colors.TEAL_PRESSED,
    standardBackgroundColor: styles.colors.TEAL_ACCENT,
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
  let {
    text,
    onClick,
    width,
    type,
    size,
    height,
    hoverStart,
    backgroundColor,
    activeBackgroundColor,
    style,
  } = props;

  // Assign fallback values for styling
  if (!type || !(type in Object.keys(buttonStyles))) {
    type = "default";
  }

  return (
    <HoverBox
      hoverBackgroundColor={
        activeBackgroundColor || buttonStyles[type].hoverBackgroundColor
      }
      hoverStart={hoverStart || "left"}
      style={{
        alignItems: "center",
        display: "flex",
        backgroundColor:
          backgroundColor || buttonStyles[type].standardBackgroundColor,
        color: "white",
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 15,
        fontFamily: "Roboto",
        fontWeight: 500,
        letterSpacing: 2.4,
        cursor: "pointer",
        textTransform: "uppercase",
        width: width || "min(300px, 70vw)",
        height: height,
        justifyContent: "center",
        textAlign: "center",
        ...style,
      }}
      size={size ? size : width ? `${width}px` : "300px"}
      onClick={onClick}
    >
      {text}
    </HoverBox>
  );
}
