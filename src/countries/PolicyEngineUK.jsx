import { PolicyEngine } from "./PolicyEngine";

export default class PolicyEngineUK extends PolicyEngine {
    constructor() {
        super("uk");

        this.country = "uk";
    }

    getDefaultHousehold(variables) {
        let structure = {
            people: {
                "You": {},
            },
            benunits: {
                "Your benefit unit": {
                    members: ["You"],
                },
            },
            households: {
                "Your household": {
                    members: ["You"],
                },
            },
        }
        const inputVariables = Object.values(variables).filter((variable) => (
            (variable.isInputVariable)
            && (variable.definitionPeriod == "year")
            && (variable.valueType == "float")
        ));
        for (let variable of inputVariables) {
            if (variable.entity == "person") {
                structure.people["You"][variable.name] = {
                    2022: variable.defaultValue,
                }
            } else if (variable.entity == "benunit") {
                structure.benunits["Your benefit unit"][variable.name] = {
                    2022: variable.defaultValue,
                }
            } else if (variable.entity == "household") {
                structure.households["Your household"][variable.name] = {
                    2022: variable.defaultValue,
                }
            }
        }
        const outputVariables = Object.values(variables).filter((variable) => (
            (!variable.isInputVariable)
            && (variable.definitionPeriod == "year")
            && (variable.valueType == "float")
        ));
        for (let variable of outputVariables) {
            if (variable.entity == "person") {
                structure.people["You"][variable.name] = {
                    2022: null,
                }
            } else if (variable.entity == "benunit") {
                structure.benunits["Your benefit unit"][variable.name] = {
                    2022: null,
                }
            } else if (variable.entity == "household") {
                structure.households["Your household"][variable.name] = {
                    2022: null,
                }
            }
        }
        return structure;
    }
}