import useDisplayCategory from "./useDisplayCategory";
import useCountryId from "./useCountryId";
import style from "../style";
import PolicyEngineMainLogo from "../images/logos/policyengine/white.svg";
import PolicyEngineSmallLogo from "../images/logos/policyengine/profile/white.svg";
import CalculatorIcon from "../images/icons/calculator.png";
import { HoverBox } from "./HoverBox";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import LinkButton from "../../controls/LinkButton";
import Button from "../../controls/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";


const BAR_TOP_PADDING = 10; // Desired top padding, px
const BAR_BOTTOM_PADDING = 10; // Desired bottom padding, px
const BAR_SIDE_PADDING = 16;
const LINKS = [
    "Research",
    "About",
    "Donate"
];

export default function Header() {

  const displayCategory = useDisplayCategory();
  return (
    <>
      <div
        style={{
          backgroundColor: style.colors.BLUE_PRIMARY,
          width: "100%",
          height: style.spacing.HEADER_HEIGHT,
          display: "flex",
          alignItems: "center",
          position: "fixed",
          zIndex: 1000,
          justifyContent: "space-between",
          borderBottom: `1px solid ${style.colors.BLACK}`,
          padding: `0 ${BAR_SIDE_PADDING}px`
        }}
      >
        {
          {
            mobile: <MobileHeaderBar />,
            tablet: <TabletHeaderBar />,
            desktop: <DesktopHeaderBar />,
          }[displayCategory]
        }
      </div>
      <div
        style={{
          height: style.spacing.HEADER_HEIGHT,
        }}
      />
    </>
  );
}

function MobileHeaderBar() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "30px"
        }}
      >
        <MobileHeaderLogo />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "16px"
        }}
      >
        <MobileCalculatorButton />
        <MobileLoginButton />
        <Hamburger />
      </div>
    </>
  );
}

function TabletHeaderBar() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "30px"
        }}
      >
        <MainHeaderLogo />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "16px"
        }}
      >
        <DesktopCalculatorButton />
        <DesktopLoginButton />
        <Hamburger />
      </div>
    </>
  );
}

function DesktopHeaderBar() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "30px"
        }}
      >
        <MainHeaderLogo />
        <PageLinks />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "16px"
        }}
      >
        <DesktopCalculatorButton />
        <DesktopLoginButton />
      </div>
    </>
  );
}

function MobileHeaderLogo() {
  const countryId = useCountryId();
  return (
    <Link to={`/${countryId}`}>
      <img
        src={PolicyEngineSmallLogo}
        alt="PolicyEngine logo"
        style={{
          height: style.spacing.HEADER_HEIGHT,
          padding: `${BAR_TOP_PADDING}px 0 ${BAR_BOTTOM_PADDING}px 0`
        }}
      />
    </Link>
  );
}

