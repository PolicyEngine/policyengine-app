import { useState, useEffect } from "react";
import { Card, Button, Tooltip } from "antd";
import { CopyOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { espresso } from "thememirror";

export default function CodeBlock({
  data,
  title,
  language,
  maxHeight,
  showExpand = true,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(data);
    setIsCopied(true);
  }

  useEffect(() => {
    if (isCopied) {
      const timeoutId = setTimeout(() => setIsCopied(false), 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isCopied]);

  const cardTitleComponent = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // Padding is necessary so that button click effect
        // is visible
        padding: "0 6px 0 0",
      }}
    >
      <p
        style={{
          margin: 0,
        }}
      >
        {language}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        {showExpand && (
          <Tooltip title={`${isExpanded ? "Close" : "Expand"} the code block`}>
            <Button
              type="default"
              style={{
                border: 0,
                fontWeight: 500,
                boxShadow: "none",
              }}
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                {isExpanded ? <UpOutlined /> : <DownOutlined />}
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {isExpanded ? "Shrink" : "Expand"}
                </p>
              </div>
            </Button>
          </Tooltip>
        )}
        <Tooltip title="Copy the code block">
          <Button
            type="default"
            style={{
              border: 0,
              fontWeight: 500,
              boxShadow: "none",
              width: "6rem",
            }}
            onClick={handleCopy}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <CopyOutlined />
              <p
                style={{
                  margin: 0,
                }}
              >
                {isCopied ? "Copied!" : "Copy"}
              </p>
            </div>
          </Button>
        </Tooltip>
      </div>
    </div>
  );

  return (
    <div
      style={{
        flex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>{title}</h4>
      </div>
      <Card
        style={{}}
        loading={!data}
        styles={{
          body: {
            padding: 0,
          },
        }}
        title={cardTitleComponent}
      >
        <CodeMirror
          value={data}
          maxHeight={maxHeight ? maxHeight : !isExpanded && "260px"}
          editable={false}
          extensions={[
            language in langs ? langs[language]() : langs.json(),
            EditorView.lineWrapping,
          ]}
          theme={espresso}
        />
      </Card>
    </div>
  );
}
