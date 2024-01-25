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
import moment from "moment";
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
  const baseMap = new IntervalMap(parameterValues, cmpDates);
  const reformMap = baseMap.copy();
  if (reformData) {
    for (const [timePeriod, value] of Object.entries(reformData)) {
      const [startDate, endDate] = timePeriod.split(".");
      reformMap.set(startDate, nextDay(endDate), value);
    }
  }

  const startValue = reformMap.get(startDate);

  // This function returns the difference between reformMap and baseMap. If
  // there is no difference, then it returns an empty object.
  const diff = () => {
    const keys = reformMap.keys();
    let data = {};
    for (let i = 0; i < keys.length - 1; i++) {
      const k1 = keys[i],
        k2 = keys[i + 1];
      if (reformMap.get(k1) !== baseMap.get(k1)) {
        data[`${k1}.${prevDay(k2)}`] = reformMap.get(k1);
      }
    }
    return data;
  };

  function onChange(value) {
    reformMap.set(startDate, nextDay(endDate), value);
    const diffData = diff();
    if (Object.keys(diffData).length === 0) {
      let newSearch = copySearchParams(searchParams);
      newSearch.delete("reform");
      setSearchParams(newSearch);
    } else {
      const newReforms = { ...policy.reform.data };
      newReforms[parameterName] = diffData;
      getNewPolicyId(metadata.countryId, newReforms).then((newPolicyId) => {
        let newSearch = copySearchParams(searchParams);
        newSearch.set("reform", newPolicyId);
        setSearchParams(newSearch);
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
            maximumFractionDigits: userTyping ? 16 : 2,
          });
        }}
        defaultValue={Number(startValue) * scale}
        onPressEnter={(_, value) => onChange(parseFloat(value) / scale)}
      />
    );
  }
  const mobile = useMobile();
  const editControl = (
    <div
      style={{
        display: "flex",
        flexDirection: mobile ? "column" : "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
        gap: 10,
      }}
    >
      <RangePicker
        value={[moment(startDate), moment(endDate)]}
        onChange={(_, dateStrings) => {
          setStartDate(dateStrings[0]);
          setEndDate(dateStrings[1]);
        }}
        disabledDate={(date) =>
          date.isBefore("2021-01-01") || date.isAfter("2026-12-31")
        }
        separator="→"
      />
      {control}
    </div>
  );

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
      {editControl}
      {!parameter.economy && (
        <Alert
          message="PolicyEngine does not currently model this parameter in society-wide economic simulations."
          type="warning"
        />
      )}
      <ParameterOverTime
        baseMap={baseMap}
        {...(Object.keys(diff()).length > 0 && {
          reformMap: reformMap,
        })}
        parameter={parameter}
        policy={policy}
        metadata={metadata}
      />
    </CenteredMiddleColumn>
  );
}
