import { useEffect, useRef } from "react";
import { Select } from "antd";
import CenteredMiddleColumn from "layout/CenteredMiddleColumn";
import SearchParamNavButton from "controls/SearchParamNavButton";
import useDisplayCategory from "redesign/components/useDisplayCategory";

export default function TaxYear(props) {
  const {
    metadata,
    year,
    setYear,
    householdInput,
    setHouseholdInput
  } = props;
  const prevYearRef = useRef(year);
  const displayCategory = useDisplayCategory();

  // Assign the year to prevYearRef; this will persist
  // between renders, allowing access to prev year
  useEffect(() => {
    prevYearRef.current = year;
  }, [year])

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

      // Set new household input by updating year
      setHouseholdInput(updateHouseholdYear(householdInput, prevYear, newYear));
    }

    // Set year to new year
    setYear(newYear);

  }

  return (
    <CenteredMiddleColumn
      title="Which tax year would you like to calculate?"
    >
      <Select
        showSearch
        optionFilterProp="label"
        style={{ width: displayCategory === "mobile" ? 150 : 200 }}
        options={options}
        defaultValue={year}
        onSelect={handleSubmit}
      />
      <SearchParamNavButton
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
  const skipList = [
    "members"
  ];

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