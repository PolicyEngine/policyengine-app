import Markdown from "react-markdown";
import { TwitterTweetEmbed } from "react-twitter-embed";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import React, { useState, useRef, useEffect } from "react";
import style from "../style";
import useDisplayCategory from "../hooks/useDisplayCategory";
import Plot from "react-plotly.js";
import { wrappedJsonParse } from "../data/wrappedJson";

// Add Roboto Mono font for code blocks and tables
const fontFaceStyle = document.createElement("style");
fontFaceStyle.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap');
`;
document.head.appendChild(fontFaceStyle);

function Td({ children }) {
  const displayCategory = useDisplayCategory();
  const mobile = displayCategory === "mobile";
  const ref = useRef(null);
  const [columnNumber, setColumnNumber] = useState(null);
  useEffect(() => {
    setColumnNumber(ref.current?.cellIndex);
  }, [ref.current?.cellIndex]);
  return (
    <td
      ref={ref}
      style={{
        padding: 8,
        fontFamily: "Roboto Serif",
        fontSize: mobile ? 14 : 16,
        borderRight: columnNumber === 0 ? "1px solid black" : "",
        textAlign: columnNumber === 0 ? "left" : "center",
        verticalAlign: "middle",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      {children}
    </td>
  );
}

function Tr({ children }) {
  // get row index
  const ref = useRef(null);
  const [rowIndex, setRowIndex] = useState(0);
  useEffect(() => {
    setRowIndex(ref.current?.rowIndex);
  }, [ref.current?.rowIndex]);
  return (
    <tr
      ref={ref}
      style={{
        backgroundColor: rowIndex % 2 === 0 ? "white" : "#f2f2f2",
      }}
    >
      {children}
    </tr>
  );
}

export function HighlightedBlock({ data, leftContent, rightContent }) {
  if (!leftContent && !rightContent) {
    const content = data[0];
    [leftContent, rightContent] = content.split("&&&");
    leftContent = <MarkdownFormatter markdown={leftContent} />;
    rightContent = (
      <MarkdownFormatter
        backgroundColor={style.colors.LIGHT_GRAY}
        markdown={rightContent}
      />
    );
  }
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(ref.current?.clientHeight);
  }, [ref.current?.clientHeight]);
  return (
    <>
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: 0,
          width: "100%",
          backgroundColor: style.colors.LIGHT_GRAY,
          zIndex: 999,
          alignItems: "start",
          justifyContent: "center",
          paddingLeft: "10vw",
          paddingRight: "10vw",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          paddingBottom: 0,
          paddingTop: 50,
        }}
        ref={ref}
      >
        <div
          style={{
            width: "50vw",
            display: "flex",
            flexDirection: "column",
            backgroundColor: style.colors.LIGHT_GRAY,
            position: "sticky",
            top: 150,
            paddingBottom: 20,
          }}
        >
          {leftContent}
        </div>
        <div
          style={{
            width: "30vw",
            backgroundColor: style.colors.LIGHT_GRAY,
          }}
        >
          {rightContent}
        </div>
      </div>
      <div
        style={{
          // Set the height of the container to the height of the content
          height: height,
          marginBottom: 50,
          marginTop: 50,
        }}
      ></div>
    </>
  );
}

export function PlotlyChartCode({ data, backgroundColor }) {
  let plotlyData = null;
  try {
    plotlyData = wrappedJsonParse(data);
  } catch {
    plotlyData = wrappedJsonParse(data[0]);
  }
  const displayCategory = useDisplayCategory();
  const mobile = displayCategory === "mobile";
  
  // Use the margins defined in the plotly data, falling back to reasonable defaults
  // Don't override what's in the data, but ensure we have at least some bottom margin
  const defaultMargins = { l: 50, r: 50, t: 50, b: 50 };
  const margins = { ...defaultMargins, ...(plotlyData.layout?.margin || {}) };
  
  return (
    <div style={{ 
      paddingLeft: 20,
      width: "100%", 
      display: "flex", 
      justifyContent: "center",
      marginBottom: 20 // Moderate bottom margin to container
    }}>
      <Plot
        data={plotlyData.data}
        layout={Object.assign({}, plotlyData.layout, {
          width: mobile ? 400 : "100%",
          height: 600,
          plot_bgcolor: backgroundColor || "transparent",
          paper_bgcolor: backgroundColor || "transparent",
          margin: margins,
          autosize: true,
        })}
        config={{
          displayModeBar: false,
          responsive: true,
          fillFrame: true,
        }}
        style={{
          maxWidth: "100%",
          boxSizing: "border-box"
        }}
      />
    </div>
  );
}

export function MarkdownFormatter({ markdown, backgroundColor, dict, pSize }) {
  const displayCategory = useDisplayCategory();
  const mobile = displayCategory === "mobile";
  const renderers = {
    blockquote: (props) => {
      const { children } = props;
      const anchorTag = children.find((child) =>
        child?.props?.href?.startsWith("https://twitter.com/"),
      );
      const tweetId = anchorTag?.props?.href?.split("/")?.pop()?.split("?")[0];

      if (tweetId) {
        return <TwitterTweetEmbed tweetId={tweetId} />;
      }

      return (
        <blockquote
          style={{
            borderLeft: `4px solid ${style.colors.BLUE}`,
            paddingLeft: 16,
            margin: "20px 0",
            fontStyle: "italic",
            color: "#555",
            backgroundColor: "#f9f9f9",
            padding: "12px 16px",
            borderRadius: "0 4px 4px 0",
          }}
        >
          {children}
        </blockquote>
      );
    },
  };

  if (!markdown) {
    return null;
  }

  return (
    <Markdown
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={{
        ...renderers,
        p: ({ children }) => (
          <p
            style={{
              fontFamily: "Roboto Serif",
              fontSize: pSize ? pSize : mobile ? 16 : 18,
              backgroundColor: backgroundColor,
              lineHeight: 1.6,
              marginBottom: 16,
              color: "#333",
            }}
          >
            {children}
          </p>
        ),
        // Ensure images fit inside the container
        img: ({ src, alt }) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 0,
              marginTop: 25,
              marginBottom: 25,
              paddingTop: 25,
              paddingBottom: 25,
            }}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              style={{
                width: "100%",
                objectFit: "contain",
                borderRadius: 8,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
            {alt && (
              <p
                style={{
                  fontFamily: "Roboto Serif",
                  color: style.colors.MEDIUM_LIGHT_GRAY,
                  textEmphasis: "italic",
                  fontSize: mobile ? 14 : 16,
                  marginTop: 12,
                  textAlign: "center",
                }}
              >
                {alt}
              </p>
            )}
          </div>
        ),
        ul: ({ children }) => (
          <ul
            style={{
              paddingLeft: 20,
              marginBottom: 24,
              marginTop: 12,
              fontFamily: "Roboto Serif",
              fontSize: pSize ? pSize : mobile ? 16 : 18,
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol
            style={{
              paddingLeft: 20,
              marginBottom: 24,
              marginTop: 12,
              fontFamily: "Roboto Serif",
              fontSize: pSize ? pSize : mobile ? 16 : 18,
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            {children}
          </ol>
        ),
        li: ({ children }) => {
          // Check if li p a exists. If it does, get the ID of the a tag.
          let value = null;
          let validValue = false;
          try {
            let footnoteLinkBack = children
              .find((child) => child?.props?.node.tagName === "p")
              .props.children.find(
                (child) => child?.props?.node.tagName === "a",
              ).props.node.properties.href;
            value = footnoteLinkBack.split("-").pop();
            validValue = /^-?\d+$/.test(value);
          } catch (e) {
            // Do nothing
          }
          return (
            <li
              style={{
                marginLeft: 10,
                marginBottom: 8,
                lineHeight: 1.5,
              }}
              value={validValue ? value : null}
            >
              {children}
            </li>
          );
        },
        iframe: ({ src, width, height }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: 20,
              width: "100%",
            }}
          >
            <iframe
              title="video"
              src={src}
              scrolling="no"
              style={{
                /* Prevent the iframe from
                            overflowing on mobile. */
                width: mobile ? "100%" : width,
                objectFit: "contain",
                height: height,
              }}
            />
          </div>
        ),
        strong: ({ children }) => (
          <span style={{ fontWeight: 600, color: "#222" }}>{children}</span>
        ),
        a: ({ href, children }) => {
          let id;
          let footnoteNumber = null;
          // If href=#user-content-fn-1, id should be user-content-fnref-1 and vice versa
          if (href.startsWith("#user-content-fn-")) {
            id = href.replace("#user-content-fn-", "user-content-fnref-");
            footnoteNumber = parseInt(id.split("-").pop());
          } else if (href.startsWith("#user-content-fnref-")) {
            id = href.replace("#user-content-fnref-", "user-content-fn-");
          } else {
            id = href;
          }
          return (
            <a
              id={id}
              href={href}
              target={
                // Open external links in a new tab, but not internal links
                href.startsWith("#") ? "" : "_blank"
              }
              rel="noopener noreferrer"
              style={{
                color: style.colors.BLUE,
                textDecoration: "none",
                borderBottom: `1px solid ${style.colors.BLUE}`,
                fontWeight: href.startsWith("#") ? "normal" : 500,
                padding: "0 2px",
                transition: "background-color 0.2s ease, color 0.2s ease",
                borderRadius: 2,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = style.colors.BLUE;
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = style.colors.BLUE;
              }}
            >
              <nobr>{footnoteNumber || children}</nobr>
            </a>
          );
        },
        h1: ({ children: headerText }) => {
          const slug = headerText
            .toLowerCase()
            .replace(/[/,]/g, "")
            .replace(/\s+/g, "-");

          return (
            <div style={{ position: "relative" }}>
              <h1
                id={slug}
                style={{
                  marginBottom: 24,
                  marginTop: 32,
                  fontWeight: 700,
                  color: "#222",
                  borderBottom: `1px solid ${style.colors.LIGHT_GRAY}`,
                  paddingBottom: 8,
                  fontSize: mobile ? 24 : 30,
                  scrollMarginTop: "70px",
                }}
              >
                {headerText}
                <a
                  href={`#${slug}`}
                  aria-label="Direct link to heading"
                  style={{
                    position: "absolute",
                    marginLeft: "10px",
                    opacity: 0,
                    fontSize: "0.6em",
                    transition: "opacity 0.2s",
                    color: style.colors.MEDIUM_LIGHT_GRAY,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                >
                  #
                </a>
              </h1>
            </div>
          );
        },
        section: ({ children, className }) => {
          children = children.filter(
            (child) => child.props?.id !== "footnote-label",
          );
          if (className === "footnotes") {
            return (
              <div
                style={{
                  borderTop: "1px solid #ddd",
                  paddingTop: 24,
                  marginTop: 32,
                  marginBottom: 20,
                  backgroundColor: "#f9f9f9",
                  borderRadius: 8,
                  padding: "20px 16px",
                  fontSize: mobile ? 14 : 16,
                  color: "#555",
                }}
              >
                {children}
              </div>
            );
          } else {
            return <section>{children}</section>;
          }
        },
        h2: ({ children: headerText }) => {
          if (!headerText.split) {
            headerText = "";
          }
          // Remove slashes and commas, and replace spaces with dashes to create a
          // unique ID for each header.
          const slug = headerText
            .toLowerCase()
            .replace(/[/,]/g, "")
            .replace(/\s+/g, "-");

          return (
            <div style={{ position: "relative" }}>
              <h2
                id={slug}
                style={{
                  marginBottom: 20,
                  marginTop: 28,
                  fontWeight: 600,
                  color: "#333",
                  fontSize: mobile ? 20 : 24,
                  borderBottom: `1px solid #f0f0f0`,
                  paddingBottom: 6,
                  scrollMarginTop: "70px",
                }}
              >
                {headerText}
                <a
                  href={`#${slug}`}
                  aria-label="Direct link to heading"
                  style={{
                    position: "absolute",
                    marginLeft: "8px",
                    opacity: 0,
                    fontSize: "0.8em",
                    transition: "opacity 0.2s",
                    color: style.colors.MEDIUM_LIGHT_GRAY,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                >
                  #
                </a>
              </h2>
            </div>
          );
        },
        h3: ({ children: headerText }) => {
          const slug = headerText
            .toLowerCase()
            .replace(/[/,]/g, "")
            .replace(/\s+/g, "-");

          return (
            <div style={{ position: "relative" }}>
              <h3
                id={slug}
                style={{
                  marginBottom: 16,
                  marginTop: 24,
                  fontWeight: 600,
                  color: "#444",
                  fontSize: mobile ? 18 : 20,
                  scrollMarginTop: "70px",
                }}
              >
                {headerText}
                <a
                  href={`#${slug}`}
                  aria-label="Direct link to heading"
                  style={{
                    position: "absolute",
                    marginLeft: "6px",
                    opacity: 0,
                    fontSize: "0.7em",
                    transition: "opacity 0.2s",
                    color: style.colors.MEDIUM_LIGHT_GRAY,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                >
                  #
                </a>
              </h3>
            </div>
          );
        },
        h4: ({ children: headerText }) => {
          const slug = headerText
            .toLowerCase()
            .replace(/[/,]/g, "")
            .replace(/\s+/g, "-");

          return (
            <div style={{ position: "relative" }}>
              <h4
                id={slug}
                style={{
                  marginBottom: 14,
                  marginTop: 20,
                  fontWeight: 600,
                  color: "#555",
                  fontSize: mobile ? 16 : 18,
                  scrollMarginTop: "70px",
                }}
              >
                {headerText}
                <a
                  href={`#${slug}`}
                  aria-label="Direct link to heading"
                  style={{
                    position: "absolute",
                    marginLeft: "5px",
                    opacity: 0,
                    fontSize: "0.7em",
                    transition: "opacity 0.2s",
                    color: style.colors.MEDIUM_LIGHT_GRAY,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                >
                  #
                </a>
              </h4>
            </div>
          );
        },
        table: ({ children }) => (
          <table
            style={{
              marginTop: 30,
              marginBottom: 30,
              display: "table",
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: 0,
              overflow: "hidden",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            {children}
          </table>
        ),
        td: Td,
        tr: Tr,

        th: ({ children }) => (
          <th
            style={{
              padding: 10,
              fontFamily: "Roboto Serif",
              fontWeight: 600,
              fontSize: mobile ? 14 : 16,
              borderBottom: "1px solid black",
              backgroundColor: style.colors.BLUE,
              textAlign: "center",
              verticalAlign: "middle",
              color: "white",
            }}
          >
            {children}
          </th>
        ),
        code: ({ children, className }) => {
          // if language == 'highlighted-block', render a highlighted block
          // else render a code block
          if (className === "language-highlighted-block") {
            return <HighlightedBlock data={children} />;
          } else if (className === "language-plotly") {
            return <PlotlyChartCode data={children} />;
          } else {
            // Extract language if available
            const language = className
              ? className.replace("language-", "")
              : "";

            return (
              <code
                style={{
                  fontFamily: "Roboto Mono, monospace",
                  padding: "2px 6px",
                  borderRadius: 0,
                  backgroundColor: "#f5f5f5",
                  fontSize: mobile ? 14 : 16,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  position: "relative",
                }}
              >
                {children}
              </code>
            );
          }
        },
        pre: ({ children }) => {
          // Get the language from the code child if it exists
          const codeChild = React.Children.toArray(children).find((child) =>
            child.props?.className?.includes("language-"),
          );
          const language = codeChild?.props?.className?.replace(
            "language-",
            "",
          );

          return (
            <div
              style={{
                margin: "24px 0",
                overflow: "hidden",
                backgroundColor: "#f5f5f5",
                border: "1px solid #eee",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                position: "relative",
              }}
            >
              {language &&
                language !== "highlighted-block" &&
                language !== "plotly" && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      fontSize: "12px",
                      color: "#666",
                      padding: "2px 8px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "0",
                      borderLeft: "1px solid #ddd",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {language}
                  </div>
                )}
              <div style={{ padding: "16px" }}>{children}</div>
            </div>
          );
        },
        abbr: (props) => {
          const { title } = props;
          if (Object.keys(dict).includes(title)) {
            return dict[title];
          }
          return <abbr {...props}></abbr>;
        },
      }}
    >
      {markdown}
    </Markdown>
  );
}
