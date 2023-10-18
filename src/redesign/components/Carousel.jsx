import style from "../style";
import useDisplayCategory from "./useDisplayCategory";

export default function Carousel(props) {
  const { current, total, setCurrent, noArrows } = props;

  const displayCategory = useDisplayCategory();
  const isDesktop = displayCategory === "desktop";

  // Grey boxes horizontally next to each other, with the current one being a different colour

  let leftArrow = (
    <span
      className="material-symbols-outlined"
      style={{
        color:
          current > 0 ? style.colors.DARK_GRAY : style.colors.MEDIUM_DARK_GRAY,
        fontSize: 20,
        cursor: current > 0 ? "pointer" : "default",
        marginRight: "auto",
        padding: 10,
        borderRight: `2px solid ${style.colors.MEDIUM_DARK_GRAY}`,
      }}
      onClick={() => {
        if (current > 0) {
          setCurrent(current - 1);
        }
      }}
    >
      arrow_back
    </span>
  );
  noArrows;
  leftArrow = isDesktop ? leftArrow : null;

  let rightArrow = (
    <span
      className="material-symbols-outlined"
      style={{
        color:
          current < total - 1
            ? style.colors.DARK_GRAY
            : style.colors.MEDIUM_DARK_GRAY,
        fontSize: 20,
        cursor: current < total - 1 ? "pointer" : "default",
        padding: 10,
        marginLeft: "auto",
        borderLeft: `2px solid ${style.colors.MEDIUM_DARK_GRAY}`,
      }}
      onClick={() => {
        if (current < total - 1) {
          setCurrent(current + 1);
        }
      }}
    >
      arrow_forward
    </span>
  );

  rightArrow = isDesktop ? rightArrow : null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        borderTop: `2px solid ${style.colors.MEDIUM_DARK_GRAY}`,
      }}
    >
      {!noArrows && leftArrow}
      {noArrows && <div style={{ height: 50 }} />}
      <div style={{ marginTop: 0 }} />
      {Array(total)
        .fill(0)
        .map((_, i) => {
          return (
            <div
              style={{
                height: 15,
                width: 15,
                backgroundColor:
                  i === current
                    ? style.colors.TEAL_ACCENT
                    : style.colors.MEDIUM_DARK_GRAY,
                margin: 5,
                marginTop: isDesktop ? 0 : 10,
                marginBottom: isDesktop ? 0 : 10,
                cursor: "pointer",
                border: `2px solid ${style.colors.DARK_GRAY}`,
              }}
              key={i}
              onClick={() => {
                setCurrent(i);
              }}
            />
          );
        })}
      {!noArrows && rightArrow}
    </div>
  );
}
