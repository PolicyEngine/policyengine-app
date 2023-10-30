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
          borderBottom: `1px solid ${style.colors.BLACK}`,
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
          height: 90,
        }}
      />
    </>
  );
}

function MobileHeaderBar() {
  return (
    <>
      <MobileHeaderLogo />
      <MobileCalculatorButton />
      <Hamburger />
    </>
  );
}

function TabletHeaderBar() {
  return (
    <>
      <MainHeaderLogo />
      <DesktopCalculatorButton />
      <Hamburger />
    </>
  );
}

function DesktopHeaderBar() {
  return (
    <>
      <MainHeaderLogo />
      <PageLinks />
      <DesktopCalculatorButton />
    </>
  );
}

function MobileHeaderLogo() {
  const countryId = useCountryId();
  return (
    <Link to={`/${countryId}`}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: "20vw",
        }}
      >
        <img
          src={PolicyEngineSmallLogo}
          alt="PolicyEngine logo"
          style={{
            height: 50,
            margin: 20,
          }}
        />
      </div>
    </Link>
  );
}

function MobileCalculatorButton() {
  return (
    <div
      style={{
        backgroundColor: "#39C6C0",
        height: 50,
        width: 50,
        margin: 20,
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <img
        src={CalculatorIcon}
        alt="Calculator icon"
        style={{
          height: 30,
          width: 30,
          objectFit: "contain",
        }}
      />
    </div>
  );
}

function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        style={{
          height: 50,
          width: 50,
          margin: 20,
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
    <>
      <HoverBox
        hoverBackgroundColor={style.colors.TEAL_PRESSED}
        direction="left"
        link={`/${countryId}/calculator`}
        style={{
          margin: 20,
          marginRight: 15,
          marginLeft: "auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          backgroundColor: style.colors.TEAL_ACCENT,
          color: "white",
          padding: 15,
          paddingLeft: 30,
          paddingRight: 30,
          fontSize: 20,
          fontFamily: "Roboto",
          fontWeight: 500,
          letterSpacing: 2.4,
          cursor: "pointer",
          textTransform: "uppercase",
        }}
        size="400px"
      >
        Compute policy impacts
      </HoverBox>
    </>
  );
}

function MainHeaderLogo() {
  const countryId = useCountryId();
  return (
    <Link to={`/${countryId}`}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "min(300px, 25vw)",
          margin: 20,
        }}
      >
        <img
          src={PolicyEngineMainLogo}
          alt="PolicyEngine logo"
          style={{
            // make whatever height fits the container
            width: "min(300px, 25vw)",
            objectFit: "contain",
          }}
        />
      </div>
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
        justifyContent: "space-between",
        width: "min(600px, 35vw)",
        paddingLeft: 30,
      }}
    >
      {["Research", "About", "Donate"].map((link) => {
        return (
          <Link to={`/${countryId}/${link.toLowerCase()}`} key={link}>
            <div
              style={{
                color: "white",
                margin: 15,
                fontSize: 20,
                fontFamily: "Roboto",
                fontWeight: 500,
                letterSpacing: 2.4,
                textTransform: "uppercase",
                width: 150,
              }}
            >
              <HoverBox
                hoverBackgroundColor={style.colors.BLUE_LIGHT}
                direction="bottom"
              >
                <motion.div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 90,
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
      {["Research", "About", "Donate"].map((link, i) => {
        return (
          <Link to={`/${countryId}/${link.toLowerCase()}`} key={link}>
            <HoverBox
              direction="left"
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
