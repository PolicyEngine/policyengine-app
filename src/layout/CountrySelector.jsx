import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useLocation, useNavigate } from "react-router-dom";


export default function CountrySelector(props) {
    const { countryId } = props;
    const countryLabel = {
        uk: "UK",
        us: "US",
    }[countryId];
    const location = useLocation();
    const navigate = useNavigate();

    const navigateToCountry = (countryId) => {
        // Preserve current path and query string, but go from e.g. /uk/... to /us/...
        const path = location.pathname.replace(/^\/[a-z]{2}/, `/${countryId}`);
        const search = location.search;
        navigate(`${path}${search}`);
    };

    const items = [
        { label: "United Kingdom", onClick: () => navigateToCountry("uk") },
        { label: "United States", onClick: () => navigateToCountry("us") },
    ];

    return <Dropdown menu={{items}}>
        <div style={{display: "flex", alignItems: "center", cursor: "pointer"}}>
            <h5 style={{color: "white", margin: 0, paddingRight: 5, fontSize: 14}}>{countryLabel}</h5>
            <DownOutlined style={{color: "white"}} />
        </div>
    </Dropdown>
}