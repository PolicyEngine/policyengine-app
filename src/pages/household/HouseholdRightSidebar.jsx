import { useSearchParams } from "react-router-dom";
import {
  formatVariableValue,
  getValueFromHousehold,
} from "../../api/variables";
import SearchParamNavButton from "../../controls/SearchParamNavButton";
import LoadingCentered from "../../layout/LoadingCentered";
import PolicySearch from "../policy/PolicySearch";
import Collapsible from "../../layout/Collapsible";

function Figure(props) {
  const { left, right } = props;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "10%",
        marginTop: 20,
      }}
    >
      <div
        style={{
          paddingRight: 5,
          paddingLeft: 0,
          fontSize: 24,
        }}
      >
        {left}
      </div>
      <div
        style={{
          paddingLeft: 5,
          paddingRight: 5,
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
    year,
  } = props;
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
    year,
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
    <div>
      <p
        style={{
          marginBottom: 0,
          marginTop: 15,
          fontFamily: "Roboto",
          color: "grey",
          fontSize: 14,
        }}
      >
        Your inputs
      </p>
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
      <p
        style={{
          marginBottom: 0,
          marginTop: 15,
          fontFamily: "Roboto",
          color: "grey",
          fontSize: 14,
        }}
      >
        Our calculation{hasReform ? " under your reform" : " under current law"}
      </p>
      <div style={{ marginLeft: -15 }}>
        <Collapsible
          style={{ paddingLeft: 0 }}
          label={
            hasReform
              ? "Compare against a different reform"
              : "Compare against a reform"
          }
          child={
            <PolicySearch
              metadata={metadata}
              policy={policy}
              target="reform"
              width="100%"
            />
          }
        />
      </div>
      {loading ? (
        <LoadingCentered minHeight="25vh" height="25vh" />
      ) : (
        calculationResults
      )}
    </div>
  );

  const notEnoughInfo = (
    <div
      style={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>Tell us more about your household to see your results</p>
    </div>
  );

  const hasHouseholdDetails = autoCompute && householdBaseline;

  return (
    <div
      style={{
        marginLeft: 20,
        marginRight: 20,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <div>
        {autoCompute && householdBaseline ? situationOverview : notEnoughInfo}
      </div>
      <div style={{ marginBottom: 20 }}>
        {focus && focus.startsWith("householdOutput") && (
          <SearchParamNavButton
            type="primary"
            text="Add more household details"
            focus="input"
            style={{ width: "100%", marginTop: 20 }}
          />
        )}
        {focus && !focus.startsWith("householdOutput") && (
          <SearchParamNavButton
            type="primary"
            text="See my household details"
            focus="householdOutput.netIncome"
            style={{ width: "100%", marginTop: 20 }}
          />
        )}
        {hasHouseholdDetails && (
          <SearchParamNavButton
            text={hasReform ? "View Economic Impact" : "Create a Reform"}
            focus="gov"
            type="secondary"
            target={`/${metadata.countryId}/policy`}
            style={{ width: "100%", marginTop: 20 }}
          />
        )}
      </div>
    </div>
  );
}
