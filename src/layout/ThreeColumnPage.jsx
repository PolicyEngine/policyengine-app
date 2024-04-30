import { HEADER_HEIGHT } from "../redesign/style/spacing";
import style from "../style";

export default function ThreeColumnPage(props) {
  const { left, middle, right } = props;
  return (
    <div
      style={{
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        display: "flex",
      }}
    >
      <div
        style={{
          width: "25%",
          backgroundColor: style.colors.LIGHT_GRAY,
          overflowY: "scroll",
          // shadow
          zIndex: 3,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        {left}
      </div>
      <div
        style={{
          width: "25%",
          backgroundColor: style.colors.LIGHT_GRAY,
          overflowY: "scroll",
          zIndex: 2,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        {middle}
      </div>
      <div
        style={{
          width: "50%",
          backgroundColor: style.colors.WHITE,
          padding: 20,
          paddingTop: 0,
          overflow: "auto",
          height: "100%",
          // shadow
          zIndex: 1,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        {right}
      </div>
    </div>
  );
}
