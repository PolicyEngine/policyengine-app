import { useContext, useState } from "react";
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import style from "../../../style";
import RadioButton from "../../controls/RadioButton";
import { addYearlyVariables, removePerson } from "./common";

function getUKMaritalStatus(situation) {
    const partnerName = "your partner";
    if (partnerName in situation.people) {
        return "married";
    } else {
        return "single";
    }
}

function setUKMaritalStatus(situation, status, variables, entities) {
    const currentStatus = getUKMaritalStatus(situation);
    const defaultPartner = {
        "age": {"2022": 30},
    }
    const partnerName = "your partner";
    if (status == "married" && currentStatus == "single") {
        situation.people[partnerName] = defaultPartner;
        situation.benunits["your immediate family"].members.push(partnerName);
        situation.households["your household"].members.push(partnerName);
        situation = addYearlyVariables(situation, variables, entities);
    } else if (status == "single" && currentStatus == "married") {
        situation = removePerson(situation, partnerName);
    }
    return situation;
}

function getUSMaritalStatus(situation) {
    const partnerName = "your partner";
    if (partnerName in situation.people) {
        return "married";
    } else {
        return "single";
    }
}

function setUSMaritalStatus(situation, status, variables, entities) {
    const currentStatus = getUSMaritalStatus(situation);
    const defaultPartner = {
        "age": {"2022": 30},
    }
    const partnerName = "your partner";
    if (status == "married" && currentStatus == "single") {
        situation.people[partnerName] = defaultPartner;
        situation.families["your family"].members.push(partnerName);
        situation.marital_units["your marital unit"].members.push(partnerName);
        situation.tax_units["your tax unit"].members.push(partnerName);
        situation.spm_units["your household"].members.push(partnerName);
        situation.households["your household"].members.push(partnerName);
        situation = addYearlyVariables(situation, variables, entities);
    } else if (status == "single" && currentStatus == "married") {
        situation = removePerson(situation, partnerName);
    }
    return situation;
}


export default function MaritalStatus(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const getMaritalStatus = PolicyEngine.country == "uk" ? getUKMaritalStatus : getUSMaritalStatus;
    const setMaritalStatusInHousehold = PolicyEngine.country == "uk" ? setUKMaritalStatus : setUSMaritalStatus;
    const setMaritalStatus = status => {
        let newHousehold = setMaritalStatusInHousehold(
            PolicyEngine.household,
            status,
            PolicyEngine.metadata.variables,
            PolicyEngine.metadata.entities,
        );
        PolicyEngine.setState({household: newHousehold});
        PolicyEngine.simulateHousehold(newHousehold);
    }
    const radioButtonComponent = <RadioButton
        keys={["single", "married"]}
        labels={["Single", "Married"]}
        value={PolicyEngine.simulatedHousehold && getMaritalStatus(PolicyEngine.household)}
        onChange={setMaritalStatus}
    />
    // A big, centered header with the question, and the radio buttons below it
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20%"
            }}
        >
            <h1 style={{marginBottom: 20}}>What is your marital status?</h1>
            {radioButtonComponent}
            <h4
                style={{
                    marginTop: 50,
                    color: style.colors.BLACK,
                    cursor: "pointer",
                }}
                onClick={() => PolicyEngine.setState({page: "structure.children"})}
            >&#8594; Children</h4>
        </div>
    </>
}