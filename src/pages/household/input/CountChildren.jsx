import RadioButton from "../../../controls/RadioButton";
import {
  addYearlyVariables,
  getNewHouseholdId,
  removePerson,
} from "../../../api/variables";
import CenteredMiddleColumn from "../../../layout/CenteredMiddleColumn";
import { useSearchParams } from "react-router-dom";
import { copySearchParams } from "../../../api/call";
import { useState } from "react";
import NavigationButton from "../../../controls/NavigationButton";
import gtag from "../../../api/analytics";
import {
  childNames,
  childCountFilters,
  childAdders,
} from "./countChildrenVars.js";

/**
 * Returns `your ${number} child`, unless a country situation calls for a custom term
 * @param {Number} index The number child
 * @param {String} countryId The two-letter country code
 * @returns {String} A formatted string of format `your ${index} ${term}`, usually "child"
 */
export function getChildName(index, countryId) {
  // 'your first child', 'your second child', etc.

  let childTerm = null;
  if (countryId in childNames) {
    childTerm = childNames[countryId];
  } else {
    childTerm = childNames.default;
  }

  const number = ["first", "second", "third", "fourth", "fifth"][index];

  return `your ${number} ${childTerm}`;
}

/**
 * Returns the number of children in situation
 * @param {Object} situation
 * @param {String} countryId Two-letter country ID string
 * @returns {Number} Number of children currently included in situation
 */
export function getCountChildren(situation, countryId) {
  let filter = null;
  if (countryId in childCountFilters) {
    filter = childCountFilters[countryId];
  } else {
    filter = childCountFilters.default;
  }

  return Object.values(situation.people).filter(filter).length;
}

/**
 * Function to add a child to a situation, dependent upon country
 * @param {Object} situation
 * @param {String} countryId The two-digit country ID
 * @returns {Object} The updated situation
 */
export function addChild(situation, countryId) {
  const defaultChild = {
    age: { 2023: 10 },
  };
  const childCount = getCountChildren(situation, countryId);
  const childName = getChildName(childCount, countryId);

  if (countryId in childAdders) {
    situation = childAdders[countryId](
      situation,
      defaultChild,
      childName,
      childCount,
    );
  } else {
    situation = childAdders.default(
      situation,
      defaultChild,
      childName,
      childCount,
    );
  }

  return situation;
}

function setUKCountChildren(situation, countChildren, variables, entities) {
  while (getCountChildren(situation, "uk") < countChildren) {
    situation = addChild(situation, "uk");
  }
  while (getCountChildren(situation, "uk") > countChildren) {
    situation = removePerson(
      situation,
      getChildName(getCountChildren(situation, "uk") - 1, "uk"),
    );
  }
  situation = addYearlyVariables(situation, variables, entities);
  return situation;
}

function setUSCountChildren(situation, countChildren, variables, entities) {
  while (getCountChildren(situation, "us") < countChildren) {
    situation = addChild(situation, "us");
  }
  while (getCountChildren(situation, "us") > countChildren) {
    situation = removePerson(
      situation,
      getChildName(getCountChildren(situation, "us") - 1, "us"),
    );
  }
  situation = addYearlyVariables(situation, variables, entities);
  return situation;
}

function setCACountChildren(situation, countChildren, variables, entities) {
  while (getCountChildren(situation, "ca") < countChildren) {
    situation = addChild(situation, "ca");
  }
  while (getCountChildren(situation, "ca") > countChildren) {
    situation = removePerson(
      situation,
      getChildName(getCountChildren(situation, "ca") - 1, "ca"),
    );
  }
  situation = addYearlyVariables(situation, variables, entities);
  return situation;
}

export default function CountChildren(props) {
  const { metadata, householdInput, setHouseholdInput, autoCompute } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const setCountChildrenInHousehold = {
    uk: setUKCountChildren,
    us: setUSCountChildren,
    ca: setCACountChildren,
    ng: setCACountChildren,
    il: setCACountChildren,
  }[metadata.countryId];
  const setCountChildren = (countChildren) => {
    let newHousehold = setCountChildrenInHousehold(
      householdInput,
      countChildren,
      metadata.variables,
      metadata.entities,
    );
    setHouseholdInput(newHousehold);
    let newSearch = copySearchParams(searchParams);
    newSearch.set("focus", `input.household.${metadata.basicInputs[0]}`);
    setSearchParams(newSearch);
    if (autoCompute) {
      getNewHouseholdId(metadata.countryId, newHousehold).then(
        (householdId) => {
          let newSearch = new URLSearchParams(window.location.search);
          newSearch.set("household", householdId);
          setSearchParams(newSearch);
        },
      );
    }
  };
  const [value, setValue] = useState(null);
  const radioButtonComponent = (
    <>
      <RadioButton
        keys={[0, 1, 2, 3, 4, 5]}
        labels={["None", "1", "2", "3", "4", "5"]}
        defaultValue={getCountChildren(householdInput, metadata.countryId)}
        value={value}
        onChange={(children) => {
          setValue(children);
          setCountChildren(children);
          gtag("event", "set_count_children", {
            event_category: "household",
            event_label: "Set children",
          });
        }}
      />
      <NavigationButton
        text="Enter"
        focus={`input.household.${metadata.basicInputs[0]}`}
      />
    </>
  );
  return (
    <CenteredMiddleColumn
      title={`How many ${
        metadata.countryId !== "us" ? "children" : "dependents"
      } do you have?`}
    >
      {radioButtonComponent}
    </CenteredMiddleColumn>
  );
}
