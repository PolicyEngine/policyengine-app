import { Navigate } from "react-router-dom";
import useCountryId from "./useCountryId";
import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import style from "../style";
import { posts } from "../data/Posts";
import moment from "moment";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import useDisplayCategory from "./useDisplayCategory";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";


export default function BlogPage() {
    // /uk/research/blog-slug-here
    const url = window.location.pathname;
    const countryId = useCountryId();
    const postName = url.split("/")[3];

    // Some old links might point to a dated URL format
    const YYYYMMDDFormat = /^\d{4}-\d{2}-\d{2}-/;
    if (YYYYMMDDFormat.test(postName)) {
        return <Navigate to={`/${countryId}/blog/${postName.substring(11)}`} />;
    }

    const post = posts.find((post) => post.slug === postName);
    const postDate = moment(post.date, "YYYY-MM-DD HH:mm:ss");
    const imageUrl = post.image
      ? require("../images/posts/" + post.image)
      : require("../images/placeholder.png");

    const markdownFile = require(`../../posts/${post.filename}`);
    const [markdown, setMarkdown] = useState("");
    useEffect(() => {
        fetch(markdownFile)
        .then((response) => response.text())
        .then((text) => {
            setMarkdown(text);
        });
    }, [markdownFile]);

    return <>
        <Header />
        <Section backgroundColor={style.colors.BLUE_98}>
            <div style={{display: "flex"}}>
                <div style={{flex: 1}}>
                    <p className="spaced-sans-serif">{postDate.format("MMMM DD, YYYY")}</p>
                    <p className="spaced-sans-serif">By <span style={{color: style.colors.BLUE_PRIMARY}}>{post.authors[0].replaceAll("-", " ")}</span></p>
                </div>
                <div style={{flex: 3}}>
                    <h1>{post.title}</h1>
                    <h5 style={{marginTop: 50}}>
                        {post.description}
                    </h5>
                    <img src={imageUrl} style={{width: "100%", marginTop: 50}} />
                </div>
                <div style={{flex: 1}}>
                </div>
            </div>
        </Section>
        <Section>
            <div style={{display: "flex"}}>
                <div style={{flex: 1}}>
                    <div style={{position: "sticky", top: 150}}>
                    <p className="spaced-sans-serif">Contents</p>
                    </div>
                </div>
                <div style={{flex: 3}}>
                    <BlogContent markdown={markdown} />
                </div>
                <div style={{flex: 1, paddingLeft: 30 }}>
                    <div style={{position: "sticky", top: 150}}>
                        <p className="spaced-sans-serif" style={{color: style.colors.BLUE_PRIMARY}}>More on</p>
                    </div>
                </div>
            </div>
        </Section>
        <Footer />
    </>
}

function BlogContent({ markdown }) {
    const displayCategory = useDisplayCategory();
    const mobile = displayCategory === "mobile";
  const renderers = {
    blockquote: (props) => {
      const { children } = props;
      const anchorTag = children.find((child) =>
        child?.props?.href?.startsWith("https://twitter.com/")
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
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={{
        ...renderers,
        p: ({ children }) => (
          <p
            style={{
              fontFamily: "Roboto Serif",
              fontSize: mobile ? 16 : 18,
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
              justifyContent: "center",
              padding: 0,
              marginTop: 50,
              marginBottom: 50,
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
          <a href={href} target="_blank" rel="noopener noreferrer" className="highlighted-link">
            <nobr>{children}</nobr>
            </a>
        ),
        h1: ({ children }) => {
          const headerText = children[0];
          return (
            <h1 id={headerText.split(" ").join("-").replace(/,/g, "")} style={{marginBottom: 20}}>
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
          return <h2 id={slug} style={{marginBottom: 20}}>{children}</h2>;
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
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}