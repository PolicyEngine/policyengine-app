import CenteredMiddleColumn from "../../../layout/CenteredMiddleColumn";
import ParameterOverTime from "./ParameterOverTime";
import { Alert, DatePicker, Switch } from "antd";
import { getNewPolicyId } from "../../../api/parameters";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { copySearchParams } from "../../../api/call";
import useMobile from "../../../layout/Responsive";
import { capitalize, localeCode } from "../../../lang/format";
import { currencyMap } from "../../../api/variables";
import { defaultStartDate, defaultEndDate } from "data/constants";
import { IntervalMap } from "algorithms/IntervalMap";
import { cmpDates, nextDay, prevDay } from "lang/stringDates";
import moment from "dayjs";
import StableInputNumber from "controls/StableInputNumber";

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
  const mobile = useMobile();
  const editControl = (
    <div
      style={{
        display: "flex",
        flexDirection: mobile ? "column" : "row",
        alignItems: "center",
        paddingTop: 10,
        paddingLeft: 0,
        gap: 10,
        fontFamily: "Roboto Serif",
      }}
    >
      <RangePicker
        defaultValue={[moment(startDate), moment(endDate)]}
        onChange={(_, dateStrings) => {
          setStartDate(dateStrings[0]);
          setEndDate(dateStrings[1]);
        }}
        disabledDate={(date) => date.isBefore("2021-01-01")}
        separator="→"
        style={{ fontFamily: "Roboto Serif" }}
      />
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
