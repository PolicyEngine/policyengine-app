import { forwardRef } from "react";
import useMobile from "./Responsive";

// export default function ResultsPanel(props) {
const ResultsPanel = forwardRef((props, ref) => {
  const mobile = useMobile();
  const { style } = props;
  return (
    <div
      style={{
        padding: 0,
        paddingLeft: mobile ? 5 : 20,
        paddingRight: mobile ? 5 : 20,
        height: "100%",
        overflow: "auto",
        ...style,
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: mobile ? 5 : 20 }}>
        {props.title}
      </h2>
      <div ref={ref} style={{ paddingTop: 0, paddingBottom: 50 }}>
        {props.children}
      </div>
      {/* <div style={{ paddingTop: 0, paddingBottom: 150 }}>{props.children}</div> */}
      <h5>{props.description}</h5>
    </div>
  );
  // }
});

// line below is to resolve eslint error regarding missing displayName
ResultsPanel.displayName = "ResultsPanel";

export default ResultsPanel;
