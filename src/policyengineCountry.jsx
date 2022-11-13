import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Home, Household, Policy } from "./components/pages";
import Sidebar from "./components/Sidebar";
import PolicyEngineContext, { PolicyEngineContextClass } from "./logic/PolicyEngineContext";
import style from "./style";

export default function PolicyEngineCountry(props) {
    const [PolicyEngine, setPolicyEngineState] = useState({
        state: new PolicyEngineContextClass("uk")
    });

    PolicyEngine.state.initialiseIfNeeded(setPolicyEngineState);

    PolicyEngine.state.storeCountryMetadataIfNeeded();

    return <PolicyEngineContext.Provider value={PolicyEngine.state}>
        <Header />
        <div style={{
            marginLeft: 0
        }}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/household" element={<Household />} />
                <Route path="/policy" element={<Policy />} />
            </Routes>
        </div>
    </PolicyEngineContext.Provider>
}