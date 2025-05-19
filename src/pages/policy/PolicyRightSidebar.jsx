import { SwapOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { copySearchParams } from "../../api/call";
import { getNewPolicyId } from "../../api/parameters";
import { formatVariableValue } from "../../api/variables";
import { getParameterAtInstant } from "../../api/parameters";
import Button from "../../controls/Button";
import InputText from "../../controls/InputText";
import SearchOptions from "../../controls/SearchOptions";
import SearchParamNavButton from "../../controls/SearchParamNavButton";
import style from "../../style";
import PolicySearch from "./PolicySearch";
import { Alert, Modal, Switch, Tag, Tooltip } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { defaultYear } from "data/constants";
import useDisplayCategory from "../../hooks/useDisplayCategory";
import { defaultForeverYear, defaultStartDate } from "../../data/constants";
import Collapsible from "../../layout/Collapsible";
import { formatFullDate } from "../../lang/format";
import useCountryId from "../../hooks/useCountryId";

function RegionSelector(props) {
  const { metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  let options = metadata.economy_options.region.map((region) => {
    return { value: region.name, label: region.label };
  });

  // The enhanced_us region is deprecated and should be removed from the API by June 1, 2025;
  // remove this filter after removing API code
  options = options.filter((option) => option.value !== "enhanced_us");
  let inputRegion = searchParams.get("region");
  if (!(searchParams.get("uk_local_areas_beta") === "true")) {
    options = options.filter(
      (option) => !option.value.includes("constituency/"),
    );
  }
  const [value] = useState(inputRegion || options[0].value);

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
 * Selector like the full/lite toggle that toggles between 'static' and 'dynamic' versions of the dataset.
 * @param {Object} props
 * @param {Object} props.policy
 * @param {Object} props.metadata
 * @returns {React.ReactElement}
 */
function BehavioralResponseToggle(props) {
  const { policy, metadata } = props;

  const dateString = `${defaultStartDate}.${String(defaultForeverYear)}-12-31`;
  const behavioralResponseReforms = useMemo(
    () => ({
      uk: {
        "gov.simulation.capital_gains_responses.elasticity": {
          [dateString]: -0.7,
        },
        "gov.simulation.labor_supply_responses.income_elasticity": {
          [dateString]: -0.05,
        },
        "gov.simulation.labor_supply_responses.substitution_elasticity": {
          [dateString]: 0.25,
        },
      },
      us: {
        "gov.simulation.labor_supply_responses.elasticities.income": {
          "2024-01-01.2100-12-31": -0.05,
        },
        "gov.simulation.labor_supply_responses.elasticities.substitution.by_position_and_decile.primary.1":
          {
            "2024-01-01.2100-12-31": 0.31,
          },
        "gov.simulation.labor_supply_responses.elasticities.substitution.by_position_and_decile.primary.10":
          {
            "2024-01-01.2100-12-31": 0.22,
          },
        "gov.simulation.labor_supply_responses.elasticities.substitution.by_position_and_decile.primary.2":
          {
            "2024-01-01.2100-12-31": 0.28,
          },
        "gov.simulation.labor_supply_responses.elasticities.substitution.by_position_and_decile.primary.3":
          {
            "2024-01-01.2100-12-31": 0.27,
          },
        "gov.simulation.labor_supply_responses.elasticities.substitution.by_position_and_decile.primary.4":
          {
            "2024-01-01.2100-12-31": 0.27,
          },
        "gov.simulation.labor_supply_responses.elasticities.substitution.by_position_and_decile.primary.5":
          {
            "2024-01-01.2100-12-31": 0.25,
          },
        "gov.simulation.labor_supply_responses.elasticities.substitution.by_position_and_decile.primary.6":
          {
            "2024-01-01.2100-12-31": 0.25,
          },
        "gov.simulation.labor_supply_responses.elasticities.substitution.by_position_and_decile.primary.7":
          {
            "2024-01-01.2100-12-31": 0.22,
          },
        "gov.simulation.labor_supply_responses.elasticities.substitution.by_position_and_decile.primary.8":
          {
            "2024-01-01.2100-12-31": 0.22,
          },
        "gov.simulation.labor_supply_responses.elasticities.substitution.by_position_and_decile.primary.9":
          {
            "2024-01-01.2100-12-31": 0.22,
          },
        "gov.simulation.labor_supply_responses.elasticities.substitution.by_position_and_decile.secondary":
          {
            "2024-01-01.2100-12-31": 0.27,
          },
      },
    }),
    [dateString],
  );
  const countryId = useCountryId();

  const hasBehavioralResponses = useCallback(
    (policy) => {
      // If country isn't even present, opt out to prevent Object accessing error
      if (!Object.keys(behavioralResponseReforms).includes(countryId)) {
        return false;
      }

      // Determine the requisite elasticity params for given country
      const behavioralResponseParams = Object.keys(
        behavioralResponseReforms[countryId],
      );

      // Make sure policy has every param
      return behavioralResponseParams.every((param) => {
        return Object.keys(policy.reform.data).includes(param);
      });
    },
    [countryId, behavioralResponseReforms],
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [isChecked, setIsChecked] = useState(hasBehavioralResponses(policy));
  const spellsBehaviour = ["uk", "ca"].includes(countryId);
  const displayCategory = useDisplayCategory();

  // Ref for storing previous label in case user reverts
  const prevLabelRef = useRef(null);

  useEffect(() => {
    setIsChecked(hasBehavioralResponses(policy));
  }, [policy, hasBehavioralResponses]);

  async function handleChange(value) {
    if (value) {
      await setBehavioralResponses();
    } else {
      await removeBehavioralResponses();
    }

    setIsChecked(value);
  }

  async function setBehavioralResponses() {
    // Save the previous reform's label in case user reverts
    prevLabelRef.current = policy.reform.label;
    const policyToStack = behavioralResponseReforms[metadata.countryId];

    // Fetch policy to stack
    let newPolicyData = {
      ...policy.reform.data,
      ...policyToStack,
    };

    // Create new policy with those parameters and emit to back end, receiving back ID
    const newPolicyRes = await getNewPolicyId(
      metadata.countryId,
      newPolicyData,
    );
    let newSearch = copySearchParams(searchParams);
    newSearch.set("reform", newPolicyRes.policy_id);
    setSearchParams(newSearch);
  }

  async function removeBehavioralResponses() {
    const policyToStack = behavioralResponseReforms[metadata.countryId];

    // Fetch policy to stack
    let newPolicyData = {
      ...policy.reform.data,
    };

    for (const key of Object.keys(policyToStack)) {
      delete newPolicyData[key];
    }

    let newPolicyLabel = null;
    // If there's a previous label, revert to it
    if (prevLabelRef.current) {
      newPolicyLabel = prevLabelRef.current;
    }

    // Current law is represented by an empty object;
    // if the new policy is empty, remove the reform query parameter
    if (Object.keys(newPolicyData).length === 0) {
      let newSearch = copySearchParams(searchParams);
      newSearch.delete("reform");
      setSearchParams(newSearch);
      return;
    }

    // Create new policy with those parameters and emit to back end, receiving back ID
    const newPolicyRes = await getNewPolicyId(
      metadata.countryId,
      newPolicyData,
      newPolicyLabel,
    );
    let newSearch = copySearchParams(searchParams);
    newSearch.set("reform", newPolicyRes.policy_id);
    setSearchParams(newSearch);
  }

  // Don't show behavior response toggle for countries without
  // policies to set them
  if (!Object.keys(behavioralResponseReforms).includes(countryId)) {
    return null;
  }

  const preLabel = {
    us: "CBO",
  };

  const tooltipLink = {
    us: "https://www.cbo.gov/sites/default/files/112th-congress-2011-2012/reports/43674-laborsupplyfiscalpolicy.pdf#page=4",
    uk: "https://policyengine.org/uk/research/behavioural-responses",
  };

  const tooltipText =
    "When selected, simulations adjust earnings and capital gains based on how " +
    `reforms affect net income and marginal tax rates${
      countryId === "us"
        ? ", applying the Congressional Budget Office's assumptions."
        : "."
    }`;

  const tooltipJSX = (
    <div>
      <span>{tooltipText}</span>
      {tooltipLink[countryId] && (
        <a
          href={tooltipLink[countryId]}
          target="_blank"
          rel="noreferrer"
          style={{
            marginLeft: "5px",
            textDecoration: "underline",
            color: "rgb(84, 140, 190)", // This is BLUE + 20 for each RGB value, so brighter
          }}
        >
          Learn more.
        </a>
      )}
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Switch
        checked={isChecked}
        size={displayCategory !== "mobile" && "small"}
        onChange={handleChange}
      />
      <p
        style={{
          margin: 0,
          fontSize: displayCategory !== "mobile" && "0.95em",
        }}
      >
        Apply {preLabel[countryId] ?? ""}{" "}
        {spellsBehaviour ? "behavioural" : "behavioral"} responses
      </p>
      <Tooltip
        placement="topRight"
        title={tooltipJSX}
        trigger={displayCategory === "mobile" ? "click" : "hover"}
      >
        <QuestionCircleOutlined
          style={{
            color: "rgba(0, 0, 0, 0.85)",
            opacity: 0.85,
            cursor: "pointer",
          }}
        />
      </Tooltip>
    </div>
  );
}

function LocalAreaFunctionalitySelector() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isChecked, setIsChecked] = useState(
    searchParams.get("uk_local_areas_beta") === "true",
  );
  const displayCategory = useDisplayCategory();

  function handleChange(value) {
    let newSearch = copySearchParams(searchParams);
    newSearch.set("uk_local_areas_beta", value);
    setSearchParams(newSearch);
    setIsChecked(value);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Switch
        checked={isChecked}
        size={displayCategory !== "mobile" && "small"}
        onChange={handleChange}
      />
      <p
        style={{
          margin: 0,
          fontSize: displayCategory !== "mobile" && "0.95em",
        }}
      >
        Enable UK local areas <Tag color={style.colors.TEAL_ACCENT}>BETA</Tag>
      </p>
    </div>
  );
}

function FullLiteToggle() {
  // Selector like the dataset selector that toggles between 'full' and 'lite' versions of the dataset.
  // should set a query param with mode=light or mode=full
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get("mode") || "full";
  const displayCategory = useDisplayCategory();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Switch
        checked={value === "lite"}
        size={displayCategory !== "mobile" && "small"}
        onChange={(checked) => {
          let newSearch = copySearchParams(searchParams);
          newSearch.set("mode", checked ? "lite" : "full");
          setSearchParams(newSearch);
        }}
      />
      <p
        style={{
          margin: 0,
          fontSize: displayCategory !== "mobile" && "0.95em",
        }}
      >
        Use a smaller sample
      </p>
      <Tooltip
        placement="topRight"
        title="When selected, limit simulations to a random 10,000 household set."
        trigger={displayCategory === "mobile" ? "click" : "hover"}
      >
        <QuestionCircleOutlined
          style={{
            color: "rgba(0, 0, 0, 0.85)",
            opacity: 0.85,
            cursor: "pointer",
          }}
        />
      </Tooltip>
    </div>
  );
}

/**
 * This displays the enhanced CPS as a dataset on the right-hand policy panel
 * @param {Object} props
 * @param {String} presentDataset The dataset, taken from the searchParams
 * @param {Number|String} timePeriod The year the simulation should run over
 * @returns {import("react").ReactElement}
 */
function DatasetSelector(props) {
  const { presentDataset, timePeriod } = props;
  const [isChecked, setIsChecked] = useState(confirmIsChecked(presentDataset));
  const [searchParams, setSearchParams] = useSearchParams();
  const displayCategory = useDisplayCategory();

  function confirmIsChecked(presentDataset) {
    // Define presentDataset value that activates check
    const checkValue = "enhanced_cps";
    if (presentDataset === checkValue) {
      return true;
    }
    return false;
  }

  // Determine whether slider should be enabled or disabled
  function shouldEnableSlider(timePeriod) {
    // Define earliest year slider should be shown for
    const sliderStartYear = 2024;

    // Return whether or not slider should be enabled
    // Null timePeriod reflects no URL param setting yet -
    // this is actually default behavior
    if (!timePeriod || timePeriod >= sliderStartYear) {
      return true;
    }

    return false;
  }

  function handleChange() {
    // First, safety check - if the button isn't even
    // supposed to be shown, do nothing
    if (!shouldEnableSlider(timePeriod)) {
      return;
    }

    // Duplicate the existing search params
    let newSearch = copySearchParams(searchParams);

    // Set params accordingly
    if (isChecked) {
      newSearch.delete("dataset");
      setIsChecked(false);
    } else {
      newSearch.set("dataset", "enhanced_cps");
      setIsChecked(true);
    }
    setSearchParams(newSearch);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Switch
        data-testid="enhanced_cps_switch"
        size={displayCategory !== "mobile" && "small"}
        onChange={handleChange}
        disabled={!shouldEnableSlider(timePeriod)}
        checked={presentDataset === "enhanced_cps" ? true : false}
      />
      <p
        style={{
          margin: 0,
          fontSize: displayCategory !== "mobile" && "0.95em",
          color: !shouldEnableSlider(timePeriod) && "rgba(0,0,0,0.5)",
          cursor: !shouldEnableSlider(timePeriod) && "not-allowed",
        }}
      >
        Use Enhanced CPS (beta)
      </p>
      <Tooltip
        placement="topRight"
        title="Currently available for US-wide simulations only."
        trigger={displayCategory === "mobile" ? "click" : "hover"}
      >
        <QuestionCircleOutlined
          style={{
            color: "rgba(0, 0, 0, 0.85)",
            opacity: 0.85,
            cursor: "pointer",
          }}
        />
      </Tooltip>
    </div>
  );
}

function PolicyNamer(props) {
  const { policy, metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const label = policy.reform.label || `Policy #${searchParams.get("reform")}`;
  const [error, setError] = useState(null);

  function handleSubmit(name) {
    if (!validateSubmit(name)) {
      setError("Error: Policy name invalid");
      return;
    }

    getNewPolicyId(metadata.countryId, policy.reform.data, name).then(
      (data) => {
        let newSearch = copySearchParams(searchParams);
        newSearch.set("renamed", true);
        if (data.status === "ok") {
          newSearch.set("reform", data.policy_id);
        }
        setSearchParams(newSearch);

        if (data.status !== "ok") {
          setError(data.message);
        } else {
          setError(null);
        }
      },
    );
  }

  function validateSubmit(input) {
    if (!input) {
      return false;
    }
    return true;
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <InputText
          disabled={label === "Current law"}
          width="100%"
          key={label}
          buttonText="Rename"
          buttonStyle="default" // match disabled button
          componentStyle={{
            margin: "10px 20px",
          }}
          placeholder={label}
          error={error}
          boxStyle={{
            padding: "0px 10px",
          }}
          onPressEnter={(e, name) => handleSubmit(name)}
          onClick={(e, name) => handleSubmit(name)}
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

export function SinglePolicyChange(props) {
  const {
    startDateStr,
    endDateStr,
    parameterMetadata,
    value,
    paramLabel,
    countryId,
  } = props;
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

  const dateString = formatDateString(startDateStr, endDateStr, countryId);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: 10,
      }}
    >
      <div>
        <span
          style={isBool ? { color: style.colors.BLUE, cursor: "pointer" } : {}}
        >
          {prefix}{" "}
        </span>
        <span style={{ fontFamily: "Roboto Serif", color: "black" }}>
          {paramLabel}
        </span>
        {!isBool && (
          <>
            {" "}
            from <span>{oldValStr}</span> to{" "}
            <span
              style={{
                color: style.colors.BLUE,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {newValueStr}
            </span>
          </>
        )}
      </div>
      <div style={{ fontStyle: "italic" }}>{dateString}</div>
    </div>
  );
}

export function DeprecatedPolicyChange() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: 10,
      }}
    >
      <div>
        <span style={{ fontFamily: "Roboto Serif", color: "black" }}>
          This policy is deprecated.
        </span>
      </div>
    </div>
  );
}

