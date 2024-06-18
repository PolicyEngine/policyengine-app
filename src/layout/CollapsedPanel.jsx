import style from "../style";

export default function CollapsedPanel(props) {
  const { title } = props;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: style.colors.LIGHT_GRAY,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p
        style={{
          writingMode: "tb",
          transform: "rotate(180deg)",
          margin: "0",
          paddingBottom: "30px",
          fontSize: "12px",
          color: style.colors.DARK_GRAY,
        }}
      >
        {title}
      </p>
    </div>
  );
}
