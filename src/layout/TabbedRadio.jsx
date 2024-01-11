import { Radio } from "antd";

export default function TabbedRadio(props) {
  const {
    options,
    style
  } = props;

  const radioButtons = options.map((option, index) => {
    return (
      <Radio.Button
        key={index}
        value={option.value}
      >{option.label}</Radio.Button>
    )
  });

  return (
    <Radio.Group
      optionType="button"
      buttonStyle="solid"
      style={{
        ...style
      }}
    >
      {radioButtons}
    </Radio.Group>
  )


}
