import RadioButton from "../../../controls/RadioButton";
import { addYearlyVariables, getNewHouseholdId, removePerson } from "../../../api/variables";
import CenteredMiddleColumn from "../../../layout/CenteredMiddleColumn";
import { useSearchParams } from "react-router-dom";
import { copySearchParams } from "../../../api/call";

function getUKCountChildren(situation) {
  return Object.values(situation.people).filter(
    (person) => person.age["2022"] < 18
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
    age: { 2022: 10 },
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
  return null;
}

function setUSCountChildren(situation, countChildren, variables, entities) {
  return situation;
}

export default function CountChildren(props) {
  const { metadata, household } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const getCountChildren = { uk: getUKCountChildren, us: getUSCountChildren }[
    metadata.countryId
  ];
  const setCountChildrenInHousehold = {
    uk: setUKCountChildren,
    us: setUSCountChildren,
  }[metadata.countryId];
  const setCountChildren = (countChildren) => {
    let newHousehold = setCountChildrenInHousehold(
      household.input,
      countChildren,
      metadata.variables,
      metadata.entities
    );
    getNewHouseholdId(metadata.countryId, newHousehold)
      .then((householdId) => {
        let newSearch = copySearchParams(searchParams);
        newSearch.set("household", householdId);
        setSearchParams(newSearch);
      });
  };
  const radioButtonComponent = (
    <RadioButton
      keys={[0, 1, 2, 3, 4, 5]}
      labels={["None", "1", "2", "3", "4", "5"]}
      value={getCountChildren(household.input)}
      onChange={setCountChildren}
    />
  );
  return (
    <CenteredMiddleColumn
      title="How many children do you have?"
      children={radioButtonComponent}
    />
  );
}
