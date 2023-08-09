import style from "../../style";
import { HoverBox } from "./HoverBox";

export function ActionButton(props) {
  const { text, onClick, width, size } = props;
  return (
    <HoverBox
      hoverBackgroundColor={style.colors.TEAL_PRESSED}
      direction="left"
      style={{
        marginTop: 20,
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
      }}
      size={size ? size : width ? `${width}px` : "300px"}
      onClick={onClick}
    >
      {text}
      <div style={{ marginLeft: "auto" }} />
      <span className="material-symbols-outlined">arrow_forward</span>
    </HoverBox>
  );
}
