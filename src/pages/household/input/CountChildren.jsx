import RadioButton from "../../../controls/RadioButton";
import { getNewHouseholdId, removePerson } from "../../../api/variables";
import CenteredMiddleColumn from "../../../layout/CenteredMiddleColumn";
import { useSearchParams } from "react-router-dom";
import { copySearchParams } from "../../../api/call";
import { useState } from "react";
import SearchParamNavButton from "../../../controls/SearchParamNavButton";
import gtag from "../../../api/analytics";
import {
  childNames,
  childCountFilters,
  childAdders,
  defaultChildren,
} from "../../../data/countChildrenVars.js";
import { defaultYear } from "data/constants";

/**
 * Returns `your ${number} child`, unless a country situation calls for a custom term
 * @param {Number} index The zero-indexed number child
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
export function getCountChildren(situation, countryId, year) {
  const filter = childCountFilters(countryId, year);
  return Object.values(situation.people).filter(filter).length;
}

/**
 * Function to add a child to a situation, dependent upon country
 * @param {Object} situation
 * @param {String} countryId The two-digit country ID
 * @returns {Object} The updated situation
 */
export function addChild(situation, countryId, year) {
  let newSituation = JSON.parse(JSON.stringify(situation));

  const defaultChild = JSON.parse(
    JSON.stringify(defaultChildren(countryId, year)),
  );
  const childCount = getCountChildren(situation, countryId, year);
  const childName = getChildName(childCount, countryId);

  if (countryId in childAdders) {
    newSituation = childAdders[countryId](
      situation,
      defaultChild,
      childName,
      childCount,
      year,
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
export function updateChildCount(situation, countChildren, countryId, year) {
  while (getCountChildren(situation, countryId, year) < countChildren) {
    situation = addChild(situation, countryId, year);
  }
  while (getCountChildren(situation, countryId, year) > countChildren) {
    const childCount = getCountChildren(situation, countryId, year);

    situation = removePerson(
      situation,
      getChildName(childCount - 1, countryId),
    );
  }
  return situation;
}

export default function CountChildren(props) {
  const { metadata, householdInput, setHouseholdInput, autoCompute, year } =
    props;

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
      year,
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
        defaultValue={getCountChildren(
          householdInput,
          metadata.countryId,
          year,
        )}
        value={formValue}
        onChange={(numberOfChildren) => {
          handleChildInputChange(numberOfChildren);
        }}
      />
      <SearchParamNavButton
        text="Submit"
        focus={`input.household.${metadata.basicInputs[0]}`}
        style={{ marginTop: 20 }}
      />
    </>
  );

  let verb = "do";
  if (year < defaultYear) {
    verb = "did";
  } else if (year > defaultYear) {
    verb = "will";
  }

  return (
    <CenteredMiddleColumn
      title={`How many ${
        metadata.countryId !== "us" ? "children" : "dependents"
      } ${verb} you have?`}
      marginTop="15%"
    >
      {radioButtonComponent}
    </CenteredMiddleColumn>
  );
}
