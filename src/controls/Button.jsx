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
  }
};

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
    style
  } = props;

  // Assign fallback values for styling
  if (!type || !(type in Object.keys(buttonStyles))) {
    type = "default";
  }

  return (
    <HoverBox
      hoverBackgroundColor={activeBackgroundColor || buttonStyles[type].hoverBackgroundColor}
      hoverStart={hoverStart || "left"}
      style={{
        alignItems: "center",
        display: "flex",
        backgroundColor: backgroundColor || buttonStyles[type].standardBackgroundColor,
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
        ...style
      }}
      size={size ? size : width ? `${width}px` : "300px"}
      onClick={onClick}
    >
      {text}
    </HoverBox>
  );

}