import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import style from "../style";
import Divider from "./Divider";


export default function HoverCard(props) {
    const { children } = props;
    let { content } = props;
    if (!content) {
        content = {
            title: "",
            body: "",
        }
    }
    const [visible, setVisible] = useState(false);

    const hoverCardElement = <motion.div
        id="hovercard"
        style={{
            backgroundColor: style.colors.WHITE,
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 1002,
            padding: 10,
            borderRadius: 15,
            borderWidth: 2,
            borderColor: style.colors.DARK_GRAY,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <h5>{content.title}</h5>
        <Divider />
        {content.body}
    </motion.div>;

    window.addEventListener("mousemove", (e) => {
        const element = document.getElementById("hovercard");
        if (visible && element) {
            element.style.left = e.clientX + 10 + "px";
            element.style.top = e.clientY + 10 + "px";
        }
    });

    return <>
        <AnimatePresence
        >
            {visible && hoverCardElement}
        </AnimatePresence>
        <div
            onMouseEnter={() => {
                setVisible(true);
                console.log("hovering");
            }}
            onMouseLeave={() => {
                setVisible(false);
                console.log("not hovering");
            }}
        >
            {children}
        </div>
    </>
}