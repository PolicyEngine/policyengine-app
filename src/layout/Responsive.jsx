import { useEffect, useMemo, useState } from "react";

const DisplaySize = {
  Mobile: 0,
  Tablet: 768,
  Desktop: 1200,
};

const determineDisplayCategory = (width) => {
  if (width < DisplaySize.Tablet) {
    return "mobile";
  } else if (width < DisplaySize.Desktop) {
    return "tablet";
  }
  return "desktop";
};

const useDisplayCategory = () => {
  const [currentDisplayCategory, setcurrentDisplayCategory] = useState(
    typeof window !== "undefined"
      ? determineDisplayCategory(window.innerWidth)
      : "desktop", // Default to desktop during SSR
  );

  useEffect(() => {
    // Set the correct display category on mount
    if (typeof window !== "undefined") {
      setcurrentDisplayCategory(determineDisplayCategory(window.innerWidth));
    }

    const handler = () =>
      setcurrentDisplayCategory(determineDisplayCategory(window.innerWidth));
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return useMemo(() => currentDisplayCategory, [currentDisplayCategory]);
};

const useMobile = () => {
  const [currentDisplayCategory, setcurrentDisplayCategory] = useState(
    typeof window !== "undefined"
      ? determineDisplayCategory(window.innerWidth) === "mobile"
      : false, // Default to false (non-mobile) during SSR
  );

  useEffect(() => {
    // Set the correct mobile state on mount
    if (typeof window !== "undefined") {
      setcurrentDisplayCategory(
        determineDisplayCategory(window.innerWidth) === "mobile",
      );
    }

    const handler = () =>
      setcurrentDisplayCategory(
        determineDisplayCategory(window.innerWidth) === "mobile",
      );
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return useMemo(() => currentDisplayCategory, [currentDisplayCategory]);
};

function ResponsiveComponent(props) {
  const displayCategory = useDisplayCategory();
  if (displayCategory === "mobile") {
    return props.mobile;
  } else if (displayCategory === "tablet") {
    return props.tablet;
  }
  return props.desktop;
}

export default useMobile;

export { useDisplayCategory, ResponsiveComponent };
