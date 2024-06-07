import { HEADER_HEIGHT } from "../style/spacing";
import style from "../style";
import { useEffect, useRef, useState } from "react";
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

  // Refs for the columns on top of which the expander
  // buttons sit (via absolute positioning)
  const leftColRef = useRef(null);
  const centerColRef = useRef(null);

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

  // Function to determine if a button is at the bottom
  // of the panel on top of which it sits
  function findIsAtBottom(elem) {
    if (!elem) return false;
    console.log(Math.abs(elem.scrollHeight - (elem.scrollTop + elem.clientHeight)) <= 1);

    return Math.abs(elem.scrollHeight - (elem.scrollTop + elem.clientHeight)) <= 1;
  }

  function handleScroll(e, pos) {
    const elem = e.target;

    const isAtBottomPos = findIsAtBottom(elem);

    // Only update state if we need to make a change,
    // not if any scroll occurs, to improve performance
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

  // On first load, the panels behind the collapse buttons don't exist,
  // meaning we can set their box shadow based on state alone;
  // after first paint, reassess whether they're at the bottom
  useEffect(() => {
    setIsAtBottom({
      left: findIsAtBottom(leftColRef.current),
      center: findIsAtBottom(centerColRef.current)
    });
  }, []);

  return (
    <div
      style={{
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        display: "flex",
      }}
    >
      <div
        ref={leftColRef}
        onScroll={(e) => handleScroll(e, "left")}
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
        ref={centerColRef}
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
