import colors from "./colors.jsx";

export const HEADER_HEIGHT = 90;

// vw units based off Figma design width and input constant values
export const desktopPadding = {
  top: "120px",
  bottom: "160px",
  left: "13vw",
  right: "13vw",
};

export const tabletPadding = {
  top: "80px",
  bottom: "100px",
  left: "7.7vw",
  right: "7.7vw",
};

export const mobilePadding = {
  top: "48px",
  bottom: "60px",
  left: "9.3vw",
  right: "9.3vw",
};

// This is the border often used between components
export const standardBorder = "1px solid ".concat(colors.DARKEST_BLUE);

const spacing = {
  HEADER_HEIGHT,
  desktopPadding,
  tabletPadding,
  mobilePadding,
  standardBorder,
};

export default spacing;
