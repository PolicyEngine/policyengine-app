import { useSearchParams } from "react-router-dom";
import { capitalize } from "../../../api/language";
import {
  formatVariableValue,
  getNewHouseholdId,
  getValueFromHousehold,
} from "../../../api/variables";
import LoadingCentered from "../../../layout/LoadingCentered";
import InputField from "../../../controls/InputField";
import { Switch } from "antd";
import SearchOptions from "../../../controls/SearchOptions";
import useMobile from "../../../layout/Responsive";
import NavigationButton from "../../../controls/NavigationButton";

export default function VariableEditor(props) {
  const [searchParams] = useSearchParams();
  const mobile = useMobile();
  const { metadata, household, setHousehold, setHouseholdInput, nextVariable } = props;
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
        isSimulated={isSimulated}
        setHouseholdInput={setHouseholdInput}
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
    isSimulated,
    setHouseholdInput,
  } = props;
  const possibleTimePeriods = Object.keys(
    household.input[entityPlural][entityName][variable.name]
  );
  console.log(possibleTimePeriods)
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
            isSimulated={isSimulated}
            setHouseholdInput={setHouseholdInput}
          />
        );
      })}
    </div>
  );
}

function HouseholdVariableEntityInput(props) {
  const [setSearchParams] = useSearchParams();
  const {
    metadata,
    household,
    variable,
    entityPlural,
    entityName,
    timePeriod,
    isSimulated,
    setHouseholdInput,
  } = props;
  const submitValue = (value) => {
    let newHousehold = household.input;
    newHousehold[entityPlural][entityName][variable.name][timePeriod] = value;
    setHouseholdInput(newHousehold);
    getNewHouseholdId(metadata.countryId, newHousehold).then((householdId) => {
      let newSearch = new URLSearchParams(window.location.search);
      newSearch.set("household", householdId);
      setSearchParams(newSearch);
    });
  };
  const formatValue = (value) => formatVariableValue(variable, value);
  const simulatedValue = getValueFromHousehold(
    variable.name,
    timePeriod,
    entityName,
    isSimulated ? household.baseline : household.input,
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
    console.log("it's an enum")
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