function PolicyItem(props) {
  const { metadata, parameterName, reformData, isPolicyDeprecated } = props;

  if (isPolicyDeprecated) {
    return (
      <div>
        <div
          style={{
            paddingLeft: 10,
            paddingRight: 40,
          }}
        >
          <DeprecatedPolicyChange />
        </div>
      </div>
    );
  }

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
        countryId={metadata.countryId}
        parameterMetadata={parameter}
        value={value}
      />,
    );
  }
  return (
    <div>
      <div
        style={{
          paddingLeft: Object.keys(reformData).length > 1 ? 40 : 10,
          paddingRight: 40,
        }}
      >
        {changes}
      </div>
    </div>
  );
}

function PolicyDisplay(props) {
  const {
    policy,
    metadata,
    region,
    timePeriod,
    closeDrawer,
    hideButtons,
    isPolicyDeprecated,
  } = props;
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
        overflowY: "scroll",
      }}
    >
      <Carousel
        variant="dark"
        indicators={false}
        interval={null}
        controls={reformLength > 1 && !isPolicyDeprecated ? true : false}
        slide={true}
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
              setSearchParams(newSearchParams, { replace: true });
              hideButtons && closeDrawer();
            }}
          >
            <PolicyItem
              key={parameterName}
              metadata={metadata}
              parameterName={parameterName}
              reformData={policy.reform.data}
              isPolicyDeprecated={isPolicyDeprecated}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      {Object.keys(policy.reform.data).length === 0 && (
        <p style={{ fontFamily: "Roboto Serif", paddingLeft: 20 }}>
          Your reform is empty.
        </p>
      )}
    </div>
  );
}

