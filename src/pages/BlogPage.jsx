import postJson from "../posts/posts.json";
import authorsJson from "../posts/authors.json";
import ReactMarkdown from "react-markdown";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import useMobile from "../layout/Responsive";
import rehypeRaw from 'rehype-raw'
import style from "../style";
import { GithubOutlined, LinkedinOutlined, MailOutlined, TwitterOutlined } from "@ant-design/icons";

function MarkdownP(props) {
  const mobile = useMobile();
  const pStyle = mobile ?
    { fontSize: 16, marginBottom: 20 } :
    { fontSize: 20, marginBottom: 20 };
  return <p style={pStyle}>{props.children}</p>;
}

function AuthorSection(props) {
  const { author } = props;
  const authorImage = require(`../images/authors/${author.headshot}`);
  // Image - name/bio - social icons (floating to the right)
  return <div style={{ display: "flex", alignItems: "center", marginBottom: 20,
    flexDirection: "row", width: "100%"
  }}>
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
    <div style={{paddingTop: 15, paddingLeft: 10,
      display: "flex", flexDirection: "column", marginRight: 20
    }}>
      <h5><b>{author.name}</b></h5>
      <p>{author.bio}</p>
    </div>
    <div style={{
      paddingTop: 15, paddingLeft: 10, alignItems: "center",
      display: "flex", flexDirection: "row", marginLeft: "auto"
    }}>
      <a href={`mailto:${author.email}`} target="_blank" rel="noreferrer">
        <MailOutlined style={{fontSize: 20, paddingLeft: 10}}/>
      </a>
      <a href={author.linkedin} target="_blank" rel="noreferrer">
        <LinkedinOutlined style={{fontSize: 20, paddingLeft: 10}}/>
      </a>
      <a href={author.twitter} target="_blank" rel="noreferrer">
        <TwitterOutlined style={{fontSize: 20, paddingLeft: 10}}/>
      </a>
      <a href={author.github} target="_blank" rel="noreferrer">
        <GithubOutlined style={{fontSize: 20, paddingLeft: 10}}/>
      </a>
    </div>
  </div>;
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
    <Container style={{padding: mobile && 0}}>
      <div style={{ margin: mobile ? 0 : 75, marginTop: mobile ? 20 : 75, marginLeft: mobile ? 0 : 250, marginRight: mobile ? 0 : 250 }}>
        <div style={{ padding: mobile && 20 }}>
          <h1><b>{title}</b></h1>
          <h5>{description}</h5>
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
                <div style={{ display: "flex", justifyContent: "center", padding: mobile ? 0 : 50 }}>
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
              i: ({ children }) => (
                <i style={{ fontStyle: "italic" }}>{children}</i>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  style={{ color: style.colors.BLUE }}
                >
                  {children}
                </a>
              ),
            }}
          >{markdown}</ReactMarkdown>
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
