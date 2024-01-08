import { Select } from "antd";
import CenteredMiddleColumn from "layout/CenteredMiddleColumn";
import SearchParamNavButton from "controls/SearchParamNavButton";
import useDisplayCategory from "redesign/components/useDisplayCategory";

export default function TaxYear(props) {
  const {
    metadata,
    year,
    setYear
  } = props;
  const displayCategory = useDisplayCategory();

  // Replace "name" with "value" in order to conform to antd 
  const options = metadata.economy_options.time_period.map((time_period) => {
    return { value: time_period.name.toString(), label: time_period.label };
  });

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
        onSelect={(value) => setYear(Number(value))}
      />
      <SearchParamNavButton
        text="Enter"
        focus="input.household.maritalStatus"
        style={{ margin: "20px auto 10px" }}
      />
    </CenteredMiddleColumn>
  );
}