import { AnimatePresence, motion } from "framer-motion";
import { createContext, useEffect, useState, memo, useRef } from "react";
import style from "../style";
import Divider from "./Divider";

export const HoverCardContext = createContext((obj) => obj);

export const ChartWidthContext = createContext((obj) => obj);

export default function HoverCard(props) {
  const { children } = props;
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [content, setContent] = useState({ title: "", body: "" });
  const title = content && content.title ? content.title : "";
  const body = content && content.body ? content.body : "";
  const notEmpty = title.length !== 0 || body.length !== 0;
  const visible = enabled && notEmpty;

  const hoverCardElement = (
    <motion.div
      style={{
        backgroundColor: style.colors.WHITE,
        position: "absolute",
        left: position.left,
        top: position.top,
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

  useEffect(() => {
    const mouseMoveHandler = (e) => {
      if (visible) {
        setPosition({ left: e.clientX + 10, top: e.clientY + 10 });
      }
    };
    window.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [visible]);

  return (
    <>
      <AnimatePresence>{visible && hoverCardElement}</AnimatePresence>
      <MemoizedChildren setContent={setContent} setEnabled={setEnabled}>
        {children}
      </MemoizedChildren>
    </>
  );
}

const MemoizedChildren = memo(function MemoizedChildren(props) {
  const { children, setContent, setEnabled } = props;

  const [chartWidth, setChartWidth] = useState(0);

  // This represents the div holding the hovercard item,
  // and will be used for dynamic size updating
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // If the container div
      const observer = new ResizeObserver((entries) => {
        setChartWidth(entries[0].contentRect.width);
      });

      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      };
    }
  });

  return (
    <HoverCardContext.Provider value={setContent}>
      <ChartWidthContext.Provider value={chartWidth}>
        <div
          className="test"
          onMouseEnter={() => {
            setEnabled(true);
          }}
          onMouseLeave={() => {
            setEnabled(false);
          }}
          ref={containerRef}
          style={{
            height: "100%",
            display: "flex",
          }}
        >
          {children}
        </div>
      </ChartWidthContext.Provider>
    </HoverCardContext.Provider>
  );
});
