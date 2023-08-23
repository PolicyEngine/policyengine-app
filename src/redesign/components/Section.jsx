import useDisplayCategory from "./useDisplayCategory";
import style from "../style";

export default function Section({ height, backgroundColor, children }) {
  const displayCategory = useDisplayCategory();
  const sideMargin = {
    mobile: 40,
    tablet: 100,
    desktop: null,
  }[displayCategory];
  const topBottomMargins = {
    mobile: 40,
    tablet: 40,
    desktop: 80,
  }[displayCategory];
  return (
    <div
      style={{
        height,
        backgroundColor,
        display: "flex",
        justifyContent: "center",
        borderBottom: `1px solid ${style.colors.BLACK}`,
      }}
    >
      <div
        style={{
          width: {
            mobile: "100%",
            tablet: "100%",
            desktop: 1_200,
          }[displayCategory],
          marginLeft: sideMargin,
          marginRight: sideMargin,
          marginTop: topBottomMargins,
          marginBottom: topBottomMargins,
        }}
      >
        {children}
      </div>
    </div>
  );
}
