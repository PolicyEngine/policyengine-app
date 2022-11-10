import { useState } from "react";
import PolicyEngineContext, { PolicyEngineContextClass } from "./logic/PolicyEngineContext";

export default function PolicyEngineCountry(props) {
    const [PolicyEngine, setPolicyEngineState] = useState({
        state: new PolicyEngineContextClass()
    });

    if (!PolicyEngine.state.initialised) {
        PolicyEngine.state.initialise(setPolicyEngineState);
        return <></>;
    }

    return <PolicyEngineContext.Provider value={PolicyEngine.state}>
        <h3>PolicyEngine</h3>
    </PolicyEngineContext.Provider>
}