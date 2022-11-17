import style from "../../style";

export default function ThreeColumnPage(props) {
  const { left, middle, right } = props;
  return (
    <div
      style={{
        height: `calc(100vh - ${style.spacing.HEADER_SIZE}px)`,
        display: "flex",
      }}
    >
      <div
        style={{
          width: "20%",
          backgroundColor: style.colors.LIGHT_GRAY,
          height: "100%",
          overflowY: "scroll",
          padding: 20,
        }}
      >
        {left}
      </div>
      <div
        style={{
          width: "60%",
          backgroundColor: style.colors.WHITE,
          height: "100%",
          overflowY: "scroll",
        }}
      >
        {middle}
      </div>
      <div
        style={{
          width: "20%",
          backgroundColor: style.colors.LIGHT_GRAY,
          height: "100%",
          overflowY: "scroll",
          padding: 20,
        }}
      >
        {right}
      </div>
    </div>
  );
}
