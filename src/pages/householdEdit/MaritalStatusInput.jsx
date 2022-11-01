import { useContext } from "react";
import PolicyEngineContext from "../../countries/PolicyEngine";
import RadioButton from "./radioButton";

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

function setMaritalStatus(householdData, maritalStatus, country) {
    let newHouseholdData = JSON.parse(JSON.stringify(householdData));
    const currentStatus = getMaritalStatus(newHouseholdData, country);
    if (currentStatus === maritalStatus) {
        return newHouseholdData;
    } else if (maritalStatus === "married") {
        newHouseholdData = addPartner(newHouseholdData, country);
    } else if (maritalStatus === "single") {
        newHouseholdData = removePartner(newHouseholdData, country);
    }
    return newHouseholdData;
}

function addPartner(householdData, country) {
    if (country === "uk") {
        return addUKPartner(householdData);
    } else if (country === "us") {
        return addUSPartner(householdData);
    }
}

function removePartner(householdData, country) {
    if (country === "uk") {
        return removeUKPartner(householdData);
    } else if (country === "us") {
        return removeUSPartner(householdData);
    }
}

function addUKPartner(householdData) {
    const newHouseholdData = JSON.parse(JSON.stringify(householdData));
    const newPartner = {
        age: { 2022: 30 },
        employment_income: { 2022: 0 },
        self_emplyment_income: { 2022: 0 },
        pension_income: { 2022: 0 },
        property_income: { 2022: 0 },
        savings_interest_income: { 2022: 0 },
        dividend_income: { 2022: 0 },
    };
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

function addUSPartner(householdData) {
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
            PolicyEngine.setHouseholdData(setMaritalStatus(PolicyEngine.household.household, status, PolicyEngine.country));
        }}
        title="What is your marital status?"
        keys={["single", "married"]}
        labels={["Single", "Married"]}
    />
  );
}
