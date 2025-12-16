import { useSearchParams } from "react-router-dom";
import { copySearchParams } from "../../api/call";
import SearchOptions from "../../controls/SearchOptions";

export default function VariableSearch(props) {
  const { metadata, callback, modifiedNames } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const showComputed = searchParams.get("showComputedVariables") === "true";
  const options = Object.values(metadata.variables)
    .filter((variable) => !variable.hidden_input)
    .filter((variable) => showComputed || variable.isInputVariable)
    .map((variable) => {
      const isModified = modifiedNames && modifiedNames.has(variable.name);
      return {
        value: variable.moduleName + "." + variable.name,
        label: isModified ? (
          <span style={{ fontWeight: "bold" }}>
            {variable.label} <span style={{ color: "#1890ff" }}>•</span>
          </span>
        ) : (
          variable.label
        ),
        searchLabel: variable.label,
      };
    })
    .filter((option) => !!option.searchLabel && !!option.value);

  const countyModified = modifiedNames && modifiedNames.has("countyName");
  options.push({
    value: "input.household.countyName",
    label: countyModified ? (
      <span style={{ fontWeight: "bold" }}>
        County name <span style={{ color: "#1890ff" }}>•</span>
      </span>
    ) : (
      "County name"
    ),
    searchLabel: "County name",
  });
  return (
    <SearchOptions
      options={options}
      defaultValue={null}
      style={{ margin: 0, width: "100%" }}
      placeholder="Search for a variable"
      onSelect={(value) => {
        let newSearch = copySearchParams(searchParams);
        newSearch.set("focus", value);
        setSearchParams(newSearch);

        if (callback instanceof Function) {
          callback();
        }
      }}
    />
  );
}
