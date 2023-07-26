import { AnimatePresence, motion } from "framer-motion";
import { createContext, useState, memo } from "react";
import style from "../style";
import Divider from "./Divider";

export const HoverCardContext = createContext({});

export default function HoverCard(props) {
  const { children } = props;
  const [position, setPosition] = useState({left: 0, top: 0});
  const [content, setContent] = useState({title: "", body: ""});
  const title = content && content.title ? content.title : "";
  const body = content && content.body ? content.body : "";
  const notEmpty = title.length !== 0 || body.length !== 0;

  const hoverCardElement = (
    <motion.div
      style={{
        backgroundColor: style.colors.WHITE,
        position: "absolute",
        ...position,
        zIndex: 1002,
        padding: 10,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: style.colors.DARK_GRAY,
        borderStyle: "solid",
        maxWidth: 300,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h5>{title}</h5>
      <Divider />
      {body}
    </motion.div>
  );

  return (
    <>
      <AnimatePresence>
        {notEmpty && hoverCardElement}
      </AnimatePresence>
      <MemoizedChildren
        setContent={setContent}
        setPosition={setPosition}
      >
        {children}
      </MemoizedChildren>
    </>
  );
}

const MemoizedChildren = memo(function MemoizedChildren(props) {
  const {children, setContent, setPosition} = props;
  const id = "child-plot";

  const setCoordinates = (left, top, corner = "top-left") => {
    const bodyRect = document.body.getBoundingClientRect();
    const divRect = document.getElementById(id).getBoundingClientRect();
    if (corner === "top-left") {
      const leftOffset = divRect.left - bodyRect.left;
      const topOffset = divRect.top - bodyRect.top;
      setPosition({left: left + leftOffset, top: top + topOffset});
    } else if (corner === "bottom-left") {
      const leftOffset = divRect.left - bodyRect.left;
      const bottomOffset = bodyRect.bottom - divRect.bottom;
      setPosition({left: left + leftOffset, bottom: divRect.height - top + bottomOffset});
    } else if (corner === "bottom-right") {
      const rightOffset = bodyRect.right - divRect.right;
      const bottomOffset = bodyRect.bottom - divRect.bottom;
      setPosition({right: divRect.width - left + rightOffset, bottom: divRect.height - top + bottomOffset});
    } else if (corner === "top-right") {
      const rightOffset = bodyRect.right - divRect.right;
      const topOffset = divRect.top - bodyRect.top;
      setPosition({right: divRect.width - left + rightOffset, top: top + topOffset});
    } else {
      console.log(`Corner ${corner} not supported.`);
    }
  };

  return (
    <HoverCardContext.Provider value={{setContent, setCoordinates}}>
      <div id={id}>
        {children}
      </div>
    </HoverCardContext.Provider>
  );
});
