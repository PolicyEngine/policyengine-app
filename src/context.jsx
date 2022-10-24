import { createContext } from "react";


class PolicyEngineContext {
    household = null;
    policy = null;

    getCountry() {
        // The country code is stored in the URL, e.g. https://policyengine.org/uk/...
        const url = window.location.pathname;
        const country = url.split("/")[1];
        if(country === "uk") {
            return "uk";
        } else if(country === "us") {
            return "us";
        } else {
            return null;
        }
    }
}

const Context = createContext(new PolicyEngineContext());

export default Context;