export default function PolicyRightSidebar(props) {
  const {
    policy,
    setPolicy,
    metadata,
    hideButtons,
    closeDrawer,
    defaultOpen,
    isPolicyDeprecated,
  } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const region = searchParams.get("region");
  const timePeriod = searchParams.get("timePeriod");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId = searchParams.get("baseline");
  const focus = searchParams.get("focus") || "";
  const stateAbbreviation = focus.split(".")[2];
  const hasHousehold = searchParams.get("household") !== null;

  let dataset = searchParams.get("dataset");

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

  const baselineData = policy.baseline.data;
  const reformData = policy.reform.data;

  // Convenience function for determining if baseline and reform
  // are both current law, and thus, there is no reform
  function isNoReform(baselineData, reformData) {
    if (!baselineData || !reformData) {
      return true;
    }

    if (
      Object.keys(baselineData).length === 0 &&
      Object.keys(reformData).length === 0
    ) {
      return true;
    }

    return false;
  }

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
      setSearchParams(newSearch, { replace: true });
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
      setSearchParams(newSearch, { replace: true });
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
    <div
      style={{
        paddingTop: 10,
        fontFamily: "Roboto Serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <div>
        <div style={{ paddingLeft: 20 }}>
          <p
            style={{
              fontSize: 14,
              margin: "10px 0 0 0",
              fontFamily: "Roboto",
              color: "grey",
              display: "inline-block",
            }}
          >
            Policy name
          </p>
        </div>
        {
          <PolicyNamer
            policy={policy}
            metadata={metadata}
            setPolicy={setPolicy}
          />
        }
        <div style={{ padding: "0px 4px" }}>
          <Collapsible
            label="Find an existing policy"
            child={
              <PolicySearch
                metadata={metadata}
                policy={policy}
                target="reform"
                width="100%"
                displayStack
              />
            }
          />
        </div>
        <div style={{ paddingLeft: 20 }}>
          <p
            style={{
              fontSize: 14,
              margin: "10px 0 0 0",
              fontFamily: "Roboto",
              color: "grey",
              display: "inline-block",
            }}
          >
            Provisions
          </p>
        </div>
        <PolicyDisplay
          policy={policy}
          metadata={metadata}
          region={region}
          timePeriod={timePeriod}
          closeDrawer={closeDrawer}
          hideButtons={hideButtons}
          isPolicyDeprecated={isPolicyDeprecated}
        />
        <div style={{ paddingLeft: 5 }}>
          <Collapsible
            label="More options"
            defaultOpen={defaultOpen}
            child={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: "10px 0 0 0",
                      color: "grey",
                      display: "inline-block",
                      fontFamily: "Roboto",
                    }}
                  >
                    Geography
                  </p>
                </div>
                <RegionSelector metadata={metadata} />
                <div>
                  <p
                    style={{
                      margin: "10px 0 0 0",
                      color: "grey",
                      display: "inline-block",
                      fontFamily: "Roboto",
                    }}
                  >
                    Year
                  </p>
                </div>
                <TimePeriodSelector metadata={metadata} />
                <div>
                  <p
                    style={{
                      margin: "10px 0 0 0",
                      color: "grey",
                      display: "inline-block",
                      fontFamily: "Roboto",
                    }}
                  >
                    Baseline policy
                  </p>
                </div>
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
                {metadata.countryId === "us" && (
                  <DatasetSelector
                    presentDataset={dataset}
                    timePeriod={timePeriod}
                  />
                )}
                <FullLiteToggle metadata={metadata} />
                <BehavioralResponseToggle metadata={metadata} policy={policy} />
                {metadata.countryId === "uk" && (
                  <LocalAreaFunctionalitySelector />
                )}
              </div>
            }
          />
        </div>
      </div>

      <div style={{ margin: 20, marginTop: 0 }}>
        {!hideButtons && focus && focus.startsWith("policyOutput") && (
          <SearchParamNavButton
            type="primary"
            text="Edit my policy"
            focus="gov"
            style={{ width: "100%", marginTop: 20 }}
          />
        )}
        {!hideButtons && focus && !focus.startsWith("policyOutput") && (
          <SearchParamNavButton
            type={
              // Disable output if both baseline and reform are current law
              isNoReform(baselineData, reformData) ? "disabled" : "primary"
            }
            text="Calculate economic impact"
            onClick={confirmEconomicImpact}
            style={{ width: "100%", marginTop: 20 }}
          />
        )}
        {!hideButtons && !hasHousehold && (
          <SearchParamNavButton
            type="secondary"
            text="Enter my household"
            focus="intro"
            target={`/${metadata.countryId}/household`}
            style={{ width: "100%", marginTop: 20 }}
          />
        )}
        {!hideButtons && hasHousehold && (
          <SearchParamNavButton
            type="secondary"
            text="Calculate my household impact"
            focus="householdOutput.netIncome"
            target={`/${metadata.countryId}/household`}
            style={{ width: "100%", marginTop: 20 }}
          />
        )}
      </div>
    </div>
  );
}

