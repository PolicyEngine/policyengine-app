import useDisplayCategory from "../hooks/useDisplayCategory";
import useCountryId from "../hooks/useCountryId";
import style from "../style";
import PolicyEngineMainLogo from "../images/logos/policyengine/white.svg";
import PolicyEngineSmallLogo from "../images/logos/policyengine/profile/white.svg";
import CalculatorIcon from "../images/icons/calculator.png";
import { HoverBox } from "./HoverBox";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LinkButton from "../controls/LinkButton";
import { useAuth0 } from "@auth0/auth0-react";
import {
  UserOutlined,
  LoadingOutlined,
  UserDeleteOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { loginOptions, logoutOptions } from "../auth/authUtils";
import { Dropdown } from "antd";

const BAR_TOP_PADDING_MOBILE = 10; // Desired top padding, px
const BAR_BOTTOM_PADDING_MOBILE = 10; // Desired bottom padding, px
const BAR_TOP_PADDING_DEFAULT = 8;
const BAR_BOTTOM_PADDING_DEFAULT = 8;
const BAR_SIDE_PADDING = 16;
const LINKS = [
  {
    title: "Research",
    link: "research",
  },
  {
    title: "About",
    link: "about",
  },
  {
    title: "Donate",
    link: "donate",
  },
];

export default function Header() {
  const displayCategory = useDisplayCategory();
  return (
    <>
      <div
        style={{
          backgroundColor: style.colors.BLUE_PRIMARY,
          width: "100vw",
          height: style.spacing.HEADER_HEIGHT,
          display: "flex",
          alignItems: "center",
          position: "fixed",
          zIndex: 1000,
          justifyContent: "space-between",
          borderBottom: `1px solid ${style.colors.BLACK}`,
          padding: `0 ${BAR_SIDE_PADDING}px`,
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
          gap: "30px",
        }}
      >
        <MobileHeaderLogo />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "16px",
        }}
      >
        <MobileCalculatorButton />
        <LoginMenu />
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
          gap: "30px",
        }}
      >
        <MainHeaderLogo />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "16px",
        }}
      >
        <DesktopCalculatorButton />
        <LoginMenu />
        <Hamburger />
      </div>
    </>
  );
}

function DesktopHeaderBar() {
  const isInCalculatorAlready =
    window.location.pathname.includes("/policy") ||
    window.location.pathname.includes("/household");
  return (
    <>
      <div style={{ display: "flex" }}>
        <MainHeaderLogo />
        <div style={{ width: 50 }} />
        <PageLinks />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 16,
        }}
      >
        {!isInCalculatorAlready && <DesktopCalculatorButton />}
        <LoginMenu />
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
          padding: `${BAR_BOTTOM_PADDING_MOBILE}px 0 ${BAR_BOTTOM_PADDING_MOBILE}px 0`,
        }}
      />
    </Link>
  );
}

function MobileCalculatorButton() {
  const countryId = useCountryId();

  const desiredHeight =
    style.spacing.HEADER_HEIGHT -
    BAR_BOTTOM_PADDING_MOBILE -
    BAR_BOTTOM_PADDING_MOBILE;
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

function LoginButton() {
  const countryId = useCountryId();
  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0();
  const displayCategory = useDisplayCategory();

  const BAR_TOP_PADDING_CURRENT =
    displayCategory === "mobile"
      ? BAR_TOP_PADDING_MOBILE
      : BAR_TOP_PADDING_DEFAULT;
  const BAR_BOTTOM_PADDING_CURRENT =
    displayCategory === "mobile"
      ? BAR_BOTTOM_PADDING_MOBILE
      : BAR_BOTTOM_PADDING_DEFAULT;
  const desiredHeight =
    style.spacing.HEADER_HEIGHT -
    BAR_TOP_PADDING_CURRENT -
    BAR_BOTTOM_PADDING_CURRENT;

  const sharedStyle = {
    color: style.colors.WHITE,
    fontSize: 18,
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
        border: `1px solid ${style.colors.WHITE}`,
      }}
      onClick={
        !isAuthenticated
          ? () => loginWithRedirect(loginOptions(countryId))
          : null
      }
      onMouseOver={(e) =>
        (e.currentTarget.style.backgroundColor = style.colors.DARK_BLUE_HOVER)
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.backgroundColor = style.colors.BLUE_PRIMARY)
      }
    >
      {isAuthenticated && user && user.picture ? (
        <img
          src={user.picture ?? ""}
          alt="Profile"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : isLoading || isAuthenticated ? (
        <LoadingOutlined style={sharedStyle} />
      ) : (
        <UserOutlined style={sharedStyle} />
      )}
    </div>
  );
}

function LoginMenu() {
  const { logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const countryId = useCountryId();
  const displayCategory = useDisplayCategory();

  // Unfortunately, it's not possible with Ant Design
  // to set these on the individual menu items
  function handleClick({ key }) {
    if (key === "sign-out") {
      logout(logoutOptions);
    } else if (key === "profile") {
      navigate(`/${countryId}/profile`);
    }
  }

  const dropdownItems = [
    {
      label: "Profile",
      key: "profile",
      icon: <ReadOutlined style={{ fontSize: 16 }} />,
      style: {
        fontSize: 16,
        margin: 10,
      },
    },
    {
      label: "Sign out",
      key: "sign-out",
      icon: <UserDeleteOutlined style={{ fontSize: 16 }} />,
      style: {
        fontSize: 16,
        margin: 10,
      },
    },
  ];

  if (!isAuthenticated) {
    return <LoginButton />;
  }

  return (
    <Dropdown
      menu={{
        items: dropdownItems,
        onClick: handleClick,
        style: {
          borderRadius: 0,
          fontFamily: style.fonts.BODY_FONT,
          minWidth: "200px",
        },
      }}
      trigger={displayCategory === "mobile" ? ["click", "hover"] : ["hover"]}
      placement="bottomRight"
    >
      {/*This div necessary to properly render dropdown items*/}
      <div>
        <LoginButton />
      </div>
    </Dropdown>
  );
}

function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const displayCategory = useDisplayCategory();

  const BAR_TOP_PADDING_CURRENT =
    displayCategory === "mobile"
      ? BAR_TOP_PADDING_MOBILE
      : BAR_TOP_PADDING_DEFAULT;
  const BAR_BOTTOM_PADDING_CURRENT =
    displayCategory === "mobile"
      ? BAR_BOTTOM_PADDING_MOBILE
      : BAR_BOTTOM_PADDING_DEFAULT;
  const desiredHeight =
    style.spacing.HEADER_HEIGHT -
    BAR_TOP_PADDING_CURRENT -
    BAR_BOTTOM_PADDING_CURRENT;

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
          padding: `${BAR_TOP_PADDING_MOBILE}px 0 ${BAR_BOTTOM_PADDING_MOBILE}px 0`,
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
          <Link to={`/${countryId}/${link.link}`} key={link.title}>
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
                  {link.title}
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
          <Link to={`/${countryId}/${link.link}`} key={link.title}>
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
                key={link.title}
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
                {link.title}
              </motion.div>
            </HoverBox>
          </Link>
        );
      })}
    </motion.div>
  );
}
