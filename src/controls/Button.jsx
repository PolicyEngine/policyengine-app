import styles from "../redesign/style";
import { HoverBox } from "../redesign/components/HoverBox";

export default function Button(props) {
  const {
    text,
    onClick,
    width,
    primary,
    secondary,
    disabled,
    size,
    height,
    hoverStart,
    backgroundColor,
    activeBackgroundColor,
    style
  } = props;

  // Fallback values
  let hoverBackgroundColor = "blue";
  let standardBackgroundColor = "teal";

  // The else if and else clauses are maintained here for backwards compatibility
  // with older buttons that can declare primary and disabled; the counterintuitive
  // inclusion of an else fallback is used because the linter complains if all three
  // of these options are not included
  if (primary) {
    hoverBackgroundColor = styles.colors.TEAL_PRESSED;
    standardBackgroundColor = styles.colors.TEAL_ACCENT;
  } else if (secondary || disabled) {
    hoverBackgroundColor = styles.colors.BLUE_PRESSED;
    standardBackgroundColor = styles.colors.BLUE_LIGHT;
  } else {
    hoverBackgroundColor = styles.colors.TEAL_PRESSED;
    standardBackgroundColor = styles.colors.TEAL_ACCENT;
  }

  return (
    <HoverBox
      hoverBackgroundColor={activeBackgroundColor || hoverBackgroundColor}
      hoverStart={hoverStart || "left"}
      style={{
        alignItems: "center",
        display: "flex",
        backgroundColor: backgroundColor || standardBackgroundColor,
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