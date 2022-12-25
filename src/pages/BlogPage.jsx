import postJson from "../posts/posts.json";
import authorsJson from "../posts/authors.json";
import ReactMarkdown from "react-markdown";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import useMobile from "../layout/Responsive";
import rehypeRaw from "rehype-raw";
import style from "../style";
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

function MarkdownP(props) {
  const mobile = useMobile();
  const pStyle = mobile
    ? { fontSize: 16, marginBottom: 20, fontFamily: "Merriweather" }
    : { fontSize: 18, marginBottom: 20, fontFamily: "Merriweather" };
  return <p style={pStyle}>{props.children}</p>;
}

function AuthorSection(props) {
  const { author } = props;
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
        display: "flex",
        alignItems: "center",
        marginBottom: 20,
        flexDirection: "row",
        width: "100%",
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
          marginRight: 20,
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

export default function BlogPostPage(props) {
  // The URL will be in the format /uk/blog/post-name
  // We need to extract the countryId and postName from the URL
  const url = window.location.pathname;
  const postName = url.split("/")[3];
  const postData = postJson.find(
    (post) => post.filename.split(".")[0] === postName
  );
  const { title, description, image, filename, authors } = postData;
  const imageSrc = require(`../images/posts/${image}`);
  const markdownFile = require(`../posts/${filename}`);
  const [markdown, setMarkdown] = useState("");
  const mobile = useMobile();
  useEffect(() => {
    fetch(markdownFile)
      .then((response) => response.text())
      .then((text) => {
        setMarkdown(text);
      });
  }, [markdownFile]);

  window.scrollTo(0, 0);

  return (
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
              strong: ({ children }) => <b>{children}</b>,
              a: ({ href, children }) => (
                <a href={href} style={{ color: style.colors.BLUE }}>
                  {children}
                </a>
              ),
              header: ({ level, children }) => {
                const headerStyle = mobile
                  ? { fontSize: 18, marginBottom: 20 }
                  : {
                      fontSize: 20,
                      marginBottom: 20,
                      fontFamily: "Merriweather",
                    };
                if (level === 1) {
                  return <h1 style={headerStyle}>{children}</h1>;
                } else if (level === 2) {
                  return <h2 style={headerStyle}>{children}</h2>;
                } else if (level === 3) {
                  return <h3 style={headerStyle}>{children}</h3>;
                } else if (level === 4) {
                  return <h4 style={headerStyle}>{children}</h4>;
                } else if (level === 5) {
                  return <h5 style={headerStyle}>{children}</h5>;
                } else if (level === 6) {
                  return <h6 style={headerStyle}>{children}</h6>;
                }
              },
            }}
          >
            {markdown}
          </ReactMarkdown>
          <div style={{ display: "flex", alignItems: "center" }}>
            {authors.map((author) => (
              <AuthorSection author={authorsJson[author]} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
