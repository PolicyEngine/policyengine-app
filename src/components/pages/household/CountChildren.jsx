import { useState } from "react";
import RadioButton from "../../controls/RadioButton";
import { motion } from "framer-motion";
import { addYearlyVariables, removePerson } from "./common";
import { useContext } from "react";
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import { capitalize } from "../../../logic/language";
import style from "../../../style";

function getUKCountChildren(situation) {
    return Object.values(situation.people)
        .filter(
            (person) =>
                person.age["2022"] < 18
        ).length;
}

function getUKChildName(index) {
    // 'your first child', 'your second child', etc.
    return "your " + ["first", "second", "third", "fourth", "fifth"][index] + " child"
}

function addUKChild(situation) {
    const defaultChild = {
        "age": {"2022": 10},
    }
    const childName = getUKChildName(getUKCountChildren(situation));
    situation.people[childName] = defaultChild;
    situation.benunits["your immediate family"].members.push(childName);
    situation.households["your household"].members.push(childName);
    return situation;
}

function setUKCountChildren(situation, countChildren, variables, entities) {
    while (getUKCountChildren(situation) < countChildren) {
        situation = addUKChild(situation);
    }
    while (getUKCountChildren(situation) > countChildren) {
        situation = removePerson(situation, getUKChildName(getUKCountChildren(situation) - 1));
    }
    situation = addYearlyVariables(situation, variables, entities);
    return situation;
}

function getUSCountChildren(situation) {
    return null;
}

function setUSCountChildren(situation, countChildren, variables, entities) {
    return situation;
}


export default function CountChildren(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const getCountChildren = PolicyEngine.country == "uk" ? getUKCountChildren : getUSCountChildren;
    const setCountChildrenInHousehold = PolicyEngine.country == "uk" ? setUKCountChildren : setUSCountChildren;
    const variablesInOrder = PolicyEngine.variablesInOrder;
    const nextVariable = PolicyEngine.metadata.variables[variablesInOrder[0]];
    const setCountChildren = (countChildren) => {
        let newHousehold = setCountChildrenInHousehold(
            PolicyEngine.household,
            countChildren,
            PolicyEngine.metadata.variables,
            PolicyEngine.metadata.entities,
        );
        PolicyEngine.setState({household: newHousehold, earningsVariationIsOutdated: true});
        PolicyEngine.simulateHousehold(newHousehold);
    };
    const radioButtonComponent = <RadioButton
        keys={[0, 1, 2, 3, 4, 5]}
        labels={["None", "1", "2", "3", "4", "5"]}
        value={getCountChildren(PolicyEngine.household)}
        onChange={setCountChildren}
    />
    // A big, centered header with the question, and the radio buttons below it
    return <>
        <motion.div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20%"
            }}
        >
            <h1 style={{marginBottom: 20}}>How many children do you have?</h1>
            {radioButtonComponent}
            <h4
                style={{
                    marginTop: 50,
                    color: style.colors.BLACK,
                    cursor: "pointer",
                }}
                onClick={() => PolicyEngine.setState({page: nextVariable.moduleName + "." + nextVariable.name})}
            >&#8594; {capitalize(PolicyEngine.metadata.variables[variablesInOrder[0]].label)}</h4>
        </motion.div>
    </>
}