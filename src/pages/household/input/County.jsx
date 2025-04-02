
import { Select } from "antd";
import CenteredMiddleColumn from "../../../layout/CenteredMiddleColumn";
import useDisplayCategory from "../../../hooks/useDisplayCategory";
import SearchParamNavButton from "../../../controls/SearchParamNavButton";
import { getAllCounties } from "../../../data/counties";
import { getNewHouseholdId } from "../../../api/variables";
import { useSearchParams } from "react-router-dom";

export default function County(props) {
  const { metadata, householdInput, setHouseholdInput, year, autoCompute } =
    props;

  const dC = useDisplayCategory();
  // eslint-disable-next-line no-unused-vars
  const [_searchParams, setSearchParams] = useSearchParams();

  function handleSubmit(value) {
    let newHousehold = JSON.parse(JSON.stringify(householdInput));
    newHousehold["households"]["your household"]["county_fips"] = {
      [year]: value,
    };
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

  const householdStateCode =
    householdInput?.households?.["your household"]?.state_name?.[year];

  const countyOptions = allCounties.reduce((accu, county) => {
    if (!householdStateCode || householdStateCode === county.getStateCode()) {
      accu.push({
        value: county.getFipsCode(),
        label: county.getNameAndStateAbbrev(),
      });
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
