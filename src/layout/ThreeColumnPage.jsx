import { HEADER_HEIGHT } from "../style/spacing";
import style from "../style";
import { useContext, useState } from "react";
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
    centerCollapseTitle
  } = props;

  const COLLAPSE_BUTTON_HEIGHT = "42px"; // 10px paddingTop, 20px paddingBottom, 12px text height
  const COLLAPSED_WIDTH = "52px";

  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isCenterCollapsed, setIsCenterCollapsed] = useState(false);

  // Calculate widths
  // This should also work if neither of the collapse
  // props are passed, as undefined evaluates to false
  const leftWidth = (enableLeftCollapse && isLeftCollapsed) ? COLLAPSED_WIDTH : "25%";
  const centerWidth = (enableCenterCollapse && isCenterCollapsed) ? COLLAPSED_WIDTH : "25%";
  const rightWidth = `calc(100% - ${leftWidth} - ${centerWidth})`
  // const rightWidth = 100 - leftWidth - centerWidth;

  /*
  if (isCollapsed) {
    return (
      <CollapsedPanel
        title="Policy settings"
        collapseButton={collapseButton}
      />
    );
  }
  */

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
          // shadow
          zIndex: 3,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          marginBottom: enableLeftCollapse && COLLAPSE_BUTTON_HEIGHT
        }}
      >
        {enableLeftCollapse && isLeftCollapsed ? (
          <CollapsedPanel title={leftCollapseTitle || ""} />
        ) : (left)
      }
        {enableLeftCollapse && (
          <CollapseButton
            onClick={() => setIsLeftCollapsed((prev) => !prev)}
            isCollapsed={isLeftCollapsed}
            // isAtBottom={isLeftCollapsed ? true : isAtBottom}
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
          marginBottom: enableCenterCollapse && COLLAPSE_BUTTON_HEIGHT
        }}
      >
        {
          enableCenterCollapse && isCenterCollapsed ? (
            <CollapsedPanel title={centerCollapseTitle || ""} />
          ) : (
            middle
          )
        }
        {enableCenterCollapse && (
          <CollapseButton
            onClick={() => setIsCenterCollapsed((prev) => !prev)}
            isCollapsed={isCenterCollapsed}
            // isAtBottom={isLeftCollapsed ? true : isAtBottom}
            style={{
              position: "fixed",
              bottom: 0,
              width: "inherit"
            }}
          />)

        }
      </div>
      <div
        style={{
          width: rightWidth,
          backgroundColor: style.colors.WHITE,
          padding: 20,
          paddingTop: 0,
          overflow: "auto",
          height: "100%",
          // shadow
          zIndex: 1,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        {right}
      </div>
    </div>
  );
}
