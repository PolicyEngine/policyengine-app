import { SwapOutlined, QuestionCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { copySearchParams } from "../../api/call";
import { getNewPolicyId } from "../../api/parameters";
import { formatVariableValue } from "../../api/variables";
import { getParameterAtInstant } from "../../api/parameters";
import Button from "../../controls/Button";
import InputField from "../../controls/InputField";
import SearchOptions from "../../controls/SearchOptions";
import SearchParamNavButton from "../../controls/SearchParamNavButton";
import style from "../../style";
import PolicySearch from "./PolicySearch";
import { Alert, Modal, Switch, Tooltip } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { defaultYear } from "data/constants";

function RegionSelector(props) {
  const { metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  let options = metadata.economy_options.region.map((region) => {
    return { value: region.name, label: region.label };
  });

  // This is a temporary solution that will need to be superseded by
  // an improved back end design; removing this value allows
  // DatasetSelector to handle choosing between enhanced CPS data and
  // standard US data
  options = options.filter((option) => option.value !== "enhanced_us");

  const [value] = useState(searchParams.get("region") || options[0].value);

  return (
    <SearchOptions
      style={{
        width: "100%",
      }}
      options={options}
      defaultValue={value}
      onSelect={(value) => {
        let newSearch = copySearchParams(searchParams);
        newSearch.set("region", value);
        setSearchParams(newSearch);
      }}
    />
  );
}

function TimePeriodSelector(props) {
  const { metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const options = metadata.economy_options.time_period.map((time_period) => {
    return { value: time_period.name.toString(), label: time_period.label };
  });

  const yearArray = options.reduce((accu, periodObj) => {
    return [...accu, Number(periodObj.value)];
  }, []);

  const defaultPeriod = yearArray.includes(defaultYear)
    ? defaultYear
    : options[0].value;

  const [value] = useState(
    (searchParams.get("timePeriod") || "").toString() || defaultPeriod,
  );

  return (
    <SearchOptions
      style={{
        width: "100%",
      }}
      options={options}
      defaultValue={value}
      onSelect={(value) => {
        let newSearch = copySearchParams(searchParams);
        newSearch.set("timePeriod", value);
        setSearchParams(newSearch);
      }}
    />
  );
}

/**
 * A (hopefully temporary) component meant to abstract away the fact
 * that the US enhanced CPS data is defined as a region within the US
 * country package; this displays the enhanced CPS as a dataset on the
 * right-hand policy panel
 * @param {Object} props
 * @returns {import("react").ReactElement}
 */
function DatasetSelector(props) {
  const { presentRegion, timePeriod } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  function shouldEnableSlider(presentRegion, timePeriod) {
    // Define the regions the slider should be enabled
    const showRegions = [
      "enhanced_us",
      "us",
      null
    ];

    // Define the times the slider should NOT be enabled
    const dontShowTimes = [
      2021
    ];

    // Return whether or not slider should be enabled
    if (showRegions.includes(presentRegion) && !dontShowTimes.includes(timePeriod)) {
      return true;
    }

    return false;

  }

  // Define handler function
  function handleChange(isChecked) {
    // Define our desired states; item 0 corresponds to
    // "true" and 1 to "false", since bools can't be used as keys
    const outputStates = [
      "enhanced_us",
      "us"
    ];

    // First, safety check - if the button isn't even
    // supposed to be shown, do nothing
    if (!shouldEnableSlider(presentRegion, timePeriod)) {
      return;
    }

    // Duplicate the existing search params
    let newSearch = copySearchParams(searchParams);

    // Set params accordingly
    newSearch.set("region", isChecked ? outputStates[0] : outputStates[1]);
    setSearchParams(newSearch);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px"
      }}
    >
      <Switch 
        size="small"
        onChange={handleChange}
        disabled={!shouldEnableSlider(presentRegion, timePeriod)}
        checked={presentRegion === "enhanced_us" ? true : false}
      />
      <h6
        style={{
          margin: 0,
          fontSize: "0.95em",
          color: !shouldEnableSlider(presentRegion, timePeriod) && "rgba(0,0,0,0.5)",
          cursor: !shouldEnableSlider(presentRegion, timePeriod) && "not-allowed"
        }}
      >
        Utilize Enhanced CPS (experimental)
      </h6>
      <Tooltip placement="topRight" title="Currently available for US-wide simulations only.">
        <QuestionCircleOutlined
          style={{
            color: "rgba(0, 0, 0, 0.85)",
            opacity: 0.85,
            cursor: "pointer"
          }}
        />
      </Tooltip>
    </div>
  )
}

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
        <span
          style={isBool ? { color: style.colors.BLUE, cursor: "pointer" } : {}}
        >
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
                cursor: "pointer",
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
  policy.reform.data = Object.fromEntries(
    Object.entries(policy.reform.data).filter(
      ([key, value]) =>
        !(Object.keys(value).length === 0 && value.constructor === Object),
    ),
  );
  const reformLength = Object.keys(policy.reform.data).length;
  const [searchParams, setSearchParams] = useSearchParams();
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
              const newSearchParams = copySearchParams(searchParams);
              newSearchParams.set("focus", parameterName);
              newSearchParams.set("reform", policy.reform.id);
              newSearchParams.set("region", region);
              newSearchParams.set("timePeriod", timePeriod);
              setSearchParams(newSearchParams);
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
      newSearch.set("focus", "policyOutput.policyBreakdown");
      setSearchParams(newSearch);
    }
  };

  useEffect(() => {
    if (!region || !timePeriod || !reformPolicyId || !baselinePolicyId) {
      const timeOptions = metadata.economy_options.time_period;

      const yearArray = timeOptions.reduce((accu, periodObj) => {
        return [...accu, Number(periodObj.name)];
      }, []);

      const defaultTimePeriod = yearArray.includes(defaultYear)
        ? defaultYear
        : timeOptions[0].name;

      const defaults = {
        region: metadata.economy_options.region[0].name,
        timePeriod: defaultTimePeriod,
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
          style={{ margin: "20px auto 10px" }}
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
          flexDirection: "column",
          margin: "0 20px",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "10px",
        }}
      >
        <h6 style={{ margin: "10px 0 0 0" }}>Geography</h6>
        <RegionSelector metadata={metadata} />
        <h6 style={{ margin: "10px 0 0 0" }}>Year</h6>
        <TimePeriodSelector metadata={metadata} />
        <h6 style={{ margin: "10px 0 0 0" }}>Baseline Policy</h6>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "10px",
          }}
        >
          <PolicySearch
            metadata={metadata}
            policy={policy}
            target="baseline"
            width="100%"
          />
          <SwapOutlined
            style={{
              fontSize: 15,
              cursor: "pointer",
              marginRight: "10px",
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
        {metadata.countryId === "us" &&
          <DatasetSelector 
            presentRegion={region} 
            timePeriod={timePeriod}
          />
        }
      </div>
      {!hideButtons && focus && focus.startsWith("policyOutput") && (
        <SearchParamNavButton
          type="primary"
          text="Edit my policy"
          focus="gov"
          style={{ margin: "20px auto 10px" }}
        />
      )}
      {!hideButtons && focus && !focus.startsWith("policyOutput") && (
        <SearchParamNavButton
          type="primary"
          text="Calculate economic impact"
          onClick={confirmEconomicImpact}
          style={{ margin: "20px auto 10px" }}
        />
      )}
      {!hideButtons && !hasHousehold && (
        <SearchParamNavButton
          text="Enter my household"
          focus="intro"
          style={{ margin: "20px auto 10px" }}
          target={`/${metadata.countryId}/household`}
        />
      )}
      {!hideButtons && hasHousehold && (
        <SearchParamNavButton
          text="Calculate my household impact"
          focus="householdOutput.netIncome"
          target={`/${metadata.countryId}/household`}
          style={{ margin: "20px auto 10px" }}
        />
      )}
    </div>
  );
}
