import { HEADER_HEIGHT } from "../style/spacing";
import style from "../style";
import { useEffect, useState } from "react";
import CollapseButton from "../controls/CollapseButton";
import CollapsedPanel from "./CollapsedPanel";

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

  const COLLAPSE_BUTTON_HEIGHT = "42px"; // 10px paddingTop, 20px paddingBottom, 12px text height
  const COLLAPSED_WIDTH = "52px";

  const [isCollapsed, setIsCollapsed] = useState({
    left: false,
    right: false,
  });

  const [isAtBottom, setIsAtBottom] = useState({
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

  function handleScroll(e, pos) {
    const elem = e.target;
    console.log(elem);

    const isAtBottomPos =
      Math.abs(elem.scrollHeight - (elem.scrollTop + elem.clientHeight)) <= 1;

    if (!isAtBottom[pos] && isAtBottomPos) {
      setIsAtBottom((prev) => ({
        ...prev,
        [pos]: true,
      }));
    } else if (isAtBottom[pos] && !isAtBottomPos) {
      setIsAtBottom((prev) => ({
        ...prev,
        [pos]: false,
      }));
    }
  }

  useEffect(() => {
    console.log(isAtBottom);
  }, [isAtBottom]);

  return (
    <div
      style={{
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        display: "flex",
      }}
    >
      <div
        onScroll={(e) => handleScroll(e, "left")}
        style={{
          width: leftWidth,
          backgroundColor: style.colors.LIGHT_GRAY,
          overflowY: "scroll",
          zIndex: 3,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          marginBottom: enableLeftCollapse && COLLAPSE_BUTTON_HEIGHT,
        }}
      >
        {enableLeftCollapse && isCollapsed.left ? (
          <CollapsedPanel title={leftCollapseTitle || ""} />
        ) : (
          left
        )}
        {enableLeftCollapse && (
          <CollapseButton
            onClick={() =>
              setIsCollapsed((prev) => ({ ...prev, left: !prev.left }))
            }
            isCollapsed={isCollapsed.left}
            isAtBottom={isAtBottom.left}
            style={{
              position: "fixed",
              bottom: 0,
              width: "inherit",
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
          marginBottom: enableCenterCollapse && COLLAPSE_BUTTON_HEIGHT,
        }}
        onScroll={(e) => handleScroll(e, "center")}
      >
        {enableCenterCollapse && isCollapsed.center ? (
          <CollapsedPanel title={centerCollapseTitle || ""} />
        ) : (
          middle
        )}
        {enableCenterCollapse && (
          <CollapseButton
            onClick={() =>
              setIsCollapsed((prev) => ({ ...prev, center: !prev.center }))
            }
            isCollapsed={isCollapsed.center}
            isAtBottom={isAtBottom.center}
            style={{
              position: "fixed",
              bottom: 0,
              width: "inherit",
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
