import { useSearchParams } from "react-router-dom";
import {
  formatVariableValue,
  getValueFromHousehold,
} from "../../api/variables";
import NavigationButton from "../../controls/NavigationButton";
import Divider from "../../layout/Divider";

function Figure(props) {
  const { left, right } = props;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "10%",
      }}
    >
      <div
        style={{
          flex: 1,
          textAlign: "right",
          paddingRight: 5,
          paddingLeft: 15,
          fontSize: 24,
        }}
      >
        {left}
      </div>
      <div
        style={{
          flex: 1,
          paddingLeft: 5,
          paddingRight: 15,
          fontSize: 18,
        }}
      >
        {right}
      </div>
    </div>
  );
}

export default function HouseholdRightSidebar(props) {
  const { household, metadata } = props;
  const [searchParams] = useSearchParams();
  const hasReform = searchParams.get("reform") !== null;
  const focus = searchParams.get("focus") || "";

  if (!household.input) {
    return <></>;
  }

  const countPeople = Object.keys(household.input.people).length;
  const marketIncome = getValueFromHousehold(
    "household_market_income",
    null,
    null,
    household.baseline,
    metadata
  );
  const mtr = getValueFromHousehold(
    "marginal_tax_rate",
    "2022",
    "you",
    household.baseline,
    metadata
  );
  const household_net_income = metadata.variables.household_net_income;
  let netIncomeComponents = household_net_income.adds.concat(
    household_net_income.subtracts
  );
  netIncomeComponents = netIncomeComponents.filter(
    (component) => component !== "household_market_income"
  );
  netIncomeComponents = ["household_net_income"].concat(netIncomeComponents);

  return (
    <>
      <Figure
        left={countPeople}
        right={countPeople === 1 ? "person" : "people"}
      />
      <Figure
        left={formatVariableValue(
          metadata.variables.household_market_income,
          marketIncome,
          0
        )}
        right={"market income"}
      />
      <Divider />
      {netIncomeComponents.map((variableId) => {
        const variable = metadata.variables[variableId];
        const value = getValueFromHousehold(
          variableId,
          null,
          null,
          household.baseline,
          metadata
        );
        return (
          <Figure
            key={variableId}
            left={formatVariableValue(variable, value, 0)}
            right={variable.label}
          />
        );
      })}
      <Figure
        left={formatVariableValue(metadata.variables.marginal_tax_rate, mtr, 0)}
        right={"marginal tax rate"}
      />
      {focus && focus.startsWith("householdOutput") && (
        <NavigationButton primary text="Add more household details" focus="input" />
      )}
      {focus && !focus.startsWith("householdOutput") && (
        <NavigationButton
          primary
          text="See my household details"
          focus="householdOutput"
        />
      )}
      {!hasReform && (
        <NavigationButton
          text="Create a reform"
          focus="gov"
          target={`/${metadata.countryId}/policy`}
        />
      )}
      {hasReform && (
        <NavigationButton
          text="Edit my reform"
          focus="gov"
          target={`/${metadata.countryId}/policy`}
        />
      )}
    </>
  );
}
