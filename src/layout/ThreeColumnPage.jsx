import { HEADER_HEIGHT } from "../Header";
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
          width: "20%",
          backgroundColor: style.colors.LIGHT_GRAY,
          overflowY: "scroll",
        }}
      >
        {left}
      </div>
      <div
        style={{
          width: "60%",
          backgroundColor: style.colors.WHITE,
          padding: 20,
          overflowY: "scroll",
        }}
      >
        {middle}
      </div>
      <div
        style={{
          width: "20%",
          backgroundColor: style.colors.LIGHT_GRAY,
          overflowY: "scroll",
        }}
      >
        {right}
      </div>
    </div>
  );
}
