import { InputNumber } from "antd";
import { useState } from "react";

/**
 *
 * The regular antd InputNumber is highly reactive: onChange is called whenever
 * the value is changed through typing, scrolling, arrow keys, blur, etc. In
 * some situations (e.g., in the VariableEditor), we want to react to the new
 * value only in response to onPressEnter and onBlur events. This component is a
 * thin wrapper over Ant Design's InputNumber component. Therefore, most
 * properties for InputNumber are valid for StableInputNumber as well. There are
 * a few differences:
 *   1. The onPressEnter and onBlur callback functions have access to the
 *      current value of the component.
 *   2. The onChange handler is disabled.
 *
 * In the following toy example, a StableInputNumber component is created with
 * initial value 10, and the current values in the field are logged to the
 * console in response to the onPressEnter and onBlur events. The first argument
 * in the handlers is the event and it is ignored in the example; the second
 * argument is the current value.
 *
 * @example
 * const component = <StableInputNumber
 *  defaultValue={10}
 *  onPressEnter={(_, value) => console.log(`you entered ${value}`)}
 *  onBlur={(_, value) => console.log(`${value} was accepted due to blur`)}/>
 *
 * @param {number} defaultValue the initial value
 * @param onPressEnter the callback function that is triggered when the Enter
 * key is pressed
 * @param onBlur the callback function that is triggered when the component
 * loses focus
 *
 * @returns a StableInputNumber component
 */
export default function StableInputNumber(props) {
  const { defaultValue, onPressEnter, onBlur, ...others } = props;
  const [value, setValue] = useState(defaultValue);
  return (
    <InputNumber
      defaultValue={defaultValue}
      onChange={setValue}
      onPressEnter={(e) => onPressEnter?.(e, value)}
      onBlur={(e) => onBlur?.(e, value)}
      {...others}
    />
  );
}
