import { useSearchParams } from "react-router-dom";

import { capitalize, localeCode } from "../../../lang/format";

import {
  currencyMap,
  getNewHouseholdId,
  getValueFromHousehold,
} from "../../../api/variables";
import { Select, Switch } from "antd";
import useMobile from "../../../layout/Responsive";
import SearchParamNavButton from "../../../controls/SearchParamNavButton";
import gtag from "../../../api/analytics";
import { useState, useEffect } from "react";
import StableInputNumber from "controls/StableInputNumber";
import { defaultYear } from "data/constants";

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
    year,
  } = props;
  const [edited, setEdited] = useState(false);
  const variableName = searchParams.get("focus").split(".").slice(-1)[0];
  const variable = metadata.variables[variableName];
  const required = ["state_name"].includes(variableName);
  const entityPlural = metadata.entities[variable.entity].plural;
  const isSimulated = !variable.isInputVariable;
  const possibleEntities = Object.keys(householdInput[entityPlural]).filter(
    (entity) => householdInput[entityPlural][entity][variableName],
  );

  // The variable must be present in all entities. The following effect is
  // executed whenever the variable is missing from some entities in the
  // household. addVariable is called to ensure that the variable is added to
  // all entities.
  useEffect(() => {
    if (
      possibleEntities.length !==
      Object.keys(householdInput[entityPlural]).length
    ) {
      const newHouseholdInput = addVariable(
        householdInput,
        variable,
        entityPlural,
        year,
      );
      setHouseholdInput(newHouseholdInput);
    }
  });

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
        year={year}
      />
    );
  });

  // Format the verb used to describe the variable
  let number = variable.label.endsWith("s") ? "plural" : "singular";
  let verb = number === "plural" ? "are" : "is";
  if (year > defaultYear) {
    verb = "will be";
  } else if (year < defaultYear && number === "plural") {
    verb = "were";
  } else if (year < defaultYear) {
    verb = "was";
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: mobile ? "20%" : "15%",
          paddingLeft: mobile ? 5 : 50,
          paddingRight: mobile ? 5 : 50,
        }}
      >
        <h1 style={{ marginBottom: 20, textAlign: "center" }}>
          What {verb} your {variable.label.toLowerCase()}?
        </h1>
        <h4 style={{ textAlign: "center", paddingBottom: 10 }}>
          {variable.documentation}
        </h4>
        {entityInputs}
        {nextVariable && (
          <SearchParamNavButton
            text="Enter"
            focus={nextVariable}
            type={required && !edited ? "disabled" : "primary"}
            style={{ margin: "20px auto 10px" }}
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
    year,
  } = props;
  const possibleTimePeriods = Object.keys(
    householdInput[entityPlural][entityName][variable.name],
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
            year={year}
          />
        );
      })}
    </>
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
          setSearchParams(newSearch);
        },
      );
    }
    setEdited(true);
  };
  const simulatedValue = getValueFromHousehold(
    variable.name,
    timePeriod,
    entityName,
    householdBaseline,
    metadata,
  );
  const inputValue = getValueFromHousehold(
    variable.name,
    timePeriod,
    entityName,
    householdInput,
    metadata,
  );
  const reformValue = householdReform
    ? getValueFromHousehold(
        variable.name,
        timePeriod,
        entityName,
        householdReform,
        metadata,
      )
    : null;
  let defaultValue = null;

  if (reformValue !== null) {
    defaultValue = reformValue;
  } else if (inputValue !== null) {
    defaultValue = inputValue;
  } else if (simulatedValue !== null) {
    defaultValue = simulatedValue;
  }

  if (defaultValue === null) {
    if (variable.valueType === "float" || variable.valueType === "int") {
      defaultValue = 0;
    } else if (variable.valueType === "bool") {
      defaultValue = false;
    } else if (variable.valueType === "Enum") {
      defaultValue = variable.possibleValues[0];
    }
  }
  const mobile = useMobile();

  let control;
  if (variable.valueType === "float" || variable.valueType === "int") {
    const isCurrency = Object.keys(currencyMap).includes(variable.unit);
    const maximumFractionDigits = 2;
    const onPressEnter = (_, value) =>
      submitValue(+value.toFixed(maximumFractionDigits));
    control = (
      <StableInputNumber
        style={{
          width: mobile ? 150 : 200,
        }}
        {...(isCurrency
          ? {
              addonBefore: currencyMap[variable.unit],
            }
          : {})}
        {...(variable.valueType === "float"
          ? {
              formatter: (value, { userTyping }) => {
                const n = +value;
                const isInteger = Number.isInteger(n);
                return n.toLocaleString(localeCode(metadata.countryId), {
                  minimumFractionDigits: userTyping || isInteger ? 0 : 2,
                  maximumFractionDigits: userTyping
                    ? 16
                    : maximumFractionDigits,
                });
              },
            }
          : {})}
        defaultValue={defaultValue}
        onPressEnter={onPressEnter}
        onBlur={onPressEnter}
      />
    );
  } else if (variable.valueType === "bool") {
    control = (
      <Switch
        defaultChecked={defaultValue}
        checkedChildren="Yes"
        unCheckedChildren="No"
        onChange={submitValue}
      />
    );
  } else if (variable.valueType === "Enum") {
    control = (
      <Select
        showSearch
        optionFilterProp="label"
        style={{ width: mobile ? 150 : 200 }}
        options={variable.possibleValues}
        defaultValue={defaultValue}
        onSelect={submitValue}
      />
    );
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: mobile ? "col" : "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "100%",
          marginBottom: 10,
          gap: mobile ? 10 : 20,
        }}
      >
        <h5
          style={{
            textAlign: "right",
            margin: 0,
            flex: 1,
            flexBasis: "10%",
            fontSize: mobile && ".9rem",
          }}
        >
          {capitalize(entityName)}:{" "}
        </h5>
        {control}
        <h5
          style={{
            textAlign: "left",
            margin: 0,
            flex: 1,
            flexBasis: "10%",
            fontSize: mobile && ".9rem",
          }}
        >
          in {timePeriod}
        </h5>
      </div>
    </>
  );
}

/**
 * Adds the VariableEditor's focus variable to entities in the household input
 * object in which it is absent and returns the resulting object
 * @param {Object} householdInput The household input object passed as a param
 * to VariableEditor
 * @param {Object} variable The relevant variable metadata
 * @param {String} entityPlural The plural term for the entity the variable
 * applies to
 * @returns {Object} A new householdInput object that contains the variable
 */
export function addVariable(householdInput, variable, entityPlural, year) {
  let newHouseholdInput = JSON.parse(JSON.stringify(householdInput));

  let possibleEntities = null;

  // If the variable is defined as occurring over a year...
  if (["year", "eternity"].includes(variable.definitionPeriod)) {
    // If plural entity term is in household situation...
    if (entityPlural in householdInput) {
      // Pull all individual entities stored within the umbrella entity
      // (e.g., within "people", "you", "your first dependent", etc.)
      possibleEntities = Object.keys(householdInput[entityPlural]);
      // For each possible entity...
      possibleEntities.forEach((entity) => {
        // If the variable isn't already stored in the situation...
        if (!(variable.name in householdInput[entityPlural][entity])) {
          newHouseholdInput[entityPlural][entity][variable.name] = {
            [year]: variable.defaultValue,
          };
        }
      });
    }
  }
  return newHouseholdInput;
}
