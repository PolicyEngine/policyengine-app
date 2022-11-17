import style from "./style";
import PolicyEngineLogo from "./images/logos/policyengine/white.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

function TopSearchBar() {
  // Placed in the center of the header
  return (
    <motion.input
      style={{
        backgroundColor: style.colors.DARK_GRAY,
        position: "absolute",
        left: "35%",
        width: "30%",
        border: "none",
        height: HEADER_HEIGHT - 20,
        padding: 10,
        paddingLeft: 30,
        top: 10,
      }}
      whileHover={{
        scale: 1.05,
        backgroundColor: style.colors.WHITE,
      }}
      whileTap={{
        scale: 0.95,
        backgroundColor: style.colors.WHITE,
      }}
      placeholder="Search"
    ></motion.input>
  );
}

export default function Header(props) {
  // The top header bar, with the logo, search bar and social links
  const { countryId } = props;
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
        }}
      >
        <TopLeftLogo countryId={countryId} />
        <TopSearchBar />
      </div>
      <div style={{ height: HEADER_HEIGHT }} />
    </>
  );
}
