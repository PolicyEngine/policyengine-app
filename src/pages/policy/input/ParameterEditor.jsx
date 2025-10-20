import CenteredMiddleColumn from "../../../layout/CenteredMiddleColumn";
import ParameterOverTime from "./ParameterOverTime";
import ResizeObserver from "resize-observer-polyfill";
import {
  Alert,
  Button,
  ConfigProvider,
  DatePicker,
  InputNumber,
  Popover,
  Radio,
  Select,
  Space,
  Switch,
  Tooltip,
} from "antd";
import { getNewPolicyId } from "../../../api/parameters";
import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { useSearchParams } from "react-router-dom";
import { copySearchParams } from "../../../api/call";
import { capitalize, localeCode } from "../../../lang/format";
import { currencyMap } from "../../../api/variables";
import {
  defaultStartDate,
  defaultEndDate,
  defaultForeverYear,
} from "data/constants";
import { IntervalMap } from "algorithms/IntervalMap";
import { cmpDates, nextDay, prevDay } from "lang/stringDates";
import moment from "dayjs";
import { EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import style from "../../../style";
import ResetButton from "./ResetButton"; // Import the ResetButton component
import { defaultYear } from "../../../data/constants";
const { RangePicker } = DatePicker;

/**
 * Component used to edit the values for a parameter; this is itself
 * composed of two sub-components: PeriodSetter and ValueSetter
 * @param {Object} props
 * @param {Object} props.metadata
 * @param {Object} props.policy
 * @param {String} props.parameterName
 * @returns {import("react-markdown/lib/react-markdown").ReactElement}
 */

const DATE_INPUT_MODES = {
  DEFAULT: "default",
  YEARLY: "yearly",
  DATE: "date",
  MULTI_YEAR: "multi-year",
};

export default function ParameterEditor(props) {
  const { metadata, policy, parameterName } = props;
  const parameter = metadata.parameters[parameterName];
  const parameterValues = Object.entries(parameter.values);
  const [searchParams, setSearchParams] = useSearchParams();
  const reformData = policy?.reform?.data?.[parameterName];

  const [resetSignal, setResetSignal] = useState(0);
  const [currentParameterName, setCurrentParameterName] =
    useState(parameterName);

  const chartContainerRef = useRef(null);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [paramChartWidth, setParamChartWidth] = useState(0);
  const [dateInputMode, setDateInputMode] = useState(DATE_INPUT_MODES.DEFAULT);

  const baseMap = useMemo(() => {
    return new IntervalMap(parameterValues, cmpDates, (x, y) => x === y);
  }, [parameterValues]);

  const [reformMap, setReformMap] = useState(() => {
    const initialMap = baseMap.copy();
    if (reformData) {
      for (const [timePeriod, value] of Object.entries(reformData)) {
        const [startDate, endDate] = timePeriod.split(".");
        initialMap.set(startDate, nextDay(endDate), value);
      }
    }
    return initialMap;
  });

  const resetParameterState = useCallback(
    (includeReformData = true) => {
      // Reset reformMap to match base values
      const newReformMap = baseMap.copy();

      // Only include reform data if requested
      if (includeReformData && reformData) {
        for (const [timePeriod, value] of Object.entries(reformData)) {
          const [startDate, endDate] = timePeriod.split(".");
          newReformMap.set(startDate, nextDay(endDate), value);
        }
      }

      setReformMap(newReformMap);

      // Reset dates
      setStartDate(defaultStartDate);
      setEndDate(defaultEndDate);

      // Force child components to reset
      setResetSignal((prev) => prev + 1);
    },
    [
      baseMap,
      reformData,
      setReformMap,
      setStartDate,
      setEndDate,
      setResetSignal,
    ],
  );

  // Add this effect to detect parameter changes
  useEffect(() => {
    if (parameterName !== currentParameterName) {
      // Reset state when parameter changes
      setCurrentParameterName(parameterName);

      // Use the helper function to reset state
      resetParameterState(true);
    }
  }, [
    parameterName,
    currentParameterName,
    reformData,
    baseMap,
    resetParameterState,
  ]);

  const resetParameter = () => {
    // 1. Remove this parameter's reform data
    const newReforms = { ...policy.reform.data };
    delete newReforms[parameterName];

    // 2. Reset state using the helper function without including reform data
    resetParameterState(false);

    // 3. Call API to update policy reform state
    return getNewPolicyId(metadata.countryId, newReforms).then((result) => {
      if (result.status === "ok") {
        const newSearch = copySearchParams(searchParams);
        if (Object.keys(newReforms).length === 0) {
          newSearch.delete("reform");
        } else {
          newSearch.set("reform", result.policy_id);
        }
        setSearchParams(newSearch);
      }
    });
  };

  useEffect(() => {
    if (chartContainerRef.current) {
      // This piece of code may be unstable if items above Display are edited;
      // if the bottom carousel on the policy output page breaks,
      // the component above this one may be the cause (note the parentElement call)
      const observer = new ResizeObserver((entries) => {
        setParamChartWidth(entries[0].contentRect.width);
      });

      observer.observe(chartContainerRef.current);

      return () => {
        observer.disconnect();
      };
    }
  });

  useEffect(() => {
    if (reformData && Object.keys(reformData).length > 0) {
      // Assign the dates of the first item from the reform data
      // as the default start and end dates and value; this should
      // be written against a stronger structure in the future, as
      // JS Objects have no guaranteed order
      const reformDates = Object.keys(reformData)[0];
      const [reformStartDate, reformEndDate] = reformDates.split(".");

      setStartDate(reformStartDate);
      setEndDate(reformEndDate);
    }
  }, [reformData]);

  const timePeriodSentence = parameter.period
    ? ` This parameter is ${parameter.period}ly.`
    : "";

  let description = parameter.description;
  if (!description) {
    description = "";
  }

  return (
    <CenteredMiddleColumn
      marginTop="5%"
      marginBottom={0}
      title={capitalize(parameter.label)}
      description={description + timePeriodSentence}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          // The below margin is because, for params with descriptions,
          // the description already contains bottom padding
          marginTop: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <p
            style={{
              paddingRight: 30,
              color: "gray",
              display: "inline-block",
              fontFamily: "Roboto",
              margin: 0,
            }}
          >
            Current value
          </p>
          <div
            style={{
              width:
                parameter.unit === "bool" || parameter.unit === "abolition"
                  ? "50%"
                  : "100%",
              display: "grid",
              gridTemplateColumns: "auto auto auto 1fr",
              gap: "10px",
              padding: "0px 50px 0px 12px",
            }}
          >
            <PeriodSetter
              metadata={metadata}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              inputMode={dateInputMode}
              parameterName={parameterName}
              baseMap={baseMap}
              reformMap={reformMap}
              policy={policy}
              resetSignal={resetSignal}
            />
            {dateInputMode !== DATE_INPUT_MODES.MULTI_YEAR && (
              <ValueSetter
                key={parameterName}
                startDate={startDate}
                endDate={endDate}
                parameterName={parameterName}
                policy={policy}
                metadata={metadata}
                reformMap={reformMap}
                baseMap={baseMap}
              />
            )}
            <div
              style={{
                display: "flex",
                flexDirection:
                  dateInputMode === DATE_INPUT_MODES.MULTI_YEAR
                    ? "column"
                    : "row",
                gap: "10px",
              }}
            >
              <SettingsPanel
                setDateInputMode={setDateInputMode}
                title="Input mode settings"
              />
              {dateInputMode === DATE_INPUT_MODES.MULTI_YEAR && (
                <ResetButton
                  onReset={resetParameter}
                  tooltipText="Reset parameter to default"
                  showText={true}
                  buttonStyle={{ borderRadius: "2px" }}
                />
              )}
            </div>
            {dateInputMode !== DATE_INPUT_MODES.MULTI_YEAR && (
              <ResetButton
                onReset={resetParameter}
                tooltipText="Reset parameter to default"
                showText={true}
                buttonStyle={{ borderRadius: "2px" }}
              />
            )}
          </div>
        </div>
        {!parameter.economy && (
          <Alert
            message="PolicyEngine does not currently model this parameter in society-wide economic simulations."
            type="warning"
          />
        )}
        <div>
          <p
            style={{
              margin: 0,
              color: "gray",
              display: "inline-block",
              fontFamily: "Roboto",
              position: "relative",
              zIndex: 5,
            }}
          >
            Historical values
          </p>
          <div
            style={{
              marginLeft: "-25px",
              marginTop: "-20px",
              position: "relative",
              zIndex: 1,
            }}
            ref={chartContainerRef}
          >
            <ParamChartWidthContext.Provider value={paramChartWidth}>
              <ParameterOverTime
                baseMap={baseMap}
                {...(reformData &&
                  Object.keys(reformData).length > 0 && {
                    reformMap: reformMap,
                  })}
                parameter={parameter}
                policy={policy}
                metadata={metadata}
              />
            </ParamChartWidthContext.Provider>
          </div>
        </div>
      </div>
    </CenteredMiddleColumn>
  );
}

function PeriodSetter(props) {
  const {
    inputMode,
    metadata,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    parameterName,
    baseMap,
    reformMap,
    policy,
    resetSignal,
  } = props;

  const FOREVER_DATE = String(defaultForeverYear).concat("-12-31");

  // Array of selectable years, sorted in ascending order
  const possibleYears = metadata.economy_options.time_period
    .map((period) => period.name)
    .sort();
  const minPossibleDate = String(possibleYears[0]).concat("-01-01");
  const maxPossibleDate = String(
    possibleYears[possibleYears.length - 1] + 10,
  ).concat("-12-31");
  const isEndForever = endDate === FOREVER_DATE;

  const sharedProps = {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    minPossibleDate,
    maxPossibleDate,
    isEndForever,
    possibleYears,
    FOREVER_DATE,
    parameterName,
  };

  const tenYearProps = {
    metadata,
    baseMap,
    reformMap,
    policy,
  };

  switch (inputMode) {
    case DATE_INPUT_MODES.YEARLY:
      return <YearPeriodSetter {...sharedProps} />;
    case DATE_INPUT_MODES.DATE:
      return <DatePeriodSetter {...sharedProps} />;
    case DATE_INPUT_MODES.MULTI_YEAR:
      return (
        <MultiYearPeriodSetter
          {...sharedProps}
          {...tenYearProps}
          resetSignal={resetSignal}
        />
      );
    default:
      return <DefaultPeriodSetter {...sharedProps} />;
  }
}

function DefaultPeriodSetter(props) {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    possibleYears,
    FOREVER_DATE,
    parameterName,
  } = props;

  const startYear = new Date(startDate).getUTCFullYear();

  const [value, setValue] = useState(startYear);

  // When this component mounts, or param name changes, or ParameterEditor
  // updates endDate (this happens in select few cases), set the start date to Jan. 1 of
  // the startDate value's year and set end to FOREVER_DATE
  useEffect(() => {
    setStartDate(String(value).concat("-01-01"));
    setEndDate(FOREVER_DATE);
  }, [endDate, parameterName, FOREVER_DATE, value, setStartDate, setEndDate]);

  // On change, set the start date to Jan. 1 of the selected year
  // and update value
  function handleStartYearChange(value) {
    setValue(value);
    setStartDate(String(value).concat("-01-01"));
  }

  // Manipulate possibleYears Array-type into options
  // Array of Object-types for the Select component
  const options = possibleYears.map((year) => {
    return {
      label: year,
      value: year,
    };
  });

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        // The below keeps the font in line with
        // the selector components
        fontSize: "14px",
        gap: "10px",
      }}
    >
      <p style={{ marginBottom: 0 }}>from</p>
      <Select
        options={options}
        defaultValue={startYear}
        value={value}
        onChange={handleStartYearChange}
      />
      <p style={{ marginBottom: 0 }}>onward:</p>
    </div>
  );
}

