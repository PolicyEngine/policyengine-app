import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import colors from "../style/colors";

export default function CodeBlock({ lines, language }) {
  const [copyText, setCopyText] = useState("Copy");
  const code = lines.join("\r\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopyText("Copied!");
    setTimeout(() => setCopyText("Copy"), 1000);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        style={{
          position: "absolute",
          right: 10,
          top: 10,
          padding: "5px 10px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: colors.TEAL_ACCENT,
          color: "white",
          cursor: "pointer",
          fontSize: "0.9em",
          fontFamily: "Arial, sans-serif",
          transitionDuration: "0.4s",
        }}
        onClick={handleCopy}
      >
        {copyText}
      </button>
      <Highlight theme={themes.vsDark} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            <table>
              <tbody>
                {tokens.map((line, i) => (
                  <tr key={i} {...getLineProps({ line, key: i })}>
                    <td
                      style={{
                        textAlign: "right",
                        paddingRight: "1em",
                        paddingLeft: "1.5em",
                        userSelect: "none",
                        opacity: "0.5",
                      }}
                    >
                      {i + 1}
                    </td>
                    <td>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
