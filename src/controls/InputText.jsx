import { Button, Input, Space } from "antd";
import { buttonStyles } from "./Button";
import { useState } from "react";

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
    error,
  } = props;

  const [inputValue, setInputValue] = useState(
    initialValue ? initialValue : "",
  );

  // Assign fallback values for styling if button included
  if (!buttonStyle || !Object.keys(buttonStyles).includes(buttonStyle)) {
    buttonStyle = "default";
  }

  const isDisabled = disableOnEmpty && !inputValue;

  const inputElement = (
    <Input
      style={boxStyle}
      placeholder={placeholder}
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
          type="primary"
          disabled={isDisabled}
          style={{
            backgroundColor:
              !isDisabled && buttonStyles[buttonStyle].standardBackgroundColor,
            // This line is added instead of "none" because the disabled style also has a 1px border, causing
            // visual ticks if transitioning between the two
            border:
              !isDisabled &&
              `1px solid ${buttonStyles[buttonStyle].standardBackgroundColor}`,
          }}
          onClick={(e) => onClick?.(e, inputValue)}
          onMouseOver={(e) => {
            if (!isDisabled) {
              (e.currentTarget.style.backgroundColor =
                buttonStyles[buttonStyle].hoverBackgroundColor) &&
                (e.currentTarget.style.borderColor =
                  buttonStyles[buttonStyle].hoverBackgroundColor);
            }
          }}
          onMouseOut={(e) => {
            if (!isDisabled) {
              (e.currentTarget.style.backgroundColor =
                buttonStyles[buttonStyle].standardBackgroundColor) &&
                (e.currentTarget.style.borderColor =
                  buttonStyles[buttonStyle].standardBackgroundColor);
            }
          }}
        >
          {buttonText}
        </Button>
      </Space.Compact>
    );
  }

  return <>{inputElement}</>;
}
