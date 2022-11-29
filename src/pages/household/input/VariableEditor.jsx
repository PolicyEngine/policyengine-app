import { useSearchParams } from "react-router-dom";
import { capitalize } from "../../../api/language";
import {
  formatVariableValue,
  getNewHouseholdId,
  getValueFromHousehold,
} from "../../../api/variables";
import LoadingCentered from "../../../layout/LoadingCentered";
import InputField from "../../../controls/InputField";
import { copySearchParams } from "../../../api/call";
import { Switch } from "antd";
import SearchOptions from "../../../controls/SearchOptions";
import useMobile from "../../../layout/Responsive";
import NavigationButton from "../../../controls/NavigationButton";

export default function VariableEditor(props) {
  const [searchParams] = useSearchParams();
  const mobile = useMobile();
  const { metadata, household, setHousehold, loading } = props;
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
  const variableNames = metadata.variablesInOrder;
  const nextVariable =
    variableNames[variableNames.indexOf(searchParams.get("focus")) + 1];
  const entityInputs = possibleEntities.map((entity) => {
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
  });
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: mobile ? 10 : "15%",
          paddingLeft: mobile ? 10 : 50,
          paddingRight: mobile ? 10 : 50,
        }}
      >
        <h1 style={{ marginBottom: 20, textAlign: "center" }}>
          What {variable.label.endsWith("s") ? "are" : "is"} your{" "}
          {variable.label}?
        </h1>
        <h4 style={{ textAlign: "center" }}>{variable.documentation}</h4>
        {isSimulated && (
          <p style={{ textAlign: "center" }}>
            This variable is calculated from other variables you've entered.
            Editing it will override the simulated value.
          </p>
        )}
        {entityInputs}
        {nextVariable && (
          <NavigationButton
            text="Enter"
            focus={nextVariable}
            primary
            disabled={loading}
          />
        )}
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
    variable,
    entityPlural,
    entityName,
    timePeriod,
  } = props;
  const submitValue = (value) => {
    let newHousehold = JSON.parse(JSON.stringify(household.input));
    newHousehold[entityPlural][entityName][variable.name][timePeriod] = value;
    getNewHouseholdId(metadata.countryId, newHousehold).then((householdId) => {
      let newSearch = copySearchParams(searchParams);
      newSearch.set("household", householdId);
      setSearchParams(newSearch);
    });
  };
  const formatValue = (value) => formatVariableValue(variable, value);
  const simulatedValue = getValueFromHousehold(
    variable.name,
    timePeriod,
    entityName,
    household.baseline || household.input,
    metadata
  );
  let control;
  if (variable.valueType === "float" || variable.valueType === "int") {
    control = (
      <InputField
        onChange={submitValue}
        placeholder={formatValue(simulatedValue)}
        autofocus={true}
      />
    );
  } else if (variable.valueType === "bool") {
    control = (
      <div style={{ margin: 20 }}>
        <Switch
          onChange={submitValue}
          checked={simulatedValue}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      </div>
    );
  } else if (variable.valueType === "Enum") {
    control = (
      <SearchOptions
        options={variable.possibleValues}
        defaultValue={simulatedValue}
        onSelect={submitValue}
      />
    );
  }
  // The input field should hide its arrows
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          marginBottom: 10,
        }}
      >
        <h5 style={{ width: "100%", textAlign: "right", margin: 0 }}>
          {capitalize(entityName)}:{" "}
        </h5>
        <div
          style={{ width: "180%", display: "flex", justifyContent: "center" }}
        >
          {control}
        </div>
        <h5 style={{ margin: 0, width: "100%" }}>in {timePeriod}</h5>
      </div>
    </>
  );
}
