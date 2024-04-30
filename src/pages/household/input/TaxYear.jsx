import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Select } from "antd";

import { getNewHouseholdId } from "api/variables";
import CenteredMiddleColumn from "layout/CenteredMiddleColumn";
import SearchParamNavButton from "controls/SearchParamNavButton";
import useDisplayCategory from "../../../hooks/useDisplayCategory";

export default function TaxYear(props) {
  const {
    metadata,
    year,
    setYear,
    householdId,
    householdInput,
    setHouseholdInput,
  } = props;
  const prevYearRef = useRef(year);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const displayCategory = useDisplayCategory();

  // Assign the year to prevYearRef; this will persist
  // between renders, allowing access to prev year
  useEffect(() => {
    prevYearRef.current = year;
  }, [year]);

  // Replace "name" with "value" in order to conform to antd
  const options = metadata.economy_options.time_period.map((time_period) => {
    return { value: time_period.name.toString(), label: time_period.label };
  });

  function handleSubmit(value) {
    const newYear = value;
    // If there is a householdInput...
    if (householdInput) {
      // Access the previous value of year
      const prevYear = prevYearRef.current;

      // If previous value is equal to current value, return
      // so as to avoid needlessly updating
      if (prevYear === newYear) {
        return;
      }

      // Copy current household into new household
      let newHousehold = JSON.parse(JSON.stringify(householdInput));

      // Update household year
      newHousehold = updateHouseholdYear(newHousehold, prevYear, newYear);

      // Set new household input, enqueuing API call
      setHouseholdInput(newHousehold);

      // If the household already had an ID, get a new household ID and search params
      if (householdId) {
        getNewHouseholdId(metadata.countryId, newHousehold).then(
          (householdId) => {
            let newSearch = new URLSearchParams(window.location.search);
            newSearch.set("household", householdId);
            setSearchParams(newSearch);
          },
        );
      }
    }

    // Set year to new year
    setYear(newYear);
  }

  return (
    <CenteredMiddleColumn title="Which year would you like to calculate?" 
    marginTop="15%">
      <Select
        data-testid="taxyear_dropdown"
        showSearch
        optionFilterProp="label"
        style={{ width: displayCategory === "mobile" ? 150 : 200 }}
        options={options}
        defaultValue={year}
        onSelect={handleSubmit}
      />
      <SearchParamNavButton
        data-testid="taxyear_navbutton"
        text="Enter"
        focus="input.household.maritalStatus"
        style={{ margin: "20px auto 10px" }}
      />
    </CenteredMiddleColumn>
  );
}

function updateHouseholdYear(householdInput, prevYear, newYear) {
  // Copy householdInput into mutable variable
  let editedHousehold = JSON.parse(JSON.stringify(householdInput));

  // Variable skip list
  const skipList = ["members"];

  // Map over all plural entity terms...
  for (const entityPlural in editedHousehold) {
    // Then over all entities...
    for (const entity in editedHousehold[entityPlural]) {
      // Then over all variables within each entity...
      for (const variable in editedHousehold[entityPlural][entity]) {
        const currentVal =
          editedHousehold[entityPlural][entity][variable][prevYear];

        // Skip special variables that aren't object-types
        if (skipList.includes(variable)) {
          continue;
        }

        // Delete the value at the old year
        delete editedHousehold[entityPlural][entity][variable][prevYear];

        // Add it at the new one
        editedHousehold[entityPlural][entity][variable][newYear] = currentVal;
      }
    }
  }

  return editedHousehold;
}
