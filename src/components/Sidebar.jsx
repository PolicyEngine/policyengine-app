import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PolicyEngineContext from "../logic/PolicyEngineContext";
import style from "../style"
import { motion } from "framer-motion"

function SidebarItem(props) {
    const label = props.label;
    const target = props.target;
    const navigate = useNavigate();
    const PolicyEngine = useContext(PolicyEngineContext);
    return <motion.div style={{
        backgroundColor: style.colors.WHITE,
        color: style.colors.BLACK,
        cursor: "pointer",
        padding: 10,
        paddingTop: 15,
        paddingLeft: 30,
    }}
    whileHover={{
        backgroundColor: style.colors.LIGHT_GRAY,
    }}
    onClick={() => navigate(PolicyEngine.getCountryUrl(target))}
    >
        <h5>{label}</h5>
    </motion.div>
}

export default function Sidebar(props) {
    const [hover, setHover] = useState(null);
    // Anchored to the bottom, we have a "Settings" item.
    return <div style={{
        position: "fixed",
        width: "20%",
        height: "100%",
        backgroundColor: style.colors.WHITE,
        borderRight: `1px solid ${style.colors.DARK_GRAY}`,
        overflow: "auto",
    }}>
        <SidebarItem name="home" target="" label="Home" setHover={setHover} hoverValue={hover} />
        <SidebarItem name="household" target="/household" label="My household" setHover={setHover} hoverValue={hover} />
        <SidebarItem name="policy" target="/policy" label="Policy reform" setHover={setHover} hoverValue={hover} />
        <div style={{
            position: "absolute",
            bottom: 75,
            width: "100%",
            backgroundColor: style.colors.LIGHT_GRAY,
            color: style.colors.BLACK,
            cursor: "pointer",
            padding: 10,
            paddingTop: 15,
            paddingLeft: 30,
        }}
        >
            <h5>United Kingdom</h5>
        
        </div>
    </div>
}