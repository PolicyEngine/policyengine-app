// This file was originally named "BottomCarousel" because the mobile view had a carousel but this was later removed.

import style from "../style";
import useMobile from "./Responsive";
import { COLLAPSE_BUTTON_HEIGHT, PaneWidthContext } from "./ThreeColumnPage";
import { useContext } from "react";

export default function BottomImpactDescription(props) {
  const { bottomElements } = props;
  const mobile = useMobile();
  const paneWidth = useContext(PaneWidthContext);

  // Show the previous to the left, the current in the middle, and the next to the right

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        display: "flex",
        height: "min-content",
        minHeight: COLLAPSE_BUTTON_HEIGHT,
        right: 0,
        width: paneWidth,
        alignItems: "center",
        backgroundColor: style.colors.WHITE,
        justifyContent: "left",
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
    </div>
  );
}
