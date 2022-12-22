import { Select } from "antd";
import { useState } from "react";

export default function SearchOptions(props) {
  const { options, defaultValue, onSelect, onSearch, placeholder, style } =
    props;
  const [value, setValue] = useState(defaultValue);
  // eslint-disable-next-line
  const [_, setSearchText] = useState("");
  const filteredOptions = options;

  return (
    <Select
      showSearch
      options={filteredOptions}
      optionFilterProp="children"
      onSelect={(value) => {
        if (options.find((option) => option.value === value)) {
          setValue(value);
          setSearchText("");
          onSelect(value);
        }
        setSearchText("");
      }}
      onSearch={(text) => {
        setSearchText(text);
        if (onSearch) {
          onSearch(text);
        }
      }}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      style={style || { width: 200, marginLeft: 10, marginRight: 10 }}
      placeholder={
        value
          ? (options.find((option) => option.value === value) || {}).label
          : placeholder
      }
      value={value}
    />
  );
}
