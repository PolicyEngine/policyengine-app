import { Input, Space } from "antd";
import { buttonStyles } from "./Button";
import { useState } from "react";
import Button from "./Button";

export default function InputText(props) {
  let {
    onChange,
    onPressEnter,
    onClick,
    width,
    initialValue,
    placeholder,
    componentStyle,
    boxStyle,
    buttonText,
    buttonStyle,
    disableOnEmpty,
    disabled,
    error,
  } = props;

  const [inputValue, setInputValue] = useState(
    initialValue ? initialValue : "",
  );

  const isDisabled = disabled || (disableOnEmpty && !inputValue);

  // Assign fallback values for styling if button included
  if (!buttonStyle || !Object.keys(buttonStyles).includes(buttonStyle)) {
    if (isDisabled) {
      buttonStyle = "disabled";
    } else {
      buttonStyle = "primary";
    }
  }

  const inputElement = (
    <Input
      style={boxStyle}
      placeholder={placeholder}
      disabled={isDisabled}
      onChange={(e) => {
        setInputValue(e.target.value);
        onChange?.(e);
      }}
      status={error && "error"}
      onPressEnter={(e) => onPressEnter?.(e, inputValue)}
    />
  );

  if (buttonText) {
    return (
      <Space.Compact
        style={{
          ...componentStyle,
          width: width || "100%",
        }}
      >
        {inputElement}
        <Button
          type={buttonStyle}
          disabled={isDisabled}
          onClick={(e) => onClick?.(e, inputValue)}
          text={buttonText}
          height={15}
          width={100}
        ></Button>
      </Space.Compact>
    );
  }

  return <>{inputElement}</>;
}
