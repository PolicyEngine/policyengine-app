import style from "redesign/style";

export function PythonCodeBlock({ lines }) {
  // Turn 4-space indents into padding-left
  const lineIndents = lines.map((line) => {
    let numIndents = 0;
    if (!line) {
      return 0;
    }
    let lineCopy = line.toString();
    while (
      Array.from(lineCopy.slice(0, 4)).filter((char) => char === " ").length ===
      4
    ) {
      lineCopy = lineCopy.slice(4);
      if (lineCopy.length < 4) {
        break;
      }
      numIndents++;
    }
    return numIndents;
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        maxHeight: "50vh",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          backgroundColor: style.colors.DARK_GRAY,
          borderRadius: 20,
          padding: 20,
          width: 600,
          overflowX: "scroll",
        }}
      >
        {lines.map((line, i) => {
          if (line === "") {
            return <div key={i} style={{ paddingTop: 15 }} />;
          } else if (line.includes("situation = {")) {
            return (
              <pre
                key={i}
                style={{
                  color: style.colors.WHITE,
                  fontFamily: "monospace",
                  margin: 0,
                  paddingTop: 5,
                }}
              >
                {line}
              </pre>
            );
          } else {
            return (
              <p
                key={i}
                style={{
                  color: style.colors.WHITE,
                  fontFamily: "monospace",
                  paddingLeft: lineIndents[i] * 30,
                  margin: 0,
                  whiteSpace: "nowrap",
                  paddingTop: 5,
                }}
              >
                {line}
              </p>
            );
          }
        })}
      </div>
    </div>
  );
}