function formatDateString(startDateStr, endDateStr, countryId) {
  // Determine if policy runs forever
  const FOREVER_DATE = String(defaultForeverYear).concat("-12-31");
  const isEndForever = endDateStr === FOREVER_DATE;

  const startDateArr = startDateStr.split("-");
  const endDateArr = endDateStr.split("-");

  const isSimpleStart = startDateArr[1] === "01" && startDateArr[2] === "01";
  const isSimpleEnd = endDateArr[1] === "12" && endDateArr[2] === "31";

  // In the rare case that a policy is valid for only a single day,
  // return just that day
  if (startDateStr === endDateStr) {
    return formatFullDate(startDateStr, countryId);
  }

  // Get simple-date, single-year policies out of the way, as they
  // only have one component to the string
  if (isSimpleStart && isSimpleEnd && startDateArr[0] === endDateArr[0]) {
    return String(startDateArr[0]);
  }

  // If either date isn't simple, neither should be, unless end is FOREVER_DATE
  if (!isSimpleStart || !isSimpleEnd) {
    return formatFullDate(startDateStr, countryId).concat(
      isEndForever ? " onward" : ` to ${formatFullDate(endDateStr, countryId)}`,
    );
  }

  // Otherwise, display only year, again being mindful of FOREVER_DATE
  return startDateArr[0].concat(
    isEndForever ? " onward" : ` to ${endDateArr[0]}`,
  );
}
