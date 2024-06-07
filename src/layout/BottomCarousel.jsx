import SearchParamNavButton from "../controls/SearchParamNavButton";
import style from "../style";
import useMobile from "./Responsive";

export default function BottomCarousel(props) {
  const { selected, options, bottomElements } = props;
  const mobile = useMobile();
  const currentIndex = options.map((option) => option.name).indexOf(selected);
  const previous = options[currentIndex - 1] || {};
  const next = options[currentIndex + 1] || {};

  // Show the previous to the left, the current in the middle, and the next to the right

  return (
    <div
      style={{
        position: "absolute",
        bottom: mobile ? "25vh" : 0,
        display: "flex",
        height: "min-content",
        left: mobile ? 0 : "50%",
        width: mobile ? "100%" : "50%",
        alignItems: "center",
        backgroundColor: style.colors.WHITE,
        justifyContent: mobile ? "center" : "right",
        // borderTop: "1px solid black",
        borderTop: `1px solid ${style.colors.MEDIUM_DARK_GRAY}`,
        padding: "10px 20px",
        gap: "10px",
      }}
    >
      {!mobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          {bottomElements}
        </div>
      )}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: mobile ? "center" : "right",
          alignItems: "flex-start",
          gap: 20,
        }}
      >
        {mobile && previous.label ? (
          <SearchParamNavButton
            focus={previous.name}
            direction="left"
            style={{ width: 50, fontSize: 16 }}
          />
        ) : (
          <div style={{ width: 50 }} />
        )}
        {}
        {mobile && next.label ? (
          <SearchParamNavButton
            focus={next.name}
            direction="right"
            style={{ width: 50, fontSize: 16 }}
          />
        ) : (
          <div style={{ width: 60 }} />
        )}
      </div>
    </div>
  );
}
