import { HEADER_HEIGHT } from "../style/spacing";
import style from "../style";
import { useState } from "react";

export default function ThreeColumnPage(props) {
  const { 
    left, 
    middle, 
    right,
    isLeftExpanded = true,
    isCenterExpanded = true
  } = props;

  // Calculate widths, in percentages
  const leftWidth = isLeftExpanded ? 25 : 5;
  const centerWidth = isCenterExpanded ? 25 : 5;
  const rightWidth = 100 - leftWidth - centerWidth;

  return (
    <div
      style={{
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        display: "flex",
      }}
    >
      <div
        style={{
          width: `${leftWidth}%`,
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
          width: `${centerWidth}%`,
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
          width: `${rightWidth}%`,
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
