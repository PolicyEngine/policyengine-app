import { createContext } from "react";

const Context = createContext({});

export function getCountry(location) {
    if (location === "/uk") {
        return "uk";
    }
    if (location === "/us") {
        return "us";
    }
    return null;
}

export default Context;