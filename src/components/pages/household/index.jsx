import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import style from "../../../style";
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
        PolicyEngine.setState({
            household: createDefaultHousehold(
                PolicyEngine.country,
                PolicyEngine.metadata.variables,
                PolicyEngine.metadata.entities,
            ),
        })
        return null;
    }
    let mainComponent;
    if (PolicyEngine.page == "structure.maritalStatus" || !PolicyEngine.page) {
        mainComponent = <MaritalStatus />;
    } else if (PolicyEngine.page == "structure.children") {
        mainComponent = <CountChildren />;
    } else if (Object.keys(PolicyEngine.metadata.variables).includes(PolicyEngine.page)) {
        mainComponent = <HouseholdVariablePage />;
    }
    return <>
        <div style={{
            height: `calc(100vh - ${style.spacing.HEADER_SIZE}px)`,
            display: "flex",
        }}>
            <div style={{
                width: "20%",
                backgroundColor: "white",
                padding: 20,
            }}>
                <HouseholdLeftSidebar />
            </div>
            <div style={{
                width: "60%",
                backgroundColor: "#f5f5f5",
            }}>
                <AnimatePresence>
                    <motion.div 
                        style={{padding: 20}}
                        initial={{x: -100, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        exit={{x: 100, opacity: 0}}
                    >
                        {mainComponent}
                    </motion.div>
                </AnimatePresence>
                <OutputPanel />
            </div>
            <div style={{
                width: "20%",
                backgroundColor: "white",
                padding: 20,
            }}>
                <h3>Overview</h3>
                {
                    PolicyEngine.page
                }
            </div>
        </div>
    </>
}