function YearPeriodSetter(props) {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    minPossibleDate,
    maxPossibleDate,
    isEndForever,
  } = props;

  return (
    <RangePicker
      picker="year"
      defaultValue={[moment(startDate), null]}
      value={[moment(startDate), isEndForever ? null : moment(endDate)]}
      onChange={(_, yearStrings) => {
        setStartDate(yearStrings[0].concat("-01-01"));
        setEndDate(yearStrings[1].concat("-12-31"));
      }}
      disabledDate={(date) =>
        date.isBefore(minPossibleDate) || date.isAfter(maxPossibleDate)
      }
      separator="→"
    />
  );
}

function DatePeriodSetter(props) {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    minPossibleDate,
    maxPossibleDate,
    isEndForever,
  } = props;

  return (
    <RangePicker
      defaultValue={[moment(startDate), null]}
      value={[moment(startDate), isEndForever ? null : moment(endDate)]}
      onChange={(_, dateStrings) => {
        setStartDate(dateStrings[0]);
        setEndDate(dateStrings[1]);
      }}
      disabledDate={(date) =>
        date.isBefore(minPossibleDate) || date.isAfter(maxPossibleDate)
      }
      separator="→"
    />
  );
}

function MultiYearPeriodSetter(props) {
  const {
    possibleYears,
    parameterName,
    baseMap,
    reformMap,
    metadata,
    policy,
    resetSignal,
  } = props;

  // Populate map before rendering anything
  // function populateValueMap() {
  const NUMBER_OF_YEARS = 10;
  const [searchParams, setSearchParams] = useSearchParams();

  // Create the populateValueMap function
  const populateValueMap = useCallback(() => {
    const valueMap = new Map();
    possibleYears.forEach((year) => {
      if (year >= defaultYear && year < defaultYear + NUMBER_OF_YEARS) {
        const startDate = String(year).concat("-01-01");
        // Get value from reformMap first, fall back to baseMap if not found
        let value = reformMap.get(startDate);
        if (value === undefined) {
          value = baseMap.get(startDate);
        }
        valueMap.set(year, value);
      }
    });
    return valueMap;
  }, [possibleYears, reformMap, baseMap]);

  // Initialize valueMap state with values from populateValueMap
  const [valueMap, setValueMap] = useState(() => populateValueMap());

  // Use a ref to track the current parameter name
  const paramRef = useRef(parameterName);

  // Reset valueMap whenever parameter changes or resetSignal changes
  useEffect(() => {
    // Always repopulate the valueMap on resetSignal change
    setValueMap(populateValueMap());

    // Update the parameter ref
    if (paramRef.current !== parameterName) {
      paramRef.current = parameterName;
    }
  }, [resetSignal, parameterName, populateValueMap]);

  // Handler that iterates over each entry, validates that
  // all values are valid, then updates each value one by one
  function handleSubmit() {
    let allData = {};
    for (const [year, value] of valueMap) {
      const startDate = String(year).concat("-01-01");
      const endDate = String(year).concat("-12-31");
      reformMap.set(startDate, nextDay(endDate), value);
      let data = {};
      reformMap.minus(baseMap).forEach(([k1, k2, v]) => {
        data[`${k1}.${prevDay(k2)}`] = v;
      });
      allData = { ...allData, ...data };
    }

    const newReforms = { ...policy.reform.data };
    if (
      Object.keys(allData).length === 0 &&
      Object.keys(newReforms).length === 1
    ) {
      let newSearch = copySearchParams(searchParams);
      newSearch.delete("reform");
      setSearchParams(newSearch);
    } else {
      newReforms[parameterName] = allData;
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

  // Iterate over possibleYears, beginning with
  // defaultYear, and return up to 10 input
  // components
  const yearInputs = possibleYears
    .filter(
      (year) => year >= defaultYear && year < defaultYear + NUMBER_OF_YEARS,
    )
    .map((year) => {
      return (
        <div
          key={String(year).concat("-input")}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "10px",
            fontSize: "14px",
          }}
        >
          <p style={{ marginBottom: 0 }}>{year}:</p>
          <OneYearValueSetter
            year={year}
            parameterName={parameterName}
            metadata={metadata}
            reformMap={reformMap}
            valueMap={valueMap}
            setValueMap={setValueMap}
          />
        </div>
      );
    });

  // This will give us the first half of the year inputs (if length of yearInputs is even)
  // or the first half, plus 1, if length of yearInputs is odd
  const yearInputsLeft = yearInputs.slice(0, Math.ceil(yearInputs.length / 2));
  const yearInputsRight = yearInputs.slice(Math.ceil(yearInputs.length / 2));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {yearInputsLeft}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {yearInputsRight}
        </div>
      </div>
      <Button
        type="primary"
        style={{
          width: "max-content",
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
}

function OneYearValueSetter(props) {
  const { year, parameterName, metadata, valueMap, setValueMap } = props;

  const startValue = valueMap.get(year);
  const parameter = metadata.parameters[parameterName];

  const isPercent = parameter.unit === "/1";
  const scale = isPercent ? 100 : 1;
  const isCurrency = Object.keys(currencyMap).includes(parameter.unit);
  const maximumFractionDigits = isCurrency ? 2 : 16;

  function handleSubmit(value) {
    setValueMap((prev) => {
      const scaledValue = +value.toFixed(maximumFractionDigits) / scale;
      const newMap = new Map(prev);
      newMap.set(year, scaledValue);
      return newMap;
    });
  }

  if (parameter.unit === "bool" || parameter.unit === "abolition") {
    return (
      <div style={{ padding: 10 }}>
        <Switch
          key={"input for" + parameter.parameter + year}
          defaultChecked={startValue}
          onChange={(value) => handleSubmit(!!value)}
        />
      </div>
    );
  } else {
    return (
      <Space.Compact block>
        <InputNumber
          style={{
            width: "100%",
          }}
          key={"input for" + parameter.parameter + year}
          {...(isCurrency
            ? {
                addonBefore: currencyMap[parameter.unit],
              }
            : {})}
          {...(isPercent
            ? {
                addonAfter: "%",
              }
            : {})}
          formatter={(value, { userTyping }) => {
            const n = +value;
            const isInteger = Number.isInteger(n);
            return n.toLocaleString(localeCode(metadata.countryId), {
              minimumFractionDigits: userTyping || isInteger ? 0 : 2,
              maximumFractionDigits: userTyping ? 16 : maximumFractionDigits,
            });
          }}
          defaultValue={Number(startValue) * scale}
          value={valueMap.get(year) * scale}
          onChange={(value) => handleSubmit(Number(value))}
        />
        {!isPercent && (
          <AdvancedValueSetter
            handleSubmit={handleSubmit}
            setValue={(value) => setValueMap((prev) => prev.set(year, value))}
          />
        )}
      </Space.Compact>
    );
  }
}

export function ValueSetter(props) {
  const {
    startDate,
    endDate,
    parameterName,
    metadata,
    reformMap,
    baseMap,
    policy,
  } = props;

  const startValue = reformMap.get(startDate);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(startValue);
  const parameter = metadata.parameters[parameterName];

  function handleSubmit(value) {
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

  // Booleans must handle change and submit simultaneously onChange,
  // as toggling a switch is also a submission
  function handleSwitchChange(value) {
    setValue(value);
    handleSubmit(value);
  }

  const isPercent = parameter.unit === "/1";
  const scale = isPercent ? 100 : 1;
  const isCurrency = Object.keys(currencyMap).includes(parameter.unit);
  const maximumFractionDigits = isCurrency ? 2 : 16;

  // This is necessary because technically, ValueSetter does not
  // unmount when we change between parameters, leading to the possibility
  // for a stale "value" state in this controlled component
  useEffect(() => {
    if (parameter.unit === "bool" || parameter.unit === "abolition") {
      setValue(startValue);
      return;
    }
    setValue(Number(startValue) * scale);
  }, [parameterName, startValue, scale, parameter.unit]);

  if (parameter.unit === "bool" || parameter.unit === "abolition") {
    return (
      <div style={{ padding: 3 }}>
        <ConfigProvider theme={{ token: { motion: false } }}>
          <Switch
            key={"input for" + parameterName}
            defaultChecked={startValue}
            checked={value}
            onChange={(checked) => handleSwitchChange(checked)}
            style={{
              transition: "none !important",
            }}
          />
        </ConfigProvider>
      </div>
    );
  } else {
    return (
      <Space.Compact block>
        <InputNumber
          style={{
            width: "100%",
          }}
          key={"input for" + parameterName}
          {...(isCurrency
            ? {
                addonBefore: currencyMap[parameter.unit],
              }
            : {})}
          {...(isPercent
            ? {
                addonAfter: "%",
              }
            : {})}
          formatter={(value, { userTyping }) => {
            const n = +value;
            const isInteger = Number.isInteger(n);
            return n.toLocaleString(localeCode(metadata.countryId), {
              minimumFractionDigits: userTyping || isInteger ? 0 : 2,
              maximumFractionDigits: userTyping ? 16 : maximumFractionDigits,
            });
          }}
          defaultValue={Number(startValue) * scale}
          value={value}
          onChange={(value) => setValue(value)}
          onPressEnter={() => {
            handleSubmit(+value.toFixed(maximumFractionDigits) / scale);
          }}
        />
        {!isPercent && (
          <AdvancedValueSetter
            handleSubmit={handleSubmit}
            setValue={setValue}
          />
        )}
      </Space.Compact>
    );
  }
}

function AdvancedValueSetter(props) {
  const { handleSubmit, setValue } = props;

  function handleValueInput(value) {
    setValue(value);
    handleSubmit(value);
  }

  const popoverContent = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "0.8rem",
          marginBottom: 0,
          paddingBottom: 0,
          color: style.colors.DARK_GRAY,
        }}
      >
        Custom values
      </p>
      <Button
        style={{
          fontSize: "14px",
          aspectRatio: 1,
          fontFamily: style.fonts.BODY_FONT,
          marginBottom: "5px",
          textAlign: "left",
          width: "100%",
        }}
        onClick={() => handleValueInput(Infinity)}
      >
        <span
          style={{
            fontSize: "1.2rem",
          }}
        >
          &infin;&nbsp;
        </span>
        Infinity
      </Button>
      <Button
        style={{
          fontSize: "14px",
          aspectRatio: 1,
          fontFamily: style.fonts.BODY_FONT,
          textAlign: "left",
          width: "100%",
        }}
        onClick={() => handleValueInput(-Infinity)}
      >
        <span
          style={{
            fontSize: "1.2rem",
          }}
        >
          -&infin;&nbsp;
        </span>
        -Infinity
      </Button>
    </div>
  );

  return (
    <>
      <Tooltip title="More input options">
        <Popover
          content={popoverContent}
          placement="bottomRight"
          trigger="click"
          overlayStyle={{
            minWidth: "150px",
          }}
        >
          <Button
            style={{
              aspectRatio: 1,
            }}
          >
            <EllipsisOutlined />
          </Button>
        </Popover>
      </Tooltip>
    </>
  );
}

