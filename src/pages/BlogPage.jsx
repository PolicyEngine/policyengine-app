import postJson from "../posts/posts.json";
import ReactMarkdown from "react-markdown";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function BlogPostPage(props) {
  // The URL will be in the format /uk/blog/post-name
  // We need to extract the countryId and postName from the URL
  const url = window.location.pathname;
  const postName = url.split("/")[3];
  const postData = postJson.find(
    (post) => post.filename.split(".")[0] === postName
  );
  const { title, description, image, filename } = postData;
  const imageSrc = require(`../images/posts/${image}`);
  const markdownFile = require(`../posts/${filename}`);
  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    fetch(markdownFile)
      .then((response) => response.text())
      .then((text) => {
        setMarkdown(text);
      });
  }, [markdownFile]);

  return (
    <Container>
      <div style={{ margin: 75 }}>
        <h1>{title}</h1>
        <h5>{description}</h5>
        <img
          src={imageSrc}
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            width: "100%",
            maxHeight: 400,
            objectFit: "cover",
            marginBottom: 20,
          }}
          alt="Background"
        />
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </Container>
  );
}
