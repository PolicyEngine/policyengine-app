import { Select } from "antd";
import { useState } from "react";
import { Empty } from "antd";

export default function SearchOptions(props) {
  const {
    options,
    defaultValue,
    onSelect,
    onSearch,
    placeholder,
    style,
    notFoundMessage,
    key,
  } = props;
  const [value, setValue] = useState(defaultValue);
  // eslint-disable-next-line
  const [_, setSearchText] = useState("");
  const filteredOptions = options;

  return (
    <Select
      key={key}
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
      notFoundContent={
        notFoundMessage && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ marginTop: 8, marginBottom: 8 }}
            imageStyle={{ height: 35 }}
            description={<span>{notFoundMessage}</span>}
          />
        )
      }
    />
  );
}
