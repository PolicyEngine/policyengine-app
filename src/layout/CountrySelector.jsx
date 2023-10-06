import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import UKFlag from "../images/logos/countries/uk.png";
import USFlag from "../images/logos/countries/us.png";
import CAFlag from "../images/logos/countries/ca.png";
import NGFlag from "../images/logos/countries/ng.webp";
import ILFlag from "../images/logos/countries/il.png";

export default function CountrySelector(props) {
  const { countryId } = props;
  const location = useLocation();
  const navigate = useNavigate();

  // Transparent background for UK flag
  const UKLogo = (
    <img
      src={UKFlag}
      alt="UK flag"
      style={{
        width: 35,
        height: 20,
        marginRight: 10,
        backgroundColor: "transparent",
      }}
    />
  );
  const USLogo = (
    <img
      src={USFlag}
      alt="US flag"
      style={{
        width: 35,
        height: 20,
        marginRight: 10,
        backgroundColor: "transparent",
      }}
    />
  );
  const CALogo = (
    <img
      src={CAFlag}
      alt="CA flag"
      style={{
        objectFit: "cover",
        width: 35,
        height: 20,
        marginRight: 10,
        backgroundColor: "transparent",
      }}
    />
  );

  const NGLogo = (
    <img
      src={NGFlag}
      alt="NG flag"
      style={{
        objectFit: "cover",
        width: 35,
        height: 20,
        marginRight: 10,
        backgroundColor: "transparent",
      }}
    />
  );

  const ILLogo = (
    <img
      src={ILFlag}
      alt="IL flag"
      style={{
        objectFit: "cover",
        width: 35,
        height: 20,
        marginRight: 10,
        backgroundColor: "transparent",
      }}
    />
  );

  const countryLabel = {
    uk: UKLogo,
    us: USLogo,
    ca: CALogo,
    ng: NGLogo,
    il: ILLogo,
  }[countryId];

  // Only show on the homepage (/uk and /us)
  if (!location.pathname.match(/^\/[a-z]{2}$/)) {
    return null;
  }

  const navigateToCountry = (countryId) => {
    // Preserve current path and query string, but go from e.g. /uk/... to /us/...
    const path = location.pathname.replace(/^\/[a-z]{2}/, `/${countryId}`);
    const search = location.search;
    navigate(`${path}${search}`);
  };

  const itemsList = [
    { label: UKLogo, onClick: () => navigateToCountry("uk") },
    { label: USLogo, onClick: () => navigateToCountry("us") },
    { label: CALogo, onClick: () => navigateToCountry("ca") },
    { label: NGLogo, onClick: () => navigateToCountry("ng") },
    { label: ILLogo, onClick: () => navigateToCountry("il") },
  ];

  const items = itemsList.filter((item) => item.label !== countryLabel);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Dropdown menu={{ items }}>
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          {countryLabel}
          <DownOutlined style={{ color: "white" }} />
        </div>
      </Dropdown>
    </div>
  );
}
