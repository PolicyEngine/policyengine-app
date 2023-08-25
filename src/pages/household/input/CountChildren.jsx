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
import { childNames, childCountFilters } from "./countChildrenVars.js";

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

  console.log(situation.people);
  console.log(Object.values(situation.people));
  console.log(Object.values(situation.people));

  console.log(situation.people["your first child"]);

  return Object.values(situation.people).filter(filter).length;
}

function addUKChild(situation) {
  const defaultChild = {
    age: { 2023: 10 },
  };
  const childName = getChildName(getCountChildren(situation, "uk"), "uk");
  situation.people[childName] = defaultChild;
  situation.benunits["your immediate family"].members.push(childName);
  situation.households["your household"].members.push(childName);
  return situation;
}

function setUKCountChildren(situation, countChildren, variables, entities) {
  while (getCountChildren(situation, "uk") < countChildren) {
    situation = addUKChild(situation);
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

function addUSChild(situation) {
  const defaultChild = {
    age: { 2023: 10 },
    is_tax_unit_dependent: { 2023: true },
  };
  const childName = getChildName(getCountChildren(situation, "us"), "us");
  situation.people[childName] = defaultChild;
  situation.tax_units["your tax unit"].members.push(childName);
  situation.families["your family"].members.push(childName);
  situation.spm_units["your household"].members.push(childName);
  situation.households["your household"].members.push(childName);
  situation.marital_units[`${childName}'s marital unit`] = {
    members: [childName],
    marital_unit_id: { 2023: getCountChildren(situation, "us") + 1 },
  };
  return situation;
}

function setUSCountChildren(situation, countChildren, variables, entities) {
  while (getCountChildren(situation, "us") < countChildren) {
    situation = addUSChild(situation);
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

function addCAChild(situation) {
  const defaultChild = {
    age: { 2023: 10 },
  };
  const childName = getChildName(getCountChildren(situation, "ca"), "ca");
  situation.people[childName] = defaultChild;
  situation.households["your household"].members.push(childName);
  return situation;
}

function setCACountChildren(situation, countChildren, variables, entities) {
  while (getCountChildren(situation, "ca") < countChildren) {
    situation = addCAChild(situation);
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
