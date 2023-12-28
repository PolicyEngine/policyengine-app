import { HEADER_HEIGHT } from "../redesign/style/spacing";
import style from "../style";

export default function ThreeColumnPage(props) {
  const { left, middle, right, noMiddleScroll } = props;
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
          overflowY: !noMiddleScroll && "scroll",
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
