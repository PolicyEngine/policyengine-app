import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import style from "../../../style";
import ThreeColumnPage from "../../layout/ThreeColumnPage";
import { addYearlyVariables } from "./common";
import CountChildren from "./CountChildren";
import HouseholdLeftSidebar from "./HouseholdLeftSidebar";
import HouseholdVariablePage from "./HouseholdVariablePage";
import MaritalStatus from "./MaritalStatus";
import OutputPanel from "./OutputPanel";

function createDefaultHousehold(country, variables, entities) {
    let situation = {};
    if (country == "uk") {
        situation = {
            "people": {
                "you": {},
            },
            "benunits": {
                "your immediate family": {
                    "members": ["you"],
                },
            },
            "households": {
                "your household": {
                    "members": ["you"],
                },
            },
        }
    } else if (country == "us") {
        situation = {
            "people": {
                "you": {},
            },
            "families": {
                "your family": {
                    "members": ["you"],
                },
            },
            "marital_units": {
                "your marital unit": {
                    "members": ["you"],
                },
            },
            "tax_units": {
                "your tax unit": {
                    "members": ["you"],
                },
            },
            "spm_units": {
                "your household": {
                    "members": ["you"],
                },
            },
            "households": {
                "your household": {
                    "members": ["you"],
                },
            },
        }
    }
    situation = addYearlyVariables(situation, variables, entities);
    return situation;
}

export default function Household() {
    const PolicyEngine = useContext(PolicyEngineContext);
    if (!PolicyEngine.metadata) {
        return null;
    }
    if (!PolicyEngine.household) {
        let household = createDefaultHousehold(
            PolicyEngine.country,
            PolicyEngine.metadata.variables,
            PolicyEngine.metadata.entities,
        );
        PolicyEngine.setState({
            household: household,
        });
        PolicyEngine.simulateHousehold(household);
        return null;
    }
    let mainComponent;
    const lastPartOfPage = PolicyEngine.householdPage.split(".").slice(-1)[0];
    if (PolicyEngine.householdPage == "structure.maritalStatus" || !PolicyEngine.householdPage) {
        mainComponent = <MaritalStatus />;
    } else if (PolicyEngine.householdPage == "structure.children") {
        mainComponent = <CountChildren />;
    } else if (Object.keys(PolicyEngine.metadata.variables).includes(lastPartOfPage)) {
        mainComponent = <HouseholdVariablePage />;
    }
    return <ThreeColumnPage
        left={<HouseholdLeftSidebar />}
        middle={
            <>
                {mainComponent}
                <OutputPanel />
            </>
        }
        right={<>{PolicyEngine.householdPage}</>}
    />
}