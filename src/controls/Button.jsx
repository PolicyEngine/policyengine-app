import style from "../style";

export default function Button(props) {
  const { text, onClick, primary } = props;

  return (
    <div
      style={{
        backgroundColor: primary ? style.colors.BLUE : style.colors.LIGHT_GRAY,
        color: primary ? style.colors.WHITE : style.colors.BLACK,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 25,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16,
        ...props.style,
      }}
      onClick={onClick}
    >
      {text}
    </div>
  );
}
