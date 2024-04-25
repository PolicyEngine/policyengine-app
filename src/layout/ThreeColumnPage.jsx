import { HEADER_HEIGHT } from "../style/spacing";
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
          overflowY: "hidden",
        }}
      >
        {left}
      </div>
      <div
        style={{
          width: "50%",
          backgroundColor: style.colors.WHITE,
          padding: 20,
          paddingTop: 0,
          overflow: "auto",
          height: "100%",
        }}
      >
        {middle}
      </div>
      <div
        style={{
          width: "25%",
          backgroundColor: style.colors.LIGHT_GRAY,
          overflowY: "scroll",
        }}
      >
        {right}
      </div>
    </div>
  );
}
