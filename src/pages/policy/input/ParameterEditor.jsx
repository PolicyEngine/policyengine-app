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
  const reformedParameter = getReformedParameter(parameter, policy.reform.data);

  const currentYear = new Date().getFullYear();
  const [startDate, setStartDate] = useState(currentYear + "-01-01");
  const [endDate, setEndDate] = useState(currentYear + 5 + "-12-31");

  // eslint-disable-next-line no-unused-vars
  const [_, setValue] = useState(
    getParameterAtInstant(reformedParameter, startDate),
  );

  let control;

  if (parameter.unit === "bool" || parameter.unit === "abolition") {
    control = (
      <div style={{ padding: 10 }}>
        <Switch
          checked={getParameterAtInstant(reformedParameter, startDate)}
          onChange={(value) => {
            let newPolicy = { ...policy.reform.data };
            newPolicy[parameterName] = {
              ...newPolicy[parameterName],
              [`${startDate}.${endDate}`]: !!value,
            };
            setValue(value);
            getNewPolicyId(metadata.countryId, newPolicy).then(
              (newPolicyId) => {
                let newSearch = copySearchParams(searchParams);
                newSearch.set("reform", newPolicyId);
                setSearchParams(newSearch);
              },
            );
          }}
        />
      </div>
    );
  } else if (parameter.unit === "/1") {
    let val = getParameterAtInstant(reformedParameter, startDate);
    let valInPercentage = formatVariableValue(parameter, val);
    control = (
      <InputField
        placeholder={valInPercentage}
        pattern={"%"}
        onChange={(value) => {
          let newPolicy = { ...policy.reform.data };
          value = parseFloat(value);
          newPolicy[parameterName] = {
            ...newPolicy[parameterName],
            [`${startDate}.${endDate}`]: value / 100,
          };
          setValue(value);
          getNewPolicyId(metadata.countryId, newPolicy).then((newPolicyId) => {
            let newSearch = copySearchParams(searchParams);
            newSearch.set("reform", newPolicyId);
            setSearchParams(newSearch);
          });
        }}
      />
    );
  } else {
    control = (
      <InputField
        placeholder={getParameterAtInstant(reformedParameter, startDate)}
        onChange={(value) => {
          let newPolicy = { ...policy.reform.data };
          newPolicy[parameterName] = {
            ...newPolicy[parameterName],
            [`${startDate}.${endDate}`]: value,
          };
          setValue(value);
          getNewPolicyId(metadata.countryId, newPolicy).then((newPolicyId) => {
            let newSearch = copySearchParams(searchParams);
            newSearch.set("reform", newPolicyId);
            setSearchParams(newSearch);
          });
        }}
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
