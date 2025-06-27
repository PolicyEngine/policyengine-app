import React from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

export default function CodeBlock({ code, language = "json" }) {
  return (
    <CodeEditor
      value={code}
      language={language}
      padding={15}
      style={{
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        fontSize: 14,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        marginTop: 12,
      }}
      readOnly
    />
  );
}
