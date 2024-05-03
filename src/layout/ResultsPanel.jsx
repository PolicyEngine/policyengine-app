import { forwardRef } from "react";
import useMobile from "./Responsive";

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
        ...style,
      }}
    >
      <h2 style={{ marginBottom: mobile ? 5 : 20 }}>{props.title}</h2>
      {props.description && (
        <p
          style={{
            paddingTop: mobile ? 5 : 20,
            paddingBottom: mobile ? 5 : 40,
            textAlign: "center",
          }}
        >
          {props.description}
        </p>
      )}
      <div ref={ref} style={{ paddingTop: 0, paddingBottom: 50 }}>
        {props.children}
      </div>
    </div>
  );
});

// line below is to resolve eslint error regarding missing displayName
ResultsPanel.displayName = "ResultsPanel";

export default ResultsPanel;
