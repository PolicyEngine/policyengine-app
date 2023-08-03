import { useDisplayCategory } from "layout/Responsive"
import style from "style";
import PolicyEngineMainLogo from "../images/logos/policyengine/white.svg";
import PolicyEngineSmallLogo from "../images/logos/policyengine/profile/white.svg";
import { motion } from "framer-motion";
import { useState } from "react";


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
            backgroundColor: style.colors.BLUE,
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
    }}>

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
    }}>
        =
    </div>
}

function DesktopCalculatorButton() {
    return <div style={{
        backgroundColor: "#39C6C0",
        height: 50,
        margin: 20,
        marginLeft: "auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        color: "white",
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 20,
        fontFamily: "Roboto",
        fontWeight: 500,
        letterSpacing: 2.4,
    }}>
        CALCULATE
    </div>
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
                <HoverBackground
                    defaultBackground="transparent"
                    hoverBackground="white"
                    height={90}
                    width={150}
                    >
                        <motion.div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: 90,
                            cursor: "pointer",
                        }}
                        whileHover={{
                            color: style.colors.BLUE,
                        }}
                        >
                            {link}
                        </motion.div>
                </HoverBackground>
            </div>
        })}
    </div>

}

function HoverBackground(props) {
    // A div that changes color on hover by having a different covered background slide upwards.
    const { children, defaultBackground, hoverBackground, height, width } = props;
    const [hovering, setHovering] = useState(false);
    // use motion.div
    return (
        <motion.div
          style={{
            backgroundColor: defaultBackground,
            overflow: "hidden",
            height: height,
            width: width,
            margin: 0,
          }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        >
          {children}
            <motion.div
                style={{
                    backgroundColor: hoverBackground,
                    position: "relative",
                    height: height * 2,
                    top: -height * 2,
                    zIndex: -1,
                }}
                animate={hovering ? { y: height / 2 } : { y: -height }}
                transition={{ 
                    duration: 0.2,
                }}
            />
        </motion.div>
      );
}