function MobileCalculatorButton() {
  const countryId = useCountryId();

  const desiredHeight = style.spacing.HEADER_HEIGHT - BAR_TOP_PADDING - BAR_BOTTOM_PADDING
  return (
    <div
      style={{
        backgroundColor: "#39C6C0",
        height: desiredHeight,
        width: desiredHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <Link to={`/${countryId}/calculator`}>
        <img
          src={CalculatorIcon}
          alt="Calculator icon"
          style={{
            height: 20,
            width: 20,
            objectFit: "contain",
          }}
        />
      </Link>
    </div>
  );
}

function MobileLoginButton() {

  const countryId = useCountryId();
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const desiredHeight = style.spacing.HEADER_HEIGHT - BAR_TOP_PADDING - BAR_BOTTOM_PADDING

  const sharedStyle = {
    color: style.colors.WHITE,
    fontSize: 18
  };

  return (
    <div
      style={{
        backgroundColor: style.colors.BLUE,
        height: desiredHeight,
        width: desiredHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        border: `1px solid ${style.colors.WHITE}`
      }}
      onClick={
        isAuthenticated
          ? () => logout({ logoutParams: { returnTo: window.location.origin } })
          : () => loginWithRedirect({ appState: { returnTo: `/${countryId}` } })
      }
      onMouseOver={(e) =>
        e.currentTarget.style.backgroundColor = style.colors.DARK_BLUE_HOVER
      }
      onMouseOut={(e) =>
        e.currentTarget.style.backgroundColor = style.colors.BLUE_PRIMARY
      }
    >
      {
        isAuthenticated ? (
          <LogoutOutlined style={sharedStyle}/>
        ) : (
          <LoginOutlined style={sharedStyle}/>
        )
      }
    </div>
  );
}

function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  const desiredHeight = style.spacing.HEADER_HEIGHT - BAR_TOP_PADDING - BAR_BOTTOM_PADDING

  return (
    <>
      <div
        style={{
          height: desiredHeight,
          width: desiredHeight,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          padding: 15,
          color: "white",
          border: "1px solid white",
          fontSize: 20,
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className="material-symbols-outlined"
          alt="Hamburger icon"
          style={{
            objectFit: "contain",
            color: "white",
          }}
        >
          {isOpen ? "close" : "menu"}
        </span>
      </div>
      <LeftNavigationMenu isOpen={isOpen} />
    </>
  );
}

function DesktopCalculatorButton() {
  const countryId = useCountryId();
  return (
    <LinkButton
      link={`/${countryId}/calculator`}
      text="Compute Policy Impact"
      style={{ padding: "10px" }}
    />
  );
}

function DesktopLoginButton() {
  const countryId = useCountryId();

  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <Button
      text={isAuthenticated ? "Log Out" : "Log In"}
      type="secondary"
      onClick={
        isAuthenticated
          ? () => logout({ logoutParams: { returnTo: window.location.origin } })
          : () => loginWithRedirect({ appState: { returnTo: `/${countryId}` } })
      }
      width="150px"
      style={{
        padding: "10px"
      }}
    />
  );
}

function MainHeaderLogo() {
  const countryId = useCountryId();
  return (
    <Link to={`/${countryId}`}>
      <img
        src={PolicyEngineMainLogo}
        alt="PolicyEngine logo"
        style={{
          objectFit: "contain",
          height: style.spacing.HEADER_HEIGHT,
          padding: `${BAR_TOP_PADDING}px 0 ${BAR_BOTTOM_PADDING}px 0`
        }}
      />
    </Link>
  );
}

function PageLinks() {

  const countryId = useCountryId();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 16,
      }}
    >
      {LINKS.map((link) => {
        return (
          <Link to={`/${countryId}/${link.toLowerCase()}`} key={link}>
            <div
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "Roboto",
                fontWeight: 500,
                letterSpacing: 2.4,
                textTransform: "uppercase",
              }}
            >
              <HoverBox
                hoverBackgroundColor={style.colors.BLUE_LIGHT}
                hoverStart="bottom"
              >
                <motion.div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: style.spacing.HEADER_HEIGHT,
                    padding: 15,
                    cursor: "pointer",
                  }}
                  whileHover={{
                    color: style.colors.BLUE_PRIMARY,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  {link}
                </motion.div>
              </HoverBox>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function LeftNavigationMenu(props) {
  // The menu that slides in from the left when the hamburger is clicked
  const { isOpen } = props;
  const countryId = useCountryId();
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: style.colors.BLUE_PRIMARY,
        zIndex: -1,
        paddingTop: 100,
      }}
      initial={{
        y: "-100vh",
      }}
      animate={{
        y: isOpen ? 0 : "-100vh",
      }}
      transition={{
        duration: 0.4,
      }}
    >
      {LINKS.map((link, i) => {
        return (
          <Link to={`/${countryId}/${link.toLowerCase()}`} key={link}>
            <HoverBox
              hoverStart="left"
              size="100vw"
              hoverBackgroundColor={style.colors.WHITE}
              style={{
                margin: 30,
              }}
            >
              <motion.div
                style={{
                  cursor: "pointer",
                  color: "white",
                  fontSize: 20,
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  letterSpacing: 2.4,
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 90,
                  padding: 15,
                  border: "1px solid white",
                  zIndex: 100,
                }}
                key={link}
                initial={{
                  opacity: 0,
                  x: -50,
                  color: style.colors.WHITE,
                }}
                whileHover={{
                  color: style.colors.BLUE_PRIMARY,
                }}
                animate={
                  isOpen
                    ? {
                        opacity: 1,
                        x: 0,
                      }
                    : {
                        opacity: 0,
                        x: -50,
                      }
                }
                transition={{
                  duration: isOpen ? 0.3 : 0.1,
                  delay: isOpen ? 0.1 * i + 0.2 : 0,
                  color: {
                    duration: 0.1,
                    delay: 0,
                  },
                }}
              >
                {link}
              </motion.div>
            </HoverBox>
          </Link>
        );
      })}
    </motion.div>
  );
}
