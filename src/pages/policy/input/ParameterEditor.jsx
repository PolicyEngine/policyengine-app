import CenteredMiddleColumn from "../../../layout/CenteredMiddleColumn";
import ParameterOverTime from "./ParameterOverTime";
import {
  Alert,
  Button,
  DatePicker,
  Popover,
  Segmented,
  Switch,
  Tooltip,
} from "antd";
import { getNewPolicyId } from "../../../api/parameters";
import { useEffect, useState } from "react";
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
import StableInputNumber from "controls/StableInputNumber";

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
export default function ParameterEditor(props) {
  const { metadata, policy, parameterName } = props;
  const parameter = metadata.parameters[parameterName];
  const parameterValues = Object.entries(parameter.values);
  const reformData = policy?.reform?.data?.[parameterName];
  const baseMap = new IntervalMap(parameterValues, cmpDates, (x, y) => x === y);
  const reformMap = baseMap.copy();
  if (reformData) {
    for (const [timePeriod, value] of Object.entries(reformData)) {
      const [startDate, endDate] = timePeriod.split(".");
      reformMap.set(startDate, nextDay(endDate), value);
    }
  }

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

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
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <PeriodSetter
              metadata={metadata}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
            <ValueSetter
              startDate={startDate}
              endDate={endDate}
              parameterName={parameterName}
              policy={policy}
              metadata={metadata}
              reformMap={reformMap}
              baseMap={baseMap}
            />
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
          >
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
          </div>
        </div>
      </div>
    </CenteredMiddleColumn>
  );
}

function PeriodSetter(props) {
  const { metadata, startDate, endDate, setStartDate, setEndDate } = props;

  const [visibleDateSelector, setVisibleDateSelector] = useState("yearly");

  function handleSegmentedChange(value) {
    setVisibleDateSelector(value);
  }

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

  let dateSelectButtonLabel = "";
  const isFullYearSet =
    checkBoundaryDate(startDate, "start") && checkBoundaryDate(endDate, "end");

  if (!isFullYearSet) {
    dateSelectButtonLabel = `from ${moment(startDate).format("MMMM Do, YYYY")} to ${moment(endDate).format("MMMM Do, YYYY")}:`;
  } else if (isEndForever) {
    dateSelectButtonLabel = `from ${moment(startDate).year()} onward:`;
  } else {
    dateSelectButtonLabel = `from ${moment(startDate).year()} to ${moment(endDate).year()}:`;
  }

  const yearSelector = (
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

  const dateSelector = (
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

  const popoverContent = (
    <div
      style={{
        width: "100%",
      }}
    >
      <Segmented
        block
        options={[
          {
            label: "Yearly",
            value: "yearly",
          },
          {
            label: "Advanced",
            value: "date",
          },
        ]}
        width="100%"
        onChange={handleSegmentedChange}
        style={{
          marginBottom: "10px",
        }}
      />
      {visibleDateSelector === "yearly" ? yearSelector : dateSelector}
    </div>
  );

  return (
    <Popover trigger="click" content={popoverContent} placement="bottom">
      <Tooltip title="Click to edit parameter timespan">
        <Button
          type="default"
          style={{
            width: "max-content",
          }}
        >
          {dateSelectButtonLabel}
        </Button>
      </Tooltip>
    </Popover>
  );
}

function ValueSetter(props) {
  const {
    startDate,
    endDate,
    parameterName,
    metadata,
    reformMap,
    baseMap,
    policy,
  } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const startValue = reformMap.get(startDate);
  const parameter = metadata.parameters[parameterName];

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

  if (parameter.unit === "bool" || parameter.unit === "abolition") {
    return (
      <div style={{ padding: 10 }}>
        <Switch
          key={"input for" + parameter.parameter}
          defaultChecked={startValue}
          onChange={(value) => changeHandler(!!value)}
        />
      </div>
    );
  } else {
    const isPercent = parameter.unit === "/1";
    const scale = isPercent ? 100 : 1;
    const isCurrency = Object.keys(currencyMap).includes(parameter.unit);
    const maximumFractionDigits = isCurrency ? 2 : 16;
    return (
      <StableInputNumber
        style={{
          width: "100%",
          minWidth: "100px",
        }}
        key={"input for" + parameter.parameter}
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
        onPressEnter={(_, value) =>
          changeHandler(+value.toFixed(maximumFractionDigits) / scale)
        }
      />
    );
  }
}

/**
 * Checks whether or not an input date is a boundary date -
 * the first or last day of a fixed period (e.g., Jan. 1 or
 * Dec. 31)
 * @param {String} date
 * @param {("start"|"end")} variant The date type - either a
 * period's start or its end date
 * @returns {Boolean} Whether or not the date is a boundary date
 */
function checkBoundaryDate(date, variant) {
  // Define boundary dates and types
  // Note that month is 0-indexed in moment
  const boundaries = [
    {
      type: "start",
      month: 0,
      date: 1,
    },
    {
      type: "end",
      month: 11,
      date: 31,
    },
  ];

  // Take the date and define it in terms of moment package
  const momentDate = moment(date);

  // Duplicate its year for testing purposes
  const testYear = momentDate.year();

  // For each boundary defined above
  for (const boundary of boundaries) {
    // Set up a test date using the test year and the boundary's defined
    // month and date
    const testDate = moment()
      .year(testYear)
      .month(boundary.month)
      .date(boundary.date);
    // If the date is a boundary date, return true
    if (boundary.type === variant && testDate.isSame(momentDate, "date")) {
      return true;
    }
  }
  // If we've found no boundary dates, return false
  return false;
}
