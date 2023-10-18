import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  formatVariableValue,
  getValueFromHousehold,
} from "../../api/variables";
import NavigationButton from "../../controls/NavigationButton";
import Divider from "../../layout/Divider";
import LoadingCentered from "../../layout/LoadingCentered";
import PolicySearch from "../policy/PolicySearch";

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
  const {
    householdInput,
    householdBaseline,
    metadata,
    autoCompute,
    loading,
    policy,
  } = props;
  const [showReformSearch, setShowReformSearch] = useState(false);
  const [searchParams] = useSearchParams();
  const hasReform = searchParams.get("reform") !== null;
  const focus = searchParams.get("focus") || "";

  if (!householdInput) {
    return <></>;
  }

  const countPeople = Object.keys(householdInput.people).length;
  const marketIncome = getValueFromHousehold(
    "household_market_income",
    null,
    null,
    householdBaseline,
    metadata,
  );
  const mtr = getValueFromHousehold(
    "marginal_tax_rate",
    "2023",
    "you",
    householdBaseline,
    metadata,
  );
  const household_net_income = metadata.variables.household_net_income;
  let netIncomeComponents = household_net_income.adds.concat(
    household_net_income.subtracts,
  );
  netIncomeComponents = netIncomeComponents.filter(
    (component) => component !== "household_market_income",
  );
  netIncomeComponents = ["household_net_income"].concat(netIncomeComponents);

  const calculationResults = (
    <>
      {netIncomeComponents.map((variableId) => {
        const variable = metadata.variables[variableId];
        const value = getValueFromHousehold(
          variableId,
          null,
          null,
          householdBaseline,
          metadata,
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
        left={formatVariableValue(metadata.variables.marginal_tax_rate, mtr, 1)}
        right={"marginal tax rate"}
      />
    </>
  );

  const situationOverview = (
    <>
      <h5
        style={{
          textAlign: "center",
          fontSize: 11,
          marginBottom: 0,
          marginTop: 15,
        }}
      >
        YOUR INPUTS
      </h5>
      <Figure
        left={countPeople}
        right={countPeople === 1 ? "person" : "people"}
      />
      <Figure
        left={formatVariableValue(
          metadata.variables.household_market_income,
          marketIncome,
          0,
        )}
        right={"market income"}
      />
      <Divider />
      <h5
        style={{
          textAlign: "center",
          fontSize: 11,
          marginBottom: 0,
          marginTop: 15,
        }}
      >
        OUR CALCULATION
      </h5>
      {hasReform && (
        <h5
          style={{
            textAlign: "center",
            fontSize: 11,
            marginBottom: 0,
            marginTop: 5,
          }}
        >
          UNDER CURRENT LAW
        </h5>
      )}
      {showReformSearch ? (
        <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
          <PolicySearch
            metadata={metadata}
            policy={policy}
            target="reform"
            width="100%"
            onSelect={() => setShowReformSearch(false)}
          />
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            href="#"
            style={{ textAlign: "center", width: "100%" }}
            onClick={() => setShowReformSearch(true)}
          >
            compare against a reform
          </a>
        </div>
      )}
      {loading ? (
        <LoadingCentered minHeight="25vh" height="25vh" />
      ) : (
        calculationResults
      )}
    </>
  );
  const notEnoughInfo = (
    <div
      style={{
        minHeight: "50vh",
        padding: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h5 style={{ textAlign: "center" }}>
        Tell us more about your household to see your results
      </h5>
    </div>
  );

  return (
    <>
      {autoCompute && householdBaseline ? situationOverview : notEnoughInfo}
      {focus && focus.startsWith("householdOutput") && (
        <NavigationButton
          primary
          text="Add more household details"
          focus="input"
        />
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
