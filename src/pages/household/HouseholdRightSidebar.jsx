import { useNavigate, useSearchParams } from "react-router-dom";
import { formatVariableValue, getValueFromHousehold } from "../../api/variables";
import Button from "../../controls/Button";
import Divider from "../../layout/Divider";

function Figure(props) {
    const { left, right } = props;
    return <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "10%",
    }}>
        <div style={{
            flex: 1,
            textAlign: "right",
            paddingRight: 5,
            fontSize: 24,
        }}>{left}</div>
        <div style={{
            flex: 1,
            paddingLeft: 5,
            fontSize: 18,
        }}>{right}</div>
    </div>
}

export default function HouseholdRightSidebar(props) {
    const { household, metadata } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    if (!household || !household.computed) {
        return <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "60%",
            }}
        >
            <h4 style={{marginBottom: 20}}>No household specified</h4>
            <Button text="Create a household" onClick={() => {
                // Navigate to /<country>/household, preserving URL parameters
                const country = metadata.countryId;
                const newSearchParams = {};
                for (const [key, value] of searchParams) {
                    newSearchParams[key] = value;
                }
                newSearchParams.focus = "structure.maritalStatus";
                navigate(`/${country}/household`, { state: { newSearchParams } });
            }} />
        </div>
    }

    const countPeople = Object.keys(household.input.people).length;
    const netIncome = getValueFromHousehold("household_net_income", null, null, household.computed, metadata);
    const mtr = getValueFromHousehold("marginal_tax_rate", "2022", "you", household.computed, metadata);
    const household_net_income = metadata.variables.household_net_income;
    const netIncomeComponents = household_net_income.adds.concat(household_net_income.subtracts);

    return <>
        <Figure left={countPeople} right={countPeople === 1 ? "person" : "people"} />
        <Figure left={formatVariableValue(metadata.variables.household_net_income, netIncome, 0)} right={"net income"} />
        <Figure left={formatVariableValue(metadata.variables.marginal_tax_rate, mtr, 0)} right={"marginal tax rate"} />
        <Divider />
        {netIncomeComponents.map((variableId) => {
            const variable = metadata.variables[variableId];
            const value = getValueFromHousehold(variableId, null, null, household.computed, metadata);
            return <Figure key={variableId} left={formatVariableValue(variable, value, 0)} right={variable.label} />
        })}
        <Button 
            text="See details" 
            onClick={() => {
                let newSearchParams = {};
                for (let [key, value] of searchParams) {
                    newSearchParams[key] = value;
                }
                newSearchParams["focus"] = "householdOutput.netIncome";
                setSearchParams(newSearchParams);
            }} 
            style={{
                marginTop: 10,
            }}
        />
    </>
}