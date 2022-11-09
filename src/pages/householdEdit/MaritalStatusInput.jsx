import { useContext } from "react";
import PolicyEngineContext from "../../countries/PolicyEngine";
import RadioButton from "./RadioButton";

function getMaritalStatus(householdData, country) {
    if (country === "uk") {
        return getUKMaritalStatus(householdData);
    } else if (country === "us") {
        return getUSMaritalStatus(householdData);
    }
}

function getUKMaritalStatus(householdData) {
    return Object.keys(householdData.people).filter(
        (personId) => {
            return householdData.people[personId].age[2022] >= 18;
        }
    ).length === 2 ? "married" : "single";
}

function getUSMaritalStatus(householdData) {
    return; // TODO
}

function setMaritalStatus(householdData, maritalStatus, country, variables) {
    let newHouseholdData = JSON.parse(JSON.stringify(householdData));
    const currentStatus = getMaritalStatus(newHouseholdData, country);
    if (currentStatus === maritalStatus) {
        return newHouseholdData;
    } else if (maritalStatus === "married") {
        newHouseholdData = addPartner(newHouseholdData, country, variables);
    } else if (maritalStatus === "single") {
        newHouseholdData = removePartner(newHouseholdData, country);
    }
    return newHouseholdData;
}

function addPartner(householdData, country, variables) {
    if (country === "uk") {
        return addUKPartner(householdData, variables);
    } else if (country === "us") {
        return addUSPartner(householdData, variables);
    }
}

function removePartner(householdData, country) {
    if (country === "uk") {
        return removeUKPartner(householdData);
    } else if (country === "us") {
        return removeUSPartner(householdData);
    }
}

function addUKPartner(householdData, variables) {
    const newHouseholdData = JSON.parse(JSON.stringify(householdData));
    const inputVariables = Object.values(variables).filter((variable) => (
        (variable.isInputVariable)
        && (variable.definitionPeriod == "year")
        && (["float", "int"].includes(variable.valueType))
        && (variable.entity == "person")
    ));
    const outputVariables = Object.values(variables).filter((variable) => (
        (!variable.isInputVariable)
        && (variable.definitionPeriod == "year")
        && (["float", "int"].includes(variable.valueType))
        && (variable.entity == "person")
    ));
    let newPartner = {
        marginal_tax_rate: { 2022: null },
    };
    for (let variable of inputVariables) {
        newPartner[variable.name] = { 2022: variable.defaultValue };
    }
    for (let variable of outputVariables) {
        newPartner[variable.name] = { 2022: null };
    }

    newHouseholdData.people["Your spouse"] = newPartner;
    newHouseholdData.benunits["Your benefit unit"].members.push("Your spouse");
    newHouseholdData.households["Your household"].members.push("Your spouse");
    return newHouseholdData;
}

function removeUKPartner(householdData) {
    const newHouseholdData = JSON.parse(JSON.stringify(householdData));
    const name = "Your spouse";
    delete newHouseholdData.people[name];
    newHouseholdData.benunits["Your benefit unit"].members = newHouseholdData.benunits["Your benefit unit"].members.filter((member) => {
        return member !== name;
      });
    newHouseholdData.households["Your household"].members = newHouseholdData.households["Your household"].members.filter((member) => {
        return member !== name;
      });
    return newHouseholdData;
}

function addUSPartner(householdData, variables) {
    return; // TODO
}

function removeUSPartner(householdData) {
    return; // TODO
}

export default function MaritalStatusInput(props) {
  const PolicyEngine = useContext(PolicyEngineContext);
  return (
    <RadioButton
        selected={getMaritalStatus(PolicyEngine.household.household, PolicyEngine.country)}
        onSelect={(status) => {
            PolicyEngine.setHouseholdData(setMaritalStatus(PolicyEngine.household.household, status, PolicyEngine.country, PolicyEngine.variables));
        }}
        title="What is your marital status?"
        keys={["single", "married"]}
        labels={["Single", "Married"]}
    />
  );
}
