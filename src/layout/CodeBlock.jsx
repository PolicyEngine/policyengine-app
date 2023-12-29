import { Highlight, themes } from "prism-react-renderer";

export default function CodeBlock({ lines, language }) {
  const code = lines.join("\r\n");
  return (
    <Highlight theme={themes.vsDark} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
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
        </pre>
      )}
    </Highlight>
  );
}
