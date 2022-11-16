import style from "../style";
import PolicyEngineLogo from "../images/logos/policyengine/white.png";
import { useContext } from "react";
import PolicyEngineContext from "../logic/PolicyEngineContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const PolicyEngine = useContext(PolicyEngineContext);
  const navigate = useNavigate();
  // The header contains:
  // * The logo - left-anchored
  // * The search bar - centered
  // * The country selector - right-anchored
  return (
    <>
      <div
        style={{
          backgroundColor: style.colors.BLUE,
          height: style.spacing.HEADER_SIZE,
          paddingLeft: 10,
          position: "fixed",
          width: "100%",
          zIndex: 100,
        }}
      >
        <img
          src={PolicyEngineLogo}
          alt="PolicyEngine logo"
          style={{
            cursor: "pointer",
          }}
          height="100%"
          onClick={() => navigate(PolicyEngine.getCountryUrl(""))}
        />

        <motion.div
          style={{
            width: 400,
            backgroundColor: style.colors.DARK_GRAY,
            display: "inline-block",
            marginLeft: "30%",
            padding: 15,
            cursor: "pointer",
          }}
          whileHover={{
            scale: 1.05,
            backgroundColor: style.colors.WHITE,
          }}
        >
          <span>Search...</span>
        </motion.div>
      </div>
      <div style={{ height: style.spacing.HEADER_SIZE }} />
    </>
  );
}
