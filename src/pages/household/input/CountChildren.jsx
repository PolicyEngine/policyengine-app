import RadioButton from "../../../controls/RadioButton";
import { getNewHouseholdId, removePerson } from "../../../api/variables";
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
  defaultChildren,
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
  let newSituation = Object.assign(situation);

  let defaultChild = null;
  if (countryId in defaultChildren) {
    defaultChild = defaultChildren[countryId];
  } else {
    defaultChild = defaultChildren.default;
  }

  const childCount = getCountChildren(situation, countryId);
  const childName = getChildName(childCount, countryId);

  if (countryId in childAdders) {
    newSituation = childAdders[countryId](
      situation,
      defaultChild,
      childName,
      childCount,
    );
  } else {
    newSituation = childAdders.default(
      situation,
      defaultChild,
      childName,
      childCount,
    );
  }

  return newSituation;
}

/**
 * Updates children in household input based on front-end user input
 * @param {Object} situation A user's household input
 * @param {Number} countChildren Front-end numeric input
 * @param {String} countryId A two-letter country ID
 * @returns {Object} The updated household input object
 */
export function updateChildCount(situation, countChildren, countryId) {
  while (getCountChildren(situation, countryId) < countChildren) {
    situation = addChild(situation, countryId);
  }
  while (getCountChildren(situation, countryId) > countChildren) {
    const childCount = getCountChildren(situation, countryId);

    situation = removePerson(
      situation,
      getChildName(childCount - 1, countryId),
    );
  }
  return situation;
}

export default function CountChildren(props) {
  const { metadata, householdInput, setHouseholdInput, autoCompute } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const [formValue, setFormValue] = useState(null);
  function handleChildInputChange(numberOfChildren) {
    // First, update visible value in form (React controlled input)
    setFormValue(numberOfChildren);

    // Update household input object
    let newHousehold = updateChildCount(
      householdInput,
      numberOfChildren,
      metadata.countryId,
    );

    // Update browser search params
    let newSearch = copySearchParams(searchParams);
    newSearch.set("focus", `input.household.${metadata.basicInputs[0]}`);

    gtag("event", "set_count_children", {
      event_category: "household",
      event_label: "Set children",
    });

    // Potential legacy function; unclear if necessary to preserve
    if (autoCompute) {
      getNewHouseholdId(metadata.countryId, newHousehold).then(
        (householdId) => {
          let newSearch = new URLSearchParams(window.location.search);
          newSearch.set("household", householdId);
          setSearchParams(newSearch);
        },
      );
    }

    // State setting
    setHouseholdInput(newHousehold);
    setSearchParams(newSearch);
  }

  const radioButtonComponent = (
    <>
      <RadioButton
        keys={[0, 1, 2, 3, 4, 5]}
        labels={["None", "1", "2", "3", "4", "5"]}
        defaultValue={getCountChildren(householdInput, metadata.countryId)}
        value={formValue}
        onChange={(numberOfChildren) => {
          handleChildInputChange(numberOfChildren);
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
