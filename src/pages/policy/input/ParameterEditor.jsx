import CenteredMiddleColumn from "../../../layout/CenteredMiddleColumn";
import ParameterOverTime from "./ParameterOverTime";
import { Alert, Button, DatePicker, Popover, Switch, Tabs } from "antd";
import { getNewPolicyId } from "../../../api/parameters";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { copySearchParams } from "../../../api/call";
import useMobile from "../../../layout/Responsive";
import { capitalize, localeCode } from "../../../lang/format";
import { currencyMap } from "../../../api/variables";
import { defaultStartDate, defaultEndDate, defaultForeverYear } from "data/constants";
import { IntervalMap } from "algorithms/IntervalMap";
import { cmpDates, nextDay, prevDay } from "lang/stringDates";
import moment from "dayjs";
import StableInputNumber from "controls/StableInputNumber";
import { CaretDownFilled } from "@ant-design/icons";
import useDisplayCategory from "redesign/components/useDisplayCategory";

const { RangePicker } = DatePicker;

export default function ParameterEditor(props) {
  const { metadata, policy, parameterName } = props;
  const parameter = metadata.parameters[parameterName];
  const reformData = policy?.reform?.data?.[parameterName];
  const parameterValues = Object.entries(parameter.values);
  const [searchParams, setSearchParams] = useSearchParams();
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const baseMap = new IntervalMap(parameterValues, cmpDates, (x, y) => x === y);
  const reformMap = baseMap.copy();
  if (reformData) {
    for (const [timePeriod, value] of Object.entries(reformData)) {
      const [startDate, endDate] = timePeriod.split(".");
      reformMap.set(startDate, nextDay(endDate), value);
    }
  }

  const displayCategory = useDisplayCategory();
  const startValue = reformMap.get(startDate);

  function onChange(value) {
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

  let control;

  if (parameter.unit === "bool" || parameter.unit === "abolition") {
    control = (
      <div style={{ padding: 10 }}>
        <Switch
          key={"input for" + parameter.parameter}
          defaultChecked={startValue}
          onChange={(value) => onChange(!!value)}
        />
      </div>
    );
  } else {
    const isPercent = parameter.unit === "/1";
    const scale = isPercent ? 100 : 1;
    const isCurrency = Object.keys(currencyMap).includes(parameter.unit);
    const maximumFractionDigits = 2;
    control = (
      <StableInputNumber
        style={{
          width: displayCategory === "mobile" ? "50%" : "100%",
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
          onChange(+value.toFixed(maximumFractionDigits) / scale)
        }
      />
    );
  }

  // Array of selectable years, sorted in ascending order
  const possibleYears = metadata.economy_options.time_period.map((period) => period.name).sort();
  const minPossibleDate = String(possibleYears[0]).concat("-01-01");
  const maxPossibleDate = String(possibleYears[possibleYears.length - 1] + 10).concat("-12-31");
  const defaultEnd = endDate === String(defaultForeverYear).concat("-12-31") ? null : moment(endDate);

  const yearSelector = (
    <RangePicker
      picker="year"
      defaultValue={[moment(startDate), defaultEnd]}
      onChange={(_, yearStrings) => {
        setStartDate(yearStrings[0].concat("-01-01"));
        setEndDate(yearStrings[1].concat("-12-31"));
      }}
      disabledDate={(date) => date.isBefore(minPossibleDate) || date.isAfter(maxPossibleDate)}
      separator="→"
    />
  );

  const dateSelector = (
    <RangePicker
      defaultValue={[moment(startDate), defaultEnd]}
      onChange={(_, dateStrings) => {
        setStartDate(dateStrings[0]);
        setEndDate(dateStrings[1]);
      }}
      disabledDate={(date) => date.isBefore(minPossibleDate) || date.isAfter(maxPossibleDate)}
      separator="→"
    />
  );

  const popoverContent = (
    <Tabs
      items={[
        {
          label: "Yearly",
          key: "yearly",
          children: yearSelector,
        },
        {
          label: "Advanced",
          key: "advanced",
          children: dateSelector,
        },
      ]}
      defaultActiveKey="yearly"
      type="card"
      size="small"
    />
  );

  let dateSelectButtonLabel = "";
  const isFullYearSet = (
    checkBoundaryDate(startDate, "start") &&
    checkBoundaryDate(endDate, "end")
  );

  if (!isFullYearSet) {
    dateSelectButtonLabel = `from ${moment(startDate).format("MMMM Do, YYYY")} to ${moment(endDate).format("MMMM Do, YYYY")}`;
  } else if (moment(endDate).year() === Number(defaultForeverYear)) {
    dateSelectButtonLabel = `from ${moment(startDate).year()} onward`;
  } else {
    dateSelectButtonLabel = `from ${moment(startDate).year()} to ${moment(endDate).year()}`;
  }

  const mobile = useMobile();
  let gridTemplate = null;
  if (displayCategory === "mobile" || displayCategory === "tablet") {
    gridTemplate = "repeat(2, 1fr) / 1fr";
  } else {
    gridTemplate = "1fr / repeat(2, 1fr)";
  }

  const editControl = (
    <div
      style={{
        display: "grid",
        justifyItems: "center",
        gridTemplate: gridTemplate,
        alignItems: "center",
        padding: displayCategory !== "mobile" && "20px 80px 0 80px",
        paddingTop: 20,
        gap: 10,
        width: "100%",
        fontFamily: "Roboto Serif",
      }}
    >
      <Popover
        trigger="click"
        content={popoverContent}
        placement={displayCategory === "mobile" ? "bottom" : "bottomRight"}
      >
        <Button 
          type="text"
          style={{
            width: "100%"
          }}
        >
          {dateSelectButtonLabel}
          <CaretDownFilled
            style={{
              display: "inline-flex",
              alignItems: "center",
            }}
          />
        </Button>
      </Popover>
      {control}
    </div>
  );

  let description = parameter.description;
  if (!description) {
    description = "";
  }

  return (
    <CenteredMiddleColumn
      marginTop="5%"
      marginBottom={0}
      title={capitalize(parameter.label)}
      description={description}
    >
      <div>
        <p
          style={{
            marginBottom: 2,
            fontFamily: "Roboto",
            marginTop: 10,
            color: "grey",
            display: "inline-block",
          }}
        >
          Current value
        </p>
      </div>
      {editControl}
      {!parameter.economy && (
        <div style={{ paddingTop: 20 }}>
          <Alert
            message="PolicyEngine does not currently model this parameter in society-wide economic simulations."
            type="warning"
          />
        </div>
      )}
      <div style={{ paddingRight: 30, marginTop: 30 }}>
        <p
          style={{
            marginBottom: 0,
            color: "grey",
            display: "inline-block",
            fontFamily: "Roboto",
          }}
        >
          Historical values
        </p>
      </div>
      <div style={{ marginLeft: -25 }}>
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
    </CenteredMiddleColumn>
  );
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
