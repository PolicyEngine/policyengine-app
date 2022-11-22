import { AutoComplete } from "antd";
import { useState } from "react";


export default function SearchOptions(props) {
    const { options, defaultValue, onSelect, onSearch } = props;
    const [value, setValue] = useState(defaultValue);
    const [searchText, setSearchText] = useState("");
    const filteredOptions = options.filter(option => option.label.toLowerCase().includes(searchText.toLowerCase()));

    // Shouldn't allow selection of an option that doesn't exist in the options list.

    return <AutoComplete
        options={filteredOptions}
        onSelect={(value) => {
            if(options.find(option => option.value === value)) {
                setValue(value);
                setSearchText("");
                onSelect(value);
            }
            setSearchText("");
        }}
        onSearch={text => {
            setSearchText(text);
            if (onSearch) {
                onSearch(text);
            }  
        }}
        style={{ width: 200, marginLeft: 10, marginRight: 10 }}
        placeholder={options.find(option => option.value.toString() === value.toString()).label}
        value={value === defaultValue ? null : searchText}
    />;
}