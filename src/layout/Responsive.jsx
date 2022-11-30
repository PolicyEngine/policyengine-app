import { useEffect, useMemo, useState } from "react";

const DisplaySize = {
  Mobile: 0,
  Desktop: 1200,
};

const determineDisplayCategory = (width) => {
  if (width < DisplaySize.Desktop) {
    return "mobile";
  } else {
    return "desktop";
  }
};

const useMobile = () => {
  const [currentDisplayCategory, setcurrentDisplayCategory] = useState(
    determineDisplayCategory(window.innerWidth) === "mobile"
  );

  useEffect(() => {
    const handler = () =>
      setcurrentDisplayCategory(
        determineDisplayCategory(window.innerWidth) === "mobile"
      );
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return useMemo(() => currentDisplayCategory, [currentDisplayCategory]);
};

export default useMobile;
