/*

* DONE: Mock up basic component
* DONE: Figure out how to integrate as non-default input
* DONE: Generate and display list of counties
* DONE: Add state abbreviation onto end when displaying
* DONE: Filter said list by input state
* DONE: Modify HouseholdPage to properly display as variable within search
* DONE: Set default county based on state
* Replace fips-county-codes with bug-free package
* Consider replacing county generation with some means of reading from fips package
* Map input county to FIPS code in counties dataset
* Add code to update householdInput with FIPS
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
import { arrCounties } from "../../../data/counties";

export default function County(props) {
  const {
    metadata,
    householdInput,
    setHouseholdInput,
    year
  } = props;

  const dC = useDisplayCategory();

  function handleSubmit(value) {
    console.log(value);
    return;
  }

  // Filter display options to only list those in household state (if present)

  const householdStateCode = householdInput?.households?.["your household"]?.state_name?.[year];

  // Ant Design requires value and label not be Object-typed; store the full County
  // class instance as a custom "county" key
  const countyOptions = arrCounties.reduce((accu, county) => {
    if (!householdStateCode || householdStateCode === county.getStateCode()) {
      accu.push({
        value: county.getFipsCode(),
        label: county.getNameAndStateAbbrev(),
      })
    }
    return accu;
  }, []);
  

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
        // focus="input.household.maritalStatus"
        style={{ marginTop: 20, width: 300 }}
      />
    </CenteredMiddleColumn>
  );

}