/*

* DONE: Mock up basic component
* DONE: Figure out how to integrate as non-default input
* DONE: Generate and display list of counties
* DONE: Add state abbreviation onto end when displaying
* DONE: Filter said list by input state
* DONE: Modify HouseholdPage to properly display as variable within search
* DONE: Set default county based on state
* DONE: Replace fips-county-codes with bug-free package
* DONE: Consider replacing county generation with some means of reading from fips package
* DONE: Map input county to FIPS code in counties dataset
* DONE: Add code to update householdInput with FIPS
* Fix bug to show entire county name
* Test properly showing county as searched variable
* Ensure component only displays for US
* Test?
  * Test that counties with same name, diff. state, return the right value
  * Test that counties with FIPS beginning in 0 return correct value
  * Test that counties that don't exist don't return anything
  * Test that PR municipios fail
  * Test that DC works
  * Test that VA independent cities work

*/

import { Select } from "antd";
import CenteredMiddleColumn from "../../../layout/CenteredMiddleColumn";
import useDisplayCategory from "../../../hooks/useDisplayCategory";
import SearchParamNavButton from "../../../controls/SearchParamNavButton";
import { getAllCounties } from "../../../data/counties";
import { getNewHouseholdId } from "../../../api/variables";
import { useSearchParams } from "react-router-dom";

export default function County(props) {
  const {
    metadata,
    householdInput,
    setHouseholdInput,
    year,
    autoCompute
  } = props;

  const dC = useDisplayCategory();
  const [_, setSearchParams] = useSearchParams();

  function handleSubmit(value) {
    let newHousehold = JSON.parse(JSON.stringify(householdInput));
    newHousehold["households"]["your household"]["county_fips"] = {[year]: value}
    setHouseholdInput(newHousehold);
    if (autoCompute) {
      getNewHouseholdId(metadata.countryId, newHousehold).then(
        (householdId) => {
          let newSearch = new URLSearchParams(window.location.search);
          newSearch.set("household", householdId);
          setSearchParams(newSearch);
        },
      );
    }
  }
  // Fetch all counties
  const allCounties = getAllCounties();

  // Filter display options to only list those in household state (if present)

  const householdStateCode = householdInput?.households?.["your household"]?.state_name?.[year];

  const countyOptions = allCounties.reduce((accu, county) => {
    if (!householdStateCode || householdStateCode === county.getStateCode()) {
      accu.push({
        value: county.getFipsCode(),
        label: county.getNameAndStateAbbrev(),
      })
    }
    return accu;
  }, []);

  // Hard-code the next variable, which is the first item from the input.income group
  const nextVariable = "input.income.employment_income_before_lsr";

  return (
    <CenteredMiddleColumn
      title="Which county do you reside in?"
      marginTop="15%"
    >
      <Select
        showSearch
        optionFilterProp="label"
        style={{ width: dC === "mobile" ? 150 : 200 }}
        options={countyOptions}
        defaultValue={countyOptions[0]}
        onSelect={handleSubmit}
      />
      <SearchParamNavButton
        text="Submit"
        focus={nextVariable}
        style={{ marginTop: 20, width: 300 }}
      />
    </CenteredMiddleColumn>
  );

}