// External imports
import React from "react";

// Internal function imports
import { useDisplayCategory } from "../controls/Responsive.jsx";

// Internal style imports
import fonts from "../../style/fonts.jsx";
import colors from "../../style/colors.jsx";
import {
  desktopPadding,
  tabletPadding,
  mobilePadding,
  standardBorder,
} from "../../style/spacing.jsx";

/* ---------- SHARED STYLES ---------- */
const sharedStyles = {
  wrapper: {
    width: "100%",
    height: "100%",
    paddingLeft: desktopPadding.left,
    paddingRight: desktopPadding.right,
    paddingTop: "96px",
    paddingBottom: "96px",
    display: "grid",
    gridTemplate: "1fr / 1fr auto 3fr",
    alignItems: "center",
    justifyItems: "start",
    backgroundColor: colors.BLUE_98,
    borderBottom: standardBorder,
  },
  title: {
    padding: 0,
    margin: 0,
    fontSize: "2rem",
    fontFamily: fonts.HEADER_FONT,
    color: colors.BLUE_PRIMARY,
  },
  separator: {
    width: "1px",
    height: "100%",
    backgroundColor: colors.DARKEST_BLUE,
  },
  description: {
    paddingLeft: "12.5%",
    margin: 0,
    color: colors.BLACK,
    fontSize: "1rem",
    fontFamily: fonts.BODY_FONT,
    lineHeight: "125%",
    fontWeight: 300,
  },
};

/* ---------- DESKTOP STYLES ---------- */

const desktopStyles = {
  wrapper: {
    paddingLeft: desktopPadding.left,
    paddingRight: desktopPadding.right,
    paddingTop: "96px",
    paddingBottom: "96px",
    gridTemplate: "1fr / 1fr auto 3fr",
  },
};

/* ---------- TABLET STYLES ---------- */

const tabletStyles = {
  wrapper: {
    paddingLeft: tabletPadding.left,
    paddingRight: tabletPadding.right,
    paddingTop: "80px",
    paddingBottom: "80px",
    gridTemplate: "1fr / 3fr auto 8fr",
  },
  description: {
    paddingLeft: "16px",
  },
};

/* ---------- MOBILE STYLES ---------- */

const mobileStyles = {
  wrapper: {
    paddingLet: mobilePadding.left,
    paddingRight: mobilePadding.right,
    paddingTop: "48px",
    paddingBottom: "48px",
    gridTemplate: "auto auto auto / 1fr",
  },
  separator: {
    width: "100%",
    height: "1px",
  },
  title: {
    fontSize: "1.5rem",
  },
  description: {
    paddingLeft: 0,
    paddingTop: "32px",
  },
};

/**
 * Shared component used on each page that serves both as a title and description
 * @param {Object} props
 * @param {String} props.title The title for the relevant page
 * @param {String} props.description The page description, to be featured in the component
 */
export default function TitleAndDescription(props) {
  // Determine current breakpoint
  const display = useDisplayCategory();

  // Pull values from props
  const title = props.title;
  const description = props.description;

  // Assign a local style type
  let localStyles = null;
  switch (display) {
    case "desktop":
      localStyles = desktopStyles;
      break;
    case "tablet":
      localStyles = tabletStyles;
      break;
    case "mobile":
      localStyles = mobileStyles;
      break;
    default:
      throw new Error(`useDisplayCategory hook failing inside
			TitleAndDescription component; this may be because of redefined
			breakpoint cateogries`);
  }

  return (
    <section style={{ ...sharedStyles.wrapper, ...localStyles.wrapper }}>
      <h1 style={{ ...sharedStyles.title, ...localStyles.title }}>{title}</h1>
      <div style={{ ...sharedStyles.separator, ...localStyles.separator }} />
      <p style={{ ...sharedStyles.description, ...localStyles.description }}>
        {description}
      </p>
    </section>
  );
}
