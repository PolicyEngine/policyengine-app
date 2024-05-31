import { AutoComplete, Space, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { copySearchParams, countryApiCall } from "../../api/call";
import Button from "../../controls/Button";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";

export default function PolicySearch(props) {
  const { metadata, target, policy, width, enableStack } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultId = searchParams.get(target);
  let defaultLabel = policy[target].label || `Policy #${defaultId}`;
  if (target === "baseline" && !defaultId) {
    defaultLabel = "Current law";
  }
  const [value, setValue] = useState(defaultLabel);
  const [policyId, setPolicyId] = useState(searchParams.get(target));

  const [policies, setPolicies] = useState([]);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [lastSearch, setLastSearch] = useState("");

  const disableStack = policy.baseline.label === "Current law" && policy.reform.label === "Current law";

  useEffect(() => {
    setValue(defaultLabel);
  }, [defaultLabel]);

  // Handle when a user clicks an item in the list
  function handleClickOnItem(value, option) {
    setValue(option.label);
    setPolicyId(value);
  }

  // Function to select a policy; this replaces any existing
  // policy the user might have
  function handleCheckmarkButton() {
    let newSearch = copySearchParams(searchParams);
    newSearch.set(target, policyId);
    setSearchParams(newSearch);
  }

  function handleStack() {
    // Set some sort of loading?

    // Fetch policy to stack

    // Do some sort of reconciling of these policies - what if parameters conflict?

    // Create new policy with those parameters and emit to back end, receiving back ID

    // Mimic handleCheckmark and setSearchParams using new ID
  }

  // The search should query the API, but limited to one request every 1000ms.
  const onSearch = (searchText) => {
    setValue(searchText);
    const now = new Date().getTime();
    if (now - lastRequestTime > 1000 || searchText !== lastSearch) {
      countryApiCall(
        metadata.countryId,
        `/policies?query=${searchText}&unique_only=true`,
      )
        .then((data) => data.json())
        .then((data) => {
          setPolicies(
            data.result.map((item) => {
              return {
                value: item.id,
                label: `#${item.id} ${item.label}`
              };
            }) || [],
          );
          setLastRequestTime(new Date().getTime());
          setLastSearch(searchText);
        });
    }
  };

  return (
    <Space.Compact
      style={{
        width: width || "100%",
      }}
    >
    <AutoComplete
      options={policies || [{ value: defaultId, label: defaultLabel }]}
      onSelect={(value, option) => handleClickOnItem(value, option)}
      onSearch={onSearch}
      style={{ width: width || 200 }}
      placeholder={defaultLabel}
      value={value === defaultLabel ? null : value}
    />
        {enableStack && (
            <Tooltip
              title={disableStack ? "" : "Add to current policy"}
            >
              <Button
                type={disableStack ? "disabled" : "secondary"}
                onClick={() => {}}
                width={50}
                style={{
                  padding: "unset",
                  borderWidth: "1px"
                }}
                text={<PlusOutlined />}
              />
            </Tooltip>
          )
        }
        <Tooltip
          title="Use this policy; it will replace your current policy"
        >
          <Button
            type="primary"
            onClick={handleCheckmarkButton}
            width={50}
            style={{
              padding: "unset"
            }}
            text={<CheckOutlined />}
          />
        </Tooltip>
    </Space.Compact>
  );

}