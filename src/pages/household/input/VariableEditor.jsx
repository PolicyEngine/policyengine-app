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
import { useState } from "react";

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
    autoCompute,
  } = props;
  const [edited, setEdited] = useState(false);
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
  const required = ["state_name"].includes(variableName);
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
        autoCompute={autoCompute}
        setEdited={setEdited}
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
          paddingLeft: mobile ? 5 : 50,
          paddingRight: mobile ? 5 : 50,
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
            This variable is calculated from other variables you&apos;ve
            entered. Editing it will override the simulated value.
          </p>
        )}
        {entityInputs}
        {nextVariable && (
          <NavigationButton
            text="Enter"
            focus={nextVariable}
            primary
            disabled={required && !edited}
          />
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
    autoCompute,
    setEdited,
  } = props;
  const possibleTimePeriods = Object.keys(
    householdInput[entityPlural][entityName][variable.name]
  );
  return (
    <>
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
            autoCompute={autoCompute}
            setEdited={setEdited}
          />
        );
      })}
    </>
  );
}

function HouseholdVariableEntityInput(props) {
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
    setEdited,
  } = props;
  const submitValue = (value) => {
    value = Number.isNaN(+value) ? value : +value;
    let newHousehold = JSON.parse(JSON.stringify(householdInput));
    newHousehold[entityPlural][entityName][variable.name][timePeriod] = value;
    setHouseholdInput(newHousehold);
    gtag("event", "input", {
      event_category: "household",
      event_label: variable.name,
    });
    if (autoCompute) {
      getNewHouseholdId(metadata.countryId, newHousehold).then(
        (householdId) => {
          let newSearch = new URLSearchParams(window.location.search);
          newSearch.set("household", householdId);
          window.history.replaceState({}, '', `${window.location.pathname}?${newSearch}`);
        }
      );
    }
    setEdited(true);
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
  const reformValue = householdReform
    ? getValueFromHousehold(
        variable.name,
        timePeriod,
        entityName,
        householdReform,
        metadata
      )
    : null;
  const mobile = useMobile();
  let control;
  if (variable.valueType === "float" || variable.valueType === "int") {
    control = (
      <InputField
        onChange={submitValue}
        placeholder={
          reformValue !== null
            ? `${formatValue(
                reformValue
              )}`
            : formatValue(inputValue || simulatedValue)
        }
        autofocus={true}
        width={mobile && 150}
        padding={mobile && 10}
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
        options={variable.enumOptions}
        value={inputValue || simulatedValue}
        onChange={submitValue}
        format={formatValue}
      />
    );
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <h3 style={{ marginRight: 10 }}>{capitalize(timePeriod)}</h3>
        <h3 style={{ marginRight: 10 }}>{capitalize(entityName)}</h3>
        <h3 style={{ marginRight: 10 }}>
          {reformValue !== null
            ? formatValue(reformValue)
            : formatValue(inputValue || simulatedValue)}
        </h3>
      </div>
      {control}
    </>
  );
}
