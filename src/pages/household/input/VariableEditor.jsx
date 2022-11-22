import { useSearchParams } from "react-router-dom";
import { capitalize } from "../../../api/language";
import {
  formatVariableValue,
  getNewHouseholdId,
  getValueFromHousehold,
} from "../../../api/variables";
import LoadingCentered from "../../../layout/LoadingCentered";
import InputField from "../../../controls/InputField";

export default function VariableEditor(props) {
  const [searchParams] = useSearchParams();
  const { metadata, household, setHousehold } = props;
  if (!household.input) {
    return <LoadingCentered />;
  }
  let variableName;
  try {
    variableName = searchParams.get("focus").split(".").slice(-1)[0];
  } catch (e) {
    return null;
  }
  const variable = metadata.variables[variableName];
  const entityPlural = metadata.entities[variable.entity].plural;
  const isSimulated = !variable.isInputVariable;
  const possibleEntities = Object.keys(household.input[entityPlural]).filter(
    (entity) => household.input[entityPlural][entity][variable.name]
  );
  return (
    <>
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
        <h1 style={{ marginBottom: 20 }}>What is your {variable.label}?</h1>
        <h4>{variable.documentation}</h4>
        {isSimulated && (
          <h5>
            This variable is calculated from other variables you've entered.
            Editing it will override the simulated value.
          </h5>
        )}
        {possibleEntities.map((entity) => {
          return (
            <HouseholdVariableEntity
              variable={variable}
              household={household}
              entityPlural={entityPlural}
              entityName={entity}
              setHousehold={setHousehold}
              metadata={metadata}
              key={entity}
            />
          );
        })}
      </div>
    </>
  );
}

function HouseholdVariableEntity(props) {
  const {
    variable,
    household,
    entityPlural,
    entityName,
    setHousehold,
    metadata,
  } = props;
  const possibleTimePeriods = Object.keys(
    household.input[entityPlural][entityName][variable.name]
  );
  return (
    <div>
      {possibleTimePeriods.map((timePeriod) => {
        return (
          <HouseholdVariableEntityInput
            variable={variable}
            entityPlural={entityPlural}
            entityName={entityName}
            timePeriod={timePeriod}
            household={household}
            key={timePeriod}
            setHousehold={setHousehold}
            metadata={metadata}
          />
        );
      })}
    </div>
  );
}

function HouseholdVariableEntityInput(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    metadata,
    household,
    setHousehold,
    variable,
    entityPlural,
    entityName,
    timePeriod,
  } = props;
  const submitValue = (value) => {
    let newHousehold = JSON.parse(JSON.stringify(household.input));
    newHousehold[entityPlural][entityName][variable.name][timePeriod] = value;
    getNewHouseholdId(metadata.countryId, newHousehold)
      .then((householdId) => {
        let newSearch = {};
        for (const [key, value] of searchParams) {
          newSearch[key] = value;
        }
        newSearch.household = householdId;
        setSearchParams(newSearch);
      });
  };
  const formatValue = (value) => formatVariableValue(variable, value);
  const simulatedValue = getValueFromHousehold(
    variable.name,
    timePeriod,
    entityName,
    household.simulated || household.input,
    metadata
  );
  // The input field should hide its arrows
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <h5 style={{ width: 200, textAlign: "right" }}>
        {capitalize(entityName)}:{" "}
      </h5>
      <InputField
        onChange={submitValue}
        placeholder={formatValue(simulatedValue)}
      />

      <h5>in {timePeriod}</h5>
    </div>
  );
}
