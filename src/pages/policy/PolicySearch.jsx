import { AutoComplete, Space, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiCall, copySearchParams, countryApiCall } from "../../api/call";
import Button from "../../controls/Button";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import useCountryId from "../../hooks/useCountryId";

/**
 * Stacks policyJsonToStack on top of a given currentPolicy, ignoring
 * the baseline policy, policyId, and label
 * @param {Object} currentPolicy This is a fully policy object, containing
 * baseline and reform sub-objects, within which the data sub-object houses
 * reform definitions
 * @param {Object} policyJsonToStack The JSON of the policy reforms from a 
 * fetched policy; this is not a full policy object
 * @returns {Object} The combined policies as a full policy object; 
 * conflicts are resolved in favor of policyJsonToStack
 */
export function stackPolicies(currentPolicy, policyJsonToStack) {

  // Populate newPolicy with the current policy
  let newPolicy = {...currentPolicy};

  // Spread the reform object's data sub-object items into this policy;
  // this will override any previously set value in currentPolicy
  newPolicy = {
    ...newPolicy,
    reform: {
      ...newPolicy.reform,
      data: {
        ...newPolicy.reform.data,
        ...policyJsonToStack
      }
    }
  }

  return newPolicy;
}

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
      } else {
        const resJson = await res.json();
        const policyToStack = resJson.result;
        console.log(policyToStack);
        // Reconcile policies; when conflicts occur, defer to newer policy

        let newPolicy = stackPolicies(policy, policyToStack.policy_json);
        console.log(newPolicy);

        /*
        console.log(policy);
        console.log(policyToStack.policy_json);
        console.log(newPolicy);
        */

        // Create new policy with those parameters and emit to back end, receiving back ID

        // Mimic handleCheckmark and setSearchParams using new ID
      }
    }
    catch (err) {
      console.error("Error while fetching existing policy");
      console.error(err);
    }


  }

  /*
  function changeHandler(value) {
    reformMap.set(startDate, nextDay(endDate), value);
    let data = {};
    reformMap.minus(baseMap).forEach(([k1, k2, v]) => {
      data[`${k1}.${prevDay(k2)}`] = v;
    });
    const newReforms = { ...policy.reform.data };
    if (
      Object.keys(data).length === 0 &&
      Object.keys(newReforms).length === 1
    ) {
      let newSearch = copySearchParams(searchParams);
      newSearch.delete("reform");
      setSearchParams(newSearch);
    } else {
      newReforms[parameterName] = data;
      getNewPolicyId(metadata.countryId, newReforms).then((result) => {
        if (result.status !== "ok") {
          console.error(
            "ParameterEditor: In attempting to fetch new " +
              "policy, the following error occurred: " +
              result.message,
          );
        } else {
          let newSearch = copySearchParams(searchParams);
          newSearch.set("reform", result.policy_id);
          setSearchParams(newSearch);
        }
      });
    }
  }
  */

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
  );

}