import style from "./style";
import PolicyEngineLogo from "./images/logos/policyengine/white.png";
import { useNavigate } from "react-router-dom";
import Spinner from "./layout/Spinner";

export const HEADER_HEIGHT = 75;

function TopLeftLogo(props) {
  const { countryId } = props;
  const navigate = useNavigate();
  return (
    <img
      src={PolicyEngineLogo}
      alt="PolicyEngine logo"
      style={{
        cursor: "pointer",
      }}
      height="100%"
      onClick={() => navigate(`/${countryId}`)}
    />
  );
}

export default function Header(props) {
  // The top header bar, with the logo, search bar and social links
  const { countryId, loading } = props;
  return (
    <>
      <div
        style={{
          backgroundColor: style.colors.BLUE,
          height: HEADER_HEIGHT,
          paddingLeft: 10,
          position: "fixed",
          width: "100%",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
        }}
      >
        <TopLeftLogo countryId={countryId} />
        {loading && (
          <div
            style={{
              paddingLeft: 20,
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Spinner style={{ color: "white", fontSize: 30 }} />
          </div>
        )}
      </div>
      <div style={{ height: HEADER_HEIGHT }} />
    </>
  );
}
