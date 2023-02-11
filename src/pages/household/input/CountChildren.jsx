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

function getUKCountChildren(situation) {
  return Object.values(situation.people).filter(
    (person) => person.age["2023"] < 18
  ).length;
}

function getUKChildName(index) {
  // 'your first child', 'your second child', etc.
  return (
    "your " + ["first", "second", "third", "fourth", "fifth"][index] + " child"
  );
}

function addUKChild(situation) {
  const defaultChild = {
    age: { 2023: 10 },
  };
  const childName = getUKChildName(getUKCountChildren(situation));
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
      getUKChildName(getUKCountChildren(situation) - 1)
    );
  }
  situation = addYearlyVariables(situation, variables, entities);
  return situation;
}

function getUSCountChildren(situation) {
  return Object.values(situation.people).filter(
    (person) => person.is_tax_unit_dependent["2023"]
  ).length;
}

function addUSChild(situation) {
  const defaultChild = {
    age: { 2023: 10 },
    is_tax_unit_dependent: { 2023: true },
  };
  const childName = getUSChildName(getUSCountChildren(situation));
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

function getUSChildName(index) {
  // 'your first child', 'your second child', etc.
  return (
    "your " +
    ["first", "second", "third", "fourth", "fifth"][index] +
    " dependent"
  );
}

function setUSCountChildren(situation, countChildren, variables, entities) {
  while (getUSCountChildren(situation) < countChildren) {
    situation = addUSChild(situation);
  }
  while (getUSCountChildren(situation) > countChildren) {
    situation = removePerson(
      situation,
      getUSChildName(getUSCountChildren(situation) - 1)
    );
  }
  situation = addYearlyVariables(situation, variables, entities);
  return situation;
}

function getCACountChildren(situation) {
  return Object.values(situation.people).filter(
    (person) => person.age["2023"] < 18
  ).length;
}

function addCAChild(situation) {
  const defaultChild = {
    age: { 2023: 10 },
  };
  const childName = getUKChildName(getCACountChildren(situation));
  situation.people[childName] = defaultChild;
  situation.households["your household"].members.push(childName);
  return situation;
}

function getCAChildName(index) {
  // 'your first child', 'your second child', etc.
  return (
    "your " + ["first", "second", "third", "fourth", "fifth"][index] + " child"
  );
}

function setCACountChildren(situation, countChildren, variables, entities) {
  while (getCACountChildren(situation) < countChildren) {
    situation = addCAChild(situation);
  }
  while (getCACountChildren(situation) > countChildren) {
    situation = removePerson(
      situation,
      getCAChildName(getCACountChildren(situation) - 1)
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
   }[
    metadata.countryId
  ];
  const setCountChildrenInHousehold = {
    uk: setUKCountChildren,
    us: setUSCountChildren,
    ca: setCACountChildren,
    ng: setCACountChildren,
  }[metadata.countryId];
  const setCountChildren = (countChildren) => {
    let newHousehold = setCountChildrenInHousehold(
      householdInput,
      countChildren,
      metadata.variables,
      metadata.entities
    );
    setHouseholdInput(newHousehold);
    let newSearch = copySearchParams(searchParams);
    newSearch.set("focus", `input.household.${metadata.basicInputs[0]}`);
    setSearchParams(newSearch);
    if (autoCompute) {
      getNewHouseholdId(metadata.countryId, newHousehold, metadata).then((householdId) => {
        let newSearch = new URLSearchParams(window.location.search);
        newSearch.set("household", householdId);
        setSearchParams(newSearch);
      });
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
      children={radioButtonComponent}
    />
  );
}
