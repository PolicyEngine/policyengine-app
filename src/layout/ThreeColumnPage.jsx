import { HEADER_HEIGHT } from "../style/spacing";
import style from "../style";
import { useContext, useState } from "react";

export default function ThreeColumnPage(props) {
  const { 
    left, 
    middle, 
    right,
    isLeftCollapsed,
    isCenterCollapsed
  } = props;

  const COLLAPSED_WIDTH = "52px";

  // Calculate widths
  // This should also work if neither of the collapse
  // props are passed, as undefined evaluates to false
  const leftWidth = isLeftCollapsed ? COLLAPSED_WIDTH : "25%";
  const centerWidth = isCenterCollapsed ? COLLAPSED_WIDTH : "25%";
  const rightWidth = `calc(100% - ${leftWidth} - ${centerWidth})`
  // const rightWidth = 100 - leftWidth - centerWidth;

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
        }}
      >
        {left}
      </div>
      <div
        style={{
          width: centerWidth,
          backgroundColor: style.colors.LIGHT_GRAY,
          overflowY: "scroll",
          zIndex: 2,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        {middle}
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
