import { SwapOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { copySearchParams } from "../../api/call";
import { getNewPolicyId } from "../../api/parameters";
import { formatVariableValue } from "../../api/variables";
import { getParameterAtInstant } from "../../api/parameters";
import Button from "../../controls/Button";
import InputField from "../../controls/InputField";
import NavigationButton from "../../controls/NavigationButton";
import style from "../../style";
import { RegionSelector, TimePeriodSelector } from "./output/PolicyOutput";
import PolicySearch from "./PolicySearch";
import { Alert, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

function PolicyNamer(props) {
  const { policy, metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const label = policy.reform.label || `Policy #${searchParams.get("reform")}`;
  const [error, setError] = useState(null);
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
        <InputField
          placeholder={label}
          type="text"
          inputmode="text"
          padding={10}
          width="100%"
          value={label}
          key={label}
          onChange={(name) => {
            getNewPolicyId(metadata.countryId, policy.reform.data, name).then(
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
                }
              },
            );
          }}
        />
      </div>
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

function SinglePolicyChange(props) {
  const { startDateStr, endDateStr, parameterMetadata, value, paramLabel } =
    props;
  const oldVal = getParameterAtInstant(parameterMetadata, startDateStr);
  const oldValStr = formatVariableValue(parameterMetadata, oldVal);
  const newValueStr = formatVariableValue(parameterMetadata, value);
  const isBool =
    parameterMetadata.unit === "bool" || parameterMetadata.unit === "abolition";
  const prefix = isBool
    ? value
      ? "Enable"
      : "Disable"
    : value > oldVal
    ? "Raise"
    : "Lower";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 10%",
      }}
    >
      <div>
        <span style={isBool ? { color: style.colors.BLUE } : {}}>
          {prefix}{" "}
        </span>
        {paramLabel}
        {!isBool && (
          <>
            {" "}
            from <span>{oldValStr}</span> to{" "}
            <span
              style={{
                color: style.colors.BLUE,
              }}
            >
              {newValueStr}
            </span>
          </>
        )}
      </div>
      <div style={{ fontStyle: "italic" }}>
        {startDateStr} to {endDateStr}
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
        paramLabel={parameter.label}
        startDateStr={startDateStr}
        endDateStr={endDateStr}
        parameterMetadata={parameter}
        value={value}
      />,
    );
  }
  return (
    <div>
      <div style={{ paddingLeft: 10 }}>{changes}</div>
    </div>
  );
}

function PolicyDisplay(props) {
  const { policy, metadata, region, timePeriod, closeDrawer, hideButtons } =
    props;
  const reformLength = Object.keys(policy.reform.data).length;
  const navigate = useNavigate();
  return (
    <div
      style={{
        paddingTop: 20,
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
        slide={false}
      >
        {Object.keys(policy.reform.data).map((parameterName) => (
          <Carousel.Item
            key={parameterName}
            onClick={() => {
              const country = metadata.countryId;
              const newSearchParams = {};
              newSearchParams.focus = parameterName;
              newSearchParams.reform = policy.reform.id;
              newSearchParams.region = region;
              newSearchParams.timePeriod = timePeriod;
              const newUrl = `/${country}/policy?${new URLSearchParams(
                newSearchParams,
              )}`;
              navigate(newUrl);
              hideButtons && closeDrawer();
            }}
          >
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
        <p style={{ textAlign: "center" }}>Your reform is empty</p>
      )}
    </div>
  );
}

export default function PolicyRightSidebar(props) {
  const { policy, setPolicy, metadata, hideButtons, closeDrawer } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const region = searchParams.get("region");
  const timePeriod = searchParams.get("timePeriod");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId = searchParams.get("baseline");
  const focus = searchParams.get("focus") || "";
  const stateAbbreviation = focus.split(".")[2];
  const hasHousehold = searchParams.get("household") !== null;
  const [showReformSearch, setShowReformSearch] = useState(false);
  const options = metadata.economy_options.region.map((stateAbbreviation) => {
    return { value: stateAbbreviation.name, label: stateAbbreviation.label };
  });
  options.push({ value: region, label: region });
  const label = options.find(
    (option) => option.value === stateAbbreviation,
  )?.label;
  const regionLabel = options.find((option) => option.value === region)?.label;
  const validatedStateAbbreviation = options.find(
    (option) => option.value === stateAbbreviation,
  )?.value;
  const confirmEconomicImpact = () => {
    let message = "";
    if (validatedStateAbbreviation && stateAbbreviation !== region) {
      message = `You are about to calculate the economic impact of a tax reform in ${label} for ${regionLabel} `;
    }
    if (region === "us" && focus.startsWith("gov.states")) {
      message =
        "You are about to calculate the economic impact of a state tax reform for the entire US, which PolicyEngine does not currently support. ";
    }
    if (message) {
      Modal.confirm({
        title: message,
        content: `Change the simulation region to ${label} by clicking "Change State".`,
        icon: <ExclamationCircleOutlined style={{ color: "#2C6496" }} />,
        onOk() {
          let newSearch = copySearchParams(searchParams);
          newSearch.set("region", stateAbbreviation);
          setSearchParams(newSearch);
          window.location.reload();
        },
        okText: "Change State", // Customize the OK button text
        cancelText: "Continue",
        okButtonProps: {
          style: {
            backgroundColor: "#2C6496",
            borderColor: "#2C6496",
          },
        },
        bodyStyle: {
          paddingLeft: "9px",
        },
        style: {
          top: "25%",
        },
      });
    } else {
      let newSearch = copySearchParams(searchParams);
      newSearch.set("focus", "policyOutput");
      setSearchParams(newSearch);
    }
  };

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
        searchParams.get("timePeriod") || defaults.timePeriod,
      );
      newSearch.set(
        "baseline",
        searchParams.get("baseline") || defaults.baseline,
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
              newSearchParams,
            )}`;
            navigate(newUrl);
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 10 }}>
      {
        <PolicyNamer
          policy={policy}
          metadata={metadata}
          setPolicy={setPolicy}
        />
      }
      {showReformSearch ? (
        <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
          <PolicySearch
            metadata={metadata}
            policy={policy}
            target="reform"
            width="100%"
            onSelect={() => setShowReformSearch(false)}
          />
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            href="#"
            style={{ textAlign: "center", width: "100%" }}
            onClick={() => setShowReformSearch(true)}
          >
            find an existing policy
          </a>
        </div>
      )}
      <PolicyDisplay
        policy={policy}
        metadata={metadata}
        region={region}
        timePeriod={timePeriod}
        closeDrawer={closeDrawer}
        hideButtons={hideButtons}
      />
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
              baselinePolicyId || metadata.current_law_id,
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
          onClick={confirmEconomicImpact}
        />
      )}
      {!hideButtons && !hasHousehold && (
        <NavigationButton
          text="Enter my household"
          focus="intro"
          target={`/${metadata.countryId}/household`}
        />
      )}
      {!hideButtons && hasHousehold && (
        <NavigationButton
          text="Calculate my household impact"
          focus="householdOutput.netIncome"
          target={`/${metadata.countryId}/household`}
        />
      )}
    </div>
  );
}
