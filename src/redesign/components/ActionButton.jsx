import style from "../style";
import { HoverBox } from "./HoverBox";

export default function ActionButton({ text, onClick, width, size, height, noArrow, direction }) {
  return (
    <HoverBox
      hoverBackgroundColor={style.colors.TEAL_PRESSED}
      direction={direction || "left"}
      style={{
        marginTop: 0,
        alignItems: "center",
        display: "flex",
        backgroundColor: style.colors.TEAL_ACCENT,
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
      }}
      size={size ? size : width ? `${width}px` : "300px"}
      onClick={onClick}
    >
      {text}
      {!noArrow && <div style={{ marginLeft: "auto" }} />}
      {!noArrow && <span className="material-symbols-outlined">arrow_forward</span>}
    </HoverBox>
  );
}
