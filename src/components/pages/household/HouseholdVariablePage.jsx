import { useContext } from "react";
import { capitalize } from "../../../logic/language";
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import { motion } from "framer-motion";
import { formatVariableValue } from "../../../logic/variableValues";
import style from "../../../style";

function HouseholdVariableEntityInput(props) {
    const { variable, entityPlural, entityName, timePeriod } = props;
    const PolicyEngine = useContext(PolicyEngineContext);
    const submitValue = (value) => {
        let newHousehold = PolicyEngine.household;
        newHousehold[entityPlural][entityName][variable.name][timePeriod] = value;
        PolicyEngine.setState({
            household: newHousehold,
            earningsVariationIsOutdated: true,
        });
        PolicyEngine.simulateHousehold(newHousehold);

    };
    const formatValue = value => formatVariableValue(variable, value);
    const inputValue = PolicyEngine.household[entityPlural][entityName][variable.name][timePeriod];
    const simulatedValue = PolicyEngine.getSimulatedValue(variable.name, timePeriod, entityName);
    // The input field should hide its arrows
    return <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        }}>
        <h5 style={{width: 200, textAlign: "right"}}>{capitalize(entityName)}: </h5>
        <motion.input
            pattern="[0-9]*"
            style={{
                padding: 20,
                marginLeft: 20,
                marginRight: 20,
                width: 200,
            }}
            whileFocus={{ scale: 1.05 }}
            onKeyUp={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    e.target.blur();
                    let value = e.target.value;
                    e.target.value = null;
                    submitValue(value);
                }
            }}
            placeholder={simulatedValue === null ? formatValue(inputValue) : formatValue(simulatedValue)}
        />
        <h5>in {timePeriod}</h5>
    </div>
}

function HouseholdVariableEntity(props) {
    const { variable, entityPlural, entityName } = props;
    const PolicyEngine = useContext(PolicyEngineContext);
    const possibleTimePeriods = Object.keys(PolicyEngine.household[entityPlural][entityName][variable.name]);
    return <div>
        {possibleTimePeriods.map((timePeriod) => {
            return <HouseholdVariableEntityInput
                variable={variable}
                entityPlural={entityPlural}
                entityName={entityName}
                timePeriod={timePeriod}
                key={timePeriod}
            />
        }
        )}
    </div>
}


export default function HouseholdVariablePage(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const selectedVariable = PolicyEngine.metadata.variables[PolicyEngine.page];
    const entityPlural = PolicyEngine.metadata.entities[selectedVariable.entity].plural;
    const variablesInOrder = PolicyEngine.variablesInOrder;
    const index = variablesInOrder.indexOf(PolicyEngine.page);
    const nextVariable = variablesInOrder[index + 1];
    const isSimulated = !selectedVariable.isInputVariable;
    const possibleEntities = Object.keys(PolicyEngine.household[entityPlural])
        .filter(
            (entity) => PolicyEngine.household[entityPlural][entity][selectedVariable.name]
        );
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "15%",
                paddingLeft: 50,
                paddingRight: 50,
            }}
        >
            <h1 style={{marginBottom: 20}}>What is your {selectedVariable.label}?</h1>
            <h4>{selectedVariable.documentation}</h4>
            {
                isSimulated && <h5>This variable is calculated from other variables you've entered. Editing it will override the simulated value.</h5>
            }
            {possibleEntities.map((entity) => {
                return <HouseholdVariableEntity
                    variable={selectedVariable}
                    entityPlural={entityPlural}
                    entityName={entity}
                />
            })}
            {
                nextVariable && 
                <h4
                    style={{
                        marginTop: 50,
                        color: style.colors.BLACK,
                        cursor: "pointer",
                    }}
                    onClick={() => PolicyEngine.setState({page: nextVariable})}
                >&#8594; {capitalize(PolicyEngine.metadata.variables[nextVariable].label)}</h4>
            }
        </div>
    </>
}