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
          overflowY: "scroll",
        }}
      >
        {middle}
      </div>
      <div
        style={{
          width: "25%",
          backgroundColor: style.colors.LIGHT_GRAY,
          overflowY: "hidden",
        }}
      >
        {right}
      </div>
    </div>
  );
}
