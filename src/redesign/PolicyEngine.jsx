import { useDisplayCategory } from "layout/Responsive"
import style from "./style";
import PolicyEngineMainLogo from "../images/logos/policyengine/white.svg";
import PolicyEngineSmallLogo from "../images/logos/policyengine/profile/white.svg";
import CalculatorIcon from "./images/icons/calculator.png";
import HamburgerIcon from "./images/icons/hamburger.png";
import { motion } from "framer-motion";


export default function PolicyEngine() {
    return (
        <div>
            <HeaderBar />
        </div>
    )
}

function HeaderBar() {
    const displayCategory = useDisplayCategory();
    return (
        <>
        <div style={{
            backgroundColor: style.colors.BLUE_PRIMARY,
            width: "100%",
            height: 90,
            display: "flex",
            alignItems: "center",
            position: "fixed",
        }}>
            {{
                mobile: <MobileHeaderBar />,
                tablet: <TabletHeaderBar />,
                desktop: <DesktopHeaderBar />,
            }[displayCategory]}
        </div>
        <div style={{
            height: 90,
        }}/>
        </>
    )
}

function MobileHeaderBar() {
    return <>
        <MobileHeaderLogo />
        <MobileCalculatorButton />
        <Hamburger />
    </>
}

function TabletHeaderBar() {
    return <>
        <MainHeaderLogo />
        <DesktopCalculatorButton />
        <Hamburger />
    </>
}

function DesktopHeaderBar() {
    return <>
        <MainHeaderLogo />
        <PageLinks />
        <DesktopCalculatorButton />
    </>
}

function MobileHeaderLogo() {
    return <div style={{
        display: "flex",
        alignItems: "center",
        maxWidth: "20vw",
    }}>
        <img 
            src={PolicyEngineSmallLogo} 
            alt="PolicyEngine logo"
            style={{
                height: 50,
                margin: 20,
            }}
        />
    </div>
}

function MobileCalculatorButton() {
    return <div style={{
        backgroundColor: "#39C6C0",
        height: 50,
        width: 50,
        margin: 20,
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    }}>
        <img src={CalculatorIcon} alt="Calculator icon" style={{
            height: 30,
            width: 30,
            objectFit: "contain",
        }}/>
    </div>
}

function Hamburger() {
    return <div style={{
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
    }}>
        <img src={HamburgerIcon} alt="Hamburger icon" style={{
            height: 30,
            width: 30,
            objectFit: "contain",
        }}/>
    </div>
}

function DesktopCalculatorButton() {
    return <>
            <HoverBox
                hoverBackgroundColor={style.colors.TEAL_PRESSED}
                direction="left"
                style={{
                    margin: 20,
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
                }}
                >
                CALCULATE
            </HoverBox>
    </>
}

function MainHeaderLogo() {
    return <div style={{
        display: "flex",
        alignItems: "center",
        width: "min(300px, 25vw)",
        margin: 20,
    }}>
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
}

function PageLinks() {
    return <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "min(600px, 50vw)",
        paddingLeft: 30,
    }}>
        {["Research", "About", "Contact", "Donate"].map((link) => {
            return <div style={{
                color: "white",
                margin: 15,
                fontSize: 20,
                fontFamily: "Roboto",
                fontWeight: 500,
                letterSpacing: 2.4,
                textTransform: "uppercase",
            }}
            key="link"
            >
                <HoverBox hoverBackgroundColor={style.colors.WHITE} direction="bottom">

                <motion.div style={{
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
        })}
    </div>

}


function HoverBox(props) {
    const {
        hoverBackgroundColor,
        direction,
        children,
        ...rest
    } = props;

    let topStart, leftStart, topEnd, leftEnd, spread;

    spread = "0px";

    if (direction === "top") {
        topStart = "0px";
        leftStart = "0px";
        topEnd = "200px";
        leftEnd = "0px";
    } else if (direction === "bottom") {
        topStart = "0px";
        leftStart = "0px";
        topEnd = "-200px";
        leftEnd = "0px";
    } else if (direction === "left") {
        topStart = "0px";
        leftStart = "0px";
        topEnd = "0px";
        leftEnd = "200px";
    } else if (direction === "right") {
        topStart = "0px";
        leftStart = "0px";
        topEnd = "0px";
        leftEnd = "-200px";
    }

    const containerStyle = {
        transition: 'box-shadow 0.1s ease-out',
        position: 'relative',
        overflow: 'hidden', // Hide the box-shadow overflow
        boxShadow: `inset ${leftStart} ${topStart} ${spread} ${hoverBackgroundColor}`,
    };

    const hoverStyle = {
        boxShadow: `inset ${leftEnd} ${topEnd} 0 ${spread} ${hoverBackgroundColor}`, // This will create the effect
    };

    // Should use box-shadow to have a different background fill up from the bottom on hover
    return <div
        {...rest}
        style={
            {...containerStyle, ...(props.style || {})}
        }
        onMouseOver={e => e.currentTarget.style.boxShadow = hoverStyle.boxShadow}
        onMouseOut={e => e.currentTarget.style.boxShadow = containerStyle.boxShadow}
    >
        {children}
    </div>
}