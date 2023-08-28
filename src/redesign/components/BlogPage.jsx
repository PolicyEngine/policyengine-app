import { Link, Navigate } from "react-router-dom";
import useCountryId from "./useCountryId";
import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import style from "../style";
import { locationLabels, locationTags, posts, topicLabels, topicTags } from "../data/Posts";
import moment from "moment";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import useDisplayCategory from "./useDisplayCategory";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import React, { useEffect, useState } from "react";
import { useReadingTime } from "react-hook-reading-time";
import { FacebookOutlined, LinkedinOutlined, MailOutlined, PrinterOutlined, TwitterOutlined } from "@ant-design/icons";
import FontIcon from "./FontIcon";


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
                    <Authorship post={post} />
                    <ReadTime markdown={markdown} />
                    <div style={{marginTop: 100}} />
                    <DesktopShareLinks post={post} />
                </div>
                <div style={{flex: 2}}>
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
                    <LeftContents markdown={markdown} />
                    </div>
                </div>
                <div style={{flex: 2}}>
                    <BlogContent markdown={markdown} />
                </div>
                <div style={{flex: 1, paddingLeft: 30 }}>
                    <div style={{position: "sticky", top: 150}}>
                      <MoreOn post={post} />
                    </div>
                </div>
            </div>
        </Section>
        <Footer />
    </>
}

function Authorship({ post }) {
  const countryId = useCountryId();
  const authorNames = post.authors.map((author) => <nobr key={author}>
    <span style={{color: style.colors.BLUE_PRIMARY}}>
    <Link to={`/${countryId}/research?authors=${author}`} className="highlighted-link" style={{marginBottom: 0, marginTop: 20}}>
    {author.replaceAll("-", " ")}
    </Link>
    </span>
  </nobr>);
  let sentenceStructure;
  if (authorNames.length === 1) {
    sentenceStructure = <>By {authorNames}</>;
  } else if (authorNames.length === 2) {
    sentenceStructure = <>By {authorNames[0]} and {authorNames[1]}</>;
  } else {
    const lastAuthor = authorNames.pop();
    sentenceStructure = <>By {authorNames.join(", ")}, and {lastAuthor}</>;
  }
  return <p className="spaced-sans-serif" style={{marginBottom: 100}}>
    {sentenceStructure}
    </p>
}

function MoreOn({post}) {
  const countryId = useCountryId();
  const categoryLinks = post.tags.map(tag => {
    if (locationTags.includes(tag)) {
      return <div key={tag} style={{marginBottom: 10}} ><Link 
        className="highlighted-link" 
        to={`/${countryId}/research?locations=${tag}`}
        style={{marginBottom: 0, marginTop: 20}}>
        {locationLabels[tag]}
      </Link></div>
    }
    if (topicTags.includes(tag)) {
      return <div key={tag} style={{marginBottom: 10}} ><Link 
        className="highlighted-link" 
        to={`/${countryId}/research?topics=${tag}`}
        style={{marginBottom: 0, marginTop: 20}}>
        {topicLabels[tag]}
      </Link></div>
    }
  })
  return <>
  <p className="spaced-sans-serif" style={{color: style.colors.BLUE_PRIMARY}}>More on</p>
  {categoryLinks}
  </>;
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
        li: ({ children }) => (
          <li
                style={{
                    marginLeft: 10,
                }}>
                {children}
                </li>
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
        a: ({ href, children }) => {
          let id;
          // If href=#user-content-fn-1, id should be user-content-fnref-1 and vice versa
          if (href.startsWith("#user-content-fn-")) {
            id = href.replace("#user-content-fn-", "user-content-fnref-");
          } else if (href.startsWith("#user-content-fnref-")) {
            id = href.replace("#user-content-fnref-", "user-content-fn-");
          } else {
            id = href;
          }
          return <a id={id} href={href} target={
            // Open external links in a new tab, but not internal links
            href.startsWith("#") ? "" : "_blank"
          } rel="noopener noreferrer" className="highlighted-link">
            <nobr>{children}</nobr>
            </a>
        },
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

function ReadTime({ markdown }) {
  const { text } = useReadingTime(markdown);
  return <p className="spaced-sans-serif" style={{color: style.colors.GRAY}}>
    {text}
  </p>
}

function DesktopShareLink({ icon, url, text }) {
  return <div style={{display: "flex", alignItems: "center", cursor: "pointer"}} onClick={() => window.open(url, "_blank")}>
    {React.createElement(icon, {
          style: {
            color: style.colors.WHITE,
            backgroundColor: style.colors.GRAY,
            fontSize: 15,
            padding: 10,
            marginTop: 10,
            marginBottom: 10,
            marginRight: 10,
          },
    })}
    <p className="spaced-sans-serif" style={{marginLeft: 35, margin: 0, color: style.colors.GRAY}}>{text}</p>
  </div>
}

function DesktopShareLinks({ post }) {
  post;
  return <div>
    <p className="spaced-sans-serif">Share</p>
    <DesktopShareLink icon={TwitterOutlined} url={`https://twitter.com/intent/tweet?text=${post.title}&url=${window.location.href}`} text="Twitter" />
    <DesktopShareLink icon={FacebookOutlined} url={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} text="Facebook" />
    <DesktopShareLink icon={LinkedinOutlined} url={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}&summary=${post.description}`} text="LinkedIn" />
    <DesktopShareLink icon={MailOutlined} url={`mailto:?subject=${post.title}&body=${window.location.href}`} text="Email" />
    <DesktopShareLink icon={PrinterOutlined} url={`javascript:window.print();`} text="Print" />
  </div>
}


function LeftContents(props) {
  const { markdown } = props;

  // Look for ##, ###, and ### to create a table of contents.
  // Split the markdown into an array of lines
  const lines = markdown.split("\n");
  // Find the lines that start with ##, ###, or ####
  const headers = lines.filter((line) => line.startsWith("##"));
  const headerLevels = headers.map((header) => header.split("#").length - 1);
  const headerTexts = headers.map((header) => {
    const text = header.split(" ").slice(1).join(" ");
    if (text.includes("[")) {
      return text.split("[").slice(1).join("[").split("]")[0];
    }
    return text;
  });
  const headerSlugs = headers.map((header) =>
    header
      .split(" ")
      .slice(1)
      .join(" ")
      .split(" ")
      .join("-")
      .replace("\\", "")
      .replace(/,/g, "")
  );

  let contents = [];
  for (let i = 0; i < headers.length; i++) {
    const headerLevel = headerLevels[i];
    const headerText = headerTexts[i];
    const headerSlug = headerSlugs[i];
    contents.push(
      <div style={{display: "flex", alignItems: "center", marginBottom: 5}}>
      <FontIcon name="arrow_forward" size={16} style={{marginRight: 5}} />
      <p
        key={headerSlug}
        style={{
          fontSize: 16 - 2 * (headerLevel - 2),
          cursor: "pointer",
          margin: 5,
          paddingLeft: 10 * (headerLevel - 2),
          padding: 5,
          fontFamily: "Roboto Serif",
          marginBottom: 0,
          marginTop: 0,
        }}
        onClick={() => {
          const element = document.getElementById(headerSlug);
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 200,
              behavior: "smooth",
            });
          }
        }}
      >
        {headerText}
      </p>
      </div>
    );
  }

  if (contents.length === 0) {
    return null;
  }

  return contents;
}