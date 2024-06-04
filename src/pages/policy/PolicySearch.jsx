import { AutoComplete, Space, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiCall, copySearchParams, countryApiCall } from "../../api/call";
import Button from "../../controls/Button";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import useCountryId from "../../hooks/useCountryId";
import { getNewPolicyId } from "../../api/parameters";
import style from "../../style";

export default function PolicySearch(props) {
  const { metadata, target, policy, width, enableStack } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const countryId = useCountryId();
  const defaultId = searchParams.get(target);
  let defaultLabel = policy[target].label || `Policy #${defaultId}`;
  if (target === "baseline" && !defaultId) {
    defaultLabel = "Current law";
  }
  const [value, setValue] = useState(defaultLabel);
  const [policyId, setPolicyId] = useState(searchParams.get(target));
  const [isError, setIsError] = useState(false);

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

  async function handleStack() {
    // Set some sort of loading?

    // Fetch policy to stack
    try {
      const res = await countryApiCall(
        countryId,
        `/policy/${policyId}`
      );
      if (!res.ok) {
        console.error("Network error while fetching existing policy");
        console.error(res)
        setIsError(true);
      } else {
        const resJson = await res.json();
        const policyToStack = resJson.result;
        // Reconcile policies; when conflicts occur, defer to newer policy

        let newPolicyData = {
          ...policy.reform.data,
          ...policyToStack.policy_json
        }

        // Create new policy with those parameters and emit to back end, receiving back ID
        const newPolicyRes = await getNewPolicyId(
          countryId,
          newPolicyData
        );
        if (!newPolicyRes.status === "ok") {
          console.error("Network error while creating new policy");
          console.error(newPolicyRes)
          setIsError(true);
        } else {
          // Mimic handleCheckmark and setSearchParams using new ID
          let newSearch = copySearchParams(searchParams);
          newSearch.set("reform", newPolicyRes.policy_id);
          setSearchParams(newSearch);
        }
      }
    }
    catch (err) {
      console.error("Error while fetching existing policy");
      console.error(err);
      setIsError(true);
    }
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "10px"
      }}
    >
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
                onClick={handleStack}
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
    {
      isError && (
        <p
          style={{
            margin: 0,
            color: style.colors.DARK_RED
          }}
        >
          We&apos;ve encountered an error; please try again later
        </p>
      )
    }
    </div>
  );

}