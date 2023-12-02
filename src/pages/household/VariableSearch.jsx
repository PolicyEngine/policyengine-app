import { useSearchParams } from "react-router-dom";
import { copySearchParams } from "../../api/call";
import SearchOptions from "../../controls/SearchOptions";

export default function VariableSearch(props) {
  const { metadata, callback } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const showComputed = searchParams.get("showComputedVariables") === "true";
  const options = Object.values(metadata.variables)
    .filter((variable) => !variable.hidden_input)
    .filter((variable) => showComputed || variable.isInputVariable)
    .map((variable) => ({
      value: variable.moduleName + "." + variable.name,
      label: variable.label,
    }))
    .filter((option) => !!option.label && !!option.value);
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
