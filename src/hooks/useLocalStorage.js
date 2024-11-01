// Taken from https://designcode.io/react-hooks-handbook-uselocalstorage-hook
import { useEffect, useState } from "react";
import { wrappedJsonParse, wrappedJsonStringify } from "../data/wrappedJson";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    let currentValue = null;

    try {
      currentValue = wrappedJsonParse(
        localStorage.getItem(key) || String(defaultValue),
      );
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, wrappedJsonStringify(value));
  }, [value, key]);

  return [value, setValue];
}
