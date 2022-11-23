import { useNavigate, useSearchParams } from "react-router-dom";
import { copySearchParams } from "../../api/call";
import {
  formatVariableValue,
  getValueFromHousehold,
} from "../../api/variables";
import Button from "../../controls/Button";
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
          fontSize: 24,
        }}
      >
        {left}
      </div>
      <div
        style={{
          flex: 1,
          paddingLeft: 5,
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
  const navigate = useNavigate();

  if (!household || !household.baseline || !household.input) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "60%",
        }}
      >
        <h4 style={{ marginBottom: 20 }}>No household specified</h4>
        <Button
          text="Create a household"
          onClick={() => {
            // Navigate to /<country>/household, preserving URL parameters
            const country = metadata.countryId;
            const newSearchParams = {};
            for (const [key, value] of searchParams) {
              newSearchParams[key] = value;
            }
            newSearchParams.focus = "structure.maritalStatus";
            let url = `/${country}/household`;
            if (Object.keys(newSearchParams).length > 0) {
              url += `?${new URLSearchParams(newSearchParams)}`;
            }
            navigate(url);
          }}
        />
      </div>
    );
  }

  const countPeople = Object.keys(household.input.people).length;
  const netIncome = getValueFromHousehold(
    "household_net_income",
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
  const netIncomeComponents = household_net_income.adds.concat(
    household_net_income.subtracts
  );

  return (
    <>
      <Figure
        left={countPeople}
        right={countPeople === 1 ? "person" : "people"}
      />
      <Figure
        left={formatVariableValue(
          metadata.variables.household_net_income,
          netIncome,
          0
        )}
        right={"net income"}
      />
      <Figure
        left={formatVariableValue(metadata.variables.marginal_tax_rate, mtr, 0)}
        right={"marginal tax rate"}
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
      <Button
        text="See details"
        onClick={() => {
          let newSearch = copySearchParams(searchParams);
          newSearch.set("focus", "householdOutput.netIncome");
          const newUrl = `/${metadata.countryId}/household?${newSearch}`;
          navigate(newUrl);
        }}
        style={{
          marginTop: 10,
        }}
      />
    </>
  );
}
