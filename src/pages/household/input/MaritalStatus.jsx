import RadioButton from "../../../controls/RadioButton";
import { getNewHouseholdId, removePerson } from "../../../api/variables";
import CenteredMiddleColumn from "../../../layout/CenteredMiddleColumn";
import { useSearchParams } from "react-router-dom";
import { copySearchParams } from "../../../api/call";
import { useState } from "react";
import NavigationButton from "../../../controls/NavigationButton";
import gtag from "../../../api/analytics";

function getUKMaritalStatus(situation) {
  const partnerName = "your partner";
  if (partnerName in situation.people) {
    return "married";
  } else {
    return "single";
  }
}

export function setUKMaritalStatus(situation, status, variables) {
  const currentStatus = getUKMaritalStatus(situation);
  const defaultPartner = {
    age: { 2023: 40 },
  };
  const partnerName = "your partner";
  if (status === "married" && currentStatus === "single") {
    situation.people[partnerName] = defaultPartner;
    situation.benunits["your immediate family"].members.push(partnerName);
    situation = Object.assign(
      situation.benunits["your immediate family"],
      variables.is_married,
    );
    situation.benunits["your immediate family"].push(variables.is_married);
    situation.benunits["your immediate family"].is_married["2023"] = true;
    situation.households["your household"].members.push(partnerName);
    console.log(situation);
  } else if (status === "single" && currentStatus === "married") {
    situation = removePerson(situation, partnerName);
  }
  return situation;
}

function getUSMaritalStatus(situation) {
  const partnerName = "your partner";
  if (Object.keys(situation.people).includes(partnerName)) {
    return "married";
  } else {
    return "single";
  }
}

export function setUSMaritalStatus(situation, status) {
  const currentStatus = getUSMaritalStatus(situation);
  const defaultPartner = {
    age: { 2023: 40 },
  };
  const partnerName = "your partner";
  if (status === "married" && currentStatus === "single") {
    situation.people[partnerName] = defaultPartner;
    situation.families["your family"].members.push(partnerName);
    situation.marital_units["your marital unit"].members.push(partnerName);
    situation.tax_units["your tax unit"].members.push(partnerName);
    situation.spm_units["your household"].members.push(partnerName);
    situation.households["your household"].members.push(partnerName);
  } else if (status === "single" && currentStatus === "married") {
    situation = removePerson(situation, partnerName);
  }
  return situation;
}

function getCAMaritalStatus(situation) {
  const partnerName = "your partner";
  if (Object.keys(situation.people).includes(partnerName)) {
    return "married";
  } else {
    return "single";
  }
}

export function setCAMaritalStatus(situation, status) {
  const currentStatus = getCAMaritalStatus(situation);
  const defaultPartner = {
    age: { 2023: 40 },
  };
  const partnerName = "your partner";
  if (status === "married" && currentStatus === "single") {
    situation.people[partnerName] = defaultPartner;
    situation.households["your household"].members.push(partnerName);
  } else if (status === "single" && currentStatus === "married") {
    situation = removePerson(situation, partnerName);
  }
  return situation;
}

export default function MaritalStatus(props) {
  const { metadata, householdInput, setHouseholdInput, autoCompute } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const getMaritalStatus = {
    uk: getUKMaritalStatus,
    us: getUSMaritalStatus,
    ca: getCAMaritalStatus,
    ng: getCAMaritalStatus,
    il: getCAMaritalStatus,
  }[metadata.countryId];
  const setMaritalStatusInHousehold = {
    uk: setUKMaritalStatus,
    us: setUSMaritalStatus,
    ca: setCAMaritalStatus,
    ng: setCAMaritalStatus,
    il: setCAMaritalStatus,
  }[metadata.countryId];
  const [value, setValue] = useState(null);
  const setMaritalStatus = (status) => {
    let newHousehold = setMaritalStatusInHousehold(
      householdInput,
      status,
      metadata.variables,
      metadata.entities,
    );
    setHouseholdInput(newHousehold);
    let newSearch = copySearchParams(searchParams);
    newSearch.set("focus", "input.household.children");
    setSearchParams(newSearch);
    if (autoCompute) {
      getNewHouseholdId(metadata.countryId, newHousehold).then(
        (householdId) => {
          let newSearch = new URLSearchParams(window.location.search);
          newSearch.set("household", householdId);
          setSearchParams(newSearch);
          gtag("event", "household", {
            event_category: "household",
            event_label: "Set marital status",
          });
        },
      );
    }
  };
  const radioButtonComponent = (
    <RadioButton
      keys={["single", "married"]}
      labels={["Single", "Married"]}
      defaultValue={getMaritalStatus(householdInput)}
      value={value}
      onChange={(status) => {
        setMaritalStatus(status);
        setValue(status);
      }}
    />
  );
  return (
    <CenteredMiddleColumn title="What is your marital status?">
      <>
        {radioButtonComponent}
        <NavigationButton text="Enter" focus="input.household.children" />
      </>
    </CenteredMiddleColumn>
  );
}
