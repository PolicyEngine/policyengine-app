import { useEffect, useMemo, useState } from "react";
import { displaySize } from "../style/spacing";

const determineDisplayCategory = (width) => {
  if (width < displaySize.tablet) {
    return "mobile";
  } else if (width < displaySize.desktop) {
    return "tablet";
  }
  return "desktop";
};

/**
 * Deprecated mobile sizing effect hook; for newer implementation, use useDisplayCategory
 * @returns
 */
export default function useMobile() {
  const [currentDisplayCategory, setcurrentDisplayCategory] = useState(
    determineDisplayCategory(window.innerWidth) === "mobile",
  );

  useEffect(() => {
    const handler = () =>
      setcurrentDisplayCategory(
        determineDisplayCategory(window.innerWidth) === "mobile",
      );
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return useMemo(() => currentDisplayCategory, [currentDisplayCategory]);
}