function SettingsPanel(props) {
  const { setDateInputMode, title } = props;

  const handleModeChange = (e) => {
    setDateInputMode(e.target.value);
  };

  const modeOptions = [
    {
      label: "Default",
      value: DATE_INPUT_MODES.DEFAULT,
    },
    {
      label: "Yearly",
      value: DATE_INPUT_MODES.YEARLY,
    },
    {
      label: "Date",
      value: DATE_INPUT_MODES.DATE,
    },
    {
      label: "Multi-year",
      value: DATE_INPUT_MODES.MULTI_YEAR,
    },
  ];

  const popoverContent = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "0.8rem",
          marginBottom: 0,
          paddingBottom: 0,
          color: style.colors.DARK_GRAY,
        }}
      >
        Input mode
      </p>
      <Radio.Group
        optionType="button"
        options={modeOptions}
        defaultValue={modeOptions[0].value}
        buttonStyle="solid"
        onChange={handleModeChange}
      />
    </div>
  );

  return (
    <Popover content={popoverContent} placement="bottomRight" trigger="click">
      <Tooltip title={title}>
        <Button
          style={{
            aspectRatio: 1,
            width: 32,
            height: 32,
          }}
        >
          <SettingOutlined />
        </Button>
      </Tooltip>
    </Popover>
  );
}

export const ParamChartWidthContext = createContext((obj) => obj);
