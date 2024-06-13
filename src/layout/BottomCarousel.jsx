import SearchParamNavButton from "../controls/SearchParamNavButton";
import { PaneWidthContext } from "../pages/policy/output/Display";
import style from "../style";
import useMobile from "./Responsive";
import { COLLAPSE_BUTTON_HEIGHT } from "./ThreeColumnPage";
import { useContext } from "react";

export default function BottomCarousel(props) {
  const { selected, options, bottomElements } = props;
  const mobile = useMobile();
  const currentIndex = options.map((option) => option.name).indexOf(selected);
  const previous = options[currentIndex - 1] || {};
  const next = options[currentIndex + 1] || {};
  const paneWidth = useContext(PaneWidthContext);

  // Show the previous to the left, the current in the middle, and the next to the right

  return (
    <div
      style={{
        position: "fixed",
        bottom: mobile ? "25vh" : 0,
        display: "flex",
        height: "min-content",
        minHeight: COLLAPSE_BUTTON_HEIGHT,
        right: 0,
        width: mobile ? "100%" : paneWidth,
        alignItems: "center",
        backgroundColor: style.colors.WHITE,
        justifyContent: mobile ? "center" : "left",
        borderImage: `linear-gradient(to right, 
          ${style.colors.LIGHT_GRAY} 0px, 
          ${style.colors.LIGHT_GRAY} 12px, 
          ${style.colors.MEDIUM_DARK_GRAY} 12px, 
          ${style.colors.MEDIUM_DARK_GRAY} calc(100% - 12px), 
          ${style.colors.LIGHT_GRAY} calc(100% - 12px), 
          ${style.colors.LIGHT_GRAY} 100%) 100% 0 0 0/3px 0 0 0 stretch`,
        borderImageWidth: "1px",
        borderWidth: "1px",
        borderStyle: "solid",
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
            color: style.colors.DARK_GRAY,
          }}
        >
          {bottomElements}
        </div>
      )}
      {mobile && (
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: mobile ? "center" : "right",
            alignItems: "flex-start",
            gap: 20,
          }}
        >
          {previous.label ? (
            <SearchParamNavButton
              focus={previous.name}
              direction="left"
              style={{ width: 50, fontSize: 16 }}
            />
          ) : (
            <div style={{ width: 50 }} />
          )}
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
      )}
    </div>
  );
}
