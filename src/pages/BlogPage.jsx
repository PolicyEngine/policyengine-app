import postJson from "../posts/posts.json";
import authorsJson from "../posts/authors.json";
import ReactMarkdown from "react-markdown";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import useMobile from "../layout/Responsive";
import rehypeRaw from "rehype-raw";
import style from "../style";
import useDetectPrint from "react-detect-print";
import remarkGfm from "remark-gfm";
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  TwitterOutlined,
  FacebookFilled,
  LinkedinFilled,
} from "@ant-design/icons";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

function MarkdownP(props) {
  const mobile = useMobile();
  const pStyle = mobile
    ? { fontSize: 16, marginBottom: 20, fontFamily: "Merriweather" }
    : { fontSize: 18, marginBottom: 20, fontFamily: "Merriweather" };
  return <p style={pStyle}>{props.children}</p>;
}

function AuthorSection(props) {
  const { author } = props;
  const mobile = useMobile();
  const authorImage = require(`../images/authors/${author.headshot}`);
  // Image - name/bio - social icons (floating to the right)
  const mail = (
    <a href={`mailto:${author.email}`} target="_blank" rel="noreferrer">
      <MailOutlined style={{ fontSize: 20, paddingLeft: 10 }} />
    </a>
  );
  const linkedIn = (
    <a href={author.linkedin} target="_blank" rel="noreferrer">
      <LinkedinOutlined style={{ fontSize: 20, paddingLeft: 10 }} />
    </a>
  );
  const twitter = (
    <a href={author.twitter} target="_blank" rel="noreferrer">
      <TwitterOutlined style={{ fontSize: 20, paddingLeft: 10 }} />
    </a>
  );
  const github = (
    <a href={author.github} target="_blank" rel="noreferrer">
      <GithubOutlined style={{ fontSize: 20, paddingLeft: 10 }} />
    </a>
  );
  return (
    <div
      style={{
        display: "grid",
        alignItems: "center",
        marginBottom: 20,
        width: "100%",
        gridTemplateColumns: mobile ? "20% auto auto" : "10% auto auto",
      }}
    >
      <img
        src={authorImage}
        style={{
          width: 60,
          height: 60,
          // Fit inside without stretching
          objectFit: "cover",
          borderRadius: 30,
          marginRight: 10,
        }}
        alt="Author"
      />
      <div
        style={{
          paddingTop: 15,
          paddingLeft: 10,
          display: "flex",
          flexDirection: "column",
          marginRight: mobile ? 0 : 20,
        }}
      >
        <h5>
          <b>{author.name}</b>
        </h5>
        {author.bio && <p>{author.bio}</p>}
      </div>
      <div
        style={{
          paddingTop: 15,
          paddingLeft: 10,
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          marginLeft: "auto",
        }}
      >
        {author.email && mail}
        {author.linkedin && linkedIn}
        {author.twitter && twitter}
        {author.github && github}
      </div>
    </div>
  );
}

