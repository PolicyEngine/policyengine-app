import { InputNumber } from "antd";
import { useState } from "react";

// The regular antd InputNumber is highly reactive: onChange is called whenever
// the value is changed and on blur. In some situations (e.g., the
// VariableEditor), we want to react to the new value only in response to
// onPressEnter and onBlur events.
export default function StableInputNumber(props) {
  const { defaultValue, onChange, ...others } = props;
  const [value, setValue] = useState(defaultValue);
  const onPressEnter = () => onChange(value);
  return (
    <InputNumber
      defaultValue={defaultValue}
      onChange={setValue}
      onPressEnter={onPressEnter}
      onBlur={onPressEnter}
      {...others}
    />
  );
}
