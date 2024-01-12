import { Radio, Tooltip } from "antd";

export default function TabbedRadio(props) {
  const {
    options,
    containerStyle,
    normalButtonStyle,
    activeButtonStyle,
    defaultValue,
    changeHandler,
  } = props;

  const radioButtons = options.map((option, index) => {
    if (option.disabled && option.disabledMsg) {
      return (
        <Tooltip 
          title={option.disabledMsg}
          key={index}
        >
          <Radio.Button
            value={option.value}
            disabled={option.disabled}
          >{option.label}</Radio.Button>
        </Tooltip>
      );
    }

    return (
      <Radio.Button
        key={index}
        value={option.value}
        disabled={option.disabled}
      >{option.label}</Radio.Button>
    )
  });

  return (
    <Radio.Group
      optionType="button"
      buttonStyle="solid"
      defaultValue={defaultValue}
      style={{
        ...containerStyle
      }}
      onChange={changeHandler}
    >
      {radioButtons}
    </Radio.Group>
  )


}
