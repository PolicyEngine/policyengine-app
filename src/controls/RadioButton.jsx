"use client";
import { Radio } from "antd";

import style from "../style";
import { useState } from "react";

export default function RadioButton(props) {
  const { keys, labels, onChange, defaultValue } = props;

  const [value, setValue] = useState(defaultValue || keys[0]);
  function handleChange(e) {
    if (onChange instanceof Function) {
      onChange(e.target.value);
    }
    setValue(e.target.value);
  }
  // Create options array for Radio.Group
  const options = keys.map((key, index) => (
    <Radio.Button
      key={key}
      value={key}
      style={{
        fontSize: "16px",
        borderRadius: "0px",
        backgroundColor:
          key === value ? style.colors.BLUE : style.colors.MEDIUM_DARK_GRAY,
        color: key === value ? style.colors.WHITE : style.colors.DARK_GRAY,
        border: "solid",
        borderColor: key === value ? style.colors.BLUE : style.colors.WHITE,
      }}
      checked={key === value}
    >
      {labels[index]}
    </Radio.Button>
  ));
  return (
    <Radio.Group size="large" onChange={handleChange}>
      {options}
    </Radio.Group>
  );
}
