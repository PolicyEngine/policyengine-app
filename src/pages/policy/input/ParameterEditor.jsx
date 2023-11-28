import CenteredMiddleColumn from "../../../layout/CenteredMiddleColumn";
import ParameterOverTime from "./ParameterOverTime";
import { Alert, DatePicker, Switch } from "antd";
import moment from "moment";
import InputField from "../../../controls/InputField";
import {
  getNewPolicyId,
  getParameterAtInstant,
  getReformedParameter,
} from "../../../api/parameters";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { copySearchParams } from "../../../api/call";
import useMobile from "../../../layout/Responsive";
import { capitalize } from "../../../api/language";
import { formatVariableValue } from "../../../api/variables";

const { RangePicker } = DatePicker;

export default function ParameterEditor(props) {
  const { metadata, policy, parameterName } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const parameter = metadata.parameters[parameterName];
  const currentYear = new Date().getFullYear();
  const [startDate, setStartDate] = useState(currentYear + "-01-01");
  const [endDate, setEndDate] = useState(currentYear + 5 + "-12-31");

  // change reform data using value and current startDate and endDate
  function newReforms(reforms, value) {
    let newReforms = { ...policy.reform.data };
    newReforms[parameterName] = {
      ...newReforms[parameterName],
      [`${startDate}.${endDate}`]: value,
    };
    const values = getReformedParameter(parameter, newReforms).values;
    let diff = {},
      ret = {};
    for (const key of Object.keys(values)) {
      diff[key] = values[key] - getParameterAtInstant(parameter, key);
    }
    const keys = Object.keys(diff).sort();
    for (let i = 0; i < keys.length - 1; i++) {
      const k1 = keys[i],
        k2 = keys[i + 1];
      if (diff[k1] !== 0) {
        ret[`${k1}.${k2}`] = values[k1];
      }
    }
    newReforms = { ...policy.reform.data };
    newReforms[parameterName] = ret;
    return newReforms;
  }

  function onChange(value) {
    getNewPolicyId(
      metadata.countryId,
      newReforms(policy.reform.data, value),
    ).then((newPolicyId) => {
      let newSearch = copySearchParams(searchParams);
      newSearch.set("reform", newPolicyId);
      setSearchParams(newSearch);
    });
  }

  let control;

  if (parameter.unit === "bool" || parameter.unit === "abolition") {
    control = (
      <div style={{ padding: 10 }}>
        <Switch
          defaultChecked={getParameterAtInstant(parameter, startDate)}
          onChange={(value) => onChange(!!value)}
        />
      </div>
    );
  } else if (parameter.unit === "/1") {
    let val = getParameterAtInstant(parameter, startDate);
    let valInPercentage = formatVariableValue(parameter, val);
    control = (
      <InputField
        placeholder={valInPercentage}
        pattern={"%"}
        onChange={(value) => onChange(parseFloat(value) / 100)}
      />
    );
  } else {
    control = (
      <InputField
        placeholder={getParameterAtInstant(parameter, startDate)}
        onChange={(value) => onChange(Number(value))}
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
      }}
    >
      <RangePicker
        defaultValue={[moment(startDate), moment(endDate)]}
        onChange={(_, dateStrings) => {
          setStartDate(dateStrings[0]);
          setEndDate(dateStrings[1]);
        }}
        separator="→"
        style={{ padding: 20, marginBottom: 10 }}
      />
      {control}
    </div>
  );

  const timePeriodSentence = parameter.period
    ? `This parameter is ${parameter.period}ly.`
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
      <ParameterOverTime parameter={parameter} policy={policy} />
    </CenteredMiddleColumn>
  );
}
