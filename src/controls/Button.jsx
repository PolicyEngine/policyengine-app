import style from "../redesign/style";
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
    hoverEffectStart,
    backgroundColor,
    activeBackgroundColor,
    noPadding
  } = props;

  // Fallback values
  let hoverBackgroundColor = "blue";
  let standardBackgroundColor = "teal";

  // The else if and else clauses are maintained here for backwards compatibility
  // with older buttons that can declare primary and disabled
  if (primary) {
    hoverBackgroundColor = style.colors.TEAL_PRESSED;
    standardBackgroundColor = style.colors.TEAL_ACCENT;
  } else if (secondary || disabled) {
    hoverBackgroundColor = style.colors.BLUE_PRESSED;
    standardBackgroundColor = style.colors.BLUE_LIGHT;
  } else {
    hoverBackgroundColor = style.colors.TEAL_PRESSED;
    standardBackgroundColor = style.colors.TEAL_ACCENT;
  }

  // This is to allow compatibility with old Button component, which wraps
  // the button in a padded div, and newer components, which do not
  const paddingStyling = {
      padding: 10,
      display: "flex",
      justifyContent: "center",
      paddingTop: 20,
  };

  const completeButton = (
    <HoverBox
      hoverBackgroundColor={activeBackgroundColor || hoverBackgroundColor}
      direction={hoverEffectStart || "left"}
      style={{
        marginTop: 0,
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
      }}
      size={size ? size : width ? `${width}px` : "300px"}
      onClick={onClick}
    >
      {text}
    </HoverBox>
  );

  // The conditional rendering is also to maintain backward
  // compatibility with old Button components
  if (!noPadding) {
    return (
      <div style={paddingStyling}>
        {completeButton}
      </div>
    );
  } else {
    return (
      <>
        {completeButton}
      </>
    )
  }

}
