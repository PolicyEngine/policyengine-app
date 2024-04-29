import Markdown from "react-markdown";
import { TwitterTweetEmbed } from "react-twitter-embed";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useState, useRef, useEffect } from "react";
import style from "../../redesign/style";
import useDisplayCategory from "../../hooks/useDisplayCategory";
import Plot from "react-plotly.js";

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
        padding: 5,
        fontFamily: "Roboto Serif",
        fontSize: mobile ? 16 : 18,
        borderRight: columnNumber === 0 ? "1px solid black" : "",
        textAlign: columnNumber === 0 ? "left" : "center",
        verticalAlign: "middle",
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
  console.log(data);
  let plotlyData = null;
  try {
    plotlyData = JSON.parse(data);
  } catch {
    console.log(data[0]);
    plotlyData = JSON.parse(data[0]);
  }
  const title = plotlyData.layout?.title?.text;
  const displayCategory = useDisplayCategory();
  return (
    <>
      {title && (
        <h5
          style={{
            fontFamily: "Roboto Serif",
            color: style.colors.GRAY,
            textEmphasis: "italic",
          }}
        >
          {title}
        </h5>
      )}
      <Plot
        data={plotlyData.data}
        layout={Object.assign(plotlyData.layout, {
          width: displayCategory === "mobile" ? 400 : "100%",
          height: 600,
          title: {
            text: "",
          },
          plot_bgcolor: backgroundColor || "transparent",
          paper_bgcolor: backgroundColor || "transparent",
        })}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
      />
    </>
  );
}

export function MarkdownFormatter({ markdown, backgroundColor, dict }) {
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

      return <blockquote>{children}</blockquote>;
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
              fontSize: mobile ? 16 : 18,
              backgroundColor: backgroundColor,
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
            <p
              style={{
                fontFamily: "Roboto Serif",
                color: style.colors.GRAY,
                textEmphasis: "italic",
              }}
            >
              {alt}
            </p>
            <img
              src={src}
              alt={alt}
              style={{
                width: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        ),
        ul: ({ children }) => (
          <ul
            style={{
              paddingLeft: 20,
              marginBottom: 20,
              fontFamily: "Roboto Serif",
              fontSize: mobile ? 16 : 18,
            }}
          >
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol
            style={{
              paddingLeft: 20,
              marginBottom: 20,
              fontFamily: "Roboto Serif",
              fontSize: mobile ? 16 : 18,
            }}
          >
            {children}
          </ol>
        ),
        li: ({ children }) => {
          // Check if li p a exists. If it does, get the ID of the a tag.
          let value = null;
          try {
            let footnoteLinkBack = children
              .find((child) => child?.props?.node.tagName === "p")
              .props.children.find(
                (child) => child?.props?.node.tagName === "a",
              ).props.node.properties.href;
            value = footnoteLinkBack.split("-").pop();
          } catch (e) {
            // Do nothing
          }
          return (
            <li
              style={{
                marginLeft: 10,
              }}
              value={value}
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
        strong: ({ children }) => <b>{children}</b>,
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
              className="highlighted-link"
            >
              <nobr>{footnoteNumber || children}</nobr>
            </a>
          );
        },
        h1: ({ children }) => {
          const headerText = children[0];
          return (
            <h1
              id={headerText.split(" ").join("-").replace(/,/g, "")}
              style={{ marginBottom: 20 }}
            >
              {children}
            </h1>
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
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                  paddingTop: 20,
                  marginBottom: 20,
                  backgroundColor: style.colors.LIGHT_GRAY,
                }}
              >
                {children}
              </div>
            );
          } else {
            return <section>{children}</section>;
          }
        },
        h2: ({ children }) => {
          let headerText = children[0];
          if (!headerText.split) {
            headerText = "";
          }
          // Remove slashes and commas, and replace spaces with dashes to create a
          // unique ID for each header.
          const slug = headerText
            .split(" ")
            .join("-")
            .replace("/", "")
            .replace(/,/g, "");
          return (
            <h2 id={slug} style={{ marginBottom: 20 }}>
              {children}
            </h2>
          );
        },
        h3: ({ children }) => {
          const headerText = children[0];
          return (
            <h3 id={headerText.split(" ").join("-").replace(/,/g, "")}>
              {children}
            </h3>
          );
        },
        h4: ({ children }) => {
          const headerText = children[0];
          return (
            <h4 id={headerText.split(" ").join("-").replace(/,/g, "")}>
              {children}
            </h4>
          );
        },
        table: ({ children }) => (
          <table
            style={{
              marginTop: 30,
              marginBottom: 30,
              // evenly distribute the table header cells
              display: "table",
              tableLayout: "fixed",
              width: "100%",
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
              padding: 5,
              fontFamily: "Roboto Serif",
              fontSize: mobile ? 16 : 18,
              borderBottom: "1px solid black",
              backgroundColor: style.colors.BLUE_PRIMARY,
              textAlign: "center",
              verticalAlign: "middle",
              color: "white",
              width: "100%",
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
            return <code>{children}</code>;
          }
        },
        pre: ({ children }) => children,
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
