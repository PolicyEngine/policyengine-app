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
import { childNames } from "./countChildrenVars.js";

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

function getUKCountChildren(situation) {
  return Object.values(situation.people).filter(
    (person) => person.age["2023"] < 18,
  ).length;
}

function addUKChild(situation) {
  const defaultChild = {
    age: { 2023: 10 },
  };
  const childName = getChildName(getUKCountChildren(situation), "uk");
  situation.people[childName] = defaultChild;
  situation.benunits["your immediate family"].members.push(childName);
  situation.households["your household"].members.push(childName);
  return situation;
}

function setUKCountChildren(situation, countChildren, variables, entities) {
  while (getUKCountChildren(situation) < countChildren) {
    situation = addUKChild(situation);
  }
  while (getUKCountChildren(situation) > countChildren) {
    situation = removePerson(
      situation,
      getChildName(getUKCountChildren(situation) - 1, "uk"),
    );
  }
  situation = addYearlyVariables(situation, variables, entities);
  return situation;
}

function getUSCountChildren(situation) {
  return Object.values(situation.people).filter(
    (person) => person.is_tax_unit_dependent["2023"],
  ).length;
}

function addUSChild(situation) {
  const defaultChild = {
    age: { 2023: 10 },
    is_tax_unit_dependent: { 2023: true },
  };
  const childName = getChildName(getUSCountChildren(situation), "us");
  situation.people[childName] = defaultChild;
  situation.tax_units["your tax unit"].members.push(childName);
  situation.families["your family"].members.push(childName);
  situation.spm_units["your household"].members.push(childName);
  situation.households["your household"].members.push(childName);
  situation.marital_units[`${childName}'s marital unit`] = {
    members: [childName],
    marital_unit_id: { 2023: getUSCountChildren(situation) + 1 },
  };
  return situation;
}

function setUSCountChildren(situation, countChildren, variables, entities) {
  while (getUSCountChildren(situation) < countChildren) {
    situation = addUSChild(situation);
  }
  while (getUSCountChildren(situation) > countChildren) {
    situation = removePerson(
      situation,
      getChildName(getUSCountChildren(situation) - 1, "us"),
    );
  }
  situation = addYearlyVariables(situation, variables, entities);
  return situation;
}

function getCACountChildren(situation) {
  return Object.values(situation.people).filter(
    (person) => person.age["2023"] < 18,
  ).length;
}

function addCAChild(situation) {
  const defaultChild = {
    age: { 2023: 10 },
  };
  const childName = getChildName(getCACountChildren(situation), "ca");
  situation.people[childName] = defaultChild;
  situation.households["your household"].members.push(childName);
  return situation;
}

function setCACountChildren(situation, countChildren, variables, entities) {
  while (getCACountChildren(situation) < countChildren) {
    situation = addCAChild(situation);
  }
  while (getCACountChildren(situation) > countChildren) {
    situation = removePerson(
      situation,
      getChildName(getCACountChildren(situation) - 1, "ca"),
    );
  }
  situation = addYearlyVariables(situation, variables, entities);
  return situation;
}

export default function CountChildren(props) {
  const { metadata, householdInput, setHouseholdInput, autoCompute } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const getCountChildren = {
    uk: getUKCountChildren,
    us: getUSCountChildren,
    ca: getCACountChildren,
    ng: getCACountChildren,
    il: getCACountChildren,
  }[metadata.countryId];
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
        defaultValue={getCountChildren(householdInput)}
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
