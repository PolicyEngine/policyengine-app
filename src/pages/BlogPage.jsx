import ReactMarkdown from "react-markdown";
import { TwitterTweetEmbed } from "react-twitter-embed";
import useMobile from "../layout/Responsive";
import rehypeRaw from "rehype-raw";
import style from "../style";
import remarkGfm from "remark-gfm";

function MarkdownP(props) {
  const mobile = useMobile();
  const pStyle = mobile
    ? {
        fontSize: 16,
        marginBottom: 20,
        fontFamily: "Roboto Serif",
        width: "100%",
      }
    : {
        fontSize: 18,
        marginBottom: 20,
        fontFamily: "Roboto Serif",
        width: "100%",
      };
  return <p style={pStyle}>{props.children}</p>;
}

export function BlogPostMarkdown(props) {
  const { markdown, dict } = props;
  const mobile = useMobile();

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

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={{
        ...renderers,
        p: MarkdownP,
        // Ensure images fit inside the container
        img: ({ src, alt }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 0,
            }}
          >
            <img
              src={src}
              alt={alt}
              style={{
                width: "100%",
                objectFit: "contain",
                maxHeight: 400,
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
        a: ({ href, children }) => (
          <a
            href={href}
            style={{ color: style.colors.BLUE }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        h1: ({ children }) => {
          const headerText = children[0];
          return (
            <h1 id={headerText.split(" ").join("-").replace(/,/g, "")}>
              {children}
            </h1>
          );
        },
        h2: ({ children }) => {
          const headerText = children[0];
          // Remove slashes and commas, and replace spaces with dashes to create a
          // unique ID for each header.
          const slug = headerText
            .split(" ")
            .join("-")
            .replace("/", "")
            .replace(/,/g, "");
          return <h2 id={slug}>{children}</h2>;
        },
        h3: ({ children }) => {
          const headerText = children[0];
          console.log(headerText, headerText.split);
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
            }}
          >
            {children}
          </table>
        ),
        td: ({ children }) => (
          <td
            style={{
              padding: 5,
              fontFamily: "Roboto Serif",
              fontSize: mobile ? 16 : 18,
            }}
          >
            {children}
          </td>
        ),
        th: ({ children }) => (
          <th
            style={{
              padding: 5,
              fontFamily: "Roboto Serif",
              fontSize: mobile ? 16 : 18,
              borderBottom: "1px solid black",
            }}
          >
            {children}
          </th>
        ),
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
    </ReactMarkdown>
  );
}
