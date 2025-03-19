/*

* DONE: Mock up basic component
* DONE: Figure out how to integrate as non-default input
* DONE: Generate and display list of counties
* Add state abbreviation onto end when displaying
* Filter said list by input state
* Map input county to FIPS code
* Add code to update householdInput with FIPS
* Modify HouseholdPage to properly display as variable within search
* Test properly showing county as searched variable
* Ensure component only displays for US
* Test?

*/

import { Select } from "antd";
import CenteredMiddleColumn from "../../../layout/CenteredMiddleColumn";
import useDisplayCategory from "../../../hooks/useDisplayCategory";
import SearchParamNavButton from "../../../controls/SearchParamNavButton";
import { arrCounties } from "../../../data/counties";


const options = arrCounties.map((county) => {
  return { value: county.getName(), label: county.getName() };
});


export default function County(props) {

  const dC = useDisplayCategory();
  

  return (
    <CenteredMiddleColumn
      title="Which county do you reside in?"
      marginTop="15%"
    >
      <Select
        showSearch
        optionFilterProp="label"
        style={{ width: dC === "mobile" ? 150 : 200 }}
        options={options}
        // defaultValue={year}
        // onSelect={handleSubmit}
      />
      <SearchParamNavButton
        text="Submit"
        // focus="input.household.maritalStatus"
        style={{ marginTop: 20, width: 300 }}
      />
    </CenteredMiddleColumn>
  );

}