import { HEADER_HEIGHT } from "../style/spacing";
import style from "../style";
import { createContext, useEffect, useRef, useState } from "react";
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

  const RIGHT_PANEL_PADDING = 20;

  const [isCollapsed, setIsCollapsed] = useState({
    left: false,
    right: false,
  });

  // This is passed to children for resizing purposes
  // with plotly
  const [paneWidth, setPaneWidth] = useState(0);
  const componentRef = useRef(null);

  // Calculate widths
  // This should also work if neither of the collapse
  // props are passed, as undefined evaluates to false
  const leftWidth =
    enableLeftCollapse && isCollapsed.left ? COLLAPSED_WIDTH : "25%";
  const centerWidth =
    enableCenterCollapse && isCollapsed.center ? COLLAPSED_WIDTH : "25%";
  const rightWidth = `calc(100% - ${leftWidth} - ${centerWidth})`;

  useEffect(() => {
    if (componentRef.current) {
      // This piece of code may be unstable if items above Display are edited;
      // if the bottom carousel on the policy output page breaks,
      // the component above this one may be the cause (note the parentElement call)
      const observer = new ResizeObserver((entries) => {
        setPaneWidth(entries[0].contentRect.width + 2 * RIGHT_PANEL_PADDING);
      });

      observer.observe(componentRef.current);

      return () => {
        observer.disconnect();
      };
    }
  });

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
          padding: RIGHT_PANEL_PADDING,
          paddingTop: 0,
          overflow: "auto",
          height: "100%",
          zIndex: 1,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
        ref={componentRef}
      >
        <PaneWidthContext.Provider value={paneWidth}>
          {right}
        </PaneWidthContext.Provider>
      </div>
    </div>
  );
}

export const PaneWidthContext = createContext((obj) => obj);
