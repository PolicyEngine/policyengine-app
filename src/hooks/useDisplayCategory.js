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

const useDisplayCategory = () => {
  const [currentDisplayCategory, setcurrentDisplayCategory] = useState(
    determineDisplayCategory(window.innerWidth),
  );

  useEffect(() => {
    const handler = () => {
      setcurrentDisplayCategory(determineDisplayCategory(window.innerWidth));
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return useMemo(() => currentDisplayCategory, [currentDisplayCategory]);
};

export default useDisplayCategory;
