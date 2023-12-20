import { Highlight, themes } from "prism-react-renderer";

export function PythonCodeBlock({ lines }) {
  const code = lines.join("\r\n");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        maxHeight: "50vh",
        overflowY: "scroll",
      }}
    >
      <Highlight theme={themes.vsDark} code={code} language="python">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div
                key={i}
                style={{ display: "table-row" }}
                {...getLineProps({ line })}
              >
                <span
                  style={{
                    display: "table-cell",
                    paddingRight: "1em",
                    userSelect: "none",
                    opacity: "0.5",
                  }}
                >
                  {i + 1}
                </span>
                <div style={{ display: "table-cell" }}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
