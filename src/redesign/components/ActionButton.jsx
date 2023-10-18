import style from "../style";
import { HoverBox } from "./HoverBox";
import { useNavigate } from "react-router-dom";

export default function ActionButton({
  text,
  link,
  onClick,
  width,
  size,
  height,
  direction,
  secondary,
  backgroundColor,
  activeBackgroundColor,
}) {
  const navigate = useNavigate();
  return (
    <HoverBox
      hoverBackgroundColor={
        activeBackgroundColor ||
        (!secondary ? style.colors.TEAL_PRESSED : style.colors.BLUE_PRESSED)
      }
      direction={direction || "left"}
      style={{
        marginTop: 0,
        alignItems: "center",
        display: "flex",
        backgroundColor:
          backgroundColor ||
          (!secondary ? style.colors.TEAL_ACCENT : style.colors.BLUE_LIGHT),
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
      onClick={
        link
          ? // Navigate with react router
            () => navigate(link)
          : onClick
      }
    >
      {text}
    </HoverBox>
  );
}
