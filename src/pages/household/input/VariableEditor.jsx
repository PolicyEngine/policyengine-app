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
import gtag from "../../../api/analytics";

export default function VariableEditor(props) {
  const [searchParams] = useSearchParams();
  const mobile = useMobile();
  const {
    metadata,
    householdInput,
    householdBaseline,
    householdReform,
    setHouseholdInput,
    nextVariable,
  } = props;
  if (!householdInput) {
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
  const possibleEntities = Object.keys(householdInput[entityPlural]).filter(
    (entity) => householdInput[entityPlural][entity][variable.name]
  );
  const entityInputs = possibleEntities.map((entity) => {
    return (
      <HouseholdVariableEntity
        variable={variable}
        householdInput={householdInput}
        householdBaseline={householdBaseline}
        householdReform={householdReform}
        entityPlural={entityPlural}
        entityName={entity}
        metadata={metadata}
        key={entity}
        isSimulated={isSimulated}
        setHouseholdInput={setHouseholdInput}
        nextVariable={nextVariable}
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
        <h4 style={{ textAlign: "center", paddingBottom: 10 }}>
          {variable.documentation}
        </h4>
        {isSimulated && (
          <p style={{ textAlign: "center" }}>
            This variable is calculated from other variables you've entered.
            Editing it will override the simulated value.
          </p>
        )}
        {entityInputs}
        {nextVariable && (
          <NavigationButton text="Enter" focus={nextVariable} primary />
        )}
      </div>
    </>
  );
}

function HouseholdVariableEntity(props) {
  const {
    variable,
    householdInput,
    householdBaseline,
    householdReform,
    entityPlural,
    entityName,
    metadata,
    isSimulated,
    setHouseholdInput,
    nextVariable,
  } = props;
  const possibleTimePeriods = Object.keys(
    householdInput[entityPlural][entityName][variable.name]
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
            householdInput={householdInput}
            householdBaseline={householdBaseline}
            householdReform={householdReform}
            key={`${entityName}.${timePeriod}.${variable.name}`}
            metadata={metadata}
            isSimulated={isSimulated}
            setHouseholdInput={setHouseholdInput}
            nextVariable={nextVariable}
          />
        );
      })}
    </div>
  );
}

function HouseholdVariableEntityInput(props) {
  // eslint-disable-next-line no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const {
    metadata,
    householdInput,
    householdBaseline,
    householdReform,
    variable,
    entityPlural,
    entityName,
    timePeriod,
    setHouseholdInput,
    autoCompute,
    nextVariable,
  } = props;
  const submitValue = (value) => {
    let newHousehold = JSON.parse(JSON.stringify(householdInput));
    newHousehold[entityPlural][entityName][variable.name][timePeriod] = value;
    setHouseholdInput(newHousehold);
    gtag("event", "input", {
      event_category: "household",
      event_label: variable.name,
    });
    if(autoCompute || (nextVariable.startsWith("householdOutput."))) {
      getNewHouseholdId(metadata.countryId, newHousehold).then((householdId) => {
        let newSearch = new URLSearchParams(window.location.search);
        newSearch.set("household", householdId);
        setSearchParams(newSearch);
      });
    }
  };
  const formatValue = (value) => formatVariableValue(variable, value);
  const simulatedValue = getValueFromHousehold(
    variable.name,
    timePeriod,
    entityName,
    householdBaseline,
    metadata
  );
  const inputValue = getValueFromHousehold(
    variable.name,
    timePeriod,
    entityName,
    householdInput,
    metadata
  );
  const reformValue =
    householdReform ?
      getValueFromHousehold(
        variable.name,
        timePeriod,
        entityName,
        householdReform,
        metadata
      ) : null;
  let control;
  if (variable.valueType === "float" || variable.valueType === "int") {
    control = (
      <InputField
        onChange={submitValue}
        placeholder={
          reformValue !== null ?
            `${formatValue(inputValue || simulatedValue)} → ${formatValue(reformValue)}` :
            formatValue(inputValue || simulatedValue)}
        autofocus={true}
      />
    );
  } else if (variable.valueType === "bool") {
    control = (
      <div style={{ margin: 20 }}>
        <Switch
          onChange={submitValue}
          checked={inputValue || simulatedValue}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      </div>
    );
  } else if (variable.valueType === "Enum") {
    control = (
      <SearchOptions
        options={variable.possibleValues}
        defaultValue={inputValue || simulatedValue}
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
