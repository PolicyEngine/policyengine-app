import postJson from "../posts/posts.json";
import authorsJson from "../posts/authors.json";
import style from "../style";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import EmailSignUp from "./EmailSignup";

function BlogPostPreviewRegular(props) {
  const { title, description, image, filename, countryId, authors } = props;
  const name = filename.split(".")[0];
  const imageSrc = require(`../images/posts/${image}`);
  const navigate = useNavigate();
  const authorImages = authors.map((author) => {
    return require(`../images/authors/${authorsJson[author].headshot}`);
  });

  return (
    <motion.div
      style={{
        width: 300,
        minHeight: 400,
        backgroundColor: style.colors.WHITE,
        margin: 10,
        display: "flex",
        flexDirection: "column",
        borderRadius: 20,
        cursor: "pointer",
      }}
      whileHover={{ scale: 1.05 }}
      onClick={() => navigate(`/${countryId}/blog/${name}`)}
    >
      <img
        src={imageSrc}
        style={{
          width: 300,
          height: 150,
          // Fit inside without stretching
          objectFit: "cover",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        alt="Preview"
      />
      <div style={{ padding: 20, marginTop: "auto" }}>
        <h3>{title}</h3>
        <p>{description}</p>
        {authorImages.map((authorImage, index) => {
          return (
            <div style={{ display: "flex" }}>
              <img
                src={authorImage}
                style={{
                  width: 40,
                  height: 40,
                  // Fit inside without stretching
                  objectFit: "cover",
                  borderRadius: 20,
                  marginRight: 10,
                }}
                alt="Author"
              />
              <p style={{ marginTop: 5 }}>{authorsJson[authors[index]].name}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function BlogPostHolder(props) {
  const { countryId } = props;
  // postJson is a JSON file containing all the blog posts.

  // Each post in the list has the following fields:
  // - title: the title of the post
  // - date: the date the post was published
  // - filename: the filename of the post (a Markdown file)
  // - image: the filename of the image to display with the post

  let posts = [];
  for (let i = 0; i < postJson.length; i++) {
    if (
      postJson[i].tags.includes(countryId) ||
      postJson[i].tags.includes("global")
    )
      posts.push(
        <BlogPostPreviewRegular
          key={i}
          {...postJson[i]}
          countryId={countryId}
        />
      );
  }

  return (
    <div
      style={{
        display: "flex",
        paddingTop: 50,
        paddingBottom: 50,
        backgroundColor: style.colors.LIGHT_GRAY,
        overflowX: "scroll",
      }}
    >
      <div
        style={{
          minWidth: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h3>Blog</h3>
        </div>
        <EmailSignUp />
      </div>
      {posts}
    </div>
  );
}
