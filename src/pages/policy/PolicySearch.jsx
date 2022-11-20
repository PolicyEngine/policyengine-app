import { AutoComplete } from "antd";
import { useEffect, useState } from "react";
import { apiCall, countryApiCall } from "../../api/call";


export default function PolicySearch(props) {
    const { defaultId, defaultLabel, onChange, metadata } = props;

    const [policies, setPolicies] = useState([]);

    return <AutoComplete
        options={policies.concat([{ id: defaultId, label: defaultLabel }])}
        onSelect={(value) => onChange(value)}
        onSearch={(value) => {
            const baseEndpoint = `/${metadata.countryId}/policies`;
            const params = new URLSearchParams();
            params.append("query", value);
            apiCall(`${baseEndpoint}?${params.toString()}`)
                .then((data) => {
                    setPolicies(data);
                });
        }}
        style={{ width: 200, marginLeft: 10, marginRight: 10 }}
        placeholder="Policy"
    />;

}