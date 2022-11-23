import moment from "moment";
import { useNavigate, useSearchParams } from "react-router-dom";
import { copySearchParams } from "../../api/call";
import { getNewPolicyId } from "../../api/parameters";
import { formatVariableValue } from "../../api/variables";
import Button from "../../controls/Button";
import InputField from "../../controls/InputField";
import style from "../../style";
import { RegionSelector, TimePeriodSelector } from "./output/PolicyOutput";

function PolicyNamer(props) {
  const { policy, metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const label = policy.reform.label || `Policy #${searchParams.get("reform")}`;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <InputField
        placeholder={label}
        padding={10}
        width="100%"
        onChange={(name) => {
          getNewPolicyId(metadata.countryId, policy.reform.data, name).then(
            () => {
              let newSearch = copySearchParams(searchParams);
              newSearch.set("renamed", true);
              setSearchParams(newSearch);
            }
          );
        }}
      />
    </div>
  );
}

function SinglePolicyChange(props) {
  const { startDateStr, endDateStr, parameterMetadata, value } = props;
  const newValueStr = formatVariableValue(parameterMetadata, value);
  const startDate = moment(startDateStr).format("LL");
  const endDate = moment(endDateStr).format("LL");
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: 200,
          textAlign: "right",
          marginRight: 10,
          flex: 3,
          paddingRight: 5,
          borderRightWidth: 2,
          borderRightStyle: "solid",
          borderRightColor: style.colors.DARK_GRAY,
        }}
      >
        <div>from {startDate}</div>
        <div>until {endDate}</div>
      </div>
      <div style={{ width: 200, textAlign: "left", marginRight: 10, flex: 1 }}>
        {newValueStr}
      </div>
    </div>
  );
}

function PolicyItem(props) {
  const { metadata, parameterName, reformData } = props;
  const parameter = metadata.parameters[parameterName];
  let changes = [];
  for (const [timePeriod, value] of Object.entries(reformData[parameterName])) {
    const [startDateStr, endDateStr] = timePeriod.split(".");
    changes.push(
      <SinglePolicyChange
        key={timePeriod}
        startDateStr={startDateStr}
        endDateStr={endDateStr}
        parameterMetadata={parameter}
        value={value}
      />
    );
  }
  return (
    <div>
      <h6>{parameter.label}</h6>
      <div style={{ paddingLeft: 10 }}>{changes}</div>
    </div>
  );
}

function PolicyDisplay(props) {
  const { policy, metadata } = props;
  return (
    <div style={{ paddingTop: 20, paddingLeft: 10, paddingRight: 10 }}>
      {Object.keys(policy.reform.data).map((parameterName) => (
        <PolicyItem
          key={parameterName}
          metadata={metadata}
          parameterName={parameterName}
          reformData={policy.reform.data}
        />
      ))}
    </div>
  );
}

export default function PolicyRightSidebar(props) {
  const { policy, setPolicy, metadata } = props;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  if (!policy.reform.data) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "60%",
        }}
      >
        <h4 style={{ marginBottom: 20 }}>No reform specified</h4>
        <Button
          text="Create a reform"
          onClick={() => {
            // Navigate to /<country>/household, preserving URL parameters
            const country = metadata.countryId;
            const newSearchParams = {};
            for (const [key, value] of searchParams) {
              newSearchParams[key] = value;
            }
            newSearchParams.focus = "policy";
            const newUrl = `/${country}/policy?${new URLSearchParams(
              newSearchParams
            )}`;
            navigate(newUrl);
          }}
        />
      </div>
    );
  }
  return (
    <div style={{ paddingTop: 10 }}>
      <PolicyNamer policy={policy} metadata={metadata} setPolicy={setPolicy} />
      <PolicyDisplay policy={policy} metadata={metadata} />
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <h6 style={{ margin: 0 }}>in</h6>
        <RegionSelector metadata={metadata} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <h6 style={{ margin: 0 }}>over</h6>
        <TimePeriodSelector metadata={metadata} />
      </div>
      <Button
        text="See details"
        style={{ marginTop: 30 }}
        onClick={() => {
          // Navigate to /<country>/household, preserving URL parameters
          const country = metadata.countryId;
          const newSearchParams = {};
          for (const [key, value] of searchParams) {
            newSearchParams[key] = value;
          }
          newSearchParams.focus = "policyOutput.netIncome";
          let url = `/${country}/policy`;
          if (Object.keys(newSearchParams).length > 0) {
            url += `?${new URLSearchParams(newSearchParams)}`;
          }
          navigate(url);
        }}
      />
    </div>
  );
}