function SocialMediaIcons(props) {
  const url = encodeURIComponent(window.location.href);

  const twitter = (
  <a href={`https://twitter.com/intent/tweet?url=${url}&text=${props}`} target="_blank" rel="noreferrer">
    <TwitterOutlined style={{ fontSize: 25 }} />
  </a>
);
  const facebook = (
    <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noreferrer">
      <FacebookFilled style={{ fontSize: 25 }} />
    </a>
  );
  const linkedIn = (
    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${(url)}`} target="_blank" rel="noreferrer">
      <LinkedinFilled style={{ fontSize: 25 }} />
    </a>
  );
  return (
    <div 
      style={{ 
        position: "fixed", 
        right: "30px", 
        bottom: "30px", 
        display: "flex", 
        flexDirection: "column",
      }}
    >
      <div 
        style={{ 
          border: "1px solid #ccc", 
          borderRadius: "0px", 
          padding: "8px", 
          marginBottom: "-1px", 
        }}
      >
      {twitter}
      </div>
      <div 
        style={{ 
          border: "1px solid #ccc", 
          borderRadius: "0px", 
          padding: "8px", 
          marginBottom: "-1px",
        }}
      >
      {facebook}
      </div>
      <div 
        style={{ 
          border: "1px solid #ccc", 
          borderRadius: "0px", 
          padding: "8px",
        }}
      >
      {linkedIn}
      </div>
    </div>
  );
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
  const headerStartYs = headerSlugs.map((slug) => {
    const element = document.getElementById(slug);
    if (element) {
      let position = element.getBoundingClientRect().top + window.pageYOffset;
      // If the distance between the position and the end of the page is less than the screen height,
      // add the difference since it's not actually possible to scroll that far.
      const distanceToEnd = document.body.scrollHeight - position;
      if (distanceToEnd < window.innerHeight) {
        position -= window.innerHeight - distanceToEnd;
      }
      return position;
    } else {
      return 1000;
    }
  });

  const [currentHeaderSlug, setCurrentHeaderSlug] = useState(headerSlugs[0]);
  useScrollPosition(({ currPos }) => {
    const scrollPosition = -currPos.y + 100;
    for (let i = headerSlugs.length - 1; i >= 0; i--) {
      let startY = headerStartYs[i];
      const nextY =
        i === headerSlugs.length - 1
          ? document.body.scrollHeight
          : headerStartYs[i + 1];
      const inCurrentView = scrollPosition >= startY && scrollPosition < nextY;
      if (inCurrentView) {
        setCurrentHeaderSlug(headerSlugs[i]);
        break;
      }
    }
  });

  let contents = [];
  for (let i = 0; i < headers.length; i++) {
    const headerLevel = headerLevels[i];
    const headerText = headerTexts[i];
    const startY = headerStartYs[i];
    const isSelected = currentHeaderSlug === headerSlugs[i];
    contents.push(
      <p
        style={{
          fontSize: 16 - 2 * (headerLevel - 2),
          cursor: "pointer",
          margin: 5,
          paddingLeft: 10 * (headerLevel - 2),
        }}
        onClick={() => {
          window.scrollTo({ top: startY - 100, behavior: "smooth" });
        }}
      >
        {isSelected && <>&#8594;</>} {headerText}
      </p>
    );
  }

  if (contents.length === 0) {
    return null;
  }

  return (
    <div style={{ position: "fixed", top: 300, left: 20, maxWidth: 300 }}>
      <h5 style={{ marginBottom: 20 }}>
        <b>Contents</b>
      </h5>
      {contents}
    </div>
  );
}

export default function BlogPostPage(props) {
  // The URL will be in the format /uk/blog/post-name
  // We need to extract the countryId and postName from the URL
  const url = window.location.pathname;
  const printing = useDetectPrint();
  const { countryId } = props;
  const postName = url.split("/")[3];
  let postData = postJson.find(
    (post) => post.filename.split(".")[0] === postName
  );
  if (!postData) {
    // Try appending {countryId}- to the postName
    postData = postJson.find(
      (post) => post.filename.split(".")[0] === `${countryId}-${postName}`
    );
  }
  const { title, description, image, filename, authors } = postData;
  const imageSrc = require(`../images/posts/${image}`);
  const markdownFile = require(`../posts/${filename}`);
  const [markdown, setMarkdown] = useState("");
  const mobile = useMobile() || printing;
  useEffect(() => {
    fetch(markdownFile)
      .then((response) => response.text())
      .then((text) => {
        setMarkdown(text);
      });
  }, [markdownFile]);

  window.scrollTo(0, 0);

  return (
    <>
      {!mobile && <LeftContents markdown={markdown} />}
      {!mobile && SocialMediaIcons(title)}
      <Container style={{ padding: mobile && 0 }} className="serif">
        <div
          style={{
            margin: mobile ? 0 : 75,
            marginTop: mobile ? 20 : 75,
            marginLeft: mobile ? 0 : 250,
            marginRight: mobile ? 0 : 250,
          }}
        >
          <div style={{ padding: mobile && 20 }}>
            <h1>{title}</h1>
            <h5 style={{ fontFamily: "Merriweather" }}>{description}</h5>
          </div>
          <img
            src={imageSrc}
            style={{
              paddingTop: 20,
              paddingBottom: 20,
              width: "100%",
              maxHeight: 400,
              objectFit: "contain",
              marginBottom: 20,
            }}
            alt="Background"
          />
          <div style={{ padding: mobile && 20 }}>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                p: MarkdownP,
                // Ensure images fit inside the container
                img: ({ src, alt }) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: mobile ? 0 : 50,
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
                iframe: ({ src, width, height }) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: mobile ? 0 : 50,
                    }}
                  >
                    <iframe
                      title="video"
                      src={src}
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
                  <a href={href} style={{ color: style.colors.BLUE }}>
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
              }}
            >
              {markdown}
            </ReactMarkdown>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {authors.map((author, idx) => (
                <AuthorSection key={idx} author={authorsJson[author]} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
