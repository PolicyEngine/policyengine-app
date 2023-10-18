import { AutoComplete } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { copySearchParams, countryApiCall } from "../../api/call";

export default function PolicySearch(props) {
  const { metadata, target, policy, width, onSelect } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultId = searchParams.get(target);
  let defaultLabel = policy[target].label || `Policy #${defaultId}`;
  if (target === "baseline" && !defaultId) {
    defaultLabel = "Current law";
  }
  const [value, setValue] = useState(defaultLabel);

  const [policies, setPolicies] = useState([]);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [lastSearch, setLastSearch] = useState("");

  useEffect(() => {
    setValue(defaultLabel);
  }, [defaultLabel]);

  // The search should query the API, but limited to one request every 1000ms.

  const onSearch = (searchText) => {
    setValue(searchText);
    const now = new Date().getTime();
    if (now - lastRequestTime > 1000 || searchText !== lastSearch) {
      countryApiCall(metadata.countryId, `/policies?query=${searchText}`)
        .then((data) => data.json())
        .then((data) => {
          setPolicies(
            data.result.map((item) => {
              return {
                value: item.id,
                label: (
                  <>
                    #{item.id} {item.label}
                  </>
                ),
              };
            }) || [],
          );
          setLastRequestTime(new Date().getTime());
          setLastSearch(searchText);
        });
    }
  };

  return (
    <AutoComplete
      options={policies || [{ value: defaultId, label: defaultLabel }]}
      onSelect={(value) => {
        let newSearch = copySearchParams(searchParams);
        newSearch.set(target, value);
        setSearchParams(newSearch);
        if (onSelect) {
          onSelect(value);
        }
      }}
      onSearch={onSearch}
      style={{ width: width || 200, marginLeft: 10, marginRight: 10 }}
      placeholder={defaultLabel}
      value={value === defaultLabel ? null : value}
    />
  );
}
