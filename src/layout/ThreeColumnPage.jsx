import { HEADER_HEIGHT } from "../style/spacing";
import style from "../style";
import { useState } from "react";
import CollapseButton from "../controls/CollapseButton";
import CollapsedPanel from "./CollapsedPanel";

export const COLLAPSE_BUTTON_HEIGHT = "42px"; // 10px paddingTop, 20px paddingBottom, 12px text height
export const COLLAPSED_WIDTH = "52px";

export default function ThreeColumnPage(props) {
  const {
    left,
    middle,
    right,
    enableLeftCollapse,
    enableCenterCollapse,
    leftCollapseTitle,
    centerCollapseTitle,
  } = props;

  const [isCollapsed, setIsCollapsed] = useState({
    left: false,
    right: false,
  });

  // Calculate widths
  // This should also work if neither of the collapse
  // props are passed, as undefined evaluates to false
  const leftWidth =
    enableLeftCollapse && isCollapsed.left ? COLLAPSED_WIDTH : "25%";
  const centerWidth =
    enableCenterCollapse && isCollapsed.center ? COLLAPSED_WIDTH : "25%";
  const rightWidth = `calc(100% - ${leftWidth} - ${centerWidth})`;

  return (
    <div
      style={{
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        display: "flex",
      }}
    >
      <div
        style={{
          width: leftWidth,
          backgroundColor: style.colors.LIGHT_GRAY,
          overflowY: "scroll",
          zIndex: 3,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          paddingBottom: enableLeftCollapse && COLLAPSE_BUTTON_HEIGHT,
        }}
      >
        {enableLeftCollapse && isCollapsed.left ? (
          <CollapsedPanel title={leftCollapseTitle || ""} />
        ) : (
          left
        )}
        {enableLeftCollapse && (
          <CollapseButton
            onClick={() => {
              setIsCollapsed((prev) => ({ ...prev, left: !prev.left }));
            }}
            title={!isCollapsed.left && leftCollapseTitle}
            isCollapsed={isCollapsed.left}
            style={{
              position: "fixed",
              bottom: 0,
              width: "inherit",
              height: COLLAPSE_BUTTON_HEIGHT,
            }}
          />
        )}
      </div>
      <div
        style={{
          width: centerWidth,
          backgroundColor: style.colors.LIGHT_GRAY,
          overflowY: "scroll",
          zIndex: 2,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          paddingBottom: enableCenterCollapse && COLLAPSE_BUTTON_HEIGHT,
        }}
      >
        {enableCenterCollapse && isCollapsed.center ? (
          <CollapsedPanel title={centerCollapseTitle || ""} />
        ) : (
          middle
        )}
        {enableCenterCollapse && (
          <CollapseButton
            title={!isCollapsed.center && centerCollapseTitle}
            onClick={() => {
              setIsCollapsed((prev) => ({ ...prev, center: !prev.center }));
            }}
            isCollapsed={isCollapsed.center}
            style={{
              position: "fixed",
              bottom: 0,
              width: "inherit",
              height: COLLAPSE_BUTTON_HEIGHT,
            }}
          />
        )}
      </div>
      <div
        style={{
          width: rightWidth,
          backgroundColor: style.colors.WHITE,
          padding: 20,
          paddingTop: 0,
          overflow: "auto",
          height: "100%",
          zIndex: 1,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        {right}
      </div>
    </div>
  );
}
