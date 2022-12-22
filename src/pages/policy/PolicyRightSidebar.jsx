import { SwapOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { copySearchParams } from "../../api/call";
import { getNewPolicyId } from "../../api/parameters";
import { formatVariableValue } from "../../api/variables";
import Button from "../../controls/Button";
import InputField from "../../controls/InputField";
import NavigationButton from "../../controls/NavigationButton";
import style from "../../style";
import { RegionSelector, TimePeriodSelector } from "./output/PolicyOutput";
import PolicySearch from "./PolicySearch";

function PolicyNamer(props) {
  const { policy, metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const label = policy.reform.label || `Policy #${searchParams.get("reform")}`;

  return (
    <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
      <InputField
        placeholder={label}
        type="text"
        inputmode="text"
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
  const reformLength = Object.keys(policy.reform.data).length;

  return (
    <div
      style={{
        paddingTop: 20,
        paddingLeft: 25,
        paddingRight: 25,
        maxHeight: "20vh",
        overflow: "scroll",
      }}
    >
      <Carousel 
        variant="dark" 
        className="text-center" 
        indicators={false} 
        interval={null} 
        controls={reformLength > 1 ? true : false} 
        slide={false}>
        {Object.keys(policy.reform.data).map((parameterName) => (
          <Carousel.Item>
            <PolicyItem
              key={parameterName}
              metadata={metadata}
              parameterName={parameterName}
              reformData={policy.reform.data}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      {Object.keys(policy.reform.data).length === 0 && (
        <h6 style={{ textAlign: "center" }}>Your reform is empty</h6>
      )}
    </div>
  );
}

export default function PolicyRightSidebar(props) {
  const { policy, setPolicy, metadata, hideButtons } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const region = searchParams.get("region");
  const timePeriod = searchParams.get("timePeriod");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId = searchParams.get("baseline");
  const focus = searchParams.get("focus") || "";
  const hasReform = reformPolicyId !== null;
  useEffect(() => {
    if (!region || !timePeriod || !reformPolicyId || !baselinePolicyId) {
      const defaults = {
        region: metadata.economy_options.region[0].name,
        timePeriod: metadata.economy_options.time_period[0].name,
        baseline: metadata.current_law_id,
      };
      let newSearch = copySearchParams(searchParams);
      // Set missing query parameters to their defaults.
      newSearch.set("region", searchParams.get("region") || defaults.region);
      newSearch.set(
        "timePeriod",
        searchParams.get("timePeriod") || defaults.timePeriod
      );
      newSearch.set(
        "baseline",
        searchParams.get("baseline") || defaults.baseline
      );
      setSearchParams(newSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, timePeriod, reformPolicyId, baselinePolicyId]);

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
            newSearchParams.focus = "gov";
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
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <h6 style={{ margin: 0 }}>against</h6>
        <PolicySearch metadata={metadata} policy={policy} target="baseline" />
        <SwapOutlined
          style={{
            fontSize: 15,
            cursor: "pointer",
            marginRight: 25,
            marginLeft: 10,
          }}
          onClick={() => {
            const newSearch = copySearchParams(searchParams);
            newSearch.set(
              "reform",
              baselinePolicyId || metadata.current_law_id
            );
            if (!reformPolicyId) {
              newSearch.delete("baseline");
            } else {
              newSearch.set("baseline", reformPolicyId);
            }
            setSearchParams(newSearch);
          }}
        />
      </div>
      {!hideButtons && focus && focus.startsWith("policyOutput") && (
        <NavigationButton primary text="Edit my policy" focus="gov" />
      )}
      {!hideButtons && focus && !focus.startsWith("policyOutput") && (
        <NavigationButton
          primary
          text="Calculate economic impact"
          focus="policyOutput"
        />
      )}
      {!hideButtons && !hasReform && (
        <NavigationButton
          text="Enter my household"
          focus="intro"
          target={`/${metadata.countryId}/household`}
        />
      )}
      {!hideButtons && hasReform && (
        <NavigationButton
          text="Calculate my household impact"
          focus="householdOutput.netIncome"
          target={`/${metadata.countryId}/household`}
        />
      )}
    </div>
  );
}
