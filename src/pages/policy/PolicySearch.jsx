import { Alert, AutoComplete, message } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { copySearchParams, countryApiCall } from "../../api/call";
import { getNewPolicyId } from "api/parameters";

export default function PolicySearch(props) {
  const { metadata, target, policy, width, onSelect } = props;
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState(null);
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

  const onRenameSubmit = () => {
    console.log("new name", newName);
    const encodedName = encodeURIComponent(newName);
    countryApiCall(metadata.countryId, `/policies?query=${encodedName}`)
      .then((data) => {
        console.log("countryAPIcall", data);
        return data.json();
      })
      .then((data) => {
        if (data.result.length > 0) {
          message.error("Policy name already exists");
        } else {
          // Handle the case where the policy name does not exist
          // This could involve making another API call to rename the policy
          console.log("renaming policy", data);
          getNewPolicyId(metadata.countryId, policy.reform.data, newName).then(
            (data) => {
              if (data.status) {
                setError(data.message);
                let newSearch = copySearchParams(searchParams);
                newSearch.set("renamed", true);
                setSearchParams(newSearch);
              } else {
                let newSearch = copySearchParams(searchParams);
                newSearch.set("renamed", true);
                setSearchParams(newSearch);
                setError(null);
                console.log("renamed policy", data);
              }
            },
          );
        }
      });
  };

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
    <>
      <button onClick={() => setIsRenaming(true)}>Rename</button>
      {isRenaming && (
        <>
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
          <button onClick={onRenameSubmit}>Submit</button>
        </>
      )}
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
        style={{ width: width || 200 }}
        placeholder={defaultLabel}
        value={value === defaultLabel ? null : value}
      />
      {error && (
        <Alert
          message={error}
          type="error"
          style={{ marginLeft: 20, marginRight: 20 }}
        />
      )}
    </>
  );